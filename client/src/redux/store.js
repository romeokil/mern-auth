import {combineReducers, configureStore} from '@reduxjs/toolkit'
import UserReducer from './User/userSlice.js'
import {persistReducer,persistStore} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const rootReducer=combineReducers({user:UserReducer});
const persistConfig={
    key:'root',
    version:1,//otherwise it will default take -1 as version
    storage,
}

const persistedReducer=persistReducer(persistConfig,rootReducer);

export const store=configureStore({
    reducer:persistedReducer,
    middleware:(getDefaultMiddleware)=>
        getDefaultMiddleware({
            serializableCheck:false,
        })
})

export const persistor=persistStore(store);