import { motion } from 'framer-motion'
import type { Category } from '../types'

interface CategoryCardProps {
  category: Category
  isSelected: boolean
  onSelect: (id: string) => void
}

export function CategoryCard({ category, isSelected, onSelect }: CategoryCardProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.03 }}
      onClick={() => onSelect(category.id)}
      className={`relative flex flex-col items-center gap-3 p-5 rounded-2xl border-2 transition-all duration-200 ${
        isSelected
          ? 'border-white/60 bg-white/15 shadow-lg shadow-white/5'
          : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10'
      }`}
    >
      <span className="text-4xl" role="img" aria-label={category.name}>
        {category.icon}
      </span>
      <span className="text-sm font-medium text-white/90">{category.name}</span>
      {isSelected && (
        <motion.div
          layoutId="selected-ring"
          className="absolute inset-0 rounded-2xl border-2 border-white/30"
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        />
      )}
    </motion.button>
  )
}
