import { db } from "@/lib/db";
import { chats } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

//Create chat api endpoint
export async function POST(request: Request) {
    try {
        const { userId } = await request.json();
        console.log("user id route", userId);
        
        const _chats = await db.select().from(chats).where(eq(chats.userId, userId))

        if ((_chats).length < 1) {
            console.log("No chats found");

            return NextResponse.json([])
        }
        return NextResponse.json(_chats)
    } catch (error) {
        console.error(error);
        console.log("get messages error", error);

        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}