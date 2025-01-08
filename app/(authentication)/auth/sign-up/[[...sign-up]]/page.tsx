import { SignUp } from '@clerk/nextjs'
import React from 'react'


const SignUpPage = () => {
  return (
    <div className='flex justify-center bg-black items-center min-h-[100vh]'>
        <SignUp signInFallbackRedirectUrl={"/dashboard"}/>
    </div>
  )
}

export default SignUpPage