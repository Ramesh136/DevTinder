import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import { useDispatch, useSelector } from 'react-redux'
import { BASE_URL } from './utils/constants'
import axios from 'axios'
import { addUser } from './utils/userSlice'
import './app.css'


const Body = () => {

  const user = useSelector((store)=>store.user);

  const dispath = useDispatch();
  const naviagte = useNavigate();

  
  const fetchUser = async ()=>{
    try{
      const response = await axios.get(BASE_URL+'/profile/view',{ withCredentials:true})
      dispath(addUser(response.data));
    }
    catch(err){
      naviagte("/login");
      console.error(err?.response?.data)
    }
  }
  useEffect(()=>{
    fetchUser()
  },[])

  return (
    <>
      <NavBar />
      <main className='body-content max-w-[1400px] mx-auto'>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default Body