import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Login from './pages/Login'
import Register from './pages/Register'
import Downloads from './pages/Downloads'
import Home from './pages/Home'
import ChangePassword from './pages/ChangePassword'
import Donation from './pages/Donation'
import { checkAuth } from './services/auth'

function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkAuth()
      .then(userData => {
        setUser(userData)
        setLoading(false)
      })
      .catch(() => {
        setUser(null)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl">Loading...</div>
      </div>
    )
  }

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar user={user} setUser={setUser} />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route 
              path="/login" 
              element={user ? <Navigate to="/" /> : <Login setUser={setUser} />} 
            />
            <Route 
              path="/register" 
              element={user ? <Navigate to="/" /> : <Register />} 
            />
            <Route 
              path="/change-password" 
              element={user ? <ChangePassword /> : <Navigate to="/login" />} 
            />
            <Route path="/donation" element={<Donation />} />
            <Route path="/downloads" element={<Downloads />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
