import React from 'react'

const FriendSkeleton = () => {
  return (
    <div className="bg-white rounded-xl p-4 my-4 animate-pulse">
      <div className="flex items-center space-x-4">
        <div className="flex-1">
          <div className="h-4 bg-gray-300 rounded w-1/2"></div>
        </div>
      </div>
    </div>
  )
}

export default FriendSkeleton
