import React from 'react';
import '../../CssFiles/common/Home.css';
import Footer from '../../components/Footer';
import Hero from '../../components/Hero';
import { useNavigate } from 'react-router-dom';
import {isAuthenticated} from '../../utills/authService';


const Home = () => {
  const navigate = useNavigate();
  const isLoggedIn = isAuthenticated();

  return (
    <div className="home-container">
      {/* Hero Section */}
      <Hero />

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <h2 className="section-title">Why Choose Swanand Vibes?</h2>
          <div className="features-grid">
            <div className="feature-card">
              {/* <div className="feature-icon">🚀</div> */}
              <h3>Advanced E-Commerce</h3>
              <p>Shop from our curated collection of premium products with seamless checkout and fast delivery.</p>
            </div>
            <div className="feature-card">
              {/* <div className="feature-icon">🌐</div> */}
              <h3>12-Level MLM System</h3>
              <p>Build your network across 12 levels and earn commissions from each level's performance.</p>
            </div>
            <div className="feature-card">
              {/* <div className="feature-icon">💎</div> */}
              <h3>Premium Rewards</h3>
              <p>Earn not just commissions but also exclusive rewards, trips, and luxury items.</p>
            </div>
            <div className="feature-card">
              {/* <div className="feature-icon">🔒</div> */}
              <h3>Secure Platform</h3>
              <p>Advanced security measures to protect your data and transactions.</p>
            </div>
            <div className="feature-card">
              {/* <div className="feature-icon">📊</div> */}
              <h3>Analytics Dashboard</h3>
              <p>Track your team performance, earnings, and growth with detailed analytics.</p>
            </div>
            <div className="feature-card">
              {/* <div className="feature-icon">⚡</div> */}
              <h3>Fast Payouts</h3>
              <p>Get your commissions and rewards quickly with our efficient payout system.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Preview */}
      <section className="products-preview">
        <div className="container">
          <h2 className="section-title">Featured Products</h2>
          <div className="products-grid">
            <div className="product-card">
              <div className="product-image">
                <img  src="https://allspiritual.in/wp-content/uploads/2022/07/Untitled-2-2.jpg" alt="Premium Wellness Kit" />
              </div>
              <h3>Premium Wellness Kit</h3>
              <p className="product-price">₹129.99</p>
              <button onClick={() => navigate('/products')} className="btn-outline">View More Products</button>
            </div>
            <div className="product-card">
              <div className="product-image">
                <img src="https://allspiritual.in/wp-content/uploads/2022/07/Untitled-2-1-1.jpg" alt="Tech Gadgets Bundle" />
              </div>
              <h3>Tech Gadgets Bundle</h3>
              <p className="product-price">₹249.99</p>
              <button onClick={()=>navigate('/products')} className="btn-outline">View More Product</button>
            </div>
            <div className="product-card">
              <div className="product-image">
                <img src="https://allspiritual.in/wp-content/uploads/2022/07/Untitled-2-7.jpg" alt="Lifestyle Package" />
              </div>
              <h3>Lord Ganesha Silver Pendant</h3>
              <p className="product-price">₹179.99</p>
              <button onClick={() => navigate('/products')} className="btn-outline">View More Product</button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <h3>10K+</h3>
              <p>Active Users</p>
            </div>
            <div className="stat-item">
              <h3>$2M+</h3>
              <p>Commissions Paid</p>
            </div>
            <div className="stat-item">
              <h3>500+</h3>
              <p>Premium Products</p>
            </div>
            <div className="stat-item">
              <h3>12</h3>
              <p>MLM Levels</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}

     {!isLoggedIn ? (
       <section className="cta-section">
         <div className="container">
           <h2>Ready to Transform Your Financial Future?</h2>
           <p>Join thousands of successful members in our thriving community</p>
           <div className="cta-buttons">
             <button onClick={() => navigate('/register')} className="btn-primary">Create Account</button>
            <button onClick={() => navigate('/learn-more')} className="btn-outline-light">Learn More</button>
          </div>
        </div>
      </section>
     ) : null}

      <Footer />
    </div>
  );
};

export default Home;