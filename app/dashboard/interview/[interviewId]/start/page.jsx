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

    const handleNextQuestion = () => {
        setActiveQuestionIndex((prev) => prev + 1);
    };
    
    const handlePrevQuestion = () => {
        setActiveQuestionIndex((prev) => prev - 1);
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
            <div className="mt-6 relative">
    <div className="absolute bottom-4 left-4">
        {activeQuestionIndex > 0 && (
            <Button onClick={handlePrevQuestion} className="px-4 py-2 bg-purple-600 text-white rounded">
                Previous Question
            </Button>
        )}
    </div>

    <div className="absolute bottom-4 right-4">
        {activeQuestionIndex !== mockInterviewQuestion.length - 1 ? (
            <Button onClick={handleNextQuestion} className="px-4 py-2 bg-purple-600 text-white rounded">
                Next Question
            </Button>
        ) : (
            <Link href={'/dashboard/interview/' + interviewData?.mockId + '/feedback'}>
                <Button className="px-4 py-2 bg-red-600 text-white rounded">
                    End Interview
                </Button>
            </Link>
        )}
    </div>
</div>

        </div>
    );
}

export default StartInterview;
