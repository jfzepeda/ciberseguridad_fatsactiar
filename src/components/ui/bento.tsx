import type { ReactNode } from 'react'
import { Reveal } from '@/kit'

type BentoRiesgo = { nombre: string; descripcion: string }

const RISK = 'var(--color-threat)'
const PRIN = 'var(--color-defense)'
const SCI = 'var(--color-assess)'

function BentoCell({ color, label, children }: { color: string; label: string; children: ReactNode }) {
  return (
    <div
      className="relative flex h-full flex-col overflow-hidden rounded-3xl border bg-panel/80 p-7 backdrop-blur-sm"
      style={{ borderColor: `color-mix(in oklab, ${color} 30%, transparent)`, boxShadow: `0 0 60px -30px ${color}` }}
    >
      <span
        className="pointer-events-none absolute -top-28 -right-28 size-72 rounded-full opacity-[0.14] blur-[90px]"
        style={{ background: color }}
      />
      <span className="relative mb-4 font-mono text-[15px] uppercase tracking-[0.22em]" style={{ color }}>
        {label}
      </span>
      <div className="relative flex min-h-0 flex-1 flex-col justify-center">{children}</div>
    </div>
  )
}

export function BentoImpact({
  riesgos,
  principios,
  ciencia,
}: {
  riesgos: BentoRiesgo[]
  principios: string[]
  ciencia: string[]
}) {
  return (
    <div className="mb-8 grid min-h-0 flex-1 grid-cols-3 grid-rows-[auto_1fr] gap-5">
      <Reveal delay={0.2} className="col-span-3 h-full">
        <BentoCell color={RISK} label="Riesgos">
          <div className="grid grid-cols-2 gap-x-12 gap-y-6">
            {riesgos.map((x, k) => (
              <div key={x.nombre} className="flex gap-5">
                <span className="pt-1.5 font-mono text-[16px] text-threat">{String(k + 1).padStart(2, '0')}</span>
                <div>
                  <h3 className="text-[32px] leading-tight font-semibold tracking-tight text-fg">{x.nombre}</h3>
                  <p className="mt-2 text-[22px] leading-snug text-dim">{x.descripcion}</p>
                </div>
              </div>
            ))}
          </div>
        </BentoCell>
      </Reveal>
      <Reveal delay={0.3} className="col-span-1 h-full">
        <BentoCell color={PRIN} label="Principios afectados">
          <ul className="divide-y divide-line">
            {principios.map((x, k) => (
              <li key={x} className="flex items-center gap-5 py-3">
                <span className="font-mono text-[16px] text-defense">{String(k + 1).padStart(2, '0')}</span>
                <span className="text-[34px] font-semibold tracking-tight text-fg">{x}</span>
              </li>
            ))}
          </ul>
        </BentoCell>
      </Reveal>
      <Reveal delay={0.4} className="col-span-2 h-full">
        <BentoCell color={SCI} label="Relación con ciencia de datos">
          <ul className="flex flex-col gap-1.5">
            {ciencia.map((x) => (
              <li key={x} className="flex gap-4 text-[22px] leading-snug text-fg">
                <span className="mt-[11px] size-2 shrink-0 rounded-full" style={{ background: SCI }} />
                {x}
              </li>
            ))}
          </ul>
        </BentoCell>
      </Reveal>
    </div>
  )
}
