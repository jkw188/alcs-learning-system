import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { ChapterLayout } from './layouts/ChapterLayout'
import { SiteLayout } from './layouts/SiteLayout'
import { ChapterOverviewPage } from './pages/ChapterOverviewPage'
import { HomePage } from './pages/HomePage'
import { ModulePage } from './pages/ModulePage'
import { NotFoundPage } from './pages/NotFoundPage'

const baseUrl = import.meta.env.BASE_URL
const basename = baseUrl === '/' ? undefined : baseUrl.replace(/\/$/, '')

export default function App() {
  return (
    <BrowserRouter basename={basename}>
      <Routes>
        <Route element={<SiteLayout />}>
          <Route index element={<HomePage />} />
          <Route path="chapter/:id" element={<ChapterLayout />}>
            <Route index element={<ChapterOverviewPage />} />
            <Route path="module/:moduleId" element={<ModulePage />} />
          </Route>
          <Route path="404" element={<NotFoundPage />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
