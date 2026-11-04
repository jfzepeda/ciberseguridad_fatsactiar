import { motion } from 'framer-motion'
import {
  Bot, Cpu, ExternalLink, KeyRound, LifeBuoy, Package, Radar, RefreshCw, ShieldCheck, ShieldMinus, TriangleAlert, Zap,
} from 'lucide-react'
import { BorderBeam } from '@/components/ui/border-beam'
import { TextShimmer } from '@/components/ui/text-shimmer'
import { Card, Chip, KeyMessage, P1, P2, Reveal, Slide, Title } from '@/kit'

const A = P2.diapositivas_anexadas
const EMBER = 'var(--color-ember)'
const THREAT = 'var(--color-threat)'
const DEF = 'var(--color-defense)'
const GLOW = '#ff8a3d26'

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
              {s.subtitulo}
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
  return (
    <Slide n={15} part="bo">
      <Title kicker={s.subtitulo} title={s.titulo} size={62} className="mb-3" />
      <Reveal delay={0.1}>
        <p className="mb-6 max-w-[1500px] text-[22px] text-dim">{c.introduccion}</p>
      </Reveal>
      <div className="grid flex-1 grid-cols-4 gap-5">
        {(c.incidentes as unknown as Breach[]).map((x, k) => {
          const note = x.consecuencia ?? x.aclaracion
          const fatal = !!x.consecuencia
          return (
            <Reveal key={x.empresa} delay={0.2 + k * 0.1}>
              <Card glow={GLOW} className="flex h-full flex-col p-7">
                <div className="mb-1 text-[26px] font-semibold text-fg">{x.empresa}</div>
                <div className="bg-gradient-to-br from-ember to-threat bg-clip-text text-[52px] leading-tight font-semibold tracking-[-0.04em] text-transparent">
                  {x.metrica_principal}
                </div>
                <div className="mb-4 font-mono text-[13px] tracking-[0.14em] text-dim uppercase">{x.unidad}</div>
                <p className="mb-3 text-[17px] leading-snug text-fg">{x.que_paso}</p>
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
                  <p className={`mt-3 rounded-xl px-3 py-2 text-[15px] leading-snug ${fatal ? 'bg-threat/15 font-medium text-threat' : 'bg-white/[0.03] text-faint'}`}>{note}</p>
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

/* 16 — Six more platforms (timeline) */
export function SixMore() {
  const s = A[2]
  const c = s.contenido
  return (
    <Slide n={16} part="bo">
      <Title kicker={s.subtitulo} title={s.titulo} size={80} className="mb-4" />
      <Reveal delay={0.1}>
        <p className="max-w-[1400px] text-[24px] text-dim">{c.introduccion}</p>
      </Reveal>
      <div className="relative mt-10">
        <motion.div
          className="absolute top-[34px] left-0 h-px bg-gradient-to-r from-ember via-threat to-ember"
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ delay: 0.3, duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        />
        <div className="grid grid-cols-6 items-stretch gap-5">
          {incidents.map((x, k) => (
            <Reveal key={x.empresa} delay={0.4 + k * 0.12} className="flex flex-col">
              <div className="mb-6 flex items-center gap-3">
                <span className="relative flex size-4">
                  <span className="absolute inset-0 animate-pulse-ring rounded-full bg-ember" />
                  <span className="relative size-4 rounded-full border-2 border-ink bg-ember" />
                </span>
                <span className="font-mono text-[22px] font-medium text-fg">
                  {x.fecha.slice(-2)} <span className="text-dim">OCT</span>
                </span>
              </div>
              <Card glow={GLOW} className="flex-1 p-6">
                <div className="mb-2 text-[26px] font-semibold tracking-tight text-fg">{x.empresa}</div>
                <div className="mb-4 font-mono text-[12px] leading-snug tracking-[0.12em] text-ember uppercase">{x.categoria}</div>
                <p className="mb-4 text-[17px] leading-snug text-fg/90">{x.incidente}</p>
                <p className="text-[15px] leading-snug text-dim">
                  <TriangleAlert size={15} className="mr-1.5 inline -translate-y-px text-threat" />
                  {x.riesgo}
                </p>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
      <Reveal delay={1.1} className="mt-8 flex flex-wrap items-center gap-3">
        <span className="mr-2 font-mono text-[14px] tracking-[0.2em] text-dim uppercase">Patrón común</span>
        {c.patron_comun!.map((p) => (
          <Chip key={p} color={THREAT} className="normal-case tracking-normal text-[16px]">{p}</Chip>
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
      <Title kicker={s.subtitulo} title={s.titulo} size={80} className="mb-4" />
      <Reveal delay={0.1}>
        <p className="mb-5 max-w-[1500px] text-[21px] text-dim">{c.introduccion}</p>
      </Reveal>
      <div className="grid flex-1 grid-cols-3 gap-6">
        {(c.vulnerabilidades as unknown as Vuln[]).map((v, k) => {
          const ids = v.identificadores
          const datos = v.datos
          const foot = v.alcance ?? v.respuesta
          return (
            <Reveal key={v.nombre} delay={0.2 + k * 0.12}>
              <Card glow={GLOW} className="flex h-full flex-col p-7">
                <Chip color={THREAT} className="mb-3 self-start text-[12px]">{v.categoria}</Chip>
                <h3 className="mb-2 text-[34px] leading-none font-semibold tracking-tight text-fg">{v.nombre}</h3>
                <div className="mb-2 flex flex-wrap gap-2">
                  {ids?.map((id) => (
                    <span key={id} className="rounded-md border border-line bg-ink px-2 py-0.5 font-mono text-[14px] text-ember">{id}</span>
                  ))}
                  {datos && (
                    <div className="flex items-center gap-1.5">
                      {Array.from({ length: 8 }, (_, i) => (
                        <span key={i} className={`size-[18px] rounded-[5px] ${i < 6 ? 'bg-ember' : 'bg-threat'}`} />
                      ))}
                    </div>
                  )}
                </div>
                {datos && <p className="mb-2 font-mono text-[13px] leading-relaxed text-dim">{datos.join(' · ')}</p>}
                <p className="mb-3 text-[16px] leading-snug text-fg/90">{v.descripcion}</p>
                <div className="mb-3 space-y-0">
                  {v.mecanismo?.map((m, i) => (
                    <div key={m} className="relative flex gap-3 pb-2">
                      {i < 2 && <span className="absolute top-6 left-[11px] h-[calc(100%-18px)] w-px bg-line" />}
                      <span className="grid size-6 shrink-0 place-items-center rounded-full border border-ember/50 font-mono text-[12px] text-ember">{i + 1}</span>
                      <span className="text-[15px] leading-snug text-dim">{m}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-auto flex flex-wrap gap-2">
                  {v.impacto.map((x) => (
                    <span key={x} className="rounded-full bg-threat/10 px-3 py-1 text-[14px] text-threat">{x}</span>
                  ))}
                </div>
                {foot && <p className="mt-3 border-t border-line pt-3 text-[14px] leading-snug text-faint">{foot}</p>}
              </Card>
            </Reveal>
          )
        })}
      </div>
      <KeyMessage color={EMBER} delay={0.8} className="mt-6">{c.mensaje_clave}</KeyMessage>
    </Slide>
  )
}

/* 18 — Three more flaws */
export function MoreFlaws() {
  const s = A[4]
  const c = s.contenido
  return (
    <Slide n={18} part="bo">
      <Title kicker={s.subtitulo} title={s.titulo} size={72} className="mb-3" />
      <Reveal delay={0.1}>
        <p className="mb-5 text-[22px] text-dim">{c.introduccion}</p>
      </Reveal>
      <div className="flex flex-col gap-4">
        {(c.vulnerabilidades as unknown as Vuln[]).map((v, k) => {
          const sev = v.severidad ?? ''
          const cvss = parseFloat(sev.replace(/[^\d.]/g, ''))
          return (
            <Reveal key={v.nombre} delay={0.2 + k * 0.12}>
              <Card glow={GLOW} className="grid grid-cols-[400px_1fr_400px] items-center gap-10 px-7 py-5">
                <div>
                  <div className="mb-3 flex items-center gap-3">
                    <Chip color={THREAT} className="text-[12px]">{v.categoria}</Chip>
                  </div>
                  <h3 className="mb-3 text-[32px] leading-none font-semibold tracking-tight text-fg">{v.nombre}</h3>
                  <div className="flex flex-wrap gap-2">
                    {v.identificadores?.map((id) => (
                      <span key={id} className="rounded-md border border-line bg-ink px-2 py-0.5 font-mono text-[14px] text-ember">{id}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="mb-3 flex items-center gap-4">
                    <span className="font-mono text-[22px] font-semibold text-threat">{sev}</span>
                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-line">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-ember to-threat"
                        initial={{ width: 0 }}
                        animate={{ width: `${Number.isFinite(cvss) ? cvss * 10 : 100}%` }}
                        transition={{ delay: 0.6 + k * 0.15, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                      />
                    </div>
                  </div>
                  <p className="mb-3 text-[19px] leading-snug text-fg/90">{v.descripcion}</p>
                  <div className="flex flex-wrap gap-2">
                    {v.impacto.map((x) => (
                      <span key={x} className="rounded-full bg-threat/10 px-3 py-1 text-[14px] text-threat">{x}</span>
                    ))}
                  </div>
                </div>
                <div className="flex items-start gap-4 rounded-2xl border border-defense/25 bg-defense/[0.06] p-5">
                  <ShieldCheck size={28} className="shrink-0 text-defense" />
                  <p className="text-[18px] leading-snug text-fg">{v.mitigacion}</p>
                </div>
              </Card>
            </Reveal>
          )
        })}
      </div>
      <KeyMessage color={EMBER} delay={0.8} className="mt-6">{c.mensaje_clave}</KeyMessage>
    </Slide>
  )
}

/* 19 — AI speed */
export function AISpeed() {
  const s = A[5]
  const c = s.contenido
  const cmp = c.comparacion!
  const trad = cmp.ataque_tradicional
  const ai = cmp.ataque_asistido_por_ia
  return (
    <Slide n={19} part="bo">
      <Title kicker={s.subtitulo} title={s.titulo} size={56} className="mb-3" />
      <Reveal delay={0.1}>
        <p className="mb-6 max-w-[1500px] text-[22px] text-dim">{c.introduccion}</p>
      </Reveal>
      <div className="grid grid-cols-[1fr_620px] gap-8">
        <Reveal delay={0.2}>
          <div className="rounded-3xl border border-line bg-panel/70 p-6">
            <div className="mb-3 grid grid-cols-[220px_1fr_1fr] gap-5 font-mono text-[13px] tracking-[0.2em] uppercase">
              <span className="text-faint">Fase</span>
              <span className="text-dim">Ataque tradicional</span>
              <span className="text-ember">Ataque asistido por IA</span>
            </div>
            {trad.map((t, k) => (
              <div key={t.fase} className="grid grid-cols-[220px_1fr_1fr] gap-5 border-t border-line py-3.5">
                <span className="text-[19px] font-semibold text-fg">{t.fase}</span>
                <div>
                  <p className="mb-2 text-[15px] leading-snug text-dim">{t.actividad}</p>
                  <div className="h-1.5 overflow-hidden rounded-full bg-line">
                    <motion.div className="h-full rounded-full bg-dim/60" initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ delay: 0.5 + k * 0.1, duration: 4, ease: 'linear' }} />
                  </div>
                </div>
                <div>
                  <p className="mb-2 text-[15px] leading-snug text-fg/90">{ai[k].actividad}</p>
                  <div className="h-1.5 overflow-hidden rounded-full bg-line">
                    <motion.div className="h-full rounded-full bg-gradient-to-r from-ember to-threat" initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ delay: 0.5 + k * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
        <div className="grid grid-cols-2 gap-4">
          {c.riesgos!.map((r, k) => (
            <Reveal key={r.nombre} delay={0.3 + k * 0.08}>
              <Card glow={GLOW} className="h-full p-5">
                <Zap size={20} className="mb-2 text-threat" />
                <div className="mb-1.5 text-[19px] leading-tight font-semibold text-fg">{r.nombre}</div>
                <p className="text-[14.5px] leading-snug text-dim">{r.descripcion}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
      <Reveal delay={0.7} className="mt-5 flex flex-wrap items-center gap-2.5">
        <span className="mr-2 flex items-center gap-2 font-mono text-[13px] tracking-[0.2em] text-defense uppercase">
          <ShieldCheck size={16} /> Aplicaciones defensivas
        </span>
        {c.aplicaciones_defensivas!.map((x) => (
          <Chip key={x} color={DEF} className="text-[14px] normal-case tracking-normal">{x}</Chip>
        ))}
      </Reveal>
      <Reveal delay={0.8} className="mt-4 grid grid-cols-2 gap-8 text-[14.5px] leading-snug text-faint">
        <p>
          <Cpu size={14} className="mr-1.5 inline -translate-y-px" />
          {c.limitaciones}
        </p>
        <p>* {c.aclaracion}</p>
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
  const [a, b] = c.mensaje_clave!.split(/(?<=\.)\s+/)
  return (
    <Slide n={20} part="bo" bg="aurora">
      <Title kicker={s.subtitulo} title={s.titulo} size={84} className="mb-4" />
      <Reveal delay={0.1}>
        <p className="mb-8 max-w-[1500px] text-[23px] text-dim">{c.introduccion}</p>
      </Reveal>
      <div className="grid grid-cols-3 gap-5">
        {c.aprendizajes!.map((l, k) => {
          const Icon = lessonIcons[k] ?? ShieldCheck
          return (
            <Reveal key={l.titulo} delay={0.2 + k * 0.07}>
              <Card glow="#2ee6d626" className="flex h-full gap-5 p-6">
                <div className="grid size-12 shrink-0 place-items-center rounded-xl border border-defense/30 bg-defense/10 text-defense">
                  <Icon size={24} />
                </div>
                <div>
                  <div className="mb-1 text-[22px] font-semibold text-fg">{l.titulo}</div>
                  <p className="text-[16.5px] leading-snug text-dim">{l.descripcion}</p>
                </div>
              </Card>
            </Reveal>
          )
        })}
      </div>
      <Reveal delay={0.7} className="mt-6">
        <div className="flex items-center gap-5 rounded-2xl border border-line bg-panel/60 px-7 py-4">
          <Radar size={26} className="shrink-0 text-defense" />
          <p className="text-[19px] leading-snug text-fg/90">{c.conexion_con_escaneo_de_puertos}</p>
        </div>
      </Reveal>
      <Reveal delay={0.9} className="mt-auto">
        <p className="text-[62px] leading-[1] font-semibold tracking-[-0.04em] text-fg">
          {a} <span className="font-serif font-normal text-ember italic">{b}</span>
        </p>
      </Reveal>
    </Slide>
  )
}

/* 21 — Sources (consolidated) */
type Ref = { fuente: string; tema?: string; url?: string }

export function Sources() {
  const s = P2.diapositiva_final
  const c = s.contenido
  const ps1 = P1.diapositivas.at(-1)!.contenido
  const portRefs: Ref[] = ps1.referencias!.map((r) => ({ fuente: r.nombre, url: r.url }))
  for (const r of c.escaneo_de_puertos) if (!portRefs.some((p) => p.url === r.url)) portRefs.push(r)
  const cols: [string, Ref[], string][] = [
    ['Escaneo de puertos', portRefs, DEF],
    ['Black October', c.black_october, EMBER],
    ['Seguridad e IA', c.seguridad_e_ia, 'var(--color-assess)'],
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
        <p className="mt-6 text-[16px] text-faint">* {ps1.nota}</p>
      </Reveal>
    </Slide>
  )
}
