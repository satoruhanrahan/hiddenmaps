'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import LanguageToggle from './LanguageToggle'
import { useLanguage } from '@/contexts/LanguageContext'

export default function NavLight() {
    const pathname = usePathname()
    const { t } = useLanguage()

    return (
        <nav style={{
            position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '1.4rem 3rem',
            background: 'linear-gradient(to bottom, var(--washi) 60%, transparent)',
        }}>
            <Link href="/" style={{ fontFamily: "'Cinzel', serif", fontSize: '0.9rem', fontWeight: 600, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--ink)', opacity: 0.7, transition: 'opacity 0.2s' }}>
                Hidden Maps
            </Link>

            <div style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }}>
                <ul style={{ display: 'flex', gap: '2.5rem', listStyle: 'none' }}>
                    {[
                        { label: t.nav.articles, href: '/articles' },
                        { label: t.nav.projects, href: '/#projects' },
                        { label: t.nav.about, href: '/#about' },
                    ].map(({ label, href }) => (
                        <li key={href}>
                            <Link href={href} style={{
                                fontFamily: "'DM Mono', monospace", fontSize: '0.62rem', letterSpacing: '0.18em', textTransform: 'uppercase',
                                color: pathname === href ? 'var(--ink)' : 'var(--sepia)', transition: 'color 0.2s',
                                borderBottom: pathname === href ? '1px solid var(--rust)' : 'none', paddingBottom: '0.1rem',
                            }}>
                                {label}
                            </Link>
                        </li>
                    ))}
                </ul>
                <LanguageToggle />
            </div>
        </nav>
    )
}