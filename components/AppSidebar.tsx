"use client"

import { FileText, HomeIcon, LogOut, MessageSquareIcon } from 'lucide-react'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import Link from 'next/link'
import { useAuth, UserButton, useUser } from '@clerk/nextjs'
import Logo from '@/app/custom-components/Logo'
import { useGetUserSubscription } from '@/app/hookes/hookes'

export function AppSidebar() {
  const { user } = useUser()
  const { userId } = useAuth()
  const { data: subscription } = useGetUserSubscription(userId as string)

  return (
    <Sidebar>
      <SidebarHeader className='bg-black text-white'>
        <div className='flex items-center gap-2 p-4'>
          <Logo />
        </div>
      </SidebarHeader>
      <SidebarContent className='bg-black text-white'>
        <SidebarGroup className='flex-1'>
          <SidebarGroupLabel className='uppercase hidden text-gray-500'>Main Menu</SidebarGroupLabel>
          <SidebarGroupContent className='flex flex-col pt-6 gap-4'>
            <SidebarMenu className='flex flex-col gap-2'>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className='bg-gradient-to-r h-12 from-primary via-purple-500 to-pink-500'>
                  <Link href="/dashboard/documents">
                    <FileText className="w-4 h-4 mr-2" />
                    <span>Documents</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className='h-12'>
                  <a href="/dashboard">
                    <MessageSquareIcon className="w-4 h-4 mr-2" />
                    <span>Chats</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <div className='flex flex-col gap-4'>
            <span></span>
            <Link href={"/pricing"} className="px-4 flex hover:bg-white/20 flex-col gap-2 py-3 md:w-max w-[80%] justify-center bg-transparent border-dashed border border-gray-500 rounded-lg text-white items-center">
                <span className='text-[10px] text-gray-500 capitalize'>{subscription?.plan} Plan - {subscription?.limit} credits</span>
                <span>Manage subscription</span>
            </Link>
            <div className="flex gap-4 items-center">
              <UserButton />
              <span className=' truncate whitespace-nowrap text-[14px] text-ellipsis'>{user?.fullName}</span>
            </div>
            <div className="flex gap-3">
              <Link className='text-gray-400 text-[14px] flex items-center gap-2 text-ellipsis' href={"/"}>
                <HomeIcon size={14} />
                <span>Home</span>
              </Link>
              <Link className='text-gray-400 text-[14px] flex items-center gap-2 text-ellipsis' href={"/"}>
                <LogOut size={14} />
                <span>Logout</span>
              </Link>
            </div>
          </div>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}

