import React from 'react'
import Navbar from '../components/Navbar'
import Post from '../components/Post'
import { useContext , useState } from 'react'
import { UserDataContext } from '../context/UserContext'
import axios from 'axios'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Profile = () => {
  const { user } = useContext(UserDataContext)
  const [ profileimage , setProfileimage] = useState(null)
  const [ coverimage , setCoverimage] = useState(null)
  const navigate = useNavigate()
  const [posts, setPosts] = useState([])
  const [description, setDescription] = useState('')
  const [image, setImage] = useState(null)
  useEffect(()=>{
    async function fetchposts(){
      try{
      const res = await axios.get("http://localhost:8000/getpost", {
        withCredentials:true
      })
      console.log(res.data.posts)
      setPosts(res.data.posts)
      }
      catch(err){
        console.log(err)
      }
    }
    fetchposts()
  }, [])

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

  const handleprofileimage = async ()=>{
    try{
        const formData = new FormData();
        formData.append('profileimage', profileimage);
        console.log(formData)
       const res = await axios.post('http://localhost:8000/upload/profileimage',formData,{headers: {
        'Content-Type': 'multipart/form-data'
      },
      withCredentials: true
    })
    console.log('Upload successful:', res.data);
    navigate('/')
  } catch (err) {
    console.error('Upload failed:', err);
    }
    }

    const handlecoverimage = async ()=>{
    try{
        const formData = new FormData();
        formData.append('coverimage', coverimage); // must match field name expected by multer
       const res = await axios.post('http://localhost:8000/upload/coverimage',formData,{headers: {
        'Content-Type': 'multipart/form-data'
      },
      withCredentials: true
    })
    console.log('Upload successful:', res.data);
    navigate('/')
  } catch (err) {
    console.error('Upload failed:', err);
    }
    }

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
          <div className='flex items-center justify-between px-5 md:px-10 pt-15'>
            <p className='text-lg font-semibold px-2'>{user?.fullname}</p>
            <button className='px-4 py-2 bg-blue-800 rounded-2xl text-white font-semibold hover:bg-blue-700'>
              Follow
            </button>
          </div>
          {/* Bio */}
          <div className="flex flex-col px-5 md:px-10 my-4 space-y-4">
          <div className="flex items-center justify-start space-x-2">
          <p className="w-40 font-semibold px-3">Upload Profile Image</p>
          <input
          type="file"
          className="w-full max-w-xs text-slate-500 font-medium text-base bg-gray-100
             file:cursor-pointer file:border-0 file:py-2.5 file:px-4 file:mr-4
             file:bg-blue-800 file:hover:bg-gray-700 file:text-white rounded"
             onChange={(e)=>{
              e.preventDefault()
              setProfileimage(e.target.files[0])
             }}
         />
         <button className='px-4 py-1 rounded-3xl bg-blue-800 text-white' onClick={handleprofileimage}>Upload</button>
         </div>

        <div className="flex items-center justify-start space-x-2">
        <p className="w-40 px-3 font-semibold">Upload Cover Image</p>
        <input
        type="file"
        className="w-full max-w-xs text-slate-500 font-medium text-base bg-gray-100
             file:cursor-pointer file:border-0 file:py-2.5 file:px-4 file:mr-4
             file:bg-blue-800 file:hover:bg-gray-700 file:text-white rounded"
             onChange = {(e)=>{
              e.preventDefault()
              setCoverimage(e.target.files[0])
             }}
        />
        <button className='px-4 py-1 rounded-3xl bg-blue-800 text-white' onClick={handlecoverimage}>Upload</button>
        </div>
      </div>

          {/* Tabs */}
          <div className='flex items-start px-5 md:px-10 my-4 space-x-4'>
            <button className='bg-blue-500 px-4 py-2 rounded-full text-white font-medium'>Posts</button>
            <button className='text-gray-600 border-2 rounded-full px-4 py-2  border-gray-100 hover:text-blue-600 font-medium'>Friends</button>
          </div>
        </div>

        {/* Post input */}
        <div className='p-2 rounded-2xl my-4 bg-white'>
          <div className='p-2 flex items-center space-x-2'>
            <img
              className='rounded-full w-8 h-8'
              src={user?.profile_image||"https://i.pinimg.com/736x/58/51/2e/58512eb4e598b5ea4e2414e3c115bef9.jpg"}
              alt="User"
            />
            <input
              className='px-4 py-2 bg-gray-100 rounded-3xl w-full outline-none'
              placeholder="What's on your mind?"
              type="text"
              onChange={(e) => {
                e.preventDefault()
                setDescription(e.target.value)
              }}
            />
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
    accept="image/*"
    onChange={(e) => {
      const file = e.target.files[0];
      if (file) {
        console.log("Selected file:", file.name)
        setImage(file);
      }
    }}
  />

  {/* Button */}
  <button className="px-4 py-1 rounded-3xl border-2" onClick={handlePost}>Post</button>
</div>

        </div>

        {/* Posts */}
        <div>
          {posts.map((post) => (
            <Post key={post._id} post={post} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Profile
