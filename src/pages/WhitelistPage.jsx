import { useMemo, useRef, useState } from 'react'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import Icon from '../components/ui/Icon'
import MockMap, { MapChip } from '../components/ui/MockMap'
import { places } from '../data/mock'

const FILTERS = ['전체', '가맹점', '대피소']

// 선택한 장소에 따라 지도 위 목적지 위치가 조금씩 달라지도록 한 가상 좌표
const DEST = {
  p1: [0.66, 0.3],
  p2: [0.82, 0.62],
  p3: [0.42, 0.12],
  p4: [0.66, 0.86],
  p5: [0.92, 0.3],
  p6: [0.18, 0.12],
}
const ME = [0.16, 0.86]

function routeTo([dx, dy]) {
  // 도로를 따라가는 느낌의 꺾인 경로: 내 위치 → 아래 도로 → 세로 도로 → 목적지
  const [mx, my] = ME
  return [
    [mx, my],
    [mx, 0.62],
    [0.42, 0.62],
    [0.42, dy],
    [dx, dy],
  ]
}

function PlaceCard({ place, selected, onSelect }) {
  const isShelter = place.type === '대피소'
  return (
    <li>
      <button
        type="button"
        onClick={onSelect}
        aria-pressed={selected}
        className={`w-full rounded-2xl border bg-white p-5 text-left transition-colors ${
          selected ? 'border-2 border-brand bg-[#f7faff]' : 'border-line hover:border-brand/50'
        }`}
      >
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold">{place.name}</span>
            <Badge tone={isShelter ? 'shelter' : 'gray'}>{place.type}</Badge>
          </div>
          <Badge tone="ok" dot>
            {place.status}
          </Badge>
        </div>
        <p className="mt-2 text-sm text-sub">
          {place.hours} · {place.distance} · {place.walk}
        </p>
        <div className="mt-3 flex items-center justify-between">
          <div className="flex gap-1.5">
            {place.items.map((it) => (
              <Badge key={it} tone="brand">
                {it}
              </Badge>
            ))}
          </div>
          <span className="flex items-center gap-1 text-sm font-bold text-brand">
            길찾기 <Icon name="arrowRight" size={15} strokeWidth={2.2} />
          </span>
        </div>
      </button>
    </li>
  )
}

function PlaceDetail({ place }) {
  const dest = DEST[place.id]
  const stats = [
    ['이동 시간', place.walk, 'text-brand'],
    ['거리', place.distance, ''],
    [place.type === '대피소' ? '수용 현황' : '운영 시간', place.hours, ''],
    [place.type === '대피소' ? '제공' : '사용 가능 업종', place.items.join(' · '), ''],
  ]

  return (
    <section className="flex h-full flex-col gap-5 rounded-2xl border border-line bg-white p-4 md:p-6">
      <MockMap
        className="min-h-[300px] flex-1 md:min-h-[440px]"
        roadsH={[0.3, 0.62, 0.86]}
        roadsV={[0.16, 0.42, 0.82]}
        parks={[
          { x: 0.22, y: 0.37, w: 0.15, h: 0.19 },
          { x: 0.48, y: 0.36, w: 0.28, h: 0.2 },
        ]}
        route={routeTo(dest)}
        markers={[
          { x: ME[0], y: ME[1], kind: 'me', label: '내 위치' },
          { x: dest[0], y: dest[1], kind: 'dest', label: place.name },
        ]}
      >
        <div className="absolute top-3 left-3 flex flex-col items-start gap-2">
          <MapChip color="#1f5bd8">내 위치 (현재 위치)</MapChip>
          <MapChip color="#e5484d">
            {place.name} ({place.type})
          </MapChip>
        </div>
        <span className="absolute top-3 right-3 rounded-full bg-brand px-3.5 py-1.5 text-xs font-bold text-white">
          {place.walk} · {place.distance}
        </span>
      </MockMap>

      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold">{place.name}</h2>
            <Badge tone={place.type === '대피소' ? 'shelter' : 'gray'}>{place.type}</Badge>
          </div>
          <p className="mt-1 text-sm text-sub">{place.address}</p>
        </div>
        <Badge tone="ok" dot>
          {place.status}
        </Badge>
      </div>

      <dl className="grid grid-cols-2 gap-3 xl:grid-cols-4">
        {stats.map(([k, v, cls]) => (
          <div key={k} className="rounded-xl bg-surface px-4 py-3.5">
            <dt className="text-xs text-sub">{k}</dt>
            <dd className={`mt-1 font-bold ${cls}`}>{v}</dd>
          </div>
        ))}
      </dl>

      <p className="rounded-xl bg-surface px-4 py-3 text-sm text-sub">운영이 중단되면 가까운 대피소를 안내해요.</p>

      <div className="flex gap-2.5">
        <a
          href={`tel:${place.phone}`}
          className="inline-flex h-13 w-28 shrink-0 items-center justify-center gap-2 rounded-xl border border-line font-bold hover:bg-surface md:w-44"
        >
          <Icon name="phone" size={17} /> 전화하기
        </a>
        <Button full className="h-13">
          <Icon name="navigation" size={18} /> 길찾기 시작
        </Button>
      </div>
    </section>
  )
}

