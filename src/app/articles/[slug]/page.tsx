import { notFound } from 'next/navigation'
import { articles } from '@/lib/articles'
import NavLight from '@/components/NavLight'
import Footer from '@/components/Footer'
import ProgressBar from '@/components/ProgressBar'
import ArticleContent from '@/components/ArticleContent'

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

    const index = articles.findIndex(a => a.slug === slug)
    const prev = index > 0 ? articles[index - 1] : null
    const next = index < articles.length - 1 ? articles[index + 1] : null

    return (
        <div style={{ background: 'var(--parchment)', minHeight: '100vh' }}>
            <div style={{
                position: 'fixed', inset: 0, zIndex: 0, opacity: 0.25, pointerEvents: 'none',
                backgroundImage: `
          repeating-linear-gradient(91deg, transparent, transparent 2px, rgba(139,115,85,0.04) 2px, rgba(139,115,85,0.04) 3px),
          repeating-linear-gradient(179deg, transparent, transparent 5px, rgba(139,115,85,0.025) 5px, rgba(139,115,85,0.025) 6px)
        `,
            }} />

            <ProgressBar />
            <NavLight />

            {article.image && (
                <div style={{ position: 'relative', zIndex: 1, width: '100%', height: '420px', overflow: 'hidden', marginTop: '52px' }}>
                    <img
                        src={article.image}
                        alt={article.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }}
                    />
                    <div style={{
                        position: 'absolute', bottom: 0, left: 0, right: 0, height: '160px',
                        background: 'linear-gradient(to bottom, transparent, var(--parchment))',
                    }} />
                </div>
            )}

            <ArticleContent
                article={article}
                prev={prev}
                next={next}
                slug={slug}
            />

            <Footer />
        </div>
    )
}