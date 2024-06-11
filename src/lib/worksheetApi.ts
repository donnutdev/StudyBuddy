import type {PostgrestError} from "@supabase/supabase-js";

type Topical = {
    data: any[],
    error: PostgrestError
}

import {supabaseTopicals} from "$lib/supabaseClient";
import {subjectCodes} from "$lib/static-files/SubjectCodes";

export async function getTopicals(subject: string, topics: {string: boolean}, years: {number: boolean}): Promise<Topical> {
    let topics_table: string[] = []
    let years_table: number[] = []
    for (let name in topics) {
        // @ts-ignore
        if (topics[name]) {
            topics_table.push(name);
        }
    }
    for (let year in years) {
        // @ts-ignore
        if (years[year]) {
            years_table.push(parseInt(year));
        }
    }

    const {data, error} = await supabaseTopicals
        .from("questions")
        .select()
        .eq("board", "A Levels")
        .eq("question_type", 1)
        //@ts-ignore
        .eq("subject", subjectCodes[subject])
        .overlaps("topics", topics_table)
        .in("year", years_table)
    console.log(years_table);console.log(topics_table); // @ts-ignore
    console.log(subjectCodes[subject]);console.log(data);console.log(error);

    return {data: data, error: error};
}