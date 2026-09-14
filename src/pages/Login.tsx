import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation() as any

  const from = location.state?.from?.pathname || '/products'

  function submit(e: React.FormEvent) {
    e.preventDefault()
    login({ name, email })
    navigate(from, { replace: true })
  }

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="max-w-md w-full card p-6">
        <h2 className="text-2xl font-bold mb-4">Welcome back</h2>
        <p className="text-sm text-gray-600 mb-4">Sign in to continue to your checkout.</p>
        <form onSubmit={submit} className="space-y-4">
          <div>
            <label htmlFor="login-name" className="block text-sm">Name</label>
            <input id="login-name" value={name} onChange={(e) => setName(e.target.value)} className="w-full border px-3 py-2 rounded" />
          </div>
          <div>
            <label htmlFor="login-email" className="block text-sm">Email</label>
            <input id="login-email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border px-3 py-2 rounded" />
          </div>
          <div className="flex items-center justify-between">
            <button className="px-4 py-2 bg-indigo-600 text-white rounded">Login</button>
            <a href="/products" className="text-sm text-gray-500">Continue as guest</a>
          </div>
        </form>
      </div>
    </div>
  )
}
