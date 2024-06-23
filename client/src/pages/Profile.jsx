import React from 'react'
import {useSelector} from 'react-redux'
function Profile() {
  const {currentUser}=useSelector(state=>(state.user))
  return (
    <div className='p-3'>
      <h1 className='text-3xl text-bold text-center p-5'>Profile</h1>
      <form className='flex flex-col gap-6 max-w-lg mx-auto'>
        <img className='h-24 w-24 object-cover rounded-full mx-auto'src={currentUser.profilePicture} alt="Profile Picture" />
          <input type="text" className='p-2 bg-slate-100 rounded-xl' placeholder='Username' id='usernameid' value={currentUser.username}/>
          <input type="email" className='p-2 bg-slate-100 rounded-xl' placeholder='Email' id='emailid' value={currentUser.email} />
          <input type="password" className='p-2 bg-slate-100 rounded-xl' placeholder='Password' id='passwordid'/>
          <button className='bg-blue-900 hover:opacity-90 p-2 rounded-xl font-semibold text-white'>Update</button>
          <div className='flex justify-between'>
            <span className='font-medium text-red-500'>Delete History</span>
            <span className='font-medium text-blue-400'>Sign Up</span>
          </div>
      </form>
    </div>
  )
}

export default Profile