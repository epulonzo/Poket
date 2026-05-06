type GeminiPart = {
  text?: string;
};

type GeminiCandidate = {
  content?: {
    parts?: GeminiPart[];
  };
};

type GeminiResponse = {
  candidates?: GeminiCandidate[];
};

const cleanNudge = (message: string) =>
  message
    .replace(/^\s*(?:here(?:'s| is)?(?: your)?(?: nudge)?[:,-]?\s*|nudge[:,-]?\s*)/i, "")
    .replace(/^["'\u201c\u201d]+|["'\u201c\u201d]+$/g, "")
    .trim();

export async function generateNudge(
  merchant: string,
  amount: number,
  category: string,
  budgetLimit: number,
  budgetSpent: number,
  savingsGoal: string
): Promise<string> {
  const fallback = `Your ${category} budget is getting close to the limit. Want to auto-save RM 1 toward ${savingsGoal}?`;

  try {
    const apiKey = process.env.EXPO_PUBLIC_GEMINI_API_KEY;

    if (!apiKey) {
      return fallback;
    }

    const prompt = `You are Poket, a friendly Malaysian financial wellness assistant built into GXBank. A user just made a transaction. Generate a short, warm, actionable nudge in natural English for a young Malaysian user.

Rules: max 2 sentences, mention the merchant and amount, mention how much of their weekly budget is used as a percentage, offer one specific micro-saving action tied to their savings goal, sound like a supportive friend not a bank, never be preachy.

Transaction details:
- Merchant: ${merchant}
- Amount: RM ${amount}
- Category: ${category}
- Weekly budget for this category: RM ${budgetLimit}
- Already spent this week: RM ${budgetSpent}
- User savings goal: ${savingsGoal}

Reply with ONLY the nudge message. No introduction, no label, no quotation marks.`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }],
            },
          ],
        }),
      }
    );

    if (!response.ok) {
      return fallback;
    }

    const data = (await response.json()) as GeminiResponse;
    const message = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!message) {
      return fallback;
    }

    return cleanNudge(message);
  } catch {
    return fallback;
  }
}
