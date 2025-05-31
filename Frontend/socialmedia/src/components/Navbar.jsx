import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { UserDataContext } from '../context/UserContext'
import axios from 'axios'
import REACT_APP_BASE_URL from '../config'
import Dropdownmenu from './Dropdownmenu'
import { Link } from 'react-router-dom'
const Navbar = () => {
const { user } = useContext(UserDataContext)
const [search, setSearch] = useState('')
const [showdropdown, setShowDropdown] = useState(false)
const [searchResults, setSearchResults] = useState([])
useEffect(()=>{
  const fetchsearchresults = async ()=>{
    try{
    const res = await axios.get(`${REACT_APP_BASE_URL}/search/friend/${search}`, {
      withCredentials: true
    }) 
    console.log(res)
    setSearchResults(res.data.results)
  }
  catch(err){
    console.log(err)
    toast.error(err.response.data.message)
  }
  }
  const timer = setTimeout(()=>{
    if(search.trim()!='') fetchsearchresults()
  },1000)

  return ()=>clearTimeout(timer)
},[search])
  return (
  <div className='m-3 flex justify-between items-center '>
    {/* Logo */}
    <div className='flex items-center'>
      <p className='text-blue-500 font-semibold text-2xl font-sans'>Connected</p>
    </div>
    {/* Search Bar */}
    <div className='flex items-center relative'>
      <input className='rounded-2xl outline-none bg-gray-100 py-2 px-4 w-50 md:w-150' type="text" placeholder='Search Friends Here...' onChange={(e)=>{
        e.preventDefault()
        setSearch(e.target.value)
        setShowDropdown(true)
        if(e.target.value.trim()==''){
          setShowDropdown(false)
        }
      }}/>
      {
        showdropdown && <Dropdownmenu searchResults={searchResults}/>
      } 
    </div>
    {/* User Profile */}
    <Link to='/profile' className='flex items-center'>
      <p className='hidden md:block px-3 font-sans font-semibold'>{user?.fullname}</p>
      <img className='rounded-full w-10 h-10' src={user?.profile_image || "https://static.thenounproject.com/png/3874124-200.png"} alt="User Profile" />
    </Link>
  </div>
)
}

export default Navbar