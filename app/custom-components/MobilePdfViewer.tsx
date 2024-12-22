"use client"
import { FileScan } from 'lucide-react'
import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import ChatPdfViewer from './ChatPdfViewer'


type Props = {
    pdfUrl: string
}

const MobilePdfViewer = ({ pdfUrl }: Props) => {
    return (
        <div className='lg:hidden'>
            <Dialog>
                <DialogTrigger>
                    <span className="absolute z-50 rounded-lg backdrop-blur-lg bg-opacity-55 bg-gray-300 flex flex-col-reverse items-center p-2 justify-center bottom-24 right-4">
                        <span className="text-xs">View pdf</span>
                        <FileScan size={30} />
                    </span>
                </DialogTrigger>

                <DialogContent className='min-h-[85vh] w-[90%] rounded-md px-2 lg:hidden'>
                    <span className='hidden'><DialogTitle>Are you absolutely sure?</DialogTitle></span>
                    <ChatPdfViewer pdfUrl={pdfUrl} />
                </DialogContent>
            </Dialog>
        </div>

    )
}

export default MobilePdfViewer