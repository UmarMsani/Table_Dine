import React from 'react'
import './Navbar.css'
import { assets} from '../../assets/assets'


const Navbar = () => {

  const [menu, setMenu] = React.useState("home");

  return (
    <div className='navbar'>
      <img src={assets.logo} alt="" className="logo"/>
      <ul className="navbar-menu">
        <li onClick={()=>setMenu("home")} className={menu==="home"?"active":""}>Home</li>
        <li onClick={()=>setMenu("menu")} className={menu==="menu"?"active":""}>Menu</li>
        <li onClick={()=>setMenu("about-us")} className={menu==="about-us"?"active":""}>About Us</li>
        <li onClick={()=>setMenu("contact-us")} className={menu==="contact-us"?"active":""}>Contact Us</li>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="" style={{width: "40px", height: "40px"}}/>
        <div className="navbar-search-icon">
          <img src={assets.basket_icon} alt="" style={{width: "40px", height: "40px"}}/>
          <div className="dot"></div>
        </div>
        <button>Sign In</button>
      </div>
    </div>
  )
}

export default Navbar