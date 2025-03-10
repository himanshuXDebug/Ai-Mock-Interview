"use client"
import React from 'react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

function InterviewItemCard({interview}) {
    const router=useRouter();

    const onStart=()=>{
        router.push('/dashboard/interview/'+interview.mockId)
    }

    const onFeedBack=()=>{
        router.push('/dashboard/interview/'+interview.mockId+'/feedback')
    }
  return (
    <div className='border rounded-lg p-4 shadown-sm' >
         <h2 className='font-bold text-primary'
          style={{ textTransform: 'capitalize' }}
         >{interview?.jobPosition}</h2>
        <h2 className='text-sm text-gray-600'>{interview.jobExperience} Years of experience</h2>
        <h2 className='text-xs text-gray-400 mt-5'> Created At : {interview.createdAt}</h2>
        <div className='flex justify-between mt-2 gap-5'>
            <Button size="sm" varient="outline" className="w-full" onClick={onFeedBack}>Feedback</Button>
            <Button size="sm" className="w-full" onClick={onStart}>Start</Button>
        </div>
    </div>
  )
}

export default InterviewItemCard