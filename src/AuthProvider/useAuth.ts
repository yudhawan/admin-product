import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../redux/appHooks"
import { authServices } from "../redux/userSlice"

function useAuth() {
  const dispatch = useAppDispatch()
  const {token,username,loading} =useAppSelector(state=>state.user)
  useEffect(()=>{
    dispatch(authServices())
  },[])  
  return {token,username,loading}
}

export default useAuth