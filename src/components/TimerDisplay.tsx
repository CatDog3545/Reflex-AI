import { motion } from 'framer-motion'
import { formatTime } from '../utils/helpers'

interface TimerDisplayProps {
  seconds: number
  total: number
  progress: number
  size?: 'sm' | 'md' | 'lg'
}

export function TimerDisplay({ seconds, total, progress, size = 'lg' }: TimerDisplayProps) {
  const radius = size === 'lg' ? 140 : size === 'md' ? 100 : 60
  const strokeWidth = size === 'lg' ? 6 : size === 'md' ? 5 : 4
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (progress / 100) * circumference
  const textSize = size === 'lg' ? 'text-7xl' : size === 'md' ? 'text-5xl' : 'text-3xl'

  return (
    <div className="relative flex items-center justify-center">
      <svg
        width={radius * 2 + strokeWidth * 2}
        height={radius * 2 + strokeWidth * 2}
        className="transform -rotate-90"
      >
        <circle
          cx={radius + strokeWidth}
          cy={radius + strokeWidth}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth={strokeWidth}
        />
        <motion.circle
          cx={radius + strokeWidth}
          cy={radius + strokeWidth}
          r={radius}
          fill="none"
          stroke="url(#progressGradient)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        />
        <defs>
          <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#667eea" />
            <stop offset="100%" stopColor="#764ba2" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute flex flex-col items-center">
        <motion.span
          key={seconds}
          initial={{ scale: 1.05, opacity: 0.8 }}
          animate={{ scale: 1, opacity: 1 }}
          className={`${textSize} font-light text-white tracking-tight tabular-nums`}
        >
          {formatTime(seconds)}
        </motion.span>
        <span className="text-xs text-white/40 mt-2 uppercase tracking-widest">
          {Math.round(progress)}%
        </span>
      </div>
    </div>
  )
}
