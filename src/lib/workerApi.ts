import type {PostgrestError} from "@supabase/supabase-js";
import {generation_status, progress} from "$lib/public/stores";
import {supabaseTopicals} from "$lib/supabaseClient";
import {subjectCodes} from "$lib/static-files/SubjectCodes";

type Topical = {
    data: any[],
    error: PostgrestError
}

const worksheet_worker = new Worker(new URL("$lib/workers/WorksheetWorker.js", import.meta.url).href, {type: "module"});
// const cards_worker = new Worker(new URL("$lib/workers/ExportCards.js", import.meta.url).href, {type: "module"})

export async function getTopicals(subject: string, topics: {string: boolean}, years: {number: boolean}, papers: any){
    // let query = await supabaseTopicals
    //     .from("questions")
    //     .select()
    //     .eq("board", "A Levels")
    //     .eq("subject", subjectCodes[subject])
    //     .in("paper_number", [1, 2, 3, 4])
    // let paper_nums = {}
    // let topicss = {}
    // for (let thing of query.data) {
    //     paper_nums[thing.paper_number] = true
    //     for (let top of thing.topics) {
    //         topicss[top] = true
    //     }
    // }
    // console.log(query)
    // console.log(paper_nums, topicss)
    worksheet_worker.postMessage({subject, topics, years, papers})
    return new Promise((resolve, reject) => {
        worksheet_worker.onmessage = (e) => {
            if (e.data.ev_type === "final"){
                resolve(e.data)
            }else if (e.data.ev_type === "progress") {
                progress.set(e.data.progress)
            }else if (e.data.ev_type === "status") {
                generation_status.set(e.data.status)
            }else if (e.data.ev_type === "error") {
                reject(e.data.error)
            }
        }
    })
}

// export async function exportCards(card_group) {
//
// }