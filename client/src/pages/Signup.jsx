import React,{useState} from 'react'
import {Link,useNavigate} from 'react-router-dom'
import OAuth from '../components/OAuth.jsx'

function Signup() {
  const [username,setusername]=useState('');
  const [email,setemail]=useState('');
  const [password,setpassword]=useState('');
  const [loading,setloading]=useState(false);
  const [errmsg,seterrmsg]=useState(false)
  const Navigate=useNavigate();
  async function handleSubmit(ev){
    ev.preventDefault();
    try{
      setloading(true);
      seterrmsg(false);
      let response=await fetch('http://localhost:4000/api/auth/signup',{
        method:'POST',
        body:JSON.stringify({username,email,password}),
        headers:{'Content-Type':'Application/json'},
        credentials:'include'
      })
      setloading(false);
      console.log(response);
      if(!response.ok){
        seterrmsg(true);
        return;
      }
      Navigate('/signin');
    }
    catch(error){
      console.log("Error while signup",error.message);
      seterrmsg(true)
    }
  }
  return (
    <div className='p-3'>
      <h1 className='text-3xl text-bold text-center p-5'>Sign Up</h1>
      <form className='flex flex-col gap-6 max-w-lg mx-auto' onSubmit={handleSubmit}>
          <input type="text" className='p-2 bg-slate-100 rounded-xl' placeholder='Username' id='usernameid' value={username} onChange={(e)=>{setusername(e.target.value)}}/>
          <input type="email" className='p-2 bg-slate-100 rounded-xl' placeholder='Email' id='emailid' 
          value={email} onChange={(e)=>{setemail(e.target.value)}}/>
          <input type="password" className='p-2 bg-slate-100 rounded-xl' placeholder='Password' id='passwordid'
          value={password} onChange={(e)=>{setpassword(e.target.value)}}/>
          <button className='bg-blue-900 hover:opacity-90 p-2 rounded-xl font-semibold text-white'>{loading?'Loading...':'Submit'}</button>
          <OAuth/>
      </form>
      <div className='flex max-w-lg mx-auto p-3 gap-2'>
        <p>Don't have an account?</p>
        <Link to='/signin'>
          <p className='text-blue-600'>Sign in</p>
        </Link>
      </div>
      <p className='p-2 text-red-800 text-center'>{errmsg?"Something went Wrong......":""}</p>
    </div>
  )
}

export default Signup