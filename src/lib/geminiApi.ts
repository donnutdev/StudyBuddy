

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
        if (questions.error) {
            throw new Error("An error occured while processing this request\nDetails: "+questions.error)
        }else {
            console.log(questions)
            return {questions: questions.data, subject, topic}
        }
    }

}