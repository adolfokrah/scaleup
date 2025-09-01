'use client'

import React, { createContext, useCallback, use, useEffect, useState } from 'react'

import type { Theme, ThemeContextType } from './types'

import canUseDOM from '@/utilities/canUseDOM'
import { defaultTheme, getImplicitPreference, themeLocalStorageKey } from './shared'
import { themeIsValid } from './types'

const initialContext: ThemeContextType = {
  setTheme: () => null,
  theme: undefined,
}

const ThemeContext = createContext(initialContext)

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  // Always force light theme
  const [theme, setThemeState] = useState<Theme>('light')

  // Disable theme switching - setTheme function does nothing
  const setTheme = useCallback((themeToSet: Theme | null) => {
    // Do nothing - theme switching is disabled
    console.warn('Theme switching is disabled. The website is locked to light mode.')
  }, [])

  useEffect(() => {
    // Force light theme always
    document.documentElement.setAttribute('data-theme', 'light')
    setThemeState('light')

    // Remove any stored theme preference
    window.localStorage.removeItem(themeLocalStorageKey)
  }, [])

  return <ThemeContext value={{ setTheme, theme }}>{children}</ThemeContext>
}

export const useTheme = (): ThemeContextType => use(ThemeContext)
