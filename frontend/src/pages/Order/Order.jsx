import React, { useContext, useEffect, useState } from 'react'
import './Order.css'
import { StoreContext } from '../../context/StoreContext';
import BackgroundVideo from '../../components/BackgroundVideo/BackgroundVideo';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';

/**
 * Order Component
 * 
 * This component handles the order form and the order process.
 * It uses the StoreContext to get the necessary data and functions.
 */
const Order = () => {

  const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    province: "",
    zipCode: "",
    country: "",
    phoneNumber: ""
  })

  /**
   * Handles the order submission
   * 
   * @param {Object} event - The submit event
   */
  const onOrder = async (event) => {
    event.preventDefault();
    let orderItems = [];

    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    })

    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 30,
    }

    let response = await axios.post(url + "/api/order/place", orderData, { headers: { token } });
    if (response.data.success) {
      const { session_url } = response.data;
      window.location.replace(session_url);
    }
    else {
      alert("Error!");
    }
  }

  /**
   * Handles the change event of the input fields
   * 
   * @param {Object} event - The change event
   */
  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setData(data => ({ ...data, [name]: value }))
  }

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/cart')
    }
    else if (getTotalCartAmount() === 0) {
      navigate('/cart')
    }
  }, [token])

  return (
    <div>
      <BackgroundVideo />
      <form onSubmit={onOrder} className='place-order'>
        <div className="place-order-left">
          <p className="title">Order Information</p>
          <div className="multi-fields">
            <input name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First Name' required />
            <input name='lastName' onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Last Name' required />
          </div>
          <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Email' required />
          <input name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder='Street' required />
          <div className="multi-fields">
            <input name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder='City' required />
            <input name='province' onChange={onChangeHandler} value={data.province} type="text" placeholder='Province' required />
          </div>
          <div className="multi-fields">
            <input name='zipCode' onChange={onChangeHandler} value={data.zipCode} type="text" placeholder='Zip Code' required />
            <input name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder='Country' required />
          </div>
          <input name='phoneNumber' onChange={onChangeHandler} value={data.phoneNumber} type="text" placeholder='Phone Number' required />
        </div>
        <div className="place-order-right">
          <div className="cart-total">
            <h2>Cart Total</h2>
            <div>
              <div className="cart-total-details">
                <p>Subtotal</p>
                <p>R{getTotalCartAmount()}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <p>...........</p>
                <p>R{getTotalCartAmount() === 0 ? 0 : 30}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <b>Total</b>
                <b>R{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 30}</b>
              </div>
            </div>
            <button>Proceed to Payment</button>
            <button type='submit' onClick={() => navigate('/cart')}>Go Back To Cart</button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Order