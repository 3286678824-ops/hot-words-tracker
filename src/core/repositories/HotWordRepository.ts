import type { IStorageService, PaginationOptions } from '../services/IStorageService'
import type { HotWord, HotWordFilter, FrequencyEntry, WordCloudEntry } from '../models/HotWord'
import { validateHotWord } from '../utils/validation'

export class HotWordRepository {
  private storage: IStorageService

  constructor(storage: IStorageService) {
    this.storage = storage
  }

  async getAll(filter?: HotWordFilter, pagination?: PaginationOptions): Promise<HotWord[]> {
    return this.storage.getHotWords(filter, pagination)
  }

  async getById(id: number): Promise<HotWord | undefined> {
    return this.storage.getHotWordById(id)
  }

  async add(word: string, categoryIds: number[]): Promise<HotWord> {
    validateHotWord(word, categoryIds)
    return this.storage.addHotWord({ word: word.trim(), categoryIds })
  }

  async delete(id: number): Promise<void> {
    return this.storage.deleteHotWord(id)
  }

  async getCount(filter?: HotWordFilter): Promise<number> {
    return this.storage.getHotWordCount(filter)
  }

  async getTodayCount(): Promise<number> {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)

    return this.storage.getHotWordCount({
      dateFrom: today,
      dateTo: tomorrow,
    })
  }

  async getTopWords(limit = 10): Promise<FrequencyEntry[]> {
    return this.storage.getWordFrequency(limit)
  }

  async getWordCloudData(minCount = 1): Promise<WordCloudEntry[]> {
    const freq = await this.storage.getWordFrequency(100)
    return freq
      .filter((f) => f.count >= minCount)
      .map((f) => ({ name: f.word, value: f.count }))
  }

  async updateDefinition(id: number, definition: string): Promise<void> {
    return this.storage.updateHotWordDefinition(id, definition)
  }
}
