import React, { useContext, useState } from 'react'
import './LogInPopUp.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'
import axios from "axios"

/**
 * LogInPopUp Component
 * 
 * This component provides a login/sign up form as a popup.
 * It allows users to sign up or log in to the application.
 * 
 * @param {function} setShowLogin - A function to hide the login/sign up popup
 * @returns - The LogInPopUp component
 */
const LogInPopUp = ({ setShowLogin }) => {

  const { url, setToken } = useContext(StoreContext);

  const [currState, setCurrState] = useState("Sign In");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  });

  /**
   * Handles input change events
   * 
   * @param {object} event - The event object
   */
  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }));
  }

  /**
   * Handles form submission
   * 
   * @param {object} event - The event object
   */
  const onLogin = async (event) => {
    event.preventDefault();
    let newUrl = url;

    if (currState === "Sign In") {
      newUrl += "/api/user/login";
    } else {
      newUrl += "/api/user/register";
    }

    const response = await axios.post(newUrl, data);

    if (response.data.success) {
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
      setShowLogin(false);
    } else {
      alert(response.data.message);
    }
  }

  return (
    <div className='login-popup'>
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
        </div>
        <div className="login-popup-input">
          {currState === "Sign In" ? <></> : <input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Name' required />}
          <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Email' required />
          <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='Password' required />
        </div>
        <button type='submit'>{currState === "Sign Up" ? "Sign Up" : "Sign In"}</button>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By checking this box, you are agreeing to our terms of service.</p>
        </div>
        {currState === "Sign In"
          ? <p>Create a new account? <span onClick={() => setCurrState("Sign Up")} >Sign Up</span></p>
          : <p>Already have an account? <span onClick={() => setCurrState("Sign In")} >Sign In</span></p>
        }
      </form>
    </div>
  );
};

export default LogInPopUp
