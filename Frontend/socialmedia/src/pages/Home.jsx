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
      <div className='flex justify-between items-center px-4 py-2 bg-white shadow-md'>
        <div className='flex space-x-4 md:hidden'>
          <button onClick={(e) =>{
          e.preventDefault(); 
          setListType('friends');
          setUserList(!userList)}} className='px-2 py-1 bg-blue-500 text-sm hover:bg-blue-800 text-white rounded-2xl'>Friends</button>
          <button onClick={(e) =>{
          e.preventDefault();
          setUserList(!userList)
          setListType('pending')}} className='px-2 py-1 bg-blue-500 text-sm hover:bg-blue-800 text-white rounded-2xl'>Pending Request</button>
          <button onClick={(e) =>{
          e.preventDefault();
           setUserList(!userList)
          setListType('friendrequests')}} className='px-2 py-1 bg-blue-500 text-sm hover:bg-blue-800 text-white rounded-2xl'>Friend Request</button>
          <button onClick={(e) =>{
          e.preventDefault();
           setUserList(!userList)
          setListType('friendsuggestions')}} to='/' className='px-2 py-1 hover:bg-blue-800 bg-blue-500 text-sm text-white rounded-2xl'>Friend Suggestions</button>
        </div>
      </div>
      <div>
        <div className='h-[1px] bg-gray-100 rounded-4xl'></div>
      </div>
      <div className='flex justify-between overflow-hidden'>
        <div className='hidden md:block w-1/4 items-start'>
          <LeftsideBar setUserList={setUserList} userList={userList} listType={listType} setListType={setListType}/>
        </div>
        <div className='w-full md:w-2/4 overflow-y-auto'>
          {userList ? (<><UserList listType={listType}/></>) : (<><MainContent/></>)}
        </div>
        <div className='hidden md:block w-1/4'>
          <RightSideBar setUserList={setUserList} userList={userList} listType={listType} setListType={setListType}/>
        </div>
      </div>
    </div>
  )
}

export default Home