import { describe, it, expect } from 'vitest'
import { act, renderHook } from '@testing-library/react'
import React from 'react'
import { CartProvider, useCart } from '../context/CartContext'

function wrapper({ children }: { children?: React.ReactNode }) {
  return <CartProvider>{children}</CartProvider>
}

describe('Cart reducer', () => {
  it('adds item and updates total', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    act(() => {
      result.current.dispatch({ type: 'add', item: { id: '1', name: 'X', price: 10, quantity: 2 } })
    })
    expect(result.current.state.items.length).toBe(1)
    expect(result.current.total).toBe(20)
  })
})
