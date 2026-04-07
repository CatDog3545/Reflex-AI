import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useTimerStore } from '../store/timerStore'
import { CATEGORIES } from '../utils/constants'
import { playSound, vibrate } from '../utils/helpers'

export function CompletePage() {
  const navigate = useNavigate()
  const { timer, resetTimer } = useTimerStore()

  const category = timer
    ? CATEGORIES.find((c) => c.id === timer.categoryId)
    : null

  const handleDone = () => {
    playSound('click')
    vibrate(10)
    resetTimer()
    navigate('/')
  }

  const handleRepeat = () => {
    playSound('click')
    vibrate([20, 30, 20])
    resetTimer()
    navigate('/setup')
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        className="text-8xl mb-8"
      >
        🎉
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-3xl font-light text-white mb-3"
      >
        Отлично!
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-white/50 text-center mb-2"
      >
        {category?.icon} {category?.name} завершена
      </motion.p>

      {timer && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-white/40 text-sm mb-12"
        >
          {Math.floor(timer.duration / 60)} минут фокуса
        </motion.p>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="flex flex-col gap-3 w-full max-w-xs"
      >
        <button
          onClick={handleRepeat}
          className="w-full py-4 bg-white/15 backdrop-blur-sm text-white rounded-2xl text-base font-medium border border-white/20 hover:bg-white/20 active:scale-[0.98] transition-all"
        >
          Повторить
        </button>
        <button
          onClick={handleDone}
          className="w-full py-4 bg-white/5 text-white/60 rounded-2xl text-base font-medium hover:bg-white/10 active:scale-[0.98] transition-all"
        >
          На главную
        </button>
      </motion.div>
    </div>
  )
}
