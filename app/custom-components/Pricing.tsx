"use client"
import { flutterWaveConfig } from '@/lib/flutterConfig'
import { pricing } from '@/lib/pricingArray'
import { useAuth, useUser } from '@clerk/nextjs'
import { closePaymentModal, useFlutterwave } from 'flutterwave-react-v3'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useAddSubscription, useGetUserSubscription } from '../hookes/hookes'
import { usePathname, useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Check } from 'lucide-react'

const Pricing = () => {
  const { isSignedIn, userId } = useAuth()
  const { mutateAsync: addSubscription } = useAddSubscription();
  const { data: subscription } = useGetUserSubscription(userId as string);
  const { user } = useUser();
  const router = useRouter();
  const [userChoicePlan, setUserChoicePlan] = useState({
    planPrice: 0,
    name: ""
  })
  const pathname = usePathname()

  const config = {
    public_key: flutterWaveConfig.publicKey,
    tx_ref: Date.now().toString(),
    amount: userChoicePlan.planPrice,
    currency: 'NGN',
    payment_options: 'card,mobilemoney,ussd',
    customer: {
      email: user?.primaryEmailAddress?.emailAddress as string,
      phone_number: user?.primaryPhoneNumber?.phoneNumber as string,
      name: user?.fullName as string,
    },
    customizations: {
      title: 'ChatPDF-BOX',
      description: 'Payment for one-time subscription',
      logo: 'https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg',
    },
  }

  const handleFlutterPayment = useFlutterwave(config)

  const handleFreePlanSubscription = async () => {
    if (subscription?.plan === "free") {
      toast.error("You are already subscribed to Free plan")
      return
    }

    try {
      const response = await addSubscription({ userId: userId as string })
      if (response.status === 400) {
        toast.error(response.message)
        return
      }

      if (response.status === 200) {
        toast.success(response.message)
        router.push("/dashboard")
      }
    } catch (error) {
      toast.error("An Error occurred")
      console.error(error)
    }
  }

  const handlePaidPlanSubscription = (planName: string, planPrice: number) => {
    setUserChoicePlan({
      planPrice: planPrice,
      name: planName,
    })

    handleFlutterPayment({
      callback: async (data) => {
        try {
          const response = await addSubscription({ 
            userId: user?.id as string, 
            tx_ref: data.tx_ref, 
            planType: planName.toLowerCase() 
          })
          
          if (response.status === 200) {
            closePaymentModal()
            if (data.status === "successful") {
              toast.success("Payment successful")
              router.push("/dashboard")
              toast.success(response.message)
            } else {
              toast.error("Payment verification failed")
            }
          }
        } catch (error) {
          toast.error("An Error occurred during subscription")
          console.error(error)
        }
      },
      onClose: () => {
        console.log("Payment modal closed")
      },
    })
  }

  const handleUserSelect = (planName: string, planPrice: number, index: number) => {
    if (!user || !isSignedIn) {
      return
    }

    if (index === 0) {
      handleFreePlanSubscription()
    } else {
      handlePaidPlanSubscription(planName, planPrice)
    }
  }

  return (
    <div className='w-full flex flex-col items-center justify-center gap-8 py-16'>
      <h2 className="text-4xl font-bold mb-4">Pricing plan</h2>
      <p>(Choose a subscription plan that suits your need)</p>
      <div className='flex md:flex-row w-full flex-col items-center justify-center gap-8'>
        {pricing.map((pricing, index) => (
          <button 
            key={index} 
            disabled={pricing.title.toLowerCase() === subscription?.plan} 
            onClick={() => {
              if (subscription?.plan === pricing.title.toLowerCase()) {
                router.push("/dashboard")
              } else {
                handleUserSelect(pricing.title, pricing.price, index)
              }
            }}
            className={cn('flex relative flex-col md:items-start items-center md:hover:scale-105 md:w-[25%] w-[70%] gap-2 py-20 shadow-xl p-6 border border-transparent rounded-lg border-purple-500', {
              "border-gray-500": pricing.title.toLowerCase() === subscription?.plan,
              "pointer-events-none": pathname === "/"
            })}
          >
            <h3 className='text-lg font-medium'>{pricing.title} {index > 0 ? "(one-time)" : ""}</h3>
            <h4 className='text-2xl font-bold text-transparent hover:bg-white/20 hover bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text'>
              NGN{pricing.price}
            </h4>
            <ul className='list-disc list-inside py-6 flex flex-col items-start gap-4'>
              {pricing.features.map((feature, index) => (
                <li key={index} className='text-gray-400 text-[14px] w-full md:text-left text-center text-wrap md:list-disc list-none'>{feature}</li>
              ))}
            </ul>
            {pricing.title.toLowerCase() === subscription?.plan && (
              <span className='absolute right-4 bg-green-500 p-1 rounded-full'>
                <Check />
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}

export default Pricing