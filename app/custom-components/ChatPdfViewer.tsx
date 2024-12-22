import React from 'react'

type Props = {
    pdfUrl: string;
}

const ChatPdfViewer = ({ pdfUrl }: Props) => {
    return (
        <div className='w-full top-0 max-h-screen h-full'>
            <iframe src={`https://docs.google.com/gview?url=${pdfUrl}&embedded=true`} className='w-full h-full'></iframe>
        </div>
    )
}

export default ChatPdfViewer
