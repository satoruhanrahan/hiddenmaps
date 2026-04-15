'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Nav() {
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 80)
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <nav style={{
            position: 'fixed',
            top: 0, left: 0, right: 0,
            zIndex: 200,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '1.4rem 3rem',
            transition: 'background 0.4s',
            background: scrolled ? 'rgba(10,9,7,0.92)' : 'transparent',
            backdropFilter: scrolled ? 'blur(12px)' : 'none',
            borderBottom: scrolled ? '1px solid rgba(201,146,42,0.12)' : 'none',
        }}>
            <Link href="/" style={{
                fontFamily: "'Cinzel', serif",
                fontSize: '0.95rem',
                fontWeight: 600,
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: 'var(--parchment)',
            }}>
                Hidden Maps
            </Link>

            <ul style={{ display: 'flex', gap: '2.5rem', listStyle: 'none' }}>
                {[
                    { label: 'Articles', href: '/#articles' },
                    { label: 'Projects', href: '/#projects' },
                    { label: 'About', href: '/#about' },
                ].map(({ label, href }) => (
                    <li key={label}>
                        <Link href={href} style={{
                            fontFamily: "'DM Mono', monospace",
                            fontSize: '0.65rem',
                            letterSpacing: '0.18em',
                            textTransform: 'uppercase',
                            color: 'rgba(244,240,230,0.5)',
                            transition: 'color 0.2s',
                        }}
                            onMouseEnter={e => (e.currentTarget.style.color = 'var(--gold-light)')}
                            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(244,240,230,0.5)')}
                        >
                            {label}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    )
}