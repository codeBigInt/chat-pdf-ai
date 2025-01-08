import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function CTA() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-500 to-pink-500  text-white">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Chat with Your PDFs?</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Start using our AI-powered chatbot today and unlock the knowledge hidden in your PDF documents.
        </p>
        <Link href="/auth/sign-up">
          <Button size="lg" variant="secondary" className="text-lg px-8 bg-white text-primary hover:bg-gray-100">
            Get Started for Free
          </Button>
        </Link>
      </div>
    </section>
  )
}

