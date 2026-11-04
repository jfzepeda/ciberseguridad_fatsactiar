import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { AuroraBackground } from '@/components/ui/aurora-background'
import { FlickeringGrid } from '@/components/ui/flickering-grid'
import { SpotlightCard } from '@/components/ui/spotlight-card'
import { cn } from '@/lib/utils'
import raw from '../contenido.json'

export const P = raw.presentacion
export const S = P.diapositivas
export const TOTAL = P.total_diapositivas

export type Part = 'ps' | 'bo'
export const accent = { ps: 'var(--color-defense)', bo: 'var(--color-ember)' } as const

const ease = [0.16, 1, 0.3, 1] as const

export function Reveal({ children, delay = 0, className, y = 28 }: { children: ReactNode; delay?: number; className?: string; y?: number }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, filter: 'blur(10px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ duration: 0.9, delay: 0.15 + delay, ease }}
    >
      {children}
    </motion.div>
  )
}

export function Slide({
  n,
  part,
  bg = 'grid',
  label,
  children,
}: {
  n: number
  part: Part
  bg?: 'aurora' | 'grid' | 'none'
  label?: string
  children: ReactNode
}) {
  const a = accent[part]
  return (
    <div className={cn('grain relative h-full w-full overflow-hidden bg-ink', part === 'bo' && 'theme-ember')}>
      {bg === 'aurora' && (
        <div className="absolute inset-0 opacity-60">
          <AuroraBackground className="h-full bg-transparent dark:bg-transparent">{null}</AuroraBackground>
        </div>
      )}
      {bg !== 'none' && (
        <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_70%_30%,black,transparent_75%)]">
          <FlickeringGrid squareSize={3} gridGap={9} color={part === 'ps' ? '#2ee6d6' : '#ff8a3d'} maxOpacity={bg === 'aurora' ? 0.12 : 0.18} flickerChance={0.08} />
        </div>
      )}
      <div
        className="pointer-events-none absolute -top-[30%] left-1/2 h-[60%] w-[70%] -translate-x-1/2 rounded-full opacity-[0.07] blur-[120px]"
        style={{ background: a }}
      />

      {/* chrome */}
      <div className="absolute inset-x-[112px] top-[44px] z-20 flex items-center justify-between font-mono text-[15px] uppercase tracking-[0.22em] text-dim">
        <span className="flex items-center gap-3">
          <span className="relative flex size-2">
            <span className="absolute inset-0 animate-pulse-ring rounded-full" style={{ background: a }} />
            <span className="relative size-2 rounded-full" style={{ background: a }} />
          </span>
          {label ?? (part === 'ps' ? S[0].titulo : S[13].titulo)}
        </span>
        <span>
          <span className="text-fg">{String(n).padStart(2, '0')}</span> / {TOTAL}
        </span>
      </div>

      <div className="relative z-10 flex h-full flex-col px-[112px] pt-[112px] pb-[64px]">{children}</div>
    </div>
  )
}

export function Title({ title, sub, size = 96, className }: { title: string; sub?: string; size?: number; className?: string }) {
  return (
    <div className={cn('mb-10', className)}>
      <Reveal delay={0.05}>
        <h2 className="text-balance font-semibold leading-[0.95] tracking-[-0.035em] text-fg" style={{ fontSize: size }}>
          {title}
        </h2>
      </Reveal>
      {sub && (
        <Reveal delay={0.12}>
          <p className="mt-4 font-serif text-[44px] italic leading-tight text-dim">{sub}</p>
        </Reveal>
      )}
    </div>
  )
}

export function KeyMessage({ children, color = 'var(--color-defense)', delay = 0.6, className }: { children: ReactNode; color?: string; delay?: number; className?: string }) {
  return (
    <Reveal delay={delay} className={cn('mt-auto', className)}>
      <div className="flex items-center gap-6 border-t border-line pt-6">
        <span className="h-10 w-1.5 shrink-0 rounded-full" style={{ background: color, boxShadow: `0 0 24px ${color}` }} />
        <p className="text-[30px] font-medium leading-snug tracking-[-0.01em] text-fg">{children}</p>
      </div>
    </Reveal>
  )
}

export function Card({ children, className, glow = '#2ee6d630' }: { children: ReactNode; className?: string; glow?: string }) {
  return (
    <SpotlightCard spotlightColor={glow} className={cn('rounded-3xl border-line bg-panel/80 p-8 backdrop-blur-sm', className)}>
      {children}
    </SpotlightCard>
  )
}

export function Chip({ children, color = 'var(--color-dim)', className }: { children: ReactNode; color?: string; className?: string }) {
  return (
    <span
      className={cn('inline-flex items-center gap-2 rounded-full border px-4 py-1.5 font-mono text-[14px] uppercase tracking-[0.14em]', className)}
      style={{ color, borderColor: `color-mix(in oklab, ${color} 35%, transparent)`, background: `color-mix(in oklab, ${color} 8%, transparent)` }}
    >
      {children}
    </span>
  )
}

export function Node({ children, color = 'var(--color-fg)', className, ref }: { children: ReactNode; color?: string; className?: string; ref?: React.Ref<HTMLDivElement> }) {
  return (
    <div
      ref={ref}
      className={cn('relative z-10 flex items-center justify-center rounded-2xl border bg-panel', className)}
      style={{ borderColor: `color-mix(in oklab, ${color} 40%, transparent)`, color, boxShadow: `0 0 40px -10px ${color}` }}
    >
      {children}
    </div>
  )
}

// Logos ship dark-on-transparent; rendered mono-white for the dark deck.
// Heights compensate for each PNG's built-in padding so they read at equal weight.
const logos = {
  cisco: { file: 'cisco-logo.png', h: 1 },
  rapid7: { file: 'rapid7-logo.png', h: 0.42 },
  tenable: { file: 'tenable-logo.png', h: 1.9 },
} as const
export type Brand = keyof typeof logos

export function Logo({ brand, size = 56, className }: { brand: Brand; size?: number; className?: string }) {
  const l = logos[brand]
  return (
    <img
      src={`${import.meta.env.BASE_URL}logos/${l.file}`}
      alt={brand}
      draggable={false}
      className={cn('w-auto object-contain [filter:brightness(0)_invert(1)]', className)}
      style={{ height: size * l.h }}
    />
  )
}

export const tools = [
  { brand: 'cisco' as Brand, color: 'var(--color-defense)', glow: '#2ee6d630' },
  { brand: 'rapid7' as Brand, color: 'var(--color-assess)', glow: '#a78bfa30' },
  { brand: 'tenable' as Brand, color: 'var(--color-scan)', glow: '#60a5fa30' },
]
