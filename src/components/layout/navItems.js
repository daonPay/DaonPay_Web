export const NAV_ITEMS = [
  { to: '/', label: '홈', icon: 'home', end: true },
  { to: '/my', label: '내 정보', icon: 'user', match: ['/my', '/support'] },
  { to: '/card', label: '카드', icon: 'card' },
  { to: '/whitelist', label: '화이트리스트', icon: 'store' },
]

// '고객센터'는 내 정보 메뉴 아래에 있어서 내 정보 탭을 활성화해요.
export function isNavActive(item, pathname) {
  if (item.end) return pathname === item.to
  const targets = item.match ?? [item.to]
  return targets.some((t) => pathname === t || pathname.startsWith(`${t}/`))
}
