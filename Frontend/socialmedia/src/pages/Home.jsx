import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import LeftsideBar from '../components/LeftsideBar'
import MainContent from '../components/MainContent'
import RightSideBar from '../components/RightSideBar'
import { useContext } from 'react'
import { UserDataContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import UserList from '../components/UserList'
import { useState } from 'react'
const Home = () => {
  const { user } = useContext(UserDataContext)
  const navigate = useNavigate()
  useEffect(()=>{
    if(!user) navigate('/')
  },[user])
  const [userList, setUserList] = useState(false)
  const [listType, setListType] = useState('')
  return (
    <div className='overflow-hidden h-screen flex flex-col'>
      <Navbar/>
      <div>
        <div className='h-[1px] bg-gray-100 rounded-4xl'></div>
      </div>
      <div className='flex justify-between overflow-hidden'>
        <div className='w-1/4 items-start'>
          <LeftsideBar setUserList={setUserList} userList={userList} listType={listType} setListType={setListType}/>
        </div>
        <div className='w-full md:w-2/4 overflow-y-auto'>
          {userList ? (<><UserList listType={listType}/></>) : (<><MainContent/></>)}
        </div>
        <div className='w-1/4'>
          <RightSideBar setUserList={setUserList} userList={userList} listType={listType} setListType={setListType}/>
        </div>
      </div>
    </div>
  )
}

export default Home