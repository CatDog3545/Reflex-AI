import { motion } from 'framer-motion'
import { BACKGROUNDS } from '../utils/constants'
import type { BackgroundConfig } from '../types'

interface BackgroundPickerProps {
  selected: BackgroundConfig
  onSelect: (bg: BackgroundConfig) => void
}

export function BackgroundPicker({ selected, onSelect }: BackgroundPickerProps) {
  return (
    <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
      {BACKGROUNDS.map((bg, i) => {
        const isSelected = selected.value === bg.value
        return (
          <motion.button
            key={i}
            whileTap={{ scale: 0.9 }}
            onClick={() => onSelect({ type: bg.type, value: bg.value })}
            className={`relative flex-shrink-0 w-14 h-14 rounded-xl overflow-hidden border-2 transition-all ${
              isSelected ? 'border-white/60 scale-110' : 'border-white/10'
            }`}
            title={bg.label}
          >
            <div className="w-full h-full" style={{ background: bg.value }} />
            {isSelected && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            )}
          </motion.button>
        )
      })}
    </div>
  )
}
