// Navbar.js
import React, { useState } from "react";
import "./css/common.css";
import imgLogo from "../assets/logo.jpg"; // Ensure you have a logo image in the specified path
import { Link, useLocation } from "react-router-dom";
import {
  getUserRole,
  isAuthenticated,
  logoutUser,
} from "../utills/authService";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const cartItems = useSelector((state) => state.cart.items);

  const handleLogout = async () => {
    await logoutUser();
    window.location.href = "/login"; // Redirect to login page after logout
  };

  return (
    <nav className="navbar futuristic-nav">
      <div className="nav-container">
        <div className="nav-logo">
          <img src={imgLogo} alt="Logo" className="logo-image" />
          <span className="logo-text">Swanand vibes</span>
        </div>

        <div className={`nav-menu ${isMenuOpen ? "active" : ""}`}>
          <div className="nav-common-items">
            <div className="nav-item">
              <Link
                to="/"
                className={`nav-link ${
                  location.pathname === "/" ? "active" : ""
                }`}
              >
                <span className="link-icon">🏠</span>
                <span className="link-text">Home</span>
              </Link>
            </div>
            <div className="nav-item">
              <Link
                to="/about"
                className={`nav-link ${
                  location.pathname === "/about" ? "active" : ""
                }`}
              >
                <span className="link-text">About</span>
              </Link>
            </div>
            <div className="nav-item">
              <Link
                to="/products"
                className={`nav-link ${
                  location.pathname === "/products" ? "active" : ""
                }`}
              >
                <span className="link-text">Products</span>
              </Link>
            </div>
            <div className="nav-item">
              <Link
                to="/contact"
                className={`nav-link ${
                  location.pathname === "/contact" ? "active" : ""
                }`}
              >
                <span className="link-text">Contact</span>
              </Link>
            </div>
          </div>

          {isMenuOpen && <div className="nav-user-admin-items">
            {!isAuthenticated() && (
              <>
                <div className="nav-item">
                  <Link to="/login" className="login-btn futuristic-btn">
                    Login
                  </Link>
                </div>
                <div className="nav-item">
                  <Link to="/register" className="register-btn futuristic-btn">
                    Register
                  </Link>
                </div>
              </>
            )}
            {isAuthenticated() && getUserRole() === "admin" && (
              <>
                {/* <Link to="/admin/dashboard" className="dashboard-btn futuristic-btn">
              <span className="btn-icon">📊</span>
            </Link> */}
                {/* <Link
                to="/notifications"
                className="notification-btn futuristic-btn"
              >
                <span className="btn-icon">🔔</span>
              </Link> */}
                <div>
                  <Link
                    to="/admin/profile"
                    className="dashboard-btn futuristic-btn"
                  >
                    <span className="btn-icon">👤</span>
                  </Link>
                </div>
                <div>
                  <button
                    onClick={handleLogout}
                    className="logout-btn futuristic-btn"
                  >
                    Logout
                  </button>
                </div>
              </>
            )}
            {isAuthenticated() && getUserRole() === "user" && (
              <>
                <div>
                  <Link
                    to="/user/cart"
                    className="notification-btn futuristic-btn"
                  >
                    <span className="btn-icon">🛒</span>
                    <span className="cart-count">{cartItems.length}</span>
                  </Link>
                </div>

                <div>
                  <Link
                    to="/user/profile"
                    className="dashboard-btn futuristic-btn"
                  >
                    <span className="btn-icon">👤</span>
                  </Link>
                </div>

                <div>
                  <button
                    onClick={handleLogout}
                    className="logout-btn futuristic-btn"
                  >
                    Logout
                  </button>
                </div>
              </>
            )}
          </div>}
        </div>


        <div className="nav-actions"> 
          <div className='pc-nav'>
          {!isAuthenticated() && (
            <>
              <Link to="/login" className="login-btn futuristic-btn">
                Login
              </Link>
              <Link to="/register" className="register-btn futuristic-btn">
                Register
              </Link>
            </>
          )}
          {isAuthenticated() && getUserRole() === "admin" && (
            <>
              <Link
                to="/admin/profile"
                className="dashboard-btn futuristic-btn"
              >
                <span className="btn-icon">👤</span>
              </Link>
              <button onClick={handleLogout} className="logout-btn futuristic-btn">
                Logout
              </button>
            </>
          )}
          {isAuthenticated() && getUserRole() === "user" && (
            <>
              <Link
                to="/user/cart"
                className="notification-btn futuristic-btn"
              >
                <span className="btn-icon">🛒</span>
                <span className="cart-count">{cartItems.length}</span>
              </Link>
              <Link to="/user/profile" className="dashboard-btn futuristic-btn">
                <span className="btn-icon">👤</span>
              </Link>
              <button onClick={handleLogout} className="logout-btn futuristic-btn">
                Logout
              </button>
            </>
          )}
          </div>
          <button
            className="menu-toggle futuristic-btn"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className={`hamburger ${isMenuOpen ? "active" : ""}`}></span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
