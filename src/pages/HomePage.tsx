import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { CategoryCard } from '../components/CategoryCard'
import { useTimerStore } from '../store/timerStore'
import { CATEGORIES } from '../utils/constants'
import { playSound, vibrate } from '../utils/helpers'

export function HomePage() {
  const navigate = useNavigate()
  const { selectedCategory, setCategory, restoreState } = useTimerStore()
  const [showOnboarding, setShowOnboarding] = useState(false)

  useEffect(() => {
    restoreState()
    const onboarded = localStorage.getItem('reflex-onboarded')
    if (!onboarded) {
      setShowOnboarding(true)
    }
  }, [])

  const handleSelect = (id: string) => {
    playSound('click')
    vibrate(10)
    setCategory(id)
    setTimeout(() => navigate('/setup'), 300)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <AnimatePresence>
        {showOnboarding && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-6"
            onClick={() => {
              setShowOnboarding(false)
              localStorage.setItem('reflex-onboarded', 'true')
            }}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 max-w-sm text-center border border-white/10"
            >
              <div className="text-6xl mb-4">⏱️</div>
              <h2 className="text-2xl font-light text-white mb-3">Добро пожаловать</h2>
              <p className="text-white/60 text-sm leading-relaxed mb-6">
                Выберите категорию, настройте таймер и начните фокусироваться.
                Просто и красиво.
              </p>
              <button className="px-8 py-3 bg-white/20 text-white rounded-xl font-medium hover:bg-white/30 active:scale-95 transition-all">
                Начать
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <header className="px-6 pt-12 pb-4">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-light text-white"
        >
          Reflex Timer
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-white/40 text-sm mt-1"
        >
          Выберите категорию
        </motion.p>
      </header>

      <main className="flex-1 px-6 pb-8">
        <div className="grid grid-cols-2 gap-3">
          {CATEGORIES.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <CategoryCard
                category={cat}
                isSelected={selectedCategory === cat.id}
                onSelect={handleSelect}
              />
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  )
}
