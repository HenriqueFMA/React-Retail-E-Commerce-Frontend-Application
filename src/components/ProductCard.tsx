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
    <div className="border rounded p-4 bg-white shadow-sm">
      <h3 className="font-medium mb-2">
        <Link to={`/products/${id}`}>{name}</Link>
      </h3>
      <p className="text-sm text-gray-600 mb-4">${price.toFixed(2)}</p>
      <div className="flex gap-2">
        <button className="px-3 py-1 bg-blue-600 text-white rounded" onClick={add}>
          Add to cart
        </button>
        <Link to={`/products/${id}`} className="px-3 py-1 border rounded">
          View
        </Link>
      </div>
    </div>
  )
}
