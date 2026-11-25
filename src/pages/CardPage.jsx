import { useState } from 'react'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import Icon from '../components/ui/Icon'
import Panel, { PanelTitle } from '../components/ui/Panel'
import { allowedCategories, blockedCategories, qrSteps, transactions, wallet, won } from '../data/mock'

function WalletCard() {
  return (
    <section className="flex flex-col rounded-3xl bg-navy p-6 text-white md:p-7">
      <div className="flex items-center justify-between gap-2">
        <p className="text-[0.9375rem] text-white/80">{wallet.name}</p>
        <Badge tone="ok" dot>
          사용 가능
        </Badge>
      </div>
      <p className="mt-4 text-sm text-white/70">사용 가능 잔액</p>
      <p className="mt-1 text-4xl font-bold md:text-[2.75rem]">{won(wallet.balance)}</p>
      <div className="mt-5 grid grid-cols-2 gap-3">
        {[
          ['총 지급 금액', wallet.totalPaid],
          ['누적 사용 금액', wallet.totalUsed],
        ].map(([k, v]) => (
          <div key={k} className="rounded-xl bg-navy-light p-4">
            <p className="text-xs text-white/70">{k}</p>
            <p className="mt-1 font-bold">{won(v)}</p>
          </div>
        ))}
      </div>
      <p className="mt-auto pt-5 text-xs text-white/60">
        사용 가능 기간: {wallet.expires}까지 (예시) · 가상 카드 정보예요.
      </p>
    </section>
  )
}

function QrPay() {
  const [showQr, setShowQr] = useState(false)
  return (
    <Panel>
      <PanelTitle>QR로 결제하기</PanelTitle>
      <div className="flex flex-col gap-5 sm:flex-row">
        <div
          className={`grid aspect-square w-full max-w-[180px] shrink-0 place-items-center self-center rounded-2xl border border-line sm:self-start ${
            showQr ? 'text-ink' : 'text-mute'
          }`}
        >
          <Icon name="qr" size={showQr ? 120 : 72} strokeWidth={1.4} />
        </div>
        <div className="flex-1">
          <Button full onClick={() => setShowQr((v) => !v)}>
            <Icon name="qr" size={20} /> {showQr ? 'QR 닫기' : 'QR 결제하기'}
          </Button>
          <ol className="mt-4 space-y-2.5">
            {qrSteps.map((s, i) => (
              <li key={s} className="flex items-center gap-3 text-sm">
                <span className="grid size-6 shrink-0 place-items-center rounded-full bg-brand-soft text-xs font-bold text-brand">
                  {i + 1}
                </span>
                {s}
              </li>
            ))}
          </ol>
          <p className="mt-4 text-xs font-medium text-danger">테스트용 프로토타입이에요. 실제 결제는 이뤄지지 않아요.</p>
        </div>
      </div>
    </Panel>
  )
}

function UsageLimit() {
  return (
    <Panel>
      <PanelTitle>사용처 제한 안내</PanelTitle>
      <div className="flex gap-3 rounded-xl bg-brand-soft p-4 text-sm font-medium text-navy">
        <Icon name="shield" size={20} className="shrink-0 text-brand" />
        허용된 가맹점에서만 사용할 수 있어요. 정부·지자체가 허용한 가맹점 목록(화이트리스트)에 있는 곳만 결제돼요.
      </div>
      <h3 className="mt-5 text-sm font-bold text-ok">사용 가능한 업종</h3>
      <div className="mt-2 flex flex-wrap gap-2">
        {allowedCategories.map((c) => (
          <span key={c} className="rounded-full bg-ok-soft px-3 py-1.5 text-sm text-ok">
            {c}
          </span>
        ))}
      </div>
      <h3 className="mt-5 text-sm font-bold text-danger">사용이 제한되는 업종</h3>
      <div className="mt-2 flex flex-wrap gap-2">
        {blockedCategories.map((c) => (
          <span key={c} className="rounded-full bg-danger-soft px-3 py-1.5 text-sm text-danger">
            {c}
          </span>
        ))}
      </div>
      <Button to="/whitelist" variant="outline" className="mt-6">
        <Icon name="navigation" size={17} /> 사용 가능 가맹점 보기
      </Button>
    </Panel>
  )
}

function PhysicalCard() {
  return (
    <Panel>
      <PanelTitle>실물카드 관리</PanelTitle>
      <div className="flex items-center justify-between">
        <span className="text-sm text-sub">발급 상태</span>
        <Badge tone="warn" dot>
          발송 준비 중
        </Badge>
      </div>
      <p className="mt-4 text-sm leading-relaxed text-sub">
        실물카드는 신청 후 약 7일 안에 도착해요. 도착하면 카드를 등록해 주세요. (예시 안내)
      </p>
      <Button full className="mt-4">
        카드 등록·연결
      </Button>
      <div className="mt-3 grid grid-cols-2 gap-3">
        <Button variant="outline">분실 신고</Button>
        <Button variant="outline">이용 정지</Button>
      </div>
    </Panel>
  )
}

function TxStatus({ status }) {
  return status === 'done' ? (
    <Badge tone="ok" dot>
      결제 완료
    </Badge>
  ) : (
    <Badge tone="danger" dot>
      결제 제한
    </Badge>
  )
}

function Transactions() {
  const amount = (n) => (n === 0 ? '₩0' : `-${won(n)}`)
  return (
    <Panel>
      <PanelTitle
        right={
          <Button variant="outline" size="sm" className="h-11">
            전체 보기
          </Button>
        }
      >
        최근 이용 내역
      </PanelTitle>
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-surface text-sm text-sub">
              <th className="rounded-l-xl px-4 py-3 font-medium">날짜</th>
              <th className="px-4 py-3 font-medium">가맹점</th>
              <th className="px-4 py-3 font-medium">사용 금액</th>
              <th className="px-4 py-3 font-medium">결제 상태</th>
              <th className="rounded-r-xl px-4 py-3 font-medium">잔액 변화</th>
            </tr>
          </thead>
          <tbody className="text-[0.9375rem]">
            {transactions.map((t) => (
              <tr key={t.date + t.merchant} className="border-b border-line">
                <td className="px-4 py-4">{t.date}</td>
                <td className="px-4 py-4">{t.merchant}</td>
                <td className="px-4 py-4">{amount(t.amount)}</td>
                <td className="px-4 py-4">
                  <TxStatus status={t.status} />
                </td>
                <td className="px-4 py-4">{t.change}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ul className="divide-y divide-line md:hidden">
        {transactions.map((t) => (
          <li key={t.date + t.merchant} className="flex items-center justify-between gap-3 py-4">
            <div>
              <p className="font-medium">{t.merchant}</p>
              <p className="mt-1 text-xs text-sub">
                {t.date} · {t.change}
              </p>
            </div>
            <div className="flex flex-col items-end gap-1">
              <span className="font-bold">{amount(t.amount)}</span>
              <TxStatus status={t.status} />
            </div>
          </li>
        ))}
      </ul>
    </Panel>
  )
}

export default function CardPage() {
  return (
    <div className="space-y-6 md:space-y-8">
      <div className="grid gap-6 lg:grid-cols-[520px_1fr]">
        <WalletCard />
        <QrPay />
      </div>
      <div className="grid items-start gap-6 lg:grid-cols-[1fr_440px]">
        <UsageLimit />
        <PhysicalCard />
      </div>
      <Transactions />
    </div>
  )
}
