import User from "../models/Usermodel.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from 'bcryptjs'

export const test=(req,res)=>{
    res.json({
        message:"Api is workingggg!!!",
    })
}

export const updateUser=async(req,res,next)=>{
    console.log("updateduser me ghuss gy")
    if(req.user.id!==req.params.id){
        return next(errorHandler(402,"You cannot alter/update others details"))
    }
    try{
        if(req.body.password){
            req.body.password=bcryptjs.hashSync(req.body.password,10);
        }
        const Updateduser=await User.findByIdAndUpdate(
            req.params.id,
            {
            $set:{
                username:req.body.username,
                email:req.body.email,
                password:req.body.password,
                profilePicture:req.body.profilePicture,
            }
            },
            {new:true}
        )
        const {password,...rest}=Updateduser._doc;
        res.status(201).json(rest);
    }
    catch(error){
        return next(error)
    }

}