import Link from 'next/link'

const articles = [
    { num: '001', category: 'Culture & Society', title: 'Floodplain vs Fractured-Sea Cultures: Why Geography Is Destiny', excerpt: 'Why do whole civilisations think so differently? The answer may lie not in religion or economics — but in the shape of the land itself.', featured: true, slug: 'floodplain-vs-fractured-sea' },
    { num: '009', category: 'Spirituality', title: 'Gnosticism and the Demiurge: The Hidden Creation Story', slug: 'gnosticism-and-the-demiurge' },
    { num: '015', category: 'Original Theory', title: 'Yin-Yang as a Fractal Map of the World', slug: 'yin-yang-fractal-map' },
    { num: '020', category: 'History & Myth', title: 'Queen Himiko and the Mystery of Yamatai', slug: 'queen-himiko-yamatai' },
    { num: '025', category: 'Science & Mind', title: 'The Simulation Hypothesis: How Seriously Should We Take It?', slug: 'simulation-hypothesis' },
]

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
    const featured = articles.find(a => a.featured)
    const rest = articles.filter(a => !a.featured)

    return (
        <section id="articles" style={{ position: 'relative', background: 'var(--washi)' }}>
            {/* Washi texture */}
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

                {/* Header */}
                <div className="reveal" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '3.5rem' }}>
                    <div>
                        <div style={{
                            fontFamily: "'DM Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.32em',
                            textTransform: 'uppercase', color: 'var(--rust)', display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '0.8rem',
                        }}>
                            Ideas & Essays
                            <span style={{ width: 50, height: 1, background: 'var(--rust)', display: 'block' }} />
                        </div>
                        <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: '2.3rem', fontWeight: 400, letterSpacing: '0.04em' }}>
                            The Hidden Layer
                        </h2>
                    </div>
                    <Link href="/articles" style={{
                        fontFamily: "'DM Mono', monospace", fontSize: '0.62rem', letterSpacing: '0.2em',
                        textTransform: 'uppercase', color: 'var(--sepia)', borderBottom: '1px solid var(--faint)', paddingBottom: '0.2rem',
                    }}>
                        All 25 Articles →
                    </Link>
                </div>

                {/* Grid */}
                <div className="reveal reveal-delay-1" style={{
                    display: 'grid',
                    gridTemplateColumns: '1.5fr 1fr 1fr',
                    gridTemplateRows: 'auto auto',
                    border: '1px solid rgba(139,115,85,0.25)',
                }}>
                    {/* Featured */}
                    {featured && (
                        <Link href={`/articles/${featured.slug}`} style={{
                            gridRow: 'span 2',
                            padding: '3rem',
                            borderRight: '1px solid rgba(139,115,85,0.3)',
                            background: 'rgba(255,255,255,0.3)',
                            display: 'block',
                            transition: 'background 0.3s',
                            position: 'relative',
                        }}>
                            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.52rem', letterSpacing: '0.2em', color: 'var(--faint)', marginBottom: '0.6rem' }}>
                                Specimen No. {featured.num}
                            </div>
                            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.56rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--rust)', marginBottom: '0.9rem' }}>
                                {featured.category}
                            </div>
                            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.85rem', fontWeight: 600, lineHeight: 1.2, marginBottom: '1.2rem' }}>
                                {featured.title}
                            </h3>
                            <p style={{ fontSize: '0.98rem', color: 'var(--sepia)', fontStyle: 'italic', lineHeight: 1.75 }}>
                                {featured.excerpt}
                            </p>
                        </Link>
                    )}

                    {/* Rest */}
                    {rest.map((article, i) => (
                        <Link key={article.slug} href={`/articles/${article.slug}`} style={{
                            padding: '2.2rem 2.5rem',
                            border: '1px solid rgba(139,115,85,0.15)',
                            background: 'rgba(255,255,255,0.3)',
                            display: 'block',
                            transition: 'background 0.3s',
                            borderBottom: i < 2 ? '1px solid rgba(139,115,85,0.2)' : undefined,
                        }}>
                            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.52rem', letterSpacing: '0.2em', color: 'var(--faint)', marginBottom: '0.6rem' }}>
                                Specimen No. {article.num}
                            </div>
                            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.56rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--rust)', marginBottom: '0.9rem' }}>
                                {article.category}
                            </div>
                            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.12rem', fontWeight: 600, lineHeight: 1.3 }}>
                                {article.title}
                            </h3>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}