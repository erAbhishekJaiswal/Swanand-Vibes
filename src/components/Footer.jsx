// Footer.js
import React from 'react';
import './css/common.css';

const Footer = () => {
  return (
    <footer className="footer futuristic-footer">
      <div className="footer-content">
        <div className="footer-section">
          <h4>NEXUS Systems</h4>
          <p>Redefining the future of digital experiences</p>
          <div className="social-links">
            <a href="#" className="social-link">𝕏</a>
            <a href="#" className="social-link">📷</a>
            <a href="#" className="social-link">📱</a>
            <a href="#" className="social-link">💼</a>
          </div>
        </div>
        
        <div className="footer-section">
          <h5>Products</h5>
          <a href="#">NEXUS Core</a>
          <a href="#">NEXUS AI</a>
          <a href="#">NEXUS Cloud</a>
          <a href="#">NEXUS Security</a>
        </div>
        
        <div className="footer-section">
          <h5>Resources</h5>
          <a href="#">Documentation</a>
          <a href="#">Tutorials</a>
          <a href="#">API Reference</a>
          <a href="#">Community</a>
        </div>
        
        <div className="footer-section">
          <h5>Company</h5>
          <a href="#">About Us</a>
          <a href="#">Careers</a>
          <a href="#">Contact</a>
          <a href="#">Privacy Policy</a>
        </div>
      </div>
      
      <div className="footer-bottom">
        <div className="footer-divider"></div>
        <div className="bottom-content">
          <p>© 2023 NEXUS Systems. All rights reserved.</p>
          <div className="footer-links">
            <a href="#">Terms of Service</a>
            <a href="#">Privacy Policy</a>
            <a href="#">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;