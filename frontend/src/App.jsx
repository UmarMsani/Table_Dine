import React, { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import Order from './pages/Order/Order'
import Footer from './components/Footer/Footer'
import LoginPopUp from './components/LogInPopUp/LogInPopUp'
import MenuPage from './components/Menu/MenuPage'
import Verify from './pages/Verify/Verify'
import MyOrders from './pages/MyOrders/MyOrders'
import AboutUs from './pages/AboutUs/AboutUs'
import ContactUs from './pages/ContactUs/ContactUs'
import BookingTable from './pages/BookingTable/BookingTable'

/**
 * The main component of the frontend application.
 * This component sets up the routes for the application and renders the necessary components.
 * @returns - The rendered JSX element.
 */
const App = () => {
  const [showLogin, setShowLogin] = useState(false)

  return (
    <>
      {showLogin ? <LoginPopUp setShowLogin={setShowLogin} /> : <></>}

      <div className='app'>
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/menu' element={<MenuPage />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/order' element={<Order />} />
          <Route path='/verify' element={<Verify />} />
          <Route path="/myorders" element={<MyOrders />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path='/contact-us' element={<ContactUs />} />
          <Route path="/booking-table" element={<BookingTable />} />
        </Routes>
      </div>
      <Footer />
    </>
  )
}

export default App
