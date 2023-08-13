import Navbar from '@/components/Navbar'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Braintrivi',
  description: 'Challenge yourself with AI-generated trivia questions on any topic you can think of.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <div className="absolute top-0 left-0 -z-10 w-screen h-screen bg-pattern pointer-events-none" />
        <div className="">{children}</div>
      </body>
    </html>
  )
}
