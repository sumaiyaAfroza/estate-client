import React, { use } from 'react'
import { Outlet } from 'react-router'
import Navbar from '../component/Navbar'
import { ThemeContext } from '../Context/Theme'
import Footer from '../component/Footer'

const MainLayout = () => {
  const { theme } = use(ThemeContext)
  return (
    <div className='bg-white dark:bg-gray-800 w-full min-h-screen' data-theme={theme || 'light'}>
      {/* Skip Navigation Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-emerald-600 focus:text-white focus:rounded-lg focus:outline-none"
      >
        Skip to main content
      </a>

      <header role="banner">
        <Navbar />
      </header>

      <main id="main-content" role="main" aria-label="Main content">
        <Outlet />
      </main>

      <footer role="contentinfo">
        <Footer />
      </footer>
    </div>
  )
}

export default MainLayout
