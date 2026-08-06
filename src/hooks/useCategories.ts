import { useState, useEffect, useCallback } from 'react'
import type { Category } from '../core/models/Category'
import { useService } from './useService'

export function useCategories() {
  const { categoryRepo } = useService()
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)

  const loadCategories = useCallback(async () => {
    setLoading(true)
    const data = await categoryRepo.getAll()
    setCategories(data)
    setLoading(false)
  }, [categoryRepo])

  useEffect(() => {
    loadCategories()
  }, [loadCategories])

  const addCategory = useCallback(
    async (name: string, color: string): Promise<Category> => {
      const cat = await categoryRepo.add(name, color)
      await loadCategories()
      return cat
    },
    [categoryRepo, loadCategories]
  )

  const updateCategory = useCallback(
    async (id: number, data: Partial<Category>): Promise<Category> => {
      const cat = await categoryRepo.update(id, data)
      await loadCategories()
      return cat
    },
    [categoryRepo, loadCategories]
  )

  const deleteCategory = useCallback(
    async (id: number): Promise<void> => {
      await categoryRepo.delete(id)
      await loadCategories()
    },
    [categoryRepo, loadCategories]
  )

  const getCategoryById = useCallback(
    (id: number): Category | undefined => {
      return categories.find((c) => c.id === id)
    },
    [categories]
  )

  return {
    categories,
    loading,
    addCategory,
    updateCategory,
    deleteCategory,
    getCategoryById,
    reload: loadCategories,
  }
}
