// // Navbar.js
// import React, { useState } from "react";
// import "./css/common.css";
// import imgLogo from "../assets/logo.jpg"; // Ensure you have a logo image in the specified path
// import { Link, useLocation } from "react-router-dom";
// import {
//   getUserRole,
//   isAuthenticated,
//   logoutUser,
// } from "../utills/authService";
// import { useSelector } from "react-redux";

// const Navbar = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const location = useLocation();
//   const cartItems = useSelector((state) => state.cart.items);

//   const handleLogout = async () => {
//     await logoutUser();
//     window.location.href = "/login"; // Redirect to login page after logout
//   };

//   return (
//     <nav className="navbar futuristic-nav">
//       <div className="nav-container">
//         <div className="nav-logo">
//           <img src={imgLogo} alt="Logo" className="logo-image" />
//           <span className="logo-text">Swanand vibes</span>
//         </div>

//         <div className={`nav-menu ${isMenuOpen ? "active" : ""}`}>
//           <div className="nav-common-items">
//             <div className="nav-item">
//               <Link
//                 to="/"
//                 className={`nav-link ${
//                   location.pathname === "/" ? "active" : ""
//                 }`}
//               >
//                 <span className="link-icon">🏠</span>
//                 <span className="link-text">Home</span>
//               </Link>
//             </div>
//             <div className="nav-item">
//               <Link
//                 to="/about"
//                 className={`nav-link ${
//                   location.pathname === "/about" ? "active" : ""
//                 }`}
//               >
//                 <span className="link-text">About</span>
//               </Link>
//             </div>
//             <div className="nav-item">
//               <Link
//                 to="/products"
//                 className={`nav-link ${
//                   location.pathname === "/products" ? "active" : ""
//                 }`}
//               >
//                 <span className="link-text">Products</span>
//               </Link>
//             </div>
//             <div className="nav-item">
//               <Link
//                 to="/contact"
//                 className={`nav-link ${
//                   location.pathname === "/contact" ? "active" : ""
//                 }`}
//               >
//                 <span className="link-text">Contact</span>
//               </Link>
//             </div>
//           </div>

//           {isMenuOpen && <div className="nav-user-admin-items">
//             {!isAuthenticated() && (
//               <>
//                 <div className="nav-item">
//                   <Link to="/login" className="login-btn futuristic-btn">
//                     Login
//                   </Link>
//                 </div>
//                 <div className="nav-item">
//                   <Link to="/register" className="register-btn futuristic-btn">
//                     Register
//                   </Link>
//                 </div>
//               </>
//             )}
//             {isAuthenticated() && getUserRole() === "admin" && (
//               <>
//                 {/* <Link to="/admin/dashboard" className="dashboard-btn futuristic-btn">
//               <span className="btn-icon">📊</span>
//             </Link> */}
//                 {/* <Link
//                 to="/notifications"
//                 className="notification-btn futuristic-btn"
//               >
//                 <span className="btn-icon">🔔</span>
//               </Link> */}
//                 <div>
//                   <Link
//                     to="/admin/profile"
//                     className="dashboard-btn futuristic-btn"
//                   >
//                     <span className="btn-icon">👤</span>
//                   </Link>
//                 </div>
//                 <div>
//                   <button
//                     onClick={handleLogout}
//                     className="logout-btn futuristic-btn"
//                   >
//                     Logout
//                   </button>
//                 </div>
//               </>
//             )}
//             {isAuthenticated() && getUserRole() === "user" && (
//               <>
//                 <div>
//                   <Link
//                     to="/user/cart"
//                     className="notification-btn futuristic-btn"
//                   >
//                     <span className="btn-icon">🛒</span>
//                     <span className="cart-count">{cartItems.length}</span>
//                   </Link>
//                 </div>

//                 <div>
//                   <Link
//                     to="/user/profile"
//                     className="dashboard-btn futuristic-btn"
//                   >
//                     <span className="btn-icon">👤</span>
//                   </Link>
//                 </div>

//                 <div>
//                   <button
//                     onClick={handleLogout}
//                     className="logout-btn futuristic-btn"
//                   >
//                     Logout
//                   </button>
//                 </div>
//               </>
//             )}
//           </div>}
//         </div>


//         <div className="nav-actions"> 
//           <div className='pc-nav'>
//           {!isAuthenticated() && (
//             <>
//               <Link to="/login" className="login-btn futuristic-btn">
//                 Login
//               </Link>
//               <Link to="/register" className="register-btn futuristic-btn">
//                 Register
//               </Link>
//             </>
//           )}
//           {isAuthenticated() && getUserRole() === "admin" && (
//             <>
//               <Link
//                 to="/admin/profile"
//                 className="dashboard-btn futuristic-btn"
//               >
//                 <span className="btn-icon">👤</span>
//               </Link>
//               <button onClick={handleLogout} className="logout-btn futuristic-btn">
//                 Logout
//               </button>
//             </>
//           )}
//           {isAuthenticated() && getUserRole() === "user" && (
//             <>
//               <Link
//                 to="/user/cart"
//                 className="notification-btn futuristic-btn"
//               >
//                 <span className="btn-icon">🛒</span>
//                 <span className="cart-count">{cartItems.length}</span>
//               </Link>
//               <Link to="/user/profile" className="dashboard-btn futuristic-btn">
//                 <span className="btn-icon">👤</span>
//               </Link>
//               <button onClick={handleLogout} className="logout-btn futuristic-btn">
//                 Logout
//               </button>
//             </>
//           )}
//           </div>
//           <button
//             className="menu-toggle futuristic-btn"
//             onClick={() => setIsMenuOpen(!isMenuOpen)}
//           >
//             <span className={`hamburger ${isMenuOpen ? "active" : ""}`}></span>
//           </button>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;














