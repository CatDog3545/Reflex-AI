import { motion } from 'framer-motion'
import { MENTORS } from '../utils/constants'

interface MentorPickerProps {
  selected: string
  onSelect: (id: string) => void
}

export function MentorPicker({ selected, onSelect }: MentorPickerProps) {
  return (
    <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
      {MENTORS.map((mentor) => {
        const isSelected = selected === mentor.id
        return (
          <motion.button
            key={mentor.id}
            whileTap={{ scale: 0.9 }}
            onClick={() => onSelect(mentor.id)}
            className={`flex flex-col items-center gap-1 flex-shrink-0 px-4 py-3 rounded-xl border-2 transition-all ${
              isSelected
                ? 'border-white/60 bg-white/15'
                : 'border-white/10 bg-white/5 hover:border-white/20'
            }`}
          >
            {mentor.video ? (
              <video
                src={mentor.video}
                autoPlay
                loop
                muted
                playsInline
                className="w-10 h-10 object-cover rounded-lg"
              />
            ) : (
              <span className="text-2xl">{mentor.emoji || '🚫'}</span>
            )}
            <span className="text-[10px] text-white/60">{mentor.name}</span>
          </motion.button>
        )
      })}
    </div>
  )
}
