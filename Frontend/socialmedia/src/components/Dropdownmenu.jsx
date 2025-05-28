import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Dropdownmenu = (props) => {
  return (
    <div className='absolute top-12 bg-white shadow-lg rounded-lg w-full z-50 max-h-52 overflow-y-auto'>
      {
        props.searchResults.map((result)=>{
            return (
                <div className='flex items-center space-x-2 p-2' key={result._id}>
                    <div>
                        <img className="w-10 h-10 object-cover rounded-full" src={result.profile_img || "https://static.thenounproject.com/png/3874124-200.png"} alt="" />
                    </div>
                    <Link to='/userprofile' state={{ user: result }}>
                        {result.fullname}
                    </Link>
                </div>
            )
        })
      }
    </div>
  );
};

export default Dropdownmenu;
