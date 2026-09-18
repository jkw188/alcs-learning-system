import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Link, Navigate, useOutletContext, useParams } from 'react-router-dom'
import { MarkdownContent } from '../components/MarkdownContent'
import { getMarkdown } from '../services/content'
import type { ChapterRecord } from '../types/content'

export function ModulePage() {
  const { moduleId } = useParams()
  const { chapter } = useOutletContext<{ chapter: ChapterRecord }>()
  const index = chapter.meta.modules.findIndex((module) => module.id === moduleId)

  if (index < 0) return <Navigate to={`/chapter/${chapter.meta.id}`} replace />

  const module = chapter.meta.modules[index]
  const previous = chapter.meta.modules[index - 1]
  const next = chapter.meta.modules[index + 1]
  const content = getMarkdown(chapter.folder, module.file)

  if (!content) return <p>Module content not found: {module.file}</p>

  return (
    <div className="reader-wrap">
      <div className="reader-breadcrumb">
        Chapter {chapter.meta.number} / Module {module.number}
      </div>
      <MarkdownContent content={content} chapterFolder={chapter.folder} />

      <div className="reader-navigation">
        {previous ? (
          <Link to={`/chapter/${chapter.meta.id}/module/${previous.id}`} className="prev-link">
            <ArrowLeft size={20} />
            <span><small>Previous</small>{previous.title}</span>
          </Link>
        ) : (
          <Link to={`/chapter/${chapter.meta.id}`} className="prev-link">
            <ArrowLeft size={20} />
            <span><small>Previous</small>Chapter overview</span>
          </Link>
        )}

        {next && (
          <Link to={`/chapter/${chapter.meta.id}/module/${next.id}`} className="next-link">
            <span><small>Next</small>{next.title}</span>
            <ArrowRight size={20} />
          </Link>
        )}
      </div>
    </div>
  )
}
