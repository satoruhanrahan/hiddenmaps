'use client'

import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'

const projects = [
    {
        kanji: '漢', tag: 'Language · Japan', tagJa: '言語・日本',
        title: 'Joyo Kanji Explorer', titleJa: '常用漢字エクスプローラー',
        desc: 'All 2,136 joyo kanji — meanings, readings, stroke order, and the hidden connections between characters.',
        descJa: '常用漢字2,136字すべて——意味、読み方、筆順、そして文字間の隠れたつながり。',
        status: 'live', href: 'https://kanji.hiddenmaps.app', external: true,
    },
    {
        kanji: '幕', tag: 'History · Japan', tagJa: '歴史・日本',
        title: 'Bakumatsu Japan', titleJa: '幕末日本',
        desc: "An interactive map and guide to Japan's most turbulent era — the twilight of the samurai.",
        descJa: '日本で最も激動の時代——幕末のインタラクティブ地図とガイド。',
        status: 'live', href: 'https://bakumatsu.hiddenmaps.app', external: true,
    },
    {
        kanji: '地', tag: 'History · AI · Maps', tagJa: '歴史・AI・地図',
        title: 'TimeGlobe', titleJa: 'タイムグローブ',
        desc: 'An AI-powered globe. Select any place, any era — and watch the world as it once was brought to life.',
        descJa: 'AIを使った地球儀。任意の場所、任意の時代を選ぶと——かつての世界が生き生きと蘇る。',
        status: 'dev', href: 'https://timeglobe.hiddenmaps.app', external: true,
    },
]

const statusLabel: Record<string, { en: string; ja: string }> = {
    live: { en: 'Live', ja: '公開中' },
    dev: { en: 'In Development', ja: '開発中' },
    soon: { en: 'Coming Soon', ja: '近日公開' },
}

export default function ProjectsSection() {
    const { language } = useLanguage()
    const ja = language === 'ja'

    return (
        <section id="projects" style={{ background: 'var(--ink-soft)', position: 'relative', overflow: 'hidden' }}>
            <div style={{
                position: 'absolute', inset: 0, pointerEvents: 'none',
                backgroundImage: `linear-gradient(rgba(201,146,42,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(201,146,42,0.04) 1px, transparent 1px)`,
                backgroundSize: '40px 40px',
            }} />
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(to right, transparent, var(--gold), var(--rust), var(--gold), transparent)', opacity: 0.4 }} />

            <div style={{ position: 'relative', zIndex: 1, maxWidth: 1200, margin: '0 auto', padding: 'clamp(3rem, 8vw, 6rem) clamp(1.25rem, 5vw, 3rem)' }}>
                <div className="reveal">
                    <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.32em', textTransform: 'uppercase', color: 'var(--gold)', display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '0.8rem' }}>
                        {ja ? 'インタラクティブツール' : 'Interactive Tools'}
                        <span style={{ width: 50, height: 1, background: 'var(--gold)', display: 'block' }} />
                    </div>
                    <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: 'clamp(1.6rem, 5vw, 2.3rem)', fontWeight: 400, letterSpacing: '0.04em', color: 'var(--parchment)', marginBottom: 'clamp(2rem, 5vw, 3.5rem)' }}>
                        {ja ? 'ヒドゥンマップス' : 'Hidden Maps'}
                    </h2>
                </div>

                <div className="reveal reveal-delay-1 projects-grid">
                    {projects.map(p => (
                        <Link key={p.title} href={p.href}
                            target={p.external ? '_blank' : undefined}
                            rel={p.external ? 'noopener noreferrer' : undefined}
                            style={{ padding: 'clamp(1.5rem, 4vw, 2.5rem)', border: '1px solid rgba(201,146,42,0.1)', background: 'rgba(255,255,255,0.02)', display: 'block' }}>
                            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2rem, 5vw, 2.8rem)', fontWeight: 300, color: 'rgba(201,146,42,0.3)', display: 'block', lineHeight: 1, marginBottom: '1.2rem' }}>
                                {p.kanji}
                            </span>
                            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.56rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.7rem' }}>
                                {ja ? p.tagJa : p.tag}
                            </div>
                            <h3 style={{ fontFamily: ja ? "'Noto Serif JP', serif" : "'Cinzel', serif", fontSize: 'clamp(0.9rem, 2.5vw, 1.05rem)', fontWeight: ja ? 700 : 400, color: 'var(--parchment)', marginBottom: '0.8rem', lineHeight: 1.35 }}>
                                {ja ? p.titleJa : p.title}
                            </h3>
                            <p style={{ fontSize: 'clamp(0.82rem, 2vw, 0.92rem)', color: 'rgba(244,240,230,0.4)', fontStyle: 'italic', lineHeight: 1.65, fontFamily: ja ? "'Noto Serif JP', serif" : 'inherit' }}>
                                {ja ? p.descJa : p.desc}
                            </p>
                            <span style={{
                                display: 'inline-block', marginTop: '1.4rem',
                                fontFamily: "'DM Mono', monospace", fontSize: '0.52rem', letterSpacing: '0.22em', textTransform: 'uppercase',
                                padding: '0.35rem 0.9rem',
                                border: p.status === 'live' ? '1px solid rgba(201,146,42,0.35)' : '1px solid rgba(244,240,230,0.1)',
                                color: p.status === 'live' ? 'var(--gold)' : 'rgba(244,240,230,0.3)',
                            }}>
                                {ja ? statusLabel[p.status].ja : statusLabel[p.status].en}
                            </span>
                        </Link>
                    ))}
                </div>
            </div>

            <style>{`
        .projects-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }
        @media (max-width: 768px) {
          .projects-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }
        }
        @media (min-width: 769px) and (max-width: 1024px) {
          .projects-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>
        </section>
    )
}