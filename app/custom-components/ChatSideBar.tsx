"use client"

import { DrizzleChats } from '@/lib/db/schema'
import { cn } from '@/lib/utils'
import { UserButton, useUser } from '@clerk/nextjs'
import { HomeIcon, LogOut, MessageCircle, MessageSquareIcon, Plus, PlusCircle, X } from 'lucide-react'
import Link from 'next/link'
import React, { useContext } from 'react'
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import FiledUploader from './FiledUploader'
import { ToggleContext, ToggleContextProps } from '../context/ToggleCotext'

type Props = {
  chats: DrizzleChats[],
  chatId: string,
}

const ChatSideBar = ({ chats, chatId }: Props) => {
  const { user } = useUser()
  const { isOpen, setIsOpen } = useContext(ToggleContext) as ToggleContextProps

  return (
    <div className='flex flex-col w-full h-full'>
      <div className="border-b py-4 border-gray-200">
        <Button onClick={() => setIsOpen(!isOpen)} className='w-full h-12 justify-start px-1 py-2 flex items-center text-white bg-transparent gap-2 hover:text-white hover:bg-gray-500 hover:bg-opacity-50 backdrop-blur-sm'>
          <span className='p-2 bg-gradient-to-r flex items-center justify-center from-purple-500 to-pink-500 rounded-full shadow-md'><Plus size={16} /></span>
          <span className='text-sm font-medium'>Create New Chat</span>
        </Button>
      </div>
      <div className="flex-1 w-full overflow-auto py-3">
        <div className="p-1 flex flex-col gap-3">
          {chats.map((chat) => (
            <Link href={`/chats/${chat.id}`} key={chat.id}>
              <div className={cn('flex items-center gap-2 p-2 rounded-md transition-colors', {
                "bg-gradient-to-r from-purple-500 to-pink-500 text-white": chat.id === parseInt(chatId),
                "hover:text-gray-400 hover:bg-gray-500 hover:bg-opacity-50 backdrop-blur-sm text-gray-700": chat.id !== parseInt(chatId),
              })}>
                <MessageSquareIcon size={18} className='text-[18px]' />
                <h3 className='truncate text-sm font-medium'>{chat.pdfName}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className='p-4 border-t border-gray-200'>
        <div className="flex items-center gap-3 mb-4">
          <UserButton />
          <span className='truncate text-sm font-medium text-gray-700'>{user?.fullName}</span>
        </div>
        <div className="flex gap-4">
          <Link className='text-gray-500 hover:text-gray-900 text-sm flex items-center gap-2 transition-colors' href="/dashboard">
            <HomeIcon size={16} />
            <span>Dashboard</span>
          </Link>
          <Link className='text-gray-500 hover:text-gray-900 text-sm flex items-center gap-2 transition-colors' href="/">
            <LogOut size={16} />
            <span>Logout</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ChatSideBar

