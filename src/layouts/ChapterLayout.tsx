import { Menu } from 'lucide-react'
import { useState } from 'react'
import { Navigate, Outlet, useParams } from 'react-router-dom'
import { ChapterSidebar } from '../components/ChapterSidebar'
import { getChapter } from '../services/content'

export function ChapterLayout() {
  const { id } = useParams()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const chapter = id ? getChapter(id) : undefined

  if (!chapter) return <Navigate to="/404" replace />

  return (
    <div className="chapter-shell">
      <ChapterSidebar
        chapter={chapter.meta}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <main className="chapter-main">
        <button className="mobile-menu-button" onClick={() => setSidebarOpen(true)}>
          <Menu size={18} /> Chapter menu
        </button>
        <Outlet context={{ chapter }} />
      </main>
    </div>
  )
}
