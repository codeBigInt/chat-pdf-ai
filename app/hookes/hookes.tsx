import { useMutation, useQuery } from "@tanstack/react-query"
import { fetchUserPdf, sendMessages, sendUpload } from "../action"
import { SendUploadType } from "@/lib/type"


export const useSendUplaod = () => {
    return useMutation({
        mutationKey: ['sendUplaod'],
        mutationFn: (data: SendUploadType) => sendUpload(data)
    })
}

export const useSendMessage = () => {
    return useMutation({
        mutationKey: ["sendMessages"],
        mutationFn: ({ message, chatId, role }: { message: string, chatId: number, role: "user" | "system" }) => sendMessages(message, chatId, role),
    })
}

export const useFetchPdf = (userId: string) => {
    console.log("userId hookes:", userId);
    
    return useQuery({
        queryKey: ["user"],
        queryFn: async () => await fetchUserPdf(userId)
    })
}