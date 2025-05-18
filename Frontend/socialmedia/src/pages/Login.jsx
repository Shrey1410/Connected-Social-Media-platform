import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useState , useContext, useEffect} from 'react'
import axios from 'axios'
import { UserDataContext } from '../context/UserContext'
import { Link } from 'react-router-dom'
const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const {user, setUser} = useContext(UserDataContext)
  const navigate = useNavigate()

  useEffect(()=>{
    if(user){
      navigate('/home')
    }
  }, [user])

  const handleonSubmit = async (e)=>{
    e.preventDefault()
    const data = {
      username : username,
      password : password,
    }
    try{
      const res = await axios.post('http://localhost:8000/login', data, {
        withCredentials: true,
      })
      console.log(res)
      if(res.data.user){
        setUser(res.data.user)
        navigate('/home')
      }
    }
    catch(err){
      console.log(err)
    }
  }

  return (
    <div className='flex h-screen'>
        {/* Login Form */}
        <div className='flex justify-start px-5 py-4'>
          <p className='text-2xl font-semibold text-blue-800'>Connected</p>
        </div>
        <div className='w-2/3 flex flex-col m-5 items-center px-40'>
        <p className='text-3xl font-sans font-semibold p-2'>Login to your Account</p>
        <p className='text-xs font-sans p-1'>To continue, fill out personal info</p>
        <form action="" className='flex flex-col w-full'>
            <div className='w-full py-2'>
                <p className='text-xs font-sans p-1'>Username</p>
                <input type="text" className='py-2 px-3 border-1 border-gray-300 rounded-2xl w-full focus:outline-none' onChange={(e)=>{
                  e.preventDefault()
                  setUsername(e.target.value)
                }}/>
            </div>
            <div className='w-full py-2'>
                <p className='text-xs font-sans p-1'>Password</p>
                <input type="password" className='py-2 px-3 border-1 border-gray-300 rounded-2xl w-full focus:outline-none' onChange={(e)=>{
                  e.preventDefault()
                  setPassword(e.target.value)
                }}/>
            </div>
            <div className='w-full py-4'>
                <button className='py-2 px-4 bg-blue-800 text-white rounded-2xl w-full hover:bg-blue-900' onClick={handleonSubmit}>Login</button>
            </div>
        </form>
        <div>
          <Link className='text-sm text-gray-400 underline hover:text-gray-500' to='/signup'>Don't have account? Click to signup</Link>
        </div>
      </div>
        {/* Image */}
      <div className='w-1/3 h-full'>
        <img className='h-full w-full' src="https://images.stockcake.com/public/b/6/c/b6cd7869-0e5e-428a-b5d8-930c98a62742_large/social-media-interaction-stockcake.jpg" alt="" />
      </div>
    </div>
  )
}

export default Login
