export interface ChatMessage {
  sender: "user" | "admin" | "system";
  text: string;
  timestamp: number;
}

export interface ChatSession {
  chatId: string;
  name: string;
  email: string;
  messages: ChatMessage[];
  createdAt: number;
}

// Nettoie les signatures d'email pour ne garder que le dernier message
export function cleanEmailBody(text: string): string {
  const splitters = [
    /^On\s(.+)wrote:$/m,
    /^Le\s(.+)écrit :$/m,
    /^> /m,
    /^---/m
  ];
  let cleanText = text;
  for (const regex of splitters) {
    const match = cleanText.match(regex);
    if (match && match.index) {
      cleanText = cleanText.substring(0, match.index);
    }
  }
  return cleanText.trim();
}