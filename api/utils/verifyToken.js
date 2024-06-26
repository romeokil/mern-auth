import  jwt from "jsonwebtoken";
import { errorHandler } from "./error.js";

export const verifyToken=(req,res,next)=>{
    const token=req.cookies.accesstoken;
    if(!token) return next(errorHandler(404,"You need to login!!"))
    jwt.verify(token,process.env.SECRET_KEY,(err,user)=>{
        if(err) return next(errorHandler(401,"Token is not valid!!!!!"));
        req.user=user;
        next();
    })
}