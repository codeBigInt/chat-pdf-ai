import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { db } from "@/lib/db"
import { chats } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import ChatInterface from "@/app/custom-components/ChatInterface"


const ChatRoom = async ({ params }: {params: Promise<{chatId: string}>}) => {
    const chatId = (await (params)).chatId
    const { userId } = await auth()
    if (!userId) {
        return redirect("/")
    }

    const _chats = await db.select().from(chats).where(eq(chats.userId, userId))
    if (!_chats) {
        return redirect("/")
    }

    const currentChat = _chats.find((chat) => chat.id === parseInt(chatId))
    
    if (!currentChat) {
        return redirect("/")
    }

    return (
        <ChatInterface 
            _chats={_chats} 
            chatId={chatId} 
            currentChat={currentChat} 
        />
    )
}

export default ChatRoom