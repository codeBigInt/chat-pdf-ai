import { LoaderPinwheel } from 'lucide-react'
import React from 'react'

const Loader = () => {
  return (
    <div className='w-full h-full bg-black flex justify-center items-center'>
      <LoaderPinwheel size={25} className='text-pink-500 animate-spin delay-75' />
    </div>
  )
}

export default Loader
