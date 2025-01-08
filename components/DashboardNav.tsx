"use client"

import { SidebarTrigger } from "@/components/ui/sidebar"
import { UserButton, useUser } from '@clerk/nextjs'

export function DashboardNav() {
  const { user } = useUser()
  return (
    <nav className="bg-transparent lg:hidden border-b sticky border-gray-400 p-4 flex text-gray-400 items-center md:justify-end justify-between">
      <div className="items-center lg:hidden flex">
        <SidebarTrigger />
      </div>
      <div className="flex flex-row-reverse gap-2 items-center">
        <UserButton />
        <span className=' truncate whitespace-nowrap md:flex hidden text-[14px] text-ellipsis'>{user?.fullName}</span>
      </div>
    </nav>
  )
}