export default function WhitelistPage() {
  const [filter, setFilter] = useState('전체')
  const [query, setQuery] = useState('')
  const [selectedId, setSelectedId] = useState(places[0].id)
  const detailRef = useRef(null)

  const visible = useMemo(() => {
    const q = query.trim()
    return places.filter(
      (p) =>
        (filter === '전체' || p.type === filter) &&
        (!q || p.name.includes(q) || p.type.includes(q) || p.items.some((it) => it.includes(q))),
    )
  }, [filter, query])

  const selected = places.find((p) => p.id === selectedId) ?? places[0]
  const nearestShelter = places.find((p) => p.type === '대피소')

  const select = (id) => {
    setSelectedId(id)
    // 모바일에서는 상세(지도)가 위에 있어서 그쪽으로 스크롤해요.
    if (window.matchMedia('(max-width: 1023px)').matches) {
      detailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <div className="space-y-7">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-2xl font-bold md:text-[1.75rem]">화이트리스트</h1>
          <p className="mt-1.5 text-sub">지원금을 쓸 수 있는 가맹점과 가까운 대피소를 지금 바로 확인하세요.</p>
        </div>
        <div className="grid grid-cols-3 gap-2 md:flex" role="tablist" aria-label="장소 종류">
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              role="tab"
              aria-selected={filter === f}
              onClick={() => setFilter(f)}
              className={`h-11 rounded-full border text-sm md:w-26 ${
                filter === f ? 'border-brand bg-brand-soft font-bold text-brand' : 'border-line bg-white text-sub'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[456px_1fr]">
        <div className="flex flex-col gap-3.5">
          <label className="flex h-12 items-center gap-2 rounded-xl border border-line bg-white px-4 focus-within:border-brand">
            <Icon name="search" size={18} className="text-mute" />
            <span className="sr-only">장소 검색</span>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="장소 또는 업종 검색 (예: 약국, 대피소)"
              className="min-w-0 flex-1 bg-transparent outline-none placeholder:text-mute"
            />
          </label>
          <div className="flex justify-between text-sm">
            <b>내 주변 {visible.length}곳</b>
            <span className="text-sub">가까운 순</span>
          </div>

          {visible.length === 0 ? (
            <p className="rounded-2xl border border-dashed border-line bg-white p-8 text-center text-sub">
              조건에 맞는 장소가 없어요.
            </p>
          ) : (
            <ul className="flex flex-col gap-3">
              {visible.map((p) => (
                <PlaceCard key={p.id} place={p} selected={p.id === selected.id} onSelect={() => select(p.id)} />
              ))}
            </ul>
          )}

          {nearestShelter && (
            <div className="mt-auto rounded-2xl bg-navy p-6 text-white">
              <p className="text-lg font-bold">긴급 대피가 필요하신가요?</p>
              <p className="mt-1 text-sm text-[#c9d6f0]">
                가장 가까운 대피소 · {nearestShelter.name} ({nearestShelter.distance}, {nearestShelter.walk})
              </p>
              <Button variant="white" full size="sm" className="mt-4 h-11" onClick={() => select(nearestShelter.id)}>
                대피소로 길찾기
              </Button>
            </div>
          )}
        </div>

        <div ref={detailRef} className="order-first scroll-mt-20 lg:order-none">
          <PlaceDetail place={selected} />
        </div>
      </div>
    </div>
  )
}
