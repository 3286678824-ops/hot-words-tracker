import type { IStorageService, PaginationOptions } from './IStorageService'
import type { HotWord, HotWordFilter, FrequencyEntry } from '../models/HotWord'
import type { Category } from '../models/Category'
import { db } from './db'

export class IndexedDBService implements IStorageService {
  async getHotWords(filter?: HotWordFilter, pagination?: PaginationOptions): Promise<HotWord[]> {
    let collection = db.hotWords.orderBy('createdAt').reverse()

    if (filter) {
      collection = collection.filter((hw) => {
        if (filter.categoryId !== undefined && !hw.categoryIds.includes(filter.categoryId)) return false
        if (filter.dateFrom && new Date(hw.createdAt) < filter.dateFrom) return false
        if (filter.dateTo && new Date(hw.createdAt) > filter.dateTo) return false
        if (filter.searchQuery && !hw.word.includes(filter.searchQuery)) return false
        return true
      })
    }

    const result = await collection.toArray()

    if (pagination) {
      const offset = pagination.offset ?? 0
      const limit = pagination.limit ?? result.length
      return result.slice(offset, offset + limit)
    }

    return result
  }

  async getHotWordById(id: number): Promise<HotWord | undefined> {
    return db.hotWords.get(id)
  }

  async addHotWord(data: Omit<HotWord, 'id' | 'createdAt'>): Promise<HotWord> {
    const id = await db.hotWords.add({
      word: data.word,
      categoryIds: data.categoryIds,
      createdAt: new Date(),
    } as HotWord)
    return (await db.hotWords.get(id))!
  }

  async deleteHotWord(id: number): Promise<void> {
    await db.hotWords.delete(id)
  }

  async getHotWordCount(filter?: HotWordFilter): Promise<number> {
    const words = await this.getHotWords(filter)
    return words.length
  }

  async getWordFrequency(limit = 50): Promise<FrequencyEntry[]> {
    const all = await db.hotWords.toArray()
    const freqMap = new Map<string, number>()
    for (const hw of all) {
      freqMap.set(hw.word, (freqMap.get(hw.word) || 0) + 1)
    }
    return Array.from(freqMap.entries())
      .map(([word, count]) => ({ word, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, limit)
  }

  async getCategories(): Promise<Category[]> {
    return db.categories.toArray()
  }

  async getCategoryById(id: number): Promise<Category | undefined> {
    return db.categories.get(id)
  }

  async addCategory(data: Omit<Category, 'id'>): Promise<Category> {
    const id = await db.categories.add(data as Category)
    return (await db.categories.get(id))!
  }

  async updateCategory(id: number, data: Partial<Category>): Promise<Category> {
    await db.categories.update(id, data)
    return (await db.categories.get(id))!
  }

  async deleteCategory(id: number): Promise<void> {
    await db.categories.delete(id)
  }

  async getCategoryUsageCount(categoryId: number): Promise<number> {
    const all = await db.hotWords.toArray()
    return all.filter((hw) => hw.categoryIds.includes(categoryId)).length
  }

  async updateHotWordDefinition(id: number, definition: string): Promise<void> {
    await db.hotWords.update(id, { definition })
  }

  async getPendingChanges(): Promise<number> {
    return 0
  }

  async pullRemoteChanges(): Promise<void> {
    // no-op: cloud sync not implemented
  }

  async pushLocalChanges(): Promise<void> {
    // no-op: cloud sync not implemented
  }
}
