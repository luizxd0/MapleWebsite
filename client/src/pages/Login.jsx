import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../services/auth'

function Login({ setUser }) {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await login(formData.username, formData.password)
      if (response.success) {
        setUser(response.user)
        navigate('/')
      } else {
        setError(response.message || 'Login failed')
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred during login')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-4 flex items-center justify-center min-h-[calc(100vh-200px)]">
      <div className="card max-w-md w-full p-5">
        <h2 className="text-2xl font-bold mb-4 text-center text-maple-gold">
          Login
        </h2>

        {error && (
          <div className="mb-3 p-2 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label htmlFor="username" className="block mb-1 text-sm text-white/80">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="input-field py-2 text-sm"
              placeholder="Enter your username"
              required
              autoComplete="username"
            />
          </div>

          <div>
            <label htmlFor="password" className="block mb-1 text-sm text-white/80">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="input-field py-2 text-sm"
              placeholder="Enter your password"
              required
              autoComplete="current-password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full py-2 text-sm mt-2"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="mt-4 text-center text-white/70 text-sm">
          Don't have an account?{' '}
          <Link to="/register" className="text-maple-gold hover:text-yellow-400 transition-colors">
            Register here
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login
