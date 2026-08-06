import { useState } from 'react'
import type { Category } from '../../core/models/Category'
import { CategoryPicker } from './CategoryPicker'
import { TextInput } from '../common/TextInput'
import { Button } from '../common/Button'
import './add-word.css'

interface AddWordFormProps {
  categories: Category[]
  onSubmit: (word: string, categoryIds: number[]) => void
  error?: string
}

export function AddWordForm({ categories, onSubmit, error }: AddWordFormProps) {
  const [word, setWord] = useState('')
  const [selectedIds, setSelectedIds] = useState<number[]>([])

  const handleToggle = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!word.trim() || selectedIds.length === 0) return
    onSubmit(word.trim(), selectedIds)
    setWord('')
    setSelectedIds([])
  }

  return (
    <form className="add-word-form" onSubmit={handleSubmit}>
      <TextInput
        label="热词"
        placeholder="输入你听到的热点词汇..."
        value={word}
        onChange={(e) => setWord(e.target.value)}
        error={error}
        autoFocus
      />
      <CategoryPicker
        categories={categories}
        selectedIds={selectedIds}
        onToggle={handleToggle}
      />
      <Button type="submit" disabled={!word.trim() || selectedIds.length === 0}>
        添加
      </Button>
    </form>
  )
}
