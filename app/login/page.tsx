"use client"

import Image from 'next/image'
import LoginForm from './LoginForm'

function Page() {
  return (
    <div className='w-[100%] h-[100vh] flex justify-center items-center'>
      <div className='w-[50%] h-[100%] flex justify-center items-center'>
        <Image src={'/image.png'} alt='Logo' width={100} height={100} />
      </div>
      <div className='w-[50%] h-[100%] flex justify-center items-center'>
        <LoginForm />
      </div>
    </div>
  )
}

export default Page