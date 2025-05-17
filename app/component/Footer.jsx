import React from 'react'
const Footer = () => {
    return (
      <footer className="bg-[#0a0a0a] border-t border-[#1f1f1f] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center space-x-6 mb-4">
            <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">Terms</a>
            <a href="#" className="text-gray-400 hover:text-pink-400 transition-colors">Privacy</a>
            <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors">Contact</a>
          </div>
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Lumina Wallpapers. All rights reserved.
          </p>
        </div>
      </footer>
    );
  };
export default Footer
