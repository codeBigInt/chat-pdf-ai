"use client"

import { SidebarTrigger } from "@/components/ui/sidebar"
import { UserButton, useUser } from '@clerk/nextjs'

export function DashboardNav() {
  const { user } = useUser()
  return (
    <nav className="bg-white border-b p-4 flex items-center md:justify-end justify-between">
      <div className="items-center lg:hidden flex">
        <SidebarTrigger className="" />
      </div>
      <div className="flex flex-row-reverse gap-2 items-center">
        <UserButton />
        <span className=' truncate whitespace-nowrap md:flex hidden text-[14px] text-ellipsis'>{user?.fullName}</span>
      </div>
    </nav>
  )
}

