'use client'

import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'

const STORY_URL = 'https://triskelion.hiddenmaps.app'

export default function TriskelionSection() {
  const { language } = useLanguage()
  const ja = language === 'ja'

  return (
    <section id="triskelion" style={{ background: 'var(--aged)', position: 'relative', overflow: 'hidden' }}>
      {/* Fine grid, matching AboutSection's paper texture */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.2, pointerEvents: 'none',
        backgroundImage: `repeating-linear-gradient(88deg, transparent, transparent 3px, rgba(92,74,42,0.05) 3px, rgba(92,74,42,0.05) 4px)`,
      }} />
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(to right, transparent, rgba(139,115,85,0.3), transparent)' }} />

      {/* Triskelion background image — full-bleed, centred behind the content */}
      <img
        src="/images/triskelion-parchment.jpg"
        alt=""
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          minWidth: '100%',
          minHeight: '100%',
          width: 'auto',
          height: 'auto',
          opacity: 0.07,
          pointerEvents: 'none',
          userSelect: 'none',
          objectFit: 'cover',
        }}
      />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 1200, margin: '0 auto', padding: 'clamp(3rem, 8vw, 6rem) clamp(1.25rem, 5vw, 3rem)' }}>

        <div className="reveal" style={{
          maxWidth: 680,
          background: 'var(--parchment)',
          padding: 'clamp(1.75rem, 4vw, 3rem)',
          margin: '0 auto',
        }}>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.32em', textTransform: 'uppercase', color: 'var(--rust)', display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.2rem' }}>
            {ja ? '姉妹プロジェクト' : 'A Sister Project'}
            <span style={{ width: 50, height: 1, background: 'var(--rust)', display: 'block' }} />
          </div>

          <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: 'clamp(1.8rem, 5vw, 2.6rem)', fontWeight: 400, letterSpacing: '0.04em', color: 'var(--ink)', marginBottom: '1.5rem' }}>
            Triskelion
          </h2>

          <p style={{
            fontSize: 'clamp(0.95rem, 2vw, 1.05rem)',
            color: 'var(--deep-sepia)',
            fontStyle: 'italic', lineHeight: 1.85,
            fontFamily: ja ? "'Noto Serif JP', serif" : "'Cormorant Garamond', serif",
            marginBottom: '1.4rem',
          }}>
            {ja
              ? 'ヒドゥン・オウルで述べられている理論から着想を得た世界。'
              : "A world inspired by theories stated here on hidden owl."}
          </p>

          <p style={{
            fontSize: 'clamp(0.9rem, 2vw, 0.98rem)',
            color: 'var(--deep-sepia)',
            lineHeight: 1.8,
            marginBottom: '2.2rem',
            fontFamily: ja ? "'Noto Serif JP', serif" : 'inherit',
          }}>
            {ja
              ? 'マウンテン・リバー・シーの理論を土台に、一つの短編映画または小説が制作中である。信頼の三つの柱が壊れたとき、社会に何が起こるのか——それを物語として描く、独立したワールドビルディング・プロジェクト。'
              : "Built on the Mountain/River/Sea framework, a short film or novel is currently in the works — an independent world-building project that carries the theory into narrative, imagining what happens when a society's trust-poles start to fail."}
          </p>

          <Link href={STORY_URL} target="_blank" rel="noopener noreferrer" style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.7rem',
            fontFamily: "'DM Mono', monospace", fontSize: 'clamp(0.6rem, 1.5vw, 0.68rem)',
            letterSpacing: '0.22em', textTransform: 'uppercase',
            color: 'var(--parchment)', background: 'var(--ink)',
            padding: 'clamp(0.85rem, 2vw, 1.1rem) clamp(1.75rem, 4vw, 2.6rem)',
            whiteSpace: 'nowrap',
            marginBottom: '1.8rem',
          }}>
            {ja ? 'トリスケリオンの世界へ' : 'Enter the World of Triskelion'} →
          </Link>

          <div style={{
            display: 'flex', flexWrap: 'wrap', gap: '0.6rem 1.4rem',
            fontFamily: "'DM Mono', monospace", fontSize: '0.58rem', letterSpacing: '0.15em', textTransform: 'uppercase',
            color: 'var(--faint)',
            borderTop: '1px solid rgba(139,115,85,0.2)', paddingTop: '1.2rem',
          }}>
            <Link href="/articles?filter=triskelion" style={{ color: 'var(--sepia)' }}>
              {ja ? '理論を読む →' : 'Read the Theory →'}
            </Link>
            <span style={{ opacity: 0.4 }}>·</span>
            <Link href="/triskelion-society-simulator.html" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--sepia)' }}>
              {ja ? 'シミュレーターを試す →' : 'Try the Simulator →'}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}