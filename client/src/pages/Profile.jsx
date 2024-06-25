import React,{useRef,useState,useEffect} from 'react'
import {useSelector} from 'react-redux'
import {getDownloadURL, getStorage,ref,uploadBytesResumable} from 'firebase/storage'
import {app} from '../firebase'

function Profile() {
  const imageRef=useRef(null);
  const [image,setImage]=useState(null);
  const [imagePercent,setimagePercent]=useState(0);
  const [imageError,setimageError]=useState(false);
  const [formData,setformData]=useState({});
  const {currentUser}=useSelector(state=>(state.user))
  // console.log(image);
  console.log(formData);
  useEffect(()=>{
    if(image) handleuploadImage(image);
  },[image])
  const handleuploadImage=(image)=>{
    // console.log(image);
    const storage=getStorage(app);
    const fileName=new Date().getTime()+image.name;
    const storageRef=ref(storage,fileName);
    const uploadTask=uploadBytesResumable(storageRef,image);
    uploadTask.on(
      'state changed',
      (snapshot)=>{
        const progress=(snapshot.bytesTransferred)/(snapshot.totalBytes)*100;
        // console.log('Upload is '+Math.round(progress)+' %done');
        setimagePercent(Math.round(progress));
      },
      (error)=>{
        setimageError(true);
      },
      ()=>{
      getDownloadURL(uploadTask.snapshot.ref).then(downloadURL=>
          setformData({...formData,profilePicture:downloadURL}))
      }
    )
  }
  return (
    <div className='p-3'>
      <h1 className='text-3xl text-bold text-center p-5'>Profile</h1>
      <form className='flex flex-col gap-6 max-w-lg mx-auto'>
        <input type="file" ref={imageRef} onChange={(e)=>setImage(e.target.files[0])} hidden/>
        <img className='h-24 w-24 object-cover rounded-full mx-auto'src={currentUser.profilePicture} alt="Profile Picture" onClick={()=>imageRef.current.click()}/>
        <p className='text-center'>
        {  imageError?
          (
            <span className='text-red-500 font-normal'>
              Error uploading Image....(file should be image and less than 2MB)
            </span>
          ):imagePercent>0 && imagePercent<=50 ?
          (
            <span className='text-yellow-500'>`Uploading Image {imagePercent}%`</span>
          ):imagePercent>50 && imagePercent<100?
          (
            <span className='text-orange-500'>`Uploading Image {imagePercent}%`</span>
          )
          :imagePercent==100?
          (
            <span className='text-green-500'>Image Uploaded successfully...</span>
          ):
          (
            ''
          )
        }
        </p>
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