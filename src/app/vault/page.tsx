'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import NavLight from '@/components/NavLight'
import Footer from '@/components/Footer'
import { articles, categories, categoryGroups, type Article } from '@/lib/articles'
import { useLanguage } from '@/contexts/LanguageContext'

const VAULT_PASSWORD = process.env.NEXT_PUBLIC_VAULT_PASSWORD || 'owl'

function PasswordGate({ onEnter }: { onEnter: () => void }) {
  const [input, setInput] = useState('')
  const [error, setError] = useState(false)
  const { language } = useLanguage()
  const ja = language === 'ja'

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (input === VAULT_PASSWORD) {
      sessionStorage.setItem('vault-auth', 'true')
      onEnter()
    } else {
      setError(true)
      setInput('')
    }
  }

  return (
    <div style={{
      minHeight: '100vh', background: 'var(--washi)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '2rem',
    }}>
      <div style={{
        maxWidth: 380, width: '100%', textAlign: 'center',
        border: '1px solid rgba(139,115,85,0.2)', padding: '3rem 2.5rem',
        background: 'rgba(255,255,255,0.4)',
      }}>
        <img src="/images/owl-logo-dark.png" alt="" aria-hidden="true"
          style={{ width: 48, height: 64, objectFit: 'contain', filter: 'invert(1) sepia(0.3) brightness(0.25)', marginBottom: '1.5rem' }} />

        <h1 style={{ fontFamily: "'Cinzel', serif", fontSize: '1.1rem', fontWeight: 400, letterSpacing: '0.2em', color: 'var(--ink)', marginBottom: '0.5rem' }}>
          {ja ? '保管庫' : 'THE VAULT'}
        </h1>
        <p style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.52rem', letterSpacing: '0.2em', color: 'var(--faint)', textTransform: 'uppercase', marginBottom: '2.5rem' }}>
          {ja ? 'プライベートアクセスのみ' : 'Private access only'}
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <input
            type="password"
            value={input}
            onChange={e => { setInput(e.target.value); setError(false) }}
            placeholder={ja ? 'パスワード' : 'Password'}
            autoFocus
            style={{
              background: 'rgba(255,255,255,0.6)',
              border: error ? '1px solid var(--rust)' : '1px solid rgba(139,115,85,0.3)',
              color: 'var(--ink)',
              fontFamily: "'DM Mono', monospace",
              fontSize: '0.9rem',
              padding: '0.8rem 1rem',
              outline: 'none',
              textAlign: 'center',
              letterSpacing: '0.2em',
            }}
          />
          {error && (
            <p style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.52rem', color: 'var(--rust)', letterSpacing: '0.15em' }}>
              {ja ? 'パスワードが違います' : 'Incorrect password'}
            </p>
          )}
          <button type="submit" style={{
            background: 'var(--ink)', color: 'var(--parchment)',
            border: 'none', cursor: 'pointer',
            fontFamily: "'DM Mono', monospace", fontSize: '0.6rem',
            letterSpacing: '0.25em', textTransform: 'uppercase',
            padding: '0.85rem',
            transition: 'opacity 0.2s',
          }}>
            {ja ? '入る' : 'Enter'}
          </button>
        </form>

        <div style={{ marginTop: '2rem' }}>
          <Link href="/" style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.52rem', letterSpacing: '0.15em', color: 'var(--faint)', textTransform: 'uppercase' }}>
            {ja ? '← サイトに戻る' : '← Back to site'}
          </Link>
        </div>
      </div>
    </div>
  )
}

