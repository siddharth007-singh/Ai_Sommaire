"use client"

import { FileTextIcon } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Badge } from '../ui/badge'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { ensureUserInDb } from '@/app/actions/upload-action'

type Props = {}

const Header =(props: Props) => {

    // await ensureUserInDb();

    const isLoggedIn = false; // Replace with actual authentication logic

    const pathname = usePathname();

    const isActive = (href: string) => {
        return pathname === href || (href !== "/" && pathname.startsWith(href));
    };

    return (
        <div className=''>
            <nav className='container flex items-center justify-between py-4 lg:px-8 px-2 mx-auto'>
                <div className='flex lg:flex-1'>
                    <Link href={"/"} className='flex items-center gap-1 lg:gap-2 shrink-0'>
                        <FileTextIcon className='w-5 h-5 lg:w-8 lg:h-8 text-gray-900 hover:rotate-12' />
                        <span className='font-extrabold text-gray-900'>Sommaire</span>
                    </Link>
                </div>

                <div className='flex lg:justify-center gap-4 lg:gap-12 lg:items-center'>
                    <SignedIn>
                        <Link href="/dashboard">Your Summaries </Link>
                    </SignedIn>
                </div>

                <div className='flex lg:justify-end lg:flex-1'>
                    <SignedIn>
                        <div className='flex gap-2 items-center'>
                            <Link href="/upload">Upload a PDF </Link>
                            <div>Pro</div>
                            <SignedIn>
                                <UserButton/>
                            </SignedIn>
                        </div>
                    </SignedIn>

                    <SignedOut>
                        <Link href="/sign-in">Sign In </Link>
                    </SignedOut>
                </div>
            </nav>
        </div>
    )
}

export default Header