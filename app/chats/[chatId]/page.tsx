import ChatSideBar from "@/app/custom-components/ChatSideBar"
import ChatPdfViewer from "@/app/custom-components/ChatPdfViewer"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import ChatBox from "@/app/custom-components/ChatBox"
import { db } from "@/lib/db"
import { chats, DrizzleChats } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import MobilePdfViewer from "@/app/custom-components/MobilePdfViewer"
import { Suspense, useContext } from "react"
import { Dialog, DialogClose, DialogContent, DialogOverlay, DialogTitle } from '@/components/ui/dialog'
import FiledUploader from "@/app/custom-components/FiledUploader"
import { X } from "lucide-react"
import { ToggleContext, ToggleContextProps } from "@/app/context/ToggleCotext"
import ChatInterface from "@/app/custom-components/ChatInterface"

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
    return <ChatInterface _chats={_chats} chatId={chatId} currentChat={currentChat as DrizzleChats} />
}

export default ChatRoom