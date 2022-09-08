import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import SimilarProducts from './SimilarProducts'
import getConfig from '../../utils/getConfig.js'
import { useDispatch } from 'react-redux'
import { getProductsCart } from '../../store/slices/cartProducts.slice.js'

const ProductScreen = () => {

  const [product, setProduct] = useState()
  const [indexClass, setIndexClass] = useState(0)
  const [counter, setCounter] = useState(1)
  const dispatch = useDispatch()

  const minusOne = () => {
    const minus = counter - 1
    if(minus >= 1){
      setCounter(minus)
    }
  }

  const plusOne = () => setCounter(counter + 1)

  const {id} = useParams()

  const classImg = ['first-img', 'second-img', 'third-img']
  const classImgVisible = ['first', 'second', 'third']
  
  useEffect(() => {
    const URL = `https://ecommerce-api-react.herokuapp.com/api/v1/products/${id}`
    axios.get(URL)
      .then(res => setProduct(res.data.data.product))
      .catch(err => console.log(err))
    setCounter(1)
  }, [id])


  const clickPrev = () => {
    const prevClass = indexClass - 1
    if (prevClass < 0) {
      setIndexClass(classImg.length - 1)
    } else {
      setIndexClass(prevClass)
    }
  }

  const clickNext = () => {
    const nextClass = indexClass + 1
    if (nextClass >= classImg.length) {
      setIndexClass(0)
    } else {
      setIndexClass(nextClass)
    }
  }

  const addToCart = () => {
    const url = `https://ecommerce-api-react.herokuapp.com/api/v1/cart/`
    const productSend = {
      id: product.id, 
      quantity: counter
    }
    axios.post(url, productSend, getConfig())
    .then(res => {
      dispatch(getProductsCart())
      console.log(res.data)
    })
    .catch(err => {
      if(err.response.status === 401){
        navigate('/login')
      }
      console.log(err)
    })
  }


  return (
    <div className='product_container'>
      <div className="history">
        <Link to="/">Home</Link>
        <div className="separator"></div>
        <p>{product?.title}</p>
      </div>
      <div className='slider'>
        <div onClick={clickPrev} className='slider__prev'>&#60;</div>
        <div className={`slider__container ${classImg[indexClass]}`}>
          {
            product?.productImgs.map((imgSrc, index) => (
              <img
              key={imgSrc}
              src={imgSrc}
              alt='product-image'
              className={`slider__imgs ${classImgVisible[index]}`}
              />
            ))
          }
        </div>
        <div onClick={clickNext} className='slider__next'>&#62;</div>
      <div className="dots_container">
        <div onClick={() => setIndexClass(0)}
         className={indexClass === 0 ? 'dots dots_active' : 'dots'}></div>
        <div onClick={() => setIndexClass(1)}
        className={indexClass === 1 ? 'dots dots_active' : 'dots'}></div>
        <div onClick={() => setIndexClass(2)}
         className={indexClass === 2 ? 'dots dots_active' : 'dots'}></div>
      </div>
      </div>
      <div className='product_info'>
        <div className="brand"></div>
        <h2>{product?.title}</h2>
        <div className="product_data">
          <div className="product_options">
            <div className="flex">
              <div className="price">
                <span className='label'>Price</span>
                <span className='amount'>{`$${product?.price}`}</span>
              </div>
              <div className="quantity">
                <div className="label">Quantity</div>
                <div className="flex">
                  <button onClick={minusOne} className='button-product'><i className='bx bx-minus'></i></button>
                    <div className='value'>{counter}</div>
                  <button onClick={plusOne} className='button-product'><i className='bx bx-plus'></i></button>
                </div>
              </div>
            </div>
            <button onClick={addToCart} className='add_cart'>Add to cart <i className='bx bx-cart-download'></i></button>
          </div>
          <p className='product_description'>{product?.description}</p>
        </div>
        <SimilarProducts
        product={product}
        />
      </div>
    </div>
  )
}

export default ProductScreen