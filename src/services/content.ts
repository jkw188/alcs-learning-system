import type { ChapterMeta, ChapterRecord } from '../types/content'

const chapterMetaModules = import.meta.glob('../content/chapters/*/chapter.json', {
  eager: true,
  import: 'default',
}) as Record<string, ChapterMeta>

const markdownModules = import.meta.glob('../content/chapters/**/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>

const assetModules = import.meta.glob(
  '../content/chapters/**/*.{png,jpg,jpeg,svg,webp,gif}',
  {
    eager: true,
    query: '?url',
    import: 'default',
  },
) as Record<string, string>

function normalizePath(path: string) {
  return path.replace(/\\/g, '/')
}

function folderFromMetaPath(path: string) {
  const normalized = normalizePath(path)
  const match = normalized.match(/\.\.\/content\/chapters\/(.+)\/chapter\.json$/)
  if (!match) throw new Error(`Invalid chapter metadata path: ${path}`)
  return match[1]
}

export const chapters: ChapterRecord[] = Object.entries(chapterMetaModules)
  .map(([path, meta]) => ({ meta, folder: folderFromMetaPath(path) }))
  .sort((a, b) => a.meta.number - b.meta.number)

export function getChapter(id: string) {
  return chapters.find((chapter) => chapter.meta.id === id)
}

export function getMarkdown(folder: string, file: string) {
  const key = `../content/chapters/${folder}/${file}`
  return markdownModules[key]
}

export function resolveContentAsset(folder: string, src: string) {
  if (/^(https?:|data:|\/)/.test(src)) return src
  const clean = src.replace(/^\.\//, '')
  return assetModules[`../content/chapters/${folder}/${clean}`] ?? src
}
