import { motion } from 'framer-motion'
import {
  Bot, Cpu, ExternalLink, KeyRound, LifeBuoy, Package, Radar, RefreshCw, ShieldCheck, ShieldMinus,
} from 'lucide-react'
import { BorderBeam } from '@/components/ui/border-beam'
import { TextShimmer } from '@/components/ui/text-shimmer'
import { Card, Chip, KeyMessage, P, Reveal, S, Slide, Title } from '@/kit'
import { SystemStatusBlock } from '@/components/ui/system-status-block'
import { LinearCard } from '@/components/ui/linear-card'
import { RadialOrbitalTimeline } from '@/components/ui/radial-orbital-timeline'
import { OrbitRingStats } from '@/components/ui/orbit-ring-stats'
import { useState } from 'react'
import { BentoGrid01 } from '@/components/ui/bento-grid-01'
import { Mail, Unlock } from 'lucide-react'
import { CaseStudyBento } from '@/components/ui/casestudy-bento'

const A = S.slice(13)
const EMBER = 'var(--color-ember)'
const THREAT = 'var(--color-threat)'
const DEF = 'var(--color-defense)'
const GLOW = 'color-mix(in oklab, var(--color-ember) 15%, transparent)'

// contenido.json slides have heterogeneous shapes; name the ones we read.
type Breach = { empresa: string; metrica_principal: string; unidad: string; que_paso: string; datos: string[]; impacto: string; consecuencia?: string; aclaracion?: string }
type Incident = { empresa: string; fecha: string; categoria: string; incidente: string; riesgo: string }
type Vuln = {
  nombre: string; categoria: string; descripcion: string; impacto: string[]; identificadores?: string[]; severidad?: string
  mecanismo?: string[]; datos?: string[]; alcance?: string; respuesta?: string; mitigacion?: string
}
const incidents = A[2].contenido.incidentes as unknown as Incident[]

