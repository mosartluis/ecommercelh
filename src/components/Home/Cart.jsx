import React, { useEffect } from 'react'
import ItemCart from './ItemCart'
import axios from 'axios'
import getConfig from '../../utils/getConfig.js'
import { useDispatch, useSelector } from 'react-redux'
import { setCartProducts, getProductsCart } from '../../store/slices/cartProducts.slice.js'
import { useNavigate } from 'react-router-dom'

const Cart = ({cartOpen, setCartOpen}) => {
  const cartProducts = useSelector(state => state.cartProducts)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    const url = 'https://ecommerce-api-react.herokuapp.com/api/v1/cart'
    axios.get(url, getConfig())
    .then(res => dispatch(setCartProducts(res.data.data.cart.products)))
    .catch(err => {
      if(err.response.status === 401){
        navigate('/login')
        setCartOpen(!cartOpen)
      }
      console.log(err)
    })
  },[])

  useEffect(() => {
    if(cartOpen){
      dispatch(getProductsCart())
    }
  }, [cartOpen])

  const doPurchase = () => {
    const url = 'https://ecommerce-api-react.herokuapp.com/api/v1/purchases'
    const dataPurchase = {
      "street": "Green St. 1456",
      "colony": "Southwest",
      "zipCode": 12345,
      "city": "USA",
      "references": "Some references"
    }
    axios.post(url, dataPurchase,getConfig())
    .then(res => console.log(res.data))
    .catch(err => console.log(err))
    .finally(() => dispatch(getProductsCart()))
  }

  const getTotalPrice = cartProducts => {
    const prices = cartProducts.map(product => parseFloat(product.price) * product.productsInCart.quantity)
    const totalPrice = prices.reduce((prev, curr) => prev + curr, 0)
    return totalPrice
  }

  return (
    <section className={`cart ${cartOpen && 'open'}`}>
        <h2 className='cart__title'>Shopping Cart</h2>
        <section className='cart__products'>
          {
            cartProducts.map(product => <ItemCart key={product.id} product={product}/>)
          }
        </section>
        <section className='cart__results'>
            <article className='cart__total'>
                <p>Total</p>
                <p>$ {getTotalPrice(cartProducts)}</p>
            </article>
            <button onClick={doPurchase} className='cart__checkout'><span>Checkout</span><i></i></button>
        </section>
    </section>
  )
}

export default Cart