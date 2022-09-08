import React, { useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../../store/slices/products.slice'
import { useEffect } from 'react'
import ProductCard from './ProductCard'
import Form from './Form'
import FilterProducts from './FilterProducts'

const HomeScreen = () => {

  const [searchedProduct, setSearchedProduct] = useState('')
  const [filteredProduct, setFilteredProduct] = useState(null)
  const [filterCategory, setFilterCategory] = useState(0)
  const [filterPrice, setFilterPrice] = useState({})

  const filter = useRef()
  const dispatch = useDispatch()
  const products = useSelector(state => state.products)
  
  useEffect(() => {
    dispatch(getProducts())
  } , [])
  
  useEffect(() => {
      const arrayFilter = products?.filter(e => {
        const numberFrom = filterPrice['from'] ? parseFloat(filterPrice['from']) : 0
        const numberTo = filterPrice['to'] ? parseFloat(filterPrice['to']) : 0
        const priceProduct = parseFloat(e.price)
        if((filterCategory === e.category.id || filterCategory === 0) && 
              e.title.toLowerCase().includes(searchedProduct?.toLowerCase()) &&
                (priceProduct >= numberFrom && priceProduct <= numberTo || 
                  (!filterPrice['from'] && !filterPrice['to']) || 
                  (priceProduct >= numberFrom && !filterPrice['to']) || 
                  (priceProduct <= numberTo && !filterPrice['from']))){
          return true
        }
      })
      setFilteredProduct(arrayFilter)
  }, [searchedProduct, products, filterCategory, filterPrice])
  
  const clickButtonFilter = () => {
    filter.current.classList.toggle('open')
  }

  return (
    <div className='content'>
      <FilterProducts filter={filter} setFilterCategory={setFilterCategory} setFilterPrice={setFilterPrice}/>
      <section className='main_container'>
        <div className='search_box'>
          <Form setSearchedProduct={setSearchedProduct}/>
          <button onClick={clickButtonFilter} className='button__filter'>
            <i className='bx bx-filter-alt' ></i>
          </button>
        </div>
          <ul className='products_list'>
            {
              filteredProduct?.map( product => (
                <ProductCard
                key={product.id}
                product={product}
                />
                ))
            }
          </ul>
      </section>
    </div>
  )
}

export default HomeScreen