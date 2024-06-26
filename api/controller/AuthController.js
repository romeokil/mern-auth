import User from "../models/Usermodel.js";
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { errorHandler } from "../utils/error.js";

export const signup=async(req,res,next)=>{
    const {username,email,password}=req.body;
    const hashPassword=bcryptjs.hashSync(password,10);
    const newUser=new User({username,email,password:hashPassword})
    try{  
        await newUser.save();
        res.status(201).json(newUser)
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
        // if(!validUser) res.status(404).json({message:"Not a valid User!!"})
        if(!validUser) return next(errorHandler(401,'Not a valid User!!'));
        const validUserpassword=bcryptjs.compareSync(password,validUser.password);
        // if(!validUserpassword) res.status(401).json({message:"Password is wrong!!"});
        if(!validUserpassword) return next(errorHandler(404,'Password is wrong!!'));
        const {password:hashedPassword,...rest}=validUser._doc;
        const expiryDate=new Date(Date.now()+3600000);  //1 hour
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

export const google=async (req,res,next)=>{
    // const {name,email,photo}=req.body;
    // const {name,email,photo}=req.body;
    try{
        const existUser=await User.findOne({email:req.body.email});
        // console.log("ha user mil gya",existUser)
        if(existUser){
            const {password:hashedPassword,...rest}=existUser._doc;
            const expiryDate=new Date(Date.now()+3600000);//1 hour
            const token=jwt.sign({id:existUser._id},process.env.SECRET_KEY);
            res
            .cookie('accesstoken',token,{httpOnly:true,expires:expiryDate})
            .status(201)
            .json(rest)
        }
        else{
            const generaterandomPassword=(Math.random()*10).toString(36).slice(-8);
            const hashedPassword=bcryptjs.hashSync(generaterandomPassword,10);
            const endnumappend=Math.random()*10;
            const stringendnum=endnumappend.toString().slice(-6)
            const newUser=new User({
                username:req.body.name.split(" ").join("").toLowerCase()+stringendnum,
                email:req.body.email,
                password:hashedPassword,
                profilePicture:req.body.photo
            })
                await newUser.save();
                // console.log("google wala se logged in hai ye",data);
                const token=jwt.sign({id:newUser._id},process.env.SECRET_KEY)
                const {password:hashedPassword2,...rest}=newUser._doc
                const expiryDate=Date.now()+3600000;
                res
                .cookie('accesstoken',token,{httpOnly:true,expires:expiryDate})
                .status(201)
                .json(rest)
        }
       
    }
    catch(error){
        next(error);
    }
    
}