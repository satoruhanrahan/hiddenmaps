import { notFound } from 'next/navigation'
import Link from 'next/link'
import { articles } from '@/lib/articles'
import NavLight from '@/components/NavLight'
import Footer from '@/components/Footer'
import ProgressBar from '@/components/ProgressBar'

type Props = {
    params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
    return articles.map(article => ({ slug: article.slug }))
}

export async function generateMetadata({ params }: Props) {
    const { slug } = await params
    const article = articles.find(a => a.slug === slug)
    if (!article) return {}
    return {
        title: `${article.title} — Hidden Maps`,
        description: article.blurb,
    }
}

export default async function ArticlePage({ params }: Props) {
    const { slug } = await params
    const article = articles.find(a => a.slug === slug)
    if (!article) notFound()

    // Dynamically import the MDX file
    let Content: React.ComponentType
    try {
        const mod = await import(`@/content/articles/${slug}.mdx`)
        Content = mod.default
    } catch {
        notFound()
    }

    // Find prev/next articles
    const index = articles.findIndex(a => a.slug === slug)
    const prev = index > 0 ? articles[index - 1] : null
    const next = index < articles.length - 1 ? articles[index + 1] : null

    return (
        <div style={{ background: 'var(--parchment)', minHeight: '100vh' }}>
            {/* Washi texture */}
            <div style={{
                position: 'fixed', inset: 0, zIndex: 0, opacity: 0.25, pointerEvents: 'none',
                backgroundImage: `
          repeating-linear-gradient(91deg, transparent, transparent 2px, rgba(139,115,85,0.04) 2px, rgba(139,115,85,0.04) 3px),
          repeating-linear-gradient(179deg, transparent, transparent 5px, rgba(139,115,85,0.025) 5px, rgba(139,115,85,0.025) 6px)
        `,
            }} />

            {/* Progress bar */}
            <ProgressBar />

            <NavLight />

            {/* Article Header */}
            <header style={{
                position: 'relative', zIndex: 1,
                maxWidth: 1100, margin: '0 auto',
                padding: '8rem 3rem 4rem',
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
                        textTransform: 'uppercase', color: 'var(--faint)', marginBottom: '2rem',
                        display: 'flex', alignItems: 'center', gap: '0.7rem',
                    }}>
                        <Link href="/" style={{ color: 'var(--sepia)' }}>Hidden Maps</Link>
                        <span>/</span>
                        <Link href="/articles" style={{ color: 'var(--sepia)' }}>Articles</Link>
                        <span>/</span>
                        <span>{article.categoryLabel}</span>
                    </div>

                    {/* Category */}
                    <div style={{
                        fontFamily: "'DM Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.28em',
                        textTransform: 'uppercase', color: 'var(--rust)', marginBottom: '1.5rem',
                        display: 'flex', alignItems: 'center', gap: '0.8rem',
                    }}>
                        <span style={{ width: 28, height: 1, background: 'var(--rust)', display: 'block', flexShrink: 0 }} />
                        {article.categoryLabel}
                    </div>

                    <h1 style={{
                        fontFamily: "'Cinzel', serif",
                        fontSize: 'clamp(2rem, 4.5vw, 3.6rem)',
                        fontWeight: 400, lineHeight: 1.1,
                        color: 'var(--ink)', letterSpacing: '0.01em',
                        marginBottom: '1.5rem',
                    }}>
                        {article.title}
                    </h1>

                    <p style={{
                        fontSize: '1rem',
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        fontWeight: 300, color: 'var(--sepia)',
                        lineHeight: 1.7, maxWidth: 520,
                    }}>
                        {article.blurb}
                    </p>
                </div>

                {/* Atlas specimen card */}
                <div style={{
                    border: '1px solid rgba(139,115,85,0.25)',
                    borderTop: '3px solid var(--deep-sepia)',
                    padding: '1.8rem',
                    background: 'rgba(255,255,255,0.35)',
                    position: 'relative',
                }}>
                    <div style={{
                        position: 'absolute', top: '-0.85rem', left: '1.2rem',
                        fontFamily: "'DM Mono', monospace", fontSize: '0.52rem',
                        letterSpacing: '0.25em', textTransform: 'uppercase',
                        color: 'var(--parchment)', background: 'var(--deep-sepia)',
                        padding: '0.2rem 0.7rem',
                    }}>Specimen</div>

                    {[
                        { label: 'Category', value: article.categoryLabel },
                        { label: 'Article', value: `No. ${article.num} of ${articles.length}` },
                        { label: 'Authorship', value: 'AI-Written · Human-Curated' },
                    ].map(({ label, value }) => (
                        <div key={label} style={{ marginBottom: '1.1rem', paddingBottom: '1.1rem', borderBottom: '1px solid rgba(139,115,85,0.12)' }}>
                            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.52rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--faint)', marginBottom: '0.3rem' }}>
                                {label}
                            </div>
                            <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '0.82rem', color: 'var(--deep-sepia)', fontWeight: 300 }}>
                                {value}
                            </div>
                        </div>
                    ))}

                    <span style={{
                        fontFamily: "'Cinzel', serif", fontSize: '2.5rem', fontWeight: 400,
                        color: 'var(--ink)', opacity: 0.07,
                        position: 'absolute', bottom: '1rem', right: '1.5rem', lineHeight: 1,
                    }}>
                        {article.num}
                    </span>
                </div>
            </header>

            {/* Article Body */}
            <div style={{
                position: 'relative', zIndex: 1,
                maxWidth: 1100, margin: '0 auto',
                padding: '5rem 3rem',
                display: 'grid',
                gridTemplateColumns: '1fr 320px',
                gap: '5rem',
                alignItems: 'start',
            }}>
                {/* Prose */}
                <article style={{ maxWidth: 680 }}>
                    <Content />

                    {/* End ornament */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginTop: '3.5rem', paddingTop: '2rem', borderTop: '1px solid rgba(139,115,85,0.15)' }}>
                        <div style={{ flex: 1, height: 1, background: 'linear-gradient(to right, rgba(139,115,85,0.3), transparent)' }} />
                        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.55rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--faint)', whiteSpace: 'nowrap' }}>
                            End of Article · No. {article.num}
                        </span>
                        <div style={{ flex: 1, height: 1, background: 'linear-gradient(to left, rgba(139,115,85,0.3), transparent)' }} />
                    </div>
                </article>

                {/* Sidebar */}
                <aside style={{ position: 'sticky', top: '6rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    {/* AI badge */}
                    <div style={{
                        display: 'flex', alignItems: 'flex-start', gap: '0.8rem',
                        padding: '1.2rem', background: 'rgba(201,146,42,0.05)',
                        border: '1px solid rgba(201,146,42,0.15)',
                    }}>
                        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.6rem', color: 'var(--gold)', flexShrink: 0 }}>◈</span>
                        <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '0.8rem', fontWeight: 300, color: 'var(--sepia)', lineHeight: 1.6 }}>
                            This article was written with Claude and curated for ideas that genuinely open something up.
                        </span>
                    </div>

                    {/* Related articles */}
                    <div style={{ border: '1px solid rgba(139,115,85,0.18)', padding: '1.5rem', background: 'rgba(255,255,255,0.3)' }}>
                        <div style={{
                            fontFamily: "'DM Mono', monospace", fontSize: '0.52rem', letterSpacing: '0.28em',
                            textTransform: 'uppercase', color: 'var(--faint)',
                            marginBottom: '1.2rem', paddingBottom: '0.8rem',
                            borderBottom: '1px solid rgba(139,115,85,0.12)',
                        }}>
                            More Articles
                        </div>
                        {articles
                            .filter(a => a.slug !== slug && a.category === article.category)
                            .slice(0, 4)
                            .map(related => (
                                <Link key={related.slug} href={`/articles/${related.slug}`} style={{
                                    display: 'block', padding: '0.9rem 0',
                                    borderBottom: '1px solid rgba(139,115,85,0.1)',
                                }}>
                                    <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.5rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--rust)', marginBottom: '0.3rem' }}>
                                        {related.categoryLabel}
                                    </div>
                                    <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '0.85rem', fontWeight: 500, color: 'var(--ink)', lineHeight: 1.4 }}>
                                        {related.title}
                                    </div>
                                </Link>
                            ))}
                    </div>
                </aside>
            </div>

            {/* Prev / Next */}
            <div style={{ borderTop: '1px solid rgba(139,115,85,0.2)', background: 'var(--aged)', position: 'relative', zIndex: 1 }}>
                <div style={{ maxWidth: 1100, margin: '0 auto', padding: '3rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', position: 'relative' }}>
                    <div style={{ position: 'absolute', left: '50%', top: '3rem', bottom: '3rem', width: 1, background: 'rgba(139,115,85,0.2)' }} />
                    <div>
                        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.55rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--faint)', marginBottom: '0.8rem' }}>← Previous</div>
                        {prev
                            ? <Link href={`/articles/${prev.slug}`} style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.3rem', fontWeight: 600, color: 'var(--ink)', lineHeight: 1.3, display: 'block' }}>{prev.title}</Link>
                            : <span style={{ fontSize: '1rem', color: 'var(--faint)', fontStyle: 'italic' }}>No previous article</span>
                        }
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.55rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--faint)', marginBottom: '0.8rem' }}>Next Article →</div>
                        {next
                            ? <Link href={`/articles/${next.slug}`} style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.3rem', fontWeight: 600, color: 'var(--ink)', lineHeight: 1.3, display: 'block' }}>{next.title}</Link>
                            : <span style={{ fontSize: '1rem', color: 'var(--faint)', fontStyle: 'italic' }}>No next article</span>
                        }
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}