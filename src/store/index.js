import { configureStore } from '@reduxjs/toolkit'
import products from './slices/products.slice'
import cartProducts from './slices/cartProducts.slice'

export default configureStore({
    reducer: {
        products,
        cartProducts
    }
})