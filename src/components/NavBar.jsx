import React from "react";
import Logo from "../images/logo.png";
import { Link } from "react-router-dom";

const NavBar = ({ size, setShow }) => {
  return (
    <div className="nav_box">
      <div className="leftside">
        <img src={Logo} className="nav_logo" alt="logo" onClick={() => setShow(true)} />
      </div>
      <div className="rightside">
          <i className="ri-shopping-cart-line nav_icon" onClick={() => setShow(false)}></i>
        <span className="no-of-products">{size}</span>
        <Link className="nav_links" to="/auth">
          LOGIN
        </Link>
      </div>
    </div>
  );
};

export default NavBar;