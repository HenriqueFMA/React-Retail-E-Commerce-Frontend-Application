# cd15109-intermediate-react-project

This repository contains a minimal React e-commerce app implemented to follow the project rubric (client/server state separation, Context + reducers for cart/auth, Tailwind, protected routes, and tests).

Quick start

1. Install dependencies

```bash
npm install
```

2. Run the development server

```bash
npm run dev
```

3. Run tests

```bash
npm test
```

What is included

- React + Vite + TypeScript
- Tailwind CSS (configured)
- React Router v6 with a protected `/checkout` route
- React Query for server state (product list and order submission)
- `CartContext` and `AuthContext` using reducers and persistence in `localStorage`
- Basic components and pages: `Nav`, `ProductCard`, `Catalog`, `Product`, `Cart`, `Login`, `Checkout`
- Unit and integration tests with Vitest and React Testing Library

Key files

- [src/App.tsx](src/App.tsx)
- [src/context/CartContext.tsx](src/context/CartContext.tsx)
- [src/context/AuthContext.tsx](src/context/AuthContext.tsx)
- [src/services/api.ts](src/services/api.ts)
- [src/hooks/useProducts.ts](src/hooks/useProducts.ts)
- [src/pages](src/pages)

Suggested next steps

- Improve the visual design and accessibility
- Add product filters, search, and sorting
- Sync authentication with a real backend
- Apply optimistic updates to the cart

License

See [LICENSE.txt](LICENSE.txt)
