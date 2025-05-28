import React, { useContext } from 'react'
import axios from 'axios'
import { UserDataContext } from '../context/UserContext'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'

const Friendrequests = (props) => {
  const {user, setUser} = useContext(UserDataContext)
  const handleAccept = async () => {
    try{
    const response = await axios.post(`http://localhost:8000/friends/accept/${props.friend.user_id._id}`, {}, {
      withCredentials: true,
    });
    toast.success(response.data.message)
    setUser(response.data.user)
  }
  catch(err){
    console.log(err)
    toast.error(err.response.data.message)
  }
  }
  
  return (
    <div className='flex items-center py-1 justify-between'>
      <div className='flex items-center'>
        <img className='rounded-full w-8 h-8' src={props.friend.user_id.profile_image || "https://static.thenounproject.com/png/3874124-200.png"}/>
        <Link className='px-3 text-sm' to='/userprofile' state={{ user: props.friend.user_id }}>{props.friend.user_id.fullname}</Link>
        {props.friend.user_id?.Online && <span className="w-2 h-2 bg-green-500 rounded-full inline-block"></span>}
      </div>
      <div>
      <button className='p-2 bg-blue-500 text-sm font-semibold text-white rounded-2xl hover:bg-blue-800' onClick={handleAccept}>Accept</button>
      </div>
    </div>
  )
}

export default Friendrequests
