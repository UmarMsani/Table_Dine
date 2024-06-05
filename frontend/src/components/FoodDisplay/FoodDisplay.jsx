import React, { useContext } from 'react'
import './FoodDisplay.css'
import { StoreContext } from '../../context/StoreContext'
import FoodItem from '../FoodItem/FoodItem'

/**
 * FoodDisplay component displays a list of food items based on the specified category.
 *
 * @param {string} category - The category of food items to display. Defaults to "All".
 * @returns The FoodDisplay component.
 */
const FoodDisplay = ({ category = "All" }) => {

  const { food_list } = useContext(StoreContext)

  return (
    <div className='food-display' id='food-display'>
      <h2>Try our top tier dishes</h2>
      <div className="food-display-list">
        {
          food_list.map((item, index) => {
            if (category === "All" || category === item.category) {
              return <FoodItem key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image} />
            }
          })}
      </div>
    </div>
  )
}


export default FoodDisplay
