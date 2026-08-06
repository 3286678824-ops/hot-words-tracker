import { useState, useEffect, useCallback } from 'react'
import type { HotWord, HotWordFilter } from '../core/models/HotWord'
import { useService } from './useService'

export function useHotWords(initialFilter?: HotWordFilter) {
  const { hotWordRepo } = useService()
  const [hotWords, setHotWords] = useState<HotWord[]>([])
  const [filter, setFilter] = useState<HotWordFilter | undefined>(initialFilter)
  const [loading, setLoading] = useState(true)

  const loadHotWords = useCallback(async () => {
    setLoading(true)
    const data = await hotWordRepo.getAll(filter)
    setHotWords(data)
    setLoading(false)
  }, [hotWordRepo, filter])

  useEffect(() => {
    loadHotWords()
  }, [loadHotWords])

  const addHotWord = useCallback(
    async (word: string, categoryIds: number[]): Promise<HotWord> => {
      const hw = await hotWordRepo.add(word, categoryIds)
      await loadHotWords()
      return hw
    },
    [hotWordRepo, loadHotWords]
  )

  const deleteHotWord = useCallback(
    async (id: number): Promise<void> => {
      await hotWordRepo.delete(id)
      await loadHotWords()
    },
    [hotWordRepo, loadHotWords]
  )

  const updateFilter = useCallback((newFilter: HotWordFilter | undefined) => {
    setFilter(newFilter)
  }, [])

  const updateWordDefinition = useCallback(
    async (id: number, definition: string): Promise<void> => {
      await hotWordRepo.updateDefinition(id, definition)
      setHotWords((prev) =>
        prev.map((hw) => (hw.id === id ? { ...hw, definition } : hw))
      )
    },
    [hotWordRepo]
  )

  return {
    hotWords,
    loading,
    filter,
    addHotWord,
    deleteHotWord,
    updateFilter,
    updateWordDefinition,
    reload: loadHotWords,
  }
}
