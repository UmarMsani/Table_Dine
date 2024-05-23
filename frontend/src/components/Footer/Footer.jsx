import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
        <div className="footer-content-left">
        <img src={assets.logo} alt="" style={{ width: '200px', height: '200px' }} />
            <p>Follow us on our social media pages!</p>
            <div className="footer-social-icons">
                <img src={assets.facebook_icon} alt="" />
                <img src={assets.instagram_icon} alt="" />
                <img src={assets.twitter_icon} alt="" />
            </div>
        </div>
        <div className="footer-content-center">
          <h2>Company</h2>
          <ul>
            <li>Home</li>
            <li>About Us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div className="footer-content-right">
          <h2>Get In Touch</h2>
          <ul>
            <li>Phone: +27 (0)11 465 7270</li>
            <li>Email: contact@tabledine.com</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">Table Dine - © 2024 All rights reserved</p>
    </div>
  )
}

export default Footer
