import type { VercelRequest, VercelResponse } from '@vercel/node';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;
const FORMSPREE_ENDPOINT = "https://formspree.io/f/maqqnkyb";

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
- بمجرد أن يعطيك العميل هذه المعلومات (الاسم والهاتف والإيميل)، قم بتضمينها في ردك بالتنسيق التالي في نهاية رسالتك:
  [LEAD_DATA]{"name":"اسم العميل","phone":"رقمه","email":"إيميله","summary":"ملخص اهتمامه"}[/LEAD_DATA]
- بعدها أكد للعميل أنك أوصلت رسالته وأن المهندس عامر سيتواصل معه قريباً.

خدمات عامر:
1. بناء مواقع ويب متجاوبة وسريعة.
2. تطبيقات ويب معقدة (Dashboards, SAAS).
3. تحسين أداء المواقع وتطوير الواجهات.
4. استشارات برمجية.

قواعد الرد:
- كن مختصراً ومباشراً ولكن دمه خفيف.
- استخدم الإيموجي المناسب 😉🚀.
`;

async function submitToFormspree(leadData: any) {
  try {
    const response = await fetch(FORMSPREE_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        _subject: "New Lead from Raad Chatbot! ⚡",
        message: `
          Name: ${leadData.name}
          Phone: ${leadData.phone}
          Email: ${leadData.email}
          Interest/Summary: ${leadData.summary || "Not specified"}
          Source: Raad Chatbot AI
        `
      })
    });
    return response.ok;
  } catch {
    return false;
  }
}

async function callGemini(apiKey: string, contents: any[]) {
  const models = ['gemini-2.5-flash', 'gemini-1.5-flash', 'gemini-2.0-flash'];
  let lastError = null;

  for (const model of models) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system_instruction: {
            parts: [{ text: RAAD_SYSTEM_INSTRUCTION }]
          },
          contents,
          generationConfig: {
            temperature: 0.7
          }
        })
      });

      if (response.ok) {
        const data = await response.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) return text;
      } else {
        const err = await response.json().catch(() => ({}));
        lastError = err;
        console.error(`Model ${model} failed:`, err);
      }
    } catch (e) {
      lastError = e;
      console.error(`Error calling ${model}:`, e);
    }
  }

  throw lastError || new Error("Failed to get response from Gemini");
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = GEMINI_API_KEY || process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'API key not configured' });
  }

  try {
    const { history, message } = req.body;
    const contents: any[] = [];

    if (history && Array.isArray(history)) {
      for (const msg of history) {
        contents.push({
          role: msg.role === 'model' ? 'model' : 'user',
          parts: [{ text: msg.content || ' ' }]
        });
      }
    }

    contents.push({
      role: 'user',
      parts: [{ text: message }]
    });

    let reply = await callGemini(apiKey, contents);

    const leadMatch = reply.match(/\[LEAD_DATA\](.*?)\[\/LEAD_DATA\]/s);
    if (leadMatch) {
      try {
        const leadData = JSON.parse(leadMatch[1]);
        await submitToFormspree(leadData);
      } catch {
        console.error('Failed to parse lead data');
      }
      reply = reply.replace(/\[LEAD_DATA\].*?\[\/LEAD_DATA\]/s, '').trim();
    }

    return res.status(200).json({ reply });

  } catch (error: any) {
    console.error('Chat API error:', error);
    const msg = error?.error?.message || error?.message || "Internal error";
    return res.status(500).json({ 
      error: msg,
      reply: "آسف، شكلي فصلت شحن 🔌. ممكن تعيد السؤال؟" 
    });
  }
}
