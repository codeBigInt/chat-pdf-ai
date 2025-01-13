import Link from 'next/link'
import Logo from './Logo'

export default function Footer() {
  return (
    <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-white/10">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Logo />
            <p className="text-sm text-gray-400">
              Transform the way you interact with your PDF documents using AI.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold mb-4">Product</h3>
            <ul className="space-y-3">
              <li><Link href="#features" className="text-gray-400 hover:text-white text-sm">Features</Link></li>
              <li><Link href="#pricing" className="text-gray-400 hover:text-white text-sm">Pricing</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white text-sm">API</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white text-sm">Documentation</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              <li><Link href="#" className="text-gray-400 hover:text-white text-sm">About</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white text-sm">Blog</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white text-sm">Careers</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white text-sm">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold mb-4">Legal</h3>
            <ul className="space-y-3">
              <li><Link href="#" className="text-gray-400 hover:text-white text-sm">Privacy</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white text-sm">Terms</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white text-sm">Security</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-white/10">
          <p className="text-center text-sm text-gray-400">
            © {new Date().getFullYear()} PDFChat. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

