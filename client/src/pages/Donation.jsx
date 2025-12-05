import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import axios from 'axios'

function Donation() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  axios.defaults.withCredentials = true

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('/api/user')
        if (response.data.success) {
          setUser(response.data.user)
        }
      } catch (error) {
        // User not logged in, that's okay
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-4 flex items-center justify-center min-h-[calc(100vh-200px)]">
        <div className="text-xl">Loading...</div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-4 flex items-center justify-center min-h-[calc(100vh-200px)]">
      <div className="card max-w-2xl w-full p-5">
        <h2 className="text-2xl font-bold mb-4 text-center text-maple-gold">
          Donation
        </h2>

        {user && (
          <div className="mb-6 p-4 bg-maple-gold/10 border border-maple-gold/30 rounded-lg">
            <div className="text-center">
              <div className="text-3xl font-bold text-maple-gold mb-2">
                {user.nx || 0} NX
              </div>
              <div className="text-sm text-white/70">
                Current NX Credits
              </div>
            </div>
          </div>
        )}

        {!user && (
          <div className="mb-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
            <div className="text-center">
              <p className="text-sm text-white/70 mb-3">
                Please <Link to="/login" className="text-maple-gold hover:text-yellow-400 transition-colors">login</Link> to view your NX credits
              </p>
            </div>
          </div>
        )}

        <div className="space-y-4">
          <div className="p-4 bg-white/5 rounded-lg border border-white/10">
            <h3 className="text-lg font-semibold text-maple-gold mb-2">
              Support the Server
            </h3>
            <p className="text-sm text-white/70 mb-4">
              Donations help keep the server running and support future updates. 
              All donations are greatly appreciated!
            </p>
            <p className="text-xs text-white/50">
              Donation system will be implemented soon. Please check back later.
            </p>
          </div>

          <div className="p-4 bg-white/5 rounded-lg border border-white/10">
            <h3 className="text-lg font-semibold text-maple-gold mb-2">
              What are NX Credits?
            </h3>
            <p className="text-sm text-white/70">
              NX Credits are the premium currency used in the Cash Shop to purchase 
              items, cosmetics, and other premium features.
            </p>
          </div>
        </div>

        <button
          onClick={() => navigate('/')}
          className="mt-6 w-full btn-secondary py-2 text-sm"
        >
          Back to Home
        </button>
      </div>
    </div>
  )
}

export default Donation
