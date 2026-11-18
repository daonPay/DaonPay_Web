const TONES = {
  ok: 'bg-ok-soft text-ok',
  warn: 'bg-warn-soft text-warn',
  danger: 'bg-danger-soft text-danger',
  brand: 'bg-brand-soft text-brand',
  gray: 'bg-surface text-sub',
  navy: 'bg-white/15 text-white',
  shelter: 'bg-[#fff0ea] text-[#e5541b]',
}

// 상태 표시용 알약 배지. dot=true면 앞에 ● 점을 붙여요.
export default function Badge({ tone = 'gray', dot = false, className = '', children }) {
  return (
    <span
      className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold whitespace-nowrap ${TONES[tone]} ${className}`}
    >
      {dot && <span className="size-1.5 rounded-full bg-current" />}
      {children}
    </span>
  )
}
