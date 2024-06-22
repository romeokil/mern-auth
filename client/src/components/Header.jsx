import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Header() {
  const {currentUser}=useSelector(state=>(state.user));
  return (
    <>
       <div className='flex items-center justify-around bg-slate-500 text-white text-sm md:text-lg lg:text-xl p-2' >
            <div>
                <h1 className='font-bold'>Auth App</h1>
            </div>
            <div className='flex items-center justify-evenly list-none'>
                <Link to='/'>
                <li className=''>Home</li>
                </Link>
                <Link to='/about'>
                <li className='px-3 md:px-7'>About</li>
                </Link>
                <Link to='/profile'>
                  {currentUser?
                  (<img className='h-7 w-7 object-cover rounded-xl mix-blend-multiply'src={currentUser.profilePicture} alt="profileimage"/>)
                  :(<li className='px-1'>Sign In</li>)}
                </Link>
            </div>
       </div>

    </>
  )
}

export default Header