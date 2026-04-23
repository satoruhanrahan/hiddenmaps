'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import NavLight from '@/components/NavLight'
import Footer from '@/components/Footer'
import { articles, categories, categoryGroups } from '@/lib/articles'
import { useLanguage } from '@/contexts/LanguageContext'

export default function ArticlesPage() {
    const [activeFilter, setActiveFilter] = useState('all')
    const { language, t } = useLanguage()

    useEffect(() => {
        const reveals = document.querySelectorAll('.reveal')
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible')
                    observer.unobserve(entry.target)
                }
            })
        }, { threshold: 0.05 })
        reveals.forEach(el => observer.observe(el))
        return () => observer.disconnect()
    }, [activeFilter])

    const visibleGroups = categoryGroups.filter(g =>
        activeFilter === 'all' || g.key === activeFilter
    )

    return (
        <div style={{ background: 'var(--washi)', minHeight: '100vh' }}>
            <div style={{
                position: 'fixed', inset: 0, zIndex: 0, opacity: 0.3, pointerEvents: 'none',
                backgroundImage: `
          repeating-linear-gradient(91deg, transparent, transparent 2px, rgba(139,115,85,0.04) 2px, rgba(139,115,85,0.04) 3px),
          repeating-linear-gradient(179deg, transparent, transparent 4px, rgba(139,115,85,0.03) 4px, rgba(139,115,85,0.03) 5px)
        `,
            }} />

            <NavLight />

            {/* Page Header */}
            <header style={{
                position: 'relative', zIndex: 1,
                maxWidth: 1200, margin: '0 auto',
                padding: '9rem 3rem 4rem',
                borderBottom: '1px solid rgba(139,115,85,0.2)',
            }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'flex-end', gap: '3rem' }}>
                    <div>
                        <div style={{
                            fontFamily: "'DM Mono', monospace", fontSize: '0.58rem', letterSpacing: '0.25em',
                            textTransform: 'uppercase', color: 'var(--faint)', marginBottom: '1.5rem',
                            display: 'flex', alignItems: 'center', gap: '0.8rem',
                        }}>
                            <Link href="/" style={{ color: 'var(--sepia)' }}>Hidden Maps</Link>
                            <span>/</span>
                            <span>{t.nav.articles}</span>
                        </div>
                        <h1 style={{
                            fontFamily: "'Cinzel', serif",
                            fontSize: 'clamp(2.5rem, 6vw, 5rem)',
                            fontWeight: 400, lineHeight: 1,
                            color: 'var(--ink)', letterSpacing: '0.03em',
                        }}>
                            {language === 'ja' ? '隠れた' : 'The Hidden'}{' '}
                            <em style={{ fontStyle: 'italic', fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, color: 'var(--deep-sepia)' }}>
                                {language === 'ja' ? '層' : 'Layer'}
                            </em>
                        </h1>
                        <p style={{ fontSize: '1rem', fontStyle: 'italic', color: 'var(--sepia)', marginTop: '1rem' }}>
                            {language === 'ja'
                                ? 'アイデア、理論、そして構造を明らかにするエッセイ。'
                                : 'Ideas, theories and essays that reveal the structure underneath.'}
                        </p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <span style={{ fontFamily: "'Cinzel', serif", fontSize: '4rem', fontWeight: 400, color: 'var(--ink)', opacity: 0.08, lineHeight: 1, display: 'block' }}>
                            {articles.length}
                        </span>
                        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.58rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--faint)' }}>
                            {language === 'ja' ? '記事' : 'Articles'}
                        </span>
                    </div>
                </div>
            </header>

            {/* Filter Bar */}
            <div style={{
                position: 'relative', zIndex: 1,
                maxWidth: 1200, margin: '0 auto',
                padding: '2rem 3rem',
                display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap',
                borderBottom: '1px solid rgba(139,115,85,0.15)',
            }}>
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.55rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--faint)', marginRight: '0.6rem' }}>
                    {language === 'ja' ? 'フィルター' : 'Filter'}
                </span>
                {categories.map(cat => (
                    <button key={cat.key} onClick={() => setActiveFilter(cat.key)} style={{
                        fontFamily: language === 'ja' ? "'Noto Sans JP', sans-serif" : "'DM Mono', monospace",
                        fontSize: '0.58rem', letterSpacing: language === 'ja' ? '0.05em' : '0.15em',
                        textTransform: 'uppercase',
                        color: activeFilter === cat.key ? 'var(--parchment)' : 'var(--sepia)',
                        background: activeFilter === cat.key ? 'var(--ink)' : 'none',
                        border: activeFilter === cat.key ? '1px solid var(--ink)' : '1px solid rgba(139,115,85,0.25)',
                        padding: '0.45rem 1.1rem',
                        cursor: 'pointer', transition: 'all 0.2s',
                    }}>
                        {language === 'ja' ? cat.labelJa : cat.label}
                    </button>
                ))}
            </div>

            {/* Main */}
            <main style={{ position: 'relative', zIndex: 1, maxWidth: 1200, margin: '0 auto', padding: '0 3rem 6rem' }}>

                {/* AI Notice */}
                <div className="reveal" style={{
                    marginTop: '3rem', padding: '1.5rem 2rem',
                    border: '1px solid rgba(139,115,85,0.2)',
                    borderLeft: '3px solid var(--gold)',
                    background: 'rgba(255,255,255,0.3)',
                    display: 'flex', alignItems: 'center', gap: '1.5rem',
                }}>
                    <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.15em', color: 'var(--gold)', whiteSpace: 'nowrap' }}>
                        ◈ AI Authored
                    </span>
                    <p style={{ fontSize: '0.92rem', fontStyle: 'italic', color: 'var(--sepia)', lineHeight: 1.6 }}>
                        {language === 'ja'
                            ? <><strong style={{ fontStyle: 'normal', color: 'var(--ink)', fontWeight: 600 }}>これらの記事はClaudeとの共同執筆です。</strong> テーマは本質的に何かを開くアイデアのために選ばれています。AI執筆、人間キュレーション、公明正大。</>
                            : <><strong style={{ fontStyle: 'normal', color: 'var(--ink)', fontWeight: 600 }}>These articles are written with Claude.</strong> Topics are chosen for ideas that genuinely open something up. AI-authored, human-curated, openly stated.</>
                        }
                    </p>
                </div>

                {/* Category Groups */}
                {visibleGroups.map(group => {
                    const groupArticles = articles.filter(a => a.category === group.key)
                    return (
                        <div key={group.key} className="reveal" style={{ marginTop: '4rem' }}>
                            <div style={{
                                display: 'flex', alignItems: 'center', gap: '1.5rem',
                                marginBottom: '2rem', paddingBottom: '1rem',
                                borderBottom: '1px solid rgba(139,115,85,0.2)',
                            }}>
                                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.62rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--rust)' }}>
                                    {language === 'ja' ? group.labelJa : group.label}
                                </span>
                                <div style={{ flex: 1, height: 1, background: 'linear-gradient(to right, rgba(139,115,85,0.2), transparent)' }} />
                                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.55rem', letterSpacing: '0.15em', color: 'var(--faint)' }}>
                                    {language === 'ja' ? `${groupArticles.length}記事` : `${groupArticles.length} articles`}
                                </span>
                            </div>
                            {groupArticles.map(article => (
                                <ArticleRow key={article.slug} article={article} language={language} />
                            ))}
                        </div>
                    )
                })}

                <div style={{ textAlign: 'center', padding: '4rem 0 2rem', opacity: 0.12 }}>
                    <svg width="200" height="40" viewBox="0 0 200 40" fill="none">
                        <line x1="0" y1="20" x2="80" y2="20" stroke="#5c4a2a" strokeWidth="0.8" />
                        <line x1="120" y1="20" x2="200" y2="20" stroke="#5c4a2a" strokeWidth="0.8" />
                        <circle cx="100" cy="20" r="8" stroke="#5c4a2a" strokeWidth="0.8" />
                        <circle cx="100" cy="20" r="3" fill="#5c4a2a" />
                        <line x1="100" y1="5" x2="100" y2="35" stroke="#5c4a2a" strokeWidth="0.8" />
                        <line x1="85" y1="20" x2="115" y2="20" stroke="#5c4a2a" strokeWidth="0.8" />
                    </svg>
                </div>
            </main>

            <Footer />
        </div>
    )
}

