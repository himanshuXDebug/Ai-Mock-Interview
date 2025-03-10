"use client"
import { UserAnswer } from '@/utils/schema'
import React, { useEffect, useState } from 'react'
import { db } from '@/utils/db'
import { eq } from 'drizzle-orm'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ChevronsUpDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

function Feedback({ params }) {
  const resolvedParams = React.use(params)
  const interviewId = resolvedParams?.interviewId
  const [feedbackList, setFeedbackList] = useState([])
  const [overallRating, setOverallRating] = useState(0)
  const [skillRating, setSkillRating] = useState(0)
  const [confidenceRating, setConfidenceRating] = useState(0)
  const [communicationRating, setCommunicationRating] = useState(0)
  const [languageRating, setLanguageRating] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [formattedDate, setFormattedDate] = useState('No date available')

  const router = useRouter()
  
  useEffect(() => {
    if (interviewId) {
      GetFeedback()
    } else {
      setIsLoading(false)
    }
  }, [interviewId])

  const GetFeedback = async () => {
    try {
      setIsLoading(true)
      const result = await db.select()
        .from(UserAnswer)
        .where(eq(UserAnswer.mockIdRef, interviewId))
        .orderBy(UserAnswer.id)
        
      console.log("Fetched feedback data:", result)
      
      // Only set feedback if we actually got results
      if (result && result.length > 0) {
        setFeedbackList(result)
        
        // Calculate average ratings
        let skillSum = 0, confidenceSum = 0, communicationSum = 0, languageSum = 0
        let validRatingCount = 0
        
        result.forEach(item => {
          if (item) {
            skillSum += parseInt(item.skillsRating || 0)
            confidenceSum += parseInt(item.confidenceRating || 0)
            communicationSum += parseInt(item.communicationRating || 0)
            languageSum += parseInt(item.languageRating || 0)
            validRatingCount++
          }
        })
        
        if (validRatingCount > 0) {
          setSkillRating(Math.round(skillSum / validRatingCount))
          setConfidenceRating(Math.round(confidenceSum / validRatingCount))
          setCommunicationRating(Math.round(communicationSum / validRatingCount))
          setLanguageRating(Math.round(languageSum / validRatingCount))
          
          // Calculate overall rating
          setOverallRating(Math.round((skillSum + confidenceSum + communicationSum + languageSum) / (validRatingCount * 4)))
        }
        
        // Handle date correctly
        const dateString = result[0]?.createdAt
        if (dateString) {
          // Try to properly format the date based on its format
          try {
            let date
            
            // Check if date is already a date object
            if (dateString instanceof Date) {
              date = dateString
            } 
            // Check if date is in DD-MM-YY format
            else if (typeof dateString === 'string' && dateString.includes('-')) {
              const [day, month, year] = dateString.split('-')
              if (day && month && year) {
                // Assuming the year is in YY format and needs to be converted to 20YY
                date = new Date(`20${year}-${month}-${day}`)
              } else {
                date = new Date(dateString)
              }
            } 
            // Default fallback
            else {
              date = new Date(dateString)
            }
            
            // Verify the date is valid
            if (!isNaN(date.getTime())) {
              // Format properly
              const day = date.getDate().toString().padStart(2, '0')
              const month = (date.getMonth() + 1).toString().padStart(2, '0')
              const year = date.getFullYear().toString().slice(-2)
              setFormattedDate(`${day}-${month}-${year}`)
            } else {
              setFormattedDate('Invalid Date')
            }
          } catch (e) {
            console.error('Date formatting error:', e, dateString)
            setFormattedDate('Error with date')
          }
        } else {
          setFormattedDate('No date available')
        }
      } else {
        // Clear any previous data if no results
        setFeedbackList([])
        setFormattedDate('No date available')
      }
    } catch (error) {
      console.error("Error fetching feedback:", error)
      setFeedbackList([])
    } finally {
      setIsLoading(false)
    }
  }

  // Helper to get color based on rating
  const getRatingColor = (rating) => {
    rating = Number(rating)
    if (rating >= 8) return 'bg-blue-500'
    if (rating >= 6) return 'bg-blue-500'
    if (rating >= 5) return 'bg-yellow-500'
    if (rating >= 4) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  const hasFeedback = feedbackList && feedbackList.length > 0

  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : (
        <>
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-indigo-600 mb-2">Interview Feedback</h1>
            <h2 className="text-xl text-gray-600 mb-6">
              Interview date: {formattedDate}
            </h2>
            
            {hasFeedback && (
              <div className="mt-6">
                <div className="inline-block relative">
                  <div className={`h-36 w-36 rounded-full flex items-center justify-center ${overallRating === 5 ? 'bg-yellow-500' : getRatingColor(overallRating)} text-white mx-auto mb-2`}>
                    <span className="text-4xl font-bold">{overallRating}/10</span>
                  </div>
                  <p className="text-lg font-semibold mt-2">Overall Rating</p>
                </div>
              </div>
            )}
          </div>

          {/* Rating Cards */}
          {hasFeedback && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {/* Technical Skills Card */}
              <div className="bg-white rounded-lg shadow-lg p-6 transition-transform hover:scale-105">
                <div className="flex items-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-600 mr-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M9 10a3 3 0 0 1 3-3 3 3 0 0 1 3 3v4a3 3 0 0 1-3 3 3 3 0 0 1-3-3v-4z" />
                    <path d="M8 16s1.5 2 4 2 4-2 4-2" />
                    <path d="M9 8l-1-2" />
                    <path d="M15 8l1-2" />
                  </svg>
                  <h3 className="text-xl font-semibold">Technical Skills</h3>
                </div>
                <div className="flex items-end">
                  <span className="text-4xl font-bold">{skillRating}/10</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-4">
                  <div className={`h-2.5 rounded-full ${skillRating <= 3 ? 'bg-red-500' : getRatingColor(skillRating)}`} style={{width: `${skillRating * 10}%`}}></div>
                </div>
              </div>
              
              {/* Confidence Card */}
              <div className="bg-white rounded-lg shadow-lg p-6 transition-transform hover:scale-105">
                <div className="flex items-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-600 mr-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2L2 7l10 5 10-5-10-5z" />
                    <path d="M2 17l10 5 10-5" />
                    <path d="M2 12l10 5 10-5" />
                  </svg>
                  <h3 className="text-xl font-semibold">Confidence</h3>
                </div>
                <div className="flex items-end">
                  <span className="text-4xl font-bold">{confidenceRating}/10</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-4">
                  <div className={`h-2.5 rounded-full ${confidenceRating === 5 ? 'bg-yellow-500' : getRatingColor(confidenceRating)}`} style={{width: `${confidenceRating * 10}%`}}></div>
                </div>
              </div>
              
              {/* Communication Card */}
              <div className="bg-white rounded-lg shadow-lg p-6 transition-transform hover:scale-105">
                <div className="flex items-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-600 mr-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                  <h3 className="text-xl font-semibold">Communication</h3>
                </div>
                <div className="flex items-end">
                  <span className="text-4xl font-bold">{communicationRating}/10</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-4">
                  <div className={`h-2.5 rounded-full ${communicationRating === 5 ? 'bg-yellow-500' : getRatingColor(communicationRating)}`} style={{width: `${communicationRating * 10}%`}}></div>
                </div>
              </div>
              
              {/* Language Card */}
              <div className="bg-white rounded-lg shadow-lg p-6 transition-transform hover:scale-105">
                <div className="flex items-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-600 mr-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12.87 15.07l-2.54-2.51.03-.03A17.52 17.52 0 0 0 14.07 6H17V4h-7V2H8v2H1v2h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z" />
                  </svg>
                  <h3 className="text-xl font-semibold">Language</h3>
                </div>
                <div className="flex items-end">
                  <span className="text-4xl font-bold">{languageRating}/10</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-4">
                  <div className={`h-2.5 rounded-full ${languageRating === 6 ? 'bg-blue-500' : getRatingColor(languageRating)}`} style={{width: `${languageRating * 10}%`}}></div>
                </div>
              </div>
            </div>
          )}

          {/* Question Feedback Cards */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Detailed Question Feedback</h2>
            
            {!hasFeedback ? (
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 mx-auto mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="12" y1="20" x2="12" y2="10" />
                  <line x1="18" y1="20" x2="18" y2="4" />
                  <line x1="6" y1="20" x2="6" y2="16" />
                </svg>
                <h3 className="text-xl font-bold text-gray-500">No Interview Feedback Found</h3>
                <p className="text-gray-500 mt-2">Complete an interview to see your feedback here</p>
              </div>
            ) : (
              <div className="space-y-4">
                {feedbackList.map((item, index) => (
                  <Collapsible key={index} className="bg-white shadow-lg rounded-lg overflow-hidden">
                    <CollapsibleTrigger className="flex justify-between items-center w-full p-5 cursor-pointer hover:bg-gray-50">
                      <div className="flex items-center">
                        <div className={`h-10 w-10 rounded-full flex items-center justify-center ${parseInt(item.rating) === 5 ? 'bg-yellow-500' : (parseInt(item.rating) <= 3 ? 'bg-red-500' : getRatingColor(parseInt(item.rating)))} text-white mr-4`}>
                          <span className="font-bold">{item.rating}</span>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800">{item.question}</h3>
                      </div>
                      <ChevronsUpDown className="h-5 w-5 text-gray-500 flex-shrink-0" />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="border-t border-gray-100">
                      <div className="p-5 space-y-4">
                        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
                          <p className="font-semibold text-gray-700">Your Answer:</p>
                          <p className="text-gray-800 mt-1">{item.userAns}</p>
                        </div>
                        
                        <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
                          <p className="font-semibold text-gray-700">Expected Answer:</p>
                          <p className="text-gray-800 mt-1">{item.correctAns}</p>
                        </div>
                        
                        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                          <p className="font-semibold text-gray-700">Feedback:</p>
                          <p className="text-gray-800 mt-1">{item.feedback}</p>
                        </div>
                        
                        {/* Individual ratings for this question */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
                          <div className="text-center">
                            <p className="text-sm text-gray-500">Technical</p>
                            <div className={`h-8 w-8 rounded-full flex items-center justify-center ${parseInt(item.skillsRating || 0) <= 3 ? 'bg-red-500' : getRatingColor(parseInt(item.skillsRating || 0))} text-white mx-auto`}>
                              <span className="text-xs font-bold">{item.skillsRating || 0}</span>
                            </div>
                          </div>
                          <div className="text-center">
                            <p className="text-sm text-gray-500">Confidence</p>
                            <div className={`h-8 w-8 rounded-full flex items-center justify-center ${parseInt(item.confidenceRating || 0) === 5 ? 'bg-yellow-500' : getRatingColor(parseInt(item.confidenceRating || 0))} text-white mx-auto`}>
                              <span className="text-xs font-bold">{item.confidenceRating || 0}</span>
                            </div>
                          </div>
                          <div className="text-center">
                            <p className="text-sm text-gray-500">Communication</p>
                            <div className={`h-8 w-8 rounded-full flex items-center justify-center ${parseInt(item.communicationRating || 0) === 5 ? 'bg-yellow-500' : getRatingColor(parseInt(item.communicationRating || 0))} text-white mx-auto`}>
                              <span className="text-xs font-bold">{item.communicationRating || 0}</span>
                            </div>
                          </div>
                          <div className="text-center">
                            <p className="text-sm text-gray-500">Language</p>
                            <div className={`h-8 w-8 rounded-full flex items-center justify-center ${parseInt(item.languageRating || 0) === 6 ? 'bg-blue-500' : getRatingColor(parseInt(item.languageRating || 0))} text-white mx-auto`}>
                              <span className="text-xs font-bold">{item.languageRating || 0}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                ))}
              </div>
            )}
          </div>

          {/* Tips Section */}
          {hasFeedback && (
            <div className="bg-white shadow-lg rounded-lg p-6 mb-12">
              <h2 className="text-2xl font-bold mb-4">Improvement Tips</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border-l-4 border-blue-500 pl-4">
                  <h3 className="font-semibold text-lg mb-2">Technical Skills</h3>
                  <p className="text-gray-700">
                    {skillRating >= 8 ? 'Your technical knowledge is excellent! Keep up with the latest trends to stay ahead.' : 
                     skillRating >= 6 ? 'You have good technical skills. Focus on deepening your knowledge in specific areas.' : 
                     'Consider strengthening your technical foundation through more practice and structured learning.'}
                  </p>
                </div>
                <div className="border-l-4 border-green-500 pl-4">
                  <h3 className="font-semibold text-lg mb-2">Communication</h3>
                  <p className="text-gray-700">
                    {communicationRating >= 8 ? 'Your communication skills are excellent! You articulate ideas clearly and concisely.' : 
                     communicationRating >= 6 ? 'You communicate well. Try using more technical terms precisely to improve further.' : 
                     'Work on structuring your answers more clearly and using technical terminology appropriately.'}
                  </p>
                </div>
                <div className="border-l-4 border-yellow-500 pl-4">
                  <h3 className="font-semibold text-lg mb-2">Confidence</h3>
                  <p className="text-gray-700">
                    {confidenceRating >= 8 ? 'Your confidence level is excellent! You project assurance without being overconfident.' : 
                     confidenceRating >= 6 ? 'You show good confidence. Try to maintain this even with challenging questions.' : 
                     'Work on building your confidence by practicing your responses and preparing thoroughly.'}
                  </p>
                </div>
                <div className="border-l-4 border-purple-500 pl-4">
                  <h3 className="font-semibold text-lg mb-2">Language</h3>
                  <p className="text-gray-700">
                    {languageRating >= 8 ? 'Your language use is excellent! You express complex ideas with clarity and precision.' : 
                     languageRating >= 6 ? 'Your language skills are good. Focus on expanding your technical vocabulary.' : 
                     'Work on improving your technical vocabulary and sentence structure for clearer communication.'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-center gap-4">
            <Button 
              onClick={() => router.replace('/dashboard')} 
              className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-full"
            >
              Return to Dashboard
            </Button>
            
            {hasFeedback && (
              <Button 
                onClick={() => router.push('/practice')} 
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full"
              >
                Try Another Interview
              </Button>
            )}
          </div>
        </>
      )}
    </div>
  )
}

export default Feedback