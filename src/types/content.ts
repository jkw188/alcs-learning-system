export type ChapterStatus = 'available' | 'coming-soon'

export interface ModuleMeta {
  id: string
  number: number
  title: string
  file: string
}

export interface ChapterMeta {
  id: string
  number: number
  title: string
  description?: string
  status?: ChapterStatus
  overview: string
  modules: ModuleMeta[]
}

export interface ChapterRecord {
  meta: ChapterMeta
  folder: string
}
