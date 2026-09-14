import React, { createContext, useContext, useReducer, useEffect } from 'react'

type CartItem = { id: string; name: string; price: number; quantity: number }

type State = { items: CartItem[] }

type Action =
  | { type: 'add'; item: CartItem }
  | { type: 'update'; id: string; quantity: number }
  | { type: 'remove'; id: string }
  | { type: 'clear' }

const initial: State = { items: [] }

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'add': {
      const exists = state.items.find((i) => i.id === action.item.id)
      if (exists) {
        return {
          items: state.items.map((i) => (i.id === action.item.id ? { ...i, quantity: i.quantity + action.item.quantity } : i))
        }
      }
      return { items: [...state.items, action.item] }
    }
    case 'update':
      return { items: state.items.map((i) => (i.id === action.id ? { ...i, quantity: action.quantity } : i)).filter((i) => i.quantity > 0) }
    case 'remove':
      return { items: state.items.filter((i) => i.id !== action.id) }
    case 'clear':
      return { items: [] }
    default:
      return state
  }
}

const CartContext = createContext<{
  state: State
  dispatch: React.Dispatch<Action>
  total: number
} | null>(null)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initial, (init) => {
    try {
      const raw = localStorage.getItem('cart')
      return raw ? JSON.parse(raw) : init
    } catch {
      return init
    }
  })

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state))
  }, [state])

  const total = React.useMemo(() => state.items.reduce((s, i) => s + i.price * i.quantity, 0), [state.items])

  return <CartContext.Provider value={{ state, dispatch, total }}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}

export type { CartItem }
