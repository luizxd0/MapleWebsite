function Footer() {
  return (
    <footer className="bg-maple-dark/80 backdrop-blur-md border-t border-white/10 mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-white/70 text-sm">
            © {new Date().getFullYear()} MapleStory v28 Private Server. All rights reserved.
          </div>
          <div className="text-white/50 text-xs">
            Website developed by <span className="text-maple-gold font-semibold">Lulubot</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
