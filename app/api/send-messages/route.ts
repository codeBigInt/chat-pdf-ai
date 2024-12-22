import { db } from "@/lib/db"
import { messages as _messages } from "@/lib/db/schema"
import { NextResponse } from "next/server"


export async function POST(request: Request) {
    try {
        const { message, chatId, role } = await request.json()
        await db.insert(_messages).values({
            chatId,
            content: message,
            role: role
        })
        return NextResponse.json({ data: "message sent successfully", staus: 200 })
    } catch (error) {
        console.error(error)
        return NextResponse.error()
    }
}