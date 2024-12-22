"use client"
import { useState } from "react"
import { AppSidebar } from "./AppSidebar"
import { DashboardNav } from "./DashboardNav"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { Dialog, DialogClose, DialogContent, DialogOverlay, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import FiledUploader from "@/app/custom-components/FiledUploader"
import { Plus, X } from 'lucide-react'

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  return (
    <SidebarProvider defaultOpen={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
      <div className="flex h-screen w-full overflow-hidden">
        <AppSidebar />
        <div className="flex-1 w-full h-screen relative overflow-auto">
          <DashboardNav />
          <SidebarInset>
            <main className="p-6 relative w-full h-full">
              {children}
              <Dialog>
                <DialogTrigger asChild>
                  <button className="fixed z-30 rounded-full shadow-lg bg-blue-600 text-white flex items-center justify-center p-3 bottom-8 right-8 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 hover:outline-none hover:ring-2 hover:ring-blue-500 hover:ring-offset-2">
                    <Plus size={24} />
                  </button>
                </DialogTrigger>
                <DialogOverlay className="bg-black/30 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
                <DialogContent className="fixed w-[90%] left-[50%] top-[50%] z-50 max-w-lg translate-x-[-50%] translate-y-[-50%] rounded-lg bg-white p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg md:w-full">
                  <div className="flex justify-between items-center">
                    <DialogTitle className="text-lg text-gray-500 font-normal mb-4">Upload File</DialogTitle>
                    <DialogClose className=" p-2 rounded-lg border-2 text-gray-400 border-gray-400"><X className="text-gray-600" size={18} /></DialogClose>
                  </div>
                  <div className="border-2 border-dashed border-gray-300 p-4 rounded-md">
                    <FiledUploader className="border-none py-6" />
                  </div>   
                </DialogContent>
              </Dialog>
            </main>
          </SidebarInset>
        </div>
      </div>
    </SidebarProvider>
  )
}

