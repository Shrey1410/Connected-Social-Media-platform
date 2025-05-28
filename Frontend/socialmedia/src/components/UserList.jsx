import React from 'react'
import User from './User'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useContext } from 'react'
import { UserDataContext } from '../context/UserContext'
import FriendSkeleton from './FriendSkeleton'
import { toast } from 'react-toastify'
const UserList = (props) => {
  const [friends, setFriends] = useState([])
  const [page , setPage] = useState(1);
  const [limit , setLimit] = useState(5);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const { user, setUser } = useContext(UserDataContext)
    useEffect(()=>{
      setFriends([])
      setHasMore(true)
      setPage(1)
    },[user])
    useEffect(()=>{
      const fetchDatafriends = async () => {
        try {
          setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 3000));
          const response = await axios.get('http://localhost:8000/friends',{
            params: {
              page : page,
              limit : limit
            },
            withCredentials: true,
          });
          const new_friends = response.data.data;
          setFriends([...friends, ...new_friends]);
          if (new_friends.length < limit) {
            setHasMore(false);
          }
          setLoading(false);
          if(page<response.data.pagination.totalPages) setPage(page+1);
        } catch (error) {
          console.error('Error fetching data:', error);
        } finally{
          setLoading(false);
        }
      }
      if(props.listType=='friends') fetchDatafriends();
      const fetchDatafriendsrequests = async () => {
        try {
          setLoading(true);
          
        await new Promise(resolve => setTimeout(resolve, 3000));
          const response = await axios.get('http://localhost:8000/friends/requests',{
            params: {
              page : page,
              limit : limit
            },
            withCredentials: true,
          });
          const new_friends = response.data.data;
          setFriends([...friends, ...new_friends]);
          if (new_friends.length < limit) {
            setHasMore(false);
          }
          setLoading(false);
          if(page<response.data.pagination.totalPages) setPage(page+1);
        } catch (error) {
          console.error('Error fetching data:', error);
        } finally{
          setLoading(false);
        }
      }
      if(props.listType=='friendrequests') fetchDatafriendsrequests();
      const fetchDatafriendsuggestions = async () => {
        try {
          setLoading(true);
          
        await new Promise(resolve => setTimeout(resolve, 3000));
          const response = await axios.get('http://localhost:8000/friends/suggestions',{
            params: {
              page : page,
              limit : limit
            },
            withCredentials: true,
          });
          const new_friends = response.data.data;
          setFriends([...friends, ...new_friends]);
          if (new_friends.length < limit) {
            setHasMore(false);
          }
          setLoading(false);
          if(page<response.data.pagination.totalPages) setPage(page+1);
        } catch (error) {
          console.error('Error fetching data:', error);
        } finally{
          setLoading(false);
        }
      }
      if(props.listType=='friendsuggestions') fetchDatafriendsuggestions();
      const fetchpendingfriendsrequests = async (req, res)=>{
        try {
          setLoading(true);
          console.log(page)
        await new Promise(resolve => setTimeout(resolve, 3000));
          const response = await axios.get('http://localhost:8000/pending/requests',{
            params: {
              page : page,
              limit : limit
            },
            withCredentials: true,
          });
          const new_friends = response.data.data;
          console.log(friends, new_friends)
          setFriends([...friends, ...new_friends]);
          if (new_friends.length < limit) {
            setHasMore(false);
          }
          setLoading(false);
          if(page<response.data.pagination.totalPages) setPage(page+1);
        } catch (error) {
          console.log('Error fetching data:', error);
          toast.error(error.response.data.message)
        } finally{
          setLoading(false);
        }
      }
      if(props.listType=='pending') fetchpendingfriendsrequests();
    }, [page, user])
  return (
    <div className='bg-gray-100 p-5'>
        {/* Create Post */}
      <div className='bg-white p-4 rounded-2xl'>
  {friends && friends.length > 0 ? (
    friends.map((friend) => (
      <User key={friend._id} friend={friend} listType={props.listType} />
    ))
  ) : (
    <p className="text-gray-500 text-center">No Friends and Request found</p>
  )}
</div>
      {loading && <FriendSkeleton/>}
    </div>
  )
}
export default UserList