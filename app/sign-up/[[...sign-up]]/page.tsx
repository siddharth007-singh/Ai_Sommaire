import { SignUp } from '@clerk/nextjs'
import React from 'react'

const SignUpPage = () => {
  return (
    <section className='flex justify-center items-center lg:min-h-[40vh]'>
        <SignUp/>
    </section>
  )
}

export default SignUpPage