// import { db } from "@/lib/db";
// import { chats, DrizzleSubscriptions, subscriptions } from "@/lib/db/schema";
// import { getAWSURL } from "@/lib/s3";
// import { auth } from "@clerk/nextjs/server";
// import { eq } from "drizzle-orm";
// import { NextResponse } from "next/server";

// //Create chat api endpoint
// export async function POST(request: Request) {
//     const { userId } = await auth()
//     if(!userId){
//         return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
//     }
//     try {
//         const body = await request.json();
//         const { file_key, file_name } = body
//         const userSubscription: DrizzleSubscriptions[]  =  await db.select().from(subscriptions).where(eq(subscriptions.userId, userId));
//         const _chats = await db.select().from(chats).where(eq(chats.userId, userId));
//         if(userSubscription[0].limit < _chats.length){
//             return NextResponse.json({ error: `Max. file uplaod reached for ${userSubscription[0].plan} plan` }, { status: 401 })
//         }
//         // Uing file key to load the pdf in to the currnet working directory
//         await loadS3ToPinecone(file_key)
//         // Upload user file upload to neon db using drizzle orm
//         const upload = await db.insert(chats).values({
//             pdfName: file_name,
//             pdfUrl: getAWSURL(file_key),
//             fileKey: file_key,
//             userId
//         }).returning({chartId: chats.id})

//         await db.update(subscriptions).set({limit: userSubscription[0].limit - 1}).where(eq(subscriptions.userId, userId))
//         // Returns all chat ids pf all inserted documents that have been inserted successfully

//         // Return a respnse with chat id tha we can use to fetch the document in the chat room
//         return NextResponse.json({ message: "Sent sucessfully", data: {chat_id: upload[0].chartId} }, { status: 200 })
//     } catch (error) {
//         console.error(error);
//         return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
//     }
// }


// app/api/chats/route.ts
import { db } from "@/lib/db";
import { chats, DrizzleSubscriptions, subscriptions } from "@/lib/db/schema";
import { getAWSURL } from "@/lib/s3";
import { loadS3ToPinecone } from "@/lib/server/processor";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const { userId } = await auth()
    if (!userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    try {
        const body = await request.json();
        const { file_key, file_name } = body
        const userSubscription: DrizzleSubscriptions[] = await db.select().from(subscriptions).where(eq(subscriptions.userId, userId));
        const _chats = await db.select().from(chats).where(eq(chats.userId, userId));

        if (userSubscription[0].limit < _chats.length) {
            return NextResponse.json({ error: `Max. file upload reached for ${userSubscription[0].plan} plan` }, { status: 401 })
        }

        await loadS3ToPinecone(file_key)

        // Upload user file upload to neon db using drizzle orm
        const upload = await db.insert(chats).values({
            pdfName: file_name,
            pdfUrl: getAWSURL(file_key),
            fileKey: file_key,
            userId
        }).returning({ chartId: chats.id });

        await db.update(subscriptions)
            .set({ limit: userSubscription[0].limit - 1 })
            .where(eq(subscriptions.userId, userId));

        return NextResponse.json({
            message: "Sent successfully",
            data: { chat_id: upload[0].chartId }
        }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({
            error: error instanceof Error ? error.message : "Internal Server Error"
        }, { status: 500 });
    }
}