import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function ChangePassword() {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  axios.defaults.withCredentials = true

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    setError('')
    setSuccess(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess(false)

    // Validation
    if (formData.newPassword !== formData.confirmPassword) {
      setError('New passwords do not match')
      return
    }

    if (formData.newPassword.length < 6) {
      setError('New password must be at least 6 characters')
      return
    }

    if (formData.currentPassword === formData.newPassword) {
      setError('New password must be different from current password')
      return
    }

    setLoading(true)

    try {
      const response = await axios.post('/api/change-password', {
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword
      })

      if (response.data.success) {
        setSuccess(true)
        setFormData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        })
        setTimeout(() => {
          navigate('/')
        }, 2000)
      } else {
        setError(response.data.message || 'Password change failed')
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred while changing password')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-4 flex items-center justify-center min-h-[calc(100vh-200px)]">
      <div className="card max-w-md w-full p-5">
        <h2 className="text-2xl font-bold mb-4 text-center text-maple-gold">
          Change Password
        </h2>

        {error && (
          <div className="mb-3 p-2 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200 text-sm">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-3 p-2 bg-green-500/20 border border-green-500/50 rounded-lg text-green-200 text-sm">
            Password changed successfully! Redirecting...
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label htmlFor="currentPassword" className="block mb-1 text-sm text-white/80">
              Current Password
            </label>
            <input
              type="password"
              id="currentPassword"
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
              className="input-field py-2 text-sm"
              placeholder="Enter current password"
              required
              autoComplete="current-password"
            />
          </div>

          <div>
            <label htmlFor="newPassword" className="block mb-1 text-sm text-white/80">
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              className="input-field py-2 text-sm"
              placeholder="Enter new password (min 6 characters)"
              required
              minLength={6}
              autoComplete="new-password"
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block mb-1 text-sm text-white/80">
              Confirm New Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="input-field py-2 text-sm"
              placeholder="Confirm new password"
              required
              minLength={6}
              autoComplete="new-password"
            />
          </div>

          <button
            type="submit"
            disabled={loading || success}
            className="btn-primary w-full py-2 text-sm mt-2"
          >
            {loading ? 'Changing...' : success ? 'Changed!' : 'Change Password'}
          </button>
        </form>

        <button
          onClick={() => navigate('/')}
          className="mt-4 w-full text-center text-white/70 text-sm hover:text-maple-gold transition-colors"
        >
          ← Back to Home
        </button>
      </div>
    </div>
  )
}

export default ChangePassword
