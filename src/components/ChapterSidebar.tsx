import { BookOpen, ChevronLeft, X } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import type { ChapterMeta } from '../types/content'

interface ChapterSidebarProps {
  chapter: ChapterMeta
  open: boolean
  onClose: () => void
}

export function ChapterSidebar({ chapter, open, onClose }: ChapterSidebarProps) {
  return (
    <>
      {open && <button className="sidebar-backdrop" onClick={onClose} aria-label="Close menu" />}
      <aside className={`chapter-sidebar ${open ? 'is-open' : ''}`}>
        <div className="sidebar-header">
          <div>
            <span className="eyebrow">Chapter {chapter.number}</span>
            <strong>{chapter.title}</strong>
          </div>
          <button className="icon-button mobile-only" onClick={onClose} aria-label="Close menu">
            <X size={20} />
          </button>
        </div>

        <nav className="module-nav" aria-label="Chapter navigation">
          <NavLink
            end
            to={`/chapter/${chapter.id}`}
            onClick={onClose}
            className={({ isActive }) => `module-nav-link ${isActive ? 'active' : ''}`}
          >
            <BookOpen size={17} />
            <span>Overview</span>
          </NavLink>

          {chapter.modules.map((module) => (
            <NavLink
              key={module.id}
              to={`/chapter/${chapter.id}/module/${module.id}`}
              onClick={onClose}
              className={({ isActive }) => `module-nav-link ${isActive ? 'active' : ''}`}
            >
              <span className="module-number">{String(module.number).padStart(2, '0')}</span>
              <span>{module.title}</span>
            </NavLink>
          ))}
        </nav>

        <NavLink to="/" className="back-home-link" onClick={onClose}>
          <ChevronLeft size={17} /> All chapters
        </NavLink>
      </aside>
    </>
  )
}
