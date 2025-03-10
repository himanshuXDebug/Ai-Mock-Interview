"use client"
import React from 'react'
import Link from 'next/link'
import { Check } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'

function Pricing() {
  return (

    <div className=" py-12 px-4 sm:px-6 lg:px-8">
      

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Choose the Right Plan for Your Career Growth
          </h2>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
            Select a plan that fits your interview preparation needs, from basic practice to comprehensive coaching.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Free Plan */}
          <div className="bg-white rounded-lg shadow-gray-600 overflow-hidden border border-gray-200 flex flex-col">
            <div className="px-6 py-8 bg-gray-50 border-b border-gray-200">
              <h3 className="text-2xl font-semibold text-gray-900">Free</h3>
              <div className="mt-4 flex items-baseline">
                <span className="text-5xl font-extrabold text-gray-900">₹0</span>
                <span className="ml-1 text-xl text-gray-500">/month</span>
              </div>
              <p className="mt-5 text-gray-500">Perfect for beginners looking to practice basic interview skills</p>
            </div>
            <div className="flex-1 px-6 pt-6 pb-8 bg-white">
              <ul className="space-y-4">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                  <span className="ml-3 text-gray-700">30 Mock Interviews per month</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                  <span className="ml-3 text-gray-700">Basic question bank access</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                  <span className="ml-3 text-gray-700">Text feedback</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                  <span className="ml-3 text-gray-700">Community support</span>
                </li>
              </ul>
              <div className="mt-8">
                <Link href="/sign-up" className="block w-full bg-blue-600 text-white text-center px-4 py-2 rounded-md font-medium hover:bg-blue-700 transition-colors">
                  Get Started
                </Link>
              </div>
            </div>
          </div>

          {/* Standard Plan */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 flex flex-col">
            <div className="px-6 py-8 bg-indigo-50 border-b border-gray-200">
              <h3 className="text-2xl font-semibold text-gray-900">Standard</h3>
              <div className="mt-4 flex items-baseline">
                <span className="text-5xl font-extrabold text-gray-900">₹499</span>
                <span className="ml-1 text-xl text-gray-500">/month</span>
              </div>
              <p className="mt-5 text-gray-500">For job seekers preparing for upcoming interviews</p>
            </div>
            <div className="flex-1 px-6 pt-6 pb-8 bg-white">
              <ul className="space-y-4">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                  <span className="ml-3 text-gray-700">100 Mock Interviews per month</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                  <span className="ml-3 text-gray-700">Full question bank access</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                  <span className="ml-3 text-gray-700">Detailed performance analytics</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                  <span className="ml-3 text-gray-700">Email support</span>
                </li>
              </ul>
              <div className="mt-8">
                <button href="/" className="block w-full bg-gray-600 text-white text-center px-4 py-2 rounded-md font-medium hover:bg-gray-600 transition-colors cursor-not-allowed">
                  Not Available
                </button>
              </div>
            </div>
          </div>

          {/* Premium Plan */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-indigo-200 flex flex-col transform scale-105 z-10">
            <div className="absolute top-0 right-0 h-8 w-28 bg-gradient-to-r from-orange-400 to-orange-500 text-white text-xs font-semibold flex items-center justify-center transform rotate-45 translate-x-8 translate-y-2">
              Popular
            </div>
            <div className="px-6 py-8 bg-indigo-100 border-b border-gray-200">
              <h3 className="text-2xl font-semibold text-gray-900">Premium</h3>
              <div className="mt-4 flex items-baseline">
                <span className="text-5xl font-extrabold text-gray-900">₹999</span>
                <span className="ml-1 text-xl text-gray-500">/month</span>
              </div>
              <p className="mt-5 text-gray-500">For professionals seeking personalized interview coaching</p>
            </div>
            <div className="flex-1 px-6 pt-6 pb-8 bg-white">
              <ul className="space-y-4">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                  <span className="ml-3 text-gray-700">Unlimited Mock Interviews</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                  <span className="ml-3 text-gray-700">Company-specific question sets</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                  <span className="ml-3 text-gray-700">Video feedback & analysis</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                  <span className="ml-3 text-gray-700">2 live coaching sessions/month</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                  <span className="ml-3 text-gray-700">Priority support</span>
                </li>
              </ul>
              <div className="mt-8">
                <button href="/" className="block w-full bg-gray-600 text-white text-center px-4 py-2 rounded-md font-medium hover:bg-gray-600 transition-colors cursor-not-allowed">
                  Not Available
                </button>
              </div>
            </div>
          </div>

          {/* Enterprise Plan */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 flex flex-col">
            <div className="px-6 py-8 bg-gray-50 border-b border-gray-200">
              <h3 className="text-2xl font-semibold text-gray-900">Enterprise</h3>
              <div className="mt-4 flex items-baseline">
                <span className="text-5xl font-extrabold text-gray-900">₹3,999</span>
                <span className="ml-1 text-xl text-gray-500">/month</span>
              </div>
              <p className="mt-5 text-gray-500">For companies preparing multiple candidates</p>
            </div>
            <div className="flex-1 px-6 pt-6 pb-8 bg-white">
              <ul className="space-y-4">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                  <span className="ml-3 text-gray-700">Team access (up to 10 users)</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                  <span className="ml-3 text-gray-700">Custom interview templates</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                  <span className="ml-3 text-gray-700">Advanced analytics dashboard</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                  <span className="ml-3 text-gray-700">5 dedicated coaching sessions</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                  <span className="ml-3 text-gray-700">Dedicated account manager</span>
                </li>
              </ul>
              <div className="mt-8">
                <Button href="#" className="block w-full bg-gray-800 text-white text-center px-4 py-2 rounded-md font-medium hover:bg-red-600 transition-color cursor-not-allowed"
                  onClick={() => {
                    toast.warning("Not Available")
                  }}>
                  Not Available
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ or Additional Info */}
        <div className="mt-16 text-center">
          <h3 className="text-xl font-semibold text-gray-900">Not sure which plan is right for you?</h3>
          <p className="mt-2 text-gray-600">Try our free plan first or contact our support team for personalized recommendations.</p>
          <div className="mt-4">
            <Link href="/contact" className="text-indigo-600 font-medium hover:text-indigo-700">
              Contact Support →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Pricing