import { Link, useLocation } from 'react-router-dom'
import Icon from '../ui/Icon'
import { NAV_ITEMS, isNavActive } from './navItems'

// 모바일 전용 하단 탭바 (Figma App - Mobile의 Bottom Navigation)
export default function BottomNav() {
  const { pathname } = useLocation()

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-white px-2 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] md:hidden"
      aria-label="하단 메뉴"
    >
      <ul className="grid grid-cols-4 gap-1">
        {NAV_ITEMS.map((item) => {
          const active = isNavActive(item, pathname)
          return (
            <li key={item.to}>
              <Link
                to={item.to}
                aria-current={active ? 'page' : undefined}
                className={`flex flex-col items-center gap-1 rounded-xl py-2 text-xs ${
                  active ? 'bg-brand-soft font-bold text-brand' : 'text-sub'
                }`}
              >
                <Icon name={item.icon} size={22} />
                {item.label}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
