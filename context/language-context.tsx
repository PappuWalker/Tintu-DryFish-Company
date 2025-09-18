"use client"

import React, { createContext, useContext, useEffect, useMemo, useState } from "react"
import { translations } from "@/lib/translations"

export type Language = "en" | "ta"

type LanguageContextType = {
  lang: Language
  setLang: (lang: Language) => void
  t: (key: string, fallback?: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const STORAGE_KEY = "tintu_language"

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>("en")

  // Initialize from localStorage
  useEffect(() => {
    try {
      const saved = (typeof window !== "undefined" && localStorage.getItem(STORAGE_KEY)) as Language | null
      if (saved === "ta" || saved === "en") {
        setLangState(saved)
      }
    } catch {}
  }, [])

  // Persist and update <html lang> and a CSS class for tamil font only
  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        localStorage.setItem(STORAGE_KEY, lang)
      }
    } catch {}

    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("lang", lang === "ta" ? "ta" : "en")
      document.documentElement.classList.toggle("lang-ta", lang === "ta")
    }
  }, [lang])

  const setLang = (l: Language) => setLangState(l)

  const t = useMemo(() => {
    const dict = (translations as Record<string, Record<string, string>>)[lang] || {}
    return (key: string, fallback?: string) => {
      if (key in dict) return dict[key]
      return fallback ?? key
    }
  }, [lang])

  const value = useMemo(() => ({ lang, setLang, t }), [lang])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export const useLanguage = () => {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error("useLanguage must be used within a LanguageProvider")
  return ctx
}
