"use client"
import Header from './Header'
import Hero from './Hero'
import Features from './Features'
import HowItWorks from './HowItWorks'
import CTA from './CTA'
import Footer from './Footer'
import Pricing from './Pricing'

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-black text-white">
            <Header />
            <main>
                <Hero />
                <Features />
                <HowItWorks />
                <Pricing />
                <CTA />
            </main>
            <Footer />
        </div>
    )
}

export default LandingPage
