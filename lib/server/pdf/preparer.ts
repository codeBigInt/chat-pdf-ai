import { PDFType } from "@/lib/type"
import PDFParser from 'pdf-parse/lib/pdf-parse.js';
import { Document, RecursiveCharacterTextSplitter } from "@pinecone-database/doc-splitter"

// Split document into smaller chunks
export const truncateDocument = async (text: string, bytes: number) => {
    const encodedText = new TextEncoder()

    return new TextDecoder("utf-8").decode(encodedText.encode(text).slice(0, bytes))
}

export const prepareDocument = async (page: PDFType) => {
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

interface PDFPage {
    pageContent: string;
    metadata: {
        loc: {
            pageNumber: number;
        };
    };
}

export async function extractTextFromPDF(pdfBuffer: Buffer): Promise<PDFPage[]> {
    try {
        // Convert Buffer to Uint8Array if needed
        const uint8Array = new Uint8Array(pdfBuffer);

        // Parse PDF
        const pdfData = await PDFParser(uint8Array, {
            max: 0, // no page limit
            version: 'v2.0.550'
        });

        // Split content into pages based on form feed character or other markers
        const pages = pdfData.text.split(/\f|\n{4,}/g)
            .filter(page => page.trim().length > 0)
            .map((pageContent, index) => ({
                pageContent: pageContent.trim(),
                metadata: {
                    loc: {
                        pageNumber: index + 1
                    }
                }
            }));

        return pages;
    } catch (error) {
        console.error('Error parsing PDF:', error);
        throw new Error(`Failed to parse PDF: ${error}`);
    }
}