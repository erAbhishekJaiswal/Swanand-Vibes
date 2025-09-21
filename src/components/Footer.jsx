// Footer.js
import React from 'react';
import './css/common.css';
import {Link} from 'react-router-dom';
import { SlSocialInstagram } from "react-icons/sl";
import { SlSocialYoutube } from "react-icons/sl";
import { TiSocialFacebook } from "react-icons/ti";
import { FaSquareXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="footer futuristic-footer">
      <div className="footer-content">
        <div className="footer-section">
          <h4>Swanand Vibes</h4>
          <p>Redefining the future of digital experiences</p>
          <div className="social-links">
            <Link to="https://x.com/" className="social-link"><FaSquareXTwitter /></Link>
            <Link to="https://www.instagram.com/" className="social-link"><SlSocialInstagram /></Link>
            <Link to="https://www.facebook.com/" className="social-link"><TiSocialFacebook /></Link>
            <Link to="https://www.youtube.com/" className="social-link"><SlSocialYoutube /></Link>
          </div>
        </div>
        
        <div className="footer-section">
          <h5>Products</h5>
          <Link to="/products" className="footer-link">Swanand Vibes Agarbati</Link>
          <Link to="/products" className="footer-link">Swanand Vibes Spiritual</Link>
          <Link to="/products" className="footer-link">Swanand Vibes Incense</Link>
          <Link to="/products" className="footer-link">Swanand Vibes </Link>
        </div>
        
        {/* <div className="footer-section">
          <h5>Resources</h5>
          <a href="#">Documentation</a>
          <a href="#">Tutorials</a>
          <a href="#">API Reference</a>
          <a href="#">Community</a>
        </div> */}
        
        <div className="footer-section">
          <h5>Company</h5>
          <Link to="/" className="footer-link">Home</Link>
          <Link to="/about" className="footer-link">About Us</Link>
          {/* <Link to="/careers" className="footer-link">Careers</Link> */}
          <Link to="/contact" className="footer-link">Contact</Link>
          {/* <Link to="/policy" className="footer-link">Privacy Policy</Link> */}
        </div>
      </div>
      
      <div className="footer-bottom">
        <div className="footer-divider"></div>
        <div className="bottom-content">
          <p>©2025 by Swanand Vibes. All rights reserved . Developed and designed by Kumarinfotech.</p>
          {/* <div className="footer-links">
            <Link to="/terms" className="footer-link">Terms of Service</Link>
            <Link to="/policy" className="footer-link">Privacy Policy</Link>
            <Link to="/cookies" className="footer-link">Cookie Policy</Link>
          </div> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;