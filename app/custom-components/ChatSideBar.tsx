"use client"

import { DrizzleChats } from '@/lib/db/schema'
import { cn } from '@/lib/utils'
import { UserButton, useUser } from '@clerk/nextjs'
import { HomeIcon, LogOut, MessageCircle, MessageSquareIcon, Plus, PlusCircle, X } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Dialog, DialogClose, DialogContent, DialogOverlay, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import FiledUploader from './FiledUploader'

type Props = {
  chats: DrizzleChats[],
  chatId: string,
}

const ChatSideBar = ({ chats, chatId }: Props) => {
  const { user } = useUser()
  return (
    <div className='flex flex-col w-full h-full'>
      <div className="border-b py-4 border-gray-200">
        {
          <Dialog>
            <DialogTrigger asChild>
              <Button className='w-full h-12 justify-start px-1 py-2 flex items-center text-white bg-transparent gap-2 hover:text-white hover:bg-gray-500 hover:bg-opacity-50 backdrop-blur-sm'>
                <span className='p-2 bg-gradient-to-r flex items-center justify-center from-purple-500 to-pink-500 rounded-full shadow-md'><Plus size={16} /></span>
                <span className='text-sm font-medium'>Create New Chat</span>
              </Button>
            </DialogTrigger>
            <DialogOverlay className="bg-black/70 fixed left-0 top-0 z-[9998] w-full h-full backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
            <DialogContent className="fixed w-[90%] left-[50%] top-[50%] z-50 max-w-lg translate-x-[-50%] translate-y-[-50%] rounded-lg bg-white p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg md:w-full">
              <div className="flex justify-between items-center">
                <DialogTitle className="text-lg text-gray-500 font-normal mb-4">Upload File</DialogTitle>
                <DialogClose className=" p-2 rounded-lg border-2 text-gray-400 border-gray-400"><X className="text-gray-600" size={18} /></DialogClose>
              </div>
              <div className="border-2 border-dashed border-gray-300 p-4 rounded-md">
                <FiledUploader className="border-none py-6" />
              </div>
            </DialogContent>
          </Dialog>
        }
      </div>
      <div className="flex-1 w-full overflow-auto py-3">
        <div className="p-1 flex flex-col gap-3">
          {chats.map((chat) => (
            <Link href={`/chats/${chat.id}`} key={chat.id}>
              <div className={cn('flex items-center gap-2 p-2 rounded-md transition-colors', {
                "bg-gradient-to-r from-purple-500 to-pink-500 text-white": chat.id === parseInt(chatId),
                "hover:text-gray-400 hover:bg-gray-500 hover:bg-opacity-50 backdrop-blur-sm text-gray-700": chat.id !== parseInt(chatId),
              })}>
                <MessageSquareIcon size={18}className='text-[18px]' />
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

