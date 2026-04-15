import Link from 'next/link'

export default function Hero() {
    return (
        <section style={{
            position: 'relative',
            minHeight: '100vh',
            background: 'var(--ink)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '8rem 3rem 5rem',
            overflow: 'hidden',
        }}>
            {/* Gold grid lines */}
            <div style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: `
          linear-gradient(rgba(201,146,42,0.06) 1px, transparent 1px),
          linear-gradient(90deg, rgba(201,146,42,0.06) 1px, transparent 1px)
        `,
                backgroundSize: '60px 60px',
            }} />

            {/* Radial glow */}
            <div style={{
                position: 'absolute',
                top: '40%', left: '35%',
                width: 600, height: 600,
                background: 'radial-gradient(ellipse, rgba(201,146,42,0.07) 0%, transparent 70%)',
                transform: 'translate(-50%, -50%)',
                pointerEvents: 'none',
            }} />

            {/* Topographic rings */}
            <svg style={{
                position: 'absolute',
                right: -80, top: '50%',
                transform: 'translateY(-50%)',
                width: 500, height: 500,
                opacity: 0.07,
            }} viewBox="0 0 400 400" fill="none">
                {[280, 240, 200, 160, 120, 82, 46].map((rx, i) => (
                    <ellipse key={i} cx="300" cy="200" rx={rx} ry={rx * 0.62}
                        stroke="#c9922a" strokeWidth={i >= 5 ? 1 : 0.8} />
                ))}
                <circle cx="300" cy="200" r="6" fill="#c9922a" opacity="0.5" />
            </svg>

            {/* Content */}
            <div style={{ position: 'relative', zIndex: 2, maxWidth: 1200, margin: '0 auto', width: '100%' }}>
                <div style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: '0.62rem',
                    letterSpacing: '0.35em',
                    textTransform: 'uppercase',
                    color: 'var(--gold)',
                    marginBottom: '2rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    animation: 'fadeUp 1s ease both',
                }}>
                    <span style={{ display: 'block', width: 36, height: 1, background: 'var(--gold)', flexShrink: 0 }} />
                    Charting what lies beneath
                </div>

                <h1 style={{
                    fontFamily: "'Cinzel', serif",
                    fontSize: 'clamp(3.8rem, 10vw, 9rem)',
                    fontWeight: 400,
                    lineHeight: 0.92,
                    color: 'var(--parchment)',
                    marginBottom: '0.1em',
                    animation: 'fadeUp 1s 0.1s ease both',
                }}>
                    Hidden<br />
                    <em style={{
                        fontStyle: 'italic',
                        fontFamily: "'Cormorant Garamond', serif",
                        fontWeight: 300,
                        color: 'var(--gold-light)',
                        display: 'block',
                    }}>Maps</em>
                </h1>

                <p style={{
                    fontSize: '1.15rem',
                    fontWeight: 300,
                    fontStyle: 'italic',
                    color: 'rgba(244,240,230,0.45)',
                    maxWidth: 480,
                    marginTop: '2.5rem',
                    marginBottom: '3rem',
                    lineHeight: 1.75,
                    animation: 'fadeUp 1s 0.2s ease both',
                }}>
                    Most of what shapes the world isn't visible on the surface —
                    ideas, histories, and patterns that only reveal themselves
                    when you know where to look.
                </p>

                <div style={{ display: 'flex', gap: '1.5rem', animation: 'fadeUp 1s 0.3s ease both' }}>
                    <Link href="#articles" style={{
                        fontFamily: "'DM Mono', monospace",
                        fontSize: '0.65rem',
                        letterSpacing: '0.22em',
                        textTransform: 'uppercase',
                        color: 'var(--ink)',
                        background: 'var(--gold)',
                        padding: '1rem 2.4rem',
                        transition: 'background 0.2s',
                    }}>
                        Explore Articles
                    </Link>
                    <Link href="#projects" style={{
                        fontFamily: "'DM Mono', monospace",
                        fontSize: '0.65rem',
                        letterSpacing: '0.22em',
                        textTransform: 'uppercase',
                        color: 'rgba(244,240,230,0.5)',
                        border: '1px solid rgba(244,240,230,0.15)',
                        padding: '1rem 2.4rem',
                        transition: 'border-color 0.2s, color 0.2s',
                    }}>
                        View Projects
                    </Link>
                </div>
            </div>

            {/* Compass rose */}
            <svg style={{ position: 'absolute', left: '3rem', bottom: '3rem', opacity: 0.18, width: 90, height: 90 }}
                viewBox="0 0 100 100" fill="none">
                <circle cx="50" cy="50" r="47" stroke="#c9922a" strokeWidth="0.6" />
                <circle cx="50" cy="50" r="38" stroke="#c9922a" strokeWidth="0.4" />
                <circle cx="50" cy="50" r="2.5" fill="#c9922a" />
                <line x1="50" y1="3" x2="50" y2="97" stroke="#c9922a" strokeWidth="0.4" />
                <line x1="3" y1="50" x2="97" y2="50" stroke="#c9922a" strokeWidth="0.4" />
                <polygon points="50,5 53,48 50,42 47,48" fill="#c9922a" />
                <polygon points="50,95 53,52 50,58 47,52" fill="#c9922a" opacity="0.35" />
                <text x="50" y="17" textAnchor="middle" fontFamily="serif" fontSize="9" fill="#c9922a">N</text>
            </svg>

            {/* Legend box */}
            <div style={{ position: 'absolute', bottom: '3rem', right: '3rem', zIndex: 2 }}>
                <div style={{ border: '1px solid rgba(201,146,42,0.2)', padding: '1.2rem 1.5rem', display: 'inline-block' }}>
                    <div style={{
                        fontFamily: "'DM Mono', monospace",
                        fontSize: '0.55rem',
                        letterSpacing: '0.3em',
                        textTransform: 'uppercase',
                        color: 'var(--gold)',
                        marginBottom: '0.8rem',
                        borderBottom: '1px solid rgba(201,146,42,0.2)',
                        paddingBottom: '0.5rem',
                    }}>Legend</div>
                    {[
                        { label: 'Articles', color: 'var(--gold)' },
                        { label: 'Interactive Tools', color: 'var(--rust)' },
                        { label: 'In Development', color: 'rgba(244,240,230,0.2)' },
                    ].map(({ label, color }) => (
                        <div key={label} style={{
                            fontFamily: "'DM Mono', monospace",
                            fontSize: '0.55rem',
                            letterSpacing: '0.1em',
                            color: 'rgba(244,240,230,0.3)',
                            lineHeight: 2,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.6rem',
                            justifyContent: 'flex-end',
                        }}>
                            <span>{label}</span>
                            <span style={{ width: 6, height: 6, borderRadius: '50%', background: color, flexShrink: 0 }} />
                        </div>
                    ))}
                    <div style={{
                        marginTop: '0.8rem', paddingTop: '0.6rem', borderTop: '1px solid rgba(201,146,42,0.15)',
                        fontFamily: "'DM Mono', monospace", fontSize: '0.55rem', letterSpacing: '0.1em', color: 'rgba(244,240,230,0.3)'
                    }}>
                        hiddenmaps.app
                    </div>
                </div>
            </div>

            <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
        </section>
    )
}