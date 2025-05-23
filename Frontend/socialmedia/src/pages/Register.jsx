import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import { useContext } from 'react'
import { UserDataContext } from '../context/UserContext'
import { useEffect } from 'react'
const Register = () => {
  const [fullName, setFullName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const navigate = useNavigate()
  const {user, setUser} = useContext(UserDataContext)
  useEffect(()=>{
      if(user){
        navigate('/home')
      }
    }, [user])
  const handleonSubmit = async (e)=>{
    e.preventDefault()
    if(password!== confirmPassword){
      alert("Password and Confirm Password do not match")
      return
    }
    const data = {
      fullname : fullName,
      username : username,
      email : email,
      password : password,
    }
    try{
      const res = await axios.post('http://localhost:8000/signup', data, {
        withCredentials: true,
      })
      navigate('/home')
      setUser(res.data.user)
      console.log(res)
    }
    catch(err){
      console.log(err)
    }
  }

  return (
    <div className='flex h-screen'>
        {/* Register Form */}
        <div className='flex justify-start px-5 py-4'>
          <p className='text-2xl font-semibold text-blue-800'>Connected</p>
        </div>
      <div className='w-2/3 flex flex-col items-center px-40 m-5'>      
        <p className='text-3xl font-sans font-semibold p-1'>Create an account</p>
        <p className='text-xs font-sans p-1'>To continue, fill out personal info</p>
        <form action="" className='flex flex-col w-full'>
            <div className='w-full py-1'>
                <p className='text-xs font-sans p-1'>Full Name</p>
                <input type="text" className='py-2 px-3 border-1 border-gray-300 rounded-2xl w-full focus:outline-none' onChange={(e)=>{
                  e.preventDefault()
                  setFullName(e.target.value)
                }}/>
            </div>
            <div className='w-full py-1'>
                <p className='text-xs font-sans p-1'>Username</p>
                <input type="text" className='py-2 px-3 border-1 border-gray-300 rounded-2xl w-full focus:outline-none' onChange={(e)=>{
                  e.preventDefault()
                  setUsername(e.target.value)
                }}/>
            </div>
            <div className='w-full py-1'>
                <p className='text-xs font-sans p-1'>E-mail</p>
                <input type="email" className='py-2 px-3 border-1 border-gray-300 rounded-2xl w-full focus:outline-none' onChange={(e)=>{
                  e.preventDefault()
                  setEmail(e.target.value)
                }}/>
            </div>
            <div className='w-full py-1'>
                <p className='text-xs font-sans p-1'>Password</p>
                <input type="password" className='py-2 px-3 border-1 border-gray-300 rounded-2xl w-full focus:outline-none' onChange={(e)=>{
                  e.preventDefault()
                  setPassword(e.target.value)
                }}/>
            </div>
            <div className='w-full py-1'>
                <p className='text-xs font-sans p-1'>Repeat Password</p>
                <input type="password" className='py-2 px-3 border-1 border-gray-300 rounded-2xl w-full focus:outline-none'
                onChange={(e)=>{
                  e.preventDefault()
                  setConfirmPassword(e.target.value)
                }}/>
            </div>
            <div className='w-full py-2'>
                <button className='py-2 px-4 bg-blue-800 text-white rounded-2xl w-full hover:bg-blue-900' onClick={handleonSubmit}>Sign up</button>
            </div>
        </form>
        <div>
          <Link className='text-sm text-gray-400 underline hover:text-gray-500' to='/'>Sign in</Link>
        </div>
      </div>
        {/* Image */}
      <div className='w-1/3 h-full'>
        <img className='h-full w-full' src="https://images.stockcake.com/public/b/6/c/b6cd7869-0e5e-428a-b5d8-930c98a62742_large/social-media-interaction-stockcake.jpg" alt="" />
      </div>
    </div>
  )
}

export default Register