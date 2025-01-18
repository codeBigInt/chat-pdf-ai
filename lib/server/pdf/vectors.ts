import { getEmbeddingFromText } from "@/lib/embeddings";
import { Document } from "@pinecone-database/doc-splitter";
import { PineconeRecord } from "@pinecone-database/pinecone";
import md5 from "md5";

// Get embeddings and  convert them into vectors
export async function getVectorEmbeddings(document: Document) {
    try {
        const embedding = await getEmbeddingFromText(document.pageContent)
        const hash = md5(document.pageContent)

        return ({
            id: hash,
            values: embedding,
            metadata: {
                pageNumber: document.metadata.pageNumber,
                text: document.metadata.text
            }
        } as PineconeRecord)
    } catch (error) {
        console.error(error);
        throw new Error("Could not get embeddings")
    }
}