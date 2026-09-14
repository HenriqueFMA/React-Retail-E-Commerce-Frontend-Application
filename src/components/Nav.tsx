import React from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'

export default function Nav() {
  const { state } = useCart()
  const { user, logout } = useAuth()
  const count = state.items.reduce((s, i) => s + i.quantity, 0)

  return (
    <header className="app-hero border-b">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link to="/products" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold">R</div>
            <div>
              <div className="font-semibold text-lg">Retail</div>
              <div className="text-xs text-gray-500">Modern Shop</div>
            </div>
          </Link>
        </div>

        <div className="flex-1 px-6">
          <div className="relative max-w-lg mx-auto">
            <input placeholder="Search products..." className="w-full border rounded-full px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-indigo-300" />
            <svg className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15z" />
            </svg>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Link to="/cart" className="relative inline-flex items-center gap-2 px-3 py-2 bg-white border rounded-full shadow-sm hover:shadow-md">
            <svg className="w-5 h-5 text-gray-700" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 3h2l.4 2M7 13h10l4-8H5.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="text-sm">Cart ({count})</span>
          </Link>

          {user ? (
            <div className="flex items-center gap-3">
              <div className="text-sm text-gray-700">{user.name}</div>
              <button onClick={logout} className="text-sm text-red-600">Logout</button>
            </div>
          ) : (
            <Link to="/login" className="px-3 py-2 bg-indigo-600 text-white rounded-full text-sm">Login</Link>
          )}
        </div>
      </div>
    </header>
  )
}
