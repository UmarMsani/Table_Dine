import React, { useContext, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import './Verify.css'
import { StoreContext } from '../../context/StoreContext';
import BackgroundVideo from '../../components/BackgroundVideo/BackgroundVideo';
import axios from 'axios';

/**
 * Verify component for verifying the payment status of an order.
 * This component is responsible for sending a POST request to the server
 * to verify the payment status of an order and redirecting the user to the
 * appropriate page based on the server's response.
 */
const Verify = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const success = searchParams.get("success")
  const orderId = searchParams.get("orderId")

  const navigate = useNavigate();

  const { url } = useContext(StoreContext);

  /**
   * Verify the payment status of an order by sending a POST request to the server.
   * If the payment is successful, navigate to the "/myorders" page.
   * Otherwise, navigate to the home page ("/").
   */
  const verifyPayment = async () => {
    const response = await axios.post(url + "/api/order/verify", { success, orderId });

    if (response.data.success) {
      navigate("/myorders");
    }
    else {
      navigate("/")
    }
  }

  /**
   * Execute the verifyPayment function when the component mounts.
   */
  useEffect(() => {
    verifyPayment();
  }, [])

  return (
    <div className='verify'>
      <BackgroundVideo />
      <div className="spinner">
      </div>
    </div>
  )
}

export default Verify