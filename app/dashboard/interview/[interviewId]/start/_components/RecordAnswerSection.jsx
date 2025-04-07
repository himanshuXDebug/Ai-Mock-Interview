import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/button';
import { Mic, StopCircle } from 'lucide-react';
import { toast } from 'sonner';
import { chatSession } from '@/utils/GeminiAIModel';
import useSpeechToText from 'react-hook-speech-to-text';
import { UserAnswer } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import moment from 'moment/moment';
import { db } from '@/utils/db';

const Webcam = dynamic(() => import('react-webcam'), { ssr: false });

function RecordAnswerSection({ mockInterviewQuestion, activeQuestionIndex, interviewData, mockId }) {
  const [userAnswer, setUserAnswer] = useState('');
  const [isSpeechAvailable, setIsSpeechAvailable] = useState(false);
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [feedbackData, setFeedbackData] = useState(null);
  const [isWaitingForFeedback, setIsWaitingForFeedback] = useState(false);

  const {
    error,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
    setResults,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  useEffect(() => {
    if (typeof window !== 'undefined' && (window.SpeechRecognition || window.webkitSpeechRecognition)) {
      setIsSpeechAvailable(true);
      console.log("Speech recognition is available.");
    } else {
      console.log("Speech recognition is NOT available.");
    }
  }, []);

  useEffect(() => {
    if (results && results.length > 0) {
      const combinedText = results.map((result) => result.transcript).join(' ');
      console.log("Speech recognition results:", combinedText);
      setUserAnswer(combinedText);
    }
  }, [results]);

  useEffect(() => {
    console.log("User Answer updated:", userAnswer);
  }, [userAnswer]);

  useEffect(() => {
    if (!isRecording) {
      if (userAnswer.trim().length === 0) {
       
        console.log("No answer provided.");
      } else if (userAnswer.trim().length < 20) { 
        toast("Answer is too short, please try again.", {
          style: { color: '#d9534f' }
        });
        console.log("Answer is too short, not processing.");
        setUserAnswer('');
      } else {
        console.log("Recording stopped and answer length is sufficient. Initiating feedback process...");
        UpdateuserAnswer();
      }
    }
  }, [isRecording]);

  const StartStopRecording = async () => {
    if (!isSpeechAvailable) {
      toast('Speech recognition is not supported in your browser.', {
        style: { color: '#d9534f' }
      });
      return;
    }
    if (!startSpeechToText || !stopSpeechToText) {
      toast('Speech functions are not available. Please try again.', {
        style: { color: '#d9534f' }
      });
      return;
    }
    if (isRecording) {
      stopSpeechToText();
      toast('Recording stopped', {
        style: { color: 'red' }
      });
      console.log("Recording stopped by user.");
    } else {
      startSpeechToText();
      toast('Recording started', {
        style: { color: '#5cb85c' }
      });
      console.log("Recording started by user.");
    }
  };

  const UpdateuserAnswer = async () => {
    if (!mockId) {
      toast('Mock ID is missing. Cannot save answer!', {
        style: { color: '#d9534f' }
      });
      console.error('Mock ID is null or undefined.');
      return;
    }

    setLoading(true);
    setIsWaitingForFeedback(true);
    console.log("User Answer before sending for feedback:", userAnswer);
    toast('Processing your answer, please wait for feedback...', {
      style: { color: '#337ab7' }
    });

    const feedbackPrompt = `Question: ${mockInterviewQuestion[activeQuestionIndex]?.question},\nUser Answer: ${userAnswer}.\nProvide detailed feedback with separate ratings for confidence, communication, skills, and language proficiency (1-10) along with an overall feedback message. Respond in JSON format with "feedback", "overallRating", "confidenceRating", "communicationRating", "skillsRating", and "languageRating" fields.`;

    try {
      const result = await chatSession.sendMessage(feedbackPrompt);
      const rawResponse = await result.response.text();
      const processedResponse = rawResponse.replace('```json', '').replace('```', '').trim();
      console.log("Raw AI Feedback Response:", rawResponse);
      console.log("Processed AI Feedback Response:", processedResponse);

      const parsedFeedback = JSON.parse(processedResponse);
      console.log("Parsed AI Feedback:", parsedFeedback);

      await new Promise(resolve => setTimeout(resolve, 3000));

      const resp = await db.insert(UserAnswer).values({
        mockIdRef: mockId,
        question: mockInterviewQuestion[activeQuestionIndex]?.question,
        correctAns: mockInterviewQuestion[activeQuestionIndex]?.answer,
        userAns: userAnswer,
        feedback: parsedFeedback?.feedback,
        rating: parsedFeedback?.overallRating,
        confidenceRating: parsedFeedback?.confidenceRating,
        communicationRating: parsedFeedback?.communicationRating,
        skillsRating: parsedFeedback?.skillsRating,
        languageRating: parsedFeedback?.languageRating,
        userEmail: user?.primaryEmailAddress?.emailAddress,
        createdAt: moment().format('DD-MM-YY')
      });
      console.log("DB Insert Response:", resp);
      if (resp) {
        toast('Answer saved successfully!', {
          style: { color: '#5cb85c' }
        });
        setResults([])
        console.log("Answer saved in DB successfully.");
      }
      setResults([])
      
      setFeedbackData(parsedFeedback);
      setUserAnswer('');
    } catch (error) {
      console.error("Error getting feedback or saving answer:", error);
      toast('Error processing feedback. Please try again.', {
        style: { color: '#d9534f' }
      });
    } finally {
      setLoading(false);
      setIsWaitingForFeedback(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col mt-20 justify-center items-center bg-black rounded-lg p-5 gap-4">
        <Image src="/webcam.png" width={250} height={250} alt="Icon" className="absolute" />
        <Webcam
          mirrored={true}
          style={{ height: 300, width: '100%', zIndex: 10 }}
        />
      </div>

      <Button variant="outline" className="my-10" onClick={StartStopRecording} disabled={loading}>
        {isRecording ? (
          <h2 className="text-red-600 animate-pulse flex gap-2 items-center">
            <StopCircle className="mr-2" /><strong>Recording...</strong>
          </h2>
        ) : (
          <h2 className="text-primary flex gap-2 items-center"><Mic className="mr-2" /><strong>Record Answer</strong></h2>
        )}
      </Button>
    </div>
  );
}

export default RecordAnswerSection;