function VaultInner() {
  const [entered, setEntered] = useState(false)
  const [activeFilter, setActiveFilter] = useState('all')
  const [selectedBook, setSelectedBook] = useState('kojiki')
  const { language } = useLanguage()
  const searchParams = useSearchParams()
  const ja = language === 'ja'

  useEffect(() => {
    if (sessionStorage.getItem('vault-auth') === 'true') setEntered(true)
  }, [])

  useEffect(() => {
    const param = searchParams.get('filter')
    if (param) setActiveFilter(param)
  }, [searchParams])

  if (!entered) return <PasswordGate onEnter={() => setEntered(true)} />

  const visibleGroups = categoryGroups.filter(g =>
    activeFilter === 'all' || (activeFilter !== 'triskelion' && g.key === activeFilter)
  )

  function getCatLabel(cat: { key: string; label: string; labelJa?: string }) {
    if (cat.key === 'japan') return 'Fukurou 不苦労'
    if (cat.key === 'triskelion') return 'Triskelion'
    return ja ? (cat.labelJa || cat.label) : cat.label
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

      {/* Header */}
      <header style={{
        position: 'relative', zIndex: 1,
        maxWidth: 1200, margin: '0 auto',
        padding: 'clamp(5rem,12vw,9rem) clamp(1.25rem,5vw,3rem) clamp(2rem,5vw,4rem)',
        borderBottom: '1px solid rgba(139,115,85,0.2)',
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'flex-end', gap: '2rem', flexWrap: 'wrap' }}>
          <div>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.58rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--faint)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
              <Link href="/" style={{ color: 'var(--sepia)' }}>The Hidden Owl</Link>
              <span>/</span>
              <span style={{ color: 'var(--rust)' }}>{ja ? '保管庫' : 'The Vault'}</span>
            </div>
            <h1 style={{ fontFamily: "'Cinzel', serif", fontSize: 'clamp(2.5rem,6vw,5rem)', fontWeight: 400, lineHeight: 1, color: 'var(--ink)', letterSpacing: '0.03em' }}>
              {ja ? (
                <span style={{ fontFamily: "'Noto Serif JP', serif", fontWeight: 700 }}>保管庫</span>
              ) : (
                <>The{' '}<em style={{ fontStyle: 'italic', fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, color: 'var(--deep-sepia)' }}>Vault</em></>
              )}
            </h1>
            <p style={{ fontSize: '1rem', fontStyle: 'italic', color: 'var(--sepia)', marginTop: '1rem' }}>
              {ja ? 'すべての記事——AIと人間の執筆。' : 'All articles — AI-authored and human-written.'}
            </p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <span style={{ fontFamily: "'Cinzel', serif", fontSize: '4rem', fontWeight: 400, color: 'var(--ink)', opacity: 0.08, lineHeight: 1, display: 'block' }}>
              {articles.length}
            </span>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.58rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--faint)' }}>
              {ja ? '記事' : 'Articles'}
            </span>
          </div>
        </div>
      </header>

      {/* Filter bar */}
      <div style={{
        position: 'relative', zIndex: 1,
        maxWidth: 1200, margin: '0 auto',
        padding: '1rem clamp(1.25rem,5vw,3rem)',
        display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap',
        borderBottom: '1px solid rgba(139,115,85,0.15)',
      }}>
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.52rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--faint)', marginRight: '0.4rem' }}>
          {ja ? 'フィルター' : 'Filter'}
        </span>
        {categories.map(cat => (
          <button key={cat.key} onClick={() => setActiveFilter(cat.key)} style={{
            fontFamily: "'DM Mono', monospace", fontSize: '0.58rem', letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: activeFilter === cat.key ? 'var(--parchment)' : 'var(--sepia)',
            background: activeFilter === cat.key ? 'var(--ink)' : 'none',
            border: activeFilter === cat.key ? '1px solid var(--ink)' : '1px solid rgba(139,115,85,0.25)',
            padding: '0.45rem 1.1rem', cursor: 'pointer', transition: 'all 0.2s',
          }}>
            {getCatLabel(cat)}
          </button>
        ))}
        <button key="triskelion" onClick={() => setActiveFilter('triskelion')} style={{
          fontFamily: "'DM Mono', monospace", fontSize: '0.58rem', letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: activeFilter === 'triskelion' ? 'var(--parchment)' : 'var(--sepia)',
          background: activeFilter === 'triskelion' ? '#1e2820' : 'none',
          border: activeFilter === 'triskelion' ? '1px solid #1e2820' : '1px solid rgba(139,115,85,0.25)',
          padding: '0.45rem 1.1rem', cursor: 'pointer', transition: 'all 0.2s',
        }}>
          Triskelion
        </button>
        <button
          onClick={() => { sessionStorage.removeItem('vault-auth'); setEntered(false) }}
          style={{
            marginLeft: 'auto', fontFamily: "'DM Mono', monospace", fontSize: '0.52rem',
            letterSpacing: '0.15em', textTransform: 'uppercase',
            color: 'var(--faint)', background: 'none',
            border: '1px solid rgba(139,115,85,0.2)', padding: '0.4rem 0.8rem', cursor: 'pointer',
          }}
        >
          {ja ? 'ロック' : 'Lock'}
        </button>
      </div>

      {/* Articles */}
      <main style={{ position: 'relative', zIndex: 1, maxWidth: 1200, margin: '0 auto', padding: '0 clamp(1.25rem,5vw,3rem) clamp(3rem,8vw,6rem)' }}>
        {/* AI Notice */}
        <div className="reveal" style={{
          marginTop: '3rem', padding: '1.5rem 2rem',
          border: '1px solid rgba(139,115,85,0.2)', borderLeft: '3px solid var(--gold)',
          background: 'rgba(255,255,255,0.3)', display: 'flex', alignItems: 'center', gap: '1.5rem',
        }}>
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.15em', color: 'var(--gold)', whiteSpace: 'nowrap' }}>◈ {ja ? 'プライベート' : 'Private'}</span>
          <p style={{ fontSize: '0.92rem', fontStyle: 'italic', color: 'var(--sepia)', lineHeight: 1.6 }}>
            {ja
              ? <><strong style={{ fontStyle: 'normal', color: 'var(--ink)', fontWeight: 600 }}>完全なアーカイブ。</strong>すべての記事を含む個人保管庫です。</>
              : <><strong style={{ fontStyle: 'normal', color: 'var(--ink)', fontWeight: 600 }}>The full archive.</strong>{' '}Your personal vault containing all articles.</>
            }
          </p>
        </div>

        {visibleGroups.filter(g => g.key !== 'japan').map(group => {
          const groupArticles = articles.filter(a => a.category === group.key)
          if (groupArticles.length === 0) return null

          const seriesMap: Record<string, { key: string; label: string; labelJa: string; slugs: string[] }[]> = {
            culture: [
              { key: 'geography', label: 'The Geography of Power', labelJa: '権力の地理学', slugs: ['floodplain-vs-fractured-sea', 'geography-of-hierarchy', 'two-shapes-of-hierarchy'] },
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
            ],
            science: [
              { key: 'shortcutmind', label: 'The Shortcut Mind', labelJa: 'ショートカット思考', slugs: ['the-shortcut-mind-01-built-to-survive-not-to-see', 'the-shortcut-mind-02-the-tools-we-built-to-see-anyway', 'the-shortcut-mind-03-what-atrophies', 'the-shortcut-mind-04-the-oldest-advice'] },
            ],
          }

          const seriesList = seriesMap[group.key] || []
          const seriesSlugs = seriesList.flatMap(s => s.slugs)
          const standaloneArticles = groupArticles.filter(a => !seriesSlugs.includes(a.slug))

          return (
            <div key={group.key} style={{ marginTop: '4rem' }}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: '1.5rem',
                marginBottom: '2rem', paddingBottom: '1rem',
                borderBottom: '1px solid rgba(139,115,85,0.2)',
              }}>
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.62rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--rust)' }}>
                  {getCatLabel(group)}
                </span>
                <div style={{ flex: 1, height: 1, background: 'linear-gradient(to right, rgba(139,115,85,0.2), transparent)' }} />
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.55rem', color: 'var(--faint)' }}>
                  {ja ? `${groupArticles.length}記事` : `${groupArticles.length} articles`}
                </span>
              </div>

              {standaloneArticles.map(article => <VaultArticleRow key={article.slug} article={article} ja={ja} />)}

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
                        {ja ? series.labelJa : series.label}
                      </span>
                      <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.5rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--faint)', border: '1px solid rgba(139,115,85,0.2)', padding: '0.15rem 0.5rem' }}>
                        {ja ? 'シリーズ' : 'Series'}
                      </span>
                      <div style={{ flex: 1, height: 1, background: 'linear-gradient(to right, rgba(139,115,85,0.15), transparent)' }} />
                      <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.52rem', color: 'var(--faint)' }}>
                        {ja ? `${seriesArticles.length}記事` : `${seriesArticles.length} articles`}
                      </span>
                    </div>
                    {seriesArticles.map(article => <VaultArticleRow key={article.slug} article={article} ja={ja} />)}
                  </div>
                )
              })}
            </div>
          )
        })}
      </main>

      {/* Fukurou section — full width dark */}
      {(activeFilter === 'all' || activeFilter === 'japan') && (() => {
        const historyArticles = articles.filter(a => a.category === 'japan' && ['queen-himiko-yamatai', 'amaterasu-and-susanoo', 'xu-fu-founded-japan', 'edo-japan-happiness'].includes(a.slug))
        const societyArticles = articles.filter(a => a.category === 'japan' && ['harmony-paradox', 'emergency-that-never-ended', 'reading-the-air'].includes(a.slug))
        const sekigaharaArticles = articles.filter(a => a.category === 'japan' && ['sekigahara-1-the-man-on-the-hill', 'sekigahara-2-the-japan-that-never-was', 'sekigahara-3-the-machinery-of-harmony', 'sekigahara-4-a-different-people', 'sekigahara-5-variables-not-constants'].includes(a.slug))
        const fukuzawaArticles = articles.filter(a => a.category === 'japan' && ['fukuzawa-1-who-he-was', 'fukuzawa-2-the-warning', 'fukuzawa-3-tokugawa-psychology', 'fukuzawa-4-he-saw-it-happening', 'fukuzawa-5-memorialisation'].includes(a.slug))
        const negativityArticles = articles.filter(a => a.category === 'japan' && ['negativity-1-kotodama', 'negativity-2-gambaru', 'negativity-3-smooth-surface', 'negativity-4-the-cost'].includes(a.slug))
        const toBeJapaneseArticles = articles.filter(a => a.category === 'japan' && ['to-be-japanese', 'why-the-fusion-runs-so-deep', 'written-in-the-blood', 'what-reckoning-actually-costs'].includes(a.slug))
        const socialMapArticles = articles.filter(a => a.category === 'japan' && ['uchi-and-soto', 'the-rings', 'the-ranking'].includes(a.slug))
        const truthArticles = articles.filter(a => a.category === 'japan' && ['tatemae-and-honne', 'anti-kaizen-1-dual-epistemology', 'anti-kaizen-2-edo-and-meiji', 'anti-kaizen-3-falsification-apparatus', 'anti-kaizen-4-inspection-records', 'anti-kaizen-5-ghost-in-the-system'].includes(a.slug))

        const subsections = [
          { key: 'history', label: ja ? '歴史' : 'History', articles: historyArticles },
          { key: 'society', label: ja ? '社会・文化' : 'Society & Culture', articles: societyArticles },
          { key: 'sekigahara', label: ja ? '関ヶ原' : 'Sekigahara', articles: sekigaharaArticles, series: true },
          { key: 'fukuzawa', label: ja ? '福澤諭吉' : 'Fukuzawa Yukichi', articles: fukuzawaArticles, series: true },
          { key: 'negativity', label: ja ? 'ネガティビティとの関係' : "Japan's Relationship with Negativity", articles: negativityArticles, series: true },
          { key: 'tobejapanese', label: ja ? '日本人であること' : 'To Be Japanese', articles: toBeJapaneseArticles, series: true },
          { key: 'socialmap', label: ja ? '日本の社会地図' : "Japan's Social Map", articles: socialMapArticles, series: true },
          { key: 'truth', label: ja ? '二つの真実の基準' : 'Two Standards of Truth', articles: truthArticles, series: true },
          { key: 'emptiness', label: ja ? '努力の背後にある空虚' : 'The Emptiness Behind the Effort', articles: articles.filter(a => a.category === 'japan' && ['the-emptiness-behind-the-effort-01-the-machine-that-never-stopped', 'the-emptiness-behind-the-effort-02-the-borrowed-purpose', 'the-emptiness-behind-the-effort-03-the-void-and-the-villain', 'the-emptiness-behind-the-effort-04-the-american-trap', 'the-emptiness-behind-the-effort-05-the-wound-nobody-named', 'the-emptiness-behind-the-effort-06-the-universal-machine', 'the-emptiness-behind-the-effort-07-the-machine-can-stop'].includes(a.slug)), series: true },
          { key: 'justsmile', label: ja ? 'ただ微笑んで手を振れ' : 'Just Smile and Wave', articles: articles.filter(a => a.category === 'japan' && ['just-smile-and-wave-01-the-cost-of-wa', 'just-smile-and-wave-02-everyone-else-looks-angry', 'just-smile-and-wave-03-the-hostile-room', 'just-smile-and-wave-04-when-the-wall-comes-down', 'just-smile-and-wave-05-bamboo-spears-to-waving-in-the-street', 'just-smile-and-wave-06-two-different-alliances', 'just-smile-and-wave-07-the-argument-that-proves-itself'].includes(a.slug)), series: true },
        ]

        return (
          <section style={{ background: 'var(--ink-soft)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', backgroundImage: `linear-gradient(rgba(244,240,230,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(244,240,230,0.03) 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(to right, transparent, var(--gold), var(--rust), var(--gold), transparent)', opacity: 0.4 }} />
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(to right, transparent, var(--gold), var(--rust), var(--gold), transparent)', opacity: 0.4 }} />

            <div style={{ position: 'relative', zIndex: 1, maxWidth: 1200, margin: '0 auto', padding: 'clamp(3rem,6vw,5rem) clamp(1.25rem,5vw,3rem)' }}>
              <div style={{ borderLeft: '3px solid var(--gold)', paddingLeft: '1.5rem', marginBottom: '3rem' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem', flexWrap: 'wrap' }}>
                  <span style={{ fontFamily: "'Cinzel', serif", fontSize: '1.1rem', letterSpacing: '0.2em', color: 'var(--parchment)' }}>Fukurou</span>
                  <span style={{ fontFamily: "'Noto Serif JP', serif", fontSize: '1.6rem', color: 'var(--gold)', lineHeight: 1 }}>不苦労</span>
                  <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.55rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(244,240,230,0.35)' }}>— {ja ? '日本' : 'Japan'}</span>
                  <div style={{ flex: 1, height: 1, background: 'linear-gradient(to right, rgba(201,146,42,0.3), transparent)' }} />
                  <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.55rem', color: 'rgba(244,240,230,0.3)' }}>
                    {ja ? `${articles.filter(a => a.category === 'japan').length}記事` : `${articles.filter(a => a.category === 'japan').length} articles`}
                  </span>
                </div>
              </div>

              {subsections.map(sub => sub.articles.length > 0 && (
                <div key={sub.key} style={{ marginBottom: '3.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', paddingBottom: '0.8rem', borderBottom: '1px solid rgba(201,146,42,0.2)' }}>
                    <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.58rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--gold)' }}>
                      {sub.label}
                    </span>
                    {sub.series && (
                      <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.5rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(201,146,42,0.6)', border: '1px solid rgba(201,146,42,0.3)', padding: '0.15rem 0.5rem' }}>
                        {ja ? 'シリーズ' : 'Series'}
                      </span>
                    )}
                    <div style={{ flex: 1, height: 1, background: 'linear-gradient(to right, rgba(201,146,42,0.2), transparent)' }} />
                    <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.52rem', color: 'rgba(244,240,230,0.25)' }}>
                      {ja ? `${sub.articles.length}記事` : `${sub.articles.length} articles`}
                    </span>
                  </div>
                  {sub.articles.map(article => <VaultArticleRow key={article.slug} article={article} ja={ja} dark />)}
                </div>
              ))}
            </div>
          </section>
        )
      })()}

      {/* Triskelion section */}
      {(activeFilter === 'all' || activeFilter === 'triskelion') && (() => {
        const triskelionAccent = '#4a8c5c'
        const triskelionGold = '#a8c878'

        const books = [
          { key: 'kojiki', book: 'Book I', label: ja ? '古事記を読む' : 'Reading the Kojiki', slugs: ['triskelion-01-the-first-kami', 'triskelion-02-the-ownerless-god', 'triskelion-03-the-two-forces', 'triskelion-04-the-tao-and-the-kojiki', 'triskelion-05-the-reed-shoot', 'triskelion-06-the-standing-heaven', 'triskelion-07-the-paired-world', 'triskelion-08-mud-and-sand', 'triskelion-09-the-stake-in-the-ground', 'triskelion-10-the-first-dwelling', 'triskelion-11-the-binding-princess', 'triskelion-12-the-invitation', 'triskelion-13-the-courtship-and-the-correction', 'triskelion-14-the-birth-of-the-islands', 'triskelion-15-the-fire-that-kills', 'triskelion-16-the-descent', 'triskelion-17-the-negotiation-at-the-boulder', 'triskelion-18-the-purification', 'triskelion-19-what-the-myth-might-remember', 'triskelion-20-the-boulder-and-the-peace', 'triskelion-21-the-three-noble-children', 'triskelion-22-the-cave', 'triskelion-23-the-exile-and-what-was-built', 'triskelion-24-the-settlement'] },
          { key: 'framework', book: 'Book II', label: ja ? '枠組み' : 'The Framework', slugs: ['triskelion-b2-01-from-two-to-three', 'triskelion-b2-02-three-ways-of-being-in-the-world', 'triskelion-b2-03-the-same-discovery', 'triskelion-b2-04-the-mountain-people', 'triskelion-b2-05-the-river-people', 'triskelion-b2-06-the-sea-people', 'triskelion-b2-07-how-trust-works', 'triskelion-b2-07b-what-each-pole-does-in-hard-times', 'triskelion-b2-07c-all-three-in-the-same-crisis', 'triskelion-b2-08-the-three-microcosms', 'triskelion-b2-09-the-three-sacred-objects', 'triskelion-b2-10-the-mitsudomoe', 'triskelion-b2-11-the-goddess-in-heaven', 'triskelion-b2-12-the-balance', 'triskelion-b2-13-the-world-today'] },
          { key: 'japan', book: 'Book III', label: ja ? '日本' : 'Japan', slugs: ['triskelion-b3-01-before-the-synthesis', 'triskelion-b3-02-himiko-and-the-sea-peoples-sacred-queen', 'triskelion-b3-03-the-izumo-coalition', 'triskelion-b3-04-the-yamato-synthesis', 'triskelion-b3-05-the-hime-hiko-system', 'triskelion-b3-06-the-heian-flowering', 'triskelion-b3-07-the-institutionalized-tension', 'triskelion-b3-08-the-meiji-gamble', 'triskelion-b3-09-the-unresolved-present'] },
          { key: 'world', book: 'Book IV', label: ja ? '世界' : 'The World', slugs: ['triskelion-b4-01-the-pattern', 'triskelion-b4-02-the-agricultural-rupture', 'triskelion-b4-03-the-near-eastern-pattern', 'triskelion-b4-04-rome-and-the-celts', 'triskelion-b4-05-whitby-and-nara', 'triskelion-b4-06-arthur-and-the-kojiki', 'triskelion-b4-07-chinas-three-poles', 'triskelion-b4-08-the-fractured-sea', 'triskelion-b4-09-the-axial-age', 'triskelion-b4-10-the-twentieth-century'] },
          { key: 'now', book: 'Book V', label: ja ? '今' : 'Now', slugs: [] },
        ]

        return (
          <section style={{ background: '#1e2820', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', backgroundImage: 'linear-gradient(rgba(74,140,92,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(74,140,92,0.06) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(to right, transparent, #4a8c5c, #a8c878, #4a8c5c, transparent)', opacity: 0.5 }} />
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(to right, transparent, #4a8c5c, #a8c878, #4a8c5c, transparent)', opacity: 0.5 }} />

            <div style={{ position: 'relative', zIndex: 1, maxWidth: 1200, margin: '0 auto', padding: 'clamp(3rem,6vw,5rem) clamp(1.25rem,5vw,3rem)' }}>
              <div style={{ borderLeft: '3px solid #4a8c5c', paddingLeft: '1.5rem', marginBottom: '3rem' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem', flexWrap: 'wrap', marginBottom: '0.6rem' }}>
                  <span style={{ fontFamily: "'Cinzel', serif", fontSize: '1.1rem', letterSpacing: '0.2em', color: 'rgba(244,240,230,0.9)' }}>Triskelion</span>
                  <span style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: '1rem', color: triskelionGold, opacity: 0.8 }}>
                    {ja ? '山・海・川の理論' : 'A Theory of Mountain, Sea, and River'}
                  </span>
                  <div style={{ flex: 1, height: 1, background: 'linear-gradient(to right, rgba(74,140,92,0.3), transparent)' }} />
                </div>
                <p style={{ fontSize: '0.82rem', fontStyle: 'italic', color: 'rgba(244,240,230,0.6)', lineHeight: 1.6, maxWidth: 560 }}>
                  {ja
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
                      <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.5rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: isSelected ? triskelionGold : 'rgba(168,200,120,0.7)', marginBottom: '0.4rem' }}>
                        {book.book}
                      </div>
                      <div style={{ fontFamily: "'Cinzel', serif", fontSize: '0.82rem', letterSpacing: '0.08em', color: isSelected ? 'rgba(244,240,230,0.95)' : 'rgba(244,240,230,0.75)', lineHeight: 1.3, marginBottom: '0.6rem' }}>
                        {book.label}
                      </div>
                      <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.48rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: hasArticles ? triskelionAccent : 'rgba(74,140,92,0.4)' }}>
                        {hasArticles
                          ? (ja ? book.slugs.length + '記事' : book.slugs.length + ' articles')
                          : (ja ? '近日公開' : 'Coming soon')}
                      </div>
                    </button>
                  )
                })}
              </div>

              {/* Article list for selected book */}
              {(() => {
                const activeBook = books.find(b => b.key === selectedBook)
                const activeBookArticles = activeBook ? articles.filter(a => activeBook.slugs.includes(a.slug)) : []
                return activeBookArticles.length > 0 ? (
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', paddingBottom: '0.8rem', borderBottom: '1px solid rgba(74,140,92,0.25)' }}>
                      <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.58rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: triskelionGold }}>
                        {activeBook?.label}
                      </span>
                      <div style={{ flex: 1, height: 1, background: 'linear-gradient(to right, rgba(74,140,92,0.3), transparent)' }} />
                      <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.52rem', color: 'rgba(244,240,230,0.25)' }}>
                        {ja ? activeBookArticles.length + '記事' : activeBookArticles.length + ' articles'}
                      </span>
                    </div>
                    {activeBookArticles.map(article => <VaultArticleRow key={article.slug} article={article} ja={ja} dark />)}
                  </div>
                ) : null
              })()}
            </div>
          </section>
        )
      })()}

      <Footer />
    </div>
  )
}

function VaultArticleRow({ article, ja, dark }: { article: Article, ja: boolean, dark?: boolean }) {
  const borderColor = dark ? 'rgba(201,146,42,0.12)' : 'rgba(139,115,85,0.1)'
  const numColor = dark ? 'rgba(201,146,42,0.4)' : 'var(--faint)'
  const titleColor = dark ? 'rgba(244,240,230,0.85)' : 'var(--ink)'
  const blurbColor = dark ? 'rgba(244,240,230,0.65)' : 'var(--sepia)'

  return (
    <Link href={`/vault/${article.slug}`} style={{
      display: 'grid',
      gridTemplateColumns: article.image ? 'clamp(2rem,4vw,3rem) clamp(60px,8vw,80px) 1fr auto' : 'clamp(2rem,4vw,3rem) 1fr auto',
      alignItems: 'center', gap: 'clamp(0.8rem,2vw,1.5rem)',
      padding: '1.5rem 0', borderBottom: `1px solid ${borderColor}`,
    }}>
      <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.6rem', color: numColor }}>
        {article.num}
      </span>
      {article.image && (
        <div style={{ width: '100%', height: 54, overflow: 'hidden', border: `1px solid ${borderColor}` }}>
          <img src={article.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        </div>
      )}
      <div style={{ minWidth: 0 }}>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.2rem', fontWeight: 600, color: titleColor, lineHeight: 1.3, marginBottom: '0.3rem' }}>
          {ja ? article.titleJa : article.title}
        </h2>
        <p style={{ fontSize: '0.88rem', fontStyle: 'italic', color: blurbColor, lineHeight: 1.5 }}>
          {ja ? article.blurbJa : article.blurb}
        </p>
      </div>
      <span style={{
        fontFamily: "'DM Mono', monospace", fontSize: '0.48rem',
        letterSpacing: '0.15em', textTransform: 'uppercase', whiteSpace: 'nowrap',
        color: article.authored === 'human' ? 'var(--rust)' : (dark ? 'rgba(244,240,230,0.25)' : 'var(--faint)'),
        border: `1px solid ${article.authored === 'human' ? 'rgba(158,61,43,0.3)' : (dark ? 'rgba(244,240,230,0.1)' : 'rgba(139,115,85,0.2)')}`,
        padding: '0.2rem 0.5rem',
      }}>
        {article.authored === 'human' ? (ja ? '人間' : 'Human') : 'AI'}
      </span>
    </Link>
  )
}

export default function VaultPage() {
  return (
    <Suspense fallback={<div style={{ background: 'var(--washi)', minHeight: '100vh' }} />}>
      <VaultInner />
    </Suspense>
  )
}