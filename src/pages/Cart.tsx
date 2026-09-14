import React from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function CartPage() {
  const { state, dispatch, total } = useCart()

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {state.items.length === 0 ? (
        <div>
          <p>Your cart is empty.</p>
          <Link to="/products" className="text-blue-600">
            Continue shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {state.items.map((i) => (
            <div key={i.id} className="p-4 bg-white rounded flex items-center justify-between">
              <div>
                <div className="font-medium">{i.name}</div>
                <div className="text-sm text-gray-600">${i.price.toFixed(2)} each</div>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min={1}
                  value={i.quantity}
                  onChange={(e) => dispatch({ type: 'update', id: i.id, quantity: Number(e.target.value) })}
                  className="w-16 border rounded px-2 py-1"
                />
                <button className="text-red-600" onClick={() => dispatch({ type: 'remove', id: i.id })}>
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div className="text-right font-semibold">Total: ${total.toFixed(2)}</div>
          <div className="text-right">
            <Link to="/checkout" className="px-4 py-2 bg-green-600 text-white rounded">
              Checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
