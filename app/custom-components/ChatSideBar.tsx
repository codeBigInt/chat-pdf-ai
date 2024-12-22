"use client"
import { DrizzleChats } from '@/lib/db/schema'
import { cn } from '@/lib/utils'
import { UserButton, useUser } from '@clerk/nextjs'
import { HomeIcon, LogOut, MessageCircle, PlusCircle } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

type Props = {
  chats: DrizzleChats[],
  chatId: string,
}

const ChatSideBar = ({ chats, chatId }: Props) => {
  const { user } = useUser()
  return (
    <div className='flex sticky top-0 max-h-screen h-full flex-col w-full gap-4'>
      <div className="flex justify-start py-4">
        <button className='flex justify-center items-center gap-3 flex-row-reverse border border-dashed py-2 px-4 w-full rounded-lg'>
          <PlusCircle size={14} />
          <span className='text-[14px]'>Create New Chat</span>
        </button>
      </div>
      <ul className='flex flex-col w-full gap-2 flex-1'>
        {chats.map((chat) => (
          <Link href={`/chats/${chat.id}`} key={chat.id}>
            <div className={cn('flex gap-2 cursor-pointer w-full p-2 items-center rounded', {
              "bg-blue-700 text-white": chat.id === parseInt(chatId),
              "hover:bg-gray-300 text-gray-500": chat.id !== parseInt(chatId),
            })}>
              <MessageCircle size={18} />
              <h3 className=' truncate whitespace-nowrap flex-1 text-[14px] text-ellipsis'>{chat.pdfName}</h3>
            </div>
          </Link>
        ))}
      </ul>
      <div className='flex flex-col gap-4'>
        <div className="flex gap-4 items-center">
          <UserButton />
          <span className=' truncate whitespace-nowrap text-[14px] text-ellipsis'>{user?.fullName}</span>
        </div>
        <div className="flex gap-3">
          <Link className='text-gray-400 text-[14px] flex items-center gap-2 text-ellipsis' href={"/"}>
            <HomeIcon size={14} />
            <span>Home</span>
          </Link>
          <Link className='text-gray-400 text-[14px] flex items-center gap-2 text-ellipsis' href={"/"}>
            <LogOut size={14} />
            <span>Logout</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ChatSideBar