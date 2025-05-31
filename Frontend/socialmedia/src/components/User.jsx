import React, { useContext, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { UserDataContext } from '../context/UserContext'
import { toast } from 'react-toastify'
import REACT_APP_BASE_URL from '../config'

const User = (props) => {
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
  const handleAccept = async () => {
      try{
      const response = await axios.post(`${REACT_APP_BASE_URL}/friends/accept/${props.friend?.user_id?._id || props.friend?._id}`, {}, {
        withCredentials: true,
      });
      console.log(response.data)
      setUser(response.data.user)
      toast.success(response.data.message)
    }
    catch(err){
      console.log(err)
      toast.error(err.response.data.message)
    }
    }
    const handleonrequest = async () => {
        try {
            // Pass the friend_id as a URL parameter
            const friendId = props.friend?.user_id?._id || props.friend?._id;
            const res = await axios.post(
                `${REACT_APP_BASE_URL}/friends/request/${friendId}`,
                {},  // Pass an empty object for the body if not required
                {
                  withCredentials: true,
                }
            );
            console.log(res.data)
            setUser(res.data.user);
            toast.success(res.data.message);
        } catch (err) {
            console.error("Error sending friend request:", err);
            toast.error(err.response.data.message);
        }
      };
  return (
    <div>
      <div className='flex items-center py-1 justify-between'>
      <div className='flex items-center'>
      <img className='rounded-full w-10 h-10' src={props.friend?.user_id?.profile_image|| props.friend?.profile_image ||"https://static.thenounproject.com/png/3874124-200.png"}
      alt="User Profile"/>
      <Link
      className='px-3 text-lg'
      to="/userprofile"
      state={{ user: props.friend?.user_id || props.friend }}
    >
    {props.friend?.user_id?.fullname || props.friend?.fullname}
    </Link>
    
      {props.friend.user_id?.Online && <span className="w-2 h-2 ml-2 bg-green-500 rounded-full inline-block"></span>}

      </div>
      <div>
      {props.listType==='friendsuggestions' ?(<button className='p-2 bg-blue-500 hover:bg-blue-800 text-lg text-white rounded-2xl' onClick={(e)=>{
        e.preventDefault()
throttle(handleonrequest, 3000)}}>Request</button>) :(props.listType==='friendrequests'? (<button className='p-2 bg-blue-500 hover:bg-blue-800 text-lg text-white rounded-2xl' onClick={(e)=>{
  e.preventDefault()
  throttle(handleAccept, 3000)}}>Accept</button>):(<></>))}
      </div>
    </div>
    </div>
  )
}

export default User