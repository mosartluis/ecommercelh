import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { NavLink,useNavigate } from 'react-router-dom'
import axios from 'axios'

const SignUp = () => {

    const {handleSubmit,register,reset, formState:{errors}}=useForm()
    const [userCreate, setUserCreate] = useState(false)
  
    const navigate= useNavigate()

    const submitdata = data =>{
        const updateUser='https://ecommerce-api-react.herokuapp.com/api/v1/users'

        axios.post(updateUser,data)
        .then(res=>console.log(res.data.data))
        .catch(err => console.log(err.data))

        setUserCreate(true)
        setTimeout(() => {
        navigate('/login')
        }, 2500);
       reset({
        email:'',
        firstName:'',
        lastName:'',
        password:'',
        phone:''
       })
       
    }

  return (
    <section className='contain-signup'>
        {userCreate?

        <div className='user-create'>
            <div className='container-icon'>
            <i className='bx bxs-user-detail'></i>
            </div>
            <h2>¡Successfully <br/> registered user!</h2>
        </div>

            :
        <div className='card__signup'>
        <form  className='form-signup' onSubmit={handleSubmit(submitdata)}>
            <div className='contain-signup-name'>
            <h2>Sign Up</h2>
            </div>
            <ul className='login__list'>
                <li className='login-item'>
                    <label htmlFor="iemail">Email</label>
                    <input type="email" id="iemail" placeholder='Your email' className='signup__input' autoComplete='off' {...register("email", {
                    required: {
                      value: true,
                      message: "Campo requerido"
                      
                    },
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                      message: "Formato incorrecto."
                    }
                  })}/>
                  {errors.email && <span className='error-text'>{errors.email.message}</span>}
                </li>
                <li className='login-item'>
                    <label htmlFor="ifirstName">First Name</label>
                    <input type="text" id="ifirstName" placeholder='Your first name' className='signup__input' autoComplete='off' {...register('firstName',{
                    required: {
                      value: true,
                      message: "Campo requerido"
                    },
                    pattern: {
                      value: /[A-Za-z]$/i,
                      message: "Formato incorrecto, solo caracteres (A-Z)."
                    },minLength:{
                        value:3,
                        message:'Nombre muy corto'
                    },
                    maxLength:{
                        value:10,
                        message:'Nombre muy largo'
                    }
                    })} />
                    {errors.firstName && <span className='error-text'>{errors.firstName.message}</span>}
                </li>

                <li className='login-item'>
                    <label htmlFor="ilastName">Last Name</label>
                    <input type="text" id="ilastName" placeholder='Your last name' className='signup__input' autoComplete='off' {...register('lastName',{
                    required: {
                      value: true,
                      message: "Campo requerido"
                    },
                    pattern: {
                      value:/[A-Za-z]$/i,
                      message: "Formato incorrecto, solo caracteres (A-Z)."
                    },
                    minLength:{
                        value:3,
                        message:"Apellido muy corto"
                    }
                    ,
                    maxLength:{
                        value:10,
                        message:'Apellido muy largo'
                    }
                    })}/>
                    {errors.lastName && <span className='error-text'>{errors.lastName.message}</span>}
                </li>


                <li className='login-item'>
                    <label htmlFor="ipassword">Password</label>
                    <input type="password" id="ipassword" placeholder='Create password' className='signup__input' autoComplete='off' {...register("password", {
                    required: {
                      value: true,
                      message: "Campo requerido"
                    },
                    minLength: {
                      value: 6,
                      message: "La contraseña debe tener al menos 6 caracteres"
                    }
                  })}/>
                  {errors.password && <span className='error-text'>{errors.password.message}</span>}
                </li>


                <li className='login-item'>
                    <label htmlFor="inumber">Phone (10 character)</label>
                    <input type="number" id="inumber" className='signup__input' placeholder='Your phone' autoComplete='off' {...register('phone',{
                    required: {
                      value: true,
                      message: "Campo requerido"
                    },
                    minLength: {
                      value: 10,
                      message: "Numero celular es muy corto"
                    },
                    maxLength:{
                        value:10,
                        message:"Numero celular sobrepasa los caracteres maximos"
                    }
                  })} />
                  {errors.phone && <span className='error-text'>{errors.phone.message}</span>}
                </li>

            </ul>
            <div className='button-signup'>
            <button className='button-up'>Sign Up</button>
            </div>
            <div className='contain-to'>
                        <p>Don't have an account? <NavLink className='to' to={'/login'}>Log in</NavLink></p>
                    </div>
        </form>
        </div>}
    </section>
  )
}

export default SignUp