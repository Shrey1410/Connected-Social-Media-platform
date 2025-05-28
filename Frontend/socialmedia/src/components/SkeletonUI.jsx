import React from 'react'

const PostSkeleton = () => {
  return (
    <div className="bg-white rounded-xl p-4 my-4 animate-pulse">
      <div className="flex items-center space-x-4">
        <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
        <div className="flex-1">
          <div className="h-4 bg-gray-300 rounded w-1/3 mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-1/4"></div>
        </div>
      </div>
      <div className="mt-4 space-y-2">
        <div className="h-3 bg-gray-200 rounded w-full"></div>
        <div className="h-3 bg-gray-200 rounded w-5/6"></div>
        <div className="h-48 bg-gray-300 rounded w-full mt-4"></div>
      </div>
    </div>
  )
}

export default PostSkeleton
