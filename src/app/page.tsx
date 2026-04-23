'use client'

import { useEffect } from 'react'
import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import ArticlesSection from '@/components/ArticlesSection'
import ProjectsSection from '@/components/ProjectsSection'
import AboutSection from '@/components/AboutSection'
import Footer from '@/components/Footer'
import { useLanguage } from '@/contexts/LanguageContext'

export default function Home() {
    const { language } = useLanguage()
    const ja = language === 'ja'

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

    const Divider = ({ label }: { label: string }) => (
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 3rem', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <div style={{ flex: 1, height: 1, background: 'linear-gradient(to right, transparent, var(--faint), transparent)' }} />
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.56rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--faint)', whiteSpace: 'nowrap' }}>§ {label}</span>
            <div style={{ flex: 1, height: 1, background: 'linear-gradient(to right, transparent, var(--faint), transparent)' }} />
        </div>
    )

    return (
        <>
            <Nav />
            <Hero />
            <div style={{ height: 120, background: 'linear-gradient(to bottom, var(--ink), var(--washi))' }} />
            <ArticlesSection />
            <Divider label={ja ? 'プロジェクト' : 'The Workshop'} />
            <ProjectsSection />
            <Divider label={ja ? '概要' : 'About'} />
            <AboutSection />
            <Footer />
        </>
    )
}