import { AnimatePresence, MotionConfig, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Maximize } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { slides } from './slides'

const W = 1920
const H = 1080

const fromHash = () => {
  const n = parseInt(location.hash.replace(/\D/g, ''), 10)
  return Number.isFinite(n) ? Math.min(Math.max(n - 1, 0), slides.length - 1) : 0
}

export default function App() {
  const [i, setI] = useState(fromHash)
  const [scale, setScale] = useState(1)

  const go = useCallback((d: number) => setI((c) => Math.min(Math.max(c + d, 0), slides.length - 1)), [])

  useEffect(() => {
    const fit = () => setScale(Math.min(innerWidth / W, innerHeight / H))
    fit()
    addEventListener('resize', fit)
    return () => removeEventListener('resize', fit)
  }, [])

  useEffect(() => {
    history.replaceState(null, '', `#${i + 1}`)
  }, [i])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (['ArrowRight', 'PageDown', ' ', 'Enter'].includes(e.key)) go(1)
      else if (['ArrowLeft', 'PageUp', 'Backspace'].includes(e.key)) go(-1)
      else if (e.key === 'Home') setI(0)
      else if (e.key === 'End') setI(slides.length - 1)
      else if (e.key.toLowerCase() === 'f') void (document.fullscreenElement ? document.exitFullscreen() : document.documentElement.requestFullscreen())
      else return
      e.preventDefault()
    }
    const onHash = () => setI(fromHash())
    addEventListener('keydown', onKey)
    addEventListener('hashchange', onHash)
    return () => {
      removeEventListener('keydown', onKey)
      removeEventListener('hashchange', onHash)
    }
  }, [go])

  const Current = slides[i]
  const ember = i >= 13

  return (
    <MotionConfig reducedMotion="user">
      <div className="group fixed inset-0 flex items-center justify-center bg-black">
        <div className="relative shrink-0 overflow-hidden" style={{ width: W * scale, height: H * scale }}>
          <div className="absolute top-0 left-0 origin-top-left" style={{ width: W, height: H, transform: `scale(${scale})` }}>
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div
                key={i}
                className="absolute inset-0"
                initial={{ opacity: 0, scale: 1.015 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.985 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              >
                <Current />
              </motion.div>
            </AnimatePresence>

            <div className="absolute inset-x-0 bottom-0 z-30 h-[3px] bg-white/5">
              <motion.div
                className="h-full"
                style={{ background: ember ? 'var(--color-ember)' : 'var(--color-defense)' }}
                animate={{ width: `${((i + 1) / slides.length) * 100}%` }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
          </div>
        </div>

        <nav className="fixed right-6 bottom-6 z-40 flex gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          {[
            { icon: ChevronLeft, label: 'Previous slide', on: () => go(-1) },
            { icon: ChevronRight, label: 'Next slide', on: () => go(1) },
            { icon: Maximize, label: 'Fullscreen (F)', on: () => void document.documentElement.requestFullscreen() },
          ].map(({ icon: Icon, label, on }) => (
            <button
              key={label}
              onClick={on}
              aria-label={label}
              title={label}
              className="grid size-11 place-items-center rounded-full border border-white/10 bg-white/5 text-white/70 backdrop-blur transition hover:bg-white/15 hover:text-white"
            >
              <Icon size={18} />
            </button>
          ))}
        </nav>
      </div>
    </MotionConfig>
  )
}
