import React from 'react'
import Navbar from '../components/Navbar'
import Post from '../components/Post'
import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import PostSkeleton from '../components/SkeletonUI'
const FriendProfile = () => {
  const navigate = useNavigate()
  const [posts, setPosts] = useState([])
  const [limit, setLimit] = useState(5)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [loading, setLoading] = useState(false);
  const location = useLocation()
  const user = location.state?.user
  useEffect(()=>{
    async function fetchposts(){
      try{
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 3000));
      const res = await axios.get(`http://localhost:8000/getpost/${user?.id || user._id}`, {
        params: {
          page: page,
          limit: limit
        },
        withCredentials:true
      })
      setPosts([...posts, ...res.data.posts])
      if (res.data.posts.length < limit) {
        setHasMore(false);
      }
      setLoading(false);
      if(page<res.data.pagination.totalPages) setPage(page+1);
    }
      catch(err){
        console.log(err)
      }
      finally{
        setLoading(false);
      }
    }
    fetchposts()
  }, [page, user])

  return (
    <div>
      <Navbar />
      <div className='bg-gray-100 p-5 w-full'>
        {/* Profile Card */}
        <div className='relative bg-white rounded-2xl overflow-hidden'>
          {/* Cover Image */}
          <img
            className='w-full h-[200px] object-cover rounded-t-2xl'
            src={user?.cover_image || "https://i.pinimg.com/736x/58/51/2e/58512eb4e598b5ea4e2414e3c115bef9.jpg"}
            alt="Cover"
          />
          {/* Profile Image (positioned manually) */}
              {/* Profile Image */}
          <div className="absolute top-[160px] left-10">
            <img
            className='rounded-full w-24 h-24 p-1 bg-white shadow-md'
            src={user?.profile_image || "https://static.thenounproject.com/png/3874124-200.png"}
            alt="User Profile"
          />
          </div>
          
          {/* Name and Button */}
          <div className='flex items-center justify-start px-5 md:px-10 pt-15'>
            <p className='text-lg font-semibold px-2'>{user?.fullname}</p>
            {user?.Online && <span className="w-2 h-2 bg-green-500 rounded-full inline-block"></span>}
          </div>

          {/* Tabs */}
          <div className='flex items-start px-5 md:px-10 my-4 space-x-4'>
            <button className='bg-blue-500 px-4 py-2 rounded-full text-white font-medium hover:bg-blue-800'>Posts</button>
            <button className='text-gray-600 border-2 rounded-full px-4 py-2  border-gray-100 hover:text-blue-800 font-medium'>Friends</button>
          </div>
        </div>

        {/* Posts */}
        <div>
          {posts.map((post) => {
            return <Post key={post._id} post={post} />
          })}
        </div>
        {loading && (
          <PostSkeleton/>
        )}
      </div>
    </div>
  )
}

export default FriendProfile
