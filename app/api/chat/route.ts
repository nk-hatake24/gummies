import { NextRequest, NextResponse } from "next/server";
import { kv } from "@vercel/kv";
import { Resend } from "resend";
import { ChatSession, ChatMessage } from "@/lib/chat.type";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, message, chatId: existingChatId } = body;
    const ip = req.headers.get("x-forwarded-for") || "unknown";

    // Rate Limit (5 req / minute)
    const ratelimit = await kv.incr(`ratelimit:${ip}`);
    await kv.expire(`ratelimit:${ip}`, 60);
    if (ratelimit > 5) return NextResponse.json({ error: "Slow down" }, { status: 429 });

    let chatId = existingChatId;
    let session: ChatSession | null = null;
    const timestamp = Date.now();
    
    // Le message de l'utilisateur
    const userMessage: ChatMessage = { sender: "user", text: message, timestamp };

    if (chatId) {
      session = await kv.get<ChatSession>(`chat:${chatId}`);
    }

    // --- CRÉATION DE SESSION + MESSAGE DE BIENVENUE ---
    if (!session) {
      chatId = crypto.randomUUID().slice(0, 8);
      
      const welcomeMessage: ChatMessage = {
        sender: "system",
        text: `Hello ${name}, how can I help you today?`,
        timestamp: timestamp - 100 // Légèrement dans le passé
      };

      session = {
        chatId,
        name,
        email,
        messages: [welcomeMessage], // On commence avec le message système
        createdAt: timestamp,
      };
    }

    // Ajout du message utilisateur
    session.messages.push(userMessage);

    // Sauvegarde KV (Expire dans 30 jours)
    await kv.set(`chat:${chatId}`, session);
    await kv.expire(`chat:${chatId}`, 60 * 60 * 24 * 30);

    // Envoi Email Admin
    // L'astuce du "+" permet de router la réponse vers le bon chatId
    const replyToAddress = `${process.env.SYSTEM_EMAIL!.split('@')[0]}+${chatId}@${process.env.SYSTEM_EMAIL!.split('@')[1]}`;

    await resend.emails.send({
      from: `Live Chat <${process.env.SYSTEM_EMAIL}>`,
      to: process.env.ADMIN_EMAIL!,
      replyTo: replyToAddress,
      subject: `[Chat#${chatId}] New message from ${session.name}`,
      text: `User: ${session.name} (${session.email})\n\nMessage:\n${message}\n\n--\nReply to answer.`,
    });

    return NextResponse.json({ success: true, chatId, messages: session.messages });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}

// Polling pour récupérer les nouveaux messages
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const chatId = searchParams.get("chatId");
  if (!chatId) return NextResponse.json({ messages: [] });

  const session = await kv.get<ChatSession>(`chat:${chatId}`);
  return NextResponse.json({ messages: session?.messages || [] });
}