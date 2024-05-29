import React, { useContext, useState, useEffect } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';

const Navbar = ({ setShowLogin }) => {

  const [menu, setMenu] = useState("home");
  const [activeMenu, setActiveMenu] = useState("home");

  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
  
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/")

  }

  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/') {
      setActiveMenu("home");
    } else if (location.pathname === '/menu') {
      setActiveMenu("menu");
    } else if (location.pathname === '/about-us') {
      setActiveMenu("about-us");
    } else if (location.pathname === '/contact-us') {
      setActiveMenu("contact-us");
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
              <li><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
              <hr />
              <li  onClick={logout}><img src={assets.logout_icon} alt="" />Sign Out</li>
            </ul>
          </div>}
      </div>
    </div>
  )
}

export default Navbar