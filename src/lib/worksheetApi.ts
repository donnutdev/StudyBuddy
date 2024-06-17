import type {PostgrestError} from "@supabase/supabase-js";
import {generation_status, progress} from "$lib/public/stores";

type Topical = {
    data: any[],
    error: PostgrestError
}

const worker = new Worker(new URL("$lib/workers/WorksheetWorker.js", import.meta.url).href, {type: "module"});

export async function getTopicals(subject: string, topics: {string: boolean}, years: {number: boolean}, papers: any){
    worker.postMessage({subject, topics, years, papers})
    return new Promise((resolve, reject) => {
        worker.onmessage = (e) => {
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