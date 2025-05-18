import React from 'react'
import Friendssugg from './Friendssugg'
import Friendrequests from './Friendrequests'
import axios from 'axios'
import { useEffect, useState } from 'react'
const RightSideBar = () => {
  const [friends, setFriends] = useState([])
  const [friendrequest, setFriendrequest] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/friends/suggestions', {
          withCredentials: true,
        });
        console.log(response.data.data);
        const frequest = await axios.get('http://localhost:8000/friends/requests', {
          withCredentials: true,
        })
        setFriends(response.data.data);
        setFriendrequest(frequest.data.data.friend_request);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, [])

  return (
    <div className='m-4 '>
    {/* Friends Suggestions */}
      <div className='text-center'>
        <div className='flex flex-col'>
          <div>
            <p className='font-semibold text-lg'>Friend's Suggestions</p>
          </div>
          <div>
            {friends.map((friend) => (
              <Friendssugg key={friend._id} friend={friend} />
            ))}
          </div>
        </div>
      <div>
        <p className='text-sm text-gray-400 p-1'>Show more</p>
      </div>
      </div>
      <div className='bg-gray-200 h-[1px] m-2'></div>
      {/* Friends Requests */}
      <div className='text-center'>
      <div className='flex flex-col'>
          <div>
            <p className='font-semibold text-lg'>Friend's Requests</p>
          </div>
          <div>
            {friendrequest.map((friend) => (
              <Friendrequests key={friend._id} friend={friend} />
            ))}
          </div>
        </div>
      <div>
        <p className='text-sm text-gray-400 p-1'>Show more</p>
      </div>
      </div>
    </div>
  )
}

export default RightSideBar
