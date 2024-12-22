import { getPineconeClient } from "./pincone"
import { convertToAscii } from "./utils";
import { getEmbeddingFromText } from "./embeddings";

const getMatchingEmbeddings = async (embedding: number[], fileKey: string) => {
    try {
        const pinecone = await getPineconeClient();
        const hostUrl = process.env.NEXT_PUBLIC_PINECONE_HOST_URL;
        const dbIndex = pinecone.Index("chatpdfbox", hostUrl)
        const _namespace = convertToAscii(fileKey)
        console.log("Pinecone Query Details:");
        console.log("Namespace:", _namespace);
        console.log("Embedding Length:", embedding.length);
        const queryResult = await dbIndex.namespace(_namespace).query({
            topK: 10,
            vector: embedding,
            includeMetadata: true,
            includeValues: true
        })
        console.log("queryResult", queryResult);


        return queryResult.matches || []
    } catch (error) {
        console.error(error)
        throw new Error("An error occurred")
    }
}

export async function getContext(query: string, fileKey: string) {
    console.log("Context Generation - Input Query:", query);
    console.log("Context Generation - FileKey:", fileKey);
    const conertedTextToVector = await getEmbeddingFromText(query)
    const documentMatch = await getMatchingEmbeddings(conertedTextToVector, fileKey)
    console.log("Document Matches Count:", documentMatch.length);
    const findBestMatch = documentMatch.filter(document => document?.score as number >= 0.3)

    type MetaDataType = {
        text: string,
        pageNumber: number,
    }
    console.log("Best Matches Count:", findBestMatch.length);
        
        const documents = findBestMatch.map((match) => 
            (match?.metadata as MetaDataType)?.text || ''
        ).filter(Boolean)

        console.log("Extracted Documents:", documents.length);
        
        const contextText = documents.join('\n').substring(0, 3000)
        console.log("Context Text Length:", contextText.length);
        
        return contextText || "No relevant context found."
}