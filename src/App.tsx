import { HashRouter, Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { HomePage } from './pages/HomePage'
import { SetupPage } from './pages/SetupPage'
import { ActiveTimerPage } from './pages/ActiveTimerPage'
import { CompletePage } from './pages/CompletePage'
import { useTimerStore } from './store/timerStore'
import { useEffect } from 'react'

function AppRoutes() {
  return (
    <AnimatePresence mode="wait">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/setup" element={<SetupPage />} />
        <Route path="/timer" element={<ActiveTimerPage />} />
        <Route path="/complete" element={<CompletePage />} />
      </Routes>
    </AnimatePresence>
  )
}

function App() {
  const restoreState = useTimerStore((s) => s.restoreState)

  useEffect(() => {
    restoreState()
  }, [])

  return (
    <HashRouter>
      <AppRoutes />
    </HashRouter>
  )
}

export default App
