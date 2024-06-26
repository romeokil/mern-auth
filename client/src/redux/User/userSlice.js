import { createSlice } from "@reduxjs/toolkit";
const initialState={
    currentUser:null,
    loading:false,
    error:false,
};
const userSlice=createSlice({
    name:'user',
    initialState,
    reducers:{
        signInStart:(state)=>{
            state.loading=true;
        },
        signInSuccess:(state,action)=>{
            state.currentUser=action.payload;
            state.loading=false;
            state.error=false;
        },
        signInFailure:(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        },
        updateuserStart:(state)=>{
            state.loading=true;
        },
        updateuserSuccess:(state,action)=>{
            state.currentUser=action.payload;
            state.loading=false;
            state.error=false;
        },
        updateuserFailure:(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        }
    }
})

export const {signInStart,signInSuccess,signInFailure,updateuserStart,updateuserSuccess,updateuserFailure}=userSlice.actions;

export default userSlice.reducer;
