import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export type BentoGrid01Cell = {
  id: string
  span: string
  color: string
  delay?: number
  children: ReactNode
}

const ease = [0.16, 1, 0.3, 1] as const

export function BentoGrid01({ cells, className }: { cells: BentoGrid01Cell[]; className?: string }) {
  return (
    <div className={cn('grid min-h-0 grid-cols-12 grid-rows-3 gap-4', className)}>
      {cells.map((c) => (
        <motion.div
          key={c.id}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 + (c.delay ?? 0), ease }}
          className={cn('group relative flex min-h-0 flex-col overflow-hidden rounded-3xl border bg-panel/80 p-5 backdrop-blur-sm', c.span)}
          style={{ borderColor: `color-mix(in oklab, ${c.color} 28%, transparent)` }}
        >
          <div
            className="pointer-events-none absolute -top-16 -right-16 size-48 rounded-full opacity-[0.12] blur-3xl transition-opacity duration-500 group-hover:opacity-[0.22]"
            style={{ background: c.color }}
          />
          <div className="relative flex min-h-0 flex-1 flex-col">{c.children}</div>
        </motion.div>
      ))}
    </div>
  )
}
