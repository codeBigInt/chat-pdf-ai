"use client";
import React, { useContext } from 'react';
import ChatPdfViewer from './ChatPdfViewer';
import ChatSideBar from './ChatSideBar';
import ChatBox from './ChatBox';
import { Dialog, DialogClose, DialogContent, DialogOverlay, DialogTitle } from '@/components/ui/dialog';
import MobilePdfViewer from './MobilePdfViewer';
import { DrizzleChats } from '@/lib/db/schema';
import FiledUploader from './FiledUploader';
import { X } from 'lucide-react';
import { ToggleContext, ToggleContextProps } from '../context/ToggleCotext';

interface Props {
  _chats: DrizzleChats[];
  chatId: string;
  currentChat: DrizzleChats;
}

const ChatInterface = ({ _chats, chatId, currentChat }: Props) => {
  const { isOpen, setIsOpen } = useContext(ToggleContext) as ToggleContextProps
  return (
    <div className="w-full relative min-h-screen text-white bg-black lg:max-h-screen">
      <div className="w-full h-full flex">
        {/* Sidebar area */}
        <div className="px-6 py-4 hidden border-r-[1px] border-gray-300 md:flex bg-black text-white lg:w-[20%] w-[30%] min-h-screen max-h-screen sticky top-0">
          <ChatSideBar chats={_chats} chatId={chatId} />
        </div>
        {/* PdfViewer area */}
        <div className="lg:flex hidden min-h-screen max-h-screen sticky lg:max-w-[50%] lg:min-w-[50%]  flex-1 p-4">
            <ChatPdfViewer pdfUrl={currentChat?.pdfUrl as string} />
        </div>
        {/* Chatbox area */}
        <div className="lg:w-[30%] md:w-[70%] w-full border-l-[2px] min-h-screen max-h-screen sticky">
          <ChatBox chatId={parseInt(chatId)} chats={_chats} />
        </div>
        <div className="lg:hidden ">
          <MobilePdfViewer pdfUrl={currentChat?.pdfUrl as string} />
        </div>
      </div>
      {
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogOverlay className="bg-black/70 fixed left-0 top-0 w-full h-full backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
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
  )
};

export default ChatInterface;
