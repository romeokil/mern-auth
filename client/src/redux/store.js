import {configureStore} from '@reduxjs/toolkit'
import UserReducer from './User/userSlice.js'
export const store=configureStore({
    reducer:{user:UserReducer},
    middleware:(getDefaultMiddleware)=>
        getDefaultMiddleware({
            serializableCheck:false,
        })
})