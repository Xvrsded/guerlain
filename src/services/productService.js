import { products } from '../data'
import { apiClient } from './apiClient'

const MOCK_DELAY_MS = 220
let productCache = null
const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL ?? '').trim()

const wait = (duration) => new Promise((resolve) => setTimeout(resolve, duration))

const cloneProducts = (items) => items.map((item) => ({ ...item }))
const useRealApi = API_BASE_URL.length > 0

const getProductIdFromPath = (path) => {
  const [, resource, id] = path.split('/')
  if (resource !== 'products') {
    return null
  }
  return id ?? null
}

const mockRequest = async ({ method, path }) => {
  await wait(MOCK_DELAY_MS)

  if (method === 'GET' && path === '/products') {
    return {
      ok: true,
      status: 200,
      data: cloneProducts(products),
      error: null,
    }
  }

  if (method === 'GET' && path.startsWith('/products/')) {
    const id = getProductIdFromPath(path)
    const foundProduct = products.find((item) => String(item.id) === String(id))
    if (!foundProduct) {
      return {
        ok: false,
        status: 404,
        data: null,
        error: { message: 'Product not found' },
      }
    }

    return {
      ok: true,
      status: 200,
      data: { ...foundProduct },
      error: null,
    }
  }

  return {
    ok: false,
    status: 501,
    data: null,
    error: { message: `Mock endpoint ${method} ${path} is not implemented` },
  }
}

export async function fetchProducts({ forceRefresh = false } = {}) {
  if (productCache && !forceRefresh) {
    return cloneProducts(productCache)
  }

  if (useRealApi) {
    let realResponse = null
    try {
      realResponse = await apiClient.get('/products')
    } catch {
      realResponse = null
    }

    if (realResponse) {
      productCache = cloneProducts(realResponse)
      return cloneProducts(productCache)
    }
  }

  const mockResponse = await mockRequest({ method: 'GET', path: '/products' })
  productCache = cloneProducts(mockResponse.data ?? [])
  return cloneProducts(productCache)
}

export async function fetchProductById(id) {
  if (useRealApi) {
    let realProduct = null
    try {
      realProduct = await apiClient.get(`/products/${id}`)
    } catch {
      realProduct = null
    }

    if (realProduct) {
      return realProduct
    }
  }

  const mockResponse = await mockRequest({ method: 'GET', path: `/products/${id}` })
  return mockResponse.ok ? mockResponse.data : null
}

export function clearProductCache() {
  productCache = null
}
