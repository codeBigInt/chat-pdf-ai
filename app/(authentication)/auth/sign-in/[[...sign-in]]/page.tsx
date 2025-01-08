import { SignIn } from '@clerk/nextjs'
import React from 'react'


const SignInPage = () => {
    return (
        <div className='flex justify-center bg-black items-center min-h-[100vh]'>
            <SignIn signUpFallbackRedirectUrl={"/dashboard"} />
        </div>
    )
}

export default SignInPage