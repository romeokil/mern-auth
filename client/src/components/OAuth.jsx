import React from 'react'
import {GoogleAuthProvider,signInWithPopup,getAuth} from 'firebase/auth';
import {app} from '../firebase.js'
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/User/userSlice.js';
function OAuth() {
    const dispatch=useDispatch();
    const handleGoogleClick=async()=>{
        try{
            const provider=new GoogleAuthProvider();
            const auth=getAuth(app);
            const result=await signInWithPopup(auth,provider);
            console.log(result);
            const response =await fetch('http://localhost:4000/api/auth/google',{
              method:'POST',
              headers:{'Content-Type':'Application/JSON'},
              body:JSON.stringify({
                name:result.user.displayName,
                email:result.user.email,
                photo:result.user.photoURL,
              })
            })
            const data=await response.json();
            // console.log(data)
            dispatch(signInSuccess(data));
            // console.log(data);
        }
        catch(error){
            console.log("Error while Google Authentication!!",error)
        }
    }
  return (
    <button onClick={handleGoogleClick}className='bg-red-600 text-white p-2 rounded-xl hover:opacity-90 uppercase text-center'>Continue With Google</button>
  )
}

export default OAuth