type Product = {
  id: string
  name: string
  price: number
  description?: string
  image?: string
}

const PRODUCTS: Product[] = [
  { id: '1', name: 'Minimal Lamp', price: 39.99, description: 'A modern lamp.' },
  { id: '2', name: 'Wooden Chair', price: 89.5, description: 'Comfortable chair.' },
  { id: '3', name: 'Ceramic Mug', price: 12.0, description: 'Handmade mug.' }
]

export const api = {
  fetchProducts: async () => {
    await new Promise((r) => setTimeout(r, 400))
    return PRODUCTS
  },
  fetchProductById: async (id: string) => {
    await new Promise((r) => setTimeout(r, 300))
    const p = PRODUCTS.find((x) => x.id === id)
    if (!p) throw new Error('Not found')
    return p
  },
  submitOrder: async (order: any) => {
    await new Promise((r) => setTimeout(r, 500))
    // return a simple confirmation
    return { id: String(Date.now()), ...order }
  }
}

export type { Product }
