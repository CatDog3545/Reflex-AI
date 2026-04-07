import { create } from 'zustand'
import type { TimerSession, BackgroundConfig, TimerStatus } from '../types'
import { STORAGE_KEY, MENTORS } from '../utils/constants'
import { loadFromStorage, saveToStorage } from '../utils/helpers'

interface TimerStore {
  timer: TimerSession | null
  selectedCategory: string | null
  selectedDuration: number
  selectedBackground: BackgroundConfig
  selectedMentor: string
  onboarded: boolean

  setCategory: (id: string) => void
  setDuration: (seconds: number) => void
  setBackground: (bg: BackgroundConfig) => void
  setMentor: (id: string) => void
  startTimer: () => void
  pauseTimer: () => void
  resumeTimer: () => void
  resetTimer: () => void
  completeTimer: () => void
  tick: () => void
  setOnboarded: (v: boolean) => void
  restoreState: () => void
}

export const useTimerStore = create<TimerStore>((set, get) => ({
  timer: null,
  selectedCategory: null,
  selectedDuration: 25 * 60,
  selectedBackground: {
    type: 'gradient',
    value: 'linear-gradient(135deg, #0c0c0c 0%, #1a1a2e 50%, #16213e 100%)',
  },
  selectedMentor: 'none',
  onboarded: loadFromStorage('reflex-onboarded', false),

  setCategory: (id) => {
    set({ selectedCategory: id })
    saveToStorage(STORAGE_KEY, { ...get(), selectedCategory: id })
  },

  setDuration: (seconds) => {
    set({ selectedDuration: seconds })
  },

  setBackground: (bg) => {
    set({ selectedBackground: bg })
    saveToStorage(STORAGE_KEY, { ...get(), selectedBackground: bg })
  },

  setMentor: (id) => {
    set({ selectedMentor: id })
    saveToStorage(STORAGE_KEY, { ...get(), selectedMentor: id })
  },

  startTimer: () => {
    const { selectedCategory, selectedDuration } = get()
    const session: TimerSession = {
      categoryId: selectedCategory || 'study',
      duration: selectedDuration,
      startTime: Date.now(),
      elapsed: 0,
      status: 'running',
    }
    set({ timer: session })
    saveToStorage(STORAGE_KEY, { ...get(), timer: session })
  },

  pauseTimer: () => {
    const { timer } = get()
    if (!timer) return
    const updated = { ...timer, status: 'paused' as TimerStatus }
    set({ timer: updated })
    saveToStorage(STORAGE_KEY, { ...get(), timer: updated })
  },

  resumeTimer: () => {
    const { timer } = get()
    if (!timer) return
    const updated = { ...timer, status: 'running' as TimerStatus }
    set({ timer: updated })
    saveToStorage(STORAGE_KEY, { ...get(), timer: updated })
  },

  resetTimer: () => {
    set({ timer: null })
    localStorage.removeItem(STORAGE_KEY)
  },

  completeTimer: () => {
    const { timer } = get()
    if (!timer) return
    const updated = { ...timer, status: 'completed' as TimerStatus, elapsed: timer.duration }
    set({ timer: updated })
    saveToStorage(STORAGE_KEY, { ...get(), timer: updated })
  },

  tick: () => {
    const { timer } = get()
    if (!timer || timer.status !== 'running') return
    const elapsed = Math.floor((Date.now() - (timer.startTime || Date.now())) / 1000)
    const updated = { ...timer, elapsed }

    if (elapsed >= timer.duration) {
      updated.status = 'completed'
      updated.elapsed = timer.duration
    }

    set({ timer: updated })
  },

  setOnboarded: (v) => {
    set({ onboarded: v })
    localStorage.setItem('reflex-onboarded', JSON.stringify(v))
  },

  restoreState: () => {
    const saved = loadFromStorage<Record<string, any> | null>(STORAGE_KEY, null)
    if (saved) {
      set({
        selectedCategory: saved.selectedCategory || null,
        selectedDuration: saved.selectedDuration || 25 * 60,
        selectedBackground: saved.selectedBackground || {
          type: 'gradient',
          value: 'linear-gradient(135deg, #0c0c0c 0%, #1a1a2e 50%, #16213e 100%)',
        },
        selectedMentor: saved.selectedMentor || 'none',
        timer: saved.timer || null,
      })
    }
  },
}))
