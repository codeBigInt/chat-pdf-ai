// import { Configuration, OpenAIApi, } from "openai-edge";
import { getContext } from "@/lib/context";
import { db } from "@/lib/db";
import { chats } from "@/lib/db/schema";
import { cohere } from "@ai-sdk/cohere"
import { streamText } from "ai"
import { eq } from "drizzle-orm";

export const runtime = "edge"


export async function POST(request: Request) {
    try {
        const { messages, chatId } = await request.json();
        const lastMessage = messages[messages.length - 1];
        const _chats = await db.select().from(chats).where(eq(chats.id, chatId));
        const fileKey = _chats[0].fileKey
        const context = await getContext(lastMessage.content, fileKey)

        const stream = streamText({
            model: cohere("command-r-plus-08-2024"),
            system: "You are a precise AI assistant focused on extracting and explaining relevant information from the given context.",
            prompt: `RESPONSE GUIDELINES:
            - Carefully analyze the ENTIRE context
            - Focus DIRECTLY on the specific question asked
            - Provide a clear, concise, and contextually accurate answer
            - Use only information present in the context
            - Aim for a natural, informative tone

              PRONOUN RESOLUTION STRATEGY:
    1. Scan the first few paragraphs/sections to identify the primary subject
    2. Use the first proper noun or most frequently mentioned name as the reference point
    3. When using pronouns like "he", "she", "his", "her", always refer back to the identified subject
        
            CRITICAL RESPONSE PRINCIPLES:
            1. Directly address the specific question
            2. Extract precise details from the context
            3. Avoid generic or templated responses
            4. Do not invent or assume information
            5. If no relevant information exists, clearly state that
        
            CONTEXT INTERPRETATION:
            - Identify the most relevant sections
            - Extract specific details
            - Explain with clarity and context

             CONTEXT ANALYSIS APPROACH:
            - Identify primary subject
             - Note key contextual references
             - Prepare to resolve pronouns accurately
        
            START CONTEXT BLOCK
            ${context}
            END OF CONTEXT BLOCK
        
            QUESTION: ${lastMessage.content}

            RESPONSE REQUIREMENTS:
    - Identify and use the document's primary subject
    - Replace generic pronouns with the subject's name or description
    - Provide a precise, context-driven answer
    - Ensure response reflects the document's specific context
        
            PREPARE YOUR RESPONSE BY:
            - Carefully reading the context
            - Identifying the EXACT information related to the question
            - Crafting a response that is:
              * Precise
              * Informative
              * Directly answering the question
              * Using ONLY context-based information`,
            temperature: 0.3 // Kept low to maintain accuracy
        })
        return stream.toDataStreamResponse();
    } catch (err) {
        console.error(err)
        return new Response(JSON.stringify({ error: err }), { status: 500 })
    }
}


