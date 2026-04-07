import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useTimerStore } from '../store/timerStore'
import { TimerDisplay } from '../components/TimerDisplay'
import { CATEGORIES, MENTORS } from '../utils/constants'
import { getProgress, playSound, vibrate } from '../utils/helpers'

export function ActiveTimerPage() {
  const navigate = useNavigate()
  const { timer, selectedMentor, pauseTimer, resumeTimer, resetTimer, completeTimer, tick } =
    useTimerStore()
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (!timer || timer.status === 'completed') return

    if (timer.status === 'running') {
      intervalRef.current = setInterval(() => {
        tick()
      }, 250)
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [timer?.status, tick])

  useEffect(() => {
    if (timer?.status === 'completed') {
      playSound('complete')
      vibrate([100, 50, 100, 50, 200])
      setTimeout(() => navigate('/complete'), 800)
    }
  }, [timer?.status])

  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden && timer?.status === 'running') {
        tick()
      }
    }
    document.addEventListener('visibilitychange', handleVisibility)
    return () => document.removeEventListener('visibilitychange', handleVisibility)
  }, [timer?.status])

  if (!timer) {
    navigate('/')
    return null
  }

  const remaining = Math.max(timer.duration - timer.elapsed, 0)
  const progress = getProgress(timer.elapsed, timer.duration)
  const category = CATEGORIES.find((c) => c.id === timer.categoryId)
  const mentor = MENTORS.find((m) => m.id === selectedMentor)

  const handlePauseResume = () => {
    vibrate(15)
    playSound('click')
    if (timer.status === 'running') {
      pauseTimer()
    } else {
      resumeTimer()
    }
  }

  const handleReset = () => {
    vibrate(30)
    resetTimer()
    navigate('/')
  }

  const handleSkip = () => {
    completeTimer()
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      <AnimatePresence>
        {mentor && mentor.emoji && mentor.id !== 'none' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute top-20"
          >
            <motion.span
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
              className="text-5xl"
            >
              {mentor.emoji}
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mb-4">
        <span className="text-white/40 text-sm uppercase tracking-widest">
          {category?.icon} {category?.name}
        </span>
      </div>

      <TimerDisplay seconds={remaining} total={timer.duration} progress={progress} />

      <div className="mt-12 flex items-center gap-6">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={handleReset}
          className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center text-white/40 hover:bg-white/10 active:scale-90 transition-all"
          aria-label="Сбросить"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.92 }}
          onClick={handlePauseResume}
          className="w-20 h-20 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center text-white border border-white/20 hover:bg-white/20 active:scale-90 transition-all"
          aria-label={timer.status === 'running' ? 'Пауза' : 'Продолжить'}
        >
          {timer.status === 'running' ? (
            <svg className="w-8 h-8 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
              <rect x="6" y="4" width="4" height="16" rx="1" />
              <rect x="14" y="4" width="4" height="16" rx="1" />
            </svg>
          ) : (
            <svg className="w-8 h-8 ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={handleSkip}
          className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center text-white/40 hover:bg-white/10 active:scale-90 transition-all"
          aria-label="Завершить"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <rect x="6" y="6" width="12" height="12" rx="2" />
          </svg>
        </motion.button>
      </div>
    </div>
  )
}
