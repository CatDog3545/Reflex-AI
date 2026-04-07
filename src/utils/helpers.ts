export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}

export const SOUNDS = {
  tick: '/sounds/tick.mp3',
  complete: '/sounds/complete.mp3',
  click: '/sounds/click.mp3',
  mentorIdle: '/sounds/mentor-idle.mp3',
  mentorWorking: '/sounds/mentor-working.mp3',
  mentorDone: '/sounds/mentor-done.mp3',
}

export function vibrate(pattern: number | number[] = 50): void {
  if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
    navigator.vibrate(pattern)
  }
}

export function playSound(type: 'tick' | 'complete' | 'click' = 'click'): void {
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.connect(gain)
    gain.connect(ctx.destination)

    switch (type) {
      case 'tick':
        osc.frequency.value = 800
        gain.gain.value = 0.05
        osc.start()
        osc.stop(ctx.currentTime + 0.05)
        break
      case 'complete':
        osc.frequency.value = 523.25
        gain.gain.value = 0.15
        osc.start()
        osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.15)
        osc.frequency.setValueAtTime(783.99, ctx.currentTime + 0.3)
        osc.stop(ctx.currentTime + 0.5)
        break
      case 'click':
        osc.frequency.value = 600
        gain.gain.value = 0.03
        osc.start()
        osc.stop(ctx.currentTime + 0.03)
        break
    }

    setTimeout(() => ctx.close(), 1000)
  } catch {
    // Audio not supported
  }
}

export function saveToStorage(key: string, data: any): void {
  try {
    localStorage.setItem(key, JSON.stringify(data))
  } catch {
    // Storage full or unavailable
  }
}

export function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

export function getProgress(elapsed: number, total: number): number {
  if (total === 0) return 0
  return Math.min((elapsed / total) * 100, 100)
}
