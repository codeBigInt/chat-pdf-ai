import { flutterWaveConfig } from "@/lib/flutterConfig"
import { User } from "@clerk/nextjs/server"
import { useFlutterwave } from "flutterwave-react-v3"

export const handlePyment = async (user: User, price = 1000) => {
    const config = {
        public_key: flutterWaveConfig.publicKey,
        tx_ref: Date.now().toString(),
        amount: price,
        currency: 'NGN',
        payment_options: 'card,mobilemoney,ussd',
        customer: {
            email: user.primaryEmailAddress?.emailAddress as string,
            phone_number: user.primaryPhoneNumber?.phoneNumber as string,
            name: user.fullName as string,
        },
        customizations: {
            title: 'My store',
            description: 'Payment for items in cart',
            logo: 'https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg',
        },
    }

    const response = useFlutterwave(config)
    return response
} 