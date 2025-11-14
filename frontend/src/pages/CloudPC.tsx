import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { 
  ArrowLeft, 
  Monitor, 
  Power, 
  PowerOff, 
  Settings, 
  Activity,
  Cpu,
  HardDrive,
  Wifi,
  Clock,
  Terminal,
  Maximize2,
  Minimize2,
  Copy,
  ExternalLink
} from 'lucide-react'
import { cloudPCService, type CloudPC, type CloudPCStats } from '../services/cloudpc'
import toast from 'react-hot-toast'

export default function CloudPC() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [cloudPC, setCloudPC] = useState<CloudPC | null>(null)
  const [stats, setStats] = useState<CloudPCStats | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')
  const [isConnecting, setIsConnecting] = useState(false)

  useEffect(() => {
    if (id) {
      loadCloudPCData()
      loadStats()
    }
  }, [id])

  const loadCloudPCData = async () => {
    try {
      const data = await cloudPCService.getCloudPC(id!)
      setCloudPC(data)
    } catch (error) {
      toast.error('加载云电脑信息失败')
      navigate('/dashboard')
    } finally {
      setIsLoading(false)
    }
  }

  const loadStats = async () => {
    try {
      const statsData = await cloudPCService.getCloudPCStats(id!)
      setStats(statsData)
    } catch (error) {
      console.error('加载统计数据失败:', error)
    }
  }

  const handleStartCloudPC = async () => {
    try {
      await cloudPCService.startCloudPC(id!)
      toast.success('云电脑启动成功')
      loadCloudPCData()
    } catch (error) {
      toast.error('启动失败')
    }
  }

  const handleStopCloudPC = async () => {
    try {
      await cloudPCService.stopCloudPC(id!)
      toast.success('云电脑已停止')
      loadCloudPCData()
    } catch (error) {
      toast.error('停止失败')
    }
  }

  const handleConnect = async () => {
    setIsConnecting(true)
    try {
      const connectionData = await cloudPCService.connectToCloudPC(id!)
      
      // 打开新窗口连接到云电脑
      const newWindow = window.open(
        connectionData.connectionUrl,
        '_blank',
        'width=1200,height=800'
      )
      
      if (newWindow) {
        toast.success('正在连接云电脑...')
      } else {
        toast.error('无法打开连接窗口，请检查弹窗设置')
      }
    } catch (error) {
      toast.error('连接失败')
    } finally {
      setIsConnecting(false)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast.success('已复制到剪贴板')
    })
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

  if (!cloudPC) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">云电脑不存在</h2>
          <p className="text-gray-600 mb-4">找不到指定的云电脑实例</p>
          <Link to="/dashboard" className="btn-primary">
            返回控制台
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link
              to="/dashboard"
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{cloudPC.name}</h1>
              <p className="text-gray-600">
                {cloudPC.os} • {cloudPC.cpu}核心 • {cloudPC.memory}GB内存
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(cloudPC.status)}`}>
              {getStatusText(cloudPC.status)}
            </span>
            
            {cloudPC.status === 'stopped' ? (
              <button
                onClick={handleStartCloudPC}
                className="btn-primary flex items-center"
              >
                <Power className="w-4 h-4 mr-2" />
                启动
              </button>
            ) : (
              <button
                onClick={handleStopCloudPC}
                className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg font-medium flex items-center transition-colors"
              >
                <PowerOff className="w-4 h-4 mr-2" />
                停止
              </button>
            )}
          </div>
        </div>

        {/* Connection Banner */}
        {cloudPC.status === 'running' && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Monitor className="w-5 h-5 text-blue-600 mr-3" />
                <div>
                  <h3 className="font-medium text-blue-900">云电脑运行中</h3>
                  <p className="text-blue-700 text-sm">点击连接按钮即可通过浏览器远程访问</p>
                </div>
              </div>
              <button
                onClick={handleConnect}
                disabled={isConnecting}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium flex items-center transition-colors disabled:opacity-50"
              >
                {isConnecting ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    连接中...
                  </div>
                ) : (
                  <>
                    <ExternalLink className="w-4 h-4 mr-2" />
                    连接
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('overview')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'overview'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                概览
              </button>
              <button
                onClick={() => setActiveTab('terminal')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'terminal'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                终端
              </button>
              <button
                onClick={() => setActiveTab('monitor')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'monitor'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                监控
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'settings'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                设置
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Basic Info */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">基本信息</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">实例ID</span>
                        <div className="flex items-center">
                          <span className="font-mono text-sm">{cloudPC.id}</span>
                          <button
                            onClick={() => copyToClipboard(cloudPC.id)}
                            className="ml-2 p-1 text-gray-400 hover:text-gray-600"
                          >
                            <Copy className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">操作系统</span>
                        <span className="font-medium">{cloudPC.os}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">CPU核心</span>
                        <span className="font-medium">{cloudPC.cpu} 核心</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">内存</span>
                        <span className="font-medium">{cloudPC.memory} GB</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">存储</span>
                        <span className="font-medium">{cloudPC.storage} GB</span>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">IP地址</span>
                        <div className="flex items-center">
                          <span className="font-mono text-sm">{cloudPC.ip}</span>
                          <button
                            onClick={() => copyToClipboard(cloudPC.ip)}
                            className="ml-2 p-1 text-gray-400 hover:text-gray-600"
                          >
                            <Copy className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">端口</span>
                        <span className="font-medium">{cloudPC.port}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">创建时间</span>
                        <span className="font-medium">
                          {new Date(cloudPC.createdAt).toLocaleString('zh-CN')}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">状态</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(cloudPC.status)}`}>
                          {getStatusText(cloudPC.status)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* System Stats */}
                {stats && cloudPC.status === 'running' && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">系统统计</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center mb-2">
                          <Cpu className="w-5 h-5 text-gray-600 mr-2" />
                          <span className="text-sm font-medium text-gray-600">CPU使用率</span>
                        </div>
                        <div className="flex items-center">
                          <span className="text-2xl font-bold text-gray-900">
                            {stats.cpuUsage}%
                          </span>
                          <div className="ml-4 flex-1 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-primary-600 h-2 rounded-full"
                              style={{ width: `${stats.cpuUsage}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center mb-2">
                          <HardDrive className="w-5 h-5 text-gray-600 mr-2" />
                          <span className="text-sm font-medium text-gray-600">内存使用率</span>
                        </div>
                        <div className="flex items-center">
                          <span className="text-2xl font-bold text-gray-900">
                            {stats.memoryUsage}%
                          </span>
                          <div className="ml-4 flex-1 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-green-600 h-2 rounded-full"
                              style={{ width: `${stats.memoryUsage}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center mb-2">
                          <Activity className="w-5 h-5 text-gray-600 mr-2" />
                          <span className="text-sm font-medium text-gray-600">磁盘使用率</span>
                        </div>
                        <div className="flex items-center">
                          <span className="text-2xl font-bold text-gray-900">
                            {stats.diskUsage}%
                          </span>
                          <div className="ml-4 flex-1 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-orange-600 h-2 rounded-full"
                              style={{ width: `${stats.diskUsage}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">网络输入</span>
                        <span className="font-medium">{stats.networkIn} MB/s</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">网络输出</span>
                        <span className="font-medium">{stats.networkOut} MB/s</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">运行时间</span>
                        <span className="font-medium">{stats.uptime}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'terminal' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Web终端</h3>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setIsFullscreen(!isFullscreen)}
                      className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                    </button>
                    <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                      <Settings className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                <div className={`bg-gray-900 rounded-lg p-4 ${isFullscreen ? 'fixed inset-4 z-50' : 'h-96'}`}>
                  {cloudPC.status === 'running' ? (
                    <div className="text-green-400 font-mono text-sm">
                      <div className="mb-4">
                        终端已连接 - {cloudPC.name} ({cloudPC.ip})
                      </div>
                      <div className="space-y-2">
                        <div>user@{cloudPC.name.toLowerCase()}:~$ <span className="animate-pulse">█</span></div>
                        <div className="text-gray-400 text-xs mt-4">
                          这是Web终端预览。实际使用时将通过WebSocket连接到真实的云电脑终端。
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-gray-400 font-mono text-sm flex items-center justify-center h-full">
                      <div className="text-center">
                        <Terminal className="w-12 h-12 mx-auto mb-4 opacity-50" />
                        <p>云电脑已停止，无法连接终端</p>
                        <p className="text-xs mt-2">请先启动云电脑</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'monitor' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">性能监控</h3>
                {cloudPC.status === 'running' ? (
                  <div className="text-center py-12">
                    <Activity className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">实时监控功能开发中...</p>
                    <p className="text-sm text-gray-500 mt-2">
                      将显示CPU、内存、磁盘、网络等实时监控图表
                    </p>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Power className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">云电脑未运行</p>
                    <p className="text-sm text-gray-500 mt-2">
                      请先启动云电脑查看监控数据
                    </p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">云电脑设置</h3>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <p className="text-yellow-800">
                    设置功能开发中...将支持修改云电脑配置、重置、快照管理等高级功能。
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}