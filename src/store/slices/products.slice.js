import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const productsSlice = createSlice({
    name: 'products',
    initialState: null,
    reducers: {
        setProducts: ( state, action ) => action.payload
    }
})

export const { setProducts } = productsSlice.actions;

export const getProducts = () => (dispatch) => {
    const URL = 'https://ecommerce-api-react.herokuapp.com/api/v1/products'
    return axios.get(URL)
        .then(res => dispatch(setProducts(res.data.data.products)))
        .catch(err => console.log(err))
}

export default productsSlice.reducer;