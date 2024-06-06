import React from 'react'
import {Link} from 'react-router-dom'

function Signup() {
  return (
    <div className='p-3'>
      <h1 className='text-3xl text-bold text-center p-5'>Sign Up</h1>
      <form className='flex flex-col gap-6 max-w-lg mx-auto'>
          <input type="text" className='p-2 bg-slate-100 rounded-xl' placeholder='Username' id='username'/>
          <input type="email" className='p-2 bg-slate-100 rounded-xl' placeholder='Email' id='email'/>
          <input type="password" className='p-2 bg-slate-100 rounded-xl' placeholder='Password' id='password'/>
          <button className='bg-blue-900 p-2 rounded-xl font-semibold text-white'>Submit</button>
      </form>
      <div className='flex max-w-lg mx-auto p-3 gap-2'>
        <p>Having an account?</p>
        <Link to='/signin'>
          <p className='text-blue-600'>Sign in</p>
        </Link>
      </div>
    </div>
  )
}

export default Signup