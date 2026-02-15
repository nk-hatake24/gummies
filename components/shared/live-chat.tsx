"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { MessageSquare, X, Send, Loader2 } from "lucide-react";
import { ChatMessage } from "@/lib/chat.type";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<"info" | "chat">("info");
  
  // Data State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [inputMsg, setInputMsg] = useState("");
  const [chatId, setChatId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Refs pour GSAP
  const widgetRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  // Restauration Session
  useEffect(() => {
    const storedId = localStorage.getItem("chat_session_id");
    if (storedId) {
      setChatId(storedId);
      setStep("chat");
      fetchMessages(storedId);
    }
  }, []);

  // GSAP: Ouverture / Fermeture Widget
  useEffect(() => {
    if (isOpen && widgetRef.current) {
      // Animation d'ouverture (Pop + Fade)
      gsap.fromTo(widgetRef.current,
        { scale: 0.8, opacity: 0, y: 20 },
        { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: "back.out(1.7)" }
      );
    }
  }, [isOpen]);

  // GSAP: Transition entre Info et Chat
  useEffect(() => {
    if (step === "chat" && contentRef.current) {
      gsap.fromTo(contentRef.current,
        { x: 20, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.3, ease: "power2.out" }
      );
    }
  }, [step]);

  // GSAP: Animation des nouveaux messages
  useEffect(() => {
    if (messagesContainerRef.current) {
      const lastMessage = messagesContainerRef.current.lastElementChild;
      if (lastMessage) {
        gsap.fromTo(lastMessage,
          { y: 10, opacity: 0, scale: 0.95 },
          { y: 0, opacity: 1, scale: 1, duration: 0.3, ease: "power2.out" }
        );
      }
    }
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Polling (10s)
  useEffect(() => {
    if (!chatId || !isOpen) return;
    const interval = setInterval(() => fetchMessages(chatId), 10000);
    return () => clearInterval(interval);
  }, [chatId, isOpen]);

  const fetchMessages = async (id: string) => {
    try {
      const res = await fetch(`/api/chat?chatId=${id}`);
      const data = await res.json();
      if (data.messages) setMessages(data.messages);
    } catch (e) { console.error(e); }
  };

  const handleStartChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email) setStep("chat");
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;

    const tempMsg = inputMsg;
    setInputMsg("");
    setIsLoading(true);

    // Optimistic Update
    const optimisticMsg: ChatMessage = { sender: 'user', text: tempMsg, timestamp: Date.now() };
    setMessages(prev => [...prev, optimisticMsg]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message: tempMsg, chatId }),
      });
      const data = await res.json();
      
      if (data.success) {
        if (!chatId) {
          setChatId(data.chatId);
          localStorage.setItem("chat_session_id", data.chatId);
        }
        // Mise à jour complète (pour afficher le message de bienvenue)
        if (data.messages) setMessages(data.messages);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 bg-black text-white p-4 rounded-full shadow-xl hover:scale-110 transition-transform z-50 group"
      >
        <MessageSquare className="w-6 h-6 group-hover:rotate-12 transition-transform" />
      </button>
    );
  }

  return (
    <div 
      ref={widgetRef} 
      className="fixed bottom-6 left-6 w-[340px] md:w-[380px] bg-white border border-gray-200 rounded-2xl shadow-2xl flex flex-col overflow-hidden z-50 h-[550px] font-sans"
    >
      {/* Header */}
      <div className="bg-gray-900 text-white p-4 flex justify-between items-center shadow-md z-10">
        <div>
          <h3 className="font-bold text-lg">Support</h3>
          <p className="text-xs text-gray-400 flex items-center gap-1">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"/> 
            We typically reply in a few minutes
          </p>
        </div>
        <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white transition">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden relative bg-gray-50" ref={contentRef}>
        {step === "info" ? (
          <form onSubmit={handleStartChat} className="p-8 flex flex-col gap-5 h-full justify-center">
            <div className="text-center mb-2">
              <h4 className="font-bold text-gray-800 text-xl">Welcome! 👋</h4>
              <p className="text-gray-500 text-sm mt-2">Enter your details to start chatting with us.</p>
            </div>
            
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Your Name"
                required
                className="w-full border border-gray-300 p-3 rounded-xl text-sm focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
                value={name}
                onChange={e => setName(e.target.value)}
              />
              <input
                type="email"
                placeholder="your@email.com"
                required
                className="w-full border border-gray-300 p-3 rounded-xl text-sm focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
            
            <button type="submit" className="bg-black text-white py-3 rounded-xl font-bold hover:bg-gray-800 transition-colors shadow-lg mt-2">
              Start Conversation
            </button>
          </form>
        ) : (
          <div className="flex flex-col h-full">
            {/* Messages List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
              <div ref={messagesContainerRef}>
                {messages.map((msg, i) => {
                  const isUser = msg.sender === "user";
                  return (
                    <div key={i} className={`flex ${isUser ? "justify-end" : "justify-start"} mb-3`}>
                      {!isUser && (
                        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-2 text-xs font-bold shrink-0">
                          AI
                        </div>
                      )}
                      <div className={`max-w-[80%] p-3.5 text-sm leading-relaxed shadow-sm ${
                        isUser 
                          ? "bg-black text-white rounded-2xl rounded-tr-sm" 
                          : "bg-white border border-gray-100 text-gray-800 rounded-2xl rounded-tl-sm"
                      }`}>
                        {msg.text}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form onSubmit={handleSendMessage} className="p-3 bg-white border-t flex gap-2 items-center">
              <input
                type="text"
                placeholder="Write a message..."
                className="flex-1 bg-gray-100 border-none rounded-full px-4 py-2.5 text-sm focus:ring-2 focus:ring-gray-200 outline-none transition-all"
                value={inputMsg}
                onChange={e => setInputMsg(e.target.value)}
              />
              <button 
                disabled={isLoading || !inputMsg.trim()}
                type="submit" 
                className="p-2.5 bg-black text-white rounded-full hover:bg-gray-800 disabled:opacity-50 disabled:hover:bg-black transition-colors"
              >
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}