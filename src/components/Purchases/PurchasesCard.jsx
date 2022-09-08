import React from 'react'
import PurchaseItems from './PurchaseItems'
import { cambiarFormatoFecha } from '../../helpers'

const PurchasesCard = ({ purchase }) => {
    
  return (
    <div className="purchase_item">
        <div className="header">
        <p>{cambiarFormatoFecha(purchase.createdAt)}</p>
        </div>
            <ul className="purchases_list">
                {
                    purchase?.cart.products.map( product => (
                        <PurchaseItems
                        key={product.id}
                        product={product}
                        />
                    ))
                }
            </ul>
    </div>
  )
}

export default PurchasesCard