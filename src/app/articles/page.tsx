'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import NavLight from '@/components/NavLight'
import Footer from '@/components/Footer'
import { humanArticles as articles, articles as allArticles, categories, categoryGroups } from '@/lib/articles'
import { useLanguage } from '@/contexts/LanguageContext'

// Map nav filter params to category keys
const filterMap: Record<string, string> = {
    japan: 'japan',
    history: 'history',
    culture: 'culture',
    spirituality: 'spirituality',
    theory: 'theory',
    science: 'science',
    triskelion: 'triskelion',
    all: 'all',
}

function ArticlesPageInner() {
    const [activeFilter, setActiveFilter] = useState('all')
    const [selectedBook, setSelectedBook] = useState('kojiki')
    const { language, t } = useLanguage()
    const searchParams = useSearchParams()

    // Read ?filter= from URL on load
    useEffect(() => {
        const param = searchParams.get('filter')
        if (param && filterMap[param]) {
            setActiveFilter(filterMap[param])
        }
    }, [searchParams])

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

    // Display label for filter buttons — renames japan to Fukurou
    function getCatLabel(cat: { key: string; label: string; labelJa?: string }) {
        if (cat.key === 'japan') return language === 'ja' ? 'Fukurou 不苦労' : 'Fukurou 不苦労'
        if (cat.key === 'triskelion') return 'Triskelion'
        return language === 'ja' ? (cat.labelJa || cat.label) : cat.label
    }

    // Display label for category group headers
    function getGroupLabel(group: { key: string; label: string; labelJa?: string }) {
        if (group.key === 'japan') {
            return language === 'ja' ? 'Fukurou 不苦労' : 'Fukurou 不苦労'
        }
        return language === 'ja' ? (group.labelJa || group.label) : group.label
    }

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
                padding: 'clamp(5rem,12vw,9rem) clamp(1.25rem,5vw,3rem) clamp(2rem,5vw,4rem)',
                borderBottom: '1px solid rgba(139,115,85,0.2)',
            }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'flex-end', gap: '3rem', flexWrap: 'wrap' }}>
                    <div>
                        <div style={{
                            fontFamily: "'DM Mono', monospace", fontSize: '0.58rem', letterSpacing: '0.25em',
                            textTransform: 'uppercase', color: 'var(--faint)', marginBottom: '1.5rem',
                            display: 'flex', alignItems: 'center', gap: '0.8rem', flexWrap: 'wrap',
                        }}>
                            <Link href="/" style={{ color: 'var(--sepia)' }}>The Hidden Owl</Link>
                            <span>/</span>
                            <span>{language === 'ja' ? '隠れた層' : 'The Hidden Layers'}</span>
                            {activeFilter !== 'all' && (
                                <>
                                    <span>/</span>
                                    <span style={{ color: 'var(--rust)' }}>
                                        {getCatLabel(categories.find(c => c.key === activeFilter) || { key: activeFilter, label: activeFilter })}
                                    </span>
                                </>
                            )}
                        </div>
                        <h1 style={{
                            fontFamily: "'Cinzel', serif",
                            fontSize: 'clamp(2.5rem, 6vw, 5rem)',
                            fontWeight: 400, lineHeight: 1,
                            color: 'var(--ink)', letterSpacing: '0.03em',
                        }}>
                            {language === 'ja' ? '隠れた' : 'The Hidden'}{' '}
                            <em style={{ fontStyle: 'italic', fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, color: 'var(--deep-sepia)' }}>
                                {language === 'ja' ? '層' : 'Layers'}
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
                padding: `1rem clamp(1.25rem,5vw,3rem)`,
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
                        background: activeFilter === cat.key ? (cat.key === 'triskelion' ? '#1e2820' : 'var(--ink)') : 'none',
                        border: activeFilter === cat.key ? (cat.key === 'triskelion' ? '1px solid #1e2820' : '1px solid var(--ink)') : '1px solid rgba(139,115,85,0.25)',
                        padding: '0.45rem 1.1rem',
                        cursor: 'pointer', transition: 'all 0.2s',
                    }}>
                        {getCatLabel(cat)}
                    </button>
                ))}
            </div>

            {/* Main */}
            <main style={{ position: 'relative', zIndex: 1, maxWidth: 1200, margin: '0 auto', padding: `0 clamp(1.25rem,5vw,3rem) ${activeFilter === 'japan' || activeFilter === 'triskelion' ? '0' : 'clamp(3rem,8vw,6rem)'}` }}>

                {/* Non-Japan category groups */}
                {activeFilter !== 'triskelion' && visibleGroups.filter(g => g.key !== 'japan').map(group => {
                    const groupArticles = articles.filter(a => a.category === group.key)

                    // Define series within each category
                    const seriesMap: Record<string, { key: string; label: string; labelJa: string; slugs: string[] }[]> = {
                        culture: [
                            { key: 'geography', label: 'The Geography of Power', labelJa: '権力の地理学', slugs: ['floodplain-vs-fragmented-sea', 'geography-of-hierarchy', 'two-shapes-of-hierarchy'] },
                            { key: 'whypeople', label: 'Why People Think So Different', labelJa: 'なぜ人は違う考え方をするのか', slugs: ['why-people-think-so-different-1', 'why-people-think-so-different-2'] },
                            { key: 'culturecreates', label: 'Culture Creates the Future', labelJa: '文化が未来を創る', slugs: ['culture-creates-the-future-01-cultural-comparative-advantage', 'culture-creates-the-future-02-automation-sharpens-the-divide', 'culture-creates-the-future-03-two-nations-two-strategies', 'culture-creates-the-future-04-australias-demographic-bet', 'culture-creates-the-future-05-creator-economy-wealth-of-worlds', 'culture-creates-the-future-06-where-creators-go-for-inspiration', 'culture-creates-the-future-07-where-creators-live', 'culture-creates-the-future-08-the-individual-universe'] },
                            { key: 'wholepart', label: 'The Whole and the Part', labelJa: '全体と部分', slugs: ['article-1-the-cosmological-fork', 'article-2-the-language-of-survival', 'article-3-connection-as-assumption', 'article-4-symmetric-insecurities', 'article-5-the-structural-solution'] },
                            { key: 'greatillusion', label: 'The Great Illusion', labelJa: '大いなる幻想', slugs: ['great-illusion-1-the-fish-dont-know-theyre-wet', 'great-illusion-2-the-water-has-a-shape', 'great-illusion-3-you-went-there-you-didnt-see-it', 'great-illusion-4-there-is-no-single-track', 'great-illusion-5-the-man-in-the-room', 'great-illusion-6-the-loop', 'great-illusion-7-why-nobody-told-you'] },
                            { key: 'humour', label: 'What Humour Actually Is', labelJa: 'ユーモアとは何か', slugs: ['what-humor-actually-is', 'japan-comedy-restored-order', 'the-wests-many-anxieties', 'banter'] },
                            { key: 'australian', label: 'The Australian Social Script', labelJa: 'オーストラリアの社会的スクリプト', slugs: ['friendliness-mandate', 'why-australia-tests-strangers', 'ghost-of-the-frontier'] },
                            { key: 'invisible', label: 'The Invisible Man', labelJa: '見えない男', slugs: ['invisible-man-1-the-present-reality', 'invisible-man-2-what-makes-a-man-attractive', 'invisible-man-3-when-sensitivity-was-strength', 'invisible-man-4-the-making-of-the-hard-man', 'invisible-man-5-the-gold-rush', 'invisible-man-6-different-environments-different-men', 'invisible-man-7-did-beauty-shape-the-face', 'invisible-man-8-the-man-without-a-love-interest', 'invisible-man-9-the-state-decides', 'invisible-man-10-kpop-and-its-limits', 'invisible-man-11-why-he-was-never-in-the-picture'] },
                        ],
                        spirituality: [
                            { key: 'christianity', label: 'Is Christianity True?', labelJa: 'キリスト教は真実か？', slugs: ['is-christianity-true', 'is-christianity-true-2'] },
                            { key: 'freepeople', label: 'Why Free People Make Others Uncomfortable', labelJa: '自由な人がなぜ他者を不快にさせるのか', slugs: ['why-free-people-make-others-uncomfortable'] },
                        ],
                    }

                    const seriesList = seriesMap[group.key] || []
                    const seriesSlugs = seriesList.flatMap(s => s.slugs)
                    const standaloneArticles = groupArticles.filter(a => !seriesSlugs.includes(a.slug))

                    return (
                        <div key={group.key} className="reveal" style={{ marginTop: '4rem' }}>
                            {/* Group header */}
                            <div style={{
                                display: 'flex', alignItems: 'center', gap: '1.5rem',
                                marginBottom: '2rem', paddingBottom: '1rem',
                                borderBottom: '1px solid rgba(139,115,85,0.2)',
                            }}>
                                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.62rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--rust)' }}>
                                    {getGroupLabel(group)}
                                </span>
                                <div style={{ flex: 1, height: 1, background: 'linear-gradient(to right, rgba(139,115,85,0.2), transparent)' }} />
                                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.55rem', letterSpacing: '0.15em', color: 'var(--faint)' }}>
                                    {language === 'ja' ? `${groupArticles.length}記事` : `${groupArticles.length} articles`}
                                </span>
                            </div>

                            {/* Standalone articles first */}
                            {standaloneArticles.map(article => (
                                <ArticleRow key={article.slug} article={article} language={language} />
                            ))}

                            {/* Series subsections */}
                            {seriesList.map(series => {
                                const seriesArticles = articles.filter(a => series.slugs.includes(a.slug))
                                if (seriesArticles.length === 0) return null
                                return (
                                    <div key={series.key} style={{ marginTop: standaloneArticles.length > 0 ? '2.5rem' : '0', marginBottom: '1rem' }}>
                                        <div style={{
                                            display: 'flex', alignItems: 'center', gap: '1rem',
                                            marginBottom: '1rem', paddingBottom: '0.7rem',
                                            borderBottom: '1px solid rgba(139,115,85,0.15)',
                                        }}>
                                            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.58rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--sepia)' }}>
                                                {language === 'ja' ? series.labelJa : series.label}
                                            </span>
                                            <span style={{
                                                fontFamily: "'DM Mono', monospace", fontSize: '0.5rem',
                                                letterSpacing: '0.15em', textTransform: 'uppercase',
                                                color: 'var(--faint)', border: '1px solid rgba(139,115,85,0.2)',
                                                padding: '0.15rem 0.5rem',
                                            }}>
                                                {language === 'ja' ? 'シリーズ' : 'Series'}
                                            </span>
                                            <div style={{ flex: 1, height: 1, background: 'linear-gradient(to right, rgba(139,115,85,0.15), transparent)' }} />
                                            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.52rem', color: 'var(--faint)' }}>
                                                {language === 'ja' ? `${seriesArticles.length}記事` : `${seriesArticles.length} articles`}
                                            </span>
                                        </div>
                                        {seriesArticles.map(article => (
                                            <ArticleRow key={article.slug} article={article} language={language} />
                                        ))}
                                    </div>
                                )
                            })}
                        </div>
                    )
                })}

                {activeFilter !== 'japan' && activeFilter !== 'triskelion' && (
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
                )}
            </main>

            {/* Fukurou section — full width dark background */}
            {(activeFilter === 'all' || activeFilter === 'japan') && (() => {
                const historyArticles = articles.filter(a => a.category === 'japan' && [
                    'queen-himiko-yamatai',
                    'amaterasu-and-susanoo',
                    'xu-fu-founded-japan',
                    'edo-japan-happiness',
                ].includes(a.slug))

                const societyArticles = articles.filter(a => a.category === 'japan' && [
                    'harmony-paradox',
                    'emergency-that-never-ended',
                    'reading-the-air',
                ].includes(a.slug))

                const fukuzawaArticles = articles.filter(a => a.category === 'japan' && [
                    'fukuzawa-1-who-he-was',
                    'fukuzawa-2-the-warning',
                    'fukuzawa-3-tokugawa-psychology',
                    'fukuzawa-4-he-saw-it-happening',
                    'fukuzawa-5-memorialisation',
                ].includes(a.slug))

                const sekigaharaArticles = articles.filter(a => a.category === 'japan' && [
                    'sekigahara-1-the-man-on-the-hill',
                    'sekigahara-2-the-japan-that-never-was',
                    'sekigahara-3-the-machinery-of-harmony',
                    'sekigahara-4-a-different-people',
                    'sekigahara-5-variables-not-constants',
                ].includes(a.slug))

                const negativityArticles = articles.filter(a => a.category === 'japan' && [
                    'negativity-1-kotodama',
                    'negativity-2-gambaru',
                    'negativity-3-smooth-surface',
                    'negativity-4-the-cost',
                ].includes(a.slug))

                const socialMapArticles = articles.filter(a => a.category === 'japan' && [
                    'uchi-and-soto',
                    'the-rings',
                    'the-ranking',
                ].includes(a.slug))

                const truthArticles = articles.filter(a => a.category === 'japan' && [
                    'tatemae-and-honne',
                    'anti-kaizen-1-dual-epistemology',
                    'anti-kaizen-2-edo-and-meiji',
                    'anti-kaizen-3-falsification-apparatus',
                    'anti-kaizen-4-inspection-records',
                    'anti-kaizen-5-ghost-in-the-system',
                ].includes(a.slug))

                const toBeJapaneseArticles = articles.filter(a => a.category === 'japan' && [
                    'to-be-japanese',
                    'why-the-fusion-runs-so-deep',
                    'written-in-the-blood',
                    'what-reckoning-actually-costs',
                ].includes(a.slug))

                const subsections = [
                    { key: 'history', label: language === 'ja' ? '歴史' : 'History', articles: historyArticles },
                    { key: 'society', label: language === 'ja' ? '社会・文化' : 'Society & Culture', articles: societyArticles },
                    { key: 'sekigahara', label: language === 'ja' ? '関ヶ原' : 'Sekigahara', articles: sekigaharaArticles, series: true },
                    { key: 'fukuzawa', label: language === 'ja' ? '福澤諭吉' : 'Fukuzawa Yukichi', articles: fukuzawaArticles, series: true },
                    { key: 'negativity', label: language === 'ja' ? 'ネガティビティとの関係' : "Japan's Relationship with Negativity", articles: negativityArticles, series: true },
                    { key: 'tobejapanese', label: language === 'ja' ? '日本人であること' : 'To Be Japanese', articles: toBeJapaneseArticles, series: true },
                    { key: 'socialmap', label: language === 'ja' ? '日本の社会地図' : "Japan's Social Map", articles: socialMapArticles, series: true },
                    { key: 'truth', label: language === 'ja' ? '二つの真実の基準' : 'Two Standards of Truth', articles: truthArticles, series: true },
                ]

                return (
                    <section style={{
                        background: 'var(--ink-soft)',
                        position: 'relative',
                        overflow: 'hidden',
                    }}>
                        {/* Grid overlay */}
                        <div style={{
                            position: 'absolute', inset: 0, pointerEvents: 'none',
                            backgroundImage: `linear-gradient(rgba(244,240,230,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(244,240,230,0.03) 1px, transparent 1px)`,
                            backgroundSize: '40px 40px',
                        }} />
                        {/* Top/bottom accent lines */}
                        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(to right, transparent, var(--gold), var(--rust), var(--gold), transparent)', opacity: 0.4 }} />
                        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(to right, transparent, var(--gold), var(--rust), var(--gold), transparent)', opacity: 0.4 }} />

                        <div style={{ position: 'relative', zIndex: 1, maxWidth: 1200, margin: '0 auto', padding: 'clamp(3rem,6vw,5rem) clamp(1.25rem,5vw,3rem)' }}>

                            {/* Fukurou header */}
                            <div style={{ borderLeft: '3px solid var(--gold)', paddingLeft: '1.5rem', marginBottom: '3rem' }}>
                                <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem', flexWrap: 'wrap' }}>
                                    <span style={{ fontFamily: "'Cinzel', serif", fontSize: '1.1rem', letterSpacing: '0.2em', color: 'var(--parchment)' }}>
                                        Fukurou
                                    </span>
                                    <span style={{ fontFamily: "'Noto Serif JP', serif", fontSize: '1.6rem', color: 'var(--gold)', lineHeight: 1 }}>
                                        不苦労
                                    </span>
                                    <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.55rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(244,240,230,0.35)' }}>
                                        — {language === 'ja' ? '日本' : 'Japan'}
                                    </span>
                                    <div style={{ flex: 1, height: 1, background: 'linear-gradient(to right, rgba(201,146,42,0.3), transparent)' }} />
                                    <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.55rem', letterSpacing: '0.15em', color: 'rgba(244,240,230,0.3)' }}>
                                        {language === 'ja'
                                            ? `${articles.filter(a => a.category === 'japan').length}記事`
                                            : `${articles.filter(a => a.category === 'japan').length} articles`}
                                    </span>
                                </div>
                                <p style={{ marginTop: '0.6rem', fontSize: '0.85rem', fontStyle: 'italic', color: 'rgba(244,240,230,0.35)', lineHeight: 1.6 }}>
                                    {language === 'ja'
                                        ? '日本の歴史、社会、そして表面の下にある構造についてのエッセイ。'
                                        : 'Essays on Japan — its history, society, and the structures beneath the surface.'}
                                </p>
                            </div>

                            {/* Subsections */}
                            {subsections.map(sub => sub.articles.length > 0 && (
                                <div key={sub.key} style={{ marginBottom: '3.5rem' }}>
                                    <div style={{
                                        display: 'flex', alignItems: 'center', gap: '1rem',
                                        marginBottom: '1.5rem', paddingBottom: '0.8rem',
                                        borderBottom: '1px solid rgba(201,146,42,0.2)',
                                    }}>
                                        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.58rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--gold)' }}>
                                            {sub.label}
                                        </span>
                                        {sub.series && (
                                            <span style={{
                                                fontFamily: "'DM Mono', monospace", fontSize: '0.5rem',
                                                letterSpacing: '0.15em', textTransform: 'uppercase',
                                                color: 'rgba(201,146,42,0.6)',
                                                border: '1px solid rgba(201,146,42,0.3)',
                                                padding: '0.15rem 0.5rem',
                                            }}>
                                                {language === 'ja' ? 'シリーズ' : 'Series'}
                                            </span>
                                        )}
                                        <div style={{ flex: 1, height: 1, background: 'linear-gradient(to right, rgba(201,146,42,0.2), transparent)' }} />
                                        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.52rem', color: 'rgba(244,240,230,0.25)' }}>
                                            {language === 'ja' ? `${sub.articles.length}記事` : `${sub.articles.length} articles`}
                                        </span>
                                    </div>
                                    {sub.articles.map(article => (
                                        <ArticleRow key={article.slug} article={article} language={language} dark />
                                    ))}
                                </div>
                            ))}
                        </div>
                    </section>
                )
            })()}

            {/* Triskelion section — full width deep green */}
            {(activeFilter === 'all' || activeFilter === 'triskelion') && (() => {
                const triskelionAccent = '#4a8c5c'
                const triskelionGold = '#a8c878'
                const books = [
                    { key: 'kojiki', book: 'Book I', label: language === 'ja' ? '古事記を読む' : 'Reading the Kojiki', slugs: ['triskelion-01-the-first-kami', 'triskelion-02-the-ownerless-god', 'triskelion-03-the-two-forces', 'triskelion-04-the-tao-and-the-kojiki', 'triskelion-05-the-reed-shoot', 'triskelion-06-the-standing-heaven', 'triskelion-07-the-paired-world', 'triskelion-08-mud-and-sand', 'triskelion-09-the-stake-in-the-ground', 'triskelion-10-the-first-dwelling', 'triskelion-11-the-binding-princess', 'triskelion-12-the-invitation', 'triskelion-13-the-courtship-and-the-correction', 'triskelion-14-the-birth-of-the-islands', 'triskelion-15-the-fire-that-kills', 'triskelion-16-the-descent', 'triskelion-17-the-negotiation-at-the-boulder', 'triskelion-18-the-purification', 'triskelion-19-what-the-myth-might-remember', 'triskelion-20-the-boulder-and-the-peace', 'triskelion-21-the-three-noble-children', 'triskelion-22-the-cave', 'triskelion-23-the-exile-and-what-was-built', 'triskelion-24-the-settlement'] },
                    { key: 'framework', book: 'Book II', label: language === 'ja' ? '枠組み' : 'The Framework', slugs: [] },
                    { key: 'japan', book: 'Book III', label: language === 'ja' ? '日本' : 'Japan', slugs: [] },
                    { key: 'world', book: 'Book IV', label: language === 'ja' ? '世界' : 'The World', slugs: [] },
                    { key: 'now', book: 'Book V', label: language === 'ja' ? '今' : 'Now', slugs: [] },
                ]

                const activeBook = books.find(b => b.key === selectedBook)
                const activeBookArticles = activeBook ? allArticles.filter(a => activeBook.slugs.includes(a.slug) && a.authored === 'human') : []

                return (
                    <section style={{ background: '#1e2820', position: 'relative', overflow: 'hidden' }}>
                        <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', backgroundImage: 'linear-gradient(rgba(74,140,92,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(74,140,92,0.06) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
                        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(to right, transparent, #4a8c5c, #a8c878, #4a8c5c, transparent)', opacity: 0.5 }} />
                        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(to right, transparent, #4a8c5c, #a8c878, #4a8c5c, transparent)', opacity: 0.5 }} />

                        <div style={{ position: 'relative', zIndex: 1, maxWidth: 1200, margin: '0 auto', padding: 'clamp(3rem,6vw,5rem) clamp(1.25rem,5vw,3rem)' }}>
                            <div style={{ borderLeft: '3px solid #4a8c5c', paddingLeft: '1.5rem', marginBottom: '3rem' }}>
                                <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem', flexWrap: 'wrap', marginBottom: '0.6rem' }}>
                                    <span style={{ fontFamily: "'Cinzel', serif", fontSize: '1.1rem', letterSpacing: '0.2em', color: 'rgba(244,240,230,0.9)' }}>
                                        Triskelion
                                    </span>
                                    <span style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: '1rem', color: triskelionGold, opacity: 0.8 }}>
                                        {language === 'ja' ? '山・海・川の理論' : 'A Theory of Mountain, Sea, and River'}
                                    </span>
                                    <div style={{ flex: 1, height: 1, background: 'linear-gradient(to right, rgba(74,140,92,0.3), transparent)' }} />
                                </div>
                                <p style={{ fontSize: '0.82rem', fontStyle: 'italic', color: 'rgba(244,240,230,0.35)', lineHeight: 1.6, maxWidth: 560 }}>
                                    {language === 'ja'
                                        ? '古事記、理論の枠組み、日本の歴史、世界のパターン、そして現在の緊張——五冊の書としての持続的な知的作業。'
                                        : 'A sustained intellectual work in five books — reading the Kojiki, building a framework, tracing Japan, mapping the world, living the tension.'}
                                </p>
                            </div>

                            {/* Book selector cards */}
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1rem', marginBottom: '3rem' }}>
                                {books.map(book => {
                                    const hasArticles = book.slugs.length > 0
                                    const isSelected = selectedBook === book.key
                                    return (
                                        <button
                                            key={book.key}
                                            onClick={() => hasArticles && setSelectedBook(book.key)}
                                            style={{
                                                border: isSelected ? '1px solid #4a8c5c' : '1px solid rgba(74,140,92,0.25)',
                                                background: isSelected ? 'rgba(74,140,92,0.15)' : 'rgba(255,255,255,0.02)',
                                                padding: '1.25rem 1rem',
                                                textAlign: 'left',
                                                cursor: hasArticles ? 'pointer' : 'default',
                                                opacity: hasArticles ? 1 : 0.4,
                                                transition: 'all 0.2s',
                                                outline: 'none',
                                            }}>
                                            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.5rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: isSelected ? triskelionGold : 'rgba(168,200,120,0.5)', marginBottom: '0.4rem' }}>
                                                {book.book}
                                            </div>
                                            <div style={{ fontFamily: "'Cinzel', serif", fontSize: '0.82rem', letterSpacing: '0.08em', color: isSelected ? 'rgba(244,240,230,0.95)' : 'rgba(244,240,230,0.6)', lineHeight: 1.3, marginBottom: '0.6rem' }}>
                                                {book.label}
                                            </div>
                                            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.48rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: hasArticles ? triskelionAccent : 'rgba(74,140,92,0.4)' }}>
                                                {hasArticles
                                                    ? (language === 'ja' ? book.slugs.length + '記事' : book.slugs.length + ' articles')
                                                    : (language === 'ja' ? '近日公開' : 'Coming soon')}
                                            </div>
                                        </button>
                                    )
                                })}
                            </div>

                            {/* Article list for selected book */}
                            {activeBookArticles.length > 0 && (
                                <div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', paddingBottom: '0.8rem', borderBottom: '1px solid rgba(74,140,92,0.25)' }}>
                                        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.58rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: triskelionGold }}>
                                            {activeBook?.label}
                                        </span>
                                        <div style={{ flex: 1, height: 1, background: 'linear-gradient(to right, rgba(74,140,92,0.3), transparent)' }} />
                                        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.52rem', color: 'rgba(244,240,230,0.25)' }}>
                                            {language === 'ja' ? activeBookArticles.length + '記事' : activeBookArticles.length + ' articles'}
                                        </span>
                                    </div>
                                    {activeBookArticles.map(article => (
                                        <ArticleRow key={article.slug} article={article} language={language} dark />
                                    ))}
                                </div>
                            )}
                        </div>
                    </section>
                )
            })()}


            <Footer />
        </div>
    )
}

