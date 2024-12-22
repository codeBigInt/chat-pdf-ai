export interface SendUploadType {
    file_name: string;
    file_key: string;
}

export interface PDFType {
    metadata: {
        loc: { pageNumber: number },
    },
    pageContent: string;
}