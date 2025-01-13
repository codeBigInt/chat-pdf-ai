import { Button } from "@/components/ui/button"
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from "next/link"

export default function Hero() {
  return (
    <section className="pt-20 pb-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-transparent opacity-30" />
      <div className="container mx-auto relative">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-8 leading-tight">
            The only{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
              intelligent
            </span>{' '}
            PDF chat interface
          </h1>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Transform the way you interact with documents. Upload any PDF and start having natural conversations with your content instantly.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/auth/sign-up">
              <Button size="lg" className="text-lg bg-transparent border px-8">
                Try for free <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
        <div id="demo" className="relative mx-auto max-w-6xl shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent z-10" />
          <Image
            src="/images/demo3.png"
            alt="PDFChat Interface"
            width={1200}
            height={800}
            className="rounded-xl border border-white/10 shadow-2xl"
          />
        </div>
      </div>
    </section>
  )
}

