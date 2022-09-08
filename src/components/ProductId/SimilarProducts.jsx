import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import ProductCard from '../Home/ProductCard'

const SimilarProducts = ({ product }) => {

    const [filterProducts, setFilterProducts] = useState()
    
    const allProducts = useSelector(state => state.products)

    useEffect(() => {
        if (allProducts?.length !== 0) {
            const filter = allProducts?.filter(e => e?.category?.name === product?.category)
            setFilterProducts(filter)
        }
    }, [product])

  return (
    <article className='similar_products'>
        <h2 className="similar_title">Discover similar items</h2>
        <ul className='products_list'>
            {
              filterProducts?.map( e => {
                if(e.title !== product.title) {
                   return (
                   <ProductCard
                    key={e.id}
                    product={e}
                    />)
                }
              })
            }
          </ul>
    </article>
  )
}

export default SimilarProducts