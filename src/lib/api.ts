import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

export const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError(error) && error.response?.status === 403) {
      const msg = error.response.data?.message || ''
      if (msg.toLowerCase().includes('admin')) {
        error.message =
          'Admin login required. Use Admin Login (not student login) at /admin/login'
      }
    }
    return Promise.reject(error)
  }
)

const API_BASE = import.meta.env.VITE_API_URL?.replace(/\/api\/?$/, '') || 'http://localhost:5000'

export async function uploadImage(file: File): Promise<string> {
  const formData = new FormData()
  formData.append('image', file)
  const token = localStorage.getItem('token')
  const { data } = await axios.post<{ url: string; message?: string }>(
    `${API_URL}/upload/image`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    }
  )
  return data.url
}

export { API_BASE }

export function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message || error.message || 'Something went wrong'
  }
  return 'Something went wrong'
}
