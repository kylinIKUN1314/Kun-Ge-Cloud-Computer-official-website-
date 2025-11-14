import { useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  Check, 
  Star, 
  Zap, 
  Shield, 
  Headphones,
  Cloud,
  Cpu,
  HardDrive,
  Monitor,
  Clock,
  ArrowRight
} from 'lucide-react'

export default function Pricing() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly')

  const plans = [
    {
      id: 'basic',
      name: '基础版',
      description: '适合个人用户和轻度使用',
      price: { monthly: 99, yearly: 999 },
      icon: Monitor,
      color: 'blue',
      features: [
        { name: '2个云电脑实例', included: true },
        { name: '4核CPU', included: true },
        { name: '8GB内存', included: true },
        { name: '100GB存储空间', included: true },
        { name: 'Windows 10/11', included: true },
        { name: '24x7在线支持', included: true },
        { name: '99.9%可用性保证', included: true },
        { name: '24小时技术支持', included: false },
        { name: '数据备份服务', included: false },
        { name: '定制化配置', included: false }
      ],
      popular: false
    },
    {
      id: 'professional',
      name: '专业版',
      description: '适合企业和专业用户',
      price: { monthly: 199, yearly: 1999 },
      icon: Zap,
      color: 'primary',
      features: [
        { name: '5个云电脑实例', included: true },
        { name: '8核CPU', included: true },
        { name: '16GB内存', included: true },
        { name: '500GB存储空间', included: true },
        { name: 'Windows/Linux系统', included: true },
        { name: '24x7在线支持', included: true },
        { name: '99.9%可用性保证', included: true },
        { name: '24小时技术支持', included: true },
        { name: '每日数据备份', included: true },
        { name: '定制化配置', included: false }
      ],
      popular: true
    },
    {
      id: 'enterprise',
      name: '企业版',
      description: '适合大型企业和高性能需求',
      price: { monthly: 399, yearly: 3999 },
      icon: Shield,
      color: 'purple',
      features: [
        { name: '无限云电脑实例', included: true },
        { name: '16核CPU', included: true },
        { name: '32GB内存', included: true },
        { name: '2TB存储空间', included: true },
        { name: '多系统支持', included: true },
        { name: '24x7在线支持', included: true },
        { name: '99.99%可用性保证', included: true },
        { name: '专属技术经理', included: true },
        { name: '实时数据备份', included: true },
        { name: '定制化配置', included: true }
      ],
      popular: false
    }
  ]

  const faqs = [
    {
      question: '云电脑的性能如何？',
      answer: '我们的云电脑采用高性能服务器集群，支持从4核到16核CPU配置，内存从8GB到32GB，确保流畅的使用体验。'
    },
    {
      question: '支持哪些操作系统？',
      answer: '支持Windows 10/11、Ubuntu、CentOS、Debian等主流操作系统，可根据需求灵活选择。'
    },
    {
      question: '数据安全如何保障？',
      answer: '采用多层安全防护，包括数据加密传输、定期备份、多地域容灾，确保数据安全可靠。'
    },
    {
      question: '可以随时升级或降级套餐吗？',
      answer: '是的，您可以随时升级或降级套餐，费用按实际使用天数计算。'
    },
    {
      question: '提供技术支持吗？',
      answer: '所有套餐都提供7x24小时在线支持，专业版和企业版还有电话和邮件支持。'
    }
  ]

  const getColorClasses = (color: string, type: 'bg' | 'text' | 'border') => {
    const colors = {
      blue: {
        bg: 'bg-blue-600 hover:bg-blue-700',
        text: 'text-blue-600',
        border: 'border-blue-200'
      },
      primary: {
        bg: 'bg-primary-600 hover:bg-primary-700',
        text: 'text-primary-600',
        border: 'border-primary-200'
      },
      purple: {
        bg: 'bg-purple-600 hover:bg-purple-700',
        text: 'text-purple-600',
        border: 'border-purple-200'
      }
    }
    return colors[color as keyof typeof colors][type]
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 via-primary-700 to-purple-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            选择适合您的
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
              云电脑套餐
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-primary-100 mb-8 max-w-3xl mx-auto">
            灵活的定价方案，满足从个人用户到企业团队的各种需求
          </p>
          
          {/* Billing Toggle */}
          <div className="inline-flex items-center bg-white/10 rounded-lg p-1 backdrop-blur-sm">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2 rounded-md font-medium transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-white text-primary-600 shadow-md'
                  : 'text-white hover:bg-white/20'
              }`}
            >
              按月付费
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-6 py-2 rounded-md font-medium transition-all relative ${
                billingCycle === 'yearly'
                  ? 'bg-white text-primary-600 shadow-md'
                  : 'text-white hover:bg-white/20'
              }`}
            >
              按年付费
              <span className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs px-2 py-1 rounded-full">
                优惠
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan) => {
              const IconComponent = plan.icon
              const price = plan.price[billingCycle]
              const discount = billingCycle === 'yearly' ? Math.round((1 - price / (plan.price.monthly * 12)) * 100) : 0
              
              return (
                <div
                  key={plan.id}
                  className={`relative bg-white rounded-2xl shadow-lg border-2 ${
                    plan.popular ? 'border-primary-500 scale-105' : 'border-gray-200'
                  } hover:shadow-xl transition-all duration-300`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <div className="bg-gradient-to-r from-primary-500 to-purple-500 text-white px-6 py-2 rounded-full text-sm font-medium flex items-center">
                        <Star className="w-4 h-4 mr-1" />
                        最受欢迎
                      </div>
                    </div>
                  )}
                  
                  <div className="p-8">
                    {/* Plan Header */}
                    <div className="text-center mb-8">
                      <div className={`w-16 h-16 ${getColorClasses(plan.color, 'bg').split(' ')[0]}/10 rounded-full flex items-center justify-center mx-auto mb-4`}>
                        <IconComponent className={`w-8 h-8 ${getColorClasses(plan.color, 'text')}`} />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                      <p className="text-gray-600">{plan.description}</p>
                    </div>

                    {/* Pricing */}
                    <div className="text-center mb-8">
                      <div className="flex items-baseline justify-center">
                        <span className="text-4xl font-bold text-gray-900">¥{price}</span>
                        <span className="text-gray-600 ml-2">
                          /{billingCycle === 'monthly' ? '月' : '年'}
                        </span>
                      </div>
                      {billingCycle === 'yearly' && discount > 0 && (
                        <div className="mt-2">
                          <span className="text-sm text-gray-500 line-through">
                            ¥{plan.price.monthly * 12}/年
                          </span>
                          <span className="text-sm text-green-600 font-medium ml-2">
                            节省 {discount}%
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Features */}
                    <div className="space-y-4 mb-8">
                      {plan.features.map((feature, index) => (
                        <div key={index} className="flex items-center">
                          <div className={`w-5 h-5 rounded-full flex items-center justify-center mr-3 ${
                            feature.included ? 'bg-green-100' : 'bg-gray-100'
                          }`}>
                            <Check className={`w-3 h-3 ${
                              feature.included ? 'text-green-600' : 'text-gray-400'
                            }`} />
                          </div>
                          <span className={`${
                            feature.included ? 'text-gray-900' : 'text-gray-400'
                          }`}>
                            {feature.name}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* CTA Button */}
                    <Link
                      to={plan.id === 'basic' ? '/register' : '/contact'}
                      className={`w-full py-3 px-4 rounded-lg font-medium transition-all flex items-center justify-center ${
                        plan.popular
                          ? `${getColorClasses(plan.color, 'bg')} text-white shadow-lg hover:shadow-xl`
                          : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                      }`}
                    >
                      {plan.id === 'basic' ? '免费试用' : '联系销售'}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Features Comparison */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              为什么选择我们的云电脑？
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              专业的云计算服务，为您提供稳定、安全、高效的云端计算体验
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">高性能</h3>
              <p className="text-gray-600">
                采用最新处理器和高速存储，确保流畅运行各类应用
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">安全可靠</h3>
              <p className="text-gray-600">
                多重安全防护，数据加密传输，保障您的信息安全
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Headphones className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">专业支持</h3>
              <p className="text-gray-600">
                7x24小时技术支持，专业团队为您保驾护航
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Cloud className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">灵活扩展</h3>
              <p className="text-gray-600">
                按需扩展资源，随时调整配置，满足业务发展需求
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              常见问题
            </h2>
            <p className="text-xl text-gray-600">
              为您解答关于云电脑服务的常见疑问
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {faq.question}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            准备开始使用云电脑了吗？
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            加入数万用户的选择，体验便捷的云计算服务
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="bg-white text-primary-600 px-8 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors inline-flex items-center justify-center"
            >
              免费试用
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
            <Link
              to="/contact"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-medium hover:bg-white hover:text-primary-600 transition-colors"
            >
              联系销售
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}