import React,{useState} from 'react'
import OAuth from '../components/OAuth.jsx' 
import {Link,useNavigate} from 'react-router-dom'
import {signInStart,signInSuccess,signInFailure} from '../redux/User/userSlice.js'
import {useDispatch,useSelector} from 'react-redux'
function Signin() {
  const [email,setemail]=useState('');
  const [password,setpassword]=useState('');
  const {loading ,error} =useSelector((state)=>state.user)
  console.log("loading",loading,"error",error);
  const Navigate=useNavigate();
  const dispatch=useDispatch();
  async function handleSubmit(ev){
    ev.preventDefault();
    try{
      dispatch(signInStart());
      let response=await fetch('http://localhost:4000/api/auth/signin',{
        method:'POST',
        body:JSON.stringify({email,password}),
        headers:{'Content-Type':'Application/json'},
        credentials:'include'
      })
      console.log("heeh data bnane ke pehle");
      let data=await response.json();
      // console.log("data bnana ke baad")
      // console.log("data",data.message);
      if(data.success==false){
        dispatch(signInFailure(data.message));
        return;
      }
      console.log("dispatch success se pehle")
        dispatch(signInSuccess(data));
        console.log("navigate ke upar")
        Navigate('/');
        console.log("Navigate ke niche")
    }
    catch(error){
      console.log("Error while signup",error);
      dispatch(signInFailure(error));
    }
  }
  return (
    <div className='p-3'>
      <h1 className='text-3xl text-bold text-center p-5'>Sign In</h1>
      <form className='flex flex-col gap-6 max-w-lg mx-auto' onSubmit={handleSubmit}>
          <input type="email" className='p-2 bg-slate-100 rounded-xl' placeholder='Email' id='emailid' 
          value={email} onChange={(e)=>{setemail(e.target.value)}}/>
          <input type="password" className='p-2 bg-slate-100 rounded-xl' placeholder='Password' id='passwordid'
          value={password} onChange={(e)=>{setpassword(e.target.value)}}/>
          <button className='bg-blue-900 hover:opacity-90 p-2 rounded-xl font-semibold text-white'>{loading?'Loading...':'Submit'}</button>
          <OAuth/>
      </form>
      <div className='flex max-w-lg mx-auto p-3 gap-2'>
        <p>Already Have an account?</p>
        <Link to='/signup'>
          <p className='text-blue-600'>Sign Up</p>
        </Link>
      </div>
      <p className='p-2 text-red-800 text-center'>{error ? error.message ||"Something went Wrong......":""}</p>
    </div>
  )
}

export default Signin