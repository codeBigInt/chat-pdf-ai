"use client"

import { FileText, Home, HomeIcon, LogOut } from 'lucide-react'
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
import { UserButton, useUser } from '@clerk/nextjs'

export function AppSidebar() {
  const { user } = useUser()
  return (
    <Sidebar>
      <SidebarHeader className='bg-gray-800 text-white'>
        <h2 className="text-xl font-bold p-4">PDF Viewer</h2>
      </SidebarHeader>
      <SidebarContent className='bg-gray-800 text-white'>
        <SidebarGroup className='flex-1'>
          <SidebarGroupLabel className='text-white'>Main Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/dashboard/documents">
                    <FileText className="w-4 h-4 mr-2" />
                    <span>Documents</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/dashboard">
                    <Home className="w-4 h-4 mr-2" />
                    <span>Chats</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <div className='flex flex-col gap-4'>
            <Link href={"/subscription"} className="md:w-max w-[80%]">
              <button className="px-4 py-3 w-full justify-center bg-transparent border-dashed border rounded-lg text-white flex items-center gap-2">
                <span>Manage subscription</span>
              </button>
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

