import User from "../models/Usermodel.js";
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const signup=async(req,res,next)=>{
    const {username,email,password}=req.body;
    const hashPassword=bcryptjs.hashSync(password,10);
    const newUser=new User({username,email,password:hashPassword})
    try{  
        await newUser.save();
        res.status(201).json({message:"signup credentials recieved!!"})
    }
    catch(error){
        next(error);
    }
}
export const signin=async(req,res,next)=>{
    const {email,password}=req.body;
    console.log(email)
    // console.log(username,password);
    // res.status(201).json({message:"Signin creadentials recieved!!"})
    try{
        const validUser=await User.findOne({email});
        if(!validUser) res.status(404).json({message:"Not a valid User!!"})
        const validUserpassword=bcryptjs.compareSync(password,validUser.password);
        if(!validUserpassword) res.status(401).json({message:"Password is wrong!!"});
        const {password:hashedPassword,...rest}=validUser._doc;
        const expiryDate=new Date(Date.now()+360000);  //1 hour
            const token=jwt.sign({id:validUser._id},process.env.SECRET_KEY);
            res
            .cookie('accesstoken',token,{httpOnly:true,expires:expiryDate})
            .status(201)
            .json(rest);
    }
    catch(error){
        next(error);
    }
}
