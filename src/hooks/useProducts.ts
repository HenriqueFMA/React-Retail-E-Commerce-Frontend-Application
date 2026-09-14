import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api, Product } from '../services/api'

export function useProducts() {
  return useQuery<Product[], Error>(['products'], api.fetchProducts)
}

export function useProduct(id: string | undefined) {
  return useQuery<Product, Error>(['product', id], () => api.fetchProductById(id!), { enabled: !!id })
}

export function useSubmitOrder() {
  const qc = useQueryClient()
  return useMutation(api.submitOrder, {
    onSuccess: () => qc.invalidateQueries(['cart'])
  })
}
