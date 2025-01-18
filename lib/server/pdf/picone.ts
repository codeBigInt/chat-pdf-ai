import { Pinecone } from "@pinecone-database/pinecone";

export const getPineconeClient = async () => {
    const pinecone = new Pinecone({
        apiKey: process.env.NEXT_PUBLIC_PINECONE_DB_API_KEY!
    });
    return pinecone;
}