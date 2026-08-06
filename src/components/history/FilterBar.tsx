import type { Category } from '../../core/models/Category'
import { Tag } from '../common/Tag'
import './history.css'

interface FilterBarProps {
  categories: Category[]
  selectedCategoryId?: number
  onCategoryChange: (categoryId: number | undefined) => void
}

export function FilterBar({ categories, selectedCategoryId, onCategoryChange }: FilterBarProps) {
  return (
    <div className="filter-bar">
      <Tag
        color="#64748b"
        selected={selectedCategoryId === undefined}
        onClick={() => onCategoryChange(undefined)}
      >
        全部
      </Tag>
      {categories.map((cat) => (
        <Tag
          key={cat.id}
          color={cat.color}
          selected={cat.id === selectedCategoryId}
          onClick={() => cat.id !== undefined && onCategoryChange(cat.id)}
        >
          {cat.name}
        </Tag>
      ))}
    </div>
  )
}
