import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import LeftsideBar from '../components/LeftsideBar'
import MainContent from '../components/MainContent'
import RightSideBar from '../components/RightSideBar'
import { useContext } from 'react'
import { UserDataContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const { user } = useContext(UserDataContext)
  const navigate = useNavigate()
  useEffect(()=>{
    if(!user) navigate('/')
  },[user])
  return (
    <div className='overflow-hidden h-screen flex flex-col'>
      <Navbar/>
      <div>
        <div className='h-[1px] bg-gray-100 rounded-4xl'></div>
      </div>
      <div className='flex justify-between overflow-hidden'>
        <div className='w-1/4 items-start'>
          <LeftsideBar/>
        </div>
        <div className='w-full md:w-2/4 overflow-y-auto'>
          <MainContent/>
        </div>
        <div className='w-1/4'>
          <RightSideBar/>
        </div>
      </div>
    </div>
  )
}

export default Home
