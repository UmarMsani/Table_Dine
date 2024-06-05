import React, { useContext, useState, useEffect } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';

/**
 * Navbar component
 * 
 * @param {function} setShowLogin - function to set the state of the login modal
 * @returns - Navbar component
 */
const Navbar = ({ setShowLogin }) => {

  const [menu, setMenu] = useState("home");
  const [activeMenu, setActiveMenu] = useState("home");
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);

  const navigate = useNavigate();

  /**
   * Logout function
   * Removes the token from local storage and updates the token state
   */
  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/")
  }

  const location = useLocation();

  /**
   * Sets the active menu item based on the current location
   */
  useEffect(() => {
    if (location.pathname === '/') {
      setActiveMenu("home");
    } else if (location.pathname === '/menu') {
      setActiveMenu("menu");
    } else if (location.pathname === '/about-us') {
      setActiveMenu("about-us");
    } else if (location.pathname === '/contact-us') {
      setActiveMenu("contact-us");
    } else if (location.pathname === '/booking-table') {
      setActiveMenu("booking-table");
    }
  }, [location]);

  return (
    <div className='navbar'>
      <Link to='/'><img src={assets.logo} alt="" className="logo" /></Link>
      <ul className="navbar-menu">
        <Link to='/' onClick={() => setMenu("home")} className={activeMenu === "home" ? "active" : ""}>Home</Link>
        <a href='/menu' onClick={() => setMenu("menu")} className={activeMenu === "menu" ? "active" : ""}>Menu</a>
        <a href='/about-us' onClick={() => setMenu("about-us")} className={activeMenu === "about-us" ? "active" : ""}>About Us</a>
        <a href='/contact-us' onClick={() => setMenu("contact-us")} className={activeMenu === "contact-us" ? "active" : ""}>Contact Us</a>
	<a href='/booking-table' onClick={() => setMenu("booking-table")} className={activeMenu === "booking-table" ? "active" : ""}>Book Table</a>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="" style={{ width: "40px", height: "40px" }} />
        <div className="navbar-search-icon">
          <Link to='cart'><img src={assets.basket_icon} alt="" style={{ width: "40px", height: "40px" }} /></Link>
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>
        {!token ? <button onClick={() => setShowLogin(true)} >Sign In</button>
          : <div className='navbar-profile'>
            <img src={assets.profile_icon_white} alt="" />
            <ul className="nav-profile-dropdown">
              <li onClick={() => navigate('/myorders')}><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
              <hr />
              <li onClick={logout}><img src={assets.logout_icon} alt="" />Sign Out</li>
            </ul>
          </div>}
      </div>
    </div>
  )
}

export default Navbar
