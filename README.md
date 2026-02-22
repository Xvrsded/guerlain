# Velora Store Frontend

Landing page + e-commerce flow built with React and Vite.

## Scripts

- `npm run dev` for local development
- `npm run build` for production build
- `npm run preview` to preview production build

## API Mode (Hybrid)

Project uses a hybrid product data layer:

- If `VITE_API_BASE_URL` is set, app tries real backend endpoints first.
- If backend is unavailable or env is empty, app falls back to local mock data automatically.

Supported product endpoints:

- `GET /products`
- `GET /products/:id`

## Environment Setup

1. Copy `.env.example` to `.env`
2. Fill `VITE_API_BASE_URL` with your backend URL (optional)

When no backend is configured, app still runs fully using mock product data.
