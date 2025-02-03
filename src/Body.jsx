import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from './components/NavBar'
import Footer from './components/Footer'

const Body = () => {
  return (
    <>
      <NavBar />
      <div className='max-w-[1400px] mx-auto'>
        <Outlet />
      </div>
      <Footer />
    </>
  )
}

export default Body