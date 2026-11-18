import { useEffect, useMemo, useState } from 'react'
import { FONT_SIZES, SettingsContext } from './settings'

// 접근성 설정(글자 크기·음성 안내·쉬운 설명)과 알림 설정을 앱 전체에서 공유해요.
export default function SettingsProvider({ children }) {
  const [fontSize, setFontSize] = useState('md')
  const [voiceGuide, setVoiceGuide] = useState(false)
  const [easyMode, setEasyMode] = useState(true)

  useEffect(() => {
    const px = FONT_SIZES.find((f) => f.key === fontSize)?.px ?? 16
    document.documentElement.style.setProperty('--app-font-size', `${px}px`)
  }, [fontSize])

  const value = useMemo(
    () => ({ fontSize, setFontSize, voiceGuide, setVoiceGuide, easyMode, setEasyMode }),
    [fontSize, voiceGuide, easyMode],
  )

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>
}
