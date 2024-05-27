import React from 'react'
import './Add.css'
import { assets } from '../../assets/assets'
import { useState } from 'react'

const Add = () => {

  const [image, setImage] = useState(false);
  

  return (
    <div className='add'>
      <form className='flex-col'>
         <div className="image-upload flex-col">
            <p>Upload Image</p>
            <label htmlFor="image">
              <img src={image?URL.createObjectURL(image):assets.upload_area} alt="" />
            </label>
            <input onChange={(e)=>setImage(e.target.files[0])} type="file" id="image" hidden required/>
         </div>
         <div className="add-product-name flex-col">
            <p>Name</p>
            <input type="text" name='name' placeholder='e.g. Chicken Soup'/>
         </div>
         <div className="add-product-description flex-col">
          <p>Description</p>
          <textarea name="description" rows="6" placeholder='e.g. Yummy yum yum...' required></textarea>
         </div>
         <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product category</p>
            <select name="category">
              <option value="Starters">Starters</option>
              <option value="Salads">Salads</option>
              <option value="Soups">Soups</option>
              <option value="Pastas">Pastas</option>
              <option value="Main Courses">Main Courses</option>
              <option value="Pizzas">Pizzas</option>
              <option value="Sides">Sides</option>
              <option value="Desserts">Desserts</option>
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Product price</p>
            <input type="number" name='price' placeholder='e.g. R200 without the R'/>
          </div>
         </div>
         <button type='submit' className='add-btn'>Add</button>
      </form>
    </div>
  )
}

export default Add
