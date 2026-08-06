import type { IStorageService, PaginationOptions } from './IStorageService'
import type { HotWord, HotWordFilter, FrequencyEntry } from '../models/HotWord'
import type { Category } from '../models/Category'
import { supabase } from '../supabase'

interface HotWordRow {
  id: number
  word: string
  category_ids: number[]
  definition?: string | null
  created_at: string
}

interface CategoryRow {
  id: number
  name: string
  color: string
}

function toHotWord(row: HotWordRow): HotWord {
  return {
    id: row.id,
    word: row.word,
    categoryIds: row.category_ids,
    definition: row.definition ?? undefined,
    createdAt: new Date(row.created_at),
  }
}

function toHotWordRow(data: Omit<HotWord, 'id' | 'createdAt'>): Omit<HotWordRow, 'id' | 'created_at'> {
  return {
    word: data.word,
    category_ids: data.categoryIds,
    definition: data.definition ?? null,
  }
}

export class SupabaseService implements IStorageService {
  async getHotWords(filter?: HotWordFilter, pagination?: PaginationOptions): Promise<HotWord[]> {
    let query = supabase.from('hot_words').select('*').order('created_at', { ascending: false })

    if (filter?.categoryId !== undefined) {
      query = query.contains('category_ids', [filter.categoryId])
    }
    if (filter?.dateFrom) {
      query = query.gte('created_at', filter.dateFrom.toISOString())
    }
    if (filter?.dateTo) {
      query = query.lte('created_at', filter.dateTo.toISOString())
    }
    if (filter?.searchQuery) {
      query = query.ilike('word', `%${filter.searchQuery}%`)
    }

    if (pagination) {
      const offset = pagination.offset ?? 0
      const limit = pagination.limit ?? 50
      query = query.range(offset, offset + limit - 1)
    }

    const { data } = await query
    return (data as HotWordRow[] ?? []).map(toHotWord)
  }

  async getHotWordById(id: number): Promise<HotWord | undefined> {
    const { data } = await supabase.from('hot_words').select('*').eq('id', id).single()
    return data ? toHotWord(data as HotWordRow) : undefined
  }

  async addHotWord(data: Omit<HotWord, 'id' | 'createdAt'>): Promise<HotWord> {
    const { data: row } = await supabase
      .from('hot_words')
      .insert({ ...toHotWordRow(data), created_at: new Date().toISOString() })
      .select()
      .single()
    return toHotWord(row as HotWordRow)
  }

  async deleteHotWord(id: number): Promise<void> {
    await supabase.from('hot_words').delete().eq('id', id)
  }

  async getHotWordCount(filter?: HotWordFilter): Promise<number> {
    let query = supabase.from('hot_words').select('*', { count: 'exact', head: true })

    if (filter?.categoryId !== undefined) {
      query = query.contains('category_ids', [filter.categoryId])
    }
    if (filter?.dateFrom) {
      query = query.gte('created_at', filter.dateFrom.toISOString())
    }
    if (filter?.dateTo) {
      query = query.lte('created_at', filter.dateTo.toISOString())
    }
    if (filter?.searchQuery) {
      query = query.ilike('word', `%${filter.searchQuery}%`)
    }

    const { count } = await query
    return count ?? 0
  }

  async getWordFrequency(limit = 50): Promise<FrequencyEntry[]> {
    const { data } = await supabase.from('hot_words').select('word')
    const freqMap = new Map<string, number>()
    for (const row of (data as { word: string }[] ?? [])) {
      freqMap.set(row.word, (freqMap.get(row.word) || 0) + 1)
    }
    return Array.from(freqMap.entries())
      .map(([word, count]) => ({ word, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, limit)
  }

  async getCategories(): Promise<Category[]> {
    const { data } = await supabase.from('categories').select('*').order('id')
    return (data as CategoryRow[] ?? [])
  }

  async getCategoryById(id: number): Promise<Category | undefined> {
    const { data } = await supabase.from('categories').select('*').eq('id', id).single()
    return (data as CategoryRow) ?? undefined
  }

  async addCategory(data: Omit<Category, 'id'>): Promise<Category> {
    const { data: row } = await supabase.from('categories').insert(data).select().single()
    return row as Category
  }

  async updateCategory(id: number, data: Partial<Category>): Promise<Category> {
    const { data: row } = await supabase.from('categories').update(data).eq('id', id).select().single()
    return row as Category
  }

  async deleteCategory(id: number): Promise<void> {
    await supabase.from('categories').delete().eq('id', id)
  }

  async getCategoryUsageCount(categoryId: number): Promise<number> {
    const { count } = await supabase
      .from('hot_words')
      .select('*', { count: 'exact', head: true })
      .contains('category_ids', [categoryId])
    return count ?? 0
  }

  async updateHotWordDefinition(id: number, definition: string): Promise<void> {
    await supabase.from('hot_words').update({ definition }).eq('id', id)
  }

  async getPendingChanges(): Promise<number> {
    return 0
  }

  async pullRemoteChanges(): Promise<void> {}
  async pushLocalChanges(): Promise<void> {}
}
