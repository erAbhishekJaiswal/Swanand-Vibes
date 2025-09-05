// Sidebar.js
import React, { useState } from 'react';
import './css/common.css';
import { Link, useLocation } from 'react-router-dom';
import { getUserRole , isAuthenticated} from "../utills/authService";
import { GiWallet } from "react-icons/gi";
import { useDispatch } from "react-redux";
import {toggleSidebar} from '../store/sidebar';

const Sidebar = ({ isCollapsed, toggle }) => {
  // const [isExpanded, setIsExpanded] = useState(true);
  const location = useLocation();

  const menuItems = [
    { icon: '👤', text: 'Users', path: '/admin/users', active: true },
    { icon: '📦', text: 'Products', path: '/admin/products' },
    { icon: '🪪', text: 'KYC', path: '/admin/kyc' },
    { icon: '💰', text: 'Withdraw', path: '/admin/withdraw' },
    { icon: '🤖', text: 'Referrals', path: '/admin/referrals' },
    // { icon: '📊', text: 'Reports', path: '/admin/reports' },
    // { icon: '🌡️', text: 'Monitoring', path: '/admin/monitoring' },
    { icon: '🛠️', text: 'Settings', path: '/admin/settings' }
  ];

  const UserMenuItems = [
    { icon: '👤', text: 'Profile', path: '/user/profile' },
    { icon: '📦', text: 'Orders', path: '/user/orders' },
    { icon: '🛒', text: 'Cart', path: '/user/cart' },
    { icon: <GiWallet />, text: 'Wallet', path: '/user/wallet' },
    { icon: '⚙️', text: 'Settings', path: '/user/settings' }
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
          >
            <Link to={item.path} className="nav-link">
              <span className="item-icon">{item.icon}</span>
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
              >
                <Link to={item.path} className="nav-link">
                  <span className="item-icon">{item.icon}</span>
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