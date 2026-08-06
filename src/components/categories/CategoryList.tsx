import type { Category } from '../../core/models/Category'
import { CategoryCard } from './CategoryCard'
import './categories.css'

interface CategoryListProps {
  categories: Category[]
  onEdit: (cat: Category) => void
  onDelete: (cat: Category) => void
}

export function CategoryList({ categories, onEdit, onDelete }: CategoryListProps) {
  return (
    <div className="category-list">
      {categories.map((cat) => (
        <CategoryCard
          key={cat.id}
          category={cat}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}
