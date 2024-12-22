import { CohereEmbeddings } from "@langchain/cohere";

const cohere = new CohereEmbeddings({
    apiKey: process.env.COHERE_API_KEY,
    model: "embed-english-v3.0"
})


export async function getEmbeddingFromText(text: string){
    try {
        const query = text.replace(/\n/g, " ");
        const response = await cohere.embedQuery(query)
        console.log("open ai embedding",response)
        // Returning embeddings which can be converted to vector
        return response as number[];
    } catch (error) {
        console.error(error)
        throw new Error("Failed to get Embeddings")
    }
}