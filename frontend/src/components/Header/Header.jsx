import React from 'react'
import './Header.css'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div className='header'>
      <img src="./header_food.png" alt="header_food"/>
      <div className="header-content">
        <h2>Discover your new favourite dish.</h2>
        <p> Explore our extensive menu, featuring a variety of dishes made with fresh, high-quality ingredients. Our goal is to provide you with an unforgettable dining experience that satisfies your taste buds and leaves you craving more.</p>
        <Link to="/menu"><button>View Menu</button></Link>
      </div>
    </div>
  )
}

export default Header
