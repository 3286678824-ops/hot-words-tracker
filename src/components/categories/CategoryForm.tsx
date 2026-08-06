import { useState } from 'react'
import type { Category } from '../../core/models/Category'
import { TextInput } from '../common/TextInput'
import { ColorPicker } from '../common/ColorPicker'
import { Button } from '../common/Button'
import './categories.css'

interface CategoryFormProps {
  initial?: Category
  onSubmit: (name: string, color: string) => void
  error?: string
}

export function CategoryForm({ initial, onSubmit, error }: CategoryFormProps) {
  const [name, setName] = useState(initial?.name ?? '')
  const [color, setColor] = useState(initial?.color ?? '#4f46e5')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return
    onSubmit(name.trim(), color)
  }

  return (
    <form className="category-form" onSubmit={handleSubmit}>
      <TextInput
        label="分类名称"
        placeholder="例如：科技、财经、社会..."
        value={name}
        onChange={(e) => setName(e.target.value)}
        error={error}
        autoFocus
      />
      <div className="category-form__color">
        <label className="category-form__color-label">颜色</label>
        <ColorPicker value={color} onChange={setColor} />
      </div>
      <Button type="submit" disabled={!name.trim()}>
        {initial ? '保存' : '创建'}
      </Button>
    </form>
  )
}
