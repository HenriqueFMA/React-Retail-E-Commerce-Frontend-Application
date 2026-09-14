import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useProduct } from '../hooks/useProducts'
import { useCart } from '../context/CartContext'

export default function Product() {
  const { id } = useParams()
  const { data, isLoading, isError } = useProduct(id)
  const { dispatch } = useCart()
  const [qty, setQty] = useState(1)

  if (isLoading) return <div className="text-center py-24">Loading product...</div>
  if (isError || !data) return <div className="text-center py-24 text-red-600">Product not found.</div>

  function add() {
    if (!data) return
    dispatch({ type: 'add', item: { id: data.id, name: data.name, price: data.price, quantity: qty } })
  }

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      <div className="md:flex">
        <div className="md:w-1/2 bg-gray-100 h-72 flex items-center justify-center text-gray-400">Product Image</div>
        <div className="md:w-1/2 p-6">
          <h1 className="text-2xl font-bold mb-2">{data.name}</h1>
          <p className="text-gray-600 mb-4">{data.description}</p>
          <div className="text-2xl text-indigo-600 font-semibold mb-4">${data.price.toFixed(2)}</div>

          <div className="flex items-center gap-3 mb-4">
            <label className="text-sm">Qty</label>
            <input type="number" min={1} value={qty} onChange={(e) => setQty(Number(e.target.value))} className="w-20 border rounded px-2 py-1" />
          </div>

          <div className="flex gap-3">
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-md" onClick={add}>Add to cart</button>
            <a href="/products" className="px-4 py-2 border rounded-md">Back</a>
          </div>
        </div>
      </div>
    </div>
  )
}