/* 14 — Section cover */
export function BOCover() {
  const s = A[0]
  const c = s.contenido
  const incidentDays = new Set(incidents.map((x) => Number(x.fecha.slice(-2))))
  const lead = new Date(2026, 9, 1).getDay() // weekday of Oct 1, 2026 (0 = Sunday)
  const [black, october, year] = s.titulo.split(' ')
  const blocks: [string, string][] = [['Descripción', c.descripcion!], ['Contexto', c.contexto!], ['Conexión', c.conexion!]]
  return (
    <Slide n={14} part="bo" bg="aurora">
      <div className="grid h-full grid-cols-[1fr_640px] gap-20">
        <div className="flex flex-col justify-center">
          <Reveal>
            <h1 className="text-[210px] leading-[0.8] font-semibold tracking-[-0.06em] text-fg">
              {black}
              <br />
              <span className="text-ember">{october}</span>
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="outline-text mt-4 font-mono text-[150px] leading-none font-bold tracking-[-0.04em] text-fg/40">{year}</div>
          </Reveal>
          <Reveal delay={0.25} className="mt-10">
            <TextShimmer as="p" duration={3} className="text-[40px] font-medium [--base-color:#8b8ba3] [--base-gradient-color:#ff8a3d] dark:[--base-color:#8b8ba3] dark:[--base-gradient-color:#ff8a3d]">
              {s.subtitulo!}
            </TextShimmer>
          </Reveal>
          <Reveal delay={0.35}>
            <p className="mt-6 font-serif text-[48px] leading-tight text-fg/90 italic">{c.mensaje_clave}</p>
          </Reveal>
        </div>

        <div className="flex flex-col justify-center gap-8">
          <Reveal delay={0.3}>
            <div className="relative rounded-[28px] border border-line bg-panel/70 p-7 backdrop-blur">
              <BorderBeam size={160} duration={8} colorFrom="#ff8a3d" colorTo="#ff3d71" />
              <div className="mb-4 flex justify-between font-mono text-[14px] tracking-[0.22em] text-dim uppercase">
                <span>octubre · 2026</span>
                <span className="text-ember">● incidentes</span>
              </div>
              <div className="grid grid-cols-7 gap-1.5 text-center font-mono text-[15px]">
                {['D', 'L', 'M', 'M', 'J', 'V', 'S'].map((d, k) => (
                  <span key={k} className="pb-1 text-faint">{d}</span>
                ))}
                {Array.from({ length: lead }, (_, k) => <span key={`e${k}`} />)}
                {Array.from({ length: 31 }, (_, k) => {
                  const day = k + 1
                  const hit = incidentDays.has(day)
                  return (
                    <motion.span
                      key={day}
                      className="grid h-[40px] place-items-center rounded-lg"
                      initial={{ opacity: 0 }}
                      animate={hit ? { opacity: 1, backgroundColor: '#ff8a3d', color: '#06060b' } : { opacity: 1, color: '#4f4f66' }}
                      transition={{ delay: 0.5 + k * 0.03 + (hit ? 0.6 : 0) }}
                      style={hit ? { boxShadow: '0 0 24px -2px #ff8a3d' } : { background: '#ffffff05' }}
                    >
                      {day}
                    </motion.span>
                  )
                })}
              </div>
            </div>
          </Reveal>
          {blocks.map(([k, v], i) => (
            <Reveal key={k} delay={0.5 + i * 0.1}>
              <div className="grid grid-cols-[150px_1fr] gap-4">
                <span className="pt-1 font-mono text-[13px] tracking-[0.2em] text-ember uppercase">{k}</span>
                <p className="text-[19px] leading-snug text-dim">{v}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Slide>
  )
}

/* 15 — Four major breaches */
export function Breaches() {
  const s = A[1]
  const c = s.contenido
  const brechas = c.incidentes as unknown as Breach[]
  return (
    <Slide n={15} part="bo">
      <Title kicker={s.subtitulo} title={s.titulo} size={62} className="mb-3" />
      <Reveal delay={0.1}>
        <p className="mb-6 max-w-[1500px] text-[22px] text-dim">{c.introduccion}</p>
      </Reveal>
      <Reveal delay={0.15} className="mb-6">
        <OrbitRingStats rings={brechas.map((x) => ({ label: x.empresa, value: x.metrica_principal, unit: x.unidad, note: x.que_paso }))} />
      </Reveal>
      <div className="grid flex-1 grid-cols-4 gap-5">
        {brechas.map((x, k) => {
          const note = x.consecuencia ?? x.aclaracion
          const fatal = !!x.consecuencia
          return (
            <Reveal key={x.empresa} delay={0.2 + k * 0.1}>
              <Card glow={GLOW} className="flex h-full flex-col p-7">
                <ul className="mb-3 space-y-1.5">
                  {x.datos.map((d) => (
                    <li key={d} className="flex gap-2.5 text-[15px] leading-snug text-dim">
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-ember" /> {d}
                    </li>
                  ))}
                </ul>
                <p className="mt-auto border-t border-line pt-4 text-[16px] leading-snug text-fg/90">
                  <span className="font-mono text-[12px] tracking-[0.18em] text-threat uppercase">Impacto · </span>
                  {x.impacto}
                </p>
                {note && (
                  <p className={`mt-3 rounded-xl px-3 py-2 text-[15px] leading-snug ${fatal ? 'bg-threat/15 font-medium text-threat' : 'bg-fg/[0.03] text-faint'}`}>{note}</p>
                )}
              </Card>
            </Reveal>
          )
        })}
      </div>
      <KeyMessage color={EMBER} delay={0.8} className="mt-5">{c.mensaje_clave}</KeyMessage>
    </Slide>
  )
}

/* 16 — Six more platforms (status block) */
export function SixMore() {
  const s = A[2]
  const c = s.contenido
  return (
    <Slide n={16} part="bo">
      <Title kicker={s.subtitulo} title={s.titulo} size={72} className="mb-4" />
      <Reveal delay={0.1}>
        <p className="max-w-[1600px] text-[22px] text-dim">{c.introduccion}</p>
      </Reveal>
      <div className="mt-6">
        <SystemStatusBlock
          accent={EMBER}
          items={incidents.map((x) => ({ title: x.empresa, date: x.fecha, label: x.categoria, detail: x.incidente, risk: x.riesgo }))}
        />
      </div>
      <Reveal delay={1.1} className="mt-5 flex flex-wrap items-center gap-3">
        <span className="mr-2 font-mono text-[15px] tracking-[0.2em] text-dim uppercase">Patrón común</span>
        {c.patrones_comunes!.map((p) => (
          <Chip key={p} color={THREAT} className="normal-case tracking-normal text-[18px]">{p}</Chip>
        ))}
      </Reveal>
      <KeyMessage color={EMBER} delay={1.2} className="mt-6">{c.mensaje_clave}</KeyMessage>
    </Slide>
  )
}

/* 17 — Three critical vulnerabilities */
export function Vulns() {
  const s = A[3]
  const c = s.contenido
  return (
    <Slide n={17} part="bo">
      <Title kicker={s.subtitulo} title={s.titulo} size={72} className="mb-4" />
      <Reveal delay={0.1}>
        <p className="mb-5 max-w-[1500px] text-[21px] text-dim">{c.introduccion}</p>
      </Reveal>
      <div className="grid flex-1 grid-cols-3 gap-6">
        {(c.vulnerabilidades as unknown as Vuln[]).map((v, k) => (
          <Reveal key={v.nombre} delay={0.2 + k * 0.12} className="flex h-full min-h-0 flex-col">
            <LinearCard
              index={String(k + 1).padStart(2, '0')}
              category={v.categoria}
              title={v.nombre}
              identifiers={v.identificadores}
              description={v.descripcion}
              details={v.datos}
              steps={v.mecanismo}
              impact={v.impacto}
              note={v.alcance ?? v.respuesta}
            />
          </Reveal>
        ))}
      </div>
      <KeyMessage color={EMBER} delay={0.8} className="mt-6">{c.mensaje_clave}</KeyMessage>
    </Slide>
  )
}

/* 18 — Three more flaws */
export function MoreFlaws() {
  const s = A[4]
  const c = s.contenido
  const [first, second, third] = c.vulnerabilidades as unknown as Vuln[]
  return (
    <Slide n={18} part="bo">
      <Title kicker={s.subtitulo} title={s.titulo} size={72} className="mb-3" />
      <Reveal delay={0.1}>
        <p className="mb-5 text-[22px] text-dim">{c.introduccion}</p>
      </Reveal>
      <Reveal delay={0.2} className="flex min-h-0 flex-1 flex-col">
        <CaseStudyBento featured={first} items={[second, third]} />
      </Reveal>
      <KeyMessage color={EMBER} delay={0.8} className="mt-6">{c.mensaje_clave}</KeyMessage>
    </Slide>
  )
}

/* 19 — AI speed */
type Fase = { fase: string; actividad: string }
const riesgoIcons = [Unlock, Mail, Radar, KeyRound]

export function AISpeed() {
  const s = A[5]
  const c = s.contenido
  const cmp = c.comparacion as { ataque_tradicional: Fase[]; ataque_asistido_por_ia: Fase[] }
  const trad = cmp.ataque_tradicional
  const ai = cmp.ataque_asistido_por_ia
  return (
    <Slide n={19} part="bo">
      <Title kicker={s.subtitulo} title={s.titulo} size={56} className="mb-3" />
      <Reveal delay={0.1}>
        <p className="mb-6 max-w-[1500px] text-[22px] text-dim">{c.introduccion}</p>
      </Reveal>
      <BentoGrid01
        className="flex-1"
        cells={[
          {
            id: 'fases',
            span: 'col-span-6 row-span-2',
            color: EMBER,
            delay: 0.1,
            children: (
              <div className="grid flex-1 grid-cols-4 gap-4">
                {trad.map((t, k) => (
                  <div key={t.fase} className="flex flex-col">
                    <div className="mb-3 text-[20px] leading-tight font-semibold text-fg">{t.fase}</div>
                    <div className="mb-3">
                      <div className="mb-1 font-mono text-[15px] tracking-[0.14em] text-dim uppercase">Tradicional</div>
                      <p className="text-[17px] leading-snug text-dim">{t.actividad}</p>
                      <div className="mt-2 h-1 overflow-hidden rounded-full bg-line">
                        <motion.div className="h-full rounded-full bg-dim/60" initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ delay: 0.5 + k * 0.1, duration: 4, ease: 'linear' }} />
                      </div>
                    </div>
                    <div>
                      <div className="mb-1 font-mono text-[15px] tracking-[0.14em] text-ember uppercase">Asistido por IA</div>
                      <p className="text-[17px] leading-snug text-fg/90">{ai[k].actividad}</p>
                      <div className="mt-2 h-1 overflow-hidden rounded-full bg-line">
                        <motion.div className="h-full rounded-full bg-gradient-to-r from-ember to-threat" initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ delay: 0.5 + k * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ),
          },
          ...c.riesgos!.map((r, k) => {
            const Icon = riesgoIcons[k]
            return {
              id: r.nombre,
              span: 'col-span-3',
              color: THREAT,
              delay: 0.2 + k * 0.08,
              children: (
                <>
                  <div className="mb-2 flex items-start gap-2.5">
                    <Icon size={20} className="mt-1 shrink-0 text-threat" />
                    <div className="text-[20px] leading-tight font-semibold text-fg">{r.nombre}</div>
                  </div>
                  <p className="text-[17px] leading-snug text-dim">{r.descripcion}</p>
                </>
              ),
            }
          }),
          {
            id: 'defensa',
            span: 'col-span-8',
            color: DEF,
            delay: 0.5,
            children: (
              <>
                <div className="mb-3 flex items-center gap-2.5 font-mono text-[15px] tracking-[0.18em] text-defense uppercase">
                  <ShieldCheck size={18} /> Aplicaciones defensivas
                </div>
                <div className="flex flex-wrap content-start gap-2.5">
                  {c.aplicaciones_defensivas!.map((x) => (
                    <Chip key={x} color={DEF} className="font-sans text-[16px] normal-case tracking-normal">{x}</Chip>
                  ))}
                </div>
              </>
            ),
          },
          {
            id: 'limitaciones',
            span: 'col-span-4',
            color: 'var(--color-dim)',
            delay: 0.6,
            children: (
              <>
                <div className="mb-3 flex items-center gap-2.5 font-mono text-[15px] tracking-[0.18em] text-dim uppercase">
                  <Cpu size={18} /> Limitaciones
                </div>
                <p className="text-[18px] leading-snug text-fg/90">{c.limitaciones}</p>
              </>
            ),
          },
        ]}
      />
      <Reveal delay={0.7} className="mt-4">
        <p className="text-[16px] leading-snug text-dim">* {c.aclaracion}</p>
      </Reveal>
      <KeyMessage color={EMBER} delay={0.9} className="mt-4">{c.mensaje_clave}</KeyMessage>
    </Slide>
  )
}

/* 20 — Lessons */
const lessonIcons = [KeyRound, Package, RefreshCw, ShieldMinus, LifeBuoy, Bot]

export function Lessons() {
  const s = A[6]
  const c = s.contenido
  const [activo, setActivo] = useState<number | null>(null)
  const [a, b] = c.mensaje_clave!.split(/(?<=\.)\s+/)
  const lecciones = c.aprendizajes!.map((l, k) => ({ id: k + 1, label: l.titulo, descripcion: l.descripcion, icon: lessonIcons[k] ?? ShieldCheck }))
  return (
    <Slide n={20} part="bo" bg="aurora">
      <Title kicker={s.subtitulo} title={s.titulo} size={72} className="mb-5" />
      <Reveal delay={0.1}>
        <p className="mb-6 max-w-[1500px] text-[23px] leading-snug text-dim">{c.introduccion}</p>
      </Reveal>
      <div className="grid min-h-0 flex-1 grid-cols-[560px_minmax(0,1fr)] gap-12">
        <Reveal delay={0.2} className="h-full">
          <RadialOrbitalTimeline
            items={lecciones}
            activeId={activo}
            onActiveChange={setActivo}
            center={<ShieldCheck size={40} className="text-ember" />}
          />
        </Reveal>
        <div className="grid grid-cols-2 content-center gap-3">
          {lecciones.map((l, k) => {
            const Icon = l.icon
            const on = activo === l.id
            return (
              <Reveal key={l.id} delay={0.25 + k * 0.07} className="h-full">
                <div className="h-full" onMouseEnter={() => setActivo(l.id)} onMouseLeave={() => setActivo(null)}>
                  <Card glow={`color-mix(in oklab, ${EMBER} 22%, transparent)`} className={`flex h-full gap-4 p-4 transition-colors duration-300 ${on ? 'border-ember/60 bg-ember/10' : ''}`}>
                    <div className="grid size-12 shrink-0 place-items-center rounded-xl border border-ember/30 bg-ember/10 text-ember">
                      <Icon size={22} />
                    </div>
                    <div>
                      <div className="mb-1 text-[22px] leading-tight font-semibold text-fg">{l.label}</div>
                      <p className="text-[22px] leading-snug text-dim">{l.descripcion}</p>
                    </div>
                  </Card>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
      <Reveal delay={0.7}>
        <div className="mb-5 flex items-center gap-5 rounded-2xl border border-line bg-panel/60 px-7 py-4">
          <Radar size={26} className="shrink-0 text-defense" />
          <p className="text-[22px] leading-snug text-fg/90">{c.conexion_con_escaneo_de_puertos}</p>
        </div>
        <p className="text-[50px] leading-[1.05] font-semibold tracking-[-0.04em] text-fg">
          {a} <span className="font-serif font-normal text-ember italic">{b}</span>
        </p>
      </Reveal>
    </Slide>
  )
}

/* 21 — Sources (consolidated) */
type Ref = { fuente: string; tema?: string; url?: string }

export function Sources() {
  const s = S[20]
  const c = s.contenido
  const cols: [string, Ref[], string][] = [
    ['Escaneo de puertos', c.escaneo_de_puertos!, DEF],
    ['Black October', c.black_october!, EMBER],
    ['Seguridad e IA', c.seguridad_e_inteligencia_artificial!, 'var(--color-assess)'],
  ]
  return (
    <Slide n={21} part="bo" label={s.titulo}>
      <Title title={s.titulo} size={88} className="mb-8" />
      <div className="grid flex-1 grid-cols-3 gap-10">
        {cols.map(([name, refs, col], ci) => (
          <Reveal key={name} delay={0.15 + ci * 0.1}>
            <h3 className="mb-5 flex items-center gap-3 font-mono text-[15px] tracking-[0.22em] uppercase" style={{ color: col }}>
              <span className="h-px w-8" style={{ background: col }} /> {name}
            </h3>
            <ul className="space-y-3.5">
              {refs.map((r) => (
                <li key={r.fuente + (r.url ?? r.tema)} className="border-b border-line/70 pb-3">
                  <div className="text-[18px] font-medium text-fg">{r.fuente}</div>
                  {r.tema && <div className="text-[15px] text-dim">{r.tema}</div>}
                  {r.url && (
                    <a href={r.url} target="_blank" rel="noreferrer" className="mt-0.5 flex items-center gap-1.5 truncate font-mono text-[12.5px] text-faint hover:text-fg">
                      <ExternalLink size={12} className="shrink-0" /> {r.url.replace(/^https?:\/\//, '')}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
      <Reveal delay={0.6}>
        <p className="mt-6 text-[16px] text-faint">* {P.nota_de_verificacion}</p>
      </Reveal>
    </Slide>
  )
}
