import axios from 'axios'
import { API_BASE_URL, type AuthResponse, type User } from './utils'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// 请求拦截器 - 添加token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// 响应拦截器 - 处理错误
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export const authService = {
  async login(email: string, password: string): Promise<AuthResponse> {
    const response = await api.post('/auth/login', { email, password })
    return response.data
  },

  async register(name: string, email: string, password: string): Promise<AuthResponse> {
    const response = await api.post('/auth/register', { name, email, password })
    return response.data
  },

  async getCurrentUser(): Promise<User> {
    const response = await api.get('/auth/me')
    return response.data
  },

  logout() {
    localStorage.removeItem('token')
    window.location.href = '/'
  },

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token')
  },
}

export default api