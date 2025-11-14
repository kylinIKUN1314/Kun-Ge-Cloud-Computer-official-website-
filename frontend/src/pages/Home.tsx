import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { 
  Cloud, 
  Shield, 
  Zap, 
  Monitor, 
  Server, 
  Users,
  ArrowRight,
  CheckCircle,
  Play
} from 'lucide-react'

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0)
  
  const features = [
    {
      icon: <Cloud className="w-8 h-8 text-primary-600" />,
      title: "云端计算",
      description: "强大的云计算资源，随时随地访问您的桌面环境"
    },
    {
      icon: <Shield className="w-8 h-8 text-primary-600" />,
      title: "安全可靠",
      description: "企业级安全防护，数据加密传输，保护您的隐私"
    },
    {
      icon: <Zap className="w-8 h-8 text-primary-600" />,
      title: "高性能",
      description: "最新硬件配置，极速响应，提升工作效率"
    },
    {
      icon: <Monitor className="w-8 h-8 text-primary-600" />,
      title: "跨平台访问",
      description: "支持Windows、Mac、Linux、iOS、Android多平台"
    }
  ]

  const testimonials = [
    {
      name: "张经理",
      company: "某科技公司",
      content: "使用云电脑后，我们的团队协作效率提升了50%，成本降低了30%。",
      avatar: "👨‍💼"
    },
    {
      name: "李设计师",
      company: "设计工作室",
      content: "云端渲染速度快，项目交付时间缩短了很多，客户非常满意。",
      avatar: "👩‍🎨"
    },
    {
      name: "王工程师",
      company: "软件公司",
      content: "开发环境部署简单，性能稳定，是团队开发的首选方案。",
      avatar: "👨‍💻"
    }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-gradient text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                云端计算
                <span className="block text-4xl lg:text-5xl text-blue-200">
                  无限可能
                </span>
              </h1>
              <p className="text-xl mb-8 text-blue-100 leading-relaxed">
                体验新一代云计算服务，随时随地访问您的专属桌面环境。
                强大的性能、安全的存储、便捷的管理，让您的工作更高效。
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/register"
                  className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors duration-200 text-center"
                >
                  免费试用
                </Link>
                <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-primary-600 transition-colors duration-200 flex items-center justify-center">
                  <Play className="w-5 h-5 mr-2" />
                  观看演示
                </button>
              </div>
            </div>
            <div className="animate-bounce-in">
              <div className="relative">
                <div className="absolute inset-0 bg-white rounded-2xl shadow-2xl transform rotate-6"></div>
                <div className="relative bg-white rounded-2xl shadow-2xl p-8 text-gray-900">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <span className="text-sm text-gray-500">云桌面</span>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                        <Server className="w-4 h-4 text-primary-600" />
                      </div>
                      <div>
                        <p className="font-semibold">Web服务器</p>
                        <p className="text-sm text-gray-500">运行中</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      </div>
                      <div>
                        <p className="font-semibold">系统状态</p>
                        <p className="text-sm text-gray-500">运行正常</p>
                      </div>
                    </div>
                    <div className="bg-gray-100 rounded-lg p-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span>CPU使用率</span>
                        <span>15%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-primary-600 h-2 rounded-full" style={{width: '15%'}}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              为什么选择我们的云电脑服务
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              我们提供全方位的云端计算解决方案，让您的工作更高效、更安全、更便捷
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="card text-center group hover:scale-105 transition-transform duration-200">
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              简单三步，开始使用
            </h2>
            <p className="text-xl text-gray-600">
              无需复杂配置，轻松开启您的云端工作环境
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold mb-3">注册账户</h3>
              <p className="text-gray-600">快速注册，立即获得免费试用额度</p>
            </div>
            <div className="text-center">
              <div className="bg-primary-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold mb-3">创建云电脑</h3>
              <p className="text-gray-600">选择配置，一键创建您的专属云桌面</p>
            </div>
            <div className="text-center">
              <div className="bg-primary-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold mb-3">开始使用</h3>
              <p className="text-gray-600">通过浏览器安全连接，随时随地工作</p>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-20 bg-primary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">10,000+</div>
              <div className="text-primary-200">活跃用户</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">99.9%</div>
              <div className="text-primary-200">服务可用性</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-primary-200">企业客户</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-primary-200">技术支持</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              客户评价
            </h2>
            <p className="text-xl text-gray-600">
              听听我们的用户怎么说
            </p>
          </div>
          <div className="relative max-w-4xl mx-auto">
            <div className="bg-gray-50 rounded-2xl p-8 text-center">
              <div className="text-6xl mb-4">{testimonials[currentSlide].avatar}</div>
              <p className="text-xl text-gray-700 mb-6 italic">
                "{testimonials[currentSlide].content}"
              </p>
              <div>
                <div className="font-semibold text-gray-900">
                  {testimonials[currentSlide].name}
                </div>
                <div className="text-gray-600">
                  {testimonials[currentSlide].company}
                </div>
              </div>
            </div>
            <div className="flex justify-center mt-6 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentSlide ? 'bg-primary-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">
            准备好开始了吗？
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            立即注册，获得免费试用额度，体验强大的云端计算服务
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-200 inline-flex items-center justify-center"
            >
              免费注册
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
            <Link
              to="/pricing"
              className="border-2 border-gray-600 hover:border-gray-500 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-200"
            >
              查看价格
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}