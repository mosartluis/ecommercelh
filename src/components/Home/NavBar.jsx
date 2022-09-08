import Cart from './Cart'
import { useNavigate, NavLink } from 'react-router-dom'
import { Outlet } from 'react-router-dom'
import { useState } from 'react'

const NavBar = () => {
    const [cartOpen, setCartOpen] = useState(false)
    const [isOpenMenu, setIsOpenMenu] = useState(false)
    const navigate = useNavigate()

    const goToHome = () => navigate('/')
    const handleClickCart = () => {
        setIsOpenMenu(false)
        setCartOpen(!cartOpen)
    }
  return (
    <>
    <div className='navbar'>
       <div className='fixed'>
            <nav className='navbar_nav'>
                <div className='nav_title'><h1 onClick={goToHome}>e-commerce</h1></div>
                <div className='menu' onClick={() => setIsOpenMenu(!isOpenMenu)}><i className='bx bx-menu-alt-right'></i></div>
                <div className={`navbar_links ${isOpenMenu && 'open'}`}>
                    <NavLink to='/login' onClick={() => setIsOpenMenu(false)} className='nav_icon'>
                        <i className='bx bxs-user icon_user'></i>
                    </NavLink>
                    <NavLink to='/purchases' onClick={() => setIsOpenMenu(false)} className='nav_icon'>
                        <i className='bx bx-shopping-bag icon_user'></i>
                    </NavLink>
                    <button 
                        className='nav_icon'
                        onClick={handleClickCart}
                    >
                        <i className='bx bx-cart icon_user'></i>
                    </button>
                </div>
            </nav>
        </div> 
    </div>
    {
        cartOpen && <Cart cartOpen={cartOpen} setCartOpen={setCartOpen}/> 
    }
    <Outlet/>
    </>
  )
}

export default NavBar