import React from 'react'
import ProductList from './Pages/ProductList'
// import ProductCard from './Components/CartItem'
import MyNavbar from './Components/Navbar'
import { Navigate, Route, Routes } from 'react-router-dom'
import Cart from './Pages/Cart'
import ProductDetails from './Pages/ProductDetails'


const App = () => {
  return (
    <>
      <MyNavbar />
      <Routes>
        <Route path='/' element={<Navigate to={'/home'} />} />
        <Route path='/home' element={<ProductList />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/product-details/:id' element={<ProductDetails />} />
      </Routes>
      {/* <ProductCard /> */}
      {/* <ProductList /> */}
    </>
  )
}

export default App