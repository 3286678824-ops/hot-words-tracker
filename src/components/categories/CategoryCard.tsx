import type { Category } from '../../core/models/Category'
import './categories.css'

interface CategoryCardProps {
  category: Category
  onEdit: (cat: Category) => void
  onDelete: (cat: Category) => void
}

export function CategoryCard({ category, onEdit, onDelete }: CategoryCardProps) {
  return (
    <div className="category-card">
      <div className="category-card__swatch" style={{ backgroundColor: category.color }} />
      <span className="category-card__name">{category.name}</span>
      <div className="category-card__actions">
        <button className="category-card__btn" onClick={() => onEdit(category)}>
          编辑
        </button>
        <button
          className="category-card__btn category-card__btn--danger"
          onClick={() => onDelete(category)}
        >
          删除
        </button>
      </div>
    </div>
  )
}
