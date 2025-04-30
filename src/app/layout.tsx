import type { Metadata } from "next";
import { Inter } from "next/font/google"
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/sonner"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Hablemos de cancer",
  description: "Plataforma de formaciones",
  manifest: "/site.webmanifest",
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <Toaster
            position="top-center" 
            closeButton
            richColors
          />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
