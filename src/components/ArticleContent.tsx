'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'
import type { Article } from '@/lib/articles'

type Props = {
  article: Article
  prev: Article | null
  next: Article | null
  slug: string
}

export default function ArticleContent({ article, prev, next, slug }: Props) {
  const { language } = useLanguage()
  const [Content, setContent] = useState<React.ComponentType | null>(null)

  const title = language === 'ja' ? article.titleJa : article.title
  const blurb = language === 'ja' ? article.blurbJa : article.blurb
  const categoryLabel = language === 'ja' ? article.categoryLabelJa : article.categoryLabel
  const prevTitle = prev ? (language === 'ja' ? prev.titleJa : prev.title) : null
  const nextTitle = next ? (language === 'ja' ? next.titleJa : next.title) : null

  useEffect(() => {
    async function loadContent() {
      // Try Japanese MDX first if language is ja
      if (language === 'ja') {
        try {
          const mod = await import(`@/content/articles/${slug}.ja.mdx`)
          setContent(() => mod.default)
          return
        } catch {
          // Fall through to English
        }
      }
      // Load English MDX
      try {
        const mod = await import(`@/content/articles/${slug}.mdx`)
        setContent(() => mod.default)
      } catch {
        setContent(null)
      }
    }
    loadContent()
  }, [slug, language])

  return (
    <>
      {/* Article Header */}
      <header style={{
        position: 'relative', zIndex: 1,
        maxWidth: 1100, margin: '0 auto',
        padding: article.image ? '2rem 3rem 4rem' : '8rem 3rem 4rem',
        display: 'grid',
        gridTemplateColumns: '1fr 320px',
        gap: '5rem',
        alignItems: 'end',
        borderBottom: '1px solid rgba(139,115,85,0.15)',
      }}>
        <div>
          {/* Breadcrumb */}
          <div style={{
            fontFamily: "'DM Mono', monospace", fontSize: '0.56rem', letterSpacing: '0.22em',
            textTransform: 'uppercase', color: 'var(--faint)',
            display: 'flex', alignItems: 'center', gap: '0.7rem', marginBottom: '2.5rem',
          }}>
            <Link href="/" style={{ color: 'var(--sepia)' }}>Hidden Maps</Link>
            <span>/</span>
            <Link href="/articles" style={{ color: 'var(--sepia)' }}>
              {language === 'ja' ? '記事' : 'Articles'}
            </Link>
            <span>/</span>
            <span>{article.num}</span>
          </div>

          {/* Category */}
          <div style={{
            fontFamily: "'DM Mono', monospace", fontSize: '0.58rem', letterSpacing: '0.28em',
            textTransform: 'uppercase', color: 'var(--rust)', marginBottom: '1.2rem',
          }}>
            {categoryLabel}
          </div>

          {/* Title */}
          <h1 style={{
            fontFamily: language === 'ja' ? "'Noto Serif JP', serif" : "'Cormorant Garamond', serif",
            fontSize: language === 'ja' ? 'clamp(1.6rem, 4vw, 2.8rem)' : 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: language === 'ja' ? 700 : 600,
            lineHeight: 1.15,
            color: 'var(--ink)', marginBottom: '1.8rem',
          }}>
            {title}
          </h1>

          {/* Blurb */}
          <p style={{
            fontFamily: language === 'ja' ? "'Noto Serif JP', serif" : "'Bitter', serif",
            fontSize: language === 'ja' ? '1.05rem' : '1.18rem',
            fontStyle: 'italic', lineHeight: 1.7,
            color: 'var(--deep-sepia)',
          }}>
            {blurb}
          </p>
        </div>

        {/* Sidebar meta */}
        <div style={{ paddingBottom: '0.5rem' }}>
          <div style={{
            fontFamily: "'DM Mono', monospace", fontSize: '0.52rem', letterSpacing: '0.2em',
            textTransform: 'uppercase', color: 'var(--faint)',
            borderTop: '1px solid rgba(139,115,85,0.2)', paddingTop: '1rem', marginBottom: '0.8rem',
          }}>
            {language === 'ja' ? '記録番号' : 'Record No.'}
          </div>
          <div style={{ fontFamily: "'Cinzel', serif", fontSize: '2.5rem', fontWeight: 400, color: 'var(--ink)', opacity: 0.15, lineHeight: 1 }}>
            {article.num}
          </div>
          <div style={{
            marginTop: '2rem',
            fontFamily: "'DM Mono', monospace", fontSize: '0.52rem', letterSpacing: '0.15em',
            color: 'var(--gold)', display: 'flex', alignItems: 'center', gap: '0.5rem',
          }}>
            ◈ {language === 'ja' ? 'AI執筆' : 'AI Authored'}
          </div>
        </div>
      </header>

      {/* Article Body */}
      <article style={{
        position: 'relative', zIndex: 1,
        maxWidth: 760, margin: '0 auto',
        padding: '5rem 3rem 6rem',
      }}>
        <div className="prose" style={{
          fontFamily: language === 'ja' ? "'Noto Serif JP', serif" : "'Bitter', serif",
          fontSize: language === 'ja' ? '1.05rem' : '1.12rem',
          lineHeight: language === 'ja' ? 2.0 : 1.85,
          color: 'var(--ink)',
        }}>
          {Content ? <Content /> : (
            <p style={{ color: 'var(--faint)', fontStyle: 'italic' }}>
              {language === 'ja' ? '読み込み中…' : 'Loading…'}
            </p>
          )}
        </div>
      </article>

      {/* Prev / Next */}
      <nav style={{
        position: 'relative', zIndex: 1,
        maxWidth: 1100, margin: '0 auto',
        padding: '3rem',
        borderTop: '1px solid rgba(139,115,85,0.15)',
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem',
      }}>
        {prev ? (
          <Link href={`/articles/${prev.slug}`} style={{ display: 'block' }}>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.52rem', letterSpacing: '0.2em', color: 'var(--faint)', marginBottom: '0.5rem' }}>
              ← {language === 'ja' ? '前の記事' : 'Previous'}
            </div>
            <div style={{
              fontFamily: language === 'ja' ? "'Noto Serif JP', serif" : "'Cormorant Garamond', serif",
              fontSize: language === 'ja' ? '0.95rem' : '1.1rem',
              color: 'var(--sepia)', lineHeight: 1.3,
            }}>
              {prevTitle}
            </div>
          </Link>
        ) : <div />}

        {next ? (
          <Link href={`/articles/${next.slug}`} style={{ display: 'block', textAlign: 'right' }}>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.52rem', letterSpacing: '0.2em', color: 'var(--faint)', marginBottom: '0.5rem' }}>
              {language === 'ja' ? '次の記事' : 'Next'} →
            </div>
            <div style={{
              fontFamily: language === 'ja' ? "'Noto Serif JP', serif" : "'Cormorant Garamond', serif",
              fontSize: language === 'ja' ? '0.95rem' : '1.1rem',
              color: 'var(--sepia)', lineHeight: 1.3,
            }}>
              {nextTitle}
            </div>
          </Link>
        ) : <div />}
      </nav>
    </>
  )
}