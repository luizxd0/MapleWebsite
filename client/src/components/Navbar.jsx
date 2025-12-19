import { Link } from 'react-router-dom'
import AccountMenu from './AccountMenu'

function Navbar({ user, setUser }) {

  return (
    <nav className="bg-maple-dark/80 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-maple-gold hover:text-yellow-400 transition-colors">
            🍁 MapleStory v83
          </Link>
          
          <div className="flex items-center gap-6">
            <Link 
              to="/" 
              className="hover:text-maple-gold transition-colors"
            >
              Home
            </Link>
            <Link 
              to="/downloads" 
              className="hover:text-maple-gold transition-colors"
            >
              Downloads
            </Link>
            <Link 
              to="/donation"
              className="hover:text-maple-gold transition-colors"
            >
              Donation
            </Link>
            
            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-maple-gold">Welcome, {user.username}!</span>
                <AccountMenu user={user} setUser={setUser} />
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link to="/login" className="hover:text-maple-gold transition-colors">
                  Login
                </Link>
                <Link to="/register" className="btn-primary text-sm">
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
