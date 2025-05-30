"use client"
import { MockInterview } from '@/utils/schema';
import React, { useEffect, useState } from 'react';
import { db } from '@/utils/db';
import { eq } from 'drizzle-orm';
import Webcam from 'react-webcam';
import { Lightbulb, WebcamIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Dashboard from '../../page';
import Link from 'next/link';

function Interview({ params }) {
  const resolvedParams = React.use(params);
  const interviewId = resolvedParams.interviewId;
  const [interviewData,setInterviewData]=useState("");
  const [webCamEnabled,setWebCamEnabled]=useState(false);
  useEffect(() => {
    console.log(interviewId);
    GetInterviewDetails();
  }, [interviewId]); // Add interviewId as dependency


  const GetInterviewDetails = async () => {
    try {
      const result = await db.select()
        .from(MockInterview)
        .where(eq(MockInterview.mockId, interviewId));
        console.log("Second Response");
      console.log(result);
      setInterviewData(result[0]);
      } catch (error) {
      console.error("Error fetching interview details:", error);
    }
  }

  return (
    <div className='my-10'>
      <h2 className='font-bold text 2xl:'>Lets Get Started </h2>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>

        <div className='flex flex-col my-5 gap-5'> 
          <div className='flex flex-col p-5 rounded-lg border'>
          <h2 className='text-lg'><strong>Job Role/Job Position : </strong>{interviewData.jobPosition}</h2>
          <h2 className='text-lg'><strong>Job Description/Tech Stack : </strong>{interviewData.jobDesc}</h2>
          <h2 className='text-lg'><strong>Year of Experience : </strong>{interviewData.jobExperience}</h2>
          </div>
          <div className='p-5 border rounded-lg border-yellow-300 bg-yellow-100'>
            <h2 className='flex gap-2 items-center text-yellow-500'><Lightbulb/><strong>Information</strong></h2>
            <h2 className='mt-3 text-yellow-500'>{process.env.NEXT_PUBLIC_INFORMATION}</h2>
          </div>
        </div>
      <div>
      {webCamEnabled? <Webcam
      onUserMedia={()=>setWebCamEnabled(true)}
      onUserMediaError={()=>setWebCamEnabled(false)}
      mirrored={true}
      style={{
        height:300,
        width:300
      }}
      />
      :
      <>
        <WebcamIcon className='h-72 w-full my-7 p-5 bg-secondary rounded-lg border '/>
        <Button variant="ghost" className="w-full" onClick={()=>setWebCamEnabled(true)}>Enable Web Cam and Microphone</Button>
        </>
        }
        </div>

      </div>
      <div className='flex justify-end items-end'>
        <Link href={'/dashboard/interview/'+interviewId+'/start'}>
      <Button>Start interview</Button>
      </Link>
      </div>
    </div>
  )
}

export default Interview