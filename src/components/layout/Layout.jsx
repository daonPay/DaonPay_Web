import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import BottomNav from './BottomNav'
import Footer from './Footer'
import Header from './Header'

export default function Layout() {
  const { pathname } = useLocation()

  // 페이지 이동 시 맨 위로 스크롤
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className="flex min-h-svh flex-col">
      <Header />
      <main className="mx-auto w-full max-w-[1200px] flex-1 px-4 py-6 pb-28 md:px-6 md:py-10 md:pb-10 xl:px-0">
        <Outlet />
      </main>
      <div className="pb-[76px] md:pb-0">
        <Footer />
      </div>
      <BottomNav />
    </div>
  )
}
