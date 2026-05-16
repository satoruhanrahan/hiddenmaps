'use client'

type Props = {
  size?: number
  variant?: 'dark' | 'light'  // dark = white ink on dark bg, light = sepia on parchment bg
}

export default function OwlLogo({ size = 40, variant = 'dark' }: Props) {
  const src = variant === 'dark'
    ? '/images/owl-logo-dark.png'
    : '/images/owl-logo-light.png'

  // CSS filters to adapt the image to context
  // dark variant: white lines on dark bg — use as-is on dark hero, invert for light contexts
  // light variant: sepia tones — use as-is on parchment bg
  const filter = variant === 'dark'
    ? 'none'
    : 'none'

  return (
    <img
      src={src}
      alt="The Hidden Owl"
      width={size * 0.75}
      height={size}
      style={{
        width: size * 0.75,
        height: size,
        objectFit: 'contain',
        filter,
        display: 'block',
        flexShrink: 0,
      }}
    />
  )
}
