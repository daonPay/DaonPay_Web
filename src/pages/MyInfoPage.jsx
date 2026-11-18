import { useState } from 'react'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import Icon from '../components/ui/Icon'
import Panel, { PanelTitle } from '../components/ui/Panel'
import Toggle from '../components/ui/Toggle'
import { FONT_SIZES, useSettings } from '../context/settings'
import { applications, notices, reportStatus, user } from '../data/mock'

function ProfileCard() {
  return (
    <Panel className="text-center">
      <span className="mx-auto grid size-20 place-items-center rounded-full bg-brand-soft text-brand md:size-22">
        <Icon name="user" size={36} strokeWidth={1.5} />
      </span>
      <p className="mt-4 text-2xl font-bold text-navy">{user.name}</p>
      <p className="mt-2 text-sm text-sub">등록된 피해 지역: {user.regionShort}</p>
      <Button variant="outline" full className="mt-5">
        회원 정보 수정
      </Button>
    </Panel>
  )
}

function AccessibilityCard() {
  const { fontSize, setFontSize, voiceGuide, setVoiceGuide, easyMode, setEasyMode } = useSettings()

  return (
    <Panel>
      <PanelTitle>접근성 설정</PanelTitle>
      <p className="mb-2 font-medium">글자 크기</p>
      <div className="grid grid-cols-4 gap-1 rounded-xl bg-surface p-1" role="radiogroup" aria-label="글자 크기">
        {FONT_SIZES.map((f) => (
          <button
            key={f.key}
            type="button"
            role="radio"
            aria-checked={fontSize === f.key}
            onClick={() => setFontSize(f.key)}
            className={`rounded-lg py-2.5 text-sm whitespace-nowrap ${
              fontSize === f.key ? 'bg-white font-bold text-ink shadow-sm' : 'text-sub'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>
      <div className="mt-4 space-y-4 border-t border-line pt-4">
        <SettingRow title="음성 안내" desc="화면 내용을 소리로 읽어드려요." checked={voiceGuide} onChange={setVoiceGuide} />
        <SettingRow title="쉬운 설명 모드" desc="어려운 용어를 쉬운 말로 바꿔 보여드려요." checked={easyMode} onChange={setEasyMode} />
      </div>
    </Panel>
  )
}

function SettingRow({ title, desc, checked, onChange }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        <p className="font-medium">{title}</p>
        {desc && <p className="mt-0.5 text-xs text-sub">{desc}</p>}
      </div>
      <Toggle checked={checked} onChange={onChange} label={title} />
    </div>
  )
}

function ShortcutCard({ title, icon, button, to }) {
  return (
    <Panel>
      <h2 className="flex items-center gap-2 text-lg font-bold text-navy md:text-xl">
        {title} <Icon name={icon} size={20} />
      </h2>
      <Button to={to} full className="mt-6">
        {button} <Icon name="chevronRight" size={16} strokeWidth={2.4} />
      </Button>
    </Panel>
  )
}

function BasicInfo() {
  const rows = [
    ['이름', user.maskedName],
    ['연락처', user.phone],
    ['피해 지역', user.region],
  ]
  return (
    <Panel>
      <PanelTitle>기본 정보 · 재난 정보</PanelTitle>
      <div className="grid gap-x-10 md:grid-cols-2">
        <dl>
          {rows.map(([k, v]) => (
            <div key={k} className="flex justify-between border-b border-line py-3 text-[0.9375rem]">
              <dt className="text-sub">{k}</dt>
              <dd className="font-medium">{v}</dd>
            </div>
          ))}
        </dl>
        <dl>
          {reportStatus.map((r) => (
            <div key={r.label} className="flex items-center justify-between border-b border-line py-2.5 text-[0.9375rem] last:border-0 md:last:border-b-0">
              <dt className="text-sub">{r.label}</dt>
              <dd>
                <Badge tone={r.status.tone} dot>
                  {r.status.label}
                </Badge>
              </dd>
            </div>
          ))}
        </dl>
      </div>
      <p className="mt-4 text-xs text-sub">주민등록번호 전체와 계좌 비밀번호는 화면에 표시하지 않아요.</p>
    </Panel>
  )
}

function ApplicationTable() {
  return (
    <Panel>
      <PanelTitle right={<span className="hidden text-sm text-sub sm:inline">확인한 지원 제도 5건 · 미확인 혜택 3건</span>}>
        지원 자격 · 신청 현황
      </PanelTitle>

      {/* 데스크탑: 표 */}
      <table className="hidden w-full text-left md:table">
        <thead>
          <tr className="bg-surface text-sm text-sub">
            <th className="rounded-l-xl px-4 py-3 font-medium">지원 제도</th>
            <th className="px-4 py-3 font-medium">진행 상태</th>
            <th className="px-4 py-3 font-medium">안내</th>
            <th className="rounded-r-xl px-4 py-3 font-medium">바로가기</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((a) => (
            <tr key={a.name} className="border-b border-line">
              <td className="px-4 py-5">{a.name}</td>
              <td className="px-4 py-5">
                {a.status ? (
                  <Badge tone={a.status.tone} dot>
                    {a.status.label}
                  </Badge>
                ) : (
                  <span className="text-sm">{a.statusText}</span>
                )}
              </td>
              <td className="px-4 py-5 text-[0.9375rem]">{a.info}</td>
              <td className="px-4 py-5">
                <Button variant={a.action.variant} size="sm" className="min-w-22">
                  {a.action.label}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 모바일: 카드 목록 */}
      <ul className="divide-y divide-line md:hidden">
        {applications.map((a) => (
          <li key={a.name} className="flex items-center justify-between gap-3 py-4">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <p className="font-medium">{a.name}</p>
                {a.status && (
                  <Badge tone={a.status.tone} dot>
                    {a.status.label}
                  </Badge>
                )}
              </div>
              <p className="mt-1 text-sm text-sub">{a.status ? a.info : `${a.statusText} · ${a.info}`}</p>
            </div>
            <Button variant={a.action.variant} size="sm">
              {a.action.label}
            </Button>
          </li>
        ))}
      </ul>
    </Panel>
  )
}

function AlarmSettings() {
  const [alarms, setAlarms] = useState({
    paid: true,
    benefit: false,
    deadline: false,
    emergency: true,
  })
  const items = [
    ['paid', '지원금 지급 알림'],
    ['benefit', '맞춤형 혜택 알림'],
    ['deadline', '신청 기한 알림'],
    ['emergency', '재난 관련 긴급 알림'],
  ]
  return (
    <Panel>
      <PanelTitle>알림 설정</PanelTitle>
      <div className="grid gap-x-10 gap-y-4 sm:grid-cols-2">
        {items.map(([key, label]) => (
          <SettingRow
            key={key}
            title={label}
            checked={alarms[key]}
            onChange={(v) => setAlarms((prev) => ({ ...prev, [key]: v }))}
          />
        ))}
      </div>
    </Panel>
  )
}

export default function MyInfoPage() {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
        <div className="space-y-6">
          <ProfileCard />
          <AccessibilityCard />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
            <ShortcutCard title="고객센터" icon="message" button="바로 문의하러 가기" to="/support" />
            <ShortcutCard title="Q&A" icon="help" button="Q&A 보러 가기" to="/support" />
          </div>
        </div>
        <div className="space-y-6">
          <BasicInfo />
          <ApplicationTable />
          <AlarmSettings />
        </div>
      </div>

      <Panel>
        <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-navy md:text-xl">
          공지사항 <Icon name="megaphone" size={20} />
        </h2>
        <ul className="grid gap-4 md:grid-cols-3">
          {notices.map((n) => (
            <li key={n.title}>
              <a href="#" className="block rounded-2xl border border-line p-5 transition-colors hover:border-brand">
                <p className="text-lg font-bold text-navy">{n.title}</p>
                <p className="mt-3 text-sm text-mute">{n.date}</p>
              </a>
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  )
}
