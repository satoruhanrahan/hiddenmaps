'use client'

import { useLanguage } from '@/contexts/LanguageContext'

export default function AboutSection() {
  const { language } = useLanguage()
  const ja = language === 'ja'

  return (
    <section id="about" style={{ position: 'relative', background: 'var(--aged)' }}>
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.2, pointerEvents: 'none',
        backgroundImage: `repeating-linear-gradient(88deg, transparent, transparent 3px, rgba(92,74,42,0.05) 3px, rgba(92,74,42,0.05) 4px)`,
      }} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 1200, margin: '0 auto', padding: 'clamp(3rem, 8vw, 6rem) clamp(1.25rem, 5vw, 3rem)' }}>

        {/* Inverted owl watermark */}
        <img
          src="/images/owl-logo-dark.png"
          alt=""
          aria-hidden="true"
          style={{
            position: 'absolute',
            right: '-2%',
            top: '50%',
            transform: 'translateY(-50%)',
            height: 'min(80%, 500px)',
            width: 'auto',
            opacity: 0.07,
            filter: 'invert(1)',
            pointerEvents: 'none',
            userSelect: 'none',
            objectFit: 'contain',
          }}
        />
        <div className="about-grid">

          <div className="reveal">
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.32em', textTransform: 'uppercase', color: 'var(--rust)', display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.5rem' }}>
              {ja ? '概要' : 'About'}
              <span style={{ width: 50, height: 1, background: 'var(--rust)', display: 'block' }} />
            </div>
            <h2 style={{ fontFamily: ja ? "'Noto Serif JP', serif" : "'Cinzel', serif", fontSize: 'clamp(1.3rem, 4vw, 1.9rem)', fontWeight: ja ? 700 : 400, lineHeight: 1.2 }}>
              {ja ? 'ザ・ヒドゥンアウルとは' : 'What is The Hidden Owl?'}
            </h2>
          </div>

          <div className="reveal reveal-delay-1" style={{ fontFamily: ja ? "'Noto Serif JP', serif" : 'inherit' }}>
            {ja ? (
              <>
                <p style={{ fontSize: 'clamp(0.95rem, 2vw, 1.05rem)', color: 'var(--deep-sepia)', fontStyle: 'italic', lineHeight: 1.85, marginBottom: '1.4rem' }}>
                  フクロウは枝の上で見ている。自分を主張しない。ただ見る——暗闇の中で、遠くから、不快なほど鮮明に。
                </p>
                <p style={{ fontSize: 'clamp(0.95rem, 2vw, 1.05rem)', color: 'var(--deep-sepia)', lineHeight: 1.85, marginBottom: '1.4rem' }}>
                  The Hidden Owlは、一つの確信を中心に構築された個人プロジェクト——世界がこうなっている理由についての最も興味深い説明は、たいてい自明なものではない。ある文明の心理を静かに決定した地理。起きなかった戦い、そして存在しなかった日本。教会が埋葬した福音書、そしてそこに書かれていたこと。
                </p>
                <p style={{ fontSize: 'clamp(0.95rem, 2vw, 1.05rem)', color: 'var(--deep-sepia)', lineHeight: 1.85, marginBottom: '2rem' }}>
                  ここのエッセイは日本、歴史、哲学、宗教、そしてどこにも綺麗に収まらない独自の理論にまたがっている。すべてが、物事の下にある物事を見つけようとしている。
                </p>

                <div style={{ borderLeft: '2px solid rgba(139,115,85,0.3)', paddingLeft: '1.25rem', marginBottom: '1.4rem' }}>
                  <p style={{ fontSize: '0.75rem', fontFamily: "'DM Mono', monospace", letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--rust)', marginBottom: '0.6rem' }}>
                    制作について
                  </p>
                  <p style={{ fontSize: 'clamp(0.88rem, 2vw, 0.95rem)', color: 'var(--deep-sepia)', lineHeight: 1.8 }}>
                    エッセイはClaudeと共に書かれている——ゴーストライターとしてではなく、真の協力者として。アイデア、選択、フレーミング、そしてこだわりは人間のもの。文章はコラボレーション。
                  </p>
                </div>
              </>
            ) : (
              <>
                <p style={{ fontSize: 'clamp(0.95rem, 2vw, 1.05rem)', color: 'var(--deep-sepia)', fontStyle: 'italic', lineHeight: 1.85, marginBottom: '1.4rem' }}>
                  An owl watches from a branch. It doesn't announce itself. It simply sees — in the dark, at a distance, with uncomfortable clarity.
                </p>
                <p style={{ fontSize: 'clamp(0.95rem, 2vw, 1.05rem)', color: 'var(--deep-sepia)', lineHeight: 1.85, marginBottom: '1.4rem' }}>
                  The Hidden Owl is a personal project built around a single conviction: that the most interesting explanations for why the world is the way it is are usually not the obvious ones. The geography that quietly determined an entire civilisation's psychology. The battle that didn't happen, and the Japan that never was. The gospel the church buried, and what it said.
                </p>
                <p style={{ fontSize: 'clamp(0.95rem, 2vw, 1.05rem)', color: 'var(--deep-sepia)', lineHeight: 1.85, marginBottom: '2rem' }}>
                  The essays here span Japan, history, philosophy, religion, and a handful of original theories that don't fit neatly anywhere else. All of them are trying to find the thing underneath the thing.
                </p>

                <div style={{ borderLeft: '2px solid rgba(139,115,85,0.3)', paddingLeft: '1.25rem', marginBottom: '1.4rem' }}>
                  <p style={{ fontSize: '0.75rem', fontFamily: "'DM Mono', monospace", letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--rust)', marginBottom: '0.6rem' }}>
                    A note on how this is made
                  </p>
                  <p style={{ fontSize: 'clamp(0.88rem, 2vw, 0.95rem)', color: 'var(--deep-sepia)', lineHeight: 1.8 }}>
                    The essays are written with Claude — Anthropic's AI — as a genuine collaborator, not a ghostwriter. The ideas, the selection, the framing, and the obsessions are human. The prose is a collaboration.
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .about-grid {
          display: grid;
          grid-template-columns: 1fr 1.8fr;
          gap: 5rem;
          align-items: start;
        }
        @media (max-width: 768px) {
          .about-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
        }
      `}</style>
    </section>
  )
}