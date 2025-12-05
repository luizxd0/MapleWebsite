import { useState, useEffect } from 'react'
import axios from 'axios'

function Downloads() {
  const [downloads, setDownloads] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDownloads = async () => {
      try {
        const response = await axios.get('/api/downloads')
        if (response.data.success) {
          setDownloads(response.data.downloads)
        }
      } catch (error) {
        console.error('Error fetching downloads:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchDownloads()
  }, [])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-6 text-center flex items-center justify-center min-h-[calc(100vh-200px)]">
        <div className="text-xl">Loading downloads...</div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-6 flex flex-col justify-center min-h-[calc(100vh-200px)]">
      <div className="text-center mb-6">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 text-maple-gold">
          Downloads
        </h1>
        <p className="text-sm text-white/80">
          Get everything you need to start playing
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-4 mb-6">
        {downloads.map((download) => (
          <div key={download.id} className="card hover:scale-105 transition-transform duration-200 p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="text-lg font-bold text-maple-gold mb-1">
                  {download.name}
                </h3>
                <p className="text-white/60 text-xs">
                  v{download.version} • {download.size}
                </p>
              </div>
              <div className="text-2xl ml-2">📦</div>
            </div>

            <p className="text-white/70 mb-3 text-sm min-h-[40px]">
              {download.description}
            </p>

            <div className="flex items-center justify-between">
              <span className="text-white/50 text-xs">
                {download.updatedAt}
              </span>
              <a
                href={download.downloadUrl}
                className="btn-primary text-xs px-4 py-1"
                onClick={(e) => {
                  e.preventDefault()
                  alert('Download link will be configured later')
                }}
              >
                Download
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className="card max-w-4xl mx-auto p-4">
        <h2 className="text-lg font-bold mb-4 text-center text-maple-gold">
          Installation Instructions
        </h2>
        <div className="space-y-3 text-sm text-white/80">
          <div className="flex items-start gap-3">
            <span className="text-maple-gold font-bold min-w-[24px]">1.</span>
            <p>Download the MapleStory v28 Client from the links above</p>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-maple-gold font-bold min-w-[24px]">2.</span>
            <p>Extract the downloaded files to your desired location</p>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-maple-gold font-bold min-w-[24px]">3.</span>
            <p>Run the launcher executable and log in with your account</p>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-maple-gold font-bold min-w-[24px]">4.</span>
            <p>Enjoy playing MapleStory v28!</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Downloads
