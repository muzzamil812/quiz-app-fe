"use client"

import Image from 'next/image'
import SignUpForm from './SignUpForm'

function Page() {
  return (
    <div className='w-[100%] h-[100vh] flex justify-center items-center'>
      <div className='w-[50%] h-[100%] flex justify-center items-center'>
        <Image src={'/image.png'} alt='Logo' width={100} height={100} />
      </div>
      <div className='w-[50%] h-[100%] flex justify-center items-center'>
        <SignUpForm />
      </div>
    </div>
  )
}

export default Page