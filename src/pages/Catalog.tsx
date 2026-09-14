import React from 'react'
import { useProducts } from '../hooks/useProducts'
import ProductCard from '../components/ProductCard'

export default function Catalog() {
  const { data, isLoading, isError } = useProducts()

  if (isLoading) return <div className="text-center py-24">Loading products...</div>
  if (isError) return <div className="text-center py-24 text-red-600">Error loading products.</div>

  return (
    <div>
      <section className="mb-8 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Discover</h1>
              <p className="text-gray-600">Handpicked products for a modern home.</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4">
        {data?.length === 0 ? (
          <p className="text-center py-12 text-gray-600">No products available.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data?.map((p) => (
              <ProductCard key={p.id} id={p.id} name={p.name} price={p.price} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
