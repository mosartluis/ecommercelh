import { Route, Routes } from 'react-router-dom'
import './App.css'
import './components/Loguin/style/Login.css'
import HomeScreen from './components/Home/HomeScreen'
import NavBar from './components/Home/NavBar'
import LoginScreem from './components/Loguin/LoginScreem'
import ProductId from './components/ProductId/ProductId'
import Purchases from './components/Purchases/Purchases'
import SignUp from './components/Loguin/SignUp'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getProducts } from './store/slices/products.slice'


function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getProducts())
  } , [])

  return (
    <div className="App">
      <Routes>
        <Route element={<NavBar/>}>
          <Route path='/' element={<HomeScreen/>}/>
          <Route path='/login' element={<LoginScreem />}/>
          <Route path='/product/:id' element={<ProductId/>}/>
          <Route path='/purchases' element={<Purchases/>}/>
          <Route path='/signup' element={<SignUp/>}/>
        </Route>
      </Routes>
    </div>
  )
}

export default App