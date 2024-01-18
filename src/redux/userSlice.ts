import { createSlice} from '@reduxjs/toolkit'
import axios from 'axios'
import { UserType,StatusType } from '../types'

export type typeState = UserType & StatusType
const initialState: typeState = {
    token:'',
    username:'admin',
    password:'admin',
    loading:false,
    error:'',
    success:false
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    authServices: (state) => {
        if(localStorage.getItem('__token')==='token') state.token==='token'
        else{
            localStorage.removeItem('__token')
            state.token=''
        }
    },
    logout: (state) => {
        localStorage.removeItem('__token')
        localStorage.removeItem('__username')
        state.loading=false
        state.error=''
        window.location.replace('/')
    },
    login:(state,action)=>{
        if(action.payload.username===state.username && action.payload.password===state.password){
            state.loading=false
            state.error=''
            localStorage.setItem('__username',state.username)
            localStorage.setItem('__token', 'token')
            state.token='token'
        }else state.error='Username or Password wrong'
    },
    setSuccess:(state,action)=>{
        state.success=action.payload.success
    }
  },
  
})
export const {authServices,logout,login,setSuccess}= userSlice.actions
export default userSlice.reducer