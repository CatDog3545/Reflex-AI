import type { Category, MentorConfig } from '../types'

export const CATEGORIES: Category[] = [
  {
    id: 'study',
    name: 'Учёба',
    icon: '📚',
    color: '#6366f1',
    presetDurations: [15, 25, 45, 60],
  },
  {
    id: 'work',
    name: 'Работа',
    icon: '💼',
    color: '#f59e0b',
    presetDurations: [25, 50, 90],
  },
  {
    id: 'rest',
    name: 'Отдых',
    icon: '🌿',
    color: '#10b981',
    presetDurations: [5, 10, 15, 30],
  },
  {
    id: 'sport',
    name: 'Спорт',
    icon: '🏋️',
    color: '#ef4444',
    presetDurations: [10, 20, 30, 45],
  },
  {
    id: 'meditation',
    name: 'Медитация',
    icon: '🧘',
    color: '#8b5cf6',
    presetDurations: [5, 10, 15, 20],
  },
  {
    id: 'cooking',
    name: 'Готовка',
    icon: '🍳',
    color: '#f97316',
    presetDurations: [5, 15, 30, 45],
  },
]

export const MENTORS: MentorConfig[] = [
  { id: 'none', name: 'Без наставника', emoji: '' },
  { id: 'fox', name: 'Лисёнок', emoji: '🦊' },
  { id: 'owl', name: 'Сова', emoji: '🦉' },
  { id: 'cat', name: 'Котик', emoji: '🐱' },
  { id: 'robot', name: 'Робот', emoji: '🤖' },
  { id: 'star', name: 'Звёздочка', emoji: '⭐' },
]

export const BACKGROUNDS = [
  { type: 'gradient' as const, value: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', label: 'Фиолетовый' },
  { type: 'gradient' as const, value: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', label: 'Розовый' },
  { type: 'gradient' as const, value: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', label: 'Голубой' },
  { type: 'gradient' as const, value: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', label: 'Зелёный' },
  { type: 'gradient' as const, value: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', label: 'Закат' },
  { type: 'gradient' as const, value: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)', label: 'Лаванда' },
  { type: 'gradient' as const, value: 'linear-gradient(135deg, #0c0c0c 0%, #1a1a2e 50%, #16213e 100%)', label: 'Тёмный' },
  { type: 'gradient' as const, value: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)', label: 'Светлый' },
]

export const STORAGE_KEY = 'reflex-timer-state'
