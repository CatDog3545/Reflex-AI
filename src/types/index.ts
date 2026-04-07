export type TimerStatus = 'idle' | 'running' | 'paused' | 'completed'

export interface Category {
  id: string
  name: string
  icon: string
  color: string
  presetDurations: number[]
}

export interface BackgroundConfig {
  type: 'solid' | 'gradient' | 'image'
  value: string
}

export interface MentorConfig {
  id: string
  name: string
  emoji: string
  animation?: string
  video?: string
}

export interface TimerSession {
  categoryId: string
  duration: number
  startTime: number | null
  elapsed: number
  status: TimerStatus
}

export interface AppState {
  timer: TimerSession | null
  lastCategory: string | null
  onboarded: boolean
}
