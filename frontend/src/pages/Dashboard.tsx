import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { 
  Plus, 
  Monitor, 
  Power, 
  PowerOff, 
  Trash2, 
  Settings,
  Activity,
  Cpu,
  HardDrive,
  Wifi,
  Clock,
  RefreshCw
} from 'lucide-react'
import { cloudPCService, type CloudPC } from '../services/cloudpc'
import { authService, type User } from '../services/auth'
import toast from 'react-hot-toast'

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null)
  const [cloudPCs, setCloudPCs] = useState<CloudPC[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showCreateModal, setShowCreateModal] = useState(false)

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    try {
      const userData = await authService.getCurrentUser()
      setUser(userData)
      
      const cloudPCData = await cloudPCService.getCloudPCs()
      setCloudPCs(cloudPCData)
    } catch (error) {
      console.error('加载数据失败:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleStartCloudPC = async (id: string) => {
    try {
      await cloudPCService.startCloudPC(id)
      toast.success('云电脑启动成功')
      loadDashboardData()
    } catch (error) {
      toast.error('启动失败')
    }
  }

  const handleStopCloudPC = async (id: string) => {
    try {
      await cloudPCService.stopCloudPC(id)
      toast.success('云电脑已停止')
      loadDashboardData()
    } catch (error) {
      toast.error('停止失败')
    }
  }

  const handleDeleteCloudPC = async (id: string) => {
    if (!confirm('确定要删除这个云电脑吗？此操作不可撤销。')) {
      return
    }
    
    try {
      await cloudPCService.deleteCloudPC(id)
      toast.success('云电脑已删除')
      loadDashboardData()
    } catch (error) {
      toast.error('删除失败')
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running': return 'text-green-600 bg-green-100'
      case 'stopped': return 'text-gray-600 bg-gray-100'
      case 'starting': return 'text-yellow-600 bg-yellow-100'
      case 'stopping': return 'text-orange-600 bg-orange-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'running': return '运行中'
      case 'stopped': return '已停止'
      case 'starting': return '启动中'
      case 'stopping': return '停止中'
      default: return '未知'
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            欢迎回来，{user?.name}
          </h1>
          <p className="mt-2 text-gray-600">
            管理您的云电脑实例，监控运行状态
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="card">
            <div className="flex items-center">
              <div className="p-2 bg-primary-100 rounded-lg">
                <Monitor className="w-6 h-6 text-primary-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">总实例</p>
                <p className="text-2xl font-bold text-gray-900">{cloudPCs.length}</p>
              </div>
            </div>
          </div>
          
          <div className="card">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <Activity className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">运行中</p>
                <p className="text-2xl font-bold text-green-600">
                  {cloudPCs.filter(pc => pc.status === 'running').length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="card">
            <div className="flex items-center">
              <div className="p-2 bg-gray-100 rounded-lg">
                <Power className="w-6 h-6 text-gray-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">已停止</p>
                <p className="text-2xl font-bold text-gray-600">
                  {cloudPCs.filter(pc => pc.status === 'stopped').length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="card">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Cpu className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">总CPU核心</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {cloudPCs.reduce((total, pc) => total + pc.cpu, 0)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CloudPC List */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">我的云电脑</h2>
            <Link
              to="/cloudpc/new"
              onClick={() => setShowCreateModal(true)}
              className="btn-primary flex items-center"
            >
              <Plus className="w-4 h-4 mr-2" />
              创建新实例
            </Link>
          </div>

          {cloudPCs.length === 0 ? (
            <div className="text-center py-12">
              <Monitor className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                还没有云电脑实例
              </h3>
              <p className="text-gray-600 mb-6">
                创建您的第一个云电脑实例，开始体验云端计算
              </p>
              <button
                onClick={() => setShowCreateModal(true)}
                className="btn-primary"
              >
                <Plus className="w-4 h-4 mr-2" />
                创建云电脑
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {cloudPCs.map((cloudPC) => (
                <div key={cloudPC.id} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {cloudPC.name}
                    </h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(cloudPC.status)}`}>
                      {getStatusText(cloudPC.status)}
                    </span>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">操作系统</span>
                      <span className="font-medium">{cloudPC.os}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">CPU核心</span>
                      <span className="font-medium">{cloudPC.cpu} 核心</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">内存</span>
                      <span className="font-medium">{cloudPC.memory} GB</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">存储</span>
                      <span className="font-medium">{cloudPC.storage} GB</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">IP地址</span>
                      <span className="font-medium text-xs">{cloudPC.ip}:{cloudPC.port}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex space-x-2">
                      {cloudPC.status === 'stopped' ? (
                        <button
                          onClick={() => handleStartCloudPC(cloudPC.id)}
                          className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                          title="启动"
                        >
                          <Power className="w-4 h-4" />
                        </button>
                      ) : (
                        <button
                          onClick={() => handleStopCloudPC(cloudPC.id)}
                          className="p-2 text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                          title="停止"
                        >
                          <PowerOff className="w-4 h-4" />
                        </button>
                      )}
                      
                      <Link
                        to={`/cloudpc/${cloudPC.id}`}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="管理"
                      >
                        <Settings className="w-4 h-4" />
                      </Link>
                      
                      <button
                        onClick={() => handleDeleteCloudPC(cloudPC.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="删除"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    
                    {cloudPC.status === 'running' && (
                      <Link
                        to={`/cloudpc/${cloudPC.id}/connect`}
                        className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                      >
                        连接
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}