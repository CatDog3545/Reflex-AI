import { motion } from 'framer-motion'
import { formatTime } from '../utils/helpers'

interface DurationPickerProps {
  value: number
  onChange: (seconds: number) => void
  presets: number[]
}

export function DurationPicker({ value, onChange, presets }: DurationPickerProps) {
  const customMinutes = Math.floor(value / 60)

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2 justify-center">
        {presets.map((min) => (
          <motion.button
            key={min}
            whileTap={{ scale: 0.92 }}
            onClick={() => onChange(min * 60)}
            className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
              value === min * 60
                ? 'bg-white/20 text-white shadow-lg'
                : 'bg-white/10 text-white/60 hover:bg-white/15'
            }`}
          >
            {min} мин
          </motion.button>
        ))}
      </div>

      <div className="flex items-center justify-center gap-4">
        <button
          onClick={() => onChange(Math.max(60, value - 60))}
          className="w-10 h-10 rounded-full bg-white/10 text-white/60 text-xl flex items-center justify-center hover:bg-white/15 active:scale-95 transition-all"
        >
          −
        </button>
        <div className="text-3xl font-light text-white tabular-nums min-w-[80px] text-center">
          {formatTime(value)}
        </div>
        <button
          onClick={() => onChange(value + 60)}
          className="w-10 h-10 rounded-full bg-white/10 text-white/60 text-xl flex items-center justify-center hover:bg-white/15 active:scale-95 transition-all"
        >
          +
        </button>
      </div>
    </div>
  )
}
