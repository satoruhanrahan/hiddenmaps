'use client'

import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'

export default function Footer() {
  const { language } = useLanguage()
  const ja = language === 'ja'

  return (
    <footer style={{ background: 'var(--ink)', position: 'relative' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(to right, transparent, rgba(201,146,42,0.3), transparent)' }} />
      <div style={{
        maxWidth: 1200, margin: '0 auto',
        padding: 'clamp(2rem, 4vw, 3rem) clamp(1.25rem, 5vw, 3rem)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        flexWrap: 'wrap', gap: '1.5rem',
      }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', textDecoration: 'none' }}>
          <img
            src="/images/owl-logo-dark.png"
            alt="The Hidden Owl"
            style={{ width: 20, height: 26, objectFit: 'contain', opacity: 0.5 }}
          />
          <span style={{ fontFamily: "'Cinzel', serif", fontSize: '0.8rem', letterSpacing: '0.22em', color: 'rgba(244,240,230,0.4)', textTransform: 'uppercase' }}>
            The Hidden Owl
          </span>
        </Link>

        <span style={{ fontFamily: ja ? "'Noto Serif JP', serif" : "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: '0.95rem', color: 'rgba(244,240,230,0.18)' }}>
          {ja ? '隠れたものを観る' : 'Observing the hidden'}
        </span>

        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.55rem', letterSpacing: '0.12em', color: 'rgba(201,146,42,0.35)', textAlign: 'right', lineHeight: 2 }}>
          35.6762° N, 139.6503° E<br />
          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
            <a
              href="https://instagram.com/thehiddenowl_fukurou"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: 'rgba(244,240,230,0.6)',
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                padding: '0.45rem 0.9rem',
                border: '1px solid rgba(244,240,230,0.15)',
                letterSpacing: '0.15em',
                transition: 'color 0.2s, border-color 0.2s',
              }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
              </svg>
              @hiddenmaps.app
            </a>
            <a
              href="https://thehiddenowl.substack.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: 'rgba(244,240,230,0.6)',
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                padding: '0.45rem 0.9rem',
                border: '1px solid rgba(244,240,230,0.15)',
                letterSpacing: '0.15em',
                transition: 'color 0.2s, border-color 0.2s',
              }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z" />
              </svg>
              Substack
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}