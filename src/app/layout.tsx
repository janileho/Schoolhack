import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Start Homework - Retro Edition',
  description: 'A gamified homework experience with a retro twist',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black text-green-500 min-h-screen`}>
        <div className="crt">
          {children}
        </div>
      </body>
    </html>
  )
} 