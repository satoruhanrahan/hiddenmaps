'use client'

import { useEffect } from 'react'
import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import ArticlesSection from '@/components/ArticlesSection'
import ProjectsSection from '@/components/ProjectsSection'
import AboutSection from '@/components/AboutSection'
import Footer from '@/components/Footer'

export default function Home() {
    // Scroll reveal
    useEffect(() => {
        const reveals = document.querySelectorAll('.reveal')
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible')
                    observer.unobserve(entry.target)
                }
            })
        }, { threshold: 0.08 })
        reveals.forEach(el => observer.observe(el))
        return () => observer.disconnect()
    }, [])

    return (
        <>
            <Nav />
            <Hero />
            {/* Transition band */}
            <div style={{ height: 120, background: 'linear-gradient(to bottom, var(--ink), var(--washi))' }} />
            <ArticlesSection />
            {/* Atlas rule */}
            <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 3rem', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <div style={{ flex: 1, height: 1, background: 'linear-gradient(to right, transparent, var(--faint), transparent)' }} />
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.56rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--faint)', whiteSpace: 'nowrap' }}>§ The Workshop</span>
                <div style={{ flex: 1, height: 1, background: 'linear-gradient(to right, transparent, var(--faint), transparent)' }} />
            </div>
            <ProjectsSection />
            <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 3rem', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <div style={{ flex: 1, height: 1, background: 'linear-gradient(to right, transparent, var(--faint), transparent)' }} />
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.56rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--faint)', whiteSpace: 'nowrap' }}>§ About</span>
                <div style={{ flex: 1, height: 1, background: 'linear-gradient(to right, transparent, var(--faint), transparent)' }} />
            </div>
            <AboutSection />
            <Footer />
        </>
    )
}