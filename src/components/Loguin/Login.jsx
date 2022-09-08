import axios from 'axios'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { NavLink, useNavigate } from 'react-router-dom'

const Login = () => {

    const [isErrorLogin, setIsErrorLogin] = useState(false)
    const { handleSubmit, register, reset, formState: { errors } } = useForm()
    const navigate = useNavigate()

    const submit = data => {
        const url = 'https://ecommerce-api-react.herokuapp.com/api/v1/users/login'
        axios.post(url, data)
            .then(res => {
                localStorage.setItem('token', res.data.data.token)
                console.log(res.data.data.user)
                localStorage.setItem('NameUser', JSON.stringify(res.data.data.user))
                navigate('/')
            })
            .catch(err => {
                localStorage.setItem('token', '')
                setIsErrorLogin(true)
                setTimeout(() => {
                    setIsErrorLogin(false)
                }, 4200)
                reset({
                    email: '',
                    password: ''
                })
            })

    }

    return (
        <div className='card__login'>
            <form className='login__form' onSubmit={handleSubmit(submit)}>
                <div className='contain_login_title'>
                    <h2 className='login__title'>Welcome! Enter your email and password to continue</h2>
                </div>

                <div className='contain_list'>
                    <ul className='login__test'>
                        <div className='text-data'><h4>Test data</h4></div>

                        <li className='flex-login'><i className='bx bx-envelope'></i>mason@gmail.com</li>
                        <li className='flex-login'><i className='bx bx-lock-alt'></i>mason1234</li>
                    </ul>

                    <ul className='login__list'>
                        <li className='login-item'>
                            <label htmlFor='login-email' className='login__label'>Email</label>
                            <input type="email" id='login-email' placeholder='Your email' className='login__input' autoComplete='off' {...register('email', {
                                required: {
                                    value: true,
                                    message: "Campo requerido"
                                },
                            })} />
                            {errors.email && <span className='error-text'>{errors.email.message}</span>}
                        </li>
                        <li className='login-item'>
                            <label htmlFor="login-password" className='login__label'>Password</label>
                            <input type="password" id='login-password'  placeholder='Your password' className='login__input' autoComplete='off' {...register('password', {
                                required: {
                                    value: true,
                                    message: "Campo requerido"
                                },
                            })} />
                            {errors.password && <span className='error-text'>{errors.password.message}</span>}
                        </li>
                    </ul>
                    <div className="contain-button">
                        <div className='invalid'>
                            {
                                isErrorLogin
                                &&
                                'Invalid credentials, try again...'
                            }
                        </div>
                        <button className='button-login'>Login</button>
                    </div>
                    <div className='contain-to'>
                        <p>Already have an account? <NavLink className='to' to={'/signup'}>Sign Up</NavLink></p>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Login
