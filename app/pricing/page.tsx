import React from 'react'
import Header from '../custom-components/Header'
import Pricing from '../custom-components/Pricing'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const PricingPage = async () => {
    return (
        <div className="min-h-screen bg-black text-white">
            <Header />
            <Pricing />
            <div className='w-full flex justify-center pb-10'>
                <Link href={"/dashboard"}>
                    <Button className="border bg-transparent w-max">
                        Back To Dashboard
                    </Button>
                </Link>
            </div>
        </div>
    )
}

export default PricingPage
