import type React from "react"
import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import { Montserrat_Alternates, Lora, Fira_Code } from "next/font/google"
import "./globals.css"
import { Suspense } from "react"
import { SiteHeader } from "@/components/site-header"
import { CartProvider } from "@/context/cart-context"

export const metadata: Metadata = {
  title: "Tintu Cuts",
  description: "Tintu Cuts - Fresh and Dry Fish Company",
}

const montserratAlternates = Montserrat_Alternates({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-sans",
})

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-serif",
})

const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-mono",
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${montserratAlternates.variable} ${lora.variable} ${firaCode.variable}`}>
      <body className="bg-background text-foreground font-sans antialiased">
        <CartProvider>
          <SiteHeader />
          <div className="pt-16"> {/* Add padding to account for fixed header */}
            <Suspense fallback={null}>{children}</Suspense>
          </div>
          <Analytics />
        </CartProvider>
      </body>
    </html>
  )
}
