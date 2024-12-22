"use client"
import React from 'react'
import { Message } from "ai/react"
import { cn } from '@/lib/utils'
import { Asterisk, BotMessageSquare, PackageOpen } from 'lucide-react'
import { useUser } from '@clerk/nextjs'
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
                                    <span className='bg-gray-400 shadow-md flex items-center gap-2 rounded-full p-[8px] w-max'>
                                        <BotMessageSquare size={20} className='text-white' />
                                    </span>
                                    <span className='text-gray-500 text-[14px]'>Assistant</span>
                                </span>
                            ) : (
                                <span className='flex items-center w-max gap-2'>
                                    <span className='text-gray-500 text-[14px]'>You</span>
                                    <span className='text-[14px] shadow-md uppercase flex justify-center items-center bg-blue-600 text-white py-[5px] px-[10px] rounded-full'>{user?.firstName?.slice(0, 1)}</span>
                                </span>
                            )}
                            <p className={cn("flex max-w-[85%] px-3 py-2 text-[14px] rounded-t-lg", {
                                "bg-white shadow-lg text-black border rounded-br-lg": message.role === "assistant" || message.role === "system",
                                "bg-blue-200 text-black shadow-lg border rounded-bl-lg": message.role === "user",
                            })}>
                                {processBoldText(message.content)}
                            </p>
                        </li>
                    ))
                ) : (
                    <div className='w-full min-h-full flex flex-col-reverse gap-2 justify-center items-center'>
                        <span className='text-gray-500 text-[11px]'>Start chatting with your pdf</span>
                        <span className='text-gray-500 text-[14px]'>You have no messages</span>
                        <PackageOpen size={40} className='text-gray-400' />
                    </div>
                )
            }
            {
                isSubmitting && (
                    <div className='w-max p-2 flex gap-2 justify-start bg-white shadow-lg border rounded-t-lg rounded-br-lg items-center'>
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