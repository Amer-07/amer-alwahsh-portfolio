import { ChatMessage } from "../types";

export const sendMessageToRaad = async (
  history: ChatMessage[],
  newMessage: string
): Promise<string> => {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        history: history.map(msg => ({
          role: msg.role,
          content: msg.content || ' '
        })),
        message: newMessage
      })
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return data.reply || "عذراً، صار عندي عطل فني بسيط، جرب تحكي معي كمان مرة! 😅";
  } catch (error) {
    console.error("Raad Error:", error);
    return "آسف، شكلي فصلت شحن 🔌. ممكن تعيد السؤال؟";
  }
};