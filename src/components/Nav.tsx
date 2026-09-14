import React from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'

export default function Nav() {
  const { state } = useCart()
  const { user, logout } = useAuth()
  const count = state.items.reduce((s, i) => s + i.quantity, 0)

  return (
    <nav className="bg-white shadow">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/products" className="font-semibold text-lg">
            Shop
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/cart" className="text-sm">Cart ({count})</Link>
          {user ? (
            <div className="flex items-center gap-2">
              <span className="text-sm">{user.name}</span>
              <button className="text-sm text-red-600" onClick={logout}>
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login" className="text-sm">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}
