import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const API_BASE_URL = '/api'

export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  createdAt: string
}

export interface CloudPC {
  id: string
  name: string
  status: 'running' | 'stopped' | 'starting' | 'stopping'
  cpu: number
  memory: number
  storage: number
  os: 'Windows' | 'Linux'
  ip: string
  port: number
  createdAt: string
  userId: string
}

export interface AuthResponse {
  user: User
  token: string
}