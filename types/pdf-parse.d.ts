// types/pdf-parse.d.ts
declare module 'pdf-parse/lib/pdf-parse.js' {
    interface PDFData {
        numpages: number;
        numrender: number;
        info: {
            PDFFormatVersion: string;
            IsAcroFormPresent: boolean;
            IsXFAPresent: boolean;
            [key: string]: any;
        };
        metadata: any;
        text: string;
        version: string;
    }

    interface PDFOptions {
        pagerender?: (pageData: any) => string;
        max?: number;
        version?: string;
    }

    function PDFParse(dataBuffer: Buffer | Uint8Array, options?: PDFOptions): Promise<PDFData>;
    
    export default PDFParse;
}