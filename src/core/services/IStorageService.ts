import type { HotWord, HotWordFilter, FrequencyEntry } from '../models/HotWord'
import type { Category } from '../models/Category'

export interface PaginationOptions {
  limit?: number
  offset?: number
}

export interface IStorageService {
  getHotWords(filter?: HotWordFilter, pagination?: PaginationOptions): Promise<HotWord[]>
  getHotWordById(id: number): Promise<HotWord | undefined>
  addHotWord(data: Omit<HotWord, 'id' | 'createdAt'>): Promise<HotWord>
  deleteHotWord(id: number): Promise<void>
  getHotWordCount(filter?: HotWordFilter): Promise<number>
  getWordFrequency(limit?: number): Promise<FrequencyEntry[]>

  getCategories(): Promise<Category[]>
  getCategoryById(id: number): Promise<Category | undefined>
  addCategory(data: Omit<Category, 'id'>): Promise<Category>
  updateCategory(id: number, data: Partial<Category>): Promise<Category>
  deleteCategory(id: number): Promise<void>
  getCategoryUsageCount(categoryId: number): Promise<number>

  updateHotWordDefinition(id: number, definition: string): Promise<void>

  getPendingChanges(): Promise<number>
  pullRemoteChanges(): Promise<void>
  pushLocalChanges(): Promise<void>
}
