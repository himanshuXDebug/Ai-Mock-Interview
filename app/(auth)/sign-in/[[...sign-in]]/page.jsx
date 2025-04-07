"use client";
import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="hidden lg:grid grid-cols-12 h-screen max-w-screen-4xl mx-auto">
        <section className="relative lg:col-span-5 xl:col-span-6 flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/95 to-blue-900/90 z-10"></div>
          <img
            src="https://images.unsplash.com/photo-1573497620053-ea5300f94f21?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
            alt="Interview preparation"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="relative z-20 flex flex-col justify-center items-center p-12 text-center">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-14 w-14 rounded-lg bg-white flex items-center justify-center shadow-lg">
                <span className="text-indigo-700 font-bold text-2xl">R</span>
              </div>
              <span className="text-white font-bold text-3xl">Reharse</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Ace your next interview with AI-powered practice
            </h1>
            <p className="text-xl text-white max-w-lg font-medium">
              Practice with realistic mock interviews tailored to your industry,
              experience level, and desired role.
            </p>
          </div>
        </section>

        <main className="flex items-center justify-center p-6 lg:col-span-7 xl:col-span-6">
          <div className="w-full max-w-md">
            <div className="bg-gray-200 p-6 rounded-2xl shadow-lg w-full">
              <SignIn />
            </div>
          </div>
        </main>
      </div>

      <div className="lg:hidden flex flex-col min-h-screen">
        <header className="p-4 flex flex-col items-center">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-14 w-14 rounded-lg bg-indigo-600 flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-2xl">R</span>
            </div>
            <span className="text-gray-900 dark:text-white font-bold text-3xl">
              Reharse
            </span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 text-center">
            Ace your next interview
          </h1>
          <p className="text-base text-gray-700 dark:text-gray-300 mb-6 text-center max-w-xs">
            Practice with AI-powered mock interviews tailored to your needs.
          </p>
        </header>

        <main className="flex-grow flex items-center justify-center p-6">
          <div className="max-w-md">
            <div className="bg-gray-200 p-6 rounded-2xl shadow-lg w-full">
              <SignIn />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
