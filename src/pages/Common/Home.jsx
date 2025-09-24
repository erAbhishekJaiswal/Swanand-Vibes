// import React from 'react';
// import '../../CssFiles/common/Home.css';
// import Footer from '../../components/Footer';
// import Hero from '../../components/Hero';
// import { useNavigate } from 'react-router-dom';
// import {isAuthenticated} from '../../utills/authService';
// import { useTranslation } from 'react-i18next';


// const Home = () => {
//   const { t } = useTranslation();
//   const navigate = useNavigate();
//   const isLoggedIn = isAuthenticated();

//   return (
//        <div className="home-container">
      

//       {/* Hero Section */}
//       <Hero />

//       {/* Features Section */}
//       <section className="features-section">
//         <div className="container">
//           <h2 className="section-title">{t("why_choose")}</h2>

//           <div className="features-grid">
//             <div className="feature-card">
//               <h3>{t("feature_ecommerce_title")}</h3>
//               <p>{t("feature_ecommerce_desc")}</p>
//             </div>
//             <div className="feature-card">
//               <h3>{t("feature_mlm_title")}</h3>
//               <p>{t("feature_mlm_desc")}</p>
//             </div>
//             <div className="feature-card">
//               <h3>{t("feature_rewards_title")}</h3>
//               <p>{t("feature_rewards_desc")}</p>
//             </div>
//             <div className="feature-card">
//               <h3>{t("feature_secure_title")}</h3>
//               <p>{t("feature_secure_desc")}</p>
//             </div>
//             <div className="feature-card">
//               <h3>{t("feature_dashboard_title")}</h3>
//               <p>{t("feature_dashboard_desc")}</p>
//             </div>
//             <div className="feature-card">
//               <h3>{t("feature_payouts_title")}</h3>
//               <p>{t("feature_payouts_desc")}</p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Products Preview */}
//       <section className="products-preview">
//         <div className="container">
//           <h2 className="section-title">{t("featured_products")}</h2>
//           <div className="products-grid">
//             <div className="product-card">
//               <div className="product-image">
//                 <img src="https://allspiritual.in/wp-content/uploads/2022/07/Untitled-2-2.jpg" alt={t("product_wellness")} />
//               </div>
//               <h3>{t("product_wellness")}</h3>
//               <p className="product-price">₹129.99</p>
//               <button onClick={() => navigate('/products')} className="btn-outline">
//                 {t("view_more")}
//               </button>
//             </div>
//             <div className="product-card">
//               <div className="product-image">
//                 <img src="https://allspiritual.in/wp-content/uploads/2022/07/Untitled-2-1-1.jpg" alt={t("product_tech")} />
//               </div>
//               <h3>{t("product_tech")}</h3>
//               <p className="product-price">₹249.99</p>
//               <button onClick={() => navigate('/products')} className="btn-outline">
//                 {t("view_more")}
//               </button>
//             </div>
//             <div className="product-card">
//               <div className="product-image">
//                 <img src="https://allspiritual.in/wp-content/uploads/2022/07/Untitled-2-7.jpg" alt={t("product_ganesha")} />
//               </div>
//               <h3>{t("product_ganesha")}</h3>
//               <p className="product-price">₹179.99</p>
//               <button onClick={() => navigate('/products')} className="btn-outline">
//                 {t("view_more")}
//               </button>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Stats Section */}
//       <section className="stats-section">
//         <div className="container">
//           <div className="stats-grid">
//             <div className="stat-item">
//               <h3>10K+</h3>
//               <p>{t("stats_users")}</p>
//             </div>
//             <div className="stat-item">
//               <h3>$2M+</h3>
//               <p>{t("stats_commissions")}</p>
//             </div>
//             <div className="stat-item">
//               <h3>500+</h3>
//               <p>{t("stats_products")}</p>
//             </div>
//             <div className="stat-item">
//               <h3>12</h3>
//               <p>{t("stats_levels")}</p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       {!isLoggedIn && (
//         <section className="cta-section">
//           <div className="container">
//             <h2>{t("cta_title")}</h2>
//             <p>{t("cta_desc")}</p>
//             <div className="cta-buttons">
//               <button onClick={() => navigate('/register')} className="btn-primary">
//                 {t("cta_register")}
//               </button>
//               <button onClick={() => navigate('/about')} className="btn-outline-light">
//                 {t("cta_learn")}
//               </button>
//             </div>
//           </div>
//         </section>
//       )}

//       <Footer />
//     </div>
//   );
// };

// export default Home;


import React from 'react';
import '../../CssFiles/common/Home.css';
import Footer from '../../components/Footer';
import Hero from '../../components/Hero';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../../utills/authService';
import { useTranslation } from 'react-i18next';
import { FiShoppingBag, FiUsers, FiAward, FiShield, FiBarChart2, FiDollarSign, FiStar, FiArrowRight } from 'react-icons/fi';

