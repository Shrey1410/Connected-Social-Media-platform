import React from 'react'
import { useContext } from 'react'
import { UserDataContext } from '../context/UserContext'
const Navbar = () => {
const { user } = useContext(UserDataContext)
  return (
  <div className='m-3 flex justify-between items-center '>
    {/* Logo */}
    <div className='flex items-center'>
      <p className='text-blue-800 font-semibold text-2xl font-sans'>Connected</p>
    </div>
    {/* Search Bar */}
    <div className='flex items-center'>
      <input className='rounded-2xl bg-gray-100 py-2 px-4 w-50 md:w-150' type="text" placeholder='Type in search' />
    </div>
    {/* User Profile */}
    <div className='flex items-center'>
      <p className='hidden md:block px-3 font-sans font-semibold'>{user?.fullname}</p>
      <img className='rounded-full w-10 h-10' src={user?.profile_image || "https://i.pinimg.com/736x/58/51/2e/58512eb4e598b5ea4e2414e3c115bef9.jpg"} alt="User Profile" />
    </div>
  </div>
)
}

export default Navbar
