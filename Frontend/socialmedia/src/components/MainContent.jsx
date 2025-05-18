import React from 'react'
import Post from './Post'
import { useContext } from 'react'
import { UserDataContext } from '../context/UserContext'
import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const MainContent = () => {
  const { user } = useContext(UserDataContext)
  const [description, setDescription] = useState('')
  const [image, setImage] = useState(null)

  const handlePost = async (e)=>{
    e.preventDefault()
    try{
        const formData = new FormData();
        console.log(image)
        if(image) formData.append('image', image);
        formData.append('description', description)
        console.log(formData)
        console.log(formData.image)
       const res = await axios.post('http://localhost:8000/createpost',formData,{headers: {
        'Content-Type': 'multipart/form-data'
      },
      withCredentials: true
    })
    console.log('Upload successful:', res.data)
  } catch (err) {
    console.error('Upload failed:', err);
    }
  }

  return (
    <div className='bg-gray-100 p-5'>
        {/* Create Post */}
      <div className='bg-white p-4 rounded-2xl'>
        <div className='p-2 flex items-center space-x-2'>
          <img className='rounded-full w-8 h-8' src={user?.profile_image ||"https://i.pinimg.com/736x/58/51/2e/58512eb4e598b5ea4e2414e3c115bef9.jpg"} alt="User Profile" />
            <input className='px-4 py-2 bg-gray-100 rounded-3xl w-full' placeholder="What's on your mind?" type="text" onChange={(e)=>{
              e.preventDefault()
              setDescription(e.target.value)
            }}/>
        </div>
        <div className="p-2 flex justify-between items-center">
          {/* SVG as clickable file upload trigger */}
          <label htmlFor="file-upload" className="cursor-pointer">
          <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
        <path d="M4 19L7.07189 15.2455C7.69252 14.4869 8.00284 14.1076 8.40938 14.0633C8.47386 14.0563 8.53887 14.0555 8.60349 14.0611C9.01094 14.0961 9.32986 14.4682 9.9677 15.2123C10.6306 15.9857 10.962 16.3723 11.381 16.4005C11.4473 16.4049 11.5139 16.4027 11.5797 16.394C11.996 16.3387 12.3016 15.9312 12.9127 15.1164L14.4826 13.0232C15.182 12.0906 15.5317 11.6243 16.0157 11.6119C16.4996 11.5995 16.8728 12.0473 17.619 12.9428L21 17M21 17V9M21 17C21 19.2091 19.2091 21 17 21H11C7.22876 21 5.34315 21 4.17157 19.8284C3 18.6569 3 16.7712 3 13V11C3 7.22876 3 5.34315 4.17157 4.17157C5.34315 3 7.22876 3 11 3H15"
        stroke="black"
        strokeWidth="1.5"
        strokeLinecap="round"
        className="my-path"
        />
        <path
        d="M12 9C12 10.1046 11.1046 11 10 11C8.89543 11 8 10.1046 8 9C8 7.89543 8.89543 7 10 7C11.1046 7 12 7.89543 12 9Z"
        stroke="black"
        strokeWidth="1.5"
        className="my-path"
        />
        <path
        d="M19 3L19 7"
        stroke="black"
        strokeWidth="1.5"
        strokeLinecap="round"
        className="my-path"
        />
        <path
        d="M21 5H17"
        stroke="black"
        strokeWidth="1.5"
        strokeLinecap="round"
        className="my-path"
        />
      </svg>
    </label>

  {/* Hidden file input */}
    <input
    id="file-upload"
    type="file"
    className="hidden"
    onChange={(e) => {
      e.preventDefault()
      const file = e.target.files[0];
      setImage(file)
    }}
  />

  {/* Button */}
  <button className="px-4 py-1 rounded-3xl border-2" onClick={handlePost}>Post</button>
</div>
      </div>
        {/* Posts */} 
        <Post/>
        <Post/>
    </div>
  )
}

export default MainContent