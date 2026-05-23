'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import NavLight from '@/components/NavLight'
import Footer from '@/components/Footer'
import { articles, categories, categoryGroups } from '@/lib/articles'
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
    activeFilter === 'all' || g.key === activeFilter
  )

  function getCatLabel(cat: { key: string; label: string; labelJa?: string }) {
    if (cat.key === 'japan') return 'Fukurou 不苦労'
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

        {visibleGroups.map(group => {
          const groupArticles = articles.filter(a => a.category === group.key)
          if (groupArticles.length === 0) return null
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
              {groupArticles.map(article => (
                <Link key={article.slug} href={`/vault/${article.slug}`} style={{
                  display: 'grid',
                  gridTemplateColumns: article.image ? 'clamp(2rem,4vw,3rem) clamp(60px,8vw,80px) 1fr auto' : 'clamp(2rem,4vw,3rem) 1fr auto',
                  alignItems: 'center', gap: 'clamp(0.8rem,2vw,1.5rem)',
                  padding: '1.5rem 0', borderBottom: '1px solid rgba(139,115,85,0.1)',
                }}>
                  <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.6rem', color: 'var(--faint)' }}>
                    {article.num}
                  </span>
                  {article.image && (
                    <div style={{ width: '100%', height: 54, overflow: 'hidden', border: '1px solid rgba(139,115,85,0.2)' }}>
                      <img src={article.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                    </div>
                  )}
                  <div style={{ minWidth: 0 }}>
                    <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.2rem', fontWeight: 600, color: 'var(--ink)', lineHeight: 1.3, marginBottom: '0.3rem' }}>
                      {ja ? article.titleJa : article.title}
                    </h2>
                    <p style={{ fontSize: '0.88rem', fontStyle: 'italic', color: 'var(--sepia)', lineHeight: 1.5 }}>
                      {ja ? article.blurbJa : article.blurb}
                    </p>
                  </div>
                  <span style={{
                    fontFamily: "'DM Mono', monospace", fontSize: '0.48rem',
                    letterSpacing: '0.15em', textTransform: 'uppercase', whiteSpace: 'nowrap',
                    color: article.authored === 'human' ? 'var(--rust)' : 'var(--faint)',
                    border: `1px solid ${article.authored === 'human' ? 'rgba(158,61,43,0.3)' : 'rgba(139,115,85,0.2)'}`,
                    padding: '0.2rem 0.5rem',
                  }}>
                    {article.authored === 'human' ? (ja ? '人間' : 'Human') : 'AI'}
                  </span>
                </Link>
              ))}
            </div>
          )
        })}
      </main>

      <Footer />
    </div>
  )
}

export default function VaultPage() {
  return (
    <Suspense fallback={<div style={{ background: 'var(--washi)', minHeight: '100vh' }} />}>
      <VaultInner />
    </Suspense>
  )
}