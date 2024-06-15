import type {PostgrestError} from "@supabase/supabase-js";

type Topical = {
    data: any[],
    error: PostgrestError
}

import {supabaseTopicals} from "$lib/supabaseClient";
import {subjectCodes} from "$lib/static-files/SubjectCodes";
import {PAPERS} from "$lib/static-files/Papers";
import {progress, generation_status} from "$lib/public/stores";
import {PDFDocument, StandardFonts} from "pdf-lib";

export async function getTopicals(subject: string, topics: {string: boolean}, years: {number: boolean}, papers: any){
    let paper_number: number[] = []
    let topics_table: string[] = []
    let years_table: number[] = []
    for (let paper in papers) {
        // @ts-ignore
        if (papers[paper]) {
            paper_number.push(parseInt(paper));
        }
    }
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
        .in("variant", [1, 2])
        .in("paper_number", paper_number)

    let dupeTable = []
    let questionDoc = await PDFDocument.create()
    let helveticaFont = await questionDoc.embedFont(StandardFonts.Helvetica)

    let helveticaBold = await questionDoc.embedFont(StandardFonts.HelveticaBold)
    let markschemeDoc = await PDFDocument.create()

    let questionCover = questionDoc.addPage([794, 1123])
    questionCover.drawText("StudyBuddy", {
        font: helveticaBold,
        x: questionCover.getWidth()/2 - 794*0.9/2,
        y: questionCover.getHeight()*0.95,
        size: 50
    })
    questionCover.drawText("Name: __________________________", {
        x: questionCover.getWidth()/2 - 794*0.9/2,
        y: questionCover.getHeight()*0.85,
        size: 20
    })
    questionCover.drawText("Date: ___/___/______", {
        x: questionCover.getWidth()/2 - 794*0.9/2 + 794*0.9 - 300,
        y: questionCover.getHeight()*0.85,
        size: 20
    })
    questionCover.drawText("Subject: " + subject + "\nSubject Code: " + subjectCodes[subject] + "\nPapers: " + String(paper_number), {
        x: questionCover.getWidth()/2 - 794*0.9/2,
        y: questionCover.getHeight()*0.78,
        size: 20
    })
    questionCover.drawText("Topics:", {
        font: helveticaBold,
        x: questionCover.getWidth()/2 - 794*0.9/2,
        y: questionCover.getHeight()*0.68,
        size: 20
    })
    for (let t = 0; t < topics_table.length; t++) {
        questionCover.drawText(topics_table[t], {
            x: questionCover.getWidth()/2 - 794*0.9/2,
            y: questionCover.getHeight()*0.64 - 20*t,
            size: 20
        })
    }

    let markschemeCover = markschemeDoc.addPage([794, 1123])
    markschemeCover.drawText("StudyBuddy Mark Scheme", {
        font: helveticaBold,
        x: markschemeCover.getWidth()/2 - 794*0.9/2,
        y: markschemeCover.getHeight()*0.95,
        size: 50
    })
    questionCover.drawText("Subject: " + subject + "\nSubject Code: " + subjectCodes[subject] + "\nPapers: " + String(paper_number), {
        x: questionCover.getWidth()/2 - 794*0.9/2,
        y: questionCover.getHeight()*0.78,
        size: 20
    })
    questionCover.drawText("Topics:", {
        font: helveticaBold,
        x: questionCover.getWidth()/2 - 794*0.9/2,
        y: questionCover.getHeight()*0.68,
        size: 20
    })



    console.log(data)
    generation_status.set("fetching")

    for (let q = 0; q < data.length; q++) {
        progress.set((q+1)/data.length)
        for (let i = 0; i < data[q].images.length; i++) {
            if (dupeTable.includes(data[q].images[i])) {
                continue
            }
            try{
                const imageData = await fetch("https://qnpumhfafqmcymbxzuvc.functions.supabase.co/get-image?url="+data[q].images[i])
                const imageBytes = await imageData.arrayBuffer()
                const image = await questionDoc.embedPng(imageBytes)
                const imageDims = image.scale(1)
                const page = questionDoc.addPage([794, 1123])
                const imgH = (794*0.9)/(imageDims.width/imageDims.height)
                page.drawImage(image, {
                    x: page.getWidth()/2 - 794*0.9/2,
                    y: page.getHeight()*0.9 - imgH,
                    width: 794*0.9,
                    height: imgH
                })
                if (i == 0) {
                    page.drawText(`Question ${q+1}`, {
                        x: page.getWidth()/2 - 794*0.9/2,
                        y: page.getHeight()*0.95,
                        size: 20
                    })
                }
                dupeTable.push(data[q].images[i])
            }catch (e) {
                console.error(e)
            }
        }
        for (let a = 0; a < data[q].answer.length; a++) {
            if (dupeTable.includes(data[q].answer[a])) {
                continue
            }
            try {
                const imageData = await fetch("https://qnpumhfafqmcymbxzuvc.functions.supabase.co/get-image?url="+data[q].answer[a])
                const imageBytes = await imageData.arrayBuffer()
                const image = await markschemeDoc.embedPng(imageBytes)
                const imageDims = image.scale(1)
                const page = markschemeDoc.addPage([794, 1123])
                const imgH = (794*0.9)/(imageDims.width/imageDims.height)
                page.drawImage(image, {
                    x: page.getWidth()/2 - 794*0.9/2,
                    y: page.getHeight()*0.9 - imgH,
                    width: 794*0.9,
                    height: imgH
                })
                if (a === 0) {
                    page.drawText(`Question ${q+1}`, {
                        x: page.getWidth()/2 - 794*0.9/2,
                        y: page.getHeight()*0.95,
                        size: 20
                    })
                }
                dupeTable.push(data[q].answer[a])
            }catch (e) {
                console.error(e)
            }
        }
    }
    generation_status.set("saving")
    console.log("Saving")

    const questionBytes = await questionDoc.save()
    const markschemeBytes = await markschemeDoc.save()

    return {questionBytes, markschemeBytes}
}