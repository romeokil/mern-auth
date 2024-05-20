import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import UserRoutes from './routes/UserRoutes.js'
dotenv.config();
//INITIALIZIING THE APPLICATION
const app=express();
//DEFINING PORT NO
const PORT=3000;
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
