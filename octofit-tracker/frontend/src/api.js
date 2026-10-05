const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()

export const API_BASE_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'

function extractItems(payload) {
  if (Array.isArray(payload)) return payload
  if (!payload || typeof payload !== 'object') return []

  for (const key of ['results', 'items', 'data']) {
    if (payload[key] !== undefined) {
      const items = extractItems(payload[key])
      if (items.length > 0 || Array.isArray(payload[key])) return items
    }
  }

  return []
}

export async function fetchCollection(endpoint, signal) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, { signal })
  if (!response.ok) {
    throw new Error(`Request failed (${response.status})`)
  }
  return extractItems(await response.json())
}