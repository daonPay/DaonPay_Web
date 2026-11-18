import { useState } from 'react'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import Icon from '../components/ui/Icon'
import Panel, { PanelTitle } from '../components/ui/Panel'
import { useSettings } from '../context/settings'
import { easyTools, inquiries, quickQuestions, supportMenu } from '../data/mock'

const FIRST_MESSAGES = [
  { from: 'me', text: '저는 이번 재난으로 집이 침수됐는데 어떤 지원을 받을 수 있나요?' },
  {
    from: 'bot',
    text: '피해 지역과 주택 피해 상황에 따라 지원 제도가 달라질 수 있습니다.\n몇 가지 질문에 답하면 확인 가능한 지원 제도를 안내하겠습니다.',
  },
  { from: 'step', step: 1, total: 4, text: '피해 지역 확인' },
  { from: 'bot', text: '침수 피해를 입은 집의 주소를 알려주세요.', choices: ['등록된 주소 사용', '다른 주소 입력'] },
]

// 실제 AI 연결 전까지는 고정 답변을 보여줘요.
const MOCK_REPLY = '확인했어요. 입력하신 내용을 바탕으로 받을 수 있는 지원 제도를 찾고 있어요. (예시 답변)'

function ChatBot() {
  const [messages, setMessages] = useState(FIRST_MESSAGES)
  const [input, setInput] = useState('')

  const send = (text) => {
    const t = text.trim()
    if (!t) return
    setMessages((prev) => [...prev, { from: 'me', text: t }, { from: 'bot', text: MOCK_REPLY }])
    setInput('')
  }

  return (
    <section className="flex flex-col overflow-hidden rounded-2xl border border-line bg-white">
      <header className="flex items-center gap-4 bg-navy px-6 py-5 text-white">
        <span className="grid size-12 place-items-center rounded-full bg-white/10">
          <Icon name="bot" size={22} />
        </span>
        <div>
          <h1 className="text-xl font-bold">AI 지원 도우미</h1>
          <p className="text-sm text-white/70">내가 받을 수 있는 지원과 신청 방법을 쉬운 말로 알려드려요.</p>
        </div>
      </header>

      <div className="flex max-h-[520px] min-h-[320px] flex-1 flex-col gap-3 overflow-y-auto p-5 md:p-6" aria-live="polite">
        {messages.map((m, i) => {
          if (m.from === 'step') {
            return (
              <div key={i}>
                <p className="text-sm font-bold text-brand">
                  질문 {m.step}/{m.total} · {m.text}
                </p>
                <div className="mt-2 grid grid-cols-4 gap-1.5">
                  {Array.from({ length: m.total }, (_, k) => (
                    <span key={k} className={`h-1.5 rounded-full ${k < m.step ? 'bg-brand' : 'bg-line'}`} />
                  ))}
                </div>
              </div>
            )
          }
          const mine = m.from === 'me'
          return (
            <div key={i} className={`flex flex-col ${mine ? 'items-end' : 'items-start'}`}>
              <p
                className={`max-w-[85%] rounded-2xl px-4 py-3 text-[0.9375rem] leading-relaxed whitespace-pre-line md:max-w-[75%] ${
                  mine ? 'bg-brand text-white' : 'bg-brand-soft text-ink'
                }`}
              >
                {m.text}
              </p>
              {m.choices && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {m.choices.map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => send(c)}
                      className="rounded-full border border-brand px-3.5 py-1.5 text-sm text-brand hover:bg-brand-soft"
                    >
                      {c}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>

      <div className="border-t border-line px-5 py-4 md:px-6">
        <p className="mb-3 text-sm font-medium text-sub">이런 걸 물어볼 수 있어요</p>
        <div className="flex flex-wrap gap-2">
          {quickQuestions.map((q) => (
            <button
              key={q}
              type="button"
              onClick={() => send(q)}
              className="rounded-full bg-surface px-3.5 py-2 text-sm hover:bg-brand-soft hover:text-brand"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      <form
        className="border-t border-line px-5 py-4 md:px-6"
        onSubmit={(e) => {
          e.preventDefault()
          send(input)
        }}
      >
        <div className="flex gap-2">
          <label htmlFor="chat-input" className="sr-only">
            질문 입력
          </label>
          <input
            id="chat-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="궁금한 점을 입력하세요"
            className="h-12 min-w-0 flex-1 rounded-xl border border-line px-4 outline-none focus:border-brand"
          />
          <button type="submit" aria-label="보내기" className="grid size-12 place-items-center rounded-xl bg-brand text-white">
            <Icon name="send" size={20} />
          </button>
        </div>
        <p className="mt-3 text-center text-xs text-sub">
          AI는 지원 가능성이 있는 제도를 안내해요. 실제 자격 확정과 지급 결정은 담당 기관의 심사에 따라 달라질 수 있어요.
        </p>
      </form>
    </section>
  )
}

function EasyTools() {
  const { setFontSize, easyMode, setEasyMode, voiceGuide, setVoiceGuide } = useSettings()
  const actions = {
    '음성 안내 시작': () => setVoiceGuide(!voiceGuide),
    '큰 글씨 모드': () => setFontSize('lg'),
    '쉬운 설명으로 보기': () => setEasyMode(!easyMode),
    '단계별 안내': () => {},
  }
  return (
    <Panel>
      <PanelTitle>쉽게 이용하기</PanelTitle>
      <div className="grid grid-cols-2 gap-3">
        {easyTools.map((t) => (
          <button
            key={t.label}
            type="button"
            onClick={actions[t.label]}
            className="flex flex-col items-center gap-3 rounded-2xl border border-line bg-surface/60 px-3 py-6 font-bold transition-colors hover:border-brand"
          >
            <span className="grid size-12 place-items-center rounded-full bg-brand-soft text-brand">
              <Icon name={t.icon} size={22} />
            </span>
            {t.label}
          </button>
        ))}
      </div>
    </Panel>
  )
}

function SupportMenu() {
  return (
    <Panel>
      <PanelTitle className="mb-1!">고객지원</PanelTitle>
      <ul className="divide-y divide-line">
        {supportMenu.map((m) => (
          <li key={m.label}>
            <a href="#" className="flex items-center gap-3 py-3.5 hover:text-brand">
              <Icon name={m.icon} size={20} className="text-brand" />
              <span className="flex-1 font-medium">{m.label}</span>
              <Icon name="chevronRight" size={18} />
            </a>
          </li>
        ))}
      </ul>
    </Panel>
  )
}

function Inquiries() {
  return (
    <Panel>
      <PanelTitle
        right={
          <Button size="sm" className="h-11">
            <Icon name="message" size={17} /> 상담 요청하기
          </Button>
        }
      >
        내 문의 내역
      </PanelTitle>
      <table className="hidden w-full text-left md:table">
        <thead>
          <tr className="bg-surface text-sm text-sub">
            <th className="rounded-l-xl px-4 py-3 font-medium">문의 제목</th>
            <th className="px-4 py-3 font-medium">접수일</th>
            <th className="px-4 py-3 font-medium">처리 상태</th>
            <th className="rounded-r-xl px-4 py-3 font-medium">바로가기</th>
          </tr>
        </thead>
        <tbody>
          {inquiries.map((q) => (
            <tr key={q.title} className="border-b border-line">
              <td className="px-4 py-5">{q.title}</td>
              <td className="px-4 py-5">{q.date}</td>
              <td className="px-4 py-5">
                <Badge tone={q.status.tone} dot>
                  {q.status.label}
                </Badge>
              </td>
              <td className="px-4 py-5">
                <Button variant="outline" size="sm">
                  문의 상세 보기
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ul className="divide-y divide-line md:hidden">
        {inquiries.map((q) => (
          <li key={q.title}>
            <a href="#" className="flex items-center justify-between gap-3 py-4">
              <div>
                <p className="font-medium">{q.title}</p>
                <p className="mt-1 text-sm text-sub">{q.date}</p>
              </div>
              <Badge tone={q.status.tone} dot>
                {q.status.label}
              </Badge>
            </a>
          </li>
        ))}
      </ul>
    </Panel>
  )
}

export default function SupportPage() {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[1fr_476px]">
        <ChatBot />
        <div className="space-y-6">
          <EasyTools />
          <SupportMenu />
        </div>
      </div>
      <Inquiries />
    </div>
  )
}
