"use client";
import { SignIn } from '@clerk/nextjs';
import { useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Page() {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <section className="bg-gray-50 dark:bg-gray-900 h-screen overflow-hidden">
      <div className="grid h-screen lg:grid-cols-12">
        <section className="relative lg:col-span-5 xl:col-span-6 h-full hidden lg:block">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/95 to-blue-900/90 z-10"></div>

          <motion.img
            initial={{ scale: 1.02 }}
            animate={{ scale: 1 }}
            transition={{ duration: 3 }}
            alt="Interview preparation"
            src="https://images.unsplash.com/photo-1573497620053-ea5300f94f21?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
            className="absolute inset-0 h-full w-full object-cover"
          />

          <div className="relative z-20 flex flex-col justify-center h-full p-12">
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7 }}
            >
              <div className="flex items-center gap-3 mb-12">
                <div className="h-14 w-14 rounded-lg bg-white flex items-center justify-center shadow-lg">
                  <span className="text-indigo-700 font-bold text-2xl">R</span>
                </div>
                <span className="text-white font-bold text-3xl">Reharse</span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight leading-tight drop-shadow-sm">
                Ace your next interview with AI-powered practice
              </h1>

              <p className="text-xl text-white leading-relaxed max-w-lg drop-shadow-sm font-medium">
                Practice with realistic mock interviews tailored to your industry, experience level, and desired role.
              </p>

              <div className="mt-12 space-y-6">
                <div className="flex items-center text-white">
                  <div className="mr-4 h-10 w-10 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center shadow-md">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-lg font-medium">AI-powered interview questions specific to your role</p>
                </div>

                <div className="flex items-center text-white">
                  <div className="mr-4 h-10 w-10 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center shadow-md">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-lg font-medium">Detailed feedback to improve your responses</p>
                </div>

                <div className="flex items-center text-white">
                  <div className="mr-4 h-10 w-10 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center shadow-md">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-lg font-medium">Practice anytime, anywhere at your convenience</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 xl:col-span-6 h-full bg-gray-300 dark:bg-gray-900">
          <div className="w-full max-w-md">
            <motion.div
              className="block lg:hidden mb-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="h-14 w-14 rounded-lg bg-gradient-to-r from-indigo-600 to-blue-500 flex items-center justify-center shadow-md">
                  <span className="text-white font-bold text-2xl">R</span>
                </div>
                <span className="text-gray-900 dark:text-white font-bold text-3xl">Reharse</span>
              </div>

              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Ace your next interview
              </h1>

              <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
                Practice with AI-powered mock interviews tailored to your needs.
              </p>
            </motion.div>
            <div className="justify-center items-center">
              <div className="bg-gray-200 p-6 rounded-2xl shadow-lg">
                <SignIn />
              </div>
            </div>


          </div>
        </main>
      </div>
    </section>
  );
}