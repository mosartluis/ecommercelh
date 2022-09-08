import { createSlice } from '@reduxjs/toolkit';
import getConfig from '../../utils/getConfig';
import axios from 'axios'

export const cartProductsSlice = createSlice({
    name: 'cartProducts',
    initialState: [],
    reducers: {
        setCartProducts: (state, action) => action.payload
    }
})


export const { setCartProducts } = cartProductsSlice.actions;


export const getProductsCart = () => (dispatch) => {
    const URL = 'https://ecommerce-api-react.herokuapp.com/api/v1/cart'
    return axios.get(URL, getConfig())
    .then(res => dispatch(setCartProducts(res.data.data.cart.products)))
    .catch(err => {
            if(err.response.status === 404){
                dispatch(setCartProducts([]))
            }
            console.log(err)
        })
}

export default cartProductsSlice.reducer;