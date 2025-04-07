"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from "next/navigation";
import { UserButton } from '@clerk/nextjs'
import { usePathname } from 'next/navigation'
import { X } from 'lucide-react'

function Header() {
  const path = usePathname();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const onStart = () => {
    router.push('/dashboard/Pricing')
  }
  
  // Close the mobile menu when path changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [path]);

  // Close the mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isMenuOpen && !e.target.closest('.mobile-menu') && !e.target.closest('.menu-button')) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200 shadow-sm fixed top-0 left-0 right-0 z-10">
        {/* Logo with improved size */}
        <div className="relative h-14 w-64">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <span className="text-white font-bold">R</span>
            </div>
            <span className="font-bold text-xl text-gray-900 dark:text-white">Reharse</span>
          </div>
        </div>
        
        <nav className="hidden md:flex items-center">
          <Link href="/">
            <span className={`px-5 py-2 text-base font-medium rounded-md transition-all ${
              path === '/app' ? 'text-indigo-600 bg-indigo-50' : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50'
            }`}>
              Home
            </span>
          </Link>

          <Link href="/dashboard">
            <span className={`px-5 py-2 text-base font-medium rounded-md transition-all ${
              path === '/dashboard' ? 'text-indigo-600 bg-indigo-50' : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50'
            }`}>
              Dashboard
            </span>
          </Link>
          
          <Link href={"/dashboard/Pricing"}>
            <span className={`px-5 py-2 text-base font-medium rounded-md transition-all ${
              path === '/dashboard/Pricing' ? 'text-indigo-600 bg-indigo-50' : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50'
            }`}>
              Upgrade
            </span>
          </Link>
          
          <Link href="/dashboard/Question">
            <span className={`px-5 py-2 text-base font-medium rounded-md transition-all ${
              path === '/dashboard/Questions' ? 'text-indigo-600 bg-indigo-50' : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50'
            }`}>
              Questions
            </span>
          </Link>
          
          <Link href="/dashboard/Blog">
            <span className={`px-5 py-2 text-base font-medium rounded-md transition-all ${
              path === '/dashboard/Blog' ? 'text-indigo-600 bg-indigo-50' : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50'
            }`}>
             Blogs
            </span>
          </Link>
        </nav>
        
        {/* Mobile menu button */}
        <div className="md:hidden menu-button">
          <button 
            className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            onClick={toggleMenu}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
        
        {/* User profile button with improved styling */}
        <div className="hidden md:block">
          <div className="ml-4 flex items-center">
            <div className="p-1 rounded-full bg-gray-50 hover:bg-gray-100 transition-all">
              <UserButton afterSignOutUrl="/sign-in" />
            </div>
          </div>
        </div>
      </header>

      <div className={`fixed inset-0 bg-black bg-opacity-50 z-20 transition-opacity duration-300 ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div 
          className={`mobile-menu fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          } overflow-y-auto z-30`}
        >
          <div className="p-5">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">R</span>
                </div>
                <span className="font-bold text-lg text-gray-900">Reharse</span>
              </div>
              <button 
                onClick={toggleMenu}
                className="p-2 rounded-full text-gray-500 hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex flex-col space-y-2">
              <Link href="http://localhost:3000">
                <span className={`block px-4 py-2 text-base font-medium rounded-md transition-all ${
                  path === '/app' ? 'text-indigo-600 bg-indigo-50' : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50'
                }`}>
                  Home
                </span>
              </Link>

              <Link href="/dashboard">
                <span className={`block px-4 py-2 text-base font-medium rounded-md transition-all ${
                  path === '/dashboard' ? 'text-indigo-600 bg-indigo-50' : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50'
                }`}>
                  Dashboard
                </span>
              </Link>
              
              <Link href="/dashboard/Pricing">
                <span className={`block px-4 py-2 text-base font-medium rounded-md transition-all ${
                  path === '/dashboard/Pricing' ? 'text-indigo-600 bg-indigo-50' : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50'
                }`}>
                  Upgrade
                </span>
              </Link>
              
              <Link href="/dashboard/Question">
                <span className={`block px-4 py-2 text-base font-medium rounded-md transition-all ${
                  path === '/dashboard/Questions' ? 'text-indigo-600 bg-indigo-50' : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50'
                }`}>
                  Questions
                </span>
              </Link>
              
              <Link href="/dashboard/Blog">
                <span className={`block px-4 py-2 text-base font-medium rounded-md transition-all ${
                  path === '/dashboard/Blog' ? 'text-indigo-600 bg-indigo-50' : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50'
                }`}>
                 Blogs
                </span>
              </Link>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex items-center px-4">
                <div className="mr-3">
                  <UserButton afterSignOutUrl="/sign-in" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Account</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-20"></div>
    </>
  )
}

export default Header