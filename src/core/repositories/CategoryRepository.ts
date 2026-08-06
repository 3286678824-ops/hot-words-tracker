import type { IStorageService } from '../services/IStorageService'
import type { Category } from '../models/Category'
import { validateCategory, ValidationError } from '../utils/validation'

export class CategoryRepository {
  private storage: IStorageService

  constructor(storage: IStorageService) {
    this.storage = storage
  }

  async getAll(): Promise<Category[]> {
    return this.storage.getCategories()
  }

  async getById(id: number): Promise<Category | undefined> {
    return this.storage.getCategoryById(id)
  }

  async add(name: string, color: string): Promise<Category> {
    validateCategory(name)
    return this.storage.addCategory({ name: name.trim(), color })
  }

  async update(id: number, data: Partial<Category>): Promise<Category> {
    if (data.name !== undefined) {
      validateCategory(data.name)
      data.name = data.name.trim()
    }
    return this.storage.updateCategory(id, data)
  }

  async delete(id: number): Promise<void> {
    const usageCount = await this.storage.getCategoryUsageCount(id)
    if (usageCount > 0) {
      throw new ValidationError(`该分类下有 ${usageCount} 条热词记录，无法删除`)
    }
    return this.storage.deleteCategory(id)
  }

  async getUsageCount(categoryId: number): Promise<number> {
    return this.storage.getCategoryUsageCount(categoryId)
  }
}
