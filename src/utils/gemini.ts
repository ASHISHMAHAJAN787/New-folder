import { GoogleGenerativeAI } from '@google/generative-ai';
import { getGeminiKey } from './db';

const MODEL = 'gemini-2.5-flash';

function getModel() {
  const key = getGeminiKey();
  if (!key) throw new Error('Gemini API key is missing');
  const genAI = new GoogleGenerativeAI(key);
  return genAI.getGenerativeModel({ model: MODEL });
}

export async function chatWithTutor(
  courseTitle: string,
  history: { role: 'user' | 'assistant'; content: string }[],
  userMessage: string
): Promise<string> {
  const model = getModel();
  const systemPrompt = `You are an expert AI tutor for the course "${courseTitle}". 
You explain concepts clearly with examples and code snippets when relevant. 
Be friendly, concise, and encouraging. Format your answers using markdown when helpful.`;

  // Convert history to Gemini chat format
  const contents = [
    { role: 'user', parts: [{ text: systemPrompt }] },
    { role: 'model', parts: [{ text: 'Understood! I am ready to help you learn ' + courseTitle + '. Ask me anything!' }] },
    ...history.map((m) => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.content }],
    })),
    { role: 'user', parts: [{ text: userMessage }] },
  ];

  const result = await model.generateContent({ contents });
  return result.response.text();
}

export async function generateQuiz(
  courseTitle: string,
  topic: string,
  numQuestions: number = 5
): Promise<{ question: string; options: string[]; correctIndex: number; explanation: string }[]> {
  const model = getModel();
  const prompt = `Generate ${numQuestions} multiple-choice quiz questions about "${topic}" for a ${courseTitle} course.
Return ONLY valid JSON (no markdown fences, no commentary) in this exact shape:
[
  {
    "question": "string",
    "options": ["A", "B", "C", "D"],
    "correctIndex": 0,
    "explanation": "string"
  }
]
Make questions challenging but fair. Ensure correctIndex is 0-3.`;

  const result = await model.generateContent(prompt);
  let text = result.response.text().trim();
  // Strip markdown fences if present
  text = text.replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/```$/, '').trim();
  return JSON.parse(text);
}

export async function generateQuestionPaper(
  subject: string,
  topics: string,
  difficulty: string,
  numQuestions: number
): Promise<string> {
  const model = getModel();
  const prompt = `Create a complete ${difficulty}-level question paper for ${subject}.
Topics to cover: ${topics}
Total questions: ${numQuestions}

Include a mix of:
- Short answer questions (2 marks each)
- Long answer questions (5 marks each)
- One coding/practical problem (10 marks)

Format the output as a clean, well-structured question paper with:
- Header (subject, time, max marks)
- Section headers
- Numbered questions
- Marks indicated next to each question

Use markdown formatting.`;

  const result = await model.generateContent(prompt);
  return result.response.text();
}

export async function generateFlashcards(
  topic: string,
  count: number = 10
): Promise<{ front: string; back: string }[]> {
  const model = getModel();
  const prompt = `Generate ${count} study flashcards on "${topic}".
Return ONLY valid JSON (no markdown fences) in this shape:
[{"front": "question or term", "back": "answer or definition"}]`;

  const result = await model.generateContent(prompt);
  let text = result.response.text().trim();
  text = text.replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/```$/, '').trim();
  return JSON.parse(text);
}

export async function summarizeLesson(lessonTitle: string, courseName: string): Promise<string> {
  const model = getModel();
  const prompt = `Provide concise study notes for the lesson "${lessonTitle}" in the ${courseName} course.
Include:
- Key concepts (bullet points)
- Important terms with definitions
- 2-3 code examples (if applicable)
- Tips to remember

Use markdown formatting.`;
  const result = await model.generateContent(prompt);
  return result.response.text();
}
