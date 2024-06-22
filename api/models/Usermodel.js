import mongoose from 'mongoose'

const UserSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    profilePicture:{
        type:String,
        default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLr3E1_fYG3nqJDD6c13tNJJJ4i8GHLNU7mDLmEjogbLWjjOGDSntFWLgnkAwzR_3UCI8&usqp=CAU"
    }
},{timestamps:true})

const User=mongoose.model('User',UserSchema);

export default User;