import React, { useState, useEffect } from 'react';
import './List.css';
import axios from 'axios';
import { toast } from 'react-toastify';

/**
 * Component for displaying a list of food items
 * @param {Object} props - The props object
 * @param {string} props.url - The URL of the API
 */
const List = ({ url }) => {
  // State to hold the list of food items
  const [list, setList] = useState([]);
  // State to handle the selected food item for update
  const [selectedFood, setSelectedFood] = useState(null);
  // State to handle the updated food data
  const [updateData, setUpdateData] = useState({
    name: '',
    category: '',
    price: '',
    image: ''
  });

  /**
   * Fetches the list of food items from the API
   */
  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error("Error fetching food items");
      }
    } catch (error) {
      toast.error("Error fetching food items");
    }
  }

  /**
   * Removes a food item from the list
   * @param {string} foodId - The ID of the food item to remove
   */
  const removeFood = async (foodId) => {
    try {
      const response = await axios.post(`${url}/api/food/remove`, { id: foodId });
      await fetchList();
      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error("Error removing food item");
      }
    } catch (error) {
      toast.error("Error removing food item");
    }
  }

  /**
   * Updates a food item in the list
   */
  const updateFood = async () => {
    try {
      const response = await axios.post(`${url}/api/food/update`, { id: selectedFood._id, ...updateData });
      if (response.data.success) {
        toast.success(response.data.message);
        setSelectedFood(null);
        setUpdateData({ name: '', category: '', price: '', image: '' });
        fetchList();
      } else {
        toast.error("Error updating food item");
      }
    } catch (error) {
      toast.error("Error updating food item");
    }
  }

  /**
   * Handles form input changes for updating food item
   * @param {Object} e - The event object
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateData(prevState => ({ ...prevState, [name]: value }));
  }

  // Fetch the list of food items on mount
  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className='list add flex-col'>
      <p>Food List</p>
      <div className="list-tab">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item, index) => (
          <div key={index} className='list-table-format'>
            <img src={`${url}/images/${item.image}`} alt="" />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>R{item.price}</p>
            <div className="actions">
              <button onClick={() => removeFood(item._id)} className='trash'>🗑️</button>
              <button onClick={() => { setSelectedFood(item); setUpdateData({ name: item.name, category: item.category, price: item.price, image: item.image }); }} className='edit'>✏️</button>
            </div>
          </div>
        ))}
      </div>
      {selectedFood && (
        <div className='update-form'>
          <h2>Update Food Item</h2>
          <form onSubmit={(e) => { e.preventDefault(); updateFood(); }}>
            <label>
              Name:
              <input type="text" name="name" value={updateData.name} onChange={handleInputChange} required />
            </label>
            <label>
              Category:
              <input type="text" name="category" value={updateData.category} onChange={handleInputChange} required />
            </label>
            <label>
              Price:
              <input type="number" name="price" value={updateData.price} onChange={handleInputChange} required />
            </label>
            <label>
              Image:
              <input type="text" name="image" value={updateData.image} onChange={handleInputChange} required />
            </label>
            <button type="submit" className="update-button">Update</button>
            <button type="button" className="cancel-button" onClick={() => setSelectedFood(null)}>Cancel</button>
          </form>
        </div>
      )}
    </div>
  )
}

export default List;
