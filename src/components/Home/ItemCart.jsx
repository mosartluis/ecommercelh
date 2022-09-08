import axios from 'axios'
import getConfig from '../../utils/getConfig'
import { useDispatch } from 'react-redux'
import { getProductsCart } from '../../store/slices/cartProducts.slice.js'

const ItemCart = ({product}) => {
  const dispatch = useDispatch()

  const deleteProductCart = () => {
      const url = `https://ecommerce-api-react.herokuapp.com/api/v1/cart/${product.id}`
      axios.delete(url, getConfig())
      .then(res => {
        dispatch(getProductsCart())
        console.log(res.data)
      })
      .catch(err => console.log(err))
  }

  return (
    <article className='item'>
        <p className='item__mark'>{product.brand}</p>
        <p className='item__name'>{product.title}</p>
        <p className='item__quantity'>{product.productsInCart.quantity}</p>
        <i onClick={deleteProductCart} className='item__button bx bx-trash'></i>
        <section className='item__results'>
            <p className='item__totalText'>Total</p>
            <p className='item__total'>$ {product.price}</p>
        </section>
    </article>
  )
}

export default ItemCart