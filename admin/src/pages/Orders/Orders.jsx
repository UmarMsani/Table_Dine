import React from 'react'
import './Orders.css'
import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useEffect } from 'react'
import { assets } from '../../assets/assets'

/**
 * Orders component that displays a list of orders received from the server.
 *
 * @param {string} url - The URL of the server that handles the orders.
 * @returns {JSX.Element} The Orders component.
 */
const Orders = ({ url }) => {
  // State to store the orders received from the server
  const [orders, setOrders] = useState([]);

  /**
   * Fetches the orders from the server and updates the state.
   *
   * @returns {Promise<void>}
   */
  const fetchOrders = async () => {
    const response = await axios.get(url + "/api/order/list");
    if (response.data.success) {
      setOrders(response.data.data);
      console.log(response.data.data);
    } else {
      toast.error("Error")
    }
  }

  /**
   * Fetches the orders from the server when the component mounts.
   */
  useEffect(() => {
    fetchOrders();
  }, [])

  return (
    <div className='order add'>
      <h3>Orders</h3>
      <div className="order-list">
        {/* Map over the orders array and display each order */}
        {orders.map((order, index) => (
          <div key={index} className="order-item">
            <img src={assets.meal_icon} alt="" />
            <div>
              <p className='order-item-food'>
                {/* Map over the items in the order and display their names and quantities */}
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return item.name + " x " + item.quantity
                  }
                  else {
                    return item.name + " x " + item.quantity + ", "
                  }
                })}
              </p>
            </div>
            <p className="order-item-name">
              {/* Display the first and last name of the order's address */}
              {order.address.firstName + " " + order.address.lastName}
            </p>
            <div className="order-item-address">
              {/* Display the address details */}
              <p> {order.address.street + ", "}</p>
              <p>{order.address.city + ", "}</p>
              <p>{order.address.province + ", "}</p>
              <p>{order.address.country + ", "}</p>
              <p>{order.address.zipCode}</p>
            </div>
            <p className="order-item-phone">{order.address.phoneNumber}</p>
            <p>Items : {order.items.length}</p>
            <p className="order-item-amount">R{order.amount}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Orders