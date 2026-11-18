import emblemUrl from '../../assets/daon-emblem.png'

// 다온페이 D 엠블럼 (Figma 컴포넌트 '로고')
export function Emblem({ height = 32, className = '' }) {
  return (
    <img
      src={emblemUrl}
      alt=""
      aria-hidden="true"
      style={{ height }}
      className={`w-auto select-none ${className}`}
      draggable="false"
    />
  )
}

// 엠블럼 + '다온페이' 워드마크 (Figma 컴포넌트 'Frame 128')
export default function Logo({ className = '' }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <Emblem height={26} />
      <span className="inline-block -skew-x-6 bg-linear-to-r from-[#1530e0] to-[#2f6bff] bg-clip-text text-[1.625rem] leading-none font-black tracking-tight text-transparent">
        다온페이
      </span>
    </span>
  )
}
