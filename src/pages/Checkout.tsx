import React, { useState } from 'react'
import { useCart } from '../context/CartContext'
import { useSubmitOrder } from '../hooks/useProducts'

export default function Checkout() {
  const { state, total, dispatch } = useCart()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const mutation = useSubmitOrder()

  function submit(e: React.FormEvent) {
    e.preventDefault()
    const order = { items: state.items, name, email, address, total }
    mutation.mutate(order, {
      onSuccess: () => {
        dispatch({ type: 'clear' })
        alert('Order submitted!')
      }
    })
  }

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Checkout</h2>
      <div className="mb-4">
        {state.items.map((i) => (
          <div key={i.id} className="flex justify-between py-1">
            <div>{i.name} x {i.quantity}</div>
            <div>${(i.price * i.quantity).toFixed(2)}</div>
          </div>
        ))}
        <div className="text-right font-semibold mt-2">Total: ${total.toFixed(2)}</div>
      </div>

      <form onSubmit={submit} className="space-y-3">
        <div>
          <label htmlFor="checkout-name" className="block text-sm">Name</label>
          <input id="checkout-name" required value={name} onChange={(e) => setName(e.target.value)} className="w-full border px-2 py-1 rounded" />
        </div>
        <div>
          <label htmlFor="checkout-email" className="block text-sm">Email</label>
          <input id="checkout-email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border px-2 py-1 rounded" />
        </div>
        <div>
          <label htmlFor="checkout-address" className="block text-sm">Address</label>
          <textarea id="checkout-address" required value={address} onChange={(e) => setAddress(e.target.value)} className="w-full border px-2 py-1 rounded" />
        </div>
        <div>
          <button className="px-4 py-2 bg-green-600 text-white rounded" disabled={mutation.isLoading}>
            {mutation.isLoading ? 'Submitting...' : 'Submit Order'}
          </button>
        </div>
        {mutation.isError && <div className="text-red-600">Error submitting order</div>}
      </form>
    </div>
  )
}
