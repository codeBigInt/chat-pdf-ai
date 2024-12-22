import { db } from "@/lib/db";
import { chats } from "@/lib/db/schema";
import { loadS3ToPinecone } from "@/lib/pincone";
import { getAWSURL } from "@/lib/s3";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

//Create chat api endpoint
export async function POST(request: Request) {
    const { userId } = await auth()
    if(!userId){
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    try {
        const body = await request.json();
        const { file_key, file_name } = body
        // Uing file key to load the pdf in to the currnet working directory
        await loadS3ToPinecone(file_key)
        // Upload user file upload to neon db using drizzle orm
        const upload = await db.insert(chats).values({
            pdfName: file_name,
            pdfUrl: getAWSURL(file_key),
            fileKey: file_key,
            userId
        }).returning({chartId: chats.id})
        // Returns all chat ids pf all inserted documents that have been inserted successfully

        // Return a respnse with chat id tha we can use to fetch the document in the chat room
        return NextResponse.json({ message: "Sent sucessfully", data: {chat_id: upload[0].chartId} }, { status: 200 })
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}