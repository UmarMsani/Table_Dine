import React, { useState } from 'react'
import './LogInPopUp.css'
import { assets } from '../../assets/assets'

const LogInPopUp = ({setShowLogin}) => {

    const [currState, setCurrState] = useState ("Sign In")

  return (
    <div className='login-popup'>
      <form className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img  onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="" />
        </div>
        <div className="login-popup-input">
          {currState==="Sign In"?<></>:<input type="text" placeholder='Name' required/>}
          <input type="email" placeholder='Email' required/>
          <input type="password" placeholder='Password' required/>
        </div>
        <button>{currState==="Sign Up"?"Sign Up":"Sign In"}</button>
        <div className="login-popup-condition">
          <input type="checkbox" required/>
          <p>By checking this box, you are agreeing to our terms of service.</p>
        </div>
          {currState==="Sign In"
          ? <p>Create a new account? <span onClick={()=>setCurrState("Sign Up")} >Sign Up</span></p>
          : <p>Already have an account? <span onClick={()=>setCurrState("Sign In")} >Sign In</span></p>
          }
      </form>
    </div>
  ) 
}

export default LogInPopUp
