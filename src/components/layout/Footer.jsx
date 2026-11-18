import Icon from '../ui/Icon'
import { Emblem } from '../ui/Logo'

const SOCIALS = [
  { name: 'x', label: 'X' },
  { name: 'instagram', label: '인스타그램' },
  { name: 'facebook', label: '페이스북' },
]

export default function Footer() {
  return (
    <footer className="border-t border-line bg-white text-sm">
      <div className="px-5 py-6 md:px-8">
        <div className="flex items-start justify-between gap-4">
          <Emblem height={44} />
          <div className="flex gap-2">
            {SOCIALS.map((s) => (
              <a
                key={s.name}
                href="#"
                aria-label={s.label}
                className="grid size-8 place-items-center rounded-full border border-line text-ink hover:bg-surface"
              >
                <Icon name={s.name} size={15} />
              </a>
            ))}
          </div>
        </div>
        <p className="mt-4 leading-relaxed text-ink">
          <b>콜센터</b> 1234-5678, 02-000-0000 (지역번호 ‘02’를 확인하세요.) (09:00 ~ 18:00 평일)
          <span className="hidden md:inline"> | </span>
          <br className="md:hidden" />
          민원안내콜센터 국번없이 123 (무료, 휴일포함 365일 24시간)
        </p>
      </div>
      <div className="flex flex-col gap-2 border-t border-line px-5 py-4 text-xs text-sub md:flex-row md:items-center md:justify-between md:px-8">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
          <span className="text-sm text-ink">Daon</span>
          <a href="#" className="font-bold text-ink">개인정보처리방침</a>
          <a href="#">이용약관</a>
          <span>웹 접근성 품질인증 마크 획득</span>
        </div>
        <p>© 2026 인공인공인 All rights reserved. · 와이어프레임 예시 화면입니다. 모든 금액·장소는 가상 데이터예요.</p>
      </div>
    </footer>
  )
}
