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
import { FaUserFriends, FaUserClock, FaUserPlus, FaUserCheck, FaSignOutAlt } from 'react-icons/fa'
import REACT_APP_BASE_URL from '../config'
import { toast } from 'react-toastify'
import axios from 'axios'
import { SocketDataContext } from '../context/SocketContext'
const Home = () => {
  const { user , setUser} = useContext(UserDataContext)
  const { socket } = useContext(SocketDataContext)
  const navigate = useNavigate()
  useEffect(()=>{
    if(!user) navigate('/')
  },[user])
  const [userList, setUserList] = useState(false)
  const [listType, setListType] = useState('')
  const onhandlelogout = async (e) => {
      e.preventDefault()
      try{
        const res = await axios.get(`${REACT_APP_BASE_URL}/logout`,
          { withCredentials: true }
        )
        toast.success(res.data.message)
        socket.emit('leave', {user : user.id})
        setUser(null)
        navigate('/')
      }
      catch(err){
        console.log(err)
        toast.error(err.response.data.message)
  
      }
    }
  return (
    <div className='overflow-hidden h-screen flex flex-col'>
      <Navbar/>
{/* Top Action Bar (Mobile) */}
<div className='flex justify-between items-center px-4 py-3 bg-white shadow sticky top-0 z-10 md:hidden'>
  <div className='flex gap-3'>
    <button
      title='Friends'
      onClick={(e) =>{
        e.preventDefault()
        setUserList(!userList)
        setListType('friends')
      }}
      className={`p-4 rounded-full transition ${
        listType === 'friends' && userList ? 'bg-blue-700 text-white' : 'bg-blue-100 text-blue-700 hover:bg-blue-300'
      }`}
    >
      <FaUserFriends size={18} />
    </button>
    <button
      title='Pending Requests'
      onClick={(e) => {
        e.preventDefault()
        setUserList(!userList)
        setListType('pending')}}
      className={`p-4 rounded-full transition ${
        listType === 'pending' && userList ? 'bg-blue-700 text-white' : 'bg-blue-100 text-blue-700 hover:bg-blue-300'
      }`}
    >
      <FaUserClock size={18} />
    </button>
    <button
      title='Friend Requests'
      onClick={(e) => {
        e.preventDefault()
        setUserList(!userList)
        setListType('friendrequests')}}
      className={`p-4 rounded-full transition ${
        listType === 'friendrequests' && userList ? 'bg-blue-700 text-white' : 'bg-blue-100 text-blue-700 hover:bg-blue-300'
      }`}
    >
      <FaUserPlus size={18} />
    </button>
    <button
      title='Friend Suggestions'
      onClick={(e) => {
        e.preventDefault()
        setUserList(!userList)
        setListType('friendsuggestions')}}
      className={`p-4 rounded-full transition ${
        listType === 'friendsuggestions' && userList ? 'bg-blue-700 text-white' : 'bg-blue-100 text-blue-700 hover:bg-blue-300'
      }`}
    >
      <FaUserCheck size={18} />
    </button>
    <button
      title='Logout'
      onClick={onhandlelogout}
      className='p-4 bg-red-100 text-red-700 hover:bg-red-300 rounded-full transition'
    >
      <FaSignOutAlt size={18} />
    </button>
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