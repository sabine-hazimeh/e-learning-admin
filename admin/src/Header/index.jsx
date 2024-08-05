import React from "react";
import "./style.css";
import { Link } from "react-router-dom";
import { FaSignInAlt, FaUserPlus } from "react-icons/fa";

function Header() {
  return (
    <div className="header">
      <div>
        <Link to="/" className="logo ">
          Learnly
        </Link>
      </div>
      <div className="middle">
        <Link to="/" className="header-links">
          Home
        </Link>
        <Link to="/add-classes" className="header-links">
          Add Classes
        </Link>
        <Link to="/students" className="header-links">
          Students
        </Link>
        <Link to="/classes" className="header-links">
          Classes
        </Link>
        <Link to="/withdrawals" className="header-links">
          WithDrawals
        </Link>
      </div>
      <div className="auth-links">
        <Link to="/login" className="header-link">
          <FaSignInAlt className="header-icons" />
        </Link>
        <Link to="/signup" className="header-link">
          <FaUserPlus className="header-icons" />
        </Link>
      </div>
    </div>
  );
}

export default Header;
