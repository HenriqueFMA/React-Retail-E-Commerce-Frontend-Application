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
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 card p-6">
          <form onSubmit={submit} className="space-y-4">
            <div>
              <label htmlFor="checkout-name" className="block text-sm">Name</label>
              <input id="checkout-name" required value={name} onChange={(e) => setName(e.target.value)} className="w-full border px-2 py-2 rounded" />
            </div>
            <div>
              <label htmlFor="checkout-email" className="block text-sm">Email</label>
              <input id="checkout-email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border px-2 py-2 rounded" />
            </div>
            <div>
              <label htmlFor="checkout-address" className="block text-sm">Address</label>
              <textarea id="checkout-address" required value={address} onChange={(e) => setAddress(e.target.value)} className="w-full border px-2 py-2 rounded" />
            </div>
            <div>
              <button className="px-4 py-2 bg-green-600 text-white rounded" disabled={mutation.isLoading}>
                {mutation.isLoading ? 'Submitting...' : 'Submit Order'}
              </button>
            </div>
            {mutation.isError && <div className="text-red-600">Error submitting order</div>}
          </form>
        </div>

        <aside className="card p-6">
          <h3 className="font-semibold mb-3">Summary</h3>
          <div className="space-y-2">
            {state.items.map((i) => (
              <div key={i.id} className="flex justify-between text-sm">
                <div>{i.name} x {i.quantity}</div>
                <div>${(i.price * i.quantity).toFixed(2)}</div>
              </div>
            ))}
          </div>
          <div className="mt-4 text-right font-bold">Total: ${total.toFixed(2)}</div>
        </aside>
      </div>
    </div>
  )
}
