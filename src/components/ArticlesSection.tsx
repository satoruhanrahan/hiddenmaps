'use client'

import Link from 'next/link'
import { humanArticles as allArticles } from '@/lib/articles'
import { useLanguage } from '@/contexts/LanguageContext'

const featuredSlugs = [
  'why-people-think-so-different-1',
  'is-christianity-true',
  'why-free-people-make-others-uncomfortable',
  'did-ancient-china-send-colonists-to-japan',
  'reading-the-air',
]

const featuredArticles = featuredSlugs
  .map(slug => allArticles.find(a => a.slug === slug))
  .filter(Boolean) as typeof allArticles

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

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 1200, margin: '0 auto', padding: 'clamp(3rem, 8vw, 6rem) clamp(1.25rem, 5vw, 3rem)' }}>

        {/* Header */}
        <div className="reveal" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 'clamp(2rem, 5vw, 3.5rem)', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.32em', textTransform: 'uppercase', color: 'var(--rust)', display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '0.8rem' }}>
              {ja ? 'アイデアとエッセイ' : 'Ideas & Essays'}
              <span style={{ width: 50, height: 1, background: 'var(--rust)', display: 'block' }} />
            </div>
            <h2 style={{ fontFamily: ja ? "'Noto Serif JP', serif" : "'Cinzel', serif", fontSize: 'clamp(1.6rem, 5vw, 2.3rem)', fontWeight: ja ? 700 : 400, letterSpacing: '0.04em' }}>
              {ja ? '隠れた層' : 'The Hidden Layers'}
            </h2>
          </div>
          <Link href="/articles" style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.62rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--sepia)', borderBottom: '1px solid var(--faint)', paddingBottom: '0.2rem', whiteSpace: 'nowrap' }}>
            {ja ? `全${allArticles.length}記事 →` : `All ${allArticles.length} Articles →`}
          </Link>
        </div>

        {/* Grid — original 3-column layout, stacks on mobile */}
        <div className="reveal reveal-delay-1 articles-grid" style={{ border: '1px solid rgba(139,115,85,0.25)' }}>

          {/* Featured — spans 2 rows */}
          {featured && (
            <Link href={`/articles/${featured.slug}`} className="featured-card" style={{
              background: 'rgba(255,255,255,0.3)',
              display: 'flex', flexDirection: 'column',
              overflow: 'hidden',
            }}>
              {featured.image && (
                <div style={{ width: '100%', height: 'clamp(160px, 25vw, 220px)', overflow: 'hidden', flexShrink: 0 }}>
                  <img src={featured.image} alt={ja ? featured.titleJa : featured.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }} />
                </div>
              )}
              <div style={{ padding: 'clamp(1.5rem, 4vw, 3rem)', flex: 1 }}>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.52rem', letterSpacing: '0.2em', color: 'var(--faint)', marginBottom: '0.6rem' }}>
                  {ja ? '記録番号' : 'Record No.'} {featured.num}
                </div>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.56rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--rust)', marginBottom: '0.9rem' }}>
                  {ja ? featured.categoryLabelJa : featured.categoryLabel}
                </div>
                <h3 style={{ fontFamily: ja ? "'Noto Serif JP', serif" : "'Cormorant Garamond', serif", fontSize: ja ? 'clamp(1.1rem, 3vw, 1.4rem)' : 'clamp(1.3rem, 4vw, 1.85rem)', fontWeight: 600, lineHeight: 1.2, marginBottom: '1rem' }}>
                  {ja ? featured.titleJa : featured.title}
                </h3>
                <p style={{ fontSize: 'clamp(0.88rem, 2vw, 0.98rem)', color: 'var(--sepia)', fontStyle: 'italic', lineHeight: 1.75, fontFamily: ja ? "'Noto Serif JP', serif" : 'inherit' }}>
                  {ja ? featured.blurbJa : featured.blurb}
                </p>
              </div>
            </Link>
          )}

          {/* 4 secondary cards — placed directly in grid */}
          {rest.map((article, i) => (
            <Link key={article.slug} href={`/articles/${article.slug}`} style={{
              padding: 'clamp(1.2rem, 3vw, 2.2rem) clamp(1.2rem, 3vw, 2.5rem)',
              border: '1px solid rgba(139,115,85,0.15)',
              background: 'rgba(255,255,255,0.3)',
              display: 'block',
              overflow: 'hidden',
              borderBottom: i < 2 ? '1px solid rgba(139,115,85,0.2)' : undefined,
            }}>
              {article.image && (
                <div style={{ width: '100%', height: 120, overflow: 'hidden', marginBottom: '1rem' }}>
                  <img src={article.image} alt={ja ? article.titleJa : article.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                </div>
              )}
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.52rem', letterSpacing: '0.2em', color: 'var(--faint)', marginBottom: '0.4rem' }}>
                {ja ? '記録番号' : 'Record No.'} {article.num}
              </div>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.56rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--rust)', marginBottom: '0.5rem' }}>
                {ja ? article.categoryLabelJa : article.categoryLabel}
              </div>
              <h3 style={{ fontFamily: ja ? "'Noto Serif JP', serif" : "'Cormorant Garamond', serif", fontSize: ja ? '0.95rem' : 'clamp(0.95rem, 2vw, 1.12rem)', fontWeight: 600, lineHeight: 1.3 }}>
                {ja ? article.titleJa : article.title}
              </h3>
            </Link>
          ))}
        </div>
      </div>

      <style>{`
        .articles-grid {
          display: grid;
          grid-template-columns: 1.5fr 1fr 1fr;
          grid-template-rows: auto auto;
        }
        .featured-card {
          grid-row: span 2;
          border-right: 1px solid rgba(139,115,85,0.3);
        }
        @media (max-width: 768px) {
          .articles-grid {
            grid-template-columns: 1fr;
          }
          .featured-card {
            grid-row: span 1;
            border-right: none;
            border-bottom: 1px solid rgba(139,115,85,0.3);
          }
        }
      `}</style>
    </section>
  )
}