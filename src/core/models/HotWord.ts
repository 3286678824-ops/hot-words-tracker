export interface HotWord {
  id?: number
  word: string
  categoryIds: number[]
  createdAt: Date
  definition?: string
}

export interface HotWordFilter {
  categoryId?: number
  dateFrom?: Date
  dateTo?: Date
  searchQuery?: string
}

export interface FrequencyEntry {
  word: string
  count: number
}

export interface WordCloudEntry {
  name: string
  value: number
}
