import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import Category from './Category'
 
const FilterProducts = ({filter, setFilterCategory, setFilterPrice}) => {
    const [categories, setCategories] = useState([])
    const filterPrice = useRef()
    const filterCategory = useRef()
    const { register, handleSubmit } = useForm()

    useEffect(() =>{
        const url = 'https://ecommerce-api-react.herokuapp.com/api/v1/products/categories'
        axios.get(url)
        .then(res => {
            setCategories(res.data.data.categories)})
        .catch(err => console.log(err))
    }, [])

    const onClickFilterPrice = () => {
        filterPrice.current.classList.toggle('open')
    }

    const onClickFilterCategory = () => {
        filterCategory.current.classList.toggle('open')
    }

    const changeCategory = () => {
        setFilterCategory(0)
    }

    const submit = data => {
        setFilterPrice(data)
    }

  return (
    <section ref={filter} className="filter">
        <form onSubmit={handleSubmit(submit)}>
            <section ref={filterPrice} className="filter__price">
                <section onClick={onClickFilterPrice} className="filter__priceTitle">
                    <p>Price</p>
                    <i className='bx bx-chevron-down' ></i>
                </section>
                <label className="filter__input">
                    <p>From: </p>
                    <input min={0} type="number" name="" id="" {...register("from")}/>
                </label>
                <label className="filter__input">
                    <p>To: </p>
                    <input min={0} type="number" name="" id="" {...register("to")}/>
                </label>
                <input className="filter__button" type="submit" value='Filter price'/>
            </section>
            <section ref={filterCategory} className="filter__category">
                <section onClick={onClickFilterCategory} className="filter__priceCategory">
                    <p>Category</p>
                    <i className='bx bx-chevron-down' ></i>
                </section>
                <p onClick={changeCategory} className='category'>All Categories</p>
                {
                    categories.map(category => <Category key={category.id} category={category} setFilterCategory={setFilterCategory}/>)
                }
            </section>
        </form>
    </section>
  )
}

export default FilterProducts