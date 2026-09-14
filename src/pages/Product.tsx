import { useParams } from 'react-router-dom'
import { useProduct } from '../hooks/useProducts'
import { useCart } from '../context/CartContext'

export default function Product() {
  const { id } = useParams()
  const { data, isLoading, isError } = useProduct(id)
  const { dispatch } = useCart()

  if (isLoading) return <div>Loading product...</div>
  if (isError || !data) return <div>Product not found.</div>

  function add() {
    if (data) {
      dispatch({ type: 'add', item: { id: data.id, name: data.name, price: data.price, quantity: 1 } })
    }
  }

  return (
    <div className="bg-white p-6 rounded shadow">
      <h1 className="text-xl font-bold mb-2">{data.name}</h1>
      <p className="text-gray-700 mb-4">{data.description}</p>
      <p className="font-semibold mb-4">${data.price.toFixed(2)}</p>
      <button className="px-4 py-2 bg-blue-600 text-white rounded" onClick={add}>
        Add to cart
      </button>
    </div>
  )
}
