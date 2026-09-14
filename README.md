# cd15109-intermediate-react-project

Este repositório contém um app React mínimo de e-commerce implementado para seguir a rubrica do projeto (separação de estado cliente/servidor, Context + reducers para cart/auth, Tailwind, rotas protegidas e testes).

Quick start

1. Instalar dependências

```bash
npm install
```

2. Rodar servidor de desenvolvimento

```bash
npm run dev
```

3. Rodar testes

```bash
npm test
```

O que está incluído

- React + Vite + TypeScript
- Tailwind CSS (configurado)
- React Router v6 com rota protegida `/checkout`
- React Query para estado do servidor (lista de produtos e submissão de pedidos)
- `CartContext` e `AuthContext` usando reducers e persistência em `localStorage`
- Componentes e páginas básicas: `Nav`, `ProductCard`, `Catalog`, `Product`, `Cart`, `Login`, `Checkout`
- Testes unitário e de integração com Vitest e React Testing Library

Arquivos de interesse

- [src/App.tsx](src/App.tsx)
- [src/context/CartContext.tsx](src/context/CartContext.tsx)
- [src/context/AuthContext.tsx](src/context/AuthContext.tsx)
- [src/services/api.ts](src/services/api.ts)
- [src/hooks/useProducts.ts](src/hooks/useProducts.ts)
- [src/pages](src/pages)

Próximos passos sugeridos

- Melhorar o design visual e acessibilidade
- Adicionar filtros, busca e ordenação de produtos
- Sincronizar sessão de autenticação com backend real
- Aplicar atualizações otimistas para o carrinho

Licença

Veja [LICENSE.txt](LICENSE.txt)
