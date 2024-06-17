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

import {error} from "@sveltejs/kit";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_TOKEN);

/** @type {import('./$types').RequestHandler} */

export async function GET({ url }): Promise<Response> {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

    const subject = url.searchParams.get('subject');
    const topic = url.searchParams.get('topic');
    const subTopics = ["All"] //temporary
    const numParts = url.searchParams.get("numparts")
    const test = url.searchParams.get("test") ?? false

    if (test) {
        const data = {question: "This is a test question", parts: [{part: "This is a test part", answer: "This is a test answer"}]}
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(new Response(JSON.stringify({error: true, message: `Unable to fulfill request due to technical issues, please try again later.`}), {status: 400}))
            }, 3000)
        })
    }

    const prompt = "Generate A Question for me.\n" +
        "Only include the question, its separate parts, and the answer for each part.\n" +
        "Grade: A Level (Grade 11 and 12)" +
        `Subject: ${subject}\n` +
        `Topic: ${topic}\n` +
        `Sub-Topics: ${subTopics.toString()}\n` +
        `Number of Parts: ${numParts}\n` +
        "Return in raw json format\n" +
        "Separate the main question and each part of the question and DO NOT include the part letter or part number.\n" +
        "The returned json must have a question key and a parts key\n" +
        "The parts key must be an array of objects with part and answer keys\n" +
        "USE ONLY MARKDOWN. DO NOT include the parts in the question key.\n"

    let text: string;

    try {
        let res = await model.generateContent(prompt)
        let response = res.response;
        text = response.text();
        text = text.slice(7, -3)
    } catch (err) {
        return new Response(JSON.stringify({error: true, message: err}), {status: 400})
    }

    const data = JSON.parse(text);
    return new Response(JSON.stringify({error: false, data}), {status: 200});
}