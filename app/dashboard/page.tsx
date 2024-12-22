import { DashboardShell } from "@/components/DashboardShell"
import { PDFCard } from "@/components/PdfCard"
import { PackageOpen } from "lucide-react"
import { redirect } from "next/navigation"
import { auth } from "@clerk/nextjs/server"
import { db } from "@/lib/db"
import { chats } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import { Suspense } from "react"
import LoadingComponent from "../custom-components/LoadingComponent"

export default async function DashboardPage() {
    const { userId } = await auth()
    if (!userId) {
        redirect("/")
    }
    const _chats = await db.select().from(chats).where(eq(chats.userId, userId))

    return (
        <DashboardShell>
            <Suspense fallback={<LoadingComponent message="Just a momment" subtext="Fetching chats" />}>
                <div>

                    {
                        _chats && _chats.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                {
                                    _chats?.map((chat) => (
                                        <PDFCard
                                            key={chat.id}
                                            name={chat.pdfName}
                                            imageUrl={chat.pdfUrl}
                                            creationDate={chat.createdAt}
                                            id={String(chat.id)}
                                        />
                                    ))
                                }
                            </div>
                        ) : (
                            <div className="flex w-full justify-center items-center min-h-screen h-full">
                                <div className='w-full min-h-full flex flex-col-reverse gap-2 justify-center items-center'>
                                    <span className='text-gray-500 text-[11px]'>Start chatting with your pdf</span>
                                    <span className='text-gray-500 text-[14px]'>You have no messages</span>
                                    <PackageOpen size={40} className='text-gray-400' />
                                </div>
                            </div>
                        )
                    }
                </div>
            </Suspense>
        </DashboardShell>
    )
}

