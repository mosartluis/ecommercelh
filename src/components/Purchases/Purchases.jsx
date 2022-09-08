import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import PurchasesCard from './PurchasesCard'
import getConfig from '../../utils/getConfig'

const ProductId = () => {
  const navigate = useNavigate()
  const [purchases, setPurchases] = useState()

  useEffect(() => {
    const url = 'https://ecommerce-api-react.herokuapp.com/api/v1/purchases'
    axios.get(url, getConfig())
    .then(res => setPurchases(res.data.data.purchases))
    .catch(err => {
      if(err.response.status === 401){
        navigate('/login')
      }
      console.log(err)
    })
  }, [])


  return (
    <section className='main_container_purchases'>
      <div className="history">
        <Link to="/">Home</Link>
        <div className="separator"></div>
        <p>Purchases</p>
      </div>
      <h1> My purchases </h1>
      {
        purchases?.map( purchase => (

          <PurchasesCard
          key={purchase.id}
          purchase={purchase}
          />

        ))
      }
    </section>
  )
}

export default ProductId