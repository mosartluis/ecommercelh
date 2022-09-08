import React from 'react'

const PurchaseItems = ({ product }) => {


  return (
    <>
    <li className='product_item'>
        <div className="name">{product.title}</div>
        <div className='quantity'>
            <div className='box'>{product.productsInCart.quantity}</div>
        </div>
        <div className='price'>{`$${product.price}`}</div>
    </li>
</>
  )
}

export default PurchaseItems