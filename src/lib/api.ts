import axios from 'axios'
import { getApiUrl, ENV_API_BASE_EXPORT } from '@/lib/apiBase'
import { normalizeImageUrlForStorage } from '@/lib/images'

export { getApiBase, getApiUrl } from '@/lib/apiBase'

/** @deprecated Prefer getApiBase() for image URLs on mobile/LAN */
export const API_BASE = ENV_API_BASE_EXPORT

export const api = axios.create({
  baseURL: getApiUrl(),
  headers: { 'Content-Type': 'application/json' },
})

api.interceptors.request.use((config) => {
  config.baseURL = getApiUrl()
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

export async function uploadImage(file: File): Promise<string> {
  const formData = new FormData()
  formData.append('image', file)
  const token = localStorage.getItem('token')
  const { data } = await axios.post<{ url: string; message?: string }>(
    `${getApiUrl()}/upload/image`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    }
  )
  return normalizeImageUrlForStorage(data.url)
}

export async function uploadProfileImage(file: File): Promise<string> {
  const formData = new FormData()
  formData.append('image', file)
  const token = localStorage.getItem('token')
  const { data } = await axios.post<{ url: string; message?: string }>(
    `${getApiUrl()}/upload/profile-image`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    }
  )
  return normalizeImageUrlForStorage(data.url)
}

export function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message || error.message || 'Something went wrong'
  }
  return 'Something went wrong'
}
