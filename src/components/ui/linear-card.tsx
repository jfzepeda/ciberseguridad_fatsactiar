import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

export type LinearCardProps = {
  index: string
  category: string
  title: string
  identifiers?: string[]
  description: string
  details?: string[]
  steps?: string[]
  impact: string[]
  note?: string
  accent?: string
  className?: string
}

const THREAT = 'var(--color-threat)'
const ease = [0.16, 1, 0.3, 1] as const

export function LinearCard({
  index,
  category,
  title,
  identifiers,
  description,
  details,
  steps,
  impact,
  note,
  accent = 'var(--color-ember)',
  className,
}: LinearCardProps) {
  return (
    <article className={cn('relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-panel/80 p-7 backdrop-blur-sm', className)}>
      <motion.span
        aria-hidden
        className="absolute inset-x-0 top-0 h-px origin-left"
        style={{ background: `linear-gradient(90deg, ${accent}, transparent)` }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.2, delay: 0.3, ease }}
      />
      <div aria-hidden className="pointer-events-none absolute -top-24 -right-24 size-64 rounded-full opacity-[0.12] blur-3xl" style={{ background: accent }} />

      <div className="relative mb-4 flex items-start justify-between gap-4">
        <span
          className="inline-flex items-center rounded-full border px-3.5 py-1.5 font-mono text-[18px] tracking-[0.12em] uppercase"
          style={{
            color: THREAT,
            borderColor: `color-mix(in oklab, ${THREAT} 35%, transparent)`,
            background: `color-mix(in oklab, ${THREAT} 8%, transparent)`,
          }}
        >
          {category}
        </span>
        <span className="font-mono text-[56px] leading-none font-bold text-transparent" style={{ WebkitTextStroke: `1.5px ${accent}` }}>
          {index}
        </span>
      </div>

      <h3 className="relative text-[48px] leading-none font-semibold tracking-tight text-fg">{title}</h3>

      {identifiers?.length ? (
        <div className="relative mt-3 flex flex-wrap gap-2">
          {identifiers.map((id) => (
            <span key={id} className="rounded-md border border-line bg-ink px-2 py-1 font-mono text-[18px]" style={{ color: accent }}>{id}</span>
          ))}
        </div>
      ) : null}

      {details?.length ? (
        <ul className="relative mt-3 space-y-1">
          {details.map((d) => (
            <li key={d} className="flex gap-2.5 text-[15px] leading-snug text-dim">
              <span className="mt-[7px] size-1.5 shrink-0 rounded-full" style={{ background: accent }} />
              {d}
            </li>
          ))}
        </ul>
      ) : null}

      <p className="relative mt-4 text-[24px] leading-snug text-fg/90">{description}</p>

      {steps?.length ? (
        <ol className="relative mt-4 space-y-2">
          {steps.map((s, i) => (
            <li key={s} className="flex gap-3">
              <span
                className="grid size-6 shrink-0 place-items-center rounded-full border font-mono text-[15px]"
                style={{ color: accent, borderColor: `color-mix(in oklab, ${accent} 50%, transparent)` }}
              >
                {i + 1}
              </span>
              <span className="text-[15px] leading-snug text-dim">{s}</span>
            </li>
          ))}
        </ol>
      ) : null}

      {impact.length > 0 && (
        <ul className="relative mt-auto space-y-1.5 pt-4">
          {impact.map((x) => (
            <li key={x} className="flex gap-2.5 text-[15px] leading-snug text-fg/90">
              <span className="mt-[7px] size-1.5 shrink-0 rounded-full" style={{ background: THREAT }} />
              {x}
            </li>
          ))}
        </ul>
      )}

      {note ? <p className="relative mt-3 border-t border-line pt-3 text-[15px] leading-snug text-faint">{note}</p> : null}
    </article>
  )
}
