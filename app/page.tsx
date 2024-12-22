import { UserButton } from "@clerk/nextjs";
import { auth, currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import { ArrowRight, LogIn } from "lucide-react"
import FiledUploader from "./custom-components/FiledUploader";

export default async function Home() {
  const { userId } = await auth()
  const user = await currentUser()
  const isAuthenticated = userId !== null
  

  return (
    <div className="w-full min-h-[100vh] overflow-x-hidden flex flex-col items-center bg-gradient-to-r from-rose-100 to-teal-100">
      <div className="w-full flex flex-col md:p-8 p-4 items-center">
        {isAuthenticated && <div className="flex items-center justify-end w-full gap-3">
          <span className="text-[18px] font-semibold">Welcome Back, {user?.firstName}</span>
          <UserButton />
        </div>}
        <main className="md:py-6 py-10 w-full flex gap-4 flex-col items-center">
          <h3 className="md:text-[35px] text-[24px]">Chat with any PDF</h3>
          <div className="flex w-full md:w-max justify-center">
            {isAuthenticated && <div className="flex md:flex-row flex-col md:w-max w-full gap-4 items-center">
              <Link href={"/chats"} className="md:w-max w-[80%]">
                <button className="px-4 py-3 w-full justify-center bg-black rounded-lg text-white flex items-center gap-2">
                  <span>Go to Chats</span>
                  <ArrowRight />
                </button>
              </Link>
              <Link href={"/dashboard"} className="md:w-max w-[80%]">
                <button className="px-4 py-3 w-full justify-center bg-white rounded-lg text-slate-700 flex items-center gap-2">
                  <span>View Dashboard</span>
                </button>
              </Link>
            </div>}
          </div>
          <p className="max-w-xl text-[14px] text-center text-slate-600">Join millions of students, researchers and professionals to answer questions and understand research with AI</p>
          {isAuthenticated ? (
           <div className="w-full">
             <FiledUploader />
           </div>
          ) : (
            <Link href={"/auth/sign-in"}>
              <button className="px-4 py-3 bg-black rounded-lg text-white flex items-center gap-2">
                <span>Login to get started</span>
                <LogIn />
              </button>
            </Link>
          )}
        </main>
      </div>
    </div>
  );
}
