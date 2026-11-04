import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

export interface PinnedStep {
  title: string
  color: string
}

const CARD_H = 216
const DROP = 110
const LANE_H = CARD_H + DROP
const CARD_W = 0.84
const DASH = 14

export function PinnedSteps({ steps, className }: { steps: PinnedStep[]; className?: string }) {
  const n = steps.length
  const col = 100 / n
  const half = (col * CARD_W) / 2
  const cx = (k: number) => (k + 0.5) * col
  const cy = (k: number) => (k % 2 === 0 ? CARD_H / 2 : LANE_H - CARD_H / 2)
  const d = steps
    .slice(1)
    .map((_, i) => {
      const x1 = cx(i) + half
      const x2 = cx(i + 1) - half
      const mx = (x1 + x2) / 2
      return `M ${x1} ${cy(i)} C ${mx} ${cy(i)}, ${mx} ${cy(i + 1)}, ${x2} ${cy(i + 1)}`
    })
    .join(' ')

  return (
    <div className={cn('relative flex w-full', className)} style={{ height: LANE_H }}>
      <svg
        className="pointer-events-none absolute inset-0 size-full"
        viewBox={`0 0 100 ${LANE_H}`}
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <motion.path
          d={d}
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeDasharray={`6 ${DASH - 6}`}
          vectorEffect="non-scaling-stroke"
          className="text-faint"
          animate={{ strokeDashoffset: [0, -DASH] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: 'linear' }}
        />
      </svg>
      {steps.map((st, k) => (
        <div
          key={st.title}
          className={cn('relative z-10 flex flex-1 justify-center', k % 2 === 0 ? 'self-start' : 'self-end')}
          style={{ height: CARD_H }}
        >
          <div
            className="flex flex-col justify-between rounded-2xl border p-5"
            style={{
              width: `${CARD_W * 100}%`,
              borderColor: `color-mix(in oklab, ${st.color} 50%, transparent)`,
              background: `color-mix(in oklab, ${st.color} 8%, var(--color-panel))`,
              boxShadow: k === n - 1 ? `0 0 60px -10px ${st.color}` : undefined,
            }}
          >
            <span className="font-mono text-[16px]" style={{ color: st.color }}>
              {String(k + 1).padStart(2, '0')}
            </span>
            <span className="text-[22px] leading-tight font-medium text-fg">{st.title}</span>
          </div>
        </div>
      ))}
    </div>
  )
}
