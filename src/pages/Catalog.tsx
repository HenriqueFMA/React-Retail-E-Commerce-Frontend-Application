import React from 'react'
import { useProducts } from '../hooks/useProducts'
import ProductCard from '../components/ProductCard'

export default function Catalog() {
  const { data, isLoading, isError } = useProducts()

  if (isLoading) return <div>Loading products...</div>
  if (isError) return <div>Error loading products.</div>

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {data?.map((p) => (
          <ProductCard key={p.id} id={p.id} name={p.name} price={p.price} />
        ))}
      </div>
    </div>
  )
}
