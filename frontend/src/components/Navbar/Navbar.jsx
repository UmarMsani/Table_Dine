import React from 'react'
import './Navbar.css'
import { assets} from '../../assets/assets'
import { Link } from 'react-router-dom';


const Navbar = ({setShowLogin}) => {

  const [menu, setMenu] = React.useState("menu");

  return (
    <div className='navbar'>
      <img src={assets.logo} alt="" className="logo"/>
      <ul className="navbar-menu">
        <Link to='/' onClick={()=>setMenu("home")} className={menu==="home"?"active":""}>Home</Link>
        <a href='#menu' onClick={()=>setMenu("menu")} className={menu==="menu"?"active":""}>Menu</a>
        <a href='#about-us' onClick={()=>setMenu("about-us")} className={menu==="about-us"?"active":""}>About Us</a>
        <a href='#contact-us' onClick={()=>setMenu("contact-us")} className={menu==="contact-us"?"active":""}>Contact Us</a>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="" style={{width: "40px", height: "40px"}}/>
        <div className="navbar-search-icon">
          <img src={assets.basket_icon} alt="" style={{width: "40px", height: "40px"}}/>
          <div className="dot"></div>
        </div>
        <button onClick={()=>setShowLogin(true)} >Sign In</button>
      </div>
    </div>
  )
}

export default Navbar