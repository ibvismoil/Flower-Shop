import React from 'react'
import Header from '../components/Header'
import Banners from '../components/Banners'
import ProductsPage from '../components/ProductsPage'

const Home = () => {
  return (
    <div className='containers'>
      <Header/>
      <Banners/>
      <ProductsPage/>
    </div>
  )
}

export default Home
