import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'

export interface GradientCardProps {
  accent: string
  badge: string
  children: ReactNode
  className?: string
}

export function GradientCard({ accent, badge, children, className }: GradientCardProps) {
  return (
    <div
      className={cn('relative flex flex-col overflow-hidden rounded-3xl border p-7', className)}
      style={{
        borderColor: `color-mix(in oklab, ${accent} 30%, transparent)`,
        background: `radial-gradient(120% 80% at 100% 0%, color-mix(in oklab, ${accent} 20%, transparent), transparent 60%), linear-gradient(160deg, color-mix(in oklab, ${accent} 8%, var(--color-panel)), var(--color-panel) 70%)`,
      }}
    >
      <span
        className="mb-5 inline-flex w-fit items-center gap-2.5 rounded-full border px-4 py-1.5 font-mono text-[15px] tracking-[0.2em] text-fg uppercase"
        style={{
          borderColor: `color-mix(in oklab, ${accent} 35%, transparent)`,
          background: `color-mix(in oklab, ${accent} 10%, transparent)`,
        }}
      >
        <span className="size-2 rounded-full" style={{ background: accent, boxShadow: `0 0 12px ${accent}` }} />
        {badge}
      </span>
      {children}
    </div>
  )
}
