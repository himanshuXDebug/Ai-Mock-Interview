// ComingSoon.jsx
import React from 'react';
import { Clock, CalendarClock, Bot, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function ComingSoon() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white">
      <div className="text-center max-w-xl px-4">
        {/* Icon animation container */}
        <div className="relative mb-6 flex justify-center">
          <div className="absolute animate-ping opacity-75">
            <Clock className="text-blue-500" size={36} />
          </div>
          <Clock className="relative text-blue-600" size={36} />
        </div>
        
        {/* Main title */}
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Coming Soon</h1>
        
        {/* Subtitle */}
        <p className="text-xl text-gray-600 mb-8">
          Our AI Interview Questions feature is currently under development
        </p>
        
        {/* Feature box */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl shadow-md mb-8">
          <div className="flex justify-center gap-6 mb-4">
            <Bot className="text-indigo-600" size={28} />
            <CalendarClock className="text-blue-600" size={28} />
            <AlertCircle className="text-violet-600" size={28} />
          </div>
          <p className="text-gray-700">
            We're crafting intelligent questions and fine-tuning our AI to provide you with the most realistic interview experience possible.
          </p>
        </div>
        
        {/* Call to action */}
        <Link href="/" className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1" >
        <button  >
          Go Home
        </button>
        </Link>
        
      </div>
    </div>
  );
}