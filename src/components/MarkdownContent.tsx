import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import { resolveContentAsset } from '../services/content'

interface MarkdownContentProps {
  content: string
  chapterFolder: string
}

export function MarkdownContent({ content, chapterFolder }: MarkdownContentProps) {
  return (
    <article className="markdown-content">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          img: ({ src = '', alt = '', ...props }) => (
            <img
              src={resolveContentAsset(chapterFolder, src)}
              alt={alt}
              loading="lazy"
              {...props}
            />
          ),
          a: ({ href = '', children, ...props }) => (
            <a
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noreferrer' : undefined}
              {...props}
            >
              {children}
            </a>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </article>
  )
}
