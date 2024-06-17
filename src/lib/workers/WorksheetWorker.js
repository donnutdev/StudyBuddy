import {supabaseTopicals} from "$lib/supabaseClient";
import {subjectCodes} from "$lib/static-files/SubjectCodes";
import {PAPERS} from "$lib/static-files/Papers";
import {progress, generation_status} from "$lib/public/stores";
import {PDFDocument, StandardFonts} from "pdf-lib";

onmessage = async event => {
    const detail = event.data;
    const subject = detail.subject;
    const topics = detail.topics;
    const years = detail.years;
    const papers = detail.papers;

    let paper_number = []
    let topics_table = []
    let years_table = []
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


    let query = supabaseTopicals
        .from("questions")
        .select()
        .eq("board", "A Levels")
        //@ts-ignore
        .eq("subject", subjectCodes[subject])
        .in("year", years_table)
        .in("variant", [1, 2])
        .in("paper_number", paper_number)

    if (topics_table.length) {
        let or = [];
        topics_table.forEach((topic) => {
            or.push(`topics.cs.{${topic.replace(",", " ")}}`);
        });
        query = query.or(or.join(","));
    }

    let {data, error} = await query;
    if (error) {
        console.error(error);
        postMessage({ev_type: "error", error: error.message})
        return;
    }else if (data.length === 0) {
        postMessage({ev_type: "error", error: "No questions found"})
        return;

    }

    let dupeTable = []
    let questionDoc = await PDFDocument.create()
    let helveticaFont = await questionDoc.embedFont(StandardFonts.Helvetica)

    let helveticaBold = await questionDoc.embedFont(StandardFonts.HelveticaBold)
    let markschemeDoc = await PDFDocument.create()

    let margin_y = 100;
    let text_gap = 10;
    let question_gap = 40;

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
    questionCover.drawText("Subject: " + subject + "\nSubject Code: " + subjectCodes[subject] + "\nComponents: " + String(paper_number), {
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
    markschemeCover.drawText("Subject: " + subject + "\nSubject Code: " + subjectCodes[subject] + "\nComponents: " + String(paper_number), {
        x: markschemeCover.getWidth()/2 - 794*0.9/2,
        y: markschemeCover.getHeight()*0.78,
        size: 20
    })
    markschemeCover.drawText("Topics:", {
        font: helveticaBold,
        x: markschemeCover.getWidth()/2 - 794*0.9/2,
        y: markschemeCover.getHeight()*0.68,
        size: 20
    })



    console.log(data)
    postMessage({ev_type: "status", status: "fetching"})

    let current_page_qp = 0;
    let current_page_ms = 0;
    let current_page_questions = []
    let current_page_answers = []

    for (let q = 0; q < data.length; q++) {
        postMessage({ev_type: "progress", progress: (q+1)/data.length})
        if (data[q].question_type === 1) {
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
                    const imgH = (794*0.8)/(imageDims.width/imageDims.height)
                    current_page_questions = []
                    current_page_qp++
                    page.drawImage(image, {
                        x: page.getWidth()/2 - 794*0.8/2,
                        y: 1123 - margin_y - text_gap - imgH,
                        width: 794*0.8,
                        height: imgH
                    })
                    if (i == 0) {
                        page.drawText(`Question ${q+1}`, {
                            x: page.getWidth()/2 - 794*0.8/2,
                            y: 1123 - margin_y,
                            size: 20
                        })
                    }
                    current_page_questions.push({
                        question: data[q].question,
                        x: page.getWidth()/2 - 794*0.8/2,
                        y: 1123 - margin_y,
                        width: 794*0.8,
                        height: imgH + 90
                    })
                    dupeTable.push(data[q].images[i])
                }catch (e) {
                    console.error(e)
                }
            }

        } else if (data[q].question_type === 0) {
            if (dupeTable.includes(data[q].images[0])) {
                continue
            }
            try{
                const imageData = await fetch("https://qnpumhfafqmcymbxzuvc.functions.supabase.co/get-image?url="+data[q].images[0])
                const imageBytes = await imageData.arrayBuffer()
                const image = await questionDoc.embedPng(imageBytes)
                const imageDims = image.scale(1)
                const imgH = (794*0.8)/(imageDims.width/imageDims.height)
                if (current_page_questions.length === 0 || current_page_qp === 0){
                    const page = questionDoc.addPage([794, 1123])
                    page.drawText(`Question ${q+1}`, {
                        x: page.getWidth()/2 - 794*0.8/2,
                        y: 1123 - margin_y,
                        size: 20
                    })
                    page.drawImage(image, {
                        x: page.getWidth()/2 - 794*0.8/2,
                        y: 1123 - margin_y - text_gap - imgH,
                        width: 794*0.8,
                        height: imgH
                    })
                    current_page_qp++
                    current_page_questions = []
                    current_page_questions.push({
                        question: data[q].question,
                        x: page.getWidth()/2 - 794*0.8/2,
                        y: 1123 - margin_y - text_gap - imgH,
                        width: 794*0.8,
                        height: imgH + text_gap + margin_y
                    })
                }else {
                    let sum_height = 0;
                    for (let v = 0; v < current_page_questions.length; v++) {
                        sum_height += current_page_questions[v].height
                    }
                    if (sum_height + imgH + question_gap + text_gap > 1123 - margin_y) {
                        const page = questionDoc.addPage([794, 1123])

                        page.drawText(`Question ${q+1}`, {
                            x: page.getWidth()/2 - 794*0.8/2,
                            y: 1123 - margin_y,
                            size: 20
                        })
                        page.drawImage(image, {
                            x: page.getWidth()/2 - 794*0.8/2,
                            y: 1123 - margin_y - text_gap - imgH,
                            width: 794*0.8,
                            height: imgH
                        })
                        current_page_questions = []
                        current_page_qp++
                        current_page_questions.push({
                            question: data[q].question,
                            x: page.getWidth()/2 - 794*0.8/2,
                            y: 1123 - margin_y - text_gap,
                            width: 794*0.8,
                            height: imgH + text_gap + margin_y
                        })
                    }else {
                        console.log(sum_height + imgH)
                        const page = questionDoc.getPages()[current_page_qp]
                        page.drawText(`Question ${q+1}`, {
                            x: page.getWidth()/2 - 794*0.8/2,
                            y: 1123 - sum_height - question_gap,
                            size: 20
                        })
                        page.drawImage(image, {
                            x: page.getWidth()/2 - 794*0.8/2,
                            y: 1123 - sum_height - question_gap - text_gap - imgH,
                            width: 794*0.8,
                            height: imgH
                        })
                        console.log(page.getHeight()*0.9 - (imgH + sum_height + 90), q+1)
                        current_page_questions.push({
                            question: data[q].question,
                            x: page.getWidth()/2 - 794*0.8/2,
                            y: 1123 - sum_height - question_gap - text_gap - imgH,
                            width: 794*0.8,
                            height: imgH + text_gap + question_gap
                        })
                    }
                }
                dupeTable.push(data[q].images[0])
            }catch (e) {
                console.error(e)
            }
        }
        // Mark Scheme Generation
        if (data[q].question_type === 1) {
            for (let a = 0; a < data[q].answer.length; a++) {
                if (dupeTable.includes(data[q].answer[a])) {
                    continue
                }
                try {
                    const imageData = await fetch("https://qnpumhfafqmcymbxzuvc.functions.supabase.co/get-image?url="+data[q].answer[a])
                    const imageBytes = await imageData.arrayBuffer()
                    const image = await markschemeDoc.embedPng(imageBytes)
                    const imageDims = image.scale(1)
                    const imgH = (794*0.8)/(imageDims.width/imageDims.height)
                    if (current_page_answers.length === 0 || current_page_ms === 0){
                        const page = markschemeDoc.addPage([794, 1123])
                        current_page_ms++
                        current_page_answers = []
                        if (a === 0){
                            page.drawText(`Question ${q+1}`, {
                                x: page.getWidth()/2 - 794*0.8/2,
                                y: 1123 - margin_y,
                                size: 20
                            })
                            page.drawImage(image, {
                                x: page.getWidth()/2 - 794*0.8/2,
                                y: 1123 - margin_y - text_gap - imgH,
                                width: 794*0.8,
                                height: imgH
                            })
                            current_page_answers.push({
                                x: page.getWidth()/2 - 794*0.8/2,
                                y: 1123 - margin_y - text_gap - imgH,
                                width: 794*0.8,
                                height: imgH + text_gap + margin_y
                            })
                        }else {
                            page.drawImage(image, {
                                x: page.getWidth()/2 - 794*0.8/2,
                                y: 1123 - margin_y  - imgH,
                                width: 794*0.8,
                                height: imgH
                            })
                            current_page_answers.push({
                                x: page.getWidth()/2 - 794*0.8/2,
                                y: 1123 - margin_y  - imgH,
                                width: 794*0.8,
                                height: imgH + margin_y
                            })
                        }
                    }else {
                        let sum_height = 0;
                        for (let v = 0; v < current_page_answers.length; v++) {
                            sum_height += current_page_answers[v].height
                        }
                        if (sum_height + imgH + (a === 0 ? question_gap:0) + text_gap > 1123 - margin_y) {
                            const page = markschemeDoc.addPage([794, 1123])
                            current_page_answers = []
                            current_page_ms++
                            if (a === 0){
                                page.drawText(`Question ${q+1}`, {
                                    x: page.getWidth()/2 - 794*0.8/2,
                                    y: 1123 - margin_y,
                                    size: 20
                                })
                                page.drawImage(image, {
                                    x: page.getWidth()/2 - 794*0.8/2,
                                    y: 1123 - margin_y - text_gap - imgH,
                                    width: 794*0.8,
                                    height: imgH
                                })
                                current_page_answers.push({
                                    question: data[q].question,
                                    x: page.getWidth()/2 - 794*0.8/2,
                                    y: 1123 - margin_y - text_gap,
                                    width: 794*0.8,
                                    height: imgH + text_gap + margin_y
                                })
                            }else {
                                page.drawImage(image, {
                                    x: page.getWidth()/2 - 794*0.8/2,
                                    y: 1123 - margin_y - imgH,
                                    width: 794*0.8,
                                    height: imgH
                                })
                                current_page_answers.push({
                                    question: data[q].question,
                                    x: page.getWidth()/2 - 794*0.8/2,
                                    y: 1123 - margin_y - text_gap,
                                    width: 794*0.8,
                                    height: imgH + margin_y
                                })
                            }
                        }else {
                            console.log(sum_height + imgH)
                            const page = markschemeDoc.getPages()[current_page_ms]
                            if (a === 0) {
                                page.drawText(`Question ${q+1}`, {
                                    x: page.getWidth()/2 - 794*0.8/2,
                                    y: 1123 - sum_height - question_gap,
                                    size: 20
                                })
                                page.drawImage(image, {
                                    x: page.getWidth()/2 - 794*0.8/2,
                                    y: 1123 - sum_height - question_gap - text_gap - imgH,
                                    width: 794*0.8,
                                    height: imgH
                                })
                                current_page_answers.push({
                                    question: data[q].question,
                                    x: page.getWidth()/2 - 794*0.8/2,
                                    y: 1123 - sum_height - question_gap - text_gap - imgH,
                                    width: 794*0.8,
                                    height: imgH + text_gap + question_gap
                                })
                            }else {
                                page.drawImage(image, {
                                    x: page.getWidth()/2 - 794*0.8/2,
                                    y: 1123 - sum_height - question_gap - imgH,
                                    width: 794*0.8,
                                    height: imgH
                                })
                                current_page_answers.push({
                                    question: data[q].question,
                                    x: page.getWidth()/2 - 794*0.8/2,
                                    y: 1123 - sum_height - question_gap - text_gap - imgH,
                                    width: 794*0.8,
                                    height: imgH +  question_gap
                                })
                            }
                        }
                    }
                }catch (err) {
                    console.log(err)
                }
                dupeTable.push(data[q].answer[a])
            }
        }else {
            // Markscheme question type mcq
            try {
                if (current_page_answers.length === 0 || current_page_ms === 0){
                    const page = markschemeDoc.addPage([794, 1123])
                    current_page_ms++
                    current_page_answers = []
                    page.drawText(`Question ${q+1}`, {
                        x: page.getWidth()/2 - 794*0.8/2,
                        y: 1123 - margin_y,
                        size: 20
                    })
                    page.drawText(data[q].answer[0], {
                        x: page.getWidth()/2 - 794*0.8/2,
                        y: 1123 - margin_y - text_gap - 30,
                        size: 30
                    })
                    current_page_answers.push({
                        x: page.getWidth()/2 - 794*0.8/2,
                        y: 1123 - margin_y - text_gap - 30,
                        width: 794*0.8,
                        height: 30 + text_gap + margin_y
                    })
                }else {
                    let sum_height = 0;
                    for (let v = 0; v < current_page_answers.length; v++) {
                        sum_height += current_page_answers[v].height
                    }
                    if (sum_height + 30 + question_gap + text_gap > 1123 - margin_y) {
                        const page = markschemeDoc.addPage([794, 1123])
                        current_page_answers = []
                        current_page_ms++
                        page.drawText(`Question ${q+1}`, {
                            x: page.getWidth()/2 - 794*0.8/2,
                            y: 1123 - margin_y,
                            size: 20
                        })
                        page.drawText(data[q].answer[0], {
                            x: page.getWidth()/2 - 794*0.8/2,
                            y: 1123 - margin_y - text_gap - 30,
                            size: 30
                        })
                        current_page_answers.push({
                            question: data[q].question,
                            x: page.getWidth()/2 - 794*0.8/2,
                            y: 1123 - margin_y - text_gap,
                            width: 794*0.8,
                            height: 30 + text_gap + margin_y
                        })
                    }else {
                        console.log(sum_height + 30)
                        const page = markschemeDoc.getPages()[current_page_ms]
                        page.drawText(`Question ${q+1}`, {
                            x: page.getWidth()/2 - 794*0.8/2,
                            y: 1123 - sum_height - question_gap,
                            size: 20
                        })
                        page.drawText(data[q].answer[0], {
                            x: page.getWidth()/2 - 794*0.8/2,
                            y: 1123 - text_gap - 30 - question_gap - sum_height,
                            size: 30
                        })
                        current_page_answers.push({
                            question: data[q].question,
                            x: page.getWidth()/2 - 794*0.8/2,
                            y: 1123 - sum_height - question_gap - text_gap - 30,
                            width: 794*0.8,
                            height: 30 + text_gap + question_gap
                        })
                    }
                }
            }catch (err) {
                console.log(err)
            }
            dupeTable.push(data[q].answer[0])
        }

    }
    postMessage({ev_type: "status", status: "saving"})
    console.log("Saving")

    const questionBytes = await questionDoc.save()
    const markschemeBytes = await markschemeDoc.save()

    postMessage({ev_type: "final", questionBytes, markschemeBytes})
}