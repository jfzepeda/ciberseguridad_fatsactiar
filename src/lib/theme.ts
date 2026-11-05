import { createContext, useContext } from 'react'

export type Theme = 'dark' | 'light'
export const ThemeContext = createContext<Theme>('dark')
// For SVG attributes (beam gradients) that can't read CSS variables.
export const useIsDark = () => useContext(ThemeContext) === 'dark'
