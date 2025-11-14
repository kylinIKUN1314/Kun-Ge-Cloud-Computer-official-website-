import { Link } from 'react-router-dom'
import { 
  Target, 
  Users, 
  Award, 
  Zap, 
  Shield, 
  Globe,
  ArrowRight,
  CheckCircle,
  Star,
  TrendingUp
} from 'lucide-react'

export default function About() {
  const teamMembers = [
    {
      name: '张明',
      position: '创始人 & CEO',
      bio: '15年云计算行业经验，曾任职于知名云服务提供商',
      avatar: '👨‍💼'
    },
    {
      name: '李华',
      position: '技术总监',
      bio: '10年云基础设施开发经验，专注分布式系统架构',
      avatar: '👨‍💻'
    },
    {
      name: '王丽',
      position: '产品总监',
      bio: '8年产品管理经验，专注于用户体验设计',
      avatar: '👩‍💼'
    },
    {
      name: '陈强',
      position: '安全架构师',
      bio: '12年网络安全经验，致力于云安全技术研发',
      avatar: '👨‍🔬'
    }
  ]

  const milestones = [
    {
      year: '2020',
      title: '公司成立',
      description: '公司正式成立，专注于云计算服务领域'
    },
    {
      year: '2021',
      title: '产品发布',
      description: '首款云电脑产品正式上线，获得首批用户好评'
    },
    {
      year: '2022',
      title: '用户增长',
      description: '用户数量突破1万，服务稳定性和性能得到市场认可'
    },
    {
      year: '2023',
      title: '技术升级',
      description: '全面升级基础设施，推出高性能云电脑解决方案'
    },
    {
      year: '2024',
      title: '市场扩展',
      description: '服务用户超过5万，成为国内领先的云电脑服务商'
    }
  ]

  const values = [
    {
      icon: Target,
      title: '以用户为中心',
      description: '始终将用户需求放在首位，持续优化产品体验和服务质量'
    },
    {
      icon: Zap,
      title: '追求卓越性能',
      description: '不断技术创新，提供高性能、高可用的云计算服务'
    },
    {
      icon: Shield,
      title: '安全可信',
      description: '建立完善的安全体系，保障用户数据和业务安全'
    },
    {
      icon: Users,
      title: '团队协作',
      description: '倡导开放协作，打造专业的云计算服务团队'
    }
  ]

  const stats = [
    { label: '服务用户', value: '50,000+', icon: Users },
    { label: '云电脑实例', value: '100,000+', icon: Globe },
    { label: '服务可用性', value: '99.99%', icon: Shield },
    { label: '客户满意度', value: '98%', icon: Star }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 via-primary-700 to-purple-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                关于
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
                  云电脑科技
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-primary-100 mb-8">
                我们致力于为用户提供专业、安全、高效的云计算服务，让每个人都能轻松享受云端的强大计算能力
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/contact"
                  className="bg-white text-primary-600 px-8 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors inline-flex items-center justify-center"
                >
                  联系我们
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
                <Link
                  to="/pricing"
                  className="border-2 border-white text-white px-8 py-3 rounded-lg font-medium hover:bg-white hover:text-primary-600 transition-colors"
                >
                  查看价格
                </Link>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <div className="grid grid-cols-2 gap-6">
                  {stats.map((stat, index) => {
                    const IconComponent = stat.icon
                    return (
                      <div key={index} className="text-center">
                        <IconComponent className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
                        <div className="text-2xl font-bold">{stat.value}</div>
                        <div className="text-primary-100 text-sm">{stat.label}</div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              我们的使命
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              通过技术创新，让云计算服务更加简单、高效、安全，为数字化转型提供强有力的技术支撑
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">创新驱动</h3>
              <p className="text-gray-600 leading-relaxed">
                持续投入研发，推动云计算技术发展，为用户提供更先进的产品和服务
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">安全可靠</h3>
              <p className="text-gray-600 leading-relaxed">
                建立多层次安全防护体系，确保用户数据安全和服务稳定可靠
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Globe className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">开放生态</h3>
              <p className="text-gray-600 leading-relaxed">
                构建开放的云计算生态，与合作伙伴共同为用户创造更大价值
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              我们的价值观
            </h2>
            <p className="text-xl text-gray-600">
              这些价值观指导着我们的每一个决策和行动
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon
              return (
                <div key={index} className="bg-gray-50 rounded-xl p-8">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <IconComponent className="w-6 h-6 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">
                        {value.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              发展历程
            </h2>
            <p className="text-xl text-gray-600">
              从创立到今天，我们一直在不断成长和进步
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-500 to-purple-500"></div>
            
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className="relative flex items-start">
                  <div className="absolute left-6 w-4 h-4 bg-primary-600 rounded-full border-4 border-white shadow-lg"></div>
                  <div className="ml-20">
                    <div className="flex items-center mb-2">
                      <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium">
                        {milestone.year}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {milestone.title}
                    </h3>
                    <p className="text-gray-600">
                      {milestone.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              核心团队
            </h2>
            <p className="text-xl text-gray-600">
              由行业资深专家组成的专业团队
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="text-center group">
                <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary-100 to-purple-100 flex items-center justify-center text-6xl group-hover:scale-105 transition-transform">
                  {member.avatar}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {member.name}
                </h3>
                <p className="text-primary-600 font-medium mb-3">
                  {member.position}
                </p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-r from-primary-600 to-purple-600 rounded-2xl p-12 text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              加入我们的云计算之旅
            </h2>
            <p className="text-xl text-primary-100 mb-8">
              体验专业的云电脑服务，让技术为您的业务赋能
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
                to="/pricing"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-medium hover:bg-white hover:text-primary-600 transition-colors"
              >
                查看定价
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}