import React, { useState } from 'react'
import './Home.css'
import Header from '../../components/Header/Header'
import Menu from '../../components/Menu/Menu'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'
import AboutUs from '../../components/AboutUs/AboutUs'

const Home = () => {
    
    const [category, setCategory] = useState("All");

  return (
    <div>
      <Header />
      <AboutUs />
    </div>
  )
}

export default Home
