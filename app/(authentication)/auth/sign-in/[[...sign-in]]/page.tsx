import Header from '@/app/custom-components/Header'
import { SignIn } from '@clerk/nextjs'
import React from 'react'


const SignInPage = () => {
    return (
        <div className='flex flex-col w-full bg-black min-h-[100vh]'>
            <Header />
            <div className='flex flex-col flex-1 items-center justify-center w-full h-full'>
                <SignIn />
            </div>
        </div>
    )
}

export default SignInPage