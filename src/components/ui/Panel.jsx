// 흰 배경 + 연한 테두리 카드 컨테이너 (Figma의 radius 16 카드)
export default function Panel({ as: Tag = 'section', className = '', children, ...props }) {
  return (
    <Tag className={`rounded-2xl border border-line bg-white p-5 md:p-7 ${className}`} {...props}>
      {children}
    </Tag>
  )
}

export function PanelTitle({ children, right, className = '' }) {
  return (
    <div className={`mb-4 flex items-center justify-between gap-3 ${className}`}>
      <h2 className="text-lg font-bold text-navy md:text-xl">{children}</h2>
      {right}
    </div>
  )
}
