import { useState } from 'react'
import type { HotWord } from '../../core/models/HotWord'
import type { Category } from '../../core/models/Category'
import { Tag } from '../common/Tag'
import { formatDateTime } from '../../core/utils/date'
import './history.css'

interface HistoryItemProps {
  word: HotWord
  categories: Category[]
  onDelete: (id: number) => void
}

export function HistoryItem({ word, categories, onDelete }: HistoryItemProps) {
  const [expanded, setExpanded] = useState(false)
  const hasDefinition = word.definition !== undefined

  return (
    <div className="history-item">
      <div className="history-item__info">
        <div className="history-item__header">
          <span className="history-item__word">{word.word}</span>
          {hasDefinition && (
            <button
              className={`history-item__expand ${expanded ? 'is-expanded' : ''}`}
              onClick={() => setExpanded(!expanded)}
              title={expanded ? '收起' : '查看释义'}
            >
              {expanded ? '▲' : '▼'}
            </button>
          )}
        </div>
        <div className="history-item__meta">
          {categories.map((cat) => (
            <Tag key={cat.id} color={cat.color}>{cat.name}</Tag>
          ))}
          <span className="history-item__time">
            {word.createdAt ? formatDateTime(word.createdAt) : ''}
          </span>
        </div>
        {expanded && (
          <div className="history-item__definition">
            {word.definition === null || word.definition === ''
              ? '暂无解释'
              : word.definition ?? '搜索释义中...'}
          </div>
        )}
      </div>
      <button
        className="history-item__delete"
        onClick={() => word.id !== undefined && onDelete(word.id)}
        title="删除"
      >
        ✕
      </button>
    </div>
  )
}
