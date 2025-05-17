import React from 'react'
const Navbar = () => {
  return (
    <nav className="bg-[#0a0a0a] border-b border-[#1f1f1f] py-5 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center">
          <h1 className="text-center text-3xl font-bold bg-gradient-to-r from-purple-500 via-pink-500 to-amber-500 bg-clip-text text-transparent">
            LUMINA WALLPAPERS
          </h1>
          <span className="ml-3 px-2 py-1 text-xs font-mono bg-[#1a1a1a] text-amber-400 rounded-md border border-[#2a2a2a]">
            PREMIUM
          </span>
        </div>
        <div className="mt-3 flex justify-center space-x-6">
          <a href="#" className="text-[#e2e2e2] hover:text-purple-400 font-medium text-sm transition-colors">Featured</a>
          <a href="#" className="text-[#e2e2e2] hover:text-pink-400 font-medium text-sm transition-colors">4K Collection</a>
          <a href="#" className="text-[#e2e2e2] hover:text-amber-400 font-medium text-sm transition-colors">Video Walls</a>
          <a href="#" className="text-[#e2e2e2] hover:text-white font-medium text-sm transition-colors">Categories</a>
        </div>
      </div>
    </nav>
  )
}
export default Navbar