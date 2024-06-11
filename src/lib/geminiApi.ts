type PartsDict = {
    part: string;
    answer: string;
}
type QuestionDict = {
    question: string;
    parts: PartsDict[];
}
type ResponseDict = {
    questions: QuestionDict;
    subject: string;
    topic: string;
}

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_TOKEN);

export async function createQuestion(subject: string, topic: string, subTopics: string[], numParts: number): Promise<ResponseDict> {
    // The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

    const prompt = "Generate A Question for me.\n" +
        "Only include the question, its separate parts, and the answer for each part.\n" +
        `Subject: ${subject}\n` +
        `Topic: ${topic}\n` +
        `Sub-Topics: ${subTopics.toString()}\n` +
        `Number of Parts: ${numParts}\n` +
        "Return in raw json format\n" +
        "Separate the main question and each part of the question and DO NOT include the part letter or part number.\n" +
        "The returned json must have a question key and a parts key\n" +
        "The parts key must be an array of objects with part and answer keys\n" +
        "USE ONLY MARKDOWN. DO NOT include the parts in the question key.\n"

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text();
    text = text.slice(7, -3)
    const data = JSON.parse(text);
    console.log(data)
    return {questions: data, subject: subject, topic: topic};
}

export async function createQuestionTest(subject: string, topic: string, subTopics: string[], numParts: number): Promise<ResponseDict> {
    return new Promise((resolve, reject) => {
        // simulate some asynchronous operation
        setTimeout(() => {
            resolve({questions: {"question": "This is a test question", "parts": [{part: "This is a test part", answer: "This is a test answer"}]}, subject: subject, topic: topic});
        }, 3000);
    });
}