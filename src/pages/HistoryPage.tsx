import { useHotWords } from '../hooks/useHotWords'
import { useCategories } from '../hooks/useCategories'
import { HistoryList } from '../components/history/HistoryList'
import { FilterBar } from '../components/history/FilterBar'
import { EmptyState } from '../components/common/EmptyState'
import type { Category } from '../core/models/Category'
import './pages.css'

export function HistoryPage() {
  const { hotWords, filter, deleteHotWord, updateFilter, loading } = useHotWords()
  const { categories } = useCategories()

  if (loading) {
    return <div className="page-loading">加载中...</div>
  }

  return (
    <div className="history-page">
      <FilterBar
        categories={categories}
        selectedCategoryId={filter?.categoryId}
        onCategoryChange={(categoryId) => updateFilter(categoryId ? { categoryId } : undefined)}
      />
      {hotWords.length === 0 ? (
        <EmptyState message="暂无热词记录" />
      ) : (
        <HistoryList
          words={hotWords}
          getCategories={(ids) => ids.map((id) => categories.find((c) => c.id === id)).filter(Boolean) as Category[]}
          onDelete={(id) => deleteHotWord(id)}
        />
      )}
    </div>
  )
}
