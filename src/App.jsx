import React from 'react'
import './App.css'
import Home from './pages/Home'
import Loign from './pages/Login'
import { Route, Routes } from 'react-router-dom'
import Register from './pages/Register'
import NotFound from './pages/NotFound'
import EditAccount from './pages/profile/main/EditAccount'
import ProfilePage from './pages/profile/ProfilePage'
import Wishlist from './pages/profile/main/Wishlist'
import EditAddress from './pages/profile/main/EditAddress'

const App = () => {
  return (
    <div>
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<Loign />} path="/login" />
        <Route element={<Register />} path="/register" />
        <Route path="*" element={<NotFound />} />
        <Route element={<ProfilePage />} path="/profile">
            <Route element={<EditAccount />} path="account" />
            <Route element={<Wishlist />} path="wishlist" />
            <Route element={<EditAddress />} path="address" />
            <Route element={<Wishlist />} path="wishlist" />
            {/* <Route element={<Track />} path="track" /> */}
          </Route>
      </Routes>
    </div>
  )
}

export default App
