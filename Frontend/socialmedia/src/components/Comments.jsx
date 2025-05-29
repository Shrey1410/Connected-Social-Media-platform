import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import FriendSkeleton from './FriendSkeleton'
import REACT_APP_BASE_URL from '../config'
const Comments = (props) => {
  const [comment, setComment] = useState('')
  const [allcomments, setallcomments] = useState([])
  const [loading, setLoading] = useState(false)
  const fetchcomments = async ()=>{
      try{
      setLoading(true)
      await new Promise(resolve => setTimeout(resolve, 3000));
      const res = await axios.get(`${REACT_APP_BASE_URL}/comment/getcomments/${props.postId}`,{
        withCredentials : true
      })
      setallcomments(res.data.comments)
    }catch(err){
      console.log(err);
    }
    finally{
      setLoading(false)
    }
  }
  useEffect(()=>{
    fetchcomments()
  },[])
  const handlecreatecomment = async (e)=>{
    e.preventDefault()
    try{
    const res = await axios.post(`${REACT_APP_BASE_URL}/createcomments/${props.postId}`,{
      comment : comment
    },{
      withCredentials : true
    })
    console.log(res)
    fetchcomments()
    }
    catch(err){
      console.log(err)
    }
    finally{
      setComment('')
    }
  }
  return (
    <div className='bg-white p-4 rounded-2xl my-4'>
      <div className='flex items-center'>
        <img className='rounded-full w-10 h-10 mx-1' src="https://i.pinimg.com/736x/58/51/2e/58512eb4e598b5ea4e2414e3c115bef9.jpg" alt="User Profile" />
        <input type="text" placeholder='Add a comment...' className='px-3 py-2 border rounded-full w-full' value={comment} onChange={(e)=>{
          e.preventDefault()
          setComment(e.target.value)
        }}/>
      </div>
      <div className='flex items-center justify-between py-2'>
        <button className='bg-blue-500 text-white px-4 py-2 rounded-full' onClick={handlecreatecomment}>Comment</button>
        <button className='text-gray-500' onClick={(e)=>{
          e.preventDefault()
          console.log("helll")
          setComment('')
        }}>Cancel</button>
      </div>
      {/* Comments */}
      <div className='mt-4 flex-col items-start max-h-40 overflow-auto'>
  {/* User Image */}
  {!loading && allcomments.map((comment)=>{
  return <div key={comment._id} className='flex m-2'>
  <div className='flex-shrink-0'>
    <img
      className='rounded-full w-10 h-10 mx-1'
      src={comment.user_id.profile_image || "https://i.pinimg.com/736x/58/51/2e/58512eb4e598b5ea4e2414e3c115bef9.jpg"}
      alt="User Profile"
    />
  </div>
  {post.createdBy?.Online && <span className="w-2 h-2 bg-green-500 rounded-full inline-block"></span>}
  {/* Comment Bubble */}
  <div className='bg-gray-100 rounded-2xl px-4 py-2 w-full'>
      <p className='text-sm break-words whitespace-pre-wrap' key={comment._id}>
      {comment.description}
    </p>
  </div>
  </div>
}
)}
{loading && <FriendSkeleton/>}
</div>
    </div>
  )
}

export default Comments
