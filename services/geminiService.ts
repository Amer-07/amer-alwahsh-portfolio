import { FunctionDeclaration, GoogleGenAI, Type } from "@google/genai";
import { ChatMessage } from "../types";
import { FORMSPREE_ENDPOINT } from "../constants";

// Initialize Gemini Client
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const ai = new GoogleGenAI({ apiKey: API_KEY });

const RAAD_SYSTEM_INSTRUCTION = `
أنت "رعد" (Raad)، مساعد ذكي وتفاعلي في الموقع الشخصي للمبرمج "المهندس عامر الوحش" (Engineer Amer Al-Wahsh).
شخصيتك:
- أنت بياع شاطر، ذكي، ومرح جداً.
- لغتك عربية عامية مهذبة (مزيج بين الفصحى البيضاء والشامي/الأردني اللطيف).
- تستطيع التحدث بالإنجليزية إذا تحدث معك المستخدم بالإنجليزية.
- وظيفتك الأساسية: إقناع الزائر بخدمات عامر وتحويله لعميل.
- تتحدث عن عامر بفخر: هو "المهندس عامر الوحش" (Eng. Amer Al-Wahsh)، مبرمج Full Stack شامل وخبير.

التعامل مع الأسعار والعملاء (هام جداً):
- إذا سأل العميل عن السعر أو أبدى اهتماماً جدياً بخدمة معينة، **لا تعطِ سعراً مباشراً**.
- بدلاً من ذلك، قل له بأسلوب لطيف أنك تحتاج لبعض التفاصيل ليتمكن المهندس عامر من التواصل معه وعمل عرض سعر دقيق.
- **اطلب منه المعلومات التالية: الاسم، رقم الهاتف، والبريد الإلكتروني.**
- بمجرد أن يعطيك العميل هذه المعلومات، استخدم الأداة "send_lead_info" لإرسال هذه البيانات فوراً.
- بعد استخدام الأداة، أكد للعميل أنك أوصلت رسالته وأن المهندس عامر سيتواصل معه قريباً.

خدمات عامر:
1. بناء مواقع ويب متجاوبة وسريعة.
2. تطبيقات ويب معقدة (Dashboards, SAAS).
3. تحسين أداء المواقع وتطوير الواجهات.
4. استشارات برمجية.

قواعد الرد:
- كن مختصراً ومباشراً ولكن دمه خفيف.
- استخدم الإيموجي المناسب 😉🚀.
`;

// Define the tool to send lead info
const sendLeadInfoTool: FunctionDeclaration = {
  name: 'send_lead_info',
  parameters: {
    type: Type.OBJECT,
    description: 'Send client contact details (lead) to the engineer when they ask for pricing or want to hire.',
    properties: {
      name: {
        type: Type.STRING,
        description: 'The name of the client.',
      },
      phone: {
        type: Type.STRING,
        description: 'The phone number of the client.',
      },
      email: {
        type: Type.STRING,
        description: 'The email address of the client.',
      },
      summary: {
        type: Type.STRING,
        description: 'A brief summary of what the client is interested in or asking about.',
      },
    },
    required: ['name', 'phone', 'email'],
  },
};

// Function to actually call Formspree
async function submitToFormspree(args: any) {
  try {
    const response = await fetch(FORMSPREE_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        _subject: "New Lead from Raad Chatbot! ⚡",
        message: `
          Name: ${args.name}
          Phone: ${args.phone}
          Email: ${args.email}
          Interest/Summary: ${args.summary || "Not specified"}
          Source: Raad Chatbot AI
        `
      })
    });
    return response.ok ? "Lead sent successfully" : "Failed to send lead";
  } catch (error) {
    return "Error sending lead";
  }
}

export const sendMessageToRaad = async (
  history: ChatMessage[],
  newMessage: string
): Promise<string> => {
  try {
    const model = 'gemini-3-flash-preview';

    // Map history and ensure no empty text parts
    const chatHistory = history.map(msg => ({
        role: msg.role,
        parts: [{ text: msg.content || " " }] 
    }));

    const chat = ai.chats.create({
      model: model,
      config: {
        systemInstruction: RAAD_SYSTEM_INSTRUCTION,
        temperature: 0.7,
        tools: [{ functionDeclarations: [sendLeadInfoTool] }],
      },
      history: chatHistory
    });

    let result = await chat.sendMessage({ message: newMessage });

    // Check for function calls (Tool calls)
    const calls = result.functionCalls;
    
    if (calls && calls.length > 0) {
      // Execute function calls
      const responseParts = [];
      for (const call of calls) {
        if (call.name === 'send_lead_info') {
          const apiResult = await submitToFormspree(call.args);
          // Correct structure for sending function response back to Gemini SDK
          responseParts.push({
            functionResponse: {
              id: call.id,
              name: call.name,
              response: { result: apiResult }
            }
          });
        }
      }

      // Send the tool response back to the model to get the final conversational response
      if (responseParts.length > 0) {
         result = await chat.sendMessage({
            message: responseParts
         });
      }
    }

    return result.text || "عذراً، صار عندي عطل فني بسيط، جرب تحكي معي كمان مرة! 😅";
  } catch (error) {
    console.error("Raad Error:", error);
    return "آسف، شكلي فصلت شحن 🔌. ممكن تعيد السؤال؟";
  }
};