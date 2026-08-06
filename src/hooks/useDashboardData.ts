import { useState, useEffect, useCallback } from 'react'
import type { WordCloudEntry, FrequencyEntry } from '../core/models/HotWord'
import { useService } from './useService'

export function useDashboardData() {
  const { hotWordRepo } = useService()
  const [wordCloudData, setWordCloudData] = useState<WordCloudEntry[]>([])
  const [topWords, setTopWords] = useState<FrequencyEntry[]>([])
  const [totalCount, setTotalCount] = useState(0)
  const [todayCount, setTodayCount] = useState(0)
  const [loading, setLoading] = useState(true)

  const loadData = useCallback(async () => {
    setLoading(true)
    const [cloud, top, total, today] = await Promise.all([
      hotWordRepo.getWordCloudData(),
      hotWordRepo.getTopWords(10),
      hotWordRepo.getCount(),
      hotWordRepo.getTodayCount(),
    ])
    setWordCloudData(cloud)
    setTopWords(top)
    setTotalCount(total)
    setTodayCount(today)
    setLoading(false)
  }, [hotWordRepo])

  useEffect(() => {
    loadData()
  }, [loadData])

  return { wordCloudData, topWords, totalCount, todayCount, loading, reload: loadData }
}
