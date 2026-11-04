import { animate, motion, useAnimationFrame, useReducedMotion } from 'framer-motion'
import { useEffect, useId, useRef, useState } from 'react'

export type OrbitRing = { label: string; value: string; unit: string; note?: string }

const SIZE = 176
const INSET = 12
const WIDTH = 9
const PLATE = INSET + WIDTH + 5
const R = 91
const LAP = 2 * Math.PI * R
const GRAD_SPEED = 360 / 14
const FAST = 7
const SLOW = 0.8
const COLORS = 'var(--color-ember), var(--color-threat), var(--color-assess), var(--color-ember)'
const TRACK = 'color-mix(in oklab, var(--color-fg) 9%, transparent)'
const WORDS = 'color-mix(in oklab, var(--color-fg) 50%, transparent)'

// The arc sweeps to a full ring: the content has no common scale to fill it against.
function OrbitRingItem({ ring, index }: { ring: OrbitRing; index: number }) {
  const id = `orbit-${useId().replace(/:/g, '')}`
  const reduce = useReducedMotion()
  const [hot, setHot] = useState(false)
  const [sweep, setSweep] = useState(0)
  const hotRef = useRef(false)
  const speed = useRef(FAST)
  const angle = useRef(index * 47)
  const grad = useRef(0)
  const spin = useRef<SVGGElement>(null)
  const arc = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const run = animate(0, 1, {
      duration: reduce ? 0 : 1.8,
      delay: index * 0.18 + 0.12,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: setSweep,
    })
    return () => run.stop()
  }, [index, reduce])

  useAnimationFrame((_, delta) => {
    const dt = Math.min(0.05, delta / 1000)
    if (!reduce) grad.current = (grad.current + GRAD_SPEED * dt) % 360
    if (arc.current) arc.current.style.background = `conic-gradient(from ${grad.current}deg, ${COLORS})`
    if (reduce) return
    speed.current += ((hotRef.current ? SLOW : FAST) - speed.current) * Math.min(1, dt * 4)
    angle.current = (angle.current + speed.current * dt) % 360
    spin.current?.setAttribute('transform', `rotate(${angle.current.toFixed(2)} 100 100)`)
  })

  const word = ring.label.toUpperCase()
  const reps = Math.max(1, Math.round(LAP / ((word.length + 3) * 5.4)))
  const lap = `${word} · `.repeat(reps)
  const mask = `conic-gradient(currentColor ${sweep * 360}deg, transparent 0), radial-gradient(farthest-side, transparent calc(100% - ${WIDTH}px), currentColor calc(100% - ${WIDTH}px + 0.5px))`
  const theta = sweep * 2 * Math.PI
  const hx = 50 + 50 * Math.sin(theta)
  const hy = 50 - 50 * Math.cos(theta)

  const centre = (
    <motion.span
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 + index * 0.18, duration: 0.8 }}
      className="px-1 text-center text-[24px] leading-[1.05] font-semibold tracking-[-0.03em]"
    >
      {ring.value}
    </motion.span>
  )

  return (
    <li
      className="flex items-start gap-5"
      onPointerEnter={() => { hotRef.current = true; setHot(true) }}
      onPointerLeave={() => { hotRef.current = false; setHot(false) }}
    >
      <div
        role="img"
        aria-label={`${ring.label}: ${ring.value} ${ring.unit}`}
        className="relative shrink-0"
        style={{ width: SIZE, height: SIZE, color: 'var(--color-fg)' }}
      >
        <svg viewBox="0 0 200 200" className="absolute inset-0 size-full overflow-visible" aria-hidden="true">
          <defs>
            <path id={id} d={`M100 ${100 - R} a${R} ${R} 0 1 1 0 ${2 * R} a${R} ${R} 0 1 1 0 ${-2 * R}`} />
          </defs>
          <g ref={spin} transform={`rotate(${index * 47} 100 100)`}>
            <text
              className="font-mono"
              style={{ fill: hot ? 'var(--color-fg)' : WORDS, fontSize: 8.5, fontWeight: 500, letterSpacing: 0.5, transition: 'fill 400ms ease' }}
            >
              <textPath href={`#${id}`} textLength={LAP - 1} lengthAdjust="spacing">{lap}</textPath>
            </text>
          </g>
        </svg>
        <span
          className="absolute rounded-full"
          style={{ inset: INSET, background: `radial-gradient(farthest-side, transparent calc(100% - ${WIDTH}px), ${TRACK} calc(100% - ${WIDTH}px + 0.5px))` }}
        />
        <span
          ref={arc}
          className="absolute"
          style={{ inset: INSET, WebkitMask: mask, mask, WebkitMaskComposite: 'source-in', maskComposite: 'intersect' }}
        />
        <span className="absolute" style={{ inset: INSET, transform: `rotate(${sweep * 360}deg)`, opacity: Math.min(1, sweep * 40) }}>
          <span
            className="absolute left-1/2 rounded-full"
            style={{ top: 0, width: WIDTH, height: WIDTH, marginLeft: -WIDTH / 2, background: 'var(--color-fg)', boxShadow: `0 0 0 2px var(--color-panel), 0 0 12px 2px ${WORDS}` }}
          />
        </span>
        <span
          className="absolute grid place-items-center overflow-hidden rounded-full"
          style={{ inset: PLATE, background: 'var(--color-panel)' }}
        >
          {centre}
        </span>
        <span
          aria-hidden="true"
          className="absolute grid place-items-center overflow-hidden rounded-full"
          style={{
            inset: PLATE,
            color: 'var(--color-ink)',
            background: `conic-gradient(${COLORS})`,
            clipPath: `circle(${hot ? '110%' : '0%'} at ${hx}% ${hy}%)`,
            transition: 'clip-path 720ms cubic-bezier(0.65, 0, 0.35, 1)',
          }}
        >
          {centre}
        </span>
      </div>
      <div className="min-w-0">
        <p className="text-[26px] leading-tight font-semibold text-fg">{ring.label}</p>
        <p className="mt-2 font-mono text-[15px] leading-snug tracking-[0.06em] text-dim uppercase">{ring.unit}</p>
        {ring.note && <p className="mt-3 text-[17px] leading-snug text-fg/90">{ring.note}</p>}
      </div>
    </li>
  )
}

export function OrbitRingStats({ rings }: { rings: OrbitRing[] }) {
  return (
    <ul className="grid gap-x-5" style={{ gridTemplateColumns: `repeat(${rings.length}, minmax(0, 1fr))` }}>
      {rings.map((ring, i) => (
        <OrbitRingItem key={ring.label} ring={ring} index={i} />
      ))}
    </ul>
  )
}
