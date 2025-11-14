import api from './auth'
import type { CloudPC } from '../lib/utils'

export interface CreateCloudPCData {
  name: string
  cpu: number
  memory: number
  storage: number
  os: 'Windows' | 'Linux'
}

export interface CloudPCStats {
  cpuUsage: number
  memoryUsage: number
  diskUsage: number
  networkIn: number
  networkOut: number
  uptime: string
}

export const cloudPCService = {
  async getCloudPCs(): Promise<CloudPC[]> {
    const response = await api.get('/cloudpc')
    return response.data
  },

  async getCloudPC(id: string): Promise<CloudPC> {
    const response = await api.get(`/cloudpc/${id}`)
    return response.data
  },

  async createCloudPC(data: CreateCloudPCData): Promise<CloudPC> {
    const response = await api.post('/cloudpc', data)
    return response.data
  },

  async startCloudPC(id: string): Promise<CloudPC> {
    const response = await api.post(`/cloudpc/${id}/start`)
    return response.data
  },

  async stopCloudPC(id: string): Promise<CloudPC> {
    const response = await api.post(`/cloudpc/${id}/stop`)
    return response.data
  },

  async deleteCloudPC(id: string): Promise<void> {
    await api.delete(`/cloudpc/${id}`)
  },

  async getCloudPCStats(id: string): Promise<CloudPCStats> {
    const response = await api.get(`/cloudpc/${id}/stats`)
    return response.data
  },

  async connectToCloudPC(id: string): Promise<{ connectionUrl: string; token: string }> {
    const response = await api.post(`/cloudpc/${id}/connect`)
    return response.data
  },
}