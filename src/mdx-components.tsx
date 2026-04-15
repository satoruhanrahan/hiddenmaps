import type { MDXComponents } from 'mdx/types'

export function useMDXComponents(components: MDXComponents): MDXComponents {
    return {
        // Headings
        h2: ({ children }) => (
            <h2 style={{
                fontFamily: "'Bitter', serif",
                fontSize: '1.4rem',
                fontWeight: 700,
                fontStyle: 'italic',
                color: '#0a0907',
                marginTop: '3rem',
                marginBottom: '1.2rem',
                paddingBottom: '0.6rem',
                borderBottom: '1px solid rgba(139,115,85,0.18)',
            }}>
                {children}
            </h2>
        ),

        h3: ({ children }) => (
            <h3 style={{
                fontFamily: "'Bitter', serif",
                fontSize: '1.1rem',
                fontWeight: 700,
                color: '#0a0907',
                marginTop: '2rem',
                marginBottom: '0.8rem',
            }}>
                {children}
            </h3>
        ),

        // Paragraphs
        p: ({ children }) => (
            <p style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: '1rem',
                lineHeight: 1.85,
                color: '#1c1a16',
                marginBottom: '1.6em',
                fontWeight: 400,
                letterSpacing: '0.01em',
            }}>
                {children}
            </p>
        ),

        // Blockquote — styled as pull quote
        blockquote: ({ children }) => (
            <blockquote style={{
                margin: '2.5rem 0',
                padding: '1.5rem 2rem',
                borderLeft: '3px solid #c9922a',
                background: 'rgba(201,146,42,0.04)',
                fontFamily: "'Bitter', serif",
                fontSize: '1.15rem',
                fontStyle: 'italic',
                fontWeight: 400,
                color: '#5c4a2a',
                lineHeight: 1.7,
            }}>
                {children}
            </blockquote>
        ),

        // Strong
        strong: ({ children }) => (
            <strong style={{ fontWeight: 600, color: '#0a0907' }}>
                {children}
            </strong>
        ),

        // Em
        em: ({ children }) => (
            <em style={{ fontStyle: 'italic', color: '#5c4a2a' }}>
                {children}
            </em>
        ),

        // Horizontal rule — atlas ornament
        hr: () => (
            <div style={{ textAlign: 'center', padding: '2rem 0', opacity: 0.15 }}>
                <svg width="160" height="30" viewBox="0 0 160 30" fill="none">
                    <line x1="0" y1="15" x2="60" y2="15" stroke="#5c4a2a" strokeWidth="0.8" />
                    <line x1="100" y1="15" x2="160" y2="15" stroke="#5c4a2a" strokeWidth="0.8" />
                    <circle cx="80" cy="15" r="6" stroke="#5c4a2a" strokeWidth="0.8" />
                    <circle cx="80" cy="15" r="2" fill="#5c4a2a" />
                </svg>
            </div>
        ),

        // Links
        a: ({ href, children }) => (
            <a href={href} style={{
                color: '#9e3d2b',
                textDecoration: 'underline',
                textDecorationColor: 'rgba(158,61,43,0.3)',
                transition: 'text-decoration-color 0.2s',
            }}>
                {children}
            </a>
        ),

        // Spread any additional components
        ...components,
    }
}