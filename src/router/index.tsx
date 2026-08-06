import { createHashRouter } from 'react-router-dom'
import { AppShell } from '../components/layout/AppShell'
import { DashboardPage } from '../pages/DashboardPage'
import { AddWordPage } from '../pages/AddWordPage'
import { HistoryPage } from '../pages/HistoryPage'
import { CategoriesPage } from '../pages/CategoriesPage'

export const router = createHashRouter([
  {
    element: <AppShell />,
    children: [
      { path: '/', element: <DashboardPage /> },
      { path: '/add', element: <AddWordPage /> },
      { path: '/history', element: <HistoryPage /> },
      { path: '/categories', element: <CategoriesPage /> },
    ],
  },
])
