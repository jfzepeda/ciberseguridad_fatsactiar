import { motion } from 'framer-motion'
import { Bot, Cpu, ExternalLink, KeyRound, LifeBuoy, Package, Radar, RefreshCw, ShieldCheck, ShieldMinus, Terminal } from 'lucide-react'
import { BorderBeam } from '@/components/ui/border-beam'
import { TextShimmer } from '@/components/ui/text-shimmer'
import { Card, KeyMessage, P, Reveal, S, Slide, Title } from '@/kit'
import { SystemStatusBlock } from '@/components/ui/system-status-block'
import { LinearCard } from '@/components/ui/linear-card'
import { RadialOrbitalTimeline } from '@/components/ui/radial-orbital-timeline'
import { OrbitRingStats } from '@/components/ui/orbit-ring-stats'
import { useState } from 'react'
import { BentoGrid01 } from '@/components/ui/bento-grid-01'
import { CaseStudyBento } from '@/components/ui/casestudy-bento'

const A = S.slice(13)
const EMBER = 'var(--color-ember)'
const DEF = 'var(--color-defense)'

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
  return (
    <Slide n={14} part="bo" bg="aurora">
      <div className="grid h-full grid-cols-[1fr_720px] gap-16">
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
            <div className="relative rounded-[28px] border border-line bg-panel/70 p-8 backdrop-blur">
              <BorderBeam size={160} duration={8} colorFrom="#ff8a3d" colorTo="#ff3d71" />
              <div className="mb-4 flex justify-between font-mono text-[14px] tracking-[0.22em] text-dim uppercase">
                <span>octubre · 2026</span>
                <span className="text-ember">● incidentes</span>
              </div>
              <div className="grid grid-cols-7 gap-2 text-center font-mono text-[18px]">
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
                      className="grid h-[48px] place-items-center rounded-lg"
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
      <Title title={s.titulo} size={62} className="mb-3" />
      <Reveal delay={0.15} className="mb-6">
        <OrbitRingStats columns={2} rings={brechas.map((x, k) => ({
          label: x.empresa,
          value: ['3.2 M', '1.85%', '1.107.0', '1.4%'][k] ?? x.metrica_principal,
          unit: ['registros de variables de entorno', 'workspaces en alcance máximo', 'versión maliciosa de LiteLLM', 'usuarios vinculados afectados'][k] ?? x.unidad,
          note: [
            'Acceso confirmado a 101 servidores de Google Cloud.',
            'Alcance potencial; no confirma robo en todos los workspaces.',
            'Paquete comprometido distribuyó robo de credenciales.',
            'Claves API expuestas y cargos no autorizados.',
          ][k],
        }))} />
      </Reveal>
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
      <Title title={s.titulo} size={72} className="mb-4" />
      <div className="mt-6">
        <SystemStatusBlock
          accent={EMBER}
          items={incidents.map((x) => ({ title: x.empresa, date: `${x.fecha.slice(-2)} OCT`, label: x.categoria, detail: x.riesgo }))}
        />
      </div>
      <KeyMessage color={EMBER} delay={1.2} className="mt-6">{c.mensaje_clave}</KeyMessage>
    </Slide>
  )
}