export default function ArticlesPage() {
    return (
        <Suspense fallback={<div style={{ background: 'var(--washi)', minHeight: '100vh' }} />}>
            <ArticlesPageInner />
        </Suspense>
    )
}

function ArticleRow({ article, language, dark }: { article: { num: string; title: string; titleJa: string; blurb: string; blurbJa: string; slug: string; image?: string }, language: string, dark?: boolean }) {
    const [hovered, setHovered] = useState(false)
    const title = language === 'ja' ? article.titleJa : article.title
    const blurb = language === 'ja' ? article.blurbJa : article.blurb
    const titleColor = dark ? 'rgba(244,240,230,0.85)' : 'var(--ink)'
    const hoverColor = dark ? 'var(--gold-light)' : 'var(--deep-sepia)'
    const blurbColor = dark ? 'rgba(244,240,230,0.35)' : 'var(--sepia)'
    const borderColor = dark ? 'rgba(201,146,42,0.12)' : 'rgba(139,115,85,0.1)'
    const hoverBg = dark ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.5)'
    const numColor = dark ? 'rgba(201,146,42,0.4)' : 'var(--faint)'

    return (
        <Link
            href={`/articles/${article.slug}`}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="article-row"
            style={{
                display: 'grid',
                gridTemplateColumns: article.image ? 'clamp(2rem,4vw,3rem) clamp(60px,8vw,80px) 1fr' : 'clamp(2rem,4vw,3rem) 1fr',
                alignItems: 'center',
                gap: 'clamp(0.8rem,2vw,1.5rem)',
                padding: '1.5rem 0',
                borderBottom: `1px solid ${borderColor}`,
                position: 'relative',
            }}
        >
            <div style={{
                position: 'absolute', left: '-3rem', right: '-3rem', top: 0, bottom: 0,
                background: hoverBg,
                opacity: hovered ? 1 : 0,
                transition: 'opacity 0.2s',
                pointerEvents: 'none',
            }} />

            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.1em', color: numColor, position: 'relative', zIndex: 1 }}>
                {article.num}
            </span>

            {article.image && (
                <div style={{ position: 'relative', zIndex: 1, width: '100%', height: 54, overflow: 'hidden', border: `1px solid ${dark ? 'rgba(201,146,42,0.15)' : 'rgba(139,115,85,0.2)'}`, flexShrink: 0 }}>
                    <img src={article.image} alt={title} style={{
                        width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block',
                        transition: 'transform 0.3s', transform: hovered ? 'scale(1.05)' : 'scale(1)',
                    }} />
                </div>
            )}

            <div style={{ position: 'relative', zIndex: 1, minWidth: 0 }}>
                <h2 style={{
                    fontFamily: language === 'ja' ? "'Noto Serif JP', serif" : "'Cormorant Garamond', serif",
                    fontSize: language === 'ja' ? '1rem' : '1.2rem',
                    fontWeight: 600, lineHeight: 1.3, marginBottom: '0.4rem',
                    color: hovered ? hoverColor : titleColor,
                    transition: 'color 0.2s',
                }}>
                    {title}
                </h2>
                <p style={{ fontSize: '0.88rem', fontStyle: 'italic', color: blurbColor, lineHeight: 1.5 }}>
                    {blurb}
                </p>
            </div>
        </Link>
    )
}