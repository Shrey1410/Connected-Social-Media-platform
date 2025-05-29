import React, { useContext } from 'react'
import Friendssugg from './Friendssugg'
import Friendrequests from './Friendrequests'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { UserDataContext } from '../context/UserContext'
import REACT_APP_BASE_URL from '../config'

const RightSideBar = (props) => {
  const [friends, setFriends] = useState([])
  const [friendrequest, setFriendrequest] = useState([])
  const { user, setUser } = useContext(UserDataContext)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${REACT_APP_BASE_URL}/friends/suggestions`,{
          params: {
            page : 1,
            limit : 5
          },
          withCredentials: true,
        });
        const frequest = await axios.get(`${REACT_APP_BASE_URL}/friends/requests`, {
          params:{
            page : 1,
            limit : 3
          },
          withCredentials: true,
        })
        setFriends(response.data.data)
        setFriendrequest(frequest.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, [user])

  return (
    <div className='m-4 '>
    {/* Friends Suggestions */}
      <div className='text-center'>
        <div className='flex flex-col'>
          <div>
            <p className='font-semibold text-lg'>Friend's Suggestions</p>
          </div>
          <div>
            {friends.map((friend) => {
              return <Friendssugg key={friend._id} friend={friend} />
            })}
          </div>
        </div>
      <div>
        <button className='text-sm text-gray-400 p-1 hover:text-gray-600' onClick={(e)=>{
          e.preventDefault();
          props.setUserList(!props.userList);
          props.setListType('friendsuggestions');
        }}>Show more or Less</button>
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
            {friendrequest.map((friend) => {
              return <Friendrequests key={friend._id} friend={friend} />
            })}
          </div>
        </div>
      <div>
        <button className='text-sm text-gray-400 p-1 hover:text-gray-600' onClick={(e)=>{
          e.preventDefault();
          props.setUserList(!props.userList);
          props.setListType('friendrequests');
        }}>Show more or Less</button>
      </div>
      </div>
    </div>
  )
}

export default RightSideBar
