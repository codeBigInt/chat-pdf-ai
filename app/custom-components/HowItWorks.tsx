import { Button } from "@/components/ui/button"
import Image from 'next/image'

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 border-t border-white/10">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h2 className="text-3xl font-bold">Start chatting with your PDFs in seconds</h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                  1
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Upload your document</h3>
                  <p className="text-gray-400">Drag and drop your PDF or click to upload. We'll process it instantly.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-500 font-bold">
                  2
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Ask anything</h3>
                  <p className="text-gray-400">Type your questions in natural language. Our AI understands context.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-pink-500/10 flex items-center justify-center text-pink-500 font-bold">
                  3
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Get instant answers</h3>
                  <p className="text-gray-400">Receive accurate responses with citations from your document.</p>
                </div>
              </div>
            </div>
            <Button size="lg" className="text-lg bg-transparent border px-8">
              Try it now
            </Button>
          </div>
          <div className="relative">
            <div className="absolute inset-0 z-10 shadow-lg" />
            <Image
              src="/images/demo.png"
              alt="PDFChat Demo"
              width={600}
              height={400}
              className="rounded-xl border border-white/10 shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

