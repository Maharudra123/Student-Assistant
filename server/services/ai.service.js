const { GoogleGenerativeAI } = require("@google/generative-ai");

const buildPrompt = (userInput, mode) => {
  const guardrail = `If you are uncertain about any part of this, explicitly say "I'm not fully certain, but..." rather than guessing. If the topic is inappropriate or completely nonsensical, reply only with "I cannot fulfill this request."`;

  const prompts = {
    explain: `
You are an experienced university instructor who specializes in making complex topics easy to understand.
Your task is to explain the following concept clearly to a beginner student.

Rules:
- Use simple, everyday language. Avoid jargon unless you define it.
- Keep the explanation under 150 words.
- Use an analogy or real-world example where helpful.
- ${guardrail}

Concept to explain:
${userInput}
    `.trim(),

    mcq: `
You are a professional academic exam designer creating high-quality assessment questions.
Generate exactly 5 multiple-choice questions based on the topic below.

Rules:
- Each question must have exactly 4 options labeled A, B, C, D.
- Clearly mark the correct answer.
- Questions should test understanding, not just memorization.
- ${guardrail}

IMPORTANT: Respond ONLY with a valid JSON object matching this EXACT structure, with no extra text or markdown formatting:
{
  "questions": [
    {
      "question": "...",
      "options": ["A. ...", "B. ...", "C. ...", "D. ..."],
      "answer": "A. ..."
    }
  ]
}

Topic:
${userInput}
    `.trim(),

    summarize: `
You are an expert academic summarizer trained to distill information clearly and concisely.
Summarize the following text for a student who needs the key points quickly.

Rules:
- Extract only the most important ideas.
- Keep the summary between 80–120 words.
- Use clear, neutral language.
- Do not add information that is not in the original text.
- ${guardrail}

Text to summarize:
${userInput}
    `.trim(),

    improve: `
You are a professional editor and writing coach helping students improve their academic writing.
Improve the quality of the following text.

Rules:
- Fix grammar, spelling, and punctuation errors.
- Improve sentence clarity and flow.
- Keep the original meaning and voice intact.
- Do not make it longer than 30% of the original.
- ${guardrail}

After the improved text, add a brief "Changes Made:" section listing what you changed.

Text to improve:
${userInput}
    `.trim(),
  };

  return prompts[mode] || prompts.explain;
};

const generateResponse = async (userInput, mode) => {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const structuredPrompt = buildPrompt(userInput, mode);

    const result = await model.generateContent(structuredPrompt);
    return result.response.text();
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to generate response from Gemini.");
  }
};

module.exports = { generateResponse };
