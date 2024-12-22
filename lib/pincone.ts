import { Pinecone, PineconeRecord } from "@pinecone-database/pinecone";
import { downloadFromAwsS3 } from "./s3-server";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { PDFType } from "./type";
import { Document, RecursiveCharacterTextSplitter } from "@pinecone-database/doc-splitter"
import { getEmbeddingFromText } from "./embeddings";
import md5 from "md5";
import { convertToAscii } from "./utils";

export const getPineconeClient = async () => {
    const pinecone = new Pinecone({
        apiKey: process.env.NEXT_PUBLIC_PINECONE_DB_API_KEY!
    });
    return pinecone;
}

export const loadS3ToPinecone = async (fileKey: string) => {
    console.log("downlaoding file from aws s3 bucket")
    //  download the file the user uploaded on server side
    const filename = await downloadFromAwsS3(fileKey)
    if (!filename) {
        throw new Error("Could not download the file")
    }
    //load the file using lang chain for further segmentation into smaller chunks so it can be converted in vectors and store on pinecone db
    //  This is so that our ai chat bot con be context aware of the file
    const loader = new PDFLoader(filename)
    const pages = (await loader.load()) as PDFType[];
    // Prepare all document sby splitting them in t smaller chunks instead of one big page
    const document = await Promise.all(pages.map(prepareDocument))
    // Convert each document into embedding
    const vectors = await Promise.all(document.flat().map(getVectorEmbeddings))
    console.log("Storing vectors on pinecone", vectors)
    console.log(document)
    //store vectors to pinecone db
    console.log("starting upload to pine cone")
    const hostUrl= process.env.NEXT_PUBLIC_PINECONE_HOST_URL;
    const client = await getPineconeClient();
    const pineconeIndex = client.Index("chatpdfbox", hostUrl);
    await pineconeIndex.namespace(convertToAscii(fileKey)).upsert(vectors);
    console.log("finished upload to pinecone db")
    
    return document
}

// Get embeddings and  convert them into vectors
async function getVectorEmbeddings(document: Document) {
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

// Split document into smaller chunks
export const truncateDocument = async (text: string, bytes: number) => {
    const encodedText = new TextEncoder()

    return new TextDecoder("utf-8").decode(encodedText.encode(text).slice(0, bytes))
}

const prepareDocument = async (page: PDFType) => {
    const splitter = new RecursiveCharacterTextSplitter()
    // Remove excessive newlines, but preserve meaningful line breaks
    const refactoredText = page.pageContent.replace(/\n{3,}/g, "\n\n")
    
    const splittedChunk = splitter.splitDocuments([
        new Document({
            pageContent: refactoredText,
            metadata: {
                pageNumber: page.metadata.loc.pageNumber,
                text: refactoredText, // Use full text instead of truncating
                source: 'uploaded-pdf'
            }
        })
    ])

    return splittedChunk
}