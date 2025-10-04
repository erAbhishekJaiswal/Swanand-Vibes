// Sidebar.js
import React, { useState } from 'react';
import './css/common.css';
import { Link, useLocation } from 'react-router-dom';
import { getUserRole , isAuthenticated} from "../utills/authService";
import { GiWallet } from "react-icons/gi";
import { useDispatch } from "react-redux";
import {toggleSidebar} from '../store/sidebar';
import { MdContactPage } from "react-icons/md";
import { PiNetworkDuotone } from "react-icons/pi";
import { MdOutlineDashboard } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { VscVerifiedFilled } from "react-icons/vsc";
import { BiMoneyWithdraw } from "react-icons/bi";
import { GrGallery } from "react-icons/gr";
import { CiGift } from "react-icons/ci";
import { TiShoppingCart } from "react-icons/ti";
import { LuBoxes } from "react-icons/lu";
import { MdOutlineShoppingBag } from "react-icons/md";
import { CiSettings } from "react-icons/ci";
import { MdSell } from "react-icons/md";
const Sidebar = ({ isCollapsed, toggle }) => {
  // const [isExpanded, setIsExpanded] = useState(true);
  const location = useLocation();

  const menuItems = [
    { icon: <MdOutlineDashboard />, text: 'DashBoard', path: '/admin/' },
    { icon: <FaUsers />, text: 'Users', path: '/admin/users', active: true },
    { icon: <LuBoxes />, text: 'Products', path: '/admin/products' },
    { icon: <MdOutlineShoppingBag />, text: 'Orders', path: '/admin/orderlist' },
    { icon: <VscVerifiedFilled />, text: 'KYC', path: '/admin/kyc' },
    { icon: <BiMoneyWithdraw />, text: 'Withdraw', path: '/admin/withdraw' },
    { icon: <MdContactPage />, text: 'Contact List', path: '/admin/contactlist' },
    { icon: <GrGallery />, text: 'Gallery', path: '/admin/gallery' },
    { icon: <CiGift />, text: 'add gift', path: '/admin/giftlist' },
    { icon: <GiWallet />, text: 'Wallet', path: '/admin/adminwallet' },
    
    // { icon: '🌡️', text: 'Monitoring', path: '/admin/monitoring' },
    // { icon: '🛠️', text: 'Settings', path: '/admin/settings' }
  ];

  const UserMenuItems = [
     { icon: <MdOutlineDashboard />, text: 'DashBoard', path: '/user/dashboard' },
    { icon: <MdSell />, text: 'Products', path: '/products' },
    { icon: <FaUser />, text: 'Profile', path: '/user/profile' },
    { icon: <LuBoxes />, text: 'Orders', path: '/user/orders' },
    { icon: <TiShoppingCart />, text: 'Cart', path: '/user/cart' },
    { icon: <GiWallet />, text: 'Wallet', path: '/user/wallet' },
    { icon: <PiNetworkDuotone />, text: 'Network', path: '/user/network' },
    { icon: <GrGallery />, text: 'Gallery', path: '/user/gallery' },
    // { icon: <CiGift />, text: 'add gift', path: '/user/giftlist' },
    // { icon: <CiSettings />, text: 'Settings', path: '/user/settings' }
  ];

  // const handleExpand = () => {
  //   dispatch(toggleSidebar());
  //   setIsExpanded(!isExpanded);
  // };  

  return (
    <aside className={`sidebar futuristic-sidebar ${isCollapsed ? 'expanded' : 'collapsed'}`}>
      <div className="sidebar-header">
        <button 
          className="sidebar-toggle futuristic-btn"
          // onClick={() => handleExpand()}
          onClick={toggle}
        >
          <span className={`toggle-icon ${isCollapsed ? 'expanded' : ''}`}></span>
        </button>
      </div>
      
      {
        isAuthenticated() && getUserRole() === "admin" && (
         <nav className="sidebar-nav">
        {menuItems.map((item, index) => (
          <div 
            key={index} 
            className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
            // className={`nav-item ${item.active ? 'active' : ''}`}
            title={item.text}
          >
            <Link to={item.path} className="nav-link" title={item.text}>
              <span className="item-icon" title={item.text}>{item.icon}</span>
              {isCollapsed && <span className="item-text">{item.text}</span>}
            </Link>
          </div>
        ))}
      </nav>
        )
      }

      {
        isAuthenticated() && getUserRole() === "user" && (
          <nav className="sidebar-nav">
            {UserMenuItems.map((item, index) => (
              <div
                key={index}
                className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
                // className={`nav-item ${item.active ? 'active' : ''}`}
                title={item.text}
              >
                <Link to={item.path} className="nav-link" title={item.text}>
                  <span className="item-icon" title={item.text}>{item.icon}</span>
                  {isCollapsed && <span className="item-text">{item.text}</span>}
                </Link>
              </div>
            ))}
          </nav>
        )
      }
      
      {/* <div className="sidebar-footer">
        <div className="user-profile">
          <div className="avatar"></div>
          {isCollapsed && (
            <div className="user-info">
              <div className="user-name">Alex Morgan</div>
              <div className="user-role">Administrator</div>
            </div>
          )}
        </div>
      </div> */}
    </aside>
  );
};

export default Sidebar;