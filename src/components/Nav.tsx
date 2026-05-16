'use client'

import Link from 'next/link'
import { useEffect, useState, useRef } from 'react'
import LanguageToggle from './LanguageToggle'
import OwlLogo from './OwlLogo'
import { useLanguage } from '@/contexts/LanguageContext'

export default function Nav() {
    const [scrolled, setScrolled] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)
    const [layerOpen, setLayerOpen] = useState(false)
    const { t, language } = useLanguage()
    const ja = language === 'ja'
    const layerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 80)
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    useEffect(() => {
        const handleResize = () => { if (window.innerWidth > 768) setMenuOpen(false) }
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    // Close dropdown on outside click
    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (layerRef.current && !layerRef.current.contains(e.target as Node)) {
                setLayerOpen(false)
            }
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
        { label: ja ? 'すべての記事' : 'All Articles', href: '/articles?filter=all' },
    ]

    const navStyle = {
        position: 'fixed' as const, top: 0, left: 0, right: 0, zIndex: 200,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0.9rem 1.5rem',
        transition: 'background 0.4s',
        background: scrolled || menuOpen ? 'rgba(10,9,7,0.97)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(201,146,42,0.12)' : 'none',
    }

    return (
        <>
            <nav style={navStyle}>
                {/* Brand */}
                <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', textDecoration: 'none' }}>
                    <OwlLogo size={38} variant="dark" />
                    <div>
                        <div style={{ fontFamily: "'Cinzel', serif", fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(244,240,230,0.9)', lineHeight: 1.1 }}>
                            The Hidden Owl
                        </div>
                        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.48rem', letterSpacing: '0.25em', color: 'var(--gold)', textTransform: 'uppercase', lineHeight: 1 }}>
                            {ja ? '隠れたものを観る' : 'Observing the hidden'}
                        </div>
                    </div>
                </Link>

                {/* Desktop nav */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }} className="desktop-nav">

                    {/* The Hidden Layers dropdown */}
                    <div ref={layerRef} style={{ position: 'relative' }}>
                        <button
                            onClick={() => setLayerOpen(o => !o)}
                            style={{
                                background: 'none', border: 'none', cursor: 'pointer',
                                fontFamily: "'DM Mono', monospace", fontSize: '0.62rem', letterSpacing: '0.18em',
                                textTransform: 'uppercase', color: 'rgba(244,240,230,0.5)',
                                display: 'flex', alignItems: 'center', gap: '0.4rem', padding: 0,
                                transition: 'color 0.2s',
                            }}
                        >
                            {ja ? '隠れた層' : 'The Hidden Layers'}
                            <span style={{ fontSize: '0.5rem', transform: layerOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>▾</span>
                        </button>

                        {layerOpen && (
                            <div style={{
                                position: 'absolute', top: 'calc(100% + 1rem)', left: '50%', transform: 'translateX(-50%)',
                                background: 'rgba(10,9,7,0.97)', border: '1px solid rgba(201,146,42,0.2)',
                                backdropFilter: 'blur(12px)', minWidth: 220, zIndex: 300,
                                padding: '0.5rem 0',
                            }}>
                                {layerLinks.map(({ label, href }) => (
                                    <Link key={label} href={href} onClick={() => setLayerOpen(false)} style={{
                                        display: 'block', padding: '0.65rem 1.3rem',
                                        fontFamily: "'DM Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.15em',
                                        textTransform: 'uppercase', color: 'rgba(244,240,230,0.55)',
                                        borderBottom: '1px solid rgba(201,146,42,0.08)',
                                        transition: 'color 0.2s, background 0.2s',
                                    }}>
                                        {label}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Hidden Maps */}
                    <Link href="/#projects" style={{
                        fontFamily: "'DM Mono', monospace", fontSize: '0.62rem', letterSpacing: '0.18em',
                        textTransform: 'uppercase', color: 'rgba(244,240,230,0.5)', transition: 'color 0.2s',
                    }}>
                        {ja ? 'ヒドゥンマップス' : 'Hidden Maps'}
                    </Link>

                    {/* About */}
                    <Link href="/#about" style={{
                        fontFamily: "'DM Mono', monospace", fontSize: '0.62rem', letterSpacing: '0.18em',
                        textTransform: 'uppercase', color: 'rgba(244,240,230,0.5)', transition: 'color 0.2s',
                    }}>
                        {ja ? '概要' : 'About'}
                    </Link>

                    <LanguageToggle dark />
                </div>

                {/* Mobile right */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }} className="mobile-nav-right">
                    <button onClick={() => setMenuOpen(o => !o)} aria-label="Toggle menu"
                        style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '5px', padding: '4px' }}>
                        {[0, 1, 2].map(i => (
                            <span key={i} style={{
                                display: 'block', width: 22, height: 1.5, background: 'rgba(244,240,230,0.7)', borderRadius: 1,
                                transition: 'transform 0.25s, opacity 0.25s',
                                transform: menuOpen ? i === 0 ? 'translateY(6.5px) rotate(45deg)' : i === 2 ? 'translateY(-6.5px) rotate(-45deg)' : 'scaleX(0)' : 'none',
                                opacity: menuOpen && i === 1 ? 0 : 1,
                            }} />
                        ))}
                    </button>
                </div>
            </nav>

            {menuOpen && <div className="mobile-menu-overlay open" onClick={() => setMenuOpen(false)} />}

            {/* Mobile slide-in */}
            <div style={{
                position: 'fixed', top: 0, right: 0, bottom: 0, zIndex: 195,
                width: 'min(300px, 80vw)', background: 'rgba(10,9,7,0.98)',
                borderLeft: '1px solid rgba(201,146,42,0.15)',
                transform: menuOpen ? 'translateX(0)' : 'translateX(100%)',
                transition: 'transform 0.35s cubic-bezier(0.16,1,0.3,1)',
                display: 'flex', flexDirection: 'column', padding: '5rem 2rem 2rem', overflowY: 'auto',
            }}>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.52rem', letterSpacing: '0.25em', color: 'var(--gold)', textTransform: 'uppercase', marginBottom: '0.5rem', paddingBottom: '0.5rem', borderBottom: '1px solid rgba(201,146,42,0.15)' }}>
                    {ja ? '隠れた層' : 'The Hidden Layers'}
                </div>
                {layerLinks.map(({ label, href }) => (
                    <Link key={label} href={href} onClick={() => setMenuOpen(false)} style={{
                        fontFamily: "'Cinzel', serif", fontSize: '0.85rem', letterSpacing: '0.12em',
                        textTransform: 'uppercase', color: 'rgba(244,240,230,0.6)',
                        padding: '0.7rem 0.5rem', borderBottom: '1px solid rgba(201,146,42,0.08)', display: 'block',
                    }}>
                        {label}
                    </Link>
                ))}
                <Link href="/#projects" onClick={() => setMenuOpen(false)} style={{
                    fontFamily: "'Cinzel', serif", fontSize: '0.95rem', letterSpacing: '0.15em',
                    textTransform: 'uppercase', color: 'rgba(244,240,230,0.7)',
                    padding: '1rem 0', borderBottom: '1px solid rgba(201,146,42,0.1)', marginTop: '0.5rem', display: 'block',
                }}>
                    {ja ? 'ヒドゥンマップス' : 'Hidden Maps'}
                </Link>
                <Link href="/#about" onClick={() => setMenuOpen(false)} style={{
                    fontFamily: "'Cinzel', serif", fontSize: '0.95rem', letterSpacing: '0.15em',
                    textTransform: 'uppercase', color: 'rgba(244,240,230,0.7)',
                    padding: '1rem 0', borderBottom: '1px solid rgba(201,146,42,0.1)', display: 'block',
                }}>
                    {ja ? '概要' : 'About'}
                </Link>
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