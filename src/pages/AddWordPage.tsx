import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useHotWords } from '../hooks/useHotWords'
import { useCategories } from '../hooks/useCategories'
import { AddWordForm } from '../components/add-word/AddWordForm'
import { fetchDefinition } from '../core/services/DefinitionService'
import './pages.css'

export function AddWordPage() {
  const navigate = useNavigate()
  const { addHotWord, updateWordDefinition } = useHotWords()
  const { categories, loading: catLoading } = useCategories()
  const [error, setError] = useState('')

  const handleAdd = async (word: string, categoryIds: number[]) => {
    try {
      setError('')
      const hw = await addHotWord(word, categoryIds)
      navigate('/')
      if (hw.id !== undefined) {
        fetchDefinition(hw.word).then((def) => {
          if (def) updateWordDefinition(hw.id!, def)
        })
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : '添加失败')
    }
  }

  if (catLoading) {
    return <div className="page-loading">加载中...</div>
  }

  return (
    <div className="add-word-page">
      {categories.length === 0 ? (
        <div className="add-word-page__no-cat">
          <p>请先创建分类</p>
          <p className="add-word-page__hint">点击底部"分类管理"添加分类</p>
        </div>
      ) : (
        <AddWordForm categories={categories} onSubmit={handleAdd} error={error} />
      )}
    </div>
  )
}
