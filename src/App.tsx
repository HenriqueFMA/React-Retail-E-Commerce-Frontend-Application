import React from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Catalog from './pages/Catalog'
import Product from './pages/Product'
import CartPage from './pages/Cart'
import Login from './pages/Login'
import Checkout from './pages/Checkout'
import Nav from './components/Nav'
import ErrorBoundary from './components/ErrorBoundary'
import { useAuth } from './context/AuthContext'

function Protected({ children }: { children: JSX.Element }) {
  const { user } = useAuth()
  const location = useLocation()
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }
  return children
}

export default function App() {
  return (
    <div className="min-h-screen">
      <ErrorBoundary>
        <Nav />
        <main className="max-w-6xl mx-auto p-4">
          <Routes>
          <Route path="/" element={<Navigate to="/products" replace />} />
          <Route path="/products" element={<Catalog />} />
          <Route path="/products/:id" element={<Product />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/checkout"
            element={
              <Protected>
                <Checkout />
              </Protected>
            }
          />
        </Routes>
        </main>
      </ErrorBoundary>
    </div>
  )
}
