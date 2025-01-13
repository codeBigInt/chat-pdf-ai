"use client"
import { uploadFile } from '@/lib/s3'
import { CloudUpload, MessagesSquare, PaintbrushVertical, PaintBucket } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useDropzone } from "react-dropzone"
import { useGetUserSubscription, useSendUplaod } from "../hookes/hookes"
import { SendUploadType } from '@/lib/type'
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import { useAuth } from '@clerk/nextjs'
const FiledUploader = ({ className }: { className?: string }) => {
    const router = useRouter()
    const { mutate: sendUpload, isPending } = useSendUplaod()
    const [index, setIndex] = useState(0)
    const { userId } = useAuth()
    const { data: subscription } = useGetUserSubscription(userId as string);
    const [uploading, setUploading] = useState(false)
    const loaderArr: { status: string, icon: React.ReactNode }[] = [
        {
            status: "Spilling Tea to AI...",
            icon: <PaintBucket size={28} color='#a855f7' />
        },
        {
            status: "Saving to Assets",
            icon: <CloudUpload size={28} color='#a855f7' />
        },
        {
            status: "Creating Chat room",
            icon: <MessagesSquare size={28} color='#a855f7' />
        },
        {
            status: "Preparing Chat room",
            icon: <PaintbrushVertical size={28} color='#a855f7' />
        },
        {
            status: "Redirecting in a bit",
            icon: <PaintbrushVertical size={28} color='#a855f7' />
        }
    ]
    const DELAY = 3000;

    useEffect(() => {
        const loadInterval = setInterval(() => {
            if (index >= loaderArr.length - 1) {
                setIndex(0)
            }

            setIndex(prev => prev + 1)
        }, DELAY)

        return () => clearInterval(loadInterval)
    }, [index])

    const { getInputProps, getRootProps } = useDropzone({
        accept: { "application/pdf": [".pdf"], "application/docx": [".docx"] },
        maxFiles: 1,
        onDrop: async (acceptedFiles) => {
            const file = acceptedFiles[0]
            console.log("file", file)
            if (!subscription) {
                if (file.size > (5 * 1024 * 1024)) {
                    toast.error("Free plan users can only upload files up to 5MB");
                    return;
                }
            } else if (subscription.plan === "pro") {
                if (file.size > (15 * 1024 * 1024)) {
                    toast.error("Pro plan users can only upload files up to 15MB");
                    return;
                }
            } else if (subscription.plan === "premium") {
                if (file.size > (25 * 1024 * 1024)) {
                    toast.error("Premium plan users can only upload files up to 25MB");
                    return;
                }
            }
            setUploading(true)
            try {
                // Send files to aws backend
                const data = await uploadFile(file)
                console.log("data", data)
                const param: SendUploadType = { file_name: data?.fileName as string, file_key: data?.fileKey as string }
                // Send to our backend and the convert to vector-embeddings to be sent to the backend
                sendUpload(param, {
                    onSuccess: ({ data }) => {
                        toast.success("uploded successfully");
                        router.push(`/chats/${data.chat_id}`)
                        setUploading(false)
                        console.log(data)
                    },
                    onError: (error) => {
                        console.error(error)
                        toast.error(error.message)
                    },
                })
                console.log(data);
            } catch (error) {
                console.error(error);
            } finally {
                setUploading(false)
            }
        }
    })
    return (
        <div className='w-full flex justify-center'>
            <div {...getRootProps({
                className: `flex flex-col cursor-pointer py-8 px-4 w-[80%] rounded-lg border border-dashed border-gray-700 min-w-[200px] md:max-w-[40%] bg-white ${className}`
            })}>
                <input {...getInputProps()} />
                <div className="flex flex-col gap-3 items-center w-full">
                    {
                        isPending || uploading ? (<div className={`flex flex-col gap-3 py-8 transition animate-in delay-[${DELAY}] items-center`}>
                            <span className='bg-gray-300 rounded-lg p-2 justify-center items-center flex w-max text-purple-500'>{loaderArr[index].icon}</span>
                            <span className='text-gray-400 capitalize text-nowrap text-[14px]'>{loaderArr[index].status}</span>
                            <span>{ }</span>
                        </div>) : (
                            <>
                                <CloudUpload size={40} className='text-5xl text-gray-600' />
                                <span className='text-xl lg:text-lg text-gray-500'>Drag and Drop file</span>
                                <span className='text-xs text-gray-500'><span className='text-blue-600'>OR</span> click to select file</span>
                            </>

                        )
                    }
                </div>


            </div>
        </div>
    )
}

export default FiledUploader