function ArticleRow({ article, language }: { article: { num: string; title: string; titleJa: string; blurb: string; blurbJa: string; slug: string; image?: string }, language: string }) {
    const [hovered, setHovered] = useState(false)
    const title = language === 'ja' ? article.titleJa : article.title
    const blurb = language === 'ja' ? article.blurbJa : article.blurb

    return (
        <Link
            href={`/articles/${article.slug}`}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                display: 'grid',
                gridTemplateColumns: article.image ? '3rem 80px 1fr auto' : '3rem 1fr auto',
                alignItems: 'center',
                gap: '1.5rem',
                padding: '1.8rem 0',
                borderBottom: '1px solid rgba(139,115,85,0.1)',
                position: 'relative',
                transition: 'background 0.2s',
            }}
        >
            <div style={{
                position: 'absolute', left: '-3rem', right: '-3rem', top: 0, bottom: 0,
                background: 'rgba(255,255,255,0.5)',
                opacity: hovered ? 1 : 0,
                transition: 'opacity 0.2s',
                pointerEvents: 'none',
            }} />

            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.1em', color: 'var(--faint)', position: 'relative', zIndex: 1 }}>
                {article.num}
            </span>

            {article.image && (
                <div style={{ position: 'relative', zIndex: 1, width: 80, height: 54, overflow: 'hidden', border: '1px solid rgba(139,115,85,0.2)', flexShrink: 0 }}>
                    <img src={article.image} alt={title} style={{
                        width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block',
                        transition: 'transform 0.3s', transform: hovered ? 'scale(1.05)' : 'scale(1)',
                    }} />
                </div>
            )}

            <div style={{ position: 'relative', zIndex: 1 }}>
                <h2 style={{
                    fontFamily: language === 'ja' ? "'Noto Serif JP', serif" : "'Cormorant Garamond', serif",
                    fontSize: language === 'ja' ? '1rem' : '1.2rem',
                    fontWeight: 600, lineHeight: 1.3, marginBottom: '0.4rem',
                    color: hovered ? 'var(--deep-sepia)' : 'var(--ink)',
                    transition: 'color 0.2s',
                }}>
                    {title}
                </h2>
                <p style={{ fontSize: '0.88rem', fontStyle: 'italic', color: 'var(--sepia)', lineHeight: 1.5 }}>
                    {blurb}
                </p>
            </div>

            <div style={{ position: 'relative', zIndex: 1 }}>
                <span style={{
                    fontFamily: "'DM Mono', monospace", fontSize: '0.7rem',
                    color: hovered ? 'var(--rust)' : 'var(--faint)',
                    transform: hovered ? 'translateX(4px)' : 'translateX(0)',
                    transition: 'color 0.2s, transform 0.2s',
                    display: 'inline-block',
                }}>→</span>
            </div>
        </Link>
    )
}