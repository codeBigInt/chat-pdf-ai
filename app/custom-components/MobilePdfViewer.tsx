"use client"
import { Eye } from 'lucide-react'
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
                    <span className="absolute z-50 rounded-lg backdrop-blur-xl bg-opacity-20 bg-white flex flex-col-reverse items-center p-2 justify-center bottom-24 right-4">
                        <span className="text-xs text-pink-500">Preview</span>
                        <Eye size={30} className='text-pink-500' />
                    </span>
                </DialogTrigger>

                <DialogContent className='min-h-[85vh] max-h-[85vh] w-[90%] overflow-auto rounded-md px-2 lg:hidden'>
                    <span className='hidden'><DialogTitle>Are you absolutely sure?</DialogTitle></span>
                    <ChatPdfViewer pdfUrl={pdfUrl} />
                </DialogContent>
            </Dialog>
        </div>

    )
}

export default MobilePdfViewer