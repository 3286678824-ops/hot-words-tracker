import type { HotWord } from '../../core/models/HotWord'
import type { Category } from '../../core/models/Category'
import { HistoryItem } from './HistoryItem'
import './history.css'

interface HistoryListProps {
  words: HotWord[]
  getCategories: (ids: number[]) => Category[]
  onDelete: (id: number) => void
}

export function HistoryList({ words, getCategories, onDelete }: HistoryListProps) {
  return (
    <div className="history-list">
      {words.map((word, i) => (
        <HistoryItem
          key={word.id ?? i}
          word={word}
          categories={getCategories(word.categoryIds)}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}
