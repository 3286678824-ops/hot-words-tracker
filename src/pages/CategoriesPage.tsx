import { useState } from 'react'
import { useCategories } from '../hooks/useCategories'
import { CategoryList } from '../components/categories/CategoryList'
import { CategoryForm } from '../components/categories/CategoryForm'
import { ConfirmDialog } from '../components/common/ConfirmDialog'
import { Button } from '../components/common/Button'
import { Modal } from '../components/common/Modal'
import { EmptyState } from '../components/common/EmptyState'
import type { Category } from '../core/models/Category'
import './pages.css'

export function CategoriesPage() {
  const { categories, loading, addCategory, updateCategory, deleteCategory } = useCategories()
  const [showForm, setShowForm] = useState(false)
  const [editingCat, setEditingCat] = useState<Category | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<Category | null>(null)
  const [error, setError] = useState('')

  const handleSave = async (name: string, color: string) => {
    try {
      setError('')
      if (editingCat?.id) {
        await updateCategory(editingCat.id, { name, color })
      } else {
        await addCategory(name, color)
      }
      setShowForm(false)
      setEditingCat(null)
    } catch (e) {
      setError(e instanceof Error ? e.message : '保存失败')
    }
  }

  const handleDelete = async () => {
    if (!deleteTarget?.id) return
    try {
      await deleteCategory(deleteTarget.id)
      setDeleteTarget(null)
    } catch (e) {
      setError(e instanceof Error ? e.message : '删除失败')
      setDeleteTarget(null)
    }
  }

  const openEdit = (cat: Category) => {
    setEditingCat(cat)
    setShowForm(true)
  }

  const openAdd = () => {
    setEditingCat(null)
    setError('')
    setShowForm(true)
  }

  if (loading) {
    return <div className="page-loading">加载中...</div>
  }

  return (
    <div className="categories-page">
      <div className="categories-page__header">
        <Button onClick={openAdd}>新建分类</Button>
      </div>

      {categories.length === 0 ? (
        <EmptyState message="暂无分类，点击上方按钮创建" />
      ) : (
        <CategoryList
          categories={categories}
          onEdit={openEdit}
          onDelete={(cat) => setDeleteTarget(cat)}
        />
      )}

      <Modal
        show={showForm}
        title={editingCat ? '编辑分类' : '新建分类'}
        onClose={() => {
          setShowForm(false)
          setEditingCat(null)
          setError('')
        }}
      >
        <CategoryForm
          initial={editingCat ?? undefined}
          onSubmit={handleSave}
          error={error}
        />
      </Modal>

      <ConfirmDialog
        show={deleteTarget !== null}
        title="删除分类"
        message={`确定要删除分类"${deleteTarget?.name}"吗？`}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
        confirmLabel="删除"
        danger
      />
    </div>
  )
}
