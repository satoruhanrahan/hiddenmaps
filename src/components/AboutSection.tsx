'use client'

import { useLanguage } from '@/contexts/LanguageContext'

export default function AboutSection() {
    const { language } = useLanguage()
    const ja = language === 'ja'

    return (
        <section id="about" style={{ position: 'relative', background: 'var(--aged)' }}>
            <div style={{
                position: 'absolute', inset: 0, opacity: 0.2, pointerEvents: 'none',
                backgroundImage: `repeating-linear-gradient(88deg, transparent, transparent 3px, rgba(92,74,42,0.05) 3px, rgba(92,74,42,0.05) 4px)`,
            }} />

            <div style={{ position: 'relative', zIndex: 1, maxWidth: 1200, margin: '0 auto', padding: '6rem 3rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.8fr', gap: '5rem', alignItems: 'start' }}>

                    <div className="reveal" style={{ position: 'sticky', top: '8rem' }}>
                        <svg style={{ width: '100%', maxWidth: 180, opacity: 0.08, marginBottom: '2rem' }} viewBox="0 0 180 40" fill="none">
                            <path d="M10,20 Q30,5 60,18 Q90,30 120,15 Q150,3 170,20" stroke="#0a0907" strokeWidth="8" strokeLinecap="round" fill="none" opacity="0.6" />
                            <path d="M10,20 Q30,5 60,18 Q90,30 120,15 Q150,3 170,20" stroke="#0a0907" strokeWidth="3" strokeLinecap="round" fill="none" />
                        </svg>
                        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.32em', textTransform: 'uppercase', color: 'var(--rust)', display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.5rem' }}>
                            {ja ? '概要' : 'About'}
                            <span style={{ width: 50, height: 1, background: 'var(--rust)', display: 'block' }} />
                        </div>
                        <h2 style={{ fontFamily: ja ? "'Noto Serif JP', serif" : "'Cinzel', serif", fontSize: '1.9rem', fontWeight: ja ? 700 : 400, lineHeight: 1.2 }}>
                            {ja ? '隠れた地図とは何か' : 'What is a Hidden Map?'}
                        </h2>
                    </div>

                    <div className="reveal reveal-delay-1" style={{ fontFamily: ja ? "'Noto Serif JP', serif" : 'inherit' }}>
                        {ja ? (
                            <>
                                <p style={{ fontSize: '1.05rem', color: 'var(--deep-sepia)', fontStyle: 'italic', lineHeight: 1.85, marginBottom: '1.6rem' }}>
                                    隠れた地図とは、その下にある構造のことだ——
                                    <strong style={{ color: 'var(--ink)', fontStyle: 'normal', fontWeight: 600 }}>文化を形づくった地理</strong>、
                                    <strong style={{ color: 'var(--ink)', fontStyle: 'normal', fontWeight: 600 }}>忘れられた福音書</strong>、
                                    <strong style={{ color: 'var(--ink)', fontStyle: 'normal', fontWeight: 600 }}>まだ誰も名付けていない理論</strong>。
                                    このサイトのすべての記事とプロジェクトは、そのような地図を描く試みだ。
                                </p>
                                <div style={{ borderLeft: '2px solid var(--gold)', paddingLeft: '1.5rem', margin: '2rem 0', fontSize: '1.1rem', fontStyle: 'italic', color: 'var(--deep-sepia)', lineHeight: 1.7 }}>
                                    「世界を形づくるものの多くは表面には現れない。見せてもらえない地図こそが、しばしば最も重要なものだ。」
                                </div>
                                <p style={{ fontSize: '1.05rem', color: 'var(--deep-sepia)', fontStyle: 'italic', lineHeight: 1.85, marginBottom: '1.6rem' }}>
                                    Hidden Mapsは
                                    <strong style={{ color: 'var(--ink)', fontStyle: 'normal', fontWeight: 600 }}>人間の好奇心</strong>と
                                    <strong style={{ color: 'var(--ink)', fontStyle: 'normal', fontWeight: 600 }}>AIの執筆</strong>の交差点に存在する。
                                    記事はClaudeと共に書かれ、本質的に何かを開くアイデアのためにキュレーションされる。
                                </p>
                            </>
                        ) : (
                            <>
                                <p style={{ fontSize: '1.05rem', color: 'var(--deep-sepia)', fontStyle: 'italic', lineHeight: 1.85, marginBottom: '1.6rem' }}>
                                    A hidden map is the structure underneath — the{' '}
                                    <strong style={{ color: 'var(--ink)', fontStyle: 'normal', fontWeight: 600 }}>geography that shaped a culture</strong>,
                                    the{' '}
                                    <strong style={{ color: 'var(--ink)', fontStyle: 'normal', fontWeight: 600 }}>forgotten gospel</strong>,
                                    the{' '}
                                    <strong style={{ color: 'var(--ink)', fontStyle: 'normal', fontWeight: 600 }}>theory nobody named yet</strong>.
                                    Every article and project on this site is an attempt to draw one.
                                </p>
                                <div style={{ borderLeft: '2px solid var(--gold)', paddingLeft: '1.5rem', margin: '2rem 0', fontSize: '1.1rem', fontStyle: 'italic', color: 'var(--deep-sepia)', lineHeight: 1.7 }}>
                                    "Most of what shapes the world isn't visible on the surface.
                                    The map they don't show you is often the most important one."
                                </div>
                                <p style={{ fontSize: '1.05rem', color: 'var(--deep-sepia)', fontStyle: 'italic', lineHeight: 1.85, marginBottom: '1.6rem' }}>
                                    Hidden Maps exists at the intersection of{' '}
                                    <strong style={{ color: 'var(--ink)', fontStyle: 'normal', fontWeight: 600 }}>human curiosity</strong> and{' '}
                                    <strong style={{ color: 'var(--ink)', fontStyle: 'normal', fontWeight: 600 }}>AI authorship</strong>.
                                    Articles are written with Claude and curated for ideas that genuinely open something up.
                                </p>
                            </>
                        )}
                        <div style={{
                            display: 'inline-flex', alignItems: 'center', gap: '0.7rem',
                            fontFamily: "'DM Mono', monospace", fontSize: '0.58rem', letterSpacing: '0.2em', textTransform: 'uppercase',
                            color: 'var(--sepia)', border: '1px solid rgba(139,115,85,0.3)', padding: '0.7rem 1.3rem',
                            background: 'rgba(255,255,255,0.4)',
                        }}>
                            <span style={{ color: 'var(--rust)' }}>◈</span>
                            {ja ? 'AI執筆・人間キュレーション・公明正大' : 'AI-Authored · Human Curated · Openly Stated'}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}