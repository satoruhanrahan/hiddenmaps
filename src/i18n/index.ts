import en from './en'
import ja from './ja'

export const languages = {
  en,
  ja,
}

export type Language = keyof typeof languages
export type { Translations } from './en'
