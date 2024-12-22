import { DrizzleChats } from "@/lib/db/schema"
import { SendUploadType } from "@/lib/type"
import { Message } from "ai"
import axios from "axios"

export async function sendUpload(data: SendUploadType){
    try {
        const response = await axios.post("/api/send-upload", data)
        return response.data
    } catch (error) {
        console.error(error)
        throw new Error("Failed to send file")
    }
}
export async function sendMessages(message: string, chatId: number, role: "user" | "system"){
    const data = {message, chatId, role}
    try {
        const response = await axios.post("/api/send-messages", data)
        return response.data
    } catch (error) {
        console.error(error)
        throw new Error("Failed to send file")
    }
}

export async function fetchChats(chatId: number){
    try {
        const response = await axios.post<Message[]>(`/api/get-message`, {chatId})
        return response.data
    } catch (error) {
        console.error(error)
        throw new Error("Failed to fetch chats")
    }
}

export async function fetchUserPdf(userId: string){
    console.log(userId, "userID");
    try {
        const response = await axios.post<DrizzleChats[]>(`/api/fetch-pdfs`, {userId})
        return response.data
    } catch (error) {
        console.error(error)
        throw new Error("Failed to fetch pdfs")
    }
}
