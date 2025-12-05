import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { register } from '../services/auth'

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    pin: '',
    confirmPin: ''
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
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
    setSuccess(false)

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    if (formData.username.length < 3 || formData.username.length > 13) {
      setError('Username must be between 3 and 13 characters')
      return
    }

    if (!/^\d{4}$/.test(formData.pin)) {
      setError('PIN must be exactly 4 digits')
      return
    }

    if (formData.pin !== formData.confirmPin) {
      setError('PINs do not match')
      return
    }

    setLoading(true)

    try {
      const response = await register(formData.username, formData.password, formData.pin)
      if (response.success) {
        setSuccess(true)
        setTimeout(() => {
          navigate('/login')
        }, 2000)
      } else {
        setError(response.message || 'Registration failed')
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred during registration')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-4 flex items-center justify-center min-h-[calc(100vh-200px)]">
      <div className="card max-w-md w-full p-5">
        <h2 className="text-2xl font-bold mb-4 text-center text-maple-gold">
          Create Account
        </h2>

        {error && (
          <div className="mb-3 p-2 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200 text-sm">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-3 p-2 bg-green-500/20 border border-green-500/50 rounded-lg text-green-200 text-sm">
            Account created! Redirecting...
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
              placeholder="3-13 characters"
              required
              minLength={3}
              maxLength={13}
              autoComplete="username"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
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
                placeholder="Min 6 chars"
                required
                minLength={6}
                autoComplete="new-password"
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block mb-1 text-sm text-white/80">
                Confirm
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="input-field py-2 text-sm"
                placeholder="Confirm password"
                required
                autoComplete="new-password"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="pin" className="block mb-1 text-sm text-white/80">
                PIN (4 digits)
              </label>
              <input
                type="password"
                id="pin"
                name="pin"
                value={formData.pin}
                onChange={handleChange}
                className="input-field py-2 text-sm"
                placeholder="0000"
                required
                minLength={4}
                maxLength={4}
                pattern="\d{4}"
                inputMode="numeric"
              />
            </div>

            <div>
              <label htmlFor="confirmPin" className="block mb-1 text-sm text-white/80">
                Confirm PIN
              </label>
              <input
                type="password"
                id="confirmPin"
                name="confirmPin"
                value={formData.confirmPin}
                onChange={handleChange}
                className="input-field py-2 text-sm"
                placeholder="0000"
                required
                minLength={4}
                maxLength={4}
                pattern="\d{4}"
                inputMode="numeric"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || success}
            className="btn-primary w-full py-2 text-sm mt-2"
          >
            {loading ? 'Creating...' : success ? 'Created!' : 'Register'}
          </button>
        </form>

        <p className="mt-4 text-center text-white/70 text-sm">
          Already have an account?{' '}
          <Link to="/login" className="text-maple-gold hover:text-yellow-400 transition-colors">
            Login here
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Register
