import React from 'react'

const Category = ({category, setFilterCategory}) => {
    const changeCategory = () => {
        setFilterCategory(category.id)
    }
  return (
    <p onClick={changeCategory} className='category'>{category.name}</p>
  )
}

export default Category