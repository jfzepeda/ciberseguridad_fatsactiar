import { motion } from 'framer-motion'
import { TriangleAlert } from 'lucide-react'

export type SystemStatusItem = {
  title: string
  date: string
  label: string
  detail: string
  risk?: string
}

export function SystemStatusBlock({ items, accent }: { items: SystemStatusItem[]; accent: string }) {
  return (
    <ul className="rounded-3xl border border-line bg-panel/80 px-8 backdrop-blur-sm">
      {items.map((item, i) => (
        <motion.li
          key={item.title}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 + i * 0.12, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className={`grid ${item.risk ? 'grid-cols-[440px_minmax(0,1.5fr)_minmax(0,1fr)]' : 'grid-cols-[440px_minmax(0,1fr)]'} items-center gap-8 border-b border-line py-3 last:border-b-0`}
        >
          <div className="min-w-0">
            <div className="flex items-center gap-3">
              <span className="relative flex size-2.5 shrink-0">
                <span className="absolute inset-0 animate-pulse-ring rounded-full" style={{ background: accent }} />
                <span className="relative size-2.5 rounded-full" style={{ background: accent }} />
              </span>
              <span className="text-[34px] leading-none font-semibold tracking-tight text-fg">{item.title}</span>
              <span className="ml-auto font-mono text-[18px] leading-tight text-dim">{item.date}</span>
            </div>
            <div className="mt-1 pl-[22px] font-mono text-[18px] leading-tight tracking-[0.08em] uppercase" style={{ color: accent }}>
              {item.label}
            </div>
          </div>
          <p className="text-[26px] leading-snug text-fg/90">{item.detail}</p>
          {item.risk && (
            <p className="flex gap-2.5 text-[26px] leading-snug text-dim">
              <TriangleAlert size={20} className="mt-1 shrink-0 text-threat" />
              {item.risk}
            </p>
          )}
        </motion.li>
      ))}
    </ul>
  )
}
