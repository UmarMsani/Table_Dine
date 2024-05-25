import React from 'react'
import Menu from './Menu'
import FoodDisplay from '../FoodDisplay/FoodDisplay'

const MenuPage = () => {
  const [category, setCategory] = React.useState("All")

  return (
    <div className='menu-page'>
      <Menu category={category} setCategory={setCategory} />
      <FoodDisplay category={category} />
    </div>
  )
}

export default MenuPage