import React from 'react'

const Post = (props) => {
  return (
    <div>
      <div className='bg-white p-4 rounded-2xl my-4'>
        {/* User who posted */}
            <div className='flex items-center'>
            <img className='rounded-full w-10 h-10' src={props?.post?.createdBy.profile_image || "https://i.pinimg.com/736x/58/51/2e/58512eb4e598b5ea4e2414e3c115bef9.jpg"} alt="User Profile" />
            <p className='px-3 font-semibold font-sans'>{props?.post?.createdBy.fullname}</p>
            </div>
        {/* Post Content */}
            <div>
                <p className='py-2'>{props?.post?.description} </p>
            </div>
        {/* Post Image */}
        {props?.post?.post_image &&
            <div className="my-2 w-auto max-h-80 overflow-hidden rounded-xl">
            <img
             src={props.post.post_image}
             className="w-full h-full object-cover rounded-xl"
             alt=""
            />
            </div>
        }
        {/* Post Reactions and Comments */}
            <div className='flex justify-between items-center py-1'>
                {/* Likes */}
                <button className ='py-1 px-4 rounded-2xl border-2'>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 12C3 11.0572 3 10.5858 3.29289 10.2929C3.58579 10 4.05719 10 5 10C5.94281 10 6.41421 10 6.70711 10.2929C7 10.5858 7 11.0572 7 12V19C7 19.9428 7 20.4142 6.70711 20.7071C6.41421 21 5.94281 21 5 21C4.05719 21 3.58579 21 3.29289 20.7071C3 20.4142 3 19.9428 3 19V12Z" stroke="black" strokeWidth="null" className="my-path"></path>
                    <path d="M19.9619 15.8933L20.654 11.2976C20.8148 10.2293 20.8953 9.69514 20.5961 9.34747C20.2968 8.99981 19.7566 8.99981 18.6763 8.99981H15.5695C15.0382 8.99981 14.7725 8.99981 14.5674 8.90142C14.3623 8.80299 14.1968 8.63753 14.0984 8.43236C14 8.22728 14 7.96161 14 7.43026C14 5.80513 14 4.99255 13.7027 4.63226C13.4083 4.27558 12.9467 4.10212 12.4903 4.17672C12.0293 4.25208 11.4942 4.8636 10.424 6.08664L7.49485 9.43427C7.25015 9.71393 7.12779 9.85376 7.0639 10.0238C7 10.1939 7 10.3797 7 10.7513V14.9998C7 17.8282 7 19.2425 7.87868 20.1211C8.75736 20.9998 10.1716 20.9998 13 20.9998H14.0288C16.4923 20.9998 17.7241 20.9998 18.5679 20.2736C19.4116 19.5474 19.595 18.3294 19.9619 15.8933Z" stroke="black" strokeWidth="null" strokeLinecap="round" className="my-path"></path>
                    </svg>
                </button>
                {/* Comments */}
                <div className='py-1'>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <path d="M13.5 3H10.5C7.21252 3 5.56878 3 4.46243 3.90796C4.25989 4.07418 4.07418 4.25989 3.90796 4.46243C3 5.56878 3 7.21252 3 10.5V12.7334C3 13.9111 3 14.5 3.12307 14.9846C3.48406 16.406 4.59398 17.5159 6.01542 17.8769C6.50002 18 7.08889 18 8.26662 18C8.55699 18 8.70218 18 8.83977 18.0192C9.23801 18.0748 9.61025 18.2492 9.90791 18.5195C10.0108 18.6129 10.1037 18.7244 10.2896 18.9475L10.7171 19.4605C11.101 19.9212 11.2929 20.1515 11.5079 20.2462C11.7988 20.3743 12.1334 20.3564 12.409 20.198C12.6126 20.081 12.779 19.8316 13.1116 19.3326L13.1803 19.2295C13.4003 18.8995 13.5103 18.7345 13.6415 18.6005C13.9277 18.3083 14.2966 18.1109 14.6985 18.0349C14.8828 18 15.0811 18 15.4777 18C16.8941 18 17.6023 18 18.1779 17.8226C19.4427 17.4329 20.4329 16.4427 20.8226 15.1779C21 14.6023 21 13.8941 21 12.4777V10.5C21 7.21252 21 5.56878 20.092 4.46243C19.9258 4.25989 19.7401 4.07418 19.5376 3.90796C18.4312 3 16.7875 3 13.5 3Z" stroke="black" strokeWidth="null" className="my-path"></path>
                    <path d="M7.04962 9.99512L7 10.0001" stroke="black" strokeWidth="null" strokeLinecap="round" className="my-path"></path>
                    <path d="M11.9998 10L11.9502 10.005" stroke="black" strokeWidth="null" strokeLinecap="round" className="my-path"></path>
                    <path d="M16.9998 10L16.9502 10.005" stroke="black" strokeWidth="null" strokeLinecap="round" className="my-path"></path>
                    </svg>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Post
