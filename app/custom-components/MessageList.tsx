"use client"
import React from 'react'
import { Message } from "ai/react"
import { cn } from '@/lib/utils'
import { Asterisk, BotMessageSquare, FileText, MenuIcon, Search, Zap } from 'lucide-react'
import { useUser } from '@clerk/nextjs'
import { ScrollArea } from '@/components/ui/scroll-area'
type Props = {
    messages: Message[],
    isSubmitting?: boolean,
}

const processBoldText = (text: string) => {
    const splitedStr = text.split("*")
    return splitedStr.join("")
};

const MessageList = ({ messages, isSubmitting }: Props) => {
    const { user } = useUser()
    const renderWelcomeScreen = () => (
        <ScrollArea className="flex-1 py-8 px-4">
            <h2 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
                What can I help you with?
            </h2>
            <p className="text-gray-400 mb-8 max-w-md">
                Start a conversation with your PDF document. Ask questions, get summaries, or explore key concepts.
            </p>

            <div className="flex flex-col text-gray-300 gap-2 w-full p-4">
                <p className='text-left text-gray-500 text-[14px]'>HINTS</p>
                <div className="grid grid-cols-1 gap-4 w-full max-w-2xl">
                    {[
                        { icon: <FileText className="w-6 h-6 text-white" />, text: "Summarize the main points of the document" },
                        { icon: <Search className="w-6 h-6 text-white" />, text: "Find specific information within the PDF" },
                        { icon: <Zap className="w-6 h-6 text-white" />, text: "Explain a complex concept from the document" },
                        { icon: <MenuIcon className="w-6 h-6 text-white" />, text: "List the key topics covered in the PDF" },
                    ].map((item, index) => (
                        <li
                            key={index}
                            className="flex items-center border-dashed border-gray-500 gap-3 rounded-lg justify-start text-[12px] bg-transparent text-wrap space-x-2 h-auto py-5 px-4 text-left"
                        >
                            {item.icon}
                            <span className="text-sm">{item.text}</span>
                        </li>
                    ))}
                </div>
            </div>
        </ScrollArea>
    )
    return (
        <ul className='flex flex-col md:px-4 px-2 lg:px-2 pt-5 pb-16 gap-3 w-full min-h-full max-h-full overflow-y-auto'>
            {
                messages.length > 0 ? (
                    messages.map((message, index) => (
                        <li key={index} className={cn("flex flex-col gap-2 w-full", {
                            "items-start": message.role === "assistant" || message.role === "system",
                            "items-end": message.role === "user",
                        })}>
                            {message.role === "assistant" || message.role === "system" ? (
                                <span className='flex items-center w-max gap-2'>
                                    <span className='bg-purple-500 shadow-md flex items-center gap-2 rounded-full p-[8px] w-max'>
                                        <BotMessageSquare size={20} className='text-white' />
                                    </span>
                                    <span className='text-gray-500 text-[14px]'>Assistant</span>
                                </span>
                            ) : (
                                <span className='flex items-center w-max gap-2'>
                                    <span className='text-gray-500 text-[14px]'>You</span>
                                    <span className='text-[14px] shadow-md uppercase flex justify-center items-center bg-pink-500 text-white py-[5px] px-[10px] rounded-full'>{user?.firstName?.slice(0, 1)}</span>
                                </span>
                            )}
                            <p className={cn("flex max-w-[85%] px-3 py-2 text-[14px] rounded-t-lg", {
                                "bg-transparent shadow-lg text-white border rounded-br-lg": message.role === "assistant" || message.role === "system",
                                "bg-transparent text-white shadow-lg border rounded-bl-lg": message.role === "user",
                            })}>
                                {processBoldText(message.content)}
                            </p>
                        </li>
                    ))
                ) : renderWelcomeScreen()
            }
            {
                isSubmitting && (
                    <div className='w-max p-2 flex gap-2 justify-start bg-transparent shadow-lg border rounded-t-lg rounded-br-lg items-center'>
                        <span className='text-gray-500 text-[14px]'>AI is reading...</span>
                        <span className='flex gap-1 items-center'>
                            <Asterisk size={16} className='text-gray-500 animate-pulse' />
                            <Asterisk size={16} className='text-gray-500 animate-spin' />
                            <Asterisk size={16} className='text-gray-400 animate-bounce' />
                        </span>
                    </div>
                )
            }
        </ul>
    )
}

export default MessageList