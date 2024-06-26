import React from 'react'
import './Add.css'
import { assets } from '../../assets/assets'
import { useState } from 'react'
import axios from "axios"
import { toast } from 'react-toastify'

/**
 * Add component for adding new food items to the database.
 * @param {Object} props - The component props.
 * @param {string} props.url - The URL of the backend API.
 * @returns {JSX.Element} The rendered Add component.
 */
const Add = ({ url }) => {
  // State for image and form data.
  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Starters"
  })

  /**
   * Handle changes to form inputs.
   * @param {Object} event - The event object.
   */
  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }))
  }

  /**
   * Handle form submission.
   * @param {Object} event - The event object.
   */
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    // Append form data to the FormData object.
    formData.append("name", data.name)
    formData.append("description", data.description)
    formData.append("price", Number(data.price))
    formData.append("category", data.category)
    formData.append("image", image)
    // Send form data to the backend API.
    const response = await axios.post(`${url}/api/food/add`, formData)
    if (response.data.success) {
      // Reset form data and image state on success.
      setData({
        name: "",
        description: "",
        price: "",
        category: "Starters"
      })
      setImage(false)
      toast.success(response.data.message)
    } else {
      toast.error(response.data.message)
    }
  }

  return (
    <div className='add'>
      <form className='flex-col' onSubmit={onSubmitHandler}>
        <div className="image-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" className='image-preview' />
          </label>
          <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden required />
        </div>
        <div className="add-product-name flex-col">
          <p>Name</p>
          <input onChange={onChangeHandler} value={data.name} type="text" name='name' placeholder='e.g. Chicken Soup' required />
        </div>
        <div className="add-product-description flex-col">
          <p>Description</p>
          <textarea onChange={onChangeHandler} value={data.description} name="description" rows="6" placeholder='e.g. Yummy yum yum...' required></textarea>
        </div>
        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product category</p>
            <select onChange={onChangeHandler} value={data.category} name="category">
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
            <input onChange={onChangeHandler} value={data.price} type="number" name='price' placeholder='e.g. R200 without the R' required />
          </div>
        </div>
        <button type='submit' className='add-btn'>Add</button>
      </form>
    </div>
  )
}

export default Add
