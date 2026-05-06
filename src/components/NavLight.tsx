'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import LanguageToggle from './LanguageToggle'
import { useLanguage } from '@/contexts/LanguageContext'

export default function NavLight() {
    const pathname = usePathname()
    const { t } = useLanguage()
    const [menuOpen, setMenuOpen] = useState(false)

    useEffect(() => {
        const handleResize = () => { if (window.innerWidth > 768) setMenuOpen(false) }
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    const links = [
        { label: t.nav.articles, href: '/articles' },
        { label: t.nav.projects, href: '/#projects' },
        { label: t.nav.about, href: '/#about' },
    ]

    return (
        <>
            <nav style={{
                position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '1.2rem 1.5rem',
                background: menuOpen ? 'var(--washi)' : 'linear-gradient(to bottom, var(--washi) 60%, transparent)',
            }}>
                <Link href="/" style={{
                    fontFamily: "'Cinzel', serif", fontSize: '0.85rem', fontWeight: 600,
                    letterSpacing: '0.25em', textTransform: 'uppercase',
                    color: 'var(--ink)', opacity: 0.7,
                }}>
                    Hidden Maps
                </Link>

                {/* Desktop */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }}
                    className="desktop-nav-light">
                    <ul style={{ display: 'flex', gap: '2.5rem', listStyle: 'none' }}>
                        {links.map(({ label, href }) => (
                            <li key={href}>
                                <Link href={href} style={{
                                    fontFamily: "'DM Mono', monospace", fontSize: '0.62rem',
                                    letterSpacing: '0.18em', textTransform: 'uppercase',
                                    color: pathname === href ? 'var(--ink)' : 'var(--sepia)',
                                    borderBottom: pathname === href ? '1px solid var(--rust)' : 'none',
                                    paddingBottom: '0.1rem',
                                }}>
                                    {label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <LanguageToggle />
                </div>

                {/* Mobile right */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}
                    className="mobile-nav-right-light">
                    <button
                        onClick={() => setMenuOpen(o => !o)}
                        aria-label="Toggle menu"
                        style={{
                            background: 'none', border: 'none', cursor: 'pointer',
                            display: 'flex', flexDirection: 'column', gap: '5px', padding: '4px',
                        }}
                    >
                        {[0, 1, 2].map(i => (
                            <span key={i} style={{
                                display: 'block', width: 22, height: 1.5,
                                background: 'rgba(10,9,7,0.6)', borderRadius: 1,
                                transition: 'transform 0.25s, opacity 0.25s',
                                transform: menuOpen
                                    ? i === 0 ? 'translateY(6.5px) rotate(45deg)'
                                        : i === 2 ? 'translateY(-6.5px) rotate(-45deg)'
                                            : 'scaleX(0)'
                                    : 'none',
                                opacity: menuOpen && i === 1 ? 0 : 1,
                            }} />
                        ))}
                    </button>
                </div>
            </nav>

            {menuOpen && (
                <div className="mobile-menu-overlay open" onClick={() => setMenuOpen(false)} />
            )}

            <div style={{
                position: 'fixed', top: 0, right: 0, bottom: 0, zIndex: 195,
                width: 'min(300px, 80vw)',
                background: 'var(--washi)',
                borderLeft: '1px solid rgba(139,115,85,0.2)',
                transform: menuOpen ? 'translateX(0)' : 'translateX(100%)',
                transition: 'transform 0.35s cubic-bezier(0.16,1,0.3,1)',
                display: 'flex', flexDirection: 'column',
                padding: '5rem 2rem 2rem',
                gap: '0.5rem',
            }}>
                {links.map(({ label, href }) => (
                    <Link
                        key={href}
                        href={href}
                        onClick={() => setMenuOpen(false)}
                        style={{
                            fontFamily: "'Cinzel', serif", fontSize: '1rem',
                            letterSpacing: '0.15em', textTransform: 'uppercase',
                            color: pathname === href ? 'var(--ink)' : 'var(--sepia)',
                            padding: '1rem 0',
                            borderBottom: '1px solid rgba(139,115,85,0.15)',
                            display: 'block',
                        }}
                    >
                        {label}
                    </Link>
                ))}
                <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(139,115,85,0.15)' }}>
                    <LanguageToggle />
                </div>
            </div>

            <style>{`
        .desktop-nav-light { display: flex; }
        .mobile-nav-right-light { display: none; }
        @media (max-width: 768px) {
          .desktop-nav-light { display: none !important; }
          .mobile-nav-right-light { display: flex !important; }
        }
      `}</style>
        </>
    )
}