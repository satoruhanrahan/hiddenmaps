'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'
import LanguageToggle from './LanguageToggle'
import { useLanguage } from '@/contexts/LanguageContext'

export default function NavLight() {
    const pathname = usePathname()
    const { language } = useLanguage()
    const ja = language === 'ja'
    const [menuOpen, setMenuOpen] = useState(false)
    const [layerOpen, setLayerOpen] = useState(false)
    const layerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleResize = () => { if (window.innerWidth > 768) setMenuOpen(false) }
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (layerRef.current && !layerRef.current.contains(e.target as Node)) setLayerOpen(false)
        }
        document.addEventListener('mousedown', handleClick)
        return () => document.removeEventListener('mousedown', handleClick)
    }, [])

    const layerLinks = [
        { label: ja ? 'Fukurou 不苦労' : 'Fukurou 不苦労', href: '/articles?filter=japan' },
        { label: ja ? '歴史' : 'History', href: '/articles?filter=history' },
        { label: ja ? '文化・社会' : 'Culture & Society', href: '/articles?filter=culture' },
        { label: ja ? '精神・宗教' : 'Spirituality & Religion', href: '/articles?filter=spirituality' },
        { label: ja ? '独自理論' : 'Original Theory', href: '/articles?filter=theory' },
        { label: ja ? '科学・思想' : 'Science & Mind', href: '/articles?filter=science' },
        { label: 'Triskelion', href: '/articles?filter=triskelion' },
        { label: ja ? 'すべての記事' : 'All Articles', href: '/articles?filter=all' },
    ]

    return (
        <>
            <nav style={{
                position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '0.9rem 1.5rem',
                background: menuOpen ? 'var(--washi)' : 'linear-gradient(to bottom, var(--washi) 60%, transparent)',
            }}>
                <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', textDecoration: 'none' }}>
                    <img
                        src="/images/owl-logo-dark.png"
                        alt="The Hidden Owl"
                        style={{
                            width: 24, height: 32, objectFit: 'contain', display: 'block', flexShrink: 0,
                            filter: 'invert(1) sepia(0.3) brightness(0.25)',
                        }}
                    />
                    <div>
                        <div style={{ fontFamily: "'Cinzel', serif", fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--ink)', opacity: 0.8, lineHeight: 1.1 }}>
                            The Hidden Owl
                        </div>
                        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.45rem', letterSpacing: '0.22em', color: 'var(--rust)', textTransform: 'uppercase', lineHeight: 1 }}>
                            {ja ? '隠れたものを観る' : 'Observing the hidden'}
                        </div>
                    </div>
                </Link>

                {/* Desktop */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }} className="desktop-nav-light">

                    <div ref={layerRef} style={{ position: 'relative' }}>
                        <button onClick={() => setLayerOpen(o => !o)} style={{
                            background: 'none', border: 'none', cursor: 'pointer',
                            fontFamily: "'DM Mono', monospace", fontSize: '0.62rem', letterSpacing: '0.18em',
                            textTransform: 'uppercase', color: 'var(--sepia)',
                            display: 'flex', alignItems: 'center', gap: '0.4rem', padding: 0,
                        }}>
                            {ja ? '隠れた層' : 'The Hidden Layers'}
                            <span style={{ fontSize: '0.5rem', transform: layerOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>▾</span>
                        </button>
                        {layerOpen && (
                            <div style={{
                                position: 'absolute', top: 'calc(100% + 1rem)', left: '50%', transform: 'translateX(-50%)',
                                background: 'var(--washi)', border: '1px solid rgba(139,115,85,0.2)',
                                boxShadow: '0 8px 24px rgba(10,9,7,0.08)', minWidth: 220, zIndex: 300, padding: '0.5rem 0',
                            }}>
                                {layerLinks.map(({ label, href }) => (
                                    <Link key={label} href={href} onClick={() => setLayerOpen(false)} style={{
                                        display: 'block', padding: '0.65rem 1.3rem',
                                        fontFamily: "'DM Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.15em',
                                        textTransform: 'uppercase', color: 'var(--sepia)',
                                        borderBottom: '1px solid rgba(139,115,85,0.1)',
                                    }}>
                                        {label}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>

                    <Link href="/#projects" style={{
                        fontFamily: "'DM Mono', monospace", fontSize: '0.62rem', letterSpacing: '0.18em',
                        textTransform: 'uppercase', color: 'var(--sepia)',
                    }}>
                        {ja ? 'ヒドゥンマップス' : 'Hidden Maps'}
                    </Link>

                    <Link href="/#about" style={{
                        fontFamily: "'DM Mono', monospace", fontSize: '0.62rem', letterSpacing: '0.18em',
                        textTransform: 'uppercase', color: 'var(--sepia)',
                    }}>
                        {ja ? '概要' : 'About'}
                    </Link>

                    <LanguageToggle />
                </div>

                {/* Mobile */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }} className="mobile-nav-right-light">
                    <button onClick={() => setMenuOpen(o => !o)} aria-label="Toggle menu"
                        style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '5px', padding: '4px' }}>
                        {[0, 1, 2].map(i => (
                            <span key={i} style={{
                                display: 'block', width: 22, height: 1.5, background: 'rgba(10,9,7,0.6)', borderRadius: 1,
                                transition: 'transform 0.25s, opacity 0.25s',
                                transform: menuOpen ? i === 0 ? 'translateY(6.5px) rotate(45deg)' : i === 2 ? 'translateY(-6.5px) rotate(-45deg)' : 'scaleX(0)' : 'none',
                                opacity: menuOpen && i === 1 ? 0 : 1,
                            }} />
                        ))}
                    </button>
                </div>
            </nav>

            {menuOpen && <div className="mobile-menu-overlay open" onClick={() => setMenuOpen(false)} />}

            <div style={{
                position: 'fixed', top: 0, right: 0, bottom: 0, zIndex: 195,
                width: 'min(300px, 80vw)', background: 'var(--washi)',
                borderLeft: '1px solid rgba(139,115,85,0.2)',
                transform: menuOpen ? 'translateX(0)' : 'translateX(100%)',
                transition: 'transform 0.35s cubic-bezier(0.16,1,0.3,1)',
                display: 'flex', flexDirection: 'column', padding: '5rem 2rem 2rem', overflowY: 'auto',
            }}>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.52rem', letterSpacing: '0.25em', color: 'var(--rust)', textTransform: 'uppercase', marginBottom: '0.5rem', paddingBottom: '0.5rem', borderBottom: '1px solid rgba(139,115,85,0.15)' }}>
                    {ja ? '隠れた層' : 'The Hidden Layers'}
                </div>
                {layerLinks.map(({ label, href }) => (
                    <Link key={label} href={href} onClick={() => setMenuOpen(false)} style={{
                        fontFamily: "'Cinzel', serif", fontSize: '0.85rem', letterSpacing: '0.12em',
                        textTransform: 'uppercase', color: 'var(--sepia)',
                        padding: '0.7rem 0.5rem', borderBottom: '1px solid rgba(139,115,85,0.1)', display: 'block',
                    }}>
                        {label}
                    </Link>
                ))}
                {[
                    { label: ja ? 'ヒドゥンマップス' : 'Hidden Maps', href: '/#projects' },
                    { label: ja ? '概要' : 'About', href: '/#about' },
                ].map(({ label, href }) => (
                    <Link key={label} href={href} onClick={() => setMenuOpen(false)} style={{
                        fontFamily: "'Cinzel', serif", fontSize: '0.95rem', letterSpacing: '0.15em',
                        textTransform: 'uppercase', color: pathname === href ? 'var(--ink)' : 'var(--sepia)',
                        padding: '1rem 0', borderBottom: '1px solid rgba(139,115,85,0.1)', marginTop: '0.3rem', display: 'block',
                    }}>
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