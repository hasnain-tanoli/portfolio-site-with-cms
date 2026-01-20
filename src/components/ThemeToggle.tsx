'use client'

import * as React from 'react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  // Avoid hydration mismatch
  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="w-10 h-10" />
  }

  // Use resolvedTheme to handle "system" theme correctly
  const currentTheme = resolvedTheme || theme

  const toggleTheme = () => {
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)

    // Force update the HTML class attribute as a fallback
    if (typeof window !== 'undefined') {
      const html = document.documentElement
      html.classList.remove('light', 'dark')
      html.classList.add(newTheme)
    }
  }

  return (
    <button
      onClick={toggleTheme}
      className="relative flex items-center justify-center w-10 h-10 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-900 dark:text-stone-100 hover:scale-110 active:scale-95 transition-all duration-300 border border-stone-200 dark:border-stone-700"
      aria-label="Toggle theme"
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </button>
  )
}
