import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useTimerStore } from '../store/timerStore'
import { DurationPicker } from '../components/DurationPicker'
import { BackgroundPicker } from '../components/BackgroundPicker'
import { MentorPicker } from '../components/MentorPicker'
import { CATEGORIES } from '../utils/constants'
import { playSound, vibrate } from '../utils/helpers'

export function SetupPage() {
  const navigate = useNavigate()
  const {
    selectedCategory,
    selectedDuration,
    selectedBackground,
    selectedMentor,
    setDuration,
    setBackground,
    setMentor,
    startTimer,
  } = useTimerStore()

  const category = CATEGORIES.find((c) => c.id === selectedCategory) || CATEGORIES[0]

  const handleStart = () => {
    playSound('click')
    vibrate([20, 30, 20])
    startTimer()
    navigate('/timer')
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="px-6 pt-12 pb-4 flex items-center gap-4">
        <button
          onClick={() => {
            playSound('click')
            navigate('/')
          }}
          className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:bg-white/15 active:scale-95 transition-all"
        >
          ←
        </button>
        <div>
          <h1 className="text-2xl font-light text-white">
            {category.icon} {category.name}
          </h1>
        </div>
      </header>

      <main className="flex-1 px-6 pb-8 space-y-8 overflow-y-auto">
        <section>
          <h2 className="text-sm text-white/40 uppercase tracking-widest mb-3">Время</h2>
          <DurationPicker
            value={selectedDuration}
            onChange={setDuration}
            presets={category.presetDurations}
          />
        </section>

        <section>
          <h2 className="text-sm text-white/40 uppercase tracking-widest mb-3">Фон</h2>
          <BackgroundPicker selected={selectedBackground} onSelect={setBackground} />
        </section>

        <section>
          <h2 className="text-sm text-white/40 uppercase tracking-widest mb-3">Наставник</h2>
          <MentorPicker selected={selectedMentor} onSelect={setMentor} />
        </section>
      </main>

      <div className="px-6 pb-8 pt-4">
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={handleStart}
          className="w-full py-4 bg-white/15 backdrop-blur-sm text-white rounded-2xl text-lg font-medium border border-white/20 hover:bg-white/20 active:scale-[0.98] transition-all"
        >
          Запустить таймер
        </motion.button>
      </div>
    </div>
  )
}
