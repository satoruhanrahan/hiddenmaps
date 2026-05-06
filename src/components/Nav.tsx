'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import LanguageToggle from './LanguageToggle'
import { useLanguage } from '@/contexts/LanguageContext'

export default function Nav() {
    const [scrolled, setScrolled] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)
    const { t } = useLanguage()

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 80)
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    // Close menu on resize to desktop
    useEffect(() => {
        const handleResize = () => { if (window.innerWidth > 768) setMenuOpen(false) }
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    const links = [
        { label: t.nav.articles, href: '/#articles' },
        { label: t.nav.projects, href: '/#projects' },
        { label: t.nav.about, href: '/#about' },
    ]

    return (
        <>
            <nav style={{
                position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '1.2rem 1.5rem',
                transition: 'background 0.4s',
                background: scrolled || menuOpen ? 'rgba(10,9,7,0.97)' : 'transparent',
                backdropFilter: scrolled ? 'blur(12px)' : 'none',
                borderBottom: scrolled ? '1px solid rgba(201,146,42,0.12)' : 'none',
            }}>
                <Link href="/" style={{
                    fontFamily: "'Cinzel', serif", fontSize: '0.9rem', fontWeight: 600,
                    letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--parchment)',
                }}>
                    Hidden Maps
                </Link>

                {/* Desktop nav */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }}
                    className="desktop-nav">
                    <ul style={{ display: 'flex', gap: '2.5rem', listStyle: 'none' }}>
                        {links.map(({ label, href }) => (
                            <li key={href}>
                                <Link href={href} style={{
                                    fontFamily: "'DM Mono', monospace", fontSize: '0.62rem',
                                    letterSpacing: '0.18em', textTransform: 'uppercase',
                                    color: 'rgba(244,240,230,0.5)', transition: 'color 0.2s',
                                }}>
                                    {label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <LanguageToggle dark />
                </div>

                {/* Mobile right side */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}
                    className="mobile-nav-right">
                    {/* Hamburger */}
                    <button
                        onClick={() => setMenuOpen(o => !o)}
                        aria-label="Toggle menu"
                        style={{
                            background: 'none', border: 'none', cursor: 'pointer',
                            display: 'flex', flexDirection: 'column', gap: '5px',
                            padding: '4px',
                        }}
                    >
                        {[0, 1, 2].map(i => (
                            <span key={i} style={{
                                display: 'block', width: 22, height: 1.5,
                                background: 'rgba(244,240,230,0.7)',
                                borderRadius: 1,
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

            {/* Mobile overlay */}
            {menuOpen && (
                <div
                    className="mobile-menu-overlay open"
                    onClick={() => setMenuOpen(false)}
                />
            )}

            {/* Mobile slide-in menu */}
            <div style={{
                position: 'fixed', top: 0, right: 0, bottom: 0, zIndex: 195,
                width: 'min(300px, 80vw)',
                background: 'rgba(10,9,7,0.98)',
                borderLeft: '1px solid rgba(201,146,42,0.15)',
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
                            color: 'rgba(244,240,230,0.7)',
                            padding: '1rem 0',
                            borderBottom: '1px solid rgba(201,146,42,0.1)',
                            display: 'block',
                            transition: 'color 0.2s',
                        }}
                    >
                        {label}
                    </Link>
                ))}
                <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(201,146,42,0.1)' }}>
                    <LanguageToggle dark />
                </div>
            </div>

            <style>{`
        .desktop-nav { display: flex; }
        .mobile-nav-right { display: none; }
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-nav-right { display: flex !important; }
        }
      `}</style>
        </>
    )
}