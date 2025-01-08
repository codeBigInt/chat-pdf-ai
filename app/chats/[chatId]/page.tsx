import ChatSideBar from "@/app/custom-components/ChatSideBar"
import ChatPdfViewer from "@/app/custom-components/ChatPdfViewer"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import ChatBox from "@/app/custom-components/ChatBox"
import { db } from "@/lib/db"
import { chats } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import MobilePdfViewer from "@/app/custom-components/MobilePdfViewer"
import { Document, Page } from "react-pdf"
import { Suspense } from "react"
interface Props {
    params: { chatId: string }
}
const ChatRoom = async ({ params: { chatId } }: Props) => {
    const { userId } = await auth()
    if (!userId) {
        return redirect("/")
    }

    const _chats = await db.select().from(chats).where(eq(chats.userId, userId))
    if (!_chats) {
        return redirect("/")
    }

    const currentChat = _chats.find((chat) => chat.id === parseInt(chatId))

    return (
        <div className="w-full relative min-h-screen text-white bg-black lg:max-h-screen">
            <div className="w-full h-full flex">
                {/* Sidebar area */}
                <div className="px-6 py-4 hidden border-r-[1px] border-gray-300 md:flex bg-black text-white lg:w-[20%] w-[30%] min-h-screen max-h-screen sticky top-0">
                    <ChatSideBar chats={_chats} chatId={chatId} />
                </div>
                {/* PdfViewer area */}
                <div className="lg:flex hidden min-h-screen max-h-screen sticky lg:max-w-[50%] flex-1 p-4">
                    <Suspense fallback={<div>Loading PDF viewer...</div>}>
                        <ChatPdfViewer pdfUrl={currentChat?.pdfUrl as string} />
                    </Suspense>
                </div>
                {/* Chatbox area */}
                <div className="lg:w-[30%] md:w-[70%] w-full border-l-[2px] min-h-screen max-h-screen sticky">
                    <ChatBox chatId={parseInt(chatId)} chats={_chats} />
                </div>
                <div className="lg:hidden ">
                    <MobilePdfViewer pdfUrl={currentChat?.pdfUrl as string} />
                </div>
            </div>
        </div>
    )
}

export default ChatRoom