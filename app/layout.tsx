import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Dental Clinic AI Receptionist',
  description: 'AI-powered receptionist interface for dental clinics',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-br from-pastel-blue-50 via-white to-pastel-green-50">
        {children}
      </body>
    </html>
  )
}
