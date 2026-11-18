import { Link } from 'react-router-dom'

const VARIANTS = {
  primary: 'bg-brand text-white hover:bg-brand-dark',
  outline: 'border border-brand bg-white text-brand hover:bg-brand-soft',
  soft: 'bg-brand-soft text-brand hover:bg-[#dbe7fd]',
  ghost: 'border border-line bg-white text-ink hover:bg-surface',
  white: 'bg-white text-navy hover:bg-brand-soft',
}

const SIZES = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-12 px-5 text-[0.9375rem]',
}

// to가 있으면 라우터 링크, 없으면 button으로 렌더링해요.
export default function Button({
  to,
  variant = 'primary',
  size = 'md',
  full = false,
  className = '',
  children,
  ...props
}) {
  const cls = `inline-flex items-center justify-center gap-2 rounded-xl font-bold transition-colors ${VARIANTS[variant]} ${SIZES[size]} ${full ? 'w-full' : ''} ${className}`
  if (to) {
    return (
      <Link to={to} className={cls} {...props}>
        {children}
      </Link>
    )
  }
  return (
    <button type="button" className={cls} {...props}>
      {children}
    </button>
  )
}
