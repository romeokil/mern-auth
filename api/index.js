import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import UserRoutes from './routes/UserRoutes.js'
import AuthRoutes from './routes/AuthRoutes.js'
import cookieParser from 'cookie-parser'
import path from 'path'
dotenv.config();
//INITIALIZIING THE APPLICATION
const app=express();
//DEFINING PORT NO
const PORT=4000;
const __dirname=path.resolve();
app.use(cors({credentials:true,origin:'http://localhost:5173'}));
app.use(express.json())
app.use(cookieParser());
app.use(express.static(path.join(__dirname,"/client/dist")));
app.get('*',(req,res)=>{
    res.sendFile(path.resolve(__dirname,"client","dist","index.html"))
})
// console.log(PORT)
//SERVER CONNECTED!!1
app.listen(PORT,()=>{
    console.log(PORT);
    console.log(`Server is running at ${PORT}!`);
    //DATABASE CONNECTION!!
    mongoose.connect((process.env.MONGO_URL))
.then(()=>{
    console.log("Database connected Successfully!!!!")
})
.catch((error)=>{
    console.log(error);
})
})                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
app.use('/api/user',UserRoutes)
app.use('/api/auth',AuthRoutes)

app.use((err,req,res,next)=>{
    const statusCode=err.statusCode|| 500;
    const message=err.message || 'Internal server Error'
    return res.status(statusCode).json({
        success:false,
        statusCode,
        message,
    });
});
