import React from 'react'
import axios from 'axios'
const Friendssugg = (props) => {
  const handleonrequest = async (e) => {
    e.preventDefault();
    try {
        // Pass the friend_id as a URL parameter
        const friendId = props.friend._id;
        const res = await axios.post(
            `http://localhost:8000/friends/request/${friendId}`,
            {},  // Pass an empty object for the body if not required
            {
                withCredentials: true,
            }
        );
        console.log(res.data);
    } catch (err) {
        console.error("Error sending friend request:", err);
    }
  };
  return (
    <div className='flex items-center py-1 justify-between'>
      <div className='flex items-center'>
      <img className='rounded-full w-8 h-8' src={props.friend.profile_image ||
        "https://static.thenounproject.com/png/3874124-200.png"
      } alt="User Profile"/>
        <p className='px-3 text-sm'>{props.friend.fullname}</p>
      </div>
      <div>
      <button className='p-2 bg-blue-800 text-sm text-white rounded-2xl' onClick={handleonrequest}>Request</button>
      </div>
    </div>
  )
}

export default Friendssugg
