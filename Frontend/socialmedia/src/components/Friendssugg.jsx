import React from 'react'
import axios from 'axios'
import { UserDataContext } from '../context/UserContext';
import { useContext } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import REACT_APP_BASE_URL from '../config'
const Friendssugg = (props) => {
  const {user, setUser} = useContext(UserDataContext)
  let apiCalled = false;
  const throttle = (fn, time) =>{
    if(apiCalled) return;
    apiCalled = true;
    setTimeout(()=>{
      fn()
      apiCalled=false;
    }, time);
}
  const handleonrequest = async () => {
    try {
        // Pass the friend_id as a URL parameter
        const friendId = props.friend._id;
        const res = await axios.post(
            `${REACT_APP_BASE_URL}/friends/request/${friendId}`,
            {},  // Pass an empty object for the body if not required
            {
              withCredentials: true,
            }
        );
        setUser(res.data.user);
        toast.success(res.data.message);
    } catch (err) {
        console.error("Error sending friend request:", err);
        toast.error(err.response.data.message);
    }
  };
  return (
    <div className='flex items-center py-1 justify-between'>
      <div className='flex items-center'>
      <img className='rounded-full w-8 h-8' src={props.friend.profile_image ||
        "https://static.thenounproject.com/png/3874124-200.png"
      } alt="User Profile"/>
        <Link className='px-3 text-sm' to='/userprofile' state={{user : props.friend}}>{props.friend.fullname}</Link>
      {props.friend.Online && <span className="w-2 h-2 bg-green-500 rounded-full inline-block"></span>}
      </div>
      <div>
      <button className='p-2 bg-blue-500 text-sm font-semibold text-white rounded-2xl hover:bg-blue-800' onClick={(e)=>{
        e.preventDefault()
        throttle(handleonrequest, 3000)}}>Request</button>
      </div>
    </div>
  )
}

export default Friendssugg
