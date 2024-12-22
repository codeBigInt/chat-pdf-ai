import { Loader } from 'lucide-react'
import React from 'react'
interface Props {
    className?: string
    message: string
    subtext: string
}
const LoadingComponent = ({className, message, subtext}: Props) => {
    return (
        <div className={`flex flex-col items-center justify-center relative min-h-full overflow-y-hidden max-h-full w-full ${className}`}>
            <div className='flex flex-col gap-2 items-center text-gray-500'>
                <Loader size={32} className='text-gray-700 animate-spin' />
                <p className='text-[14px] capitalise'>{message}</p>
                <span className='text-gray-500 capitalise text-[11px]'>{subtext}</span>
            </div>
        </div>
    )
}

export default LoadingComponent
