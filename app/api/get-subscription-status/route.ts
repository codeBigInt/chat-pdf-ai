import { db } from "@/lib/db"
import { DrizzleSubscriptions, subscriptions } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import { NextResponse } from "next/server"


export async function POST(request: Request) {
    try {
        const { userId } = await request.json()
        const userSubscription: DrizzleSubscriptions[] = await db.select().from(subscriptions).where(eq(subscriptions.userId, userId))
        if (!userSubscription[0]) {
            return NextResponse.json({ message: "Not subscribed", status: 400 })
        }
        console.log(userSubscription[0]);

        return NextResponse.json(userSubscription[0])
    } catch (error) {
        return NextResponse.json(error)
    }
}