/* 17 — Three critical vulnerabilities */
export function Vulns() {
  const s = A[3]
  const c = s.contenido
  const summaries: Record<string, string> = {
    PHP2Shell: 'Una entrada manipulada puede ejecutar código remoto sin autenticación.',
    'Node.js / Brotli': 'Datos Brotli manipulados pueden corromper memoria.',
    eMudhra: 'Claves recuperables de 8 CA amenazaron TLS y firma digital.',
  }
  return (
    <Slide n={17} part="bo">
      <Title title={s.titulo} size={72} className="mb-4" />
      <div className="grid flex-1 grid-cols-3 gap-6">
        {(c.vulnerabilidades as unknown as Vuln[]).map((v, k) => (
          <Reveal key={v.nombre} delay={0.2 + k * 0.12} className="flex h-full min-h-0 flex-col">
            <LinearCard
              index={String(k + 1).padStart(2, '0')}
              category={v.categoria}
              title={v.nombre}
              identifiers={v.identificadores}
              description={summaries[v.nombre] ?? v.descripcion}
              visual={[<Terminal key="terminal" size={132} strokeWidth={1.1} />, <Cpu key="cpu" size={132} strokeWidth={1.1} />, <KeyRound key="key" size={132} strokeWidth={1.1} />][k]}
              impact={[]}
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
  const summaries = [
    'RCE crítica en instalaciones autogestionadas vulnerables.',
    'Inyección SQL sin autenticación en Oracle E-Business Suite.',
    'Falla de firmware que afecta el arranque por red PXE.',
  ]
  const [first, second, third] = (c.vulnerabilidades as unknown as Vuln[]).map((v, k) => ({
    ...v,
    descripcion: summaries[k] ?? v.descripcion,
    impacto: v.impacto.slice(0, 1),
  }))
  return (
    <Slide n={18} part="bo">
      <Title title={s.titulo} size={72} className="mb-3" />
      <Reveal delay={0.2} className="flex min-h-0 flex-1 flex-col">
        <CaseStudyBento featured={first} items={[second, third]} />
      </Reveal>
      <KeyMessage color={EMBER} delay={0.8} className="mt-6">{c.mensaje_clave}</KeyMessage>
    </Slide>
  )
}

/* 19 — AI speed */
type Fase = { fase: string; actividad: string }

export function AISpeed() {
  const s = A[5]
  const c = s.contenido
  const cmp = c.comparacion as { ataque_tradicional: Fase[]; ataque_asistido_por_ia: Fase[] }
  const trad = cmp.ataque_tradicional
  const ai = cmp.ataque_asistido_por_ia
  const resumen = [
    ['Lista servicios expuestos', 'Clasifica activos automáticamente'],
    ['Revisa versiones y avisos', 'Correlaciona vulnerabilidades'],
    ['Adapta scripts manualmente', 'Genera scripts con asistencia'],
    ['Interpreta resultados', 'Procesa más datos en menos tiempo'],
  ]
  return (
    <Slide n={19} part="bo">
      <Title title={s.titulo} size={56} className="mb-3" />
      <BentoGrid01
        className="flex-1"
        cells={[{
          id: 'fases',
          span: 'col-span-12 row-span-3',
          color: EMBER,
          delay: 0.1,
          children: (
            <div className="grid flex-1 grid-cols-4 gap-8">
              {trad.map((t, k) => (
                <div key={t.fase} className="flex flex-col justify-center">
                  <div className="mb-8 text-[30px] leading-tight font-semibold text-fg">{t.fase}</div>
                  <div className="mb-8">
                    <div className="mb-2 font-mono text-[18px] tracking-[0.14em] text-dim uppercase">Tradicional</div>
                    <p className="min-h-[64px] text-[24px] leading-snug text-dim">{resumen[k]?.[0] ?? t.actividad}</p>
                    <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-line">
                      <motion.div className="h-full rounded-full bg-dim/60" initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ delay: 0.5 + k * 0.1, duration: 4, ease: 'linear' }} />
                    </div>
                  </div>
                  <div>
                    <div className="mb-2 font-mono text-[18px] tracking-[0.14em] text-ember uppercase">Con IA</div>
                    <p className="min-h-[64px] text-[24px] leading-snug text-fg/90">{resumen[k]?.[1] ?? ai[k].actividad}</p>
                    <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-line">
                      <motion.div className="h-full rounded-full bg-gradient-to-r from-ember to-threat" initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ delay: 0.5 + k * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ),
        }]}
      />
      <Reveal delay={0.7} className="mt-4">
        <p className="text-[16px] leading-snug text-dim">* La comparación no implica que todos los incidentes de Black October usaran IA.</p>
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
  const lecciones = c.aprendizajes!.map((l, k) => ({ id: k + 1, label: l.titulo, icon: lessonIcons[k] ?? ShieldCheck }))
  return (
    <Slide n={20} part="bo" bg="aurora">
      <Title title={s.titulo} size={72} className="mb-5" />
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
                      <div className="text-[28px] leading-tight font-semibold text-fg">{l.label}</div>
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
          <p className="text-[22px] leading-snug text-fg/90">El escaneo revela servicios expuestos; dependencias y credenciales amplían el riesgo.</p>
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
    ['Black October · incidentes', c.black_october!.slice(0, 4), EMBER],
    ['Black October · vulnerabilidades', c.black_october!.slice(4), EMBER],
    ['Seguridad e IA', c.seguridad_e_inteligencia_artificial!, 'var(--color-assess)'],
  ]
  return (
    <Slide n={21} part="bo" label={s.titulo}>
      <Title title={s.titulo} size={88} className="mb-8" />
      <div className="grid flex-1 grid-cols-4 gap-8">
        {cols.map(([name, refs, col], ci) => (
          <Reveal key={name} delay={0.15 + ci * 0.1}>
            <h3 className="mb-5 flex items-center gap-3 font-mono text-[15px] tracking-[0.22em] uppercase" style={{ color: col }}>
              <span className="h-px w-8" style={{ background: col }} /> {name}
            </h3>
            <ul className="space-y-4">
              {refs.map((r) => (
                <li key={r.fuente + (r.url ?? r.tema)} className="border-b border-line/70 pb-3">
                  <div className="text-[20px] font-medium text-fg">{r.fuente}</div>
                  {r.tema && <div className="text-[16px] leading-snug text-dim">{r.tema}</div>}
                  {r.url && (
                    <a href={r.url} target="_blank" rel="noreferrer" className="mt-1 flex items-center gap-1.5 truncate font-mono text-[14px] text-dim hover:text-fg">
                      <ExternalLink size={14} className="shrink-0" /> {r.url.replace(/^https?:\/\//, '')}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
      <Reveal delay={0.6}>
        <p className="mt-6 text-[18px] leading-snug text-dim">* {P.nota_de_verificacion}</p>
      </Reveal>
    </Slide>
  )
}