import React, { useState, useRef, useEffect } from "react";
import "./css/common.css"; // your existing stylesheet path
import imgLogo from "../assets/logo.jpg";
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

  const navMenuRef = useRef(null);
  const toggleRef = useRef(null);

  // support different cart state shapes (safe fallback)
  const cartItems = useSelector(
    (state) => state.cart?.items ?? state.cart?.cartItems ?? []
  );

  // Close menu when route changes (safe for both desktop & mobile)
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Click outside to close (mobile)
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        isMenuOpen &&
        navMenuRef.current &&
        !navMenuRef.current.contains(e.target) &&
        toggleRef.current &&
        !toggleRef.current.contains(e.target)
      ) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, [isMenuOpen]);

  // Close the mobile menu automatically if window is resized to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 968 && isMenuOpen) setIsMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMenuOpen]);

  const handleLogout = async () => {
    await logoutUser();
    setIsMenuOpen(false);
    window.location.href = "/login";
  };

  // Called from all Link onClick handlers — only closes on small screens
  const handleNavLinkClick = () => {
    if (window.innerWidth <= 968) setIsMenuOpen(false);
  };

  // keyboard support for toggle (Enter/Space)
  const handleToggleKey = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setIsMenuOpen((p) => !p);
    }
  };

  return (
    <nav
      className="navbar futuristic-nav"
      role="navigation"
      aria-label="Main Navigation"
    >
      <div className="nav-container">
        <div className="nav-logo">
          <img src={imgLogo} alt="Logo" className="logo-image" />
          <span className="logo-text">Swanand vibes</span>
        </div>

        {/* overlay for mobile menu */}
        {isMenuOpen && (
          <div
            className="nav-overlay"
            onClick={() => setIsMenuOpen(false)}
            aria-hidden="true"
          />
        )}

        <div
          ref={navMenuRef}
          id="main-nav-menu"
          className={`nav-menu ${isMenuOpen ? "active" : ""}`}
        >
          <div className="nav-common-items">
            <div className="nav-item">
              <Link
                to="/"
                onClick={handleNavLinkClick}
                className={`nav-link ${location.pathname === "/" ? "active" : ""}`}
              >
                {/* <span className="link-icon">🏠</span> */}
                <span className="link-text">Home</span>
              </Link>
            </div>

            <div className="nav-item">
              <Link
                to="/about"
                onClick={handleNavLinkClick}
                className={`nav-link ${location.pathname === "/about" ? "active" : ""}`}
              >
                <span className="link-text">About</span>
              </Link>
            </div>

            <div className="nav-item">
              <Link
                to="/products"
                onClick={handleNavLinkClick}
                className={`nav-link ${location.pathname.startsWith("/products") ? "active" : ""}`}
              >
                <span className="link-text">Products</span>
              </Link>
            </div>

            <div className="nav-item">
              <Link
                to="/contact"
                onClick={handleNavLinkClick}
                className={`nav-link ${location.pathname === "/contact" ? "active" : ""}`}
              >
                <span className="link-text">Contact</span>
              </Link>
            </div>
          </div>

          {/* user/admin items (these are shown in the off-canvas menu on mobile) */}
          <div className="nav-user-admin-items">
            {!isAuthenticated() && (
              <>
                <div className="nav-item">
                  <Link to="/login" onClick={handleNavLinkClick} className="login-btn futuristic-btn">
                    Login
                  </Link>
                </div>
                <div className="nav-item">
                  <Link to="/register" onClick={handleNavLinkClick} className="register-btn futuristic-btn">
                    Register
                  </Link>
                </div>
              </>
            )}

            {isAuthenticated() && getUserRole() === "admin" && (
              <>
                <div>
                  <Link to="/admin/profile" onClick={handleNavLinkClick} className="dashboard-btn futuristic-btn">
                    <span className="btn-icon">👤</span>
                  </Link>
                </div>

                <div>
                  <button onClick={handleLogout} className="logout-btn futuristic-btn">
                    Logout
                  </button>
                </div>
              </>
            )}

            {isAuthenticated() && getUserRole() === "user" && (
              <>
                <div>
                  <Link to="/user/cart" onClick={handleNavLinkClick} className="notification-btn futuristic-btn">
                    <span className="btn-icon">🛒</span>
                    <span className="cart-count" aria-live="polite">{cartItems.length}</span>
                  </Link>
                </div>

                <div>
                  <Link to="/user/profile" onClick={handleNavLinkClick} className="dashboard-btn futuristic-btn">
                    <span className="btn-icon">👤</span>
                  </Link>
                </div>

                <div>
                  <button onClick={handleLogout} className="logout-btn futuristic-btn">
                    Logout
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* right actions (desktop) */}
        <div className="nav-actions">
          <div className="pc-nav">
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
                <Link to="/admin/profile" className="dashboard-btn futuristic-btn">
                  <span className="btn-icon">👤</span>
                </Link>
                <button onClick={handleLogout} className="logout-btn futuristic-btn">
                  Logout
                </button>
              </>
            )}

            {isAuthenticated() && getUserRole() === "user" && (
              <>
                <Link to="/user/cart" className="notification-btn futuristic-btn" aria-label={`Cart: ${cartItems.length} items`}>
                  <span className="btn-icon">🛒</span>
                  <span className="cart-count" aria-hidden="true">{cartItems.length}</span>
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
            ref={toggleRef}
            className="menu-toggle futuristic-btn"
            onClick={() => setIsMenuOpen((p) => !p)}
            onKeyDown={handleToggleKey}
            aria-expanded={isMenuOpen}
            aria-controls="main-nav-menu"
            aria-label="Toggle navigation menu"
          >
            <span className={`hamburger ${isMenuOpen ? "active" : ""}`}></span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

