import React from 'react'
import { Link } from 'react-router-dom'

function Header() {
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
                <Link to='/signin'>
                <li className=''>Sign In</li>
                </Link>
                
            </div>
       </div>

    </>
  )
}

export default Header