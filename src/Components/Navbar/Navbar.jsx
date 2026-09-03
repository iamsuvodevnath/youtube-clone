import React from "react";
import "./Navbar.css";
import menu_icon from "../../assets/menu.png";
import logo from "../../assets/logo.png";
import search_icon from "../../assets/search.png";
import upload_icon from "../../assets/upload.png";
import more_icon from "../../assets/more.png";
import notification_icon from "../../assets/notification.png";
import profile_icon from "../../assets/jack.png";
import { Link } from "react-router-dom";

const Navbar = ({ setSidebar }) => {
  return (
    <nav className="flex-div navbar">
      {/* Left Section */}
      <div className="nav-left flex-div">
        <button
          className="icon-btn"
          onClick={() => setSidebar(prev => !prev)}
          aria-label="Menu"
        >
          <img className="menu-icon" src={menu_icon} alt="Menu" />
        </button>
        <img className="logo" src={logo} alt="Logo" />
      </div>

      {/* Middle Section */}
      <div className="nav-middle flex-div">
        <div className="search-box flex-div">
          <input type="text" placeholder="Search" />
          <button className="icon-btn" aria-label="Search">
            <img src={search_icon} alt="Search" />
          </button>
        </div>
      </div>

      {/* Right Section */}
      <div className="nav-right flex-div">
        <button className="icon-btn" aria-label="Upload">
          <img src={upload_icon} alt="Upload" />
        </button>
        <button className="icon-btn" aria-label="More options">
          <img src={more_icon} alt="More options" />
        </button>
        <button className="icon-btn" aria-label="Notifications">
          <img src={notification_icon} alt="Notifications" />
        </button>
        <Link to="/" className="profile-link">
          <img src={profile_icon} className="user-icon" alt="Profile" />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
