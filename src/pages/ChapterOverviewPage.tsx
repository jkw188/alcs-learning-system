import { ArrowRight } from 'lucide-react'
import { Link, useOutletContext } from 'react-router-dom'
import { MarkdownContent } from '../components/MarkdownContent'
import { getMarkdown } from '../services/content'
import type { ChapterRecord } from '../types/content'

export function ChapterOverviewPage() {
  const { chapter } = useOutletContext<{ chapter: ChapterRecord }>()
  const content = getMarkdown(chapter.folder, chapter.meta.overview)
  const firstModule = chapter.meta.modules[0]

  if (!content) return <p>Overview content not found.</p>

  return (
    <div className="reader-wrap">
      <div className="reader-breadcrumb">Chapter {chapter.meta.number} / Overview</div>
      <MarkdownContent content={content} chapterFolder={chapter.folder} />
      {firstModule && (
        <div className="reader-navigation reader-navigation-end">
          <Link to={`/chapter/${chapter.meta.id}/module/${firstModule.id}`} className="next-link">
            <span><small>Next</small>{firstModule.title}</span>
            <ArrowRight size={20} />
          </Link>
        </div>
      )}
    </div>
  )
}
