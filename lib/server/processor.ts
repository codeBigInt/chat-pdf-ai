import { downloadFromAwsS3 } from "@/lib/s3-server"
// import { PDFType } from "@/lib/type"
// import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf"
import { extractTextFromPDF, prepareDocument } from "./pdf/preparer"
import { getVectorEmbeddings } from "./pdf/vectors"
import { getPineconeClient } from "./pdf/picone"
import { convertToAscii } from "@/lib/utils"

export const loadS3ToPinecone = async (fileKey: string) => {
    console.log("downloading file from aws s3 bucket");
    const pdfBuffer = await downloadFromAwsS3(fileKey);
    console.log("PDF buffer received, size:", pdfBuffer?.length);

    if (!pdfBuffer) {
        console.log("No pdf buffer");
        throw new Error("Could not download the file");
    }

    // Extract text from PDF
    console.log("Starting PDF text extraction");
    const pages = await extractTextFromPDF(pdfBuffer);
    console.log(`Extracted ${pages.length} pages from PDF`);

    // Prepare all documents by splitting them into smaller chunks
    console.log("Preparing documents");
    const documents = await Promise.all(pages.map(prepareDocument));

    // Convert each document into embedding
    console.log("Generating embeddings");
    const vectors = await Promise.all(documents.flat().map(getVectorEmbeddings));
    console.log(`Generated ${vectors.length} vectors`);

    // Store vectors to pinecone db
    console.log("Starting upload to pinecone");
    const hostUrl = process.env.NEXT_PUBLIC_PINECONE_HOST_URL;
    const client = await getPineconeClient();
    const pineconeIndex = client.Index("chatpdfbox", hostUrl);
    await pineconeIndex.namespace(convertToAscii(fileKey)).upsert(vectors);
    console.log("Finished upload to pinecone db");

    return documents;
};