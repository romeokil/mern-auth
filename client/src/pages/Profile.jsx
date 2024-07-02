import React,{useRef,useState,useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {getDownloadURL, getStorage,ref,uploadBytesResumable} from 'firebase/storage'
import {app} from '../firebase'
import {updateuserStart,updateuserSuccess,updateuserFailure,deleteuserStart,deleteuserSuccess,deleteuserFailure} from '../redux/User/userSlice'
function Profile() {
  const dispatch=useDispatch();
  const imageRef=useRef(null);
  const [image,setImage]=useState(null);
  const [imagePercent,setimagePercent]=useState(0);
  const [imageError,setimageError]=useState(false);
  const [formData,setformData]=useState({});
  const [updateSuccess,setupdateSuccess]=useState(false);
  const {currentUser,loading,error}=useSelector(state=>(state.user))
  // console.log(image);
  // console.log(formData);
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
  const handleChange=(e)=>{
    setformData({...formData,[e.target.id]:e.target.value})
  }
  const handleSubmit=async(e)=>{
    console.log("formData",formData)
    e.preventDefault();
    try{
    dispatch(updateuserStart());
    const res=await fetch(`http://localhost:4000/api/user/update/${currentUser._id}`,{
      method:'POST',
      headers:{
        'Content-Type':'Application/json'
      },
      body:JSON.stringify(formData),
      credentials:'include'
    })
    const data=await res.json();
    if(data.success==false){
      console.log("data success false me ghuss gy ho")
        dispatch(updateuserFailure(data))
        return;
    }
    dispatch(updateuserSuccess(data));
    setupdateSuccess(true);
  }
  catch(error){
    dispatch(updateuserFailure(error));
  }
  }
  const handledeleteAccount=async()=>{
    try{
      dispatch(deleteuserStart());
      const res=await fetch(`http://localhost:4000/api/user/delete/${currentUser._id}`,{
        method:'DELETE',
        credentials:'include'
      })
      const data=await res.json();
      if(data.success==false){
        dispatch(deleteuserFailure(data));
        return;
      }
      dispatch(deleteuserSuccess(data));
    }
    catch(error){
      dispatch(deleteuserFailure(error));
    }
  }
  return (
    <div className='p-3'>
      <h1 className='text-3xl text-bold text-center p-5'>Profile</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-6 max-w-lg mx-auto'>
        <input type="file" ref={imageRef} onChange={(e)=>setImage(e.target.files[0])} hidden/>
        <img className='h-24 w-24 object-cover rounded-full mx-auto'src={formData.profilePicture || currentUser.profilePicture} alt="Profile Picture" onClick={()=>imageRef.current.click()}/>
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
          <input type="text" className='p-2 bg-slate-100 rounded-xl' placeholder='Username' id='username' defaultValue={currentUser.username} onChange={handleChange}/>
          <input type="email" className='p-2 bg-slate-100 rounded-xl' placeholder='Email' id='email' defaultValue={currentUser.email} onChange={handleChange}/>
          <input type="password" className='p-2 bg-slate-100 rounded-xl' placeholder='Password' id='password' onChange={handleChange}/>
          <button className='bg-blue-900 hover:opacity-90 p-2 rounded-xl font-semibold text-white'>
            {loading?"loading..":"Update"}
          </button>
          <div className='flex justify-between'>
            <span onClick={handledeleteAccount} className='font-medium text-red-500'>Delete Account</span>
            <span className='font-medium text-blue-400'>Sign Out</span>
          </div>
      </form>
      <p className='text-red-500 text-center'>{error?"Updation not completed (Something went wrong)..":""}</p>
      <p className='text-green-500 mt-3 text-center'>{updateSuccess?"Congrats!!! Updation Successfull":""}</p>
    </div>
  )
}

export default Profile