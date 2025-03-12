"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import {
  ChevronRight,
  Star,
  Calendar,
  Users,
  BookOpen,
  Award,
  ArrowRight,
} from "lucide-react";
import { toast } from "sonner";

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const { isSignedIn, user } = useUser();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const myPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ name: "" });
    }, 2000);
  });
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Navbar */}
      <nav
        className={`fixed w-full z-10 transition-all duration-300 ${
          scrolled
            ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-md py-2"
            : "bg-transparent py-4"
        }`}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <span className="text-white font-bold">R</span>
            </div>
            <span className="font-bold text-xl text-gray-900 dark:text-white">
              Reharse
            </span>
          </div>

          

          <div className="flex items-center gap-4">
            {isSignedIn ? (
              <div className="flex items-center gap-4">
                <Link href="/dashboard">
                  <Button className="rounded-full px-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    My Dashboard
                  </Button>
                </Link>
                <UserButton />
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link href="/sign-in">
                  <Button variant="outline" className="rounded-full px-6">
                    Login
                  </Button>
                </Link>
                <Link href="/sign-up">
                  <Button className="rounded-full px-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    Sign Up Free
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>

      <section className="pt-32 pb-20 lg:pt-40 lg:pb-32 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-20 right-20 w-64 h-64 rounded-full bg-blue-400/10 blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-80 h-80 rounded-full bg-purple-400/10 blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-1">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 leading-tight mb-6">
              Ace Your Interviews with AI-Powered Practice
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Prepare for your dream job with realistic mock interviews powered
              by advanced AI. Get personalized feedback and improve your skills
              completely free.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/dashboard">
                <Button
                  size="lg"
                  className="rounded-full px-8 py-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg"
                >
                  Get Started Free
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full px-8 py-6 text-lg"
                onClick={()=>{
                  toast.warning("Demo Is Not Available")
                }}
              >
                Watch Demo
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mt-20">
            <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 transform transition-all hover:scale-105">
              <div className="text-blue-600 dark:text-blue-400 mb-2">
                <Users className="h-10 w-10" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                500+
              </h3>
              <p className="text-gray-600 dark:text-gray-300">Active Users</p>
            </div>
            <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 transform transition-all hover:scale-105">
              <div className="text-purple-600 dark:text-purple-400 mb-2">
                <Calendar className="h-10 w-10" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                1,000+
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Interviews Conducted
              </p>
            </div>
            <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 transform transition-all hover:scale-105">
              <div className="text-green-600 dark:text-green-400 mb-2">
                <Award className="h-10 w-10" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                85%
              </h3>
              <p className="text-gray-600 dark:text-gray-300">Success Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Elevate Your Interview Skills
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Our platform offers everything you need to prepare for your next
              interview
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <BookOpen className="h-8 w-8" />,
                title: "Practice Interviews",
                description:
                  "Choose from hundreds of role-specific interview simulations with AI interviewers that adapt to your responses.",
                color: "from-blue-500 to-cyan-500",
              },
              {
                icon: <Star className="h-8 w-8" />,
                title: "Instant Feedback",
                description:
                  "Receive detailed feedback on your answers, communication style, and areas for improvement after each session.",
                color: "from-purple-500 to-pink-500",
              },
              {
                icon: <Award className="h-8 w-8" />,
                title: "Progress Tracking",
                description:
                  "Monitor your improvement over time with detailed analytics and performance metrics.",
                color: "from-green-500 to-emerald-500",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-gray-50 dark:bg-gray-900 rounded-xl p-8 shadow-lg border border-gray-100 dark:border-gray-700 transform transition-all hover:-translate-y-2"
              >
                <div
                  className={`w-16 h-16 rounded-full mb-6 flex items-center justify-center bg-gradient-to-br ${feature.color}`}
                >
                  <div className="text-white">{feature.icon}</div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {feature.description}
                </p>
                <Link
                  href="/dashboard"
                >
                  <Button variant="ghost" className="group">
                    Learn more
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Preview Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Interview Resources
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Tips, strategies, and success stories
              </p>
            </div>
            <Link href="/blog">
              <Button variant="outline" className="mt-4 md:mt-0">
                View all articles
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "10 Common Interview Questions You Need to Master",
                category: "Interview Tips",
                image: "/api/placeholder/800/600",
                date: "Feb 20, 2025",
              },
              {
                title: "How AI is Revolutionizing the Hiring Process",
                category: "Industry Insights",
                image: "/api/placeholder/800/600",
                date: "Feb 15, 2025",
              },
              {
                title: "From Rejection to Offer: A Success Story",
                category: "Success Stories",
                image: "/api/placeholder/800/600",
                date: "Feb 10, 2025",
              },
            ].map((post, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-700 transform transition-all hover:-translate-y-1"
              >                  
                  <div className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    {post.category}
                  </div>
                <div className="p-6">
                  <p className="text-gray-500 dark:text-gray-400 text-sm mb-2">
                    {post.date}
                  </p>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 line-clamp-2">
                    {post.title}
                  </h3>
                  <Link
                    href="dashboard/Blog"
                  >
                    <Button
                   
                      variant="ghost"
                      className="group text-blue-600 dark:text-blue-400 p-0 hover:bg-transparent"
                    >
                      Read more
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to ace your next interview?
            </h2>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Join hundreds of students who have transformed their interview
              skills with our AI-powered platform.
            </p>
            <Link href="/dashboard">
              <Button
                size="lg"
                className="rounded-full px-8 py-6 bg-white text-blue-600 hover:bg-gray-100 text-lg"
              >
                Start Practicing Now
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <p className="mt-4 text-white/70">
              100% free - no credit card needed
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white pt-16 pb-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <span className="text-white font-bold">R</span>
                </div>
                <span className="font-bold text-xl">Reharse</span>
              </div>
              <p className="text-gray-400 mb-4">
                A final year college project making AI-powered interview
                preparation accessible to all students.
              </p>
              <div className="flex gap-4">
              </div>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-4">Platform</h4>
              <ul className="space-y-2">
                <li
                  onClick={() => {
                        toast.warning("Not Available")
                  }}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Features
                </li>
                <li onClick={() => {
                        toast.warning("Not Available")
                  }}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                    Testimonials
                  
                </li>
                <li 
                onClick={() => {
                        toast.warning("Not Available")
                  }}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  FAQ
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-4">Resources</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/dashboard/Blog"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Blog
                  </Link>
                </li>
                <li
                  onClick={() => {
                    toast.warning("Not Available");
                  }}
                  className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                >
                  Interview Guides
                </li>
                <li
                  onClick={() => {
                    toast.warning("Not Available");
                  }}
                  className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                >
                  Career Tips
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-4">About</h4>
              <ul className="space-y-2">
                <li
                  onClick={() => {
                    toast.warning("Not Available");
                  }}
                  className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                >
                  About Project
                </li>
                <li
                  onClick={() => {
                    toast.warning("Not Available");
                  }}
                  className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                >
                  Contact
                </li>
                <li
                  onClick={() => {
                    toast.warning("Not Available");
                  }}
                  className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                >
                  Privacy Policy
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8">
            <p className="text-gray-500 text-center">
              © 2025 Reharse. This is a Semester project created for educational
              purposes.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
