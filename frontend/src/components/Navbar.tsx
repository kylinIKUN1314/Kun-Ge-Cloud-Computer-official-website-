import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Menu, X, Cloud, User, LogOut } from 'lucide-react'
import { authService } from '../services/auth'
import { cn } from '../lib/utils'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const checkAuth = async () => {
      if (authService.isAuthenticated()) {
        try {
          const userData = await authService.getCurrentUser()
          setUser(userData)
          setIsAuthenticated(true)
        } catch (error) {
          setIsAuthenticated(false)
        }
      }
    }
    checkAuth()
  }, [])

  const handleLogout = () => {
    authService.logout()
  }

  return (
    <nav className="bg-white shadow-lg border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="p-2 bg-primary-600 rounded-lg">
                <Cloud className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">云电脑</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className="text-gray-700 hover:text-primary-600 transition-colors"
            >
              首页
            </Link>
            <Link 
              to="/pricing" 
              className="text-gray-700 hover:text-primary-600 transition-colors"
            >
              价格
            </Link>
            <Link 
              to="/about" 
              className="text-gray-700 hover:text-primary-600 transition-colors"
            >
              关于我们
            </Link>
            
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Link 
                  to="/dashboard" 
                  className="text-gray-700 hover:text-primary-600 transition-colors"
                >
                  控制台
                </Link>
                <div className="relative group">
                  <button className="flex items-center space-x-2 text-gray-700 hover:text-primary-600">
                    <User className="w-4 h-4" />
                    <span>{user?.name}</span>
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 invisible group-hover:visible">
                    <Link
                      to="/dashboard"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      控制台
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <LogOut className="w-4 h-4 inline mr-2" />
                      退出登录
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-primary-600 transition-colors"
                >
                  登录
                </Link>
                <Link
                  to="/register"
                  className="btn-primary"
                >
                  注册
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-primary-600"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className="block px-3 py-2 text-gray-700 hover:text-primary-600"
              onClick={() => setIsOpen(false)}
            >
              首页
            </Link>
            <Link
              to="/pricing"
              className="block px-3 py-2 text-gray-700 hover:text-primary-600"
              onClick={() => setIsOpen(false)}
            >
              价格
            </Link>
            <Link
              to="/about"
              className="block px-3 py-2 text-gray-700 hover:text-primary-600"
              onClick={() => setIsOpen(false)}
            >
              关于我们
            </Link>
            
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className="block px-3 py-2 text-gray-700 hover:text-primary-600"
                  onClick={() => setIsOpen(false)}
                >
                  控制台
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-3 py-2 text-gray-700 hover:text-primary-600"
                >
                  退出登录
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block px-3 py-2 text-gray-700 hover:text-primary-600"
                  onClick={() => setIsOpen(false)}
                >
                  登录
                </Link>
                <Link
                  to="/register"
                  className="block px-3 py-2 text-primary-600 font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  注册
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}