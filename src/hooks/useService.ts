import { useContext } from 'react'
import { ServiceContext, type ServiceContainer } from '../contexts/ServiceContext'

export function useService(): ServiceContainer {
  return useContext(ServiceContext)
}
