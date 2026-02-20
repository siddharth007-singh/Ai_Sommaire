import { SignIn } from '@clerk/nextjs'

const SignInPage = () => {
  return (
   <section className='flex justify-center items-center lg:min-h-[40vh]'>
    <SignIn/>
   </section>
  )
}

export default SignInPage