import React, { useContext } from 'react'
import './FoodItem.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'

/**
 * FoodItem component
 *
 * @param {Object} props - Component props
 * @param {string} props.id - Food item id
 * @param {string} props.name - Food item name
 * @param {number} props.price - Food item price
 * @param {string} props.description - Food item description
 * @param {string} props.image - Food item image URL
 * @returns  - Rendered FoodItem component
 */
const FoodItem = ({ id, name, price, description, image }) => {

    const { cartItems, addToCart, removeFromCart, url } = useContext(StoreContext);

    return (
        <div className='food-item'>
            <div className="food-item-img-cointainer">
                <img className='food-item-image' src={url + "/images/" + image} alt="" />
                {!cartItems[id]
                    ? <img className='add' onClick={() => addToCart(id)} src={assets.add_icon_white} alt="" />
                    : <div className='food-item-counter'>
                        <img onClick={() => addToCart(id)} src={assets.add_icon_green} alt="" />
                        <p>{cartItems[id]}</p>
                        <img onClick={() => removeFromCart(id)} src={assets.remove_icon_red} alt="" />
                    </div>
                }
            </div>
            <div className="food-item-info">
                <div className="food-item-name-rating">
                    <p>{name}</p>
                    <img src={assets.rating_starts} alt="" />
                </div>
                <p className="food-item-description">{description}</p>
                <p className="food-item-price">R{price}</p>
            </div>
        </div>
    )
}

export default FoodItem