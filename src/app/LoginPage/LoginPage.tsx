import { useState } from 'react'
import cx from 'classnames'
import style from './LoginPage.module.scss'
import { LoginType } from '../../types'
import { useAppDispatch, useAppSelector } from '../../redux/appHooks'
import { login } from '../../redux/userSlice'

function LoginPage() {
  const dispatch = useAppDispatch()
  const {error,loading} =useAppSelector(state=>state.user)
  const [users,setUsers]=useState<LoginType>({
    username:'',
    password:''
  })
  const [validation,setValidation]=useState<string[]>([])
  function handleChange(e:React.ChangeEvent<HTMLInputElement>) {
    const {id,value} = e.target
    if(value) setValidation(validation.filter(val=>val!==id))
    setUsers(prev => ({...prev, [id]:value}))
  }
  function handleSubmit(e:React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if(!users.username) {
      if(validation.includes('username')) return;
      setValidation(prev=>([...prev, 'username']))
      return;
    }
    if(!users.password) {
      if(validation.includes('password')) return;
      setValidation(prev=>([...prev, 'password']))
      return;
    }
    dispatch(login(users))
  }
  return (
    <div className={style.main}>
      <h1>User Login</h1>
      <form className={style.container} onSubmit={handleSubmit}>
        <input className={cx(style.input,{[style.error]:validation.includes('username')})} placeholder='Username' id='username' type='text' value={users.username} onChange={handleChange} />
        <input className={cx(style.input,{[style.error]:validation.includes('password')})} placeholder='Password' id='password' type='password' value={users.password} onChange={handleChange} />
        {error&&<span className={style.errorText}>{error}</span>}
        {loading&&<span>Loading ...</span>}
        <button className={style.button}>submit</button>
      </form>
    </div>
  )
}

export default LoginPage