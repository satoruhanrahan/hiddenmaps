'use client'

import { useEffect, useState } from 'react'

export default function ProgressBar() {
    const [width, setWidth] = useState(0)

    useEffect(() => {
        const handleScroll = () => {
            const doc = document.documentElement
            const scrollTop = doc.scrollTop || document.body.scrollTop
            const scrollHeight = doc.scrollHeight - doc.clientHeight
            setWidth(scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, zIndex: 300,
            height: 2, width: `${width}%`,
            background: 'linear-gradient(to right, var(--gold), var(--rust))',
            transition: 'width 0.1s linear',
        }} />
    )
}