import { motion, AnimatePresence } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'

interface VideoMentorProps {
  isActive: boolean
  size?: 'sm' | 'md' | 'lg'
}

export function VideoMentor({ isActive, size = 'lg' }: VideoMentorProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  const sizes = { sm: 60, md: 100, lg: 150 }
  const dimension = sizes[size]

  useEffect(() => {
    if (videoRef.current) {
      isActive ? videoRef.current.play().catch(() => {}) : videoRef.current.pause()
    }
  }, [isActive])

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        className="relative"
        style={{ width: dimension, height: dimension }}
      >
        <video
          ref={videoRef}
          src="/mentor/cat.mp4"
          autoPlay
          loop
          muted
          playsInline
          onLoadedData={() => setIsLoaded(true)}
          className="w-full h-full object-contain rounded-2xl"
          style={{ animation: isActive ? 'mentor-float 2s ease-in-out infinite' : 'none' }}
        />
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/10 rounded-2xl">
            <span className="text-2xl">🐱</span>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  )
}
