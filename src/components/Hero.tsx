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
      {/* Large owl — right side atmospheric */}
      <img
        src="/images/owl-logo-light.png"
        alt=""
        aria-hidden="true"
        style={{
          position: 'absolute',
          right: '-5%',
          top: '50%',
          transform: 'translateY(-50%)',
          height: 'min(90vh, 900px)',
          width: 'auto',
          opacity: 0.18,
          pointerEvents: 'none',
          userSelect: 'none',
          objectFit: 'contain',
        }}
      />

      <div style={{ position: 'relative', zIndex: 2, maxWidth: 1200, margin: '0 auto', width: '100%' }}>

        {/* Eyebrow */}
        <div style={{
          fontFamily: "'DM Mono', monospace", fontSize: 'clamp(0.52rem, 1.5vw, 0.62rem)',
          letterSpacing: '0.35em', textTransform: 'uppercase', color: 'var(--gold)',
          marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem',
        }}>
          <span style={{ display: 'block', width: 36, height: 1, background: 'var(--gold)', flexShrink: 0 }} />
          {ja ? '隠れたものを観る' : 'Observing the hidden'}
        </div>

        {/* Brand name */}
        <h1 style={{
          fontFamily: "'Cinzel', serif",
          fontSize: 'clamp(2.8rem, 10vw, 8rem)',
          fontWeight: 400, lineHeight: 0.92,
          color: 'var(--parchment)', marginBottom: '0.1em',
        }}>
          The Hidden<br />
          <em style={{ fontStyle: 'italic', fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, color: 'var(--gold-light)', display: 'block' }}>
            Owl
          </em>
        </h1>

        {/* Subtitle */}
        <p style={{
          fontSize: 'clamp(0.95rem, 2.5vw, 1.15rem)',
          fontWeight: 300, fontStyle: 'italic',
          color: 'rgba(244,240,230,0.45)',
          maxWidth: 480, marginTop: '2rem', marginBottom: '2.5rem',
          lineHeight: 1.75,
          fontFamily: ja ? "'Noto Serif JP', serif" : 'inherit',
        }}>
          {ja
            ? '歴史・文化・文明、そして世界を形づくるアイデアについてのエッセイ。'
            : 'Essays on history, culture, civilisation, and the ideas that shape the world.'}
        </p>

        {/* CTAs */}
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <Link href="#articles" style={{
            fontFamily: "'DM Mono', monospace", fontSize: 'clamp(0.58rem, 1.5vw, 0.65rem)',
            letterSpacing: '0.22em', textTransform: 'uppercase',
            color: 'var(--ink)', background: 'var(--gold)',
            padding: 'clamp(0.75rem, 2vw, 1rem) clamp(1.5rem, 4vw, 2.4rem)',
            transition: 'background 0.2s', whiteSpace: 'nowrap',
          }}>
            {ja ? 'エッセイを読む' : 'Read the Essays'}
          </Link>
          <Link href="#projects" style={{
            fontFamily: "'DM Mono', monospace", fontSize: 'clamp(0.58rem, 1.5vw, 0.65rem)',
            letterSpacing: '0.22em', textTransform: 'uppercase',
            color: 'rgba(244,240,230,0.5)',
            border: '1px solid rgba(244,240,230,0.15)',
            padding: 'clamp(0.75rem, 2vw, 1rem) clamp(1.5rem, 4vw, 2.4rem)',
            whiteSpace: 'nowrap',
          }}>
            {ja ? '地図を探る' : 'Explore the Maps'}
          </Link>
        </div>
      </div>

      {/* Compass rose */}
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
    </section>
  )
}
