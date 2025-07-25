import React, { use } from 'react'
import { Outlet } from 'react-router'
import Navbar from '../component/Navbar'

import { ThemeContext } from '../Context/Theme'
import Footer from '../component/Footer'


const MainLayout = () => {
  const {theme} = use(ThemeContext)
  return (
    <div className='bg-blue-200 dark:bg-gray-800 w-full min-h-screen' data-theme={theme || 'light'}>
       
       <Navbar></Navbar>
       <Outlet></Outlet>
       <Footer></Footer>
        
    </div>
  )
}

export default MainLayout
