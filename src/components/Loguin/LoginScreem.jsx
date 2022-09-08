import React, { useEffect, useState } from 'react'
import Login from './Login'
import UserLogged from './UserLogged'

const LoginScreem = () => {

  const [token, setToken] = useState('')
  
  
  const changedToken = localStorage.getItem('token')

  useEffect(() => {
    setToken(changedToken)
  }, [changedToken])


  return (
    <div className='contain-login'>
      {
        token
          ?
          <UserLogged setToken={setToken}/>
          :
          <Login />
      }
    </div>
  )
}

export default LoginScreem