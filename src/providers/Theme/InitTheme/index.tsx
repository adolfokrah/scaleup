import Script from 'next/script'
import React from 'react'

import { defaultTheme, themeLocalStorageKey } from '../ThemeSelector/types'

export const InitTheme: React.FC = () => {
  return (
    // eslint-disable-next-line @next/next/no-before-interactive-script-outside-document
    <Script
      dangerouslySetInnerHTML={{
        __html: `
  (function () {
    // Force light theme always - no dark mode support
    document.documentElement.setAttribute('data-theme', 'light')
    
    // Remove any stored theme preference to prevent conflicts
    window.localStorage.removeItem('${themeLocalStorageKey}')
  })();
  `,
      }}
      id="theme-script"
      strategy="beforeInteractive"
    />
  )
}
