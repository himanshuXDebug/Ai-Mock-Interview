import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider  } from "@clerk/nextjs";
import {Toaster} from "@/components/ui/sonner"
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Ai Mock Interview",
  description: "Created For Ai Mock Interview",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Toaster position="top-center" richColors/>
        {children}
      </body>
    </html>
    </ClerkProvider>
  );
}
