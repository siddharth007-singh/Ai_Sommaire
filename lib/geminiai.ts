import { SUMMARY_PROMPT } from "./prompts";

export async function generateSummaryFromGemini(pdfText: string) {
  const prompt = `
${SUMMARY_PROMPT}

Transform this document into an engaging, easy-to-read summary with contextually relevant emojis and proper Markdown formatting:

${pdfText}
`;

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [{ text: prompt }],
          },
        ],
      }),
    }
  );

  if (!res.ok) {
    const err = await res.text();
    console.error("Gemini REST Error:", err);
    throw new Error("Gemini REST API failed");
  }

  const data = await res.json();

  const text =
    data?.candidates?.[0]?.content?.parts?.[0]?.text ||
    "No response from Gemini";

  return text;
}
