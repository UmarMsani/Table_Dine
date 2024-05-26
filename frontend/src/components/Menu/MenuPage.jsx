import React from 'react'
import Menu from './Menu'
import FoodDisplay from '../FoodDisplay/FoodDisplay'
import BackgroundVideo from '../BackgroundVideo/BackgroundVideo'

const MenuPage = () => {
  const [category, setCategory] = React.useState("All")

  return (
    <div className='menu-page'>
      <div className='video-container' style={{ height: '0px', overflow: 'hidden' }}>
        <BackgroundVideo />
      </div>
      <Menu category={category} setCategory={setCategory} />
      <FoodDisplay category={category} />
    </div>
  )
}

export default MenuPage