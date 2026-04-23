'use client'

import Link from 'next/link'
import { articles as allArticles } from '@/lib/articles'
import { useLanguage } from '@/contexts/LanguageContext'

const featuredSlugs = [
    'floodplain-vs-fractured-sea',
    'gnosticism-and-the-demiurge',
    'yin-yang-fractal-map',
    'queen-himiko-yamatai',
    'harmony-paradox',
]

const featuredArticles = featuredSlugs
    .map(slug => allArticles.find(a => a.slug === slug))
    .filter(Boolean) as typeof allArticles

const AtlasCorner = ({ flip }: { flip?: boolean }) => (
    <svg style={{
        position: 'absolute', width: 80, height: 80, opacity: 0.12,
        top: '2rem', ...(flip ? { right: '2rem', transform: 'scaleX(-1)' } : { left: '2rem' }),
    }} viewBox="0 0 80 80" fill="none">
        <line x1="0" y1="0" x2="80" y2="0" stroke="#5c4a2a" strokeWidth="2" />
        <line x1="0" y1="0" x2="0" y2="80" stroke="#5c4a2a" strokeWidth="2" />
        <line x1="10" y1="10" x2="50" y2="10" stroke="#5c4a2a" strokeWidth="0.5" />
        <line x1="10" y1="10" x2="10" y2="50" stroke="#5c4a2a" strokeWidth="0.5" />
        <line x1="20" y1="20" x2="40" y2="20" stroke="#5c4a2a" strokeWidth="0.5" />
        <line x1="20" y1="20" x2="20" y2="40" stroke="#5c4a2a" strokeWidth="0.5" />
    </svg>
)

export default function ArticlesSection() {
    const { language } = useLanguage()
    const ja = language === 'ja'
    const featured = featuredArticles[0]
    const rest = featuredArticles.slice(1)

    return (
        <section id="articles" style={{ position: 'relative', background: 'var(--washi)' }}>
            <div style={{
                position: 'absolute', inset: 0, opacity: 0.3, pointerEvents: 'none',
                backgroundImage: `
          repeating-linear-gradient(91deg, transparent, transparent 2px, rgba(139,115,85,0.04) 2px, rgba(139,115,85,0.04) 3px),
          repeating-linear-gradient(179deg, transparent, transparent 4px, rgba(139,115,85,0.03) 4px, rgba(139,115,85,0.03) 5px)
        `,
            }} />

            <div style={{ position: 'relative', zIndex: 1, maxWidth: 1200, margin: '0 auto', padding: '6rem 3rem' }}>
                <AtlasCorner />
                <AtlasCorner flip />

                <div className="reveal" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '3.5rem' }}>
                    <div>
                        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.32em', textTransform: 'uppercase', color: 'var(--rust)', display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '0.8rem' }}>
                            {ja ? 'アイデアとエッセイ' : 'Ideas & Essays'}
                            <span style={{ width: 50, height: 1, background: 'var(--rust)', display: 'block' }} />
                        </div>
                        <h2 style={{ fontFamily: ja ? "'Noto Serif JP', serif" : "'Cinzel', serif", fontSize: '2.3rem', fontWeight: ja ? 700 : 400, letterSpacing: '0.04em' }}>
                            {ja ? '隠れた層' : 'The Hidden Layer'}
                        </h2>
                    </div>
                    <Link href="/articles" style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.62rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--sepia)', borderBottom: '1px solid var(--faint)', paddingBottom: '0.2rem' }}>
                        {ja ? `全${allArticles.length}記事 →` : `All ${allArticles.length} Articles →`}
                    </Link>
                </div>

                <div className="reveal reveal-delay-1" style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr', gridTemplateRows: 'auto auto', border: '1px solid rgba(139,115,85,0.25)' }}>
                    {featured && (
                        <Link href={`/articles/${featured.slug}`} style={{ gridRow: 'span 2', borderRight: '1px solid rgba(139,115,85,0.3)', background: 'rgba(255,255,255,0.3)', display: 'flex', flexDirection: 'column', transition: 'background 0.3s', overflow: 'hidden' }}>
                            {featured.image && (
                                <div style={{ width: '100%', height: 220, overflow: 'hidden', flexShrink: 0 }}>
                                    <img src={featured.image} alt={ja ? featured.titleJa : featured.title}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }} />
                                </div>
                            )}
                            <div style={{ padding: '2.5rem 3rem', flex: 1 }}>
                                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.52rem', letterSpacing: '0.2em', color: 'var(--faint)', marginBottom: '0.6rem' }}>
                                    {ja ? '記録番号' : 'Record No.'} {featured.num}
                                </div>
                                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.56rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--rust)', marginBottom: '0.9rem' }}>
                                    {ja ? featured.categoryLabelJa : featured.categoryLabel}
                                </div>
                                <h3 style={{ fontFamily: ja ? "'Noto Serif JP', serif" : "'Cormorant Garamond', serif", fontSize: ja ? '1.4rem' : '1.85rem', fontWeight: 600, lineHeight: 1.2, marginBottom: '1.2rem' }}>
                                    {ja ? featured.titleJa : featured.title}
                                </h3>
                                <p style={{ fontSize: '0.98rem', color: 'var(--sepia)', fontStyle: 'italic', lineHeight: 1.75, fontFamily: ja ? "'Noto Serif JP', serif" : 'inherit' }}>
                                    {ja ? featured.blurbJa : featured.blurb}
                                </p>
                            </div>
                        </Link>
                    )}

                    {rest.map((article, i) => (
                        <Link key={article.slug} href={`/articles/${article.slug}`} style={{ border: '1px solid rgba(139,115,85,0.15)', background: 'rgba(255,255,255,0.3)', display: 'flex', flexDirection: 'column', transition: 'background 0.3s', overflow: 'hidden', borderBottom: i < 2 ? '1px solid rgba(139,115,85,0.2)' : undefined }}>
                            {article.image && (
                                <div style={{ width: '100%', height: 120, overflow: 'hidden', flexShrink: 0 }}>
                                    <img src={article.image} alt={ja ? article.titleJa : article.title}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }} />
                                </div>
                            )}
                            <div style={{ padding: '2.2rem 2.5rem', flex: 1 }}>
                                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.52rem', letterSpacing: '0.2em', color: 'var(--faint)', marginBottom: '0.6rem' }}>
                                    {ja ? '記録番号' : 'Record No.'} {article.num}
                                </div>
                                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.56rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--rust)', marginBottom: '0.9rem' }}>
                                    {ja ? article.categoryLabelJa : article.categoryLabel}
                                </div>
                                <h3 style={{ fontFamily: ja ? "'Noto Serif JP', serif" : "'Cormorant Garamond', serif", fontSize: ja ? '0.95rem' : '1.12rem', fontWeight: 600, lineHeight: 1.3 }}>
                                    {ja ? article.titleJa : article.title}
                                </h3>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}