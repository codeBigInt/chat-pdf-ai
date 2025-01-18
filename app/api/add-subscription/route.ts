import { db } from "@/lib/db"
import { subscriptions } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import { NextResponse } from "next/server"


export async function POST(request: Request) {
    try {
        const { userId, tx_ref, planType } = await request.json()
        const userSubscription = await db.select().from(subscriptions).where(eq(subscriptions.userId, userId))

        if (userSubscription[0]) {
            if (tx_ref != undefined && planType !== undefined && userSubscription[0] !== planType) {
                await db.update(subscriptions).set({
                    subscribed: true,
                    plan: planType,
                    limit: planType === "premium" ? 50 : planType === "pro" ? 100 : 3
                }).where(eq(subscriptions.userId, userId))
                return NextResponse.json({ message: "Updated subscription plan", status: 200 })
            }
        }
        await db.insert(subscriptions).values({ userId: userId })
        return NextResponse.json({ message: "Free plan subscribed", status: 200 })

    } catch (error) {
        console.error(error)
        return NextResponse.json({ status: 500 })
    }
}