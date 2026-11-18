import Icon from './Icon'

// 실제 지도 API(카카오맵 등)를 붙이기 전까지 쓰는 가상 지도.
// 좌표는 모두 0~1 비율이라 어떤 크기에서도 그대로 늘어나요.
const MARKERS = {
  merchant: 'size-8 bg-brand text-white ring-4 ring-white/80',
  shelter: 'size-8 bg-[#e5541b] text-white ring-4 ring-white/80',
  me: 'size-4 bg-brand ring-4 ring-white',
  dest: 'size-6 bg-pin ring-4 ring-white',
}

export default function MockMap({
  roadsH = [0.35, 0.68],
  roadsV = [0.3, 0.7],
  parks = [],
  markers = [],
  route,
  className = '',
  children,
}) {
  const pct = (v) => `${v * 100}%`

  return (
    <div className={`relative overflow-hidden rounded-2xl bg-[#e9eef6] ${className}`} role="img" aria-label="가상 지도">
      {parks.map((p, i) => (
        <div
          key={`park-${i}`}
          className="absolute rounded-xl bg-park"
          style={{ left: pct(p.x), top: pct(p.y), width: pct(p.w), height: pct(p.h) }}
        />
      ))}
      {roadsH.map((y) => (
        <div key={`h-${y}`} className="absolute inset-x-0 h-3.5 -translate-y-1/2 bg-white" style={{ top: pct(y) }} />
      ))}
      {roadsV.map((x) => (
        <div key={`v-${x}`} className="absolute inset-y-0 w-3.5 -translate-x-1/2 bg-white" style={{ left: pct(x) }} />
      ))}

      {route && (
        <svg className="absolute inset-0 size-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <polyline
            points={route.map(([x, y]) => `${x * 100},${y * 100}`).join(' ')}
            fill="none"
            stroke="#1f5bd8"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      )}

      {markers.map((m, i) => (
        <span
          key={`m-${i}`}
          title={m.label}
          className={`absolute grid -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full ${MARKERS[m.kind]}`}
          style={{ left: pct(m.x), top: pct(m.y) }}
        >
          {m.kind === 'merchant' && <Icon name="store" size={15} strokeWidth={2} />}
          {m.kind === 'shelter' && <Icon name="shield" size={15} strokeWidth={2} />}
        </span>
      ))}

      {children}
    </div>
  )
}

// 지도 위에 띄우는 작은 라벨
export function MapChip({ color, children, className = '' }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border border-line bg-white px-3 py-1.5 text-xs font-medium shadow-sm ${className}`}
    >
      {color && <span className="size-2 rounded-full" style={{ background: color }} />}
      {children}
    </span>
  )
}
