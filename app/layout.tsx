import './globals.css'
import type { Metadata } from 'next'
import { ReactNode } from 'react'
import { AppShell } from '@/components/AppShell'
import { Outfit } from 'next/font/google'
import { AuthProvider } from '@/components/AuthProvider'
import ThemeProvider from '@/components/ThemeProvider'
import ToastProvider from '@/components/ToastProvider'

const outfit = Outfit({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Transparent Cents',
  description: 'Premium Platform for Social Good',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${outfit.className} min-h-screen antialiased bg-slate-50 dark:bg-[#050810] text-slate-900 dark:text-slate-50 selection:bg-emerald-500/30`}> 
        <ThemeProvider>
          <ToastProvider>
            <AuthProvider>
              <AppShell>
                {children}
              </AppShell>
            </AuthProvider>
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
