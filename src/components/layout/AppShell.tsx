import { Outlet, useLocation } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { BottomNav } from './BottomNav'
import './layout.css'

const PAGE_TITLES: Record<string, string> = {
  '/': '仪表盘',
  '/add': '添加热词',
  '/history': '历史记录',
  '/categories': '分类管理',
}

export function AppShell() {
  const location = useLocation()
  const title = PAGE_TITLES[location.pathname] || '热词追踪器'

  return (
    <div className="app-shell">
      <Sidebar />
      <div className="mobile-header">
        <h1 className="mobile-header__title">{title}</h1>
      </div>
      <main className="app-shell__main">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  )
}
