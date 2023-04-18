import React, { ReactNode } from 'react'
import { useReactBricksContext } from 'react-bricks/frontend'

interface LayoutProps {
  children?: ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isDarkColorMode } = useReactBricksContext()
  return (
    <div
      className={`${
        isDarkColorMode ? 'dark' : 'light'
      } flex flex-col h-screen justify-between font-content antialiased`}
    >
      <main className="mb-auto dark:bg-gray-900">{children}</main>
    </div>
  )
}

export default Layout
