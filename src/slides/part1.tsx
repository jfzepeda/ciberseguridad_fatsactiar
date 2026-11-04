import { motion } from 'framer-motion'
import {
  AlertTriangle, ArrowRight, Check, CircleDot, Database, Minus, Radar, Server, ShieldCheck, Skull, Waypoints, X,
} from 'lucide-react'
import { createRef, useMemo, useRef } from 'react'
import { AnimatedBeam } from '@/components/ui/animated-beam'
import { BorderBeam } from '@/components/ui/border-beam'
import { OrbitingCircles } from '@/components/ui/orbiting-circles'
import { TextShimmer } from '@/components/ui/text-shimmer'
import { Card, Chip, KeyMessage, Logo, Node, P1, Reveal, Slide, Title, tools } from '@/kit'

const S = P1.diapositivas
const DEF = 'var(--color-defense)'
const THREAT = 'var(--color-threat)'

/* 01 — Cover */
const SWEEP = [21, 22, 25, 53, 80, 110, 143, 443, 445, 993, 1433, 3306, 3389, 5432, 5900, 6379, 8080, 8443, 9200, 27017]
const OPEN = new Set([22, 80, 443, 3389, 5432])

export function Cover() {
  const s = S[0]
  return (
    <Slide n={1} part="ps" bg="aurora">
      <div className="grid h-full grid-cols-[1fr_520px] items-center gap-20">
        <div>
          <Reveal className="mb-8">
            <Chip color={DEF}>
              <Radar size={14} /> {s.subtitulo}
            </Chip>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="text-[230px] leading-[0.82] font-semibold tracking-[-0.06em] text-fg">
              {s.titulo.split(' ').map((w, k) => (
                <span key={w} className="block" style={k ? { color: 'transparent', WebkitTextStroke: '2px var(--color-fg)' } : undefined}>
                  {w}
                </span>
              ))}
            </h1>
          </Reveal>
          <Reveal delay={0.25} className="mt-12">
            <TextShimmer as="p" duration={3} className="font-serif text-[64px] italic [--base-color:#8b8ba3] [--base-gradient-color:#2ee6d6] dark:[--base-color:#8b8ba3] dark:[--base-gradient-color:#2ee6d6]">
              {s.contenido.frase!}
            </TextShimmer>
          </Reveal>
          <Reveal delay={0.35}>
            <p className="mt-6 max-w-[900px] text-[26px] leading-relaxed text-dim">{s.contenido.tema}</p>
          </Reveal>
        </div>

        <Reveal delay={0.3}>
          <div className="relative rounded-[32px] border border-line bg-panel/60 p-7 backdrop-blur">
            <BorderBeam size={180} duration={9} colorFrom="#2ee6d6" colorTo="#a78bfa" />
            <div className="mb-5 flex justify-between font-mono text-[13px] tracking-[0.2em] text-dim uppercase">
              <span>probe · tcp</span>
              <span className="text-defense">● live</span>
            </div>
            <div className="grid grid-cols-4 gap-3">
              {SWEEP.map((p, k) => (
                <motion.div
                  key={p}
                  className="rounded-xl border border-line py-4 text-center font-mono text-[22px]"
                  initial={{ opacity: 0.25 }}
                  animate={
                    OPEN.has(p)
                      ? { opacity: 1, color: '#2ee6d6', borderColor: '#2ee6d688', backgroundColor: '#2ee6d612' }
                      : { opacity: [0.25, 0.9, 0.35] }
                  }
                  transition={{ delay: 0.6 + k * 0.09, duration: 0.6 }}
                >
                  {p}
                </motion.div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </Slide>
  )
}

/* 02 — Every server has doors */
export function Doors() {
  const s = S[1]
  const ports = s.contenido.ejemplos!
  const box = useRef<HTMLDivElement>(null)
  const hub = useRef<HTMLDivElement>(null)
  const refs = useMemo(() => ports.map(() => createRef<HTMLDivElement>()), [ports])
  const pos = [
    'left-0 top-[40px]', 'left-0 top-[260px]', 'left-0 bottom-[20px]', 'right-0 top-[90px]', 'right-0 bottom-[90px]',
  ]
  return (
    <Slide n={2} part="ps">
      <Title kicker={s.subtitulo} title={s.titulo} />
      <div className="grid flex-1 grid-cols-[560px_1fr] gap-16">
        <div className="flex flex-col justify-center gap-10">
          <Reveal delay={0.2}>
            <p className="text-[34px] leading-snug text-fg">{s.contenido.mensaje_principal}</p>
          </Reveal>
          <Reveal delay={0.35}>
            <p className="border-l-2 border-threat/60 pl-6 font-serif text-[34px] italic leading-snug text-dim">{s.contenido.mensaje_clave}</p>
          </Reveal>
        </div>
        <div ref={box} className="relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <Node ref={hub} color={DEF} className="size-[180px] flex-col gap-3 rounded-[36px]">
              <Server size={64} strokeWidth={1.4} />
              <span className="font-mono text-[14px] tracking-[0.2em] uppercase">host</span>
            </Node>
          </div>
          {ports.map((p, k) => (
            <Reveal key={p.puerto} delay={0.3 + k * 0.08} className={`absolute ${pos[k]}`}>
              <div ref={refs[k]} className="relative z-10 flex w-[340px] items-center gap-5 rounded-2xl border border-line bg-panel/90 px-6 py-4">
                <span className="font-mono text-[40px] font-medium text-defense tabular-nums">{p.puerto}</span>
                <span>
                  <span className="block text-[22px] font-semibold text-fg">{p.servicio}</span>
                  <span className="block text-[17px] text-dim">{p.funcion}</span>
                </span>
              </div>
            </Reveal>
          ))}
          {refs.map((r, k) => (
            <AnimatedBeam key={k} containerRef={box} fromRef={r} toRef={hub} curvature={k % 2 ? 40 : -40} duration={4 + k * 0.4} delay={k * 0.3} gradientStartColor="#2ee6d6" gradientStopColor="#a78bfa" pathColor="#8b8ba3" />
          ))}
        </div>
      </div>
    </Slide>
  )
}

/* 03 — How port scanning works */
export function HowItWorks() {
  const s = S[2]
  const steps = s.contenido.etapas!
  const box = useRef<HTMLDivElement>(null)
  const refs = useMemo(() => steps.map(() => createRef<HTMLDivElement>()), [steps])
  const states = [
    { l: 'open', c: DEF }, { l: 'closed', c: 'var(--color-faint)' }, { l: 'filtered', c: 'var(--color-assess)' },
  ]
  return (
    <Slide n={3} part="ps">
      <Title kicker={s.subtitulo} title={s.titulo} />
      <Reveal delay={0.15}>
        <p className="max-w-[1300px] text-[32px] leading-snug text-dim">{s.contenido.mensaje_principal}</p>
      </Reveal>
      <div ref={box} className="relative mt-14 grid grid-cols-4 gap-12">
        {steps.map((st, k) => (
          <Reveal key={st.paso} delay={0.25 + k * 0.12}>
            <div ref={refs[k]}>
              <Card className="h-[400px]">
                <div className="mb-8 flex items-center justify-between">
                  <span className="font-mono text-[72px] leading-none font-light text-threat/90">0{st.paso}</span>
                  <ArrowRight className="text-faint" />
                </div>
                <h3 className="mb-4 text-[38px] leading-tight font-semibold tracking-tight text-fg">{st.nombre}</h3>
                <p className="text-[26px] leading-snug text-dim">{st.descripcion}</p>
                {st.paso === 3 && (
                  <div className="mt-6 flex gap-2">
                    {states.map((x) => (
                      <Chip key={x.l} color={x.c} className="px-3 py-1 text-[12px]">{x.l}</Chip>
                    ))}
                  </div>
                )}
              </Card>
            </div>
          </Reveal>
        ))}
        {refs.slice(0, -1).map((r, k) => (
          <AnimatedBeam key={k} containerRef={box} fromRef={r} toRef={refs[k + 1]} duration={3} delay={k * 0.5} gradientStartColor="#ff3d71" gradientStopColor="#ff8a3d" pathColor="#4f4f66" />
        ))}
      </div>
      <KeyMessage color={THREAT}>{s.contenido.mensaje_clave}</KeyMessage>
    </Slide>
  )
}

/* 04 — From scanning to exploitation */
export function Chain() {
  const s = S[3]
  const c = s.contenido
  const ex = c.ejemplo_hipotetico!
  const exRows: [string, string][] = [
    ['target', ex.objetivo], ['discovery', ex.descubrimiento], ['weakness', ex.debilidad], ['potential result', ex.resultado_potencial],
  ]
  return (
    <Slide n={4} part="ps">
      <Title kicker={s.subtitulo} title={s.titulo} />
      <Reveal delay={0.1}>
        <p className="max-w-[1400px] text-[28px] leading-snug text-dim">{c.mensaje_principal}</p>
      </Reveal>
      <div className="mt-12 flex items-stretch">
        {c.flujo!.map((f, k, a) => {
          const t = k / (a.length - 1)
          const col = `color-mix(in oklab, var(--color-threat) ${Math.round(15 + t * 85)}%, var(--color-dim))`
          return (
            <Reveal key={f} delay={0.2 + k * 0.1} className="flex flex-1 items-center">
              <div
                className="flex h-[200px] flex-1 flex-col justify-between rounded-2xl border p-6"
                style={{ borderColor: `color-mix(in oklab, ${col} 50%, transparent)`, background: `color-mix(in oklab, ${col} ${Math.round(4 + t * 14)}%, transparent)`, boxShadow: k === a.length - 1 ? `0 0 60px -10px ${col}` : undefined }}
              >
                <span className="font-mono text-[16px]" style={{ color: col }}>0{k + 1}</span>
                <span className="text-[26px] leading-tight font-medium text-fg">{f}</span>
              </div>
              {k < a.length - 1 && <ArrowRight className="mx-2 shrink-0" size={22} style={{ color: col }} />}
            </Reveal>
          )
        })}
      </div>
      <div className="mt-10 grid grid-cols-[1fr_620px] gap-10">
        <Reveal delay={0.8}>
          <Card glow="#ff3d7125" className="p-7">
            <div className="mb-5 flex items-center gap-3">
              <Chip color={THREAT}>hypothetical example</Chip>
            </div>
            <div className="grid grid-cols-4 gap-6">
              {exRows.map(([k, v]) => (
                <div key={k}>
                  <div className="mb-2 font-mono text-[13px] tracking-[0.18em] text-faint uppercase">{k}</div>
                  <div className="text-[25px] leading-snug text-fg">{v}</div>
                </div>
              ))}
            </div>
          </Card>
        </Reveal>
        <Reveal delay={0.9} className="flex items-center">
          <p className="flex gap-4 text-[26px] leading-snug text-dim">
            <AlertTriangle className="mt-1 shrink-0 text-assess" size={24} /> {c.aclaracion}
          </p>
        </Reveal>
      </div>
      <KeyMessage color={THREAT} delay={1}>{c.mensaje_clave}</KeyMessage>
    </Slide>
  )
}

/* 05 — Why does it matter */
export function Impact() {
  const s = S[4]
  const r = s.contenido.riesgos!
  return (
    <Slide n={5} part="ps">
      <Title kicker={s.subtitulo} title={s.titulo} />
      <div className="relative grid flex-1 grid-cols-2 gap-6">
        {r.map((x, k) => (
          <Reveal key={x.titulo} delay={0.2 + k * 0.1}>
            <Card glow="#ff3d7125" className={`flex h-full flex-col justify-center ${k % 2 ? 'pl-[150px]' : 'pr-[150px]'}`}>
              <span className="mb-3 font-mono text-[15px] tracking-[0.2em] text-threat uppercase">risk 0{k + 1}</span>
              <h3 className="mb-2 text-[40px] font-semibold tracking-tight text-fg">{x.titulo}</h3>
              <p className="text-[24px] text-dim">{x.descripcion}</p>
            </Card>
          </Reveal>
        ))}
        <div className="pointer-events-none absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
          <Reveal delay={0.1}>
            <div className="relative grid size-[200px] place-items-center rounded-full border border-threat/50 bg-ink shadow-[0_0_80px_-10px_var(--color-threat)]">
              <span className="absolute inset-0 animate-pulse-ring rounded-full border border-threat/60" />
              <Database size={72} strokeWidth={1.3} className="text-threat" />
            </div>
          </Reveal>
        </div>
      </div>
      <Reveal delay={0.7} className="mt-8">
        <div className="flex items-center gap-6 rounded-2xl border border-assess/30 bg-assess/5 px-8 py-5">
          <Chip color="var(--color-assess)">data science</Chip>
          <p className="text-[24px] leading-snug text-fg">{s.contenido.relevancia_data_science}</p>
        </div>
      </Reveal>
    </Slide>
  )
}

/* 06 — Three tools */
export function ThreeTools() {
  const s = S[5]
  const h = s.contenido.herramientas!
  return (
    <Slide n={6} part="ps" bg="aurora">
      <Title kicker={s.subtitulo} title={s.titulo} size={150} />
      <div className="grid flex-1 grid-cols-3 gap-8">
        {h.map((t, k) => {
          const tool = tools[k]
          return (
            <Reveal key={t.empresa} delay={0.2 + k * 0.15}>
              <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-[32px] border border-line bg-panel/70 p-10 backdrop-blur">
                <BorderBeam size={220} duration={10} delay={k * 3} colorFrom={['#2ee6d6', '#a78bfa', '#60a5fa'][k]} colorTo="#ffffff" />
                <div className="flex h-[160px] items-center">
                  <Logo brand={tool.brand} size={130} />
                </div>
                <div>
                  <div className="mb-3 text-[60px] font-semibold tracking-tight text-fg">{t.producto}</div>
                  <div className="font-mono text-[26px] tracking-[0.12em] uppercase" style={{ color: tool.color }}>{t.enfoque}</div>
                </div>
              </div>
            </Reveal>
          )
        })}
      </div>
      <KeyMessage className="mt-10">{s.contenido.mensaje_clave}</KeyMessage>
    </Slide>
  )
}

/* 07–09 — Product deep dives */
type Product = (typeof S)[6]['contenido'] & { dato_tecnico?: string }

function ProductSlide({ n, idx, diagram }: { n: number; idx: number; diagram: React.ReactNode }) {
  const s = S[6 + idx]
  const c = s.contenido as Product
  const tool = tools[idx]
  return (
    <Slide n={n} part="ps">
      <div className="mb-8 flex items-end justify-between gap-10">
        <div>
          <Reveal className="mb-5 flex items-center gap-5">
            <Logo brand={tool.brand} size={44} />
            <Chip color={tool.color}>{c.categoria}</Chip>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="text-[88px] leading-none font-semibold tracking-[-0.035em] text-fg">{s.titulo}</h2>
          </Reveal>
        </div>
        <Reveal delay={0.12}>
          <p className="max-w-[820px] text-right font-serif text-[46px] leading-tight italic" style={{ color: tool.color }}>{s.subtitulo}</p>
        </Reveal>
      </div>

      <div className="grid flex-1 grid-cols-[1fr_600px_1fr] gap-8">
        <Reveal delay={0.2}>
          <Card glow={tool.glow} className="h-full">
            <h3 className="mb-6 font-mono text-[15px] tracking-[0.22em] text-dim uppercase">How it works</h3>
            <ol className="space-y-6">
              {c.como_funciona!.map((x, k) => (
                <li key={x} className="flex gap-4 text-[25px] leading-snug text-fg">
                  <span className="mt-0.5 font-mono text-[16px]" style={{ color: tool.color }}>0{k + 1}</span>
                  {x}
                </li>
              ))}
            </ol>
          </Card>
        </Reveal>
        <Reveal delay={0.3}>
          <div className="relative h-full overflow-hidden rounded-3xl border border-line bg-ink/80">{diagram}</div>
        </Reveal>
        <Reveal delay={0.4} className="flex flex-col gap-6">
          <Card glow={tool.glow} className="flex-1 p-7">
            <h3 className="mb-4 font-mono text-[15px] tracking-[0.22em] text-dim uppercase">Capabilities</h3>
            <ul className="space-y-2.5">
              {c.caracteristicas_tecnicas!.map((x) => (
                <li key={x} className="flex items-start gap-3 text-[21px] leading-snug text-fg">
                  <Check size={20} className="mt-1 shrink-0" style={{ color: tool.color }} /> {x}
                </li>
              ))}
            </ul>
          </Card>
          <Card glow="#ff3d7120" className="p-7">
            <h3 className="mb-4 font-mono text-[15px] tracking-[0.22em] text-threat/80 uppercase">Limitations</h3>
            <ul className="space-y-2.5">
              {c.limitaciones!.map((x) => (
                <li key={x} className="flex items-start gap-3 text-[19px] leading-snug text-dim">
                  <Minus size={20} className="mt-0.5 shrink-0 text-threat/80" /> {x}
                </li>
              ))}
            </ul>
          </Card>
        </Reveal>
      </div>
      <KeyMessage color={tool.color} delay={0.7} className="mt-8">{c.mensaje_clave}</KeyMessage>
    </Slide>
  )
}

function FirewallDiagram() {
  const box = useRef<HTMLDivElement>(null)
  const atk = useRef<HTMLDivElement>(null)
  const fw = useRef<HTMLDivElement>(null)
  const srv = [useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null)]
  return (
    <div ref={box} className="relative flex h-full items-center justify-between px-10">
      <div className="flex flex-col items-center gap-3">
        <Node ref={atk} color={THREAT} className="size-[96px] rounded-full"><Skull size={40} /></Node>
        <span className="font-mono text-[13px] tracking-[0.2em] text-threat uppercase">scanner</span>
      </div>
      <div className="flex flex-col items-center gap-3">
        <Node ref={fw} color={DEF} className="h-[200px] w-[86px]"><ShieldCheck size={40} /></Node>
        <span className="font-mono text-[13px] tracking-[0.2em] text-defense uppercase">firewall</span>
      </div>
      <div className="flex flex-col gap-6">
        {srv.map((r, k) => (
          <Node key={k} ref={r} color="var(--color-fg)" className="size-[72px]"><Server size={30} /></Node>
        ))}
      </div>
      <AnimatedBeam containerRef={box} fromRef={atk} toRef={fw} duration={2.2} gradientStartColor="#ff3d71" gradientStopColor="#ff3d71" pathColor="#ff3d71" />
      {srv.map((r, k) => (
        <AnimatedBeam key={k} containerRef={box} fromRef={fw} toRef={r} duration={3} delay={1 + k * 0.3} gradientStartColor="#2ee6d6" gradientStopColor="#2ee6d6" />
      ))}
      <motion.div
        className="absolute top-1/2 left-[42%] z-20 -translate-y-1/2 rounded-full bg-threat px-3 py-1 font-mono text-[12px] font-semibold tracking-wider text-ink"
        animate={{ opacity: [0, 1, 1, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, times: [0, 0.6, 0.85, 1] }}
      >
        BLOCKED
      </motion.div>
    </div>
  )
}

function RiskDashboard() {
  const assets = [
    { h: 'web-01', p: [443, 8443], lvl: 'Critical', w: 92, c: THREAT },
    { h: 'db-02', p: [5432], lvl: 'High', w: 68, c: 'var(--color-ember)' },
    { h: 'ops-03', p: [22], lvl: 'Medium', w: 38, c: 'var(--color-assess)' },
  ]
  return (
    <div className="flex h-full flex-col p-8">
      <div className="mb-6 flex items-center justify-between font-mono text-[13px] tracking-[0.2em] text-dim uppercase">
        <span>remediation queue</span>
        <span className="text-assess">risk ↓</span>
      </div>
      <div className="flex flex-1 flex-col justify-center gap-5">
        {assets.map((a, k) => (
          <div key={a.h} className="rounded-2xl border border-line bg-panel p-5">
            <div className="mb-3 flex items-center justify-between">
              <span className="font-mono text-[20px] text-fg">{a.h}</span>
              <span className="font-mono text-[14px] tracking-wider uppercase" style={{ color: a.c }}>{a.lvl}</span>
            </div>
            <div className="mb-3 flex gap-2">
              {a.p.map((p) => (
                <span key={p} className="rounded-md border border-line px-2 py-0.5 font-mono text-[13px] text-dim">:{p}</span>
              ))}
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-line">
              <motion.div className="h-full rounded-full" style={{ background: a.c }} initial={{ width: 0 }} animate={{ width: `${a.w}%` }} transition={{ delay: 0.8 + k * 0.2, duration: 1.2, ease: [0.16, 1, 0.3, 1] }} />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 text-center font-mono text-[12px] tracking-[0.18em] text-faint uppercase">illustrative</div>
    </div>
  )
}

function ScannerDiagram({ note }: { note?: string }) {
  const box = useRef<HTMLDivElement>(null)
  const hub = useRef<HTMLDivElement>(null)
  const ports = [22, 443, 8443]
  const sev = [
    { l: 'Info', c: 'var(--color-dim)' }, { l: 'Medium', c: 'var(--color-ember)' }, { l: 'Critical', c: THREAT },
  ]
  const pr = [useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null)]
  const fr = [useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null)]
  return (
    <div className="flex h-full flex-col">
      <div ref={box} className="relative flex flex-1 items-center justify-between px-8">
        <div className="flex flex-col gap-5">
          {ports.map((p, k) => (
            <div key={p} ref={pr[k]} className="relative z-10 rounded-xl border border-scan/40 bg-panel px-4 py-2 font-mono text-[20px] text-scan">:{p}</div>
          ))}
        </div>
        <Node ref={hub} color="var(--color-scan)" className="size-[110px] rounded-[28px]"><Server size={44} /></Node>
        <div className="flex flex-col gap-5">
          {sev.map((x, k) => (
            <div key={x.l} ref={fr[k]} className="relative z-10 rounded-xl border bg-panel px-4 py-2 font-mono text-[15px] tracking-wider uppercase" style={{ color: x.c, borderColor: `color-mix(in oklab, ${x.c} 45%, transparent)` }}>
              {x.l}
            </div>
          ))}
        </div>
        {pr.map((r, k) => (
          <AnimatedBeam key={`p${k}`} containerRef={box} fromRef={r} toRef={hub} duration={3} delay={k * 0.3} gradientStartColor="#60a5fa" gradientStopColor="#ffffff" />
        ))}
        {fr.map((r, k) => (
          <AnimatedBeam key={`f${k}`} containerRef={box} fromRef={hub} toRef={r} duration={3} delay={1.2 + k * 0.3} gradientStartColor="#ffffff" gradientStopColor="#60a5fa" />
        ))}
      </div>
      {note && <p className="border-t border-line px-7 py-5 text-[17px] leading-snug text-dim">{note}</p>}
    </div>
  )
}

export const Cisco = () => <ProductSlide n={7} idx={0} diagram={<FirewallDiagram />} />
export const Rapid7 = () => <ProductSlide n={8} idx={1} diagram={<RiskDashboard />} />
export const Nessus = () => <ProductSlide n={9} idx={2} diagram={<ScannerDiagram note={(S[8].contenido as Product).dato_tecnico} />} />

/* 10 — Comparison matrix */
function verdict(v: string) {
  if (v.startsWith('Yes')) return { Icon: Check, c: DEF }
  if (v === 'No') return { Icon: X, c: THREAT }
  if (v.startsWith('Not')) return { Icon: Minus, c: 'var(--color-faint)' }
  return { Icon: CircleDot, c: 'var(--color-assess)' }
}

export function Compare() {
  const s = S[9]
  const c = s.contenido
  const rows = c.filas!
  const keys = ['cisco', 'rapid7', 'tenable'] as const
  const msg = c.mensaje_clave!.split(/(?<=\.)\s+/)
  return (
    <Slide n={10} part="ps">
      <Title kicker={s.subtitulo} title={s.titulo} size={104} className="mb-8" />
      <Reveal delay={0.2}>
        <div className="overflow-hidden rounded-3xl border border-line bg-panel/70 backdrop-blur">
          <div className="grid grid-cols-[440px_1fr_1fr_1fr] border-b border-line">
            <div className="px-8 py-6 font-mono text-[14px] tracking-[0.2em] text-dim uppercase">{c.columnas![0]}</div>
            {tools.map((t, k) => (
              <div key={t.brand} className="flex flex-col gap-3 border-l border-line px-8 py-6">
                <Logo brand={t.brand} size={38} />
                <span className="text-[17px] text-dim">{c.columnas![k + 1]}</span>
              </div>
            ))}
          </div>
          {rows.map((r, ri) => (
            <motion.div
              key={r.capacidad}
              className="grid grid-cols-[440px_1fr_1fr_1fr] border-b border-line/60 last:border-0"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + ri * 0.08 }}
            >
              <div className="px-8 py-[22px] text-[23px] font-medium text-fg">{r.capacidad}</div>
              {keys.map((k) => {
                const { Icon, c: col } = verdict(r[k])
                return (
                  <div key={k} className="flex items-center gap-3 border-l border-line/60 px-8 py-[22px] text-[21px] text-dim">
                    <Icon size={22} className="shrink-0" style={{ color: col }} />
                    {r[k]}
                  </div>
                )
              })}
            </motion.div>
          ))}
        </div>
      </Reveal>
      <Reveal delay={1} className="mt-auto">
        <p className="text-[28px] leading-snug font-medium">
          {msg.map((m, k) => (
            <span key={m} style={{ color: tools[k]?.color }}>{m} </span>
          ))}
        </p>
      </Reveal>
    </Slide>
  )
}

/* 11 — One attack, three defenses */
export function Scenario() {
  const s = S[10]
  const c = s.contenido
  const box = useRef<HTMLDivElement>(null)
  const atk = useRef<HTMLDivElement>(null)
  const fw = useRef<HTMLDivElement>(null)
  const srv = useRef<HTMLDivElement>(null)
  const r7 = useRef<HTMLDivElement>(null)
  const ns = useRef<HTMLDivElement>(null)
  return (
    <Slide n={11} part="ps">
      <Title kicker={s.subtitulo} title={s.titulo} className="mb-6" />
      <div className="grid grid-cols-[600px_1fr] gap-10">
        <Reveal delay={0.15} className="flex flex-col justify-center gap-6">
          <div>
            <div className="mb-2 font-mono text-[14px] tracking-[0.2em] text-dim uppercase">scenario</div>
            <p className="text-[26px] leading-snug text-fg">{c.escenario}</p>
          </div>
          <div>
            <div className="mb-2 font-mono text-[14px] tracking-[0.2em] text-threat uppercase">attack</div>
            <p className="text-[26px] leading-snug text-fg">{c.ataque}</p>
          </div>
        </Reveal>
        <Reveal delay={0.25}>
          <div ref={box} className="relative h-[340px] rounded-3xl border border-line bg-ink/70">
            <Node ref={atk} color={THREAT} className="absolute top-[60px] left-[50px] size-[84px] rounded-full"><Skull size={36} /></Node>
            <Node ref={fw} color={DEF} className="absolute top-[30px] left-[300px] h-[150px] w-[70px]"><ShieldCheck size={32} /></Node>
            <div ref={srv} className="absolute top-[45px] right-[60px] z-10 flex flex-col gap-2 rounded-2xl border border-fg/30 bg-panel p-4">
              <Server size={30} className="mx-auto text-fg" />
              <span className="rounded-md bg-defense/10 px-2 font-mono text-[15px] text-defense">:443</span>
              <span className="rounded-md bg-threat/10 px-2 font-mono text-[15px] text-threat">:8443</span>
            </div>
            <div ref={r7} className="absolute bottom-[24px] left-[470px] z-10 rounded-xl border border-assess/40 bg-panel px-4 py-2"><Logo brand="rapid7" size={26} /></div>
            <div ref={ns} className="absolute right-[230px] bottom-[24px] z-10 rounded-xl border border-scan/40 bg-panel px-4 py-1"><Logo brand="tenable" size={36} /></div>
            <AnimatedBeam containerRef={box} fromRef={atk} toRef={fw} duration={2} gradientStartColor="#ff3d71" gradientStopColor="#ff3d71" pathColor="#ff3d71" />
            <AnimatedBeam containerRef={box} fromRef={fw} toRef={srv} duration={3} delay={0.8} curvature={-30} gradientStartColor="#2ee6d6" gradientStopColor="#2ee6d6" />
            <AnimatedBeam containerRef={box} fromRef={r7} toRef={srv} duration={3.5} curvature={60} gradientStartColor="#a78bfa" gradientStopColor="#ffffff" />
            <AnimatedBeam containerRef={box} fromRef={ns} toRef={srv} duration={3.5} delay={1} curvature={30} gradientStartColor="#60a5fa" gradientStopColor="#ffffff" />
          </div>
        </Reveal>
      </div>
      <div className="mt-8 grid grid-cols-3 gap-6">
        {c.respuestas!.map((r, k) => (
          <Reveal key={r.herramienta} delay={0.45 + k * 0.1}>
            <Card glow={tools[k].glow} className="h-full p-7">
              <div className="mb-4 flex items-center justify-between">
                <Logo brand={tools[k].brand} size={34} />
                <Chip color={tools[k].color} className="text-[12px]">{r.momento}</Chip>
              </div>
              <p className="text-[25px] leading-snug text-fg">{r.accion}</p>
            </Card>
          </Reveal>
        ))}
      </div>
      <Reveal delay={0.8} className="mt-5">
        <p className="text-[16px] text-faint">* {c.aclaracion}</p>
      </Reveal>
      <KeyMessage delay={0.9} className="mt-auto">{c.mensaje_clave}</KeyMessage>
    </Slide>
  )
}

/* 12 — Defense in depth */
export function Depth() {
  const s = S[11]
  const layers = s.contenido.estrategia!
  const col = ['var(--color-fg)', DEF, 'var(--color-assess)', 'var(--color-scan)', 'var(--color-fg)']
  const hex = ['#ececf4', '#2ee6d6', '#a78bfa', '#60a5fa', '#ececf4']
  return (
    <Slide n={12} part="ps">
      <div className="grid h-full grid-cols-[760px_1fr] gap-16">
        <Reveal delay={0.1} className="relative">
          <div className="absolute inset-0 flex items-center justify-center">
            {[...layers].reverse().map((_, rk) => {
              const k = layers.length - 1 - rk
              const r = 90 + k * 68
              return (
                <OrbitingCircles key={k} radius={r} duration={18 + k * 6} reverse={k % 2 === 1} delay={k * 3} className="size-[16px] border-none" path>
                  <span className="block size-[12px] rounded-full" style={{ background: hex[k], boxShadow: `0 0 18px ${hex[k]}` }} />
                </OrbitingCircles>
              )
            })}
            <Node color={DEF} className="size-[110px] rounded-full"><Server size={44} /></Node>
            <div className="absolute top-[40px] right-[20px] flex flex-col items-center gap-2">
              <Node color={THREAT} className="size-[64px] rounded-full"><Skull size={28} /></Node>
              <span className="font-mono text-[12px] tracking-[0.2em] text-threat uppercase">outside</span>
            </div>
          </div>
        </Reveal>
        <div className="flex flex-col">
          <Title kicker={s.subtitulo} title={s.titulo} size={96} className="mb-6" />
          <div className="flex flex-col gap-3">
            {layers.map((l, k) => (
              <Reveal key={l.capa} delay={0.25 + k * 0.1}>
                <div className="flex items-center gap-6 rounded-2xl border border-line bg-panel/70 px-7 py-3">
                  <span className="font-mono text-[34px] font-light" style={{ color: col[k] }}>{l.capa.split('.')[0]}</span>
                  <div>
                    <div className="text-[24px] font-semibold text-fg">{l.capa.replace(/^\d+\.\s*/, '')}</div>
                    <div className="text-[19px] text-dim">{l.accion}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <KeyMessage delay={0.9} className="mt-auto pt-5">{s.contenido.mensaje_clave}</KeyMessage>
        </div>
      </div>
    </Slide>
  )
}

/* 13 — Takeaway */
export function Takeaway() {
  const s = S[12]
  const c = s.contenido
  const [head, last] = (() => {
    const w = c.frase_final!.replace(/\.$/, '').split(' ')
    return [w.slice(0, -1).join(' '), w.at(-1)]
  })()
  return (
    <Slide n={13} part="ps" bg="aurora">
      <Title kicker={s.subtitulo} title={s.titulo} size={64} className="mb-8" />
      <div className="grid grid-cols-3 gap-x-10 gap-y-4">
        {c.conclusiones!.map((x, k) => (
          <Reveal key={x} delay={0.15 + k * 0.06}>
            <p className="flex gap-3 text-[25px] leading-snug text-dim">
              <Waypoints size={20} className="mt-1 shrink-0 text-defense" /> {x}
            </p>
          </Reveal>
        ))}
      </div>
      <Reveal delay={0.6} className="mt-auto">
        <p className="text-[128px] leading-[0.95] font-semibold tracking-[-0.045em] text-fg">
          {head} <span className="font-serif font-normal italic text-defense">{last}.</span>
        </p>
      </Reveal>
      <Reveal delay={0.9} className="mt-10 flex items-center gap-14 opacity-70">
        {tools.map((t) => (
          <Logo key={t.brand} brand={t.brand} size={40} />
        ))}
      </Reveal>
    </Slide>
  )
}