const Home = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const isLoggedIn = isAuthenticated();

  const features = [
    {
      icon: <FiShoppingBag className="homepage-feature-icon" />,
      title: t("feature_ecommerce_title"),
      description: t("feature_ecommerce_desc")
    },
    {
      icon: <FiUsers className="homepage-feature-icon" />,
      title: t("feature_mlm_title"),
      description: t("feature_mlm_desc")
    },
    {
      icon: <FiAward className="homepage-feature-icon" />,
      title: t("feature_rewards_title"),
      description: t("feature_rewards_desc")
    },
    {
      icon: <FiShield className="homepage-feature-icon" />,
      title: t("feature_secure_title"),
      description: t("feature_secure_desc")
    },
    {
      icon: <FiBarChart2 className="homepage-feature-icon" />,
      title: t("feature_dashboard_title"),
      description: t("feature_dashboard_desc")
    },
    {
      icon: <FiDollarSign className="homepage-feature-icon" />,
      title: t("feature_payouts_title"),
      description: t("feature_payouts_desc")
    }
  ];

  const products = [
    {
      image: "https://allspiritual.in/wp-content/uploads/2022/07/Untitled-2-2.jpg",
      name: t("product_wellness"),
      price: "₹129.99",
      category: "Wellness"
    },
    {
      image: "https://allspiritual.in/wp-content/uploads/2022/07/Untitled-2-1-1.jpg",
      name: t("product_tech"),
      price: "₹249.99",
      category: "Technology"
    },
    {
      image: "https://allspiritual.in/wp-content/uploads/2022/07/Untitled-2-7.jpg",
      name: t("product_ganesha"),
      price: "₹179.99",
      category: "Spiritual"
    }
  ];

  const stats = [
    { value: "10K+", label: t("stats_users"), icon: <FiUsers /> },
    { value: "$2M+", label: t("stats_commissions"), icon: <FiDollarSign /> },
    { value: "500+", label: t("stats_products"), icon: <FiShoppingBag /> },
    { value: "12", label: t("stats_levels"), icon: <FiBarChart2 /> }
  ];

  return (
    <div className="homepage-container">
      {/* Hero Section */}
      <Hero />

      {/* Features Section */}
      <section className="homepage-features-section">
        <div className="homepage-container-inner">
          <div className="homepage-section-header">
            <h2 className="homepage-section-title">{t("why_choose")}</h2>
            <p className="homepage-section-subtitle">Discover what makes our platform unique</p>
          </div>

          <div className="homepage-features-grid">
            {features.map((feature, index) => (
              <div key={index} className="homepage-feature-card">
                <div className="homepage-feature-icon-container">
                  {feature.icon}
                </div>
                <h3 className="homepage-feature-title">{feature.title}</h3>
                <p className="homepage-feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Preview */}
      <section className="homepage-products-section">
        <div className="homepage-container-inner">
          <div className="homepage-section-header">
            <h2 className="homepage-section-title">{t("featured_products")}</h2>
            <p className="homepage-section-subtitle">Explore our handpicked collection</p>
          </div>

          <div className="homepage-products-grid">
            {products.map((product, index) => (
              <div key={index} className="homepage-product-card">
                <div className="homepage-product-image-container">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="homepage-product-image"
                  />
                  <div className="homepage-product-category">{product.category}</div>
                </div>
                <div className="homepage-product-info">
                  <h3 className="homepage-product-name">{product.name}</h3>
                  <div className="homepage-product-price">{product.price}</div>
                  <div className="homepage-product-rating">
                    <FiStar className="homepage-rating-star" />
                    <FiStar className="homepage-rating-star" />
                    <FiStar className="homepage-rating-star" />
                    <FiStar className="homepage-rating-star" />
                    <FiStar className="homepage-rating-star" />
                    <span className="homepage-rating-text">(4.8)</span>
                  </div>
                </div>
                <button 
                  onClick={() => navigate('/products')} 
                  className="homepage-product-button"
                >
                  View Details <FiArrowRight />
                </button>
              </div>
            ))}
          </div>

          <div className="homepage-products-actions">
            <button 
              onClick={() => navigate('/products')}
              className="homepage-view-all-button"
            >
              View All Products <FiArrowRight />
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="homepage-stats-section">
        <div className="homepage-container-inner">
          <div className="homepage-stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="homepage-stat-item">
                <div className="homepage-stat-icon">{stat.icon}</div>
                <div className="homepage-stat-content">
                  <h3 className="homepage-stat-value">{stat.value}</h3>
                  <p className="homepage-stat-label">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {!isLoggedIn && (
        <section className="homepage-cta-section">
          <div className="homepage-container-inner">
            <div className="homepage-cta-content">
              <h2 className="homepage-cta-title">{t("cta_title")}</h2>
              <p className="homepage-cta-description">{t("cta_desc")}</p>
              <div className="homepage-cta-buttons">
                <button 
                  onClick={() => navigate('/register')} 
                  className="homepage-cta-button-primary"
                >
                  {t("cta_register")}
                </button>
                <button 
                  onClick={() => navigate('/about')} 
                  className="homepage-cta-button-secondary"
                >
                  {t("cta_learn")}
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default Home;