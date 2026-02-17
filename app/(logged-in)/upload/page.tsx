import { Badge } from '@/components/ui/badge'
import UploadForm from '@/components/upload/upload-form'
import { Sparkles } from 'lucide-react'
import React from 'react'


type Props = {}

const UploadePage = (props: Props) => {
  return (
    <section className='min-h-screen'>
        <div className='mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-4'>
            <div className='flex flex-col items-center justify-center gap-6 text-center'>
                <Badge className="relative p-px overflow-hidden rounded-full bg-rose-100 px-3 py-1.5 text-sm font-medium text-rose-700 md:py-2 md:px-4 md:text-base">
                    <Sparkles className="h-6 w-6 mr-2 text-rose-600 animate-pulse"/>
                    <p>Powered by AI</p>
                </Badge>
                <h1 className='text-5xl font-extrabold tracking-tight text-gray-900 sm:text-4xl'>Start Uploading Your PDF's</h1>
                <p className=''>Uploade your PDF and let AI do the magic! ✨</p>

                <UploadForm/>
            </div>
        </div>
    </section>
  )
}

export default UploadePage