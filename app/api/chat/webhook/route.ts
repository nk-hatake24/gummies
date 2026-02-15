import { NextRequest, NextResponse } from "next/server";
import { kv } from "@vercel/kv";
import { Resend } from "resend";
import { ChatSession, ChatMessage, cleanEmailBody } from "@/lib/chat.type";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    if (searchParams.get("secret") !== process.env.WEBHOOK_SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { to, subject, text } = body; // Structure envoyée par Resend

    // Extraction du ChatID depuis l'adresse "To" (ex: chat+a1b2c@domain.com)
    let chatId: string | null = null;
    const toAddress = Array.isArray(to) ? to[0] : to;
    const plusMatch = toAddress.match(/\+(.*?)@/);
    if (plusMatch) chatId = plusMatch[1];

    if (!chatId) return NextResponse.json({ error: "No Chat ID" }, { status: 400 });

    const session = await kv.get<ChatSession>(`chat:${chatId}`);
    if (!session) return NextResponse.json({ error: "Session not found" }, { status: 404 });

    const cleanMessage = cleanEmailBody(text || "");
    if (!cleanMessage) return NextResponse.json({ success: true });

    // Ajout message Admin
    const adminMsg: ChatMessage = {
      sender: "admin",
      text: cleanMessage,
      timestamp: Date.now(),
    };

    session.messages.push(adminMsg);
    await kv.set(`chat:${chatId}`, session);

    // Copie par email au client
    await resend.emails.send({
      from: `Support <${process.env.SYSTEM_EMAIL}>`,
      to: session.email,
      subject: `Re: ${subject.replace(/\[Chat#.*?\]\s*/, "")}`,
      text: cleanMessage,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Webhook Error" }, { status: 500 });
  }
}