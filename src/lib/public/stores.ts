import {writable} from "svelte/store";

export const generated_ques = writable({questions: {
    "question": "<h1 class='text-primary text-xl'>To generate a question, choose a subject and a topic. We will automatically generate a question catering to that specific topic along with answers.</h1>",
    "parts":[{"part":"", "answer":""}]
}, subject: "", topic: ""})

export const generation_disabled = writable(false)

export const last_generated = writable(0)

export const questionOpen = writable(false)

export const current_countdown = writable(0)

export const starred = writable(true);

export const worksheetOpen = writable(false)

export const worksheet = writable({questions: []})