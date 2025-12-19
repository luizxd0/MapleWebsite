import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className="container mx-auto px-4 py-6 flex flex-col justify-center min-h-[calc(100vh-200px)]">
      {/* Hero Section - Compact */}
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-maple-gold to-maple-red bg-clip-text text-transparent">
          Welcome to MapleStory v83
        </h1>
        <p className="text-lg text-white/80 mb-6">
          Experience the classic MapleStory adventure
        </p>
        <div className="flex gap-4 justify-center mb-8">
          <Link to="/register" className="btn-primary px-6 py-2">
            Get Started
          </Link>
          <Link to="/downloads" className="btn-secondary px-6 py-2">
            Download Client
          </Link>
        </div>
      </div>

      {/* Features Grid - Compact */}
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <div className="card text-center p-4">
          <div className="text-3xl mb-2">🎮</div>
          <h3 className="text-lg font-bold mb-1 text-maple-gold">Classic Experience</h3>
          <p className="text-sm text-white/70">
            Relive the nostalgia of MapleStory v83
          </p>
        </div>

        <div className="card text-center p-4">
          <div className="text-3xl mb-2">⚡</div>
          <h3 className="text-lg font-bold mb-1 text-maple-gold">Fast & Stable</h3>
          <p className="text-sm text-white/70">
            Optimized server infrastructure
          </p>
        </div>

        <div className="card text-center p-4">
          <div className="text-3xl mb-2">👥</div>
          <h3 className="text-lg font-bold mb-1 text-maple-gold">Active Community</h3>
          <p className="text-sm text-white/70">
            Join thousands of players
          </p>
        </div>
      </div>

      {/* Server Features - Compact Single Row */}
      <div className="card max-w-4xl mx-auto p-4">
        <h2 className="text-xl font-bold mb-3 text-center text-maple-gold">
          Server Features
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
          <div>
            <h4 className="text-sm font-semibold mb-1 text-maple-red">✓ Classic v83</h4>
            <p className="text-xs text-white/70">Authentic gameplay</p>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-1 text-maple-red">✓ All Jobs</h4>
            <p className="text-xs text-white/70">Warrior, Mage, Bowman, Thief</p>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-1 text-maple-red">✓ Boss Raids</h4>
            <p className="text-xs text-white/70">Zakum, Horntail & more</p>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-1 text-maple-red">✓ Free Market</h4>
            <p className="text-xs text-white/70">Trade with players</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
