import React from 'react'
import { Link } from 'gatsby'

const Header: React.FC = () => (
  <header className="bg-white h-20 py-5 border-b sticky top-0">
    <div className="max-w-5xl mx-auto px-6">
      <div className="w-full flex justify-between  items-center">
        <div className="flex flex-col sm:flex-row items-center">
          <img
            src="/react-bricks-logo.svg"
            className="w-48"
            alt="React Bricks"
          />
          <div className="ml-8 flex space-x-5 text-center">
            <Link to="/" className="text-gray-500 hover:text-pink-700">
              Home
            </Link>
            <Link to="/about" className="text-gray-500 hover:text-pink-700">
              About us
            </Link>
          </div>
        </div>
        <Link
          to="/admin"
          className="py-2 px-5 rounded text-white font-medium bg-blue-500 hover:bg-blue-600 hover:shadow-lg transition duration-200"
        >
          Edit content
        </Link>
      </div>
    </div>
  </header>
)

export default Header
