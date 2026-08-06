export class ValidationError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'ValidationError'
  }
}

export function validateHotWord(word: string, categoryIds: number[]): void {
  if (!word.trim()) {
    throw new ValidationError('热词不能为空')
  }
  if (word.trim().length > 50) {
    throw new ValidationError('热词不能超过50个字符')
  }
  if (!categoryIds || categoryIds.length === 0) {
    throw new ValidationError('请至少选择一个分类')
  }
}

export function validateCategory(name: string): void {
  if (!name.trim()) {
    throw new ValidationError('分类名称不能为空')
  }
  if (name.trim().length > 20) {
    throw new ValidationError('分类名称不能超过20个字符')
  }
}
