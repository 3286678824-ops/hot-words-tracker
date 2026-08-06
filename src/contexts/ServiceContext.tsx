import { createContext } from 'react'
import type { IStorageService } from '../core/services/IStorageService'
import { SupabaseService } from '../core/services/SupabaseService'
import { HotWordRepository } from '../core/repositories/HotWordRepository'
import { CategoryRepository } from '../core/repositories/CategoryRepository'

export interface ServiceContainer {
  storageService: IStorageService
  hotWordRepo: HotWordRepository
  categoryRepo: CategoryRepository
}

function createServices(): ServiceContainer {
  const storageService = new SupabaseService()
  return {
    storageService,
    hotWordRepo: new HotWordRepository(storageService),
    categoryRepo: new CategoryRepository(storageService),
  }
}

export const ServiceContext = createContext<ServiceContainer>(createServices())
