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
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      <form onSubmit={submit} className="space-y-3">
        <div>
          <label htmlFor="login-name" className="block text-sm">Name</label>
          <input id="login-name" value={name} onChange={(e) => setName(e.target.value)} className="w-full border px-2 py-1 rounded" />
        </div>
        <div>
          <label htmlFor="login-email" className="block text-sm">Email</label>
          <input id="login-email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border px-2 py-1 rounded" />
        </div>
        <div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded">Login</button>
        </div>
      </form>
    </div>
  )
}
