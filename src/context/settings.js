import { createContext, useContext } from 'react'

export const FONT_SIZES = [
  { key: 'sm', label: '작게', px: 14 },
  { key: 'md', label: '보통', px: 16 },
  { key: 'lg', label: '크게', px: 18 },
  { key: 'xl', label: '아주 크게', px: 20 },
]

export const SettingsContext = createContext(null)

export function useSettings() {
  const ctx = useContext(SettingsContext)
  if (!ctx) throw new Error('useSettings는 SettingsProvider 안에서 사용해야 해요.')
  return ctx
}
