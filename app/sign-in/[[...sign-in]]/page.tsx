import { SignIn } from '@clerk/nextjs'

type Props = {}

const SignInPage = (props: Props) => {
  return (
   <section className='flex justify-center items-center lg:min-h-[40vh]'>
    <SignIn/>
   </section>
  )
}

export default SignInPage