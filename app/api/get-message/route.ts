import { db } from "@/lib/db";
import { messages } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

//Create chat api endpoint
export async function POST(request: Request) {
    try {
        
        const {chatId} = await request.json();
        const _messages = await db.select().from(messages).where(eq(messages.chatId, chatId))
        
        if((_messages).length < 1){
            console.log("No messages found");
            
            return NextResponse.json([])
        }
        return NextResponse.json(_messages)
    } catch (error) {
        console.error(error);
        console.log("get messages error", error);
        
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}