'use client'

import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'

export default function Footer() {
    const { language } = useLanguage()
    const ja = language === 'ja'

    return (
        <footer style={{ background: 'var(--ink)', position: 'relative' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(to right, transparent, rgba(201,146,42,0.3), transparent)' }} />
            <div style={{ maxWidth: 1200, margin: '0 auto', padding: '3rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Link href="/" style={{ fontFamily: "'Cinzel', serif", fontSize: '0.9rem', letterSpacing: '0.28em', color: 'rgba(244,240,230,0.5)', textTransform: 'uppercase' }}>
                    Hidden Maps
                </Link>
                <span style={{ fontFamily: ja ? "'Noto Serif JP', serif" : "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: '0.95rem', color: 'rgba(244,240,230,0.2)' }}>
                    {ja ? '隠れた地図を読む' : 'Charting what lies beneath'}
                </span>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.55rem', letterSpacing: '0.12em', color: 'rgba(201,146,42,0.35)', textAlign: 'right', lineHeight: 2 }}>
                    35.6762° N, 139.6503° E<br />
                    hiddenmaps.app<br />
                    <a
                        href="https://instagram.com/hiddenmaps.app"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: 'rgba(201,146,42,0.35)', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', transition: 'color 0.2s' }}
                    >
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                            <circle cx="12" cy="12" r="4" />
                            <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
                        </svg>
                        @hiddenmaps.app
                    </a>
                </div>
            </div>
        </footer>
    )
}