import React from 'react'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import Catalog from '../pages/Catalog'
import { CartProvider } from '../context/CartContext'
import { useProducts } from '../hooks/useProducts'

vi.mock('../hooks/useProducts', () => ({
  useProducts: vi.fn()
}))

const mockedUseProducts = vi.mocked(useProducts)

function renderCatalog() {
  return render(
    <MemoryRouter>
      <CartProvider>
        <Catalog />
      </CartProvider>
    </MemoryRouter>
  )
}

describe('Catalog asynchronous states', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('shows a loading indicator while products are fetched', () => {
    mockedUseProducts.mockReturnValue({ isLoading: true, isError: false } as ReturnType<typeof useProducts>)

    renderCatalog()

    expect(screen.getByText('Loading products...')).toBeTruthy()
  })

  it('shows an error message when products cannot be fetched', () => {
    mockedUseProducts.mockReturnValue({ isLoading: false, isError: true } as ReturnType<typeof useProducts>)

    renderCatalog()

    expect(screen.getByText('Error loading products.')).toBeTruthy()
  })

  it('shows an empty state when no products are returned', () => {
    mockedUseProducts.mockReturnValue({ data: [], isLoading: false, isError: false } as ReturnType<typeof useProducts>)

    renderCatalog()

    expect(screen.getByText('No products available.')).toBeTruthy()
  })
})