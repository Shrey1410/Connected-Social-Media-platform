import React from 'react'

const Friendrequests = (props) => {
  console.log(props.friend)
  return (
    <div className='flex items-center py-1 justify-between'>
      <div className='flex items-center'>
        <img className='rounded-full w-8 h-8' src={props.friend.user_id.profile_image || "https://static.thenounproject.com/png/3874124-200.png"}/>
        <p className='px-3 text-sm'>{props.friend.user_id.fullname}</p>
      </div>
      <div>
      <button className='p-2 bg-blue-800 text-sm text-white rounded-2xl'>Accept</button>
      </div>
    </div>
  )
}

export default Friendrequests
