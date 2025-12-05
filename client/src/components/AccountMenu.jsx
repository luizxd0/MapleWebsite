import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { logout } from '../services/auth'

axios.defaults.withCredentials = true

function AccountMenu({ user, setUser }) {
  const [isOpen, setIsOpen] = useState(false)
  const [currentUser, setCurrentUser] = useState(user)
  const menuRef = useRef(null)
  const navigate = useNavigate()

  // Fetch fresh user data when menu opens
  useEffect(() => {
    if (isOpen && user) {
      const fetchUserData = async () => {
        try {
          const response = await axios.get('/api/user')
          if (response.data.success) {
            setCurrentUser(response.data.user)
            setUser(response.data.user) // Update parent state too
          }
        } catch (error) {
          console.error('Error fetching user data:', error)
        }
      }
      fetchUserData()
    }
  }, [isOpen, user, setUser])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  // Update currentUser when user prop changes
  useEffect(() => {
    setCurrentUser(user)
  }, [user])

  const handleLogout = async () => {
    try {
      await logout()
      setUser(null)
      navigate('/')
      setIsOpen(false)
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 hover:text-maple-gold transition-colors text-sm"
      >
        <span className="text-maple-gold">Account</span>
        <svg 
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-maple-dark border border-white/20 rounded-lg shadow-xl z-50 overflow-hidden">
          <div className="p-3 border-b border-white/10">
            <div className="text-sm font-semibold text-maple-gold">{currentUser?.username || user?.username}</div>
            <div className="text-xs text-white/60 mt-1">
              NX: <span className="text-maple-gold font-semibold">{currentUser?.nx ?? user?.nx ?? 0}</span> | MP: <span className="text-maple-gold font-semibold">{currentUser?.maplepoints ?? user?.maplepoints ?? 0}</span>
            </div>
          </div>
          
          <div className="py-1">
            <Link
              to="/change-password"
              onClick={() => setIsOpen(false)}
              className="block px-4 py-2 text-sm text-white/80 hover:bg-white/10 hover:text-maple-gold transition-colors"
            >
              Change Password
            </Link>
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-sm text-white/80 hover:bg-white/10 hover:text-red-400 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AccountMenu
