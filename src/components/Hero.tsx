'use client'

import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'

export default function Hero() {
    const { language } = useLanguage()
    const ja = language === 'ja'

    return (
        <section style={{
            position: 'relative', minHeight: '100vh', background: 'var(--ink)',
            display: 'flex', flexDirection: 'column', justifyContent: 'center',
            padding: 'clamp(5rem, 12vw, 8rem) clamp(1.25rem, 5vw, 3rem) 4rem',
            overflow: 'hidden',
        }}>
            {/* Grid */}
            <div style={{
                position: 'absolute', inset: 0,
                backgroundImage: `linear-gradient(rgba(201,146,42,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(201,146,42,0.06) 1px, transparent 1px)`,
                backgroundSize: '60px 60px',
            }} />
            {/* Glow */}
            <div style={{
                position: 'absolute', top: '40%', left: '35%', width: 600, height: 600,
                background: 'radial-gradient(ellipse, rgba(201,146,42,0.07) 0%, transparent 70%)',
                transform: 'translate(-50%, -50%)', pointerEvents: 'none',
            }} />
            {/* Topographic SVG — hidden on small mobile */}
            <svg style={{ position: 'absolute', right: -80, top: '50%', transform: 'translateY(-50%)', width: 'min(500px, 60vw)', height: 'min(500px, 60vw)', opacity: 0.07 }}
                viewBox="0 0 400 400" fill="none">
                {[280, 240, 200, 160, 120, 82, 46].map((rx, i) => (
                    <ellipse key={i} cx="300" cy="200" rx={rx} ry={rx * 0.62} stroke="#c9922a" strokeWidth={i >= 5 ? 1 : 0.8} />
                ))}
                <circle cx="300" cy="200" r="6" fill="#c9922a" opacity="0.5" />
            </svg>

            <div style={{ position: 'relative', zIndex: 2, maxWidth: 1200, margin: '0 auto', width: '100%' }}>
                <div style={{
                    fontFamily: "'DM Mono', monospace", fontSize: 'clamp(0.52rem, 1.5vw, 0.62rem)',
                    letterSpacing: '0.35em', textTransform: 'uppercase', color: 'var(--gold)',
                    marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem',
                }}>
                    <span style={{ display: 'block', width: 36, height: 1, background: 'var(--gold)', flexShrink: 0 }} />
                    {ja ? '隠れた地図を読む' : 'Charting what lies beneath'}
                </div>

                <h1 style={{
                    fontFamily: "'Cinzel', serif",
                    fontSize: 'clamp(3rem, 12vw, 9rem)',
                    fontWeight: 400, lineHeight: 0.92,
                    color: 'var(--parchment)', marginBottom: '0.1em',
                }}>
                    Hidden<br />
                    <em style={{ fontStyle: 'italic', fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, color: 'var(--gold-light)', display: 'block' }}>
                        Maps
                    </em>
                </h1>

                <p style={{
                    fontSize: 'clamp(0.95rem, 2.5vw, 1.15rem)',
                    fontWeight: 300, fontStyle: 'italic',
                    color: 'rgba(244,240,230,0.45)',
                    maxWidth: 480, marginTop: '2rem', marginBottom: '2.5rem',
                    lineHeight: 1.75,
                    fontFamily: ja ? "'Noto Serif JP', serif" : 'inherit',
                }}>
                    {ja
                        ? '世界を形づくるものの多くは表面には現れない——アイデア、歴史、そしてパターンは、どこを見ればいいかを知ったときにのみ姿を現す。'
                        : "Most of what shapes the world isn't visible on the surface — ideas, histories, and patterns that only reveal themselves when you know where to look."}
                </p>

                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    <Link href="#articles" style={{
                        fontFamily: "'DM Mono', monospace", fontSize: 'clamp(0.58rem, 1.5vw, 0.65rem)',
                        letterSpacing: '0.22em', textTransform: 'uppercase',
                        color: 'var(--ink)', background: 'var(--gold)',
                        padding: 'clamp(0.75rem, 2vw, 1rem) clamp(1.5rem, 4vw, 2.4rem)',
                        transition: 'background 0.2s', whiteSpace: 'nowrap',
                    }}>
                        {ja ? '記事を読む' : 'Explore Articles'}
                    </Link>
                    <Link href="#projects" style={{
                        fontFamily: "'DM Mono', monospace", fontSize: 'clamp(0.58rem, 1.5vw, 0.65rem)',
                        letterSpacing: '0.22em', textTransform: 'uppercase',
                        color: 'rgba(244,240,230,0.5)',
                        border: '1px solid rgba(244,240,230,0.15)',
                        padding: 'clamp(0.75rem, 2vw, 1rem) clamp(1.5rem, 4vw, 2.4rem)',
                        whiteSpace: 'nowrap',
                    }}>
                        {ja ? 'プロジェクトを見る' : 'View Projects'}
                    </Link>
                </div>
            </div>

            {/* Compass — hidden on very small screens */}
            <svg style={{ position: 'absolute', left: 'clamp(1rem, 3vw, 3rem)', bottom: '3rem', opacity: 0.18, width: 70, height: 70 }}
                viewBox="0 0 100 100" fill="none">
                <circle cx="50" cy="50" r="47" stroke="#c9922a" strokeWidth="0.6" />
                <circle cx="50" cy="50" r="38" stroke="#c9922a" strokeWidth="0.4" />
                <circle cx="50" cy="50" r="2.5" fill="#c9922a" />
                <line x1="50" y1="3" x2="50" y2="97" stroke="#c9922a" strokeWidth="0.4" />
                <line x1="3" y1="50" x2="97" y2="50" stroke="#c9922a" strokeWidth="0.4" />
                <polygon points="50,5 53,48 50,42 47,48" fill="#c9922a" />
                <text x="50" y="17" textAnchor="middle" fontFamily="serif" fontSize="9" fill="#c9922a">N</text>
            </svg>

            <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
        </section>
    )
}