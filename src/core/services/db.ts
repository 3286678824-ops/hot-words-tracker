import Dexie, { type EntityTable } from 'dexie'
import type { HotWord } from '../models/HotWord'
import type { Category } from '../models/Category'

export class HotWordsDatabase extends Dexie {
  hotWords!: EntityTable<HotWord, 'id'>
  categories!: EntityTable<Category, 'id'>

  constructor() {
    super('HotWordsDB')
    this.version(3).stores({
      hotWords: '++id, word, createdAt',
      categories: '++id, name',
    })
  }
}

export const db = new HotWordsDatabase()
