import React from 'react'
import { Link } from 'react-router-dom'
import { CartItem, useCart } from '../context/CartContext'

export default function ProductCard({ id, name, price }: { id: string; name: string; price: number }) {
  const { dispatch } = useCart()

  function add() {
    const item: CartItem = { id, name, price, quantity: 1 }
    dispatch({ type: 'add', item })
  }

  return (
    <article className="card overflow-hidden hover:shadow-lg transition-shadow duration-150">
      <div className="h-48 bg-gray-100 flex items-center justify-center text-gray-400">Image</div>
      <div className="p-4">
        <h3 className="font-medium text-lg text-gray-800 mb-1">
          <Link to={`/products/${id}`} className="hover:underline">{name}</Link>
        </h3>
        <div className="flex items-baseline justify-between mb-3">
          <div className="text-indigo-600 font-semibold">${price.toFixed(2)}</div>
        </div>
        <div className="flex items-center gap-2">
          <button aria-label={`Add ${name} to cart`} className="flex-1 px-3 py-2 bg-indigo-600 text-white rounded-md" onClick={add}>
            Add to cart
          </button>
          <Link to={`/products/${id}`} className="px-3 py-2 border rounded-md text-sm">View</Link>
        </div>
      </div>
    </article>
  )
}
