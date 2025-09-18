import type React from "react"
import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import { Montserrat_Alternates, Lora, Fira_Code, Noto_Sans_Tamil } from "next/font/google"
import "./globals.css"
import { Suspense } from "react"
import { SiteHeader } from "@/components/site-header"
import { CartProvider } from "@/context/cart-context"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster";
import { ConditionalFloatingCartButton } from "@/components/conditional-floating-cart-button";
import { LanguageProvider } from "@/context/language-context"

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

// Tamil font used only when language is Tamil
const notoSansTamil = Noto_Sans_Tamil({
  weight: ["400", "700"],
  subsets: ["tamil"],
  variable: "--font-tamil",
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${montserratAlternates.variable} ${lora.variable} ${firaCode.variable} ${notoSansTamil.variable}`}>
      <body className="bg-background text-foreground font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
          <LanguageProvider>
            <CartProvider>
              <SiteHeader />
              <div className="pt-16"> {/* Added padding-top to display content after the fixed header */}
                <Suspense fallback={null}>{children}</Suspense>
              </div>
              <ConditionalFloatingCartButton />
              <Analytics />
            </CartProvider>
            <Toaster />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
