import React from 'react'
import './Header.css'

const Header = () => {
  return (
    <div className='header'>
      <div className="header-content">
      <img src="./header_food.png" alt="Header"/>
        <h2>Discover your new favourite dish.</h2>
        <p> Explore our extensive menu, featuring a variety of dishes made with fresh, high-quality ingredients. Our goal is to provide you with an unforgettable dining experience that satisfies your taste buds and leaves you craving more.</p>
        <button>View Menu</button>
      </div>
    </div>
  )
}

export default Header
