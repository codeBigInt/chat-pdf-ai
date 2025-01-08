"use client"
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { MessageSquare } from 'lucide-react'
import Logo from './Logo'
import { useAuth, UserButton, useUser } from '@clerk/nextjs'


export default function Header() {
  const { isSignedIn } = useAuth()
  const { user } = useUser()
  return (
    <header className="py-4 px-4 sm:px-6 lg:px-8 border-b border-white/10">
      <div className="container mx-auto flex justify-between items-center">
        <Logo />
        {!isSignedIn && (<nav className="hidden md:flex space-x-8">
          <Link href="#features" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Features</Link>
          <Link href="#how-it-works" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">How It Works</Link>
          <Link href="#pricing" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Pricing</Link>
        </nav>)}
        {
          isSignedIn ? (
            <div className="flex items-center gap-2">
              <span className='capitalize'>{user?.firstName}</span>
              <UserButton />
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link href={"/auth/sign-in"}>
                <Button variant="ghost" className="text-gray-400 hover:text-black">Log in</Button>
              </Link>
              <Link href={"/auth/sign-up"}>
                <Button>Sign up</Button>
              </Link>
            </div >
          )
        }
      </div >
    </header >
  )
}

