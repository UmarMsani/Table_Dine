import React, { useContext, useEffect, useState } from 'react'
import './MyOrders.css'
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import BackgroundVideo from '../../components/BackgroundVideo/BackgroundVideo';
import { assets } from '../../assets/assets';
import moment from 'moment'

/**
 * Component to display the user's orders
 * @returns - The MyOrders component
 */
const MyOrders = () => {
  const { url, token } = useContext(StoreContext);
  const [data, setData] = useState([]);

  /**
   * Function to get the user's orders from the server
   */
  const getOrders = async () => {
    const response = await axios.post(url + "/api/order/userorders", {}, { headers: { token } });
    setData(response.data.data);
  }

  useEffect(() => {
    if (token) {
      getOrders();
    }
  }, [token])

  return (
    <div className="video-container">
      <BackgroundVideo />
      <div className='my-orders'>
        <h2>My Orders</h2>
        <div className="container">
          {data.map((order, index) => {
            return (
              <div key={index} className="my-orders-order">
                <img src={assets.food_orders} alt="" />
                <p>{order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return item.name + " x " + item.quantity
                  }
                  else {
                    return item.name + " x " + item.quantity + ", "
                  }
                })}</p>
                <p>R{order.amount}.00</p>
                <p>Items: {order.items.length}</p>
                <p>Date: {moment(order.date).format('DD MMM YYYY')}</p>
                <p>Time: {moment(order.date).format('HH:mm')}</p>
                <button>Track Order</button>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default MyOrders
