import { useEffect, useState, type ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

type OrbitalItem = { id: number; label: string; icon: LucideIcon }

const RADIUS = 190
const NODE = 52
const STEP = 0.3

export function RadialOrbitalTimeline({
  items,
  activeId,
  onActiveChange,
  center,
  className,
}: {
  items: OrbitalItem[]
  activeId: number | null
  onActiveChange?: (id: number | null) => void
  center?: ReactNode
  className?: string
}) {
  const [angle, setAngle] = useState(0)
  const paused = activeId !== null

  useEffect(() => {
    if (paused) return
    const timer = setInterval(() => setAngle((a) => (a + STEP) % 360), 50)
    return () => clearInterval(timer)
  }, [paused])

  return (
    <div className={cn('relative h-full w-full', className)}>
      <div className="absolute left-1/2 top-1/2 size-[380px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-line" />
      <div
        className="absolute left-1/2 top-1/2 grid size-32 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-ember/40 bg-panel"
        style={{ boxShadow: '0 0 60px -12px var(--color-ember)' }}
      >
        <span className="absolute inset-0 animate-ping rounded-full border border-ember/30" />
        <div className="relative">{center}</div>
      </div>

      {items.map((item, i) => {
        const rad = ((i / items.length) * 360 + angle) * (Math.PI / 180)
        const on = activeId === item.id
        const Icon = item.icon
        return (
          <button
            key={item.id}
            type="button"
            aria-label={item.label}
            onMouseEnter={() => onActiveChange?.(item.id)}
            onMouseLeave={() => onActiveChange?.(null)}
            className={cn(
              'absolute left-1/2 top-1/2 grid place-items-center rounded-2xl border bg-panel transition-colors duration-300',
              on ? 'border-ember text-ember' : 'border-line text-fg/80',
            )}
            style={{
              width: NODE,
              height: NODE,
              transform: `translate(calc(-50% + ${RADIUS * Math.cos(rad)}px), calc(-50% + ${RADIUS * Math.sin(rad)}px))`,
              opacity: on ? 1 : 0.4 + 0.6 * ((1 + Math.sin(rad)) / 2),
              zIndex: on ? 30 : 10 + Math.round(5 * Math.cos(rad)),
              boxShadow: on ? '0 0 32px -6px var(--color-ember)' : undefined,
            }}
          >
            <Icon size={22} />
          </button>
        )
      })}
    </div>
  )
}
