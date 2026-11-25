import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import Icon from '../components/ui/Icon'
import MockMap, { MapChip } from '../components/ui/MockMap'
import { benefits, disaster, nearbyMerchants, nearbyShelters, STATUS, supports, won } from '../data/mock'

const LEVEL_COLORS = ['bg-[#6ea8fe]', 'bg-[#f8cf5c]', 'bg-[#f7a04b]', 'bg-[#e5484d]']

function DisasterHero() {
  const total = supports.reduce((s, x) => s + x.amount, 0)
  const counts = Object.keys(STATUS).map((k) => ({ ...STATUS[k], n: supports.filter((s) => s.status === k).length }))

  return (
    <section className="grid gap-6 rounded-3xl bg-navy p-6 text-white md:p-8 lg:grid-cols-[1fr_380px] lg:items-center">
      <div>
        <Badge tone="navy">재난 피해 현황</Badge>
        <h1 className="mt-4 text-2xl font-bold md:text-[1.875rem]">{disaster.title}</h1>
        <p className="mt-1 text-sm text-white/70">피해 지역: {disaster.region}</p>

        <ol className="mt-6 grid grid-cols-4 gap-1.5">
          {disaster.levels.map((lv, i) => (
            <li key={lv} className="text-center">
              <div className={`h-1.5 rounded-full ${i <= disaster.currentLevel ? LEVEL_COLORS[i] : 'bg-white/20'}`} />
              <span
                className={`mt-2 block text-xs ${i === disaster.currentLevel ? 'font-bold text-white' : 'text-white/60'}`}
              >
                {lv}
              </span>
            </li>
          ))}
        </ol>
        <p className="mt-5 font-medium">{disaster.summary}</p>
        <p className="mt-3 text-xs text-white/55">{disaster.notice}</p>
      </div>

      <div className="rounded-2xl bg-navy-light p-6">
        <p className="text-sm text-white/70">확인 가능한 지원금 합계</p>
        <p className="mt-2 text-3xl font-bold md:text-4xl">{won(total)}</p>
        <ul className="mt-4 space-y-2.5">
          {counts.map((c) => (
            <li key={c.label} className="flex items-center justify-between">
              <Badge tone={c.tone} dot>
                {c.label}
              </Badge>
              <span className="text-sm">{c.n}건</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function SupportCard({ item }) {
  const st = STATUS[item.status]
  return (
    <article className="flex flex-col rounded-2xl border border-line bg-white p-5">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-full bg-brand-soft text-brand">
            <Icon name={item.icon} size={20} />
          </span>
          <h3 className="font-bold">{item.title}</h3>
        </div>
        <Badge tone={st.tone} dot>
          {st.label}
        </Badge>
      </div>
      <p className="mt-4 text-[1.75rem] font-bold">
        {won(item.amount)}
        {item.amountNote && <span className="ml-1.5 text-xs font-normal text-sub">{item.amountNote}</span>}
      </p>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-sub">{item.desc}</p>
      <Button to={item.action.to} variant={item.action.variant} full className="mt-4">
        {item.action.label}
      </Button>
    </article>
  )
}

function NearbyInfo() {
  return (
    <section>
      <h2 className="text-xl font-bold text-navy">내 주변 긴급 정보</h2>
      <p className="mt-2 text-sm text-sub">가상 위치 예시이며, 실제 운영 정보는 방문 전 확인해 주세요.</p>

      <div className="mt-5 grid gap-6 lg:grid-cols-[1fr_460px]">
        <div>
          <MockMap
            className="h-[320px] md:h-[480px] lg:h-full lg:min-h-[640px]"
            roadsH={[0.36, 0.74]}
            roadsV={[0.31, 0.68]}
            parks={[{ x: 0.04, y: 0.06, w: 0.2, h: 0.16 }]}
            markers={[
              ...nearbyMerchants.map((m) => ({ ...m, kind: 'merchant', label: m.name })),
              { x: 0.86, y: 0.62, kind: 'merchant', label: '가맹점' },
              ...nearbyShelters.map((s) => ({ ...s, kind: 'shelter', label: s.name })),
              { x: 0.49, y: 0.52, kind: 'me', label: '내 위치' },
            ]}
          >
            <MapChip className="absolute bottom-3 left-3">지도 영역 (가상 위치 · 예시)</MapChip>
          </MockMap>
          <div className="mt-3 flex gap-5 text-xs text-sub">
            <span className="flex items-center gap-1.5">
              <span className="size-2.5 rounded-full bg-brand" /> 지원금 사용 가능 가맹점
            </span>
            <span className="flex items-center gap-1.5">
              <span className="size-2.5 rounded-full bg-[#e5541b]" /> 대피소
            </span>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="mb-3 font-bold">지원금 사용 가능 가맹점</h3>
            <ul className="space-y-3">
              {nearbyMerchants.map((m) => (
                <li key={m.id} className="rounded-2xl border border-line bg-white p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-bold">{m.name}</p>
                      <p className="mt-0.5 text-sm text-sub">{m.meta}</p>
                    </div>
                    <Badge tone="ok" dot>
                      지원금 사용 가능
                    </Badge>
                  </div>
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    <Button to="/whitelist" variant="outline" size="sm" className="h-11">
                      <Icon name="navigation" size={16} /> 길찾기
                    </Button>
                    <Button to="/whitelist" variant="outline" size="sm" className="h-11">
                      상세 정보
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-3 font-bold">주변 대피소</h3>
            <ul className="space-y-3">
              {nearbyShelters.map((s) => (
                <li key={s.id} className="rounded-2xl border border-line bg-white p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-bold">{s.name}</p>
                      <p className="mt-0.5 text-sm text-sub">{s.meta}</p>
                    </div>
                    <Badge tone="shelter">
                      대피소
                    </Badge>
                  </div>
                  <p className="mt-2 text-sm">{s.capacity}</p>
                  <Button to="/whitelist" variant="outline" size="sm" full className="mt-3 h-11">
                    <Icon name="navigation" size={16} /> 길찾기
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function HomePage() {
  return (
    <div className="space-y-10">
      <DisasterHero />

      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-5">
        {supports.map((s) => (
          <SupportCard key={s.id} item={s} />
        ))}
      </section>

      <section>
        <h2 className="mb-4 text-xl font-bold text-navy">나에게 맞는 추가 혜택</h2>
        <div className="grid gap-4 md:grid-cols-3 lg:gap-5">
          {benefits.map((b) => (
            <article key={b.title} className="flex flex-col rounded-2xl border border-line bg-white p-6">
              <span className="grid size-12 place-items-center rounded-full bg-brand-soft text-brand">
                <Icon name={b.icon} size={22} />
              </span>
              <h3 className="mt-4 text-lg font-bold">{b.title}</h3>
              <p className="mt-2 flex-1 text-sm text-sub">{b.desc}</p>
              <Button variant="outline" full className="mt-4">
                확인하기
              </Button>
            </article>
          ))}
        </div>
      </section>

      <NearbyInfo />
    </div>
  )
}
