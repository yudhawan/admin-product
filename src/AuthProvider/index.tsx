import useAuth from './useAuth'
import { Outlet,  } from 'react-router-dom'
import LoginPage from '../app/LoginPage/LoginPage'


export function PrivateRoute() {
  const {token} = useAuth()
  
  return (token || localStorage.getItem('__token')==='token')?<Outlet/>:<LoginPage/>
}