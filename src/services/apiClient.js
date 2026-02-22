const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? ''

let transport = null

const toQueryString = (query = {}) => {
  const params = new URLSearchParams()
  Object.entries(query).forEach(([key, value]) => {
    if (value === undefined || value === null || value === '') {
      return
    }
    params.set(key, String(value))
  })
  const queryString = params.toString()
  return queryString ? `?${queryString}` : ''
}

const defaultTransport = async ({ method, path, body, headers, query }) => {
  const queryString = toQueryString(query)
  const endpoint = `${API_BASE_URL}${path}${queryString}`

  const response = await fetch(endpoint, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  })

  const contentType = response.headers.get('content-type') || ''
  const payload = contentType.includes('application/json') ? await response.json() : await response.text()

  return {
    ok: response.ok,
    status: response.status,
    data: response.ok ? payload : null,
    error: response.ok ? null : payload,
  }
}

export function setApiTransport(nextTransport) {
  transport = nextTransport
}

async function request(method, path, { body, headers, query } = {}) {
  const requestTransport = transport ?? defaultTransport
  const result = await requestTransport({ method, path, body, headers, query })

  if (!result.ok) {
    const message =
      typeof result.error === 'string'
        ? result.error
        : result.error?.message || `Request failed with status ${result.status}`
    throw new Error(message)
  }

  return result.data
}

export const apiClient = {
  get: (path, options) => request('GET', path, options),
  post: (path, body, options = {}) => request('POST', path, { ...options, body }),
}
