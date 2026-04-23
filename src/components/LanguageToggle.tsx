'use client'

import { useLanguage } from '@/contexts/LanguageContext'

export default function LanguageToggle({ dark = false }: { dark?: boolean }) {
  const { language, setLanguage } = useLanguage()

  const base: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '2px',
    fontFamily: "'DM Mono', monospace",
    fontSize: '0.6rem',
    letterSpacing: '0.1em',
  }

  const btn = (lang: 'en' | 'ja'): React.CSSProperties => ({
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '3px 6px',
    borderRadius: '3px',
    fontFamily: "'DM Mono', monospace",
    fontSize: lang === 'ja' ? '0.75rem' : '0.6rem',
    letterSpacing: lang === 'ja' ? '0.05em' : '0.1em',
    fontWeight: language === lang ? 600 : 400,
    color: language === lang
      ? (dark ? '#e8c36a' : 'var(--rust)')
      : (dark ? 'rgba(232,195,106,0.4)' : 'var(--faint)'),
    borderBottom: language === lang
      ? `1px solid ${dark ? '#e8c36a' : 'var(--rust)'}` 
      : '1px solid transparent',
    transition: 'color 0.2s, border-color 0.2s',
  })

  return (
    <div style={base}>
      <button style={btn('en')} onClick={() => setLanguage('en')}>EN</button>
      <span style={{ color: dark ? 'rgba(232,195,106,0.25)' : 'var(--faint)', fontSize: '0.5rem' }}>|</span>
      <button style={btn('ja')} onClick={() => setLanguage('ja')}>日本語</button>
    </div>
  )
}
