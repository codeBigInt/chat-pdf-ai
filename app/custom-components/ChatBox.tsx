"use client"
import { MenuIcon, MessageSquare, Send, X } from 'lucide-react'
import React from 'react'
import { useChat } from "ai/react"
import MessageList from './MessageList'
import { UserButton } from '@clerk/nextjs'
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { DrizzleChats, RoleType } from '@/lib/db/schema'
import ChatSideBar from './ChatSideBar'
import { useQuery } from '@tanstack/react-query'
import { fetchChats } from '../action'
import { useSendMessage } from '../hookes/hookes'
import toast from 'react-hot-toast'
import LoadingComponent from './LoadingComponent'

export interface ParamType {
    message: string,
    chatId: number,
    role: RoleType
}

const ChatBox = ({ chatId, chats }: { chatId: number, chats: DrizzleChats[] }) => {
    const { data, isLoading } = useQuery({
        queryKey: ["chatId", chatId],
        queryFn: async () => await fetchChats(chatId)
    })
    const { mutate: sendMessage } = useSendMessage()
    const sendMessageToDB = (param: ParamType) => {
        sendMessage(param, {
            onSuccess: ((response) => {
                console.info(response)

            }),
            onError: ((error) => {
                toast.error("Failed to save message")
                console.error(error)
            })
        })
    }
    const { input, handleInputChange, handleSubmit, messages, isLoading: isSubmitting } = useChat({
        api: "/api/chats",
        body: {
            chatId
        },
        initialMessages: data,
        onFinish: ((completion) => {
            // This runs for AI responses
            if (completion.role === "assistant") {
                const message = completion.content;
                const role = "system" as RoleType
                const param = { message, chatId, role }
                sendMessageToDB(param)
            }
        }),
        onError: ((error) => {
            toast.error("Failed to send message")
            console.error(error.message)
        })
    })

    React.useEffect(() => {
        const messageContEl = document.getElementById("message_container")
        messageContEl?.scrollTo({
            top: messageContEl.scrollHeight,
            behavior: "smooth"
        })

        if (messages.length > 0) {
            const lastMessage = messages[messages.length - 1];
            if (lastMessage.role === 'user') {
                const message = lastMessage.content;
                const role = "user" as RoleType
                const param = { message, chatId, role }
                sendMessageToDB(param)
            }
        }
    }, [messages.length])



    if (isLoading) return <LoadingComponent message="Just a momment" subtext="Fetching message" />

    return (
        <div className='flex flex-col relative min-h-full overflow-y-hidden max-h-full w-full' id='message_container'>
            <div className='flex md:hidden justify-between items-center sticky shadow-lg z-30 border-b-[0.5px] border-gray-600 bg-black p-3'>
                <div className='flex items-center gap-2'>
                    <MessageSquare className="h-6 w-6 text-primary" />
                    <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">PDFChat</span>
                </div>
                <Sheet>
                    <SheetTrigger className='flex gap-2 flex-row-reverse items-center'>
                        <span className='bg-transparent border border-dashed border-gray-400 rounded-lg text-white p-2 flex justify-center items-center'><MenuIcon size={16} /></span>
                        <div className="flex gap-4 items-center">
                            <UserButton />
                        </div>
                    </SheetTrigger>
                    <SheetContent className='bg-gray-800 text-white border-none'>
                        <div className='hidden'>
                            <SheetTitle>Menu</SheetTitle>
                        </div>
                        <SheetClose className='p-2 border rounded-lg'><X /></SheetClose>
                        <ChatSideBar chats={chats} chatId={chatId.toString()} />
                    </SheetContent>
                </Sheet>
            </div>
            <div className='flex flex-1 relative h-[85%] max-h-[85%] overflow-y-auto'>
                <MessageList messages={messages} isSubmitting={isSubmitting} />
            </div>
            <div className='w-full sticky left-0 bottom-0 border-t-[1px] p-3 md:py-3'>
                <form onSubmit={handleSubmit} className='w-full bg-transparent px-1 border rounded-lg flex items-center gap-3'>
                    <input
                        placeholder='Ask me any question..'
                        type='text'
                        className='p-3 text-[14px] bg-transparent border-none text-white border rounded-lg outline-none flex-1 flex'
                        value={input}
                        onChange={handleInputChange}
                    />
                    <button type='submit' disabled={isSubmitting} className='bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-md p-3 hover:bg-primary/80'>
                        <Send size={16} />
                    </button>
                </form>
            </div>
        </div>
    )
}

export default ChatBox