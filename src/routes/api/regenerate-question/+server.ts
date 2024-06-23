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

export async function POST({ request }): Promise<Response> {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

    const body = await request.json()
    console.log(body)
    const numParts: number = 3

    const previous_prompt = "Generate A Question for me.\n" +
        "Only include the question, its separate parts, and the answer for each part.\n" +
        "Grade: A Level (Grade 11 and 12)" +
        `Subject: ${body.question.subject}\n` +
        `Topic: ${body.question.topic}\n` +
        `Number of Parts: ${numParts}\n` +
        "Separate the main question and each part of the question and DO NOT include the part letter or part number.\n" +
        "The parts key must be an array of objects with part and answer keys\n" +
        "USE ONLY MARKDOWN. DO NOT include the parts in the question key.\n" +
        "ALWAYS EXPLAIN THE ANSWERS\n" +
        "ALWAYS USE THE TEX FORMAT FOR MATHEMATICAL EQUATIONS AND REPRESENTATIONS" +
        "Return in raw json format\n" +
        "The returned json must have a question key and a parts key\n"
    const generated ="```"+ JSON.stringify(body.question.questions)+"```"

    const chat_history = [
        {
            role: "user",
            parts: [{text: previous_prompt}]
        },
        {
            role:"model",
            parts: [{text: generated}]
        }
    ]
    const chat = model.startChat({history: chat_history})

    const new_prompt = "The last question you generated seems to have an error in it. Fix it.\n" +
        "Only include the question, its separate parts, and the answer for each part.\n" +
        `Error in the last question: ${body.selection}` +
        "Grade: A Level (Grade 11 and 12)" +
        `Subject: ${body.question.subject}\n` +
        `Topic: ${body.question.topic}\n` +
        `Number of Parts: ${numParts}\n` +
        "Separate the main question and each part of the question and DO NOT include the part letter or part number.\n" +
        "The parts key must be an array of objects with part and answer keys\n" +
        "USE ONLY MARKDOWN. DO NOT include the parts in the question key.\n" +
        "ALWAYS EXPLAIN THE ANSWERS\n" +
        "ALWAYS USE THE TEX FORMAT FOR MATHEMATICAL EQUATIONS AND REPRESENTATIONS" +
        "Return in raw json format\n" +
        "The returned json must have a question key and a parts key\n"
    console.log(new_prompt)

    let text: string;

    try {
        let res = await chat.sendMessage(new_prompt)
        let response = res.response;
        text = response.text();
        text = text.slice(7, -3)
    } catch (err) {
        return new Response(JSON.stringify({error: true, message: err}), {status: 400})
    }

    const data = JSON.parse(text);
    return new Response(JSON.stringify({error: false, data}), {status: 200});
}