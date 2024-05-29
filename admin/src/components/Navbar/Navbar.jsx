import React from 'react'
import './Navbar.css'
import {assets} from '../../assets/assets'
import video from '../../background/v2.mp4'
 
const Navbar = () => {
  return (
    <div className='navbar'>
      <video src={video} autoPlay loop muted />
      <img className='logo' src={assets.logo} alt="" />
      <p>Admin</p>
      <img className='profile' src={assets.profile_image} alt="" />
      
      

    </div>
  )
}

export default Navbar
