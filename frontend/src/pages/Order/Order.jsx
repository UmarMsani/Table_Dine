import React, { useContext } from 'react'
import './Order.css'
import { StoreContext } from '../../context/StoreContext';
import BackgroundVideo from '../../components/BackgroundVideo/BackgroundVideo';
import { Navigate, useNavigate } from 'react-router-dom';

const Order = () => {

  const { getTotalCartAmount } = useContext(StoreContext);

  const navigate = useNavigate();

  return (
    <div>
      <BackgroundVideo/>
    <form className='place-order'>
      <div className="place-order-left">
        <p className="title">Booking Information</p>
        <div className="multi-fields">
          <input type="text" placeholder='First Name' />
          <input type="text" placeholder='Last Name' />
        </div>
        <input type="email" placeholder='Email' />
        <input type="text" placeholder='Street' />
        <div className="multi-fields">
          <input type="text" placeholder='City' />
          <input type="text" placeholder='Province' />
        </div>
        <div className="multi-fields">
          <input type="text" placeholder='Zip Code' />
          <input type="text" placeholder='Country' />
        </div>
        <input type="text" placeholder='Phone Number' />
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
          <button onClick={() => navigate('/cart')}>Go Back To Cart</button>
        </div>
      </div>
    </form>
    </div>
  )
}

export default Order
