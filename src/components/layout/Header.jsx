import { Link, useLocation } from 'react-router-dom'
import Icon from '../ui/Icon'
import Logo from '../ui/Logo'
import { NAV_ITEMS, isNavActive } from './navItems'

export default function Header() {
  const { pathname } = useLocation()

  return (
    <header className="sticky top-0 z-30 border-b border-line bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-4 md:h-[75px] md:px-6 xl:px-0">
        <div className="flex items-center gap-10">
          <Link to="/" aria-label="다온페이 홈">
            <Logo />
          </Link>
          {/* 데스크탑 상단 메뉴 (모바일은 하단 탭바 사용) */}
          <nav className="hidden items-center gap-2 md:flex" aria-label="주 메뉴">
            {NAV_ITEMS.map((item) => {
              const active = isNavActive(item, pathname)
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  aria-current={active ? 'page' : undefined}
                  className={`rounded-xl px-4 py-2.5 text-[1.0625rem] transition-colors ${
                    active ? 'bg-brand-soft font-bold text-brand' : 'text-sub hover:bg-surface hover:text-ink'
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>
        </div>
        <Link to="/my" className="flex items-center gap-3">
          <span className="hidden text-[0.9375rem] font-medium sm:inline">김새싹님</span>
          <span className="grid size-10 place-items-center rounded-full bg-brand-soft text-brand">
            <Icon name="user" size={20} />
          </span>
        </Link>
      </div>
    </header>
  )
}
