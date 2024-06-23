export async function createQuestion(subject: string, topic: string, numParts: number, error: boolean = false) {
    if (error) {
        throw new Error("An error occurred while processing this request")
    }else {
        const res = await fetch(`/api/generate-question?subject=${subject}&topic=${topic}&numparts=${numParts}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        const questions = await res.json()
        if (questions.message) {
            console.log(questions)
            throw new Error("An error occurred while processing this request\nDetails: "+questions.message)
        }else {
            return {questions: questions.data, subject, topic}
        }
    }

}

export async function regenerateQuestion(previous_question, selection:string) {
    const res = await fetch(`/api/regenerate-question`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            question: previous_question,
            selection
        })
    })
    const questions = await res.json()
    if (questions.message) {
        console.log(questions)
        throw new Error("An error occurred while processing this request\nDetails: "+questions.message)
    }else {
        return {questions: questions.data, subject: previous_question.subject, topic: previous_question.topic}
    }
}