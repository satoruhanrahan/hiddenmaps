'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { languages, Language, Translations } from '@/i18n'

type LanguageContextType = {
  language: Language
  setLanguage: (lang: Language) => void
  t: Translations
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: languages.en,
})

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en')

  // Persist language preference
  useEffect(() => {
    const saved = localStorage.getItem('hm-lang') as Language | null
    if (saved && languages[saved]) setLanguageState(saved)
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem('hm-lang', lang)
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: languages[language] }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}
