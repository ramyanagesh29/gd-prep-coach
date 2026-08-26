const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

function buildPrompt(topicTitle, topicDescription, responseText) {
  return `You are an expert Group Discussion (GD) evaluator helping a student preparing for campus placement interviews.

TOPIC: "${topicTitle}"
CONTEXT: ${topicDescription}

STUDENT'S RESPONSE:
"${responseText}"

Evaluate this response as if it were said during a real Group Discussion round. Analyze it across these dimensions:
1. Clarity - Is the point communicated clearly and understandably?
2. Structure - Is there a logical flow (intro, points, conclusion)?
3. Relevance - Does it directly address the topic?
4. Assertiveness - Does it show confidence and conviction without being aggressive?

Respond with ONLY valid JSON in exactly this format, no other text, no markdown code fences:
{
  "score": <number 0-100>,
  "clarity": "<one short sentence>",
  "structure": "<one short sentence>",
  "relevance": "<one short sentence>",
  "assertiveness": "<one short sentence>",
  "overallFeedback": "<2-3 sentences of overall feedback>",
  "improvementTips": ["<tip 1>", "<tip 2>", "<tip 3>"]
}`;
}

function parseAIResponse(rawText) {
  let cleaned = rawText.trim();
  cleaned = cleaned.replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/```\s*$/i, '');

  const parsed = JSON.parse(cleaned);

  if (
    typeof parsed.score !== 'number' ||
    typeof parsed.clarity !== 'string' ||
    typeof parsed.structure !== 'string' ||
    typeof parsed.relevance !== 'string' ||
    typeof parsed.assertiveness !== 'string' ||
    typeof parsed.overallFeedback !== 'string' ||
    !Array.isArray(parsed.improvementTips)
  ) {
    throw new Error('AI response missing required fields');
  }

  parsed.score = Math.max(0, Math.min(100, Math.round(parsed.score)));

  return parsed;
}

async function analyzeResponse(topicTitle, topicDescription, responseText) {
  const model = genAI.getGenerativeModel({ model: 'gemini-3.6-flash' });
  const prompt = buildPrompt(topicTitle, topicDescription, responseText);

  const result = await model.generateContent(prompt);
  const rawText = result.response.text();

  return parseAIResponse(rawText);
}

module.exports = analyzeResponse;