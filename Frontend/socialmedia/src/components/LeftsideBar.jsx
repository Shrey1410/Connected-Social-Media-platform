import React, { useContext } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { UserDataContext } from '../context/UserContext'
import { toast } from 'react-toastify'
import { SocketDataContext } from '../context/SocketContext'
const LeftsideBar = (props) => {
  const navigate = useNavigate()
  const {socket} = useContext(SocketDataContext)
  const { user, setUser } = useContext(UserDataContext)
  const onhandlelogout = async (e) => {
    e.preventDefault()
    try{
      const res = await axios.get('http://localhost:8000/logout',
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
    <div className='m-4 flex flex-col justify-between'>
    <div className='flex flex-col items-start'>
    {/* Section1 */}
      <div className='flex flex-col items-start py-3'>
      <p className='font-semibold text-lg font-sans'>Explore</p>
        {/* Profile */}
        <div className='inline-flex items-center space-x-1 py-2'>
          <img className='rounded-full w-5 h-5' src={user?.profile_image ||"https://static.thenounproject.com/png/3874124-200.png"} alt="User Profile" />
            <Link className='px-1 font-sans font-semibold hover:text-blue-500' to='/profile'>Profile</Link>
        </div>
      </div>
      <div className='h-[1px] bg-gray-200 w-full my-2'></div>
      {/* Section2 */}
      <div className='py-3 flex flex-col items-start'>
        <p className='font-semibold text-lg font-sans'>Favourites</p>
        {/* Friends */}
        <div className='inline-flex items-center space-x-1 py-2'>
            <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 21.7925V15.7925C16 14.8625 16 14.3975 15.8978 14.016C15.6204 12.9807 14.8117 12.1721 13.7765 11.8947C13.395 11.7925 12.93 11.7925 12 11.7925C11.07 11.7925 10.605 11.7925 10.2235 11.8947C9.18827 12.1721 8.37962 12.9807 8.10222 14.016C8 14.3975 8 14.8625 8 15.7925V21.7925M16 21.7925H8M16 21.7925H20.25C20.9522 21.7925 21.3033 21.7925 21.5556 21.624C21.6648 21.551 21.7585 21.4572 21.8315 21.3481C22 21.0958 22 20.7447 22 20.0425V18.3925C22 17.8351 22 17.5564 21.9631 17.3232C21.7598 16.0395 20.753 15.0327 19.4693 14.8294C19.2361 14.7925 18.9574 14.7925 18.4 14.7925C18.0284 14.7925 17.8426 14.7925 17.6871 14.8171C16.8313 14.9526 16.1602 15.6238 16.0246 16.4796C16 16.6351 16 16.8209 16 17.1925V21.7925ZM8 21.7925V17.1925C8 16.8209 8 16.6351 7.97538 16.4796C7.83983 15.6238 7.16865 14.9526 6.31287 14.8171C6.1574 14.7925 5.9716 14.7925 5.6 14.7925C5.0426 14.7925 4.76389 14.7925 4.5307 14.8294C3.24702 15.0327 2.24025 16.0395 2.03693 17.3232C2 17.5564 2 17.8351 2 18.3925V20.0425C2 20.7447 2 21.0958 2.16853 21.3481C2.24149 21.4572 2.33524 21.551 2.44443 21.624C2.69665 21.7925 3.04777 21.7925 3.75 21.7925H8ZM15 6.79248C15 8.44933 13.6569 9.79248 12 9.79248C10.3431 9.79248 9 8.44933 9 6.79248C9 5.13563 10.3431 3.79248 12 3.79248C13.6569 3.79248 15 5.13563 15 6.79248ZM7 10.7925C7 11.8971 6.10457 12.7925 5 12.7925C3.89543 12.7925 3 11.8971 3 10.7925C3 9.68791 3.89543 8.79248 5 8.79248C6.10457 8.79248 7 9.68791 7 10.7925ZM21 10.7925C21 11.8971 20.1046 12.7925 19 12.7925C17.8954 12.7925 17 11.8971 17 10.7925C17 9.68791 17.8954 8.79248 19 8.79248C20.1046 8.79248 21 9.68791 21 10.7925Z" stroke="black" strokeWidth="null" className="my-path"></path>
            </svg>
            <button className='font-semibold font-sans px-1 hover:text-blue-500' onClick={(e)=>{
              e.preventDefault();
              props.setUserList(!props.userList)
              props.setListType('friends')
            }}>Friends</button>
        </div>
        {/* Messages */}
        <div className='inline-flex items-center space-x-1 py-2'>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.5 3H10.5C7.21252 3 5.56878 3 4.46243 3.90796C4.25989 4.07418 4.07418 4.25989 3.90796 4.46243C3 5.56878 3 7.21252 3 10.5V14.6667C3 16.5076 4.49238 18 6.33333 18H6.5C7.32843 18 8 18.6716 8 19.5C8 20.118 8.70557 20.4708 9.2 20.1L11 18.75C11.4623 18.4033 11.6934 18.23 11.9584 18.1296C12.0086 18.1106 12.0595 18.0936 12.111 18.0787C12.3833 18 12.6722 18 13.25 18H13.5C16.7875 18 18.4312 18 19.5376 17.092C19.7401 16.9258 19.9258 16.7401 20.092 16.5376C21 15.4312 21 13.7875 21 10.5C21 7.21252 21 5.56878 20.092 4.46243C19.9258 4.25989 19.7401 4.07418 19.5376 3.90796C18.4312 3 16.7875 3 13.5 3Z" stroke="black" strokeWidth="null" className="my-path"></path>
            <path d="M7 8H17" stroke="black" strokeWidth="null" strokeLinecap="round" className="my-path"></path>
            <path d="M7 12H12" stroke="black" strokeWidth="null" strokeLinecap="round" className="my-path"></path>
            </svg>
            <button className='font-semibold font-sans px-1 hover:text-blue-500' onClick={(e)=>{
              e.preventDefault();
              props.setUserList(!props.userList)
              props.setListType('pending')
            }}>Pending Requests</button>
        </div>
      </div>
    </div>
      {/* Section 3 LogOut */}
      <div className='h-[1px] bg-gray-200'></div>
      <div className='my-3'>
        <button onClick={onhandlelogout} className='p-2 bg-blue-500 text-white font-semibold hover:bg-blue-800 rounded-2xl'>Logout</button>
      </div>
    </div>
  )
}

export default LeftsideBar