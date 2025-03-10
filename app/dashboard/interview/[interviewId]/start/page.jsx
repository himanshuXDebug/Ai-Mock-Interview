"use client";
import React, { useEffect, useState } from 'react';
import { MockInterview } from '@/utils/schema';
import { db } from '@/utils/db';
import { eq } from 'drizzle-orm';
import QuestionSection from './_components/QuestionSection';
import RecordAnswerSection from './_components/RecordAnswerSection';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

function StartInterview({ params }) {
    const resolvedParams = React.use(params);
    const interviewId = resolvedParams?.interviewId;

    const [interviewData, setInterviewData] = useState();
    const [mockInterviewQuestion, setMockInterviewQuestion] = useState([]);
    const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

    useEffect(() => {
        if (interviewId) {
            GetInterviewDetails();
        }
    }, [interviewId]);

    const GetInterviewDetails = async () => {
        try {
            const result = await db
                .select()
                .from(MockInterview)
                .where(eq(MockInterview.mockId, interviewId));

            if (result.length === 0) {
                throw new Error("No interview found with the given ID");
            }

            const jsonMockResp = JSON.parse(result[0].jsonMockResp);
            setMockInterviewQuestion(jsonMockResp);
            setInterviewData(result[0]);
            console.log(jsonMockResp);
        } catch (error) {
            console.error("Error fetching interview details:", error);
        }
    };

    return (
        <div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
                <QuestionSection
                    mockInterviewQuestion={mockInterviewQuestion}
                    activeQuestionIndex={activeQuestionIndex}
                />
                <RecordAnswerSection
                   mockInterviewQuestion={mockInterviewQuestion}
                   activeQuestionIndex={activeQuestionIndex}
                   interviewData={interviewData}
                   mockId={interviewData?.mockId || interviewId}
                />
            </div>
            <div className='flex justify-end gap-6'>
                {activeQuestionIndex>0&&
                <Button onClick={()=>setActiveQuestionIndex(activeQuestionIndex-1)}>Previous Question</Button>
                }
                {activeQuestionIndex!=mockInterviewQuestion.length-1&&
                <Button onClick={()=>setActiveQuestionIndex(activeQuestionIndex+1)}>Next Question</Button>
                }
                {activeQuestionIndex==mockInterviewQuestion.length-1&&
                <Link href={'/dashboard/interview/'+interviewData?.mockId+'/feedback'}>
                <Button >End Interview</Button>
                </Link>
                }
            </div>
        </div>
    );
}

export default StartInterview;
