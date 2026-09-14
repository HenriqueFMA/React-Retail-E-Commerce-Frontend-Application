import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MemoryRouter } from 'react-router-dom'
import App from '../App'
import { vi, test, expect } from 'vitest'
import { CartProvider } from '../context/CartContext'
import { AuthProvider } from '../context/AuthContext'

test('full add-to-cart and checkout flow', async () => {
  const qc = new QueryClient({ defaultOptions: { queries: { retry: false } } })
  const user = userEvent.setup()
  vi.spyOn(window, 'alert').mockImplementation(() => {})

  render(
    <MemoryRouter initialEntries={["/products"]}>
      <QueryClientProvider client={qc}>
        <AuthProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </AuthProvider>
      </QueryClientProvider>
    </MemoryRouter>
  )

  // wait for products to load and add first product (match aria-labels like 'Add <name> to cart')
  const addButtons = await screen.findAllByRole('button', { name: /Add .* to cart/i })
  await user.click(addButtons[0])

  // navigate to cart (select link by role to avoid ambiguous text matches)
  const cartLink = await screen.findByRole('link', { name: /Cart/i })
  await user.click(cartLink)

  // click checkout
  const checkoutLink = await screen.findByRole('link', { name: /Checkout/i })
  await user.click(checkoutLink)

  // If redirected to login, perform login first
  let redirectedToLogin = false
  try {
    await screen.findByRole('heading', { name: /Login/i }, { timeout: 500 })
    redirectedToLogin = true
  } catch {
    redirectedToLogin = false
  }

  if (redirectedToLogin) {
    const loginName = screen.getByLabelText(/Name/i)
    const loginEmail = screen.getByLabelText(/Email/i)
    await user.type(loginName, 'Test User')
    await user.type(loginEmail, 'test@example.com')
    await user.click(screen.getByRole('button', { name: /Login/i }))
    // wait for checkout page
    await screen.findByRole('heading', { name: /Checkout/i })
  }

  // fill checkout form
  const nameInput = screen.getByLabelText(/Name/i)
  const emailInput = screen.getByLabelText(/Email/i)
  const addressInput = screen.getByLabelText(/Address/i)
  await user.type(nameInput, 'Test User')
  await user.type(emailInput, 'test@example.com')
  await user.type(addressInput, '123 Main St')

  const submitBtn = screen.getByRole('button', { name: /Submit Order/i })
  await user.click(submitBtn)

  await waitFor(() => expect(window.alert).toHaveBeenCalled())
})
