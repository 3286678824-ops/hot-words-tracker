import type { Category } from '../../core/models/Category'
import { Tag } from '../common/Tag'
import './add-word.css'

interface CategoryPickerProps {
  categories: Category[]
  selectedIds: number[]
  onToggle: (id: number) => void
}

export function CategoryPicker({ categories, selectedIds, onToggle }: CategoryPickerProps) {
  return (
    <div className="category-picker">
      <label className="category-picker__label">选择分类（可多选）</label>
      <div className="category-picker__chips">
        {categories.map((cat) => (
          <Tag
            key={cat.id}
            color={cat.color}
            selected={cat.id !== undefined && selectedIds.includes(cat.id)}
            onClick={() => cat.id !== undefined && onToggle(cat.id)}
          >
            {cat.name}
          </Tag>
        ))}
      </div>
      {selectedIds.length === 0 && (
        <span className="category-picker__hint">至少选择一个分类</span>
      )}
    </div>
  )
}
