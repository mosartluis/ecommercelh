import React from 'react'
import { NavLink } from 'react-router-dom'

const UserLogged = ({setToken}) => {

  const user = JSON.parse(localStorage.getItem('NameUser'))


  const click = ()=>{
    localStorage.removeItem('token','')
    localStorage.removeItem('NameUser', '')
    const newToken = localStorage.getItem('token')
    setToken(newToken)
  }

  console.log(user)


  return (
    <div className='contain-logged'>
      <div className='icon-logged'>
        <i className='bx bxs-user-circle' ></i> <h3 className='checked'>✔</h3>
        <h2 className='name-user'>{`${user && user?.firstName} ${user && user?.lastName}`}</h2>
      </div>
      <NavLink to={"/login"} onClick={click} className="Navlink">
      <h3 className='text-logged'>Log out</h3>
      </NavLink>
    </div>
  )
}

export default UserLogged