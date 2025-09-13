// import React, { useEffect, useState } from "react";
// import "./css/Hero.css";
// import { useNavigate } from "react-router-dom";

// const slides = [
//   {
//     icon: "🛒",
//     title: "E-Commerce",
//     text: "Premium products",
//   },
//   {
//     icon: "👥",
//     title: "MLM Network",
//     text: "12-level system",
//   },
//   {
//     icon: "💰",
//     title: "Commissions",
//     text: "Earn unlimited rewards",
//   },
//   {
//     icon: "🚀",
//     title: "Growth",
//     text: "Expand your business",
//   },
// ];

// const Hero = () => {
//   const [current, setCurrent] = useState(0);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrent((prev) => (prev + 1) % slides.length);
//     }, 3000); // Change slide every 3s
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <section className="hero-section">
//       <div className="hero-content">
//         {/* Left Side Text */}
//         <div className="hero-text">
//           <h1 className="hero-title">
//             Welcome to <span className="brand-gradient">Swanand Vibes</span>
//           </h1>
//           <p className="hero-subtitle">
//             Experience the future of e-commerce with our integrated 12-level MLM
//             rewards system. Shop products, build your network, and earn unlimited
//             commissions.
//           </p>
//           <div className="hero-actions">
//             <button onClick={() => navigate('/products')} className="btn-primary">Start Shopping</button>
//             <button onClick={() => navigate('/about')} className="btn-secondary">Learn More</button>
//             {/* <button onClick={() => navigate('/register')} className="btn-secondary">Join MLM Network</button> */}
//           </div>
//         </div>

//         {/* Right Side Auto Slider */}
//         <div className="hero-visual">
//           <div className="slider">
//             {slides.map((slide, index) => (
//               <div
//                 key={index}
//                 className={`slide ${index === current ? "active" : ""}`}
//               >
//                 <div className="card-icon">{slide.icon}</div>
//                 <h4>{slide.title}</h4>
//                 <p>{slide.text}</p>
//               </div>
//             ))}
//           </div>
//           {/* Dots Indicator */}
//           <div className="dots">
//             {slides.map((_, index) => (
//               <span
//                 key={index}
//                 className={`dot ${index === current ? "active-dot" : ""}`}
//                 onClick={() => setCurrent(index)}
//               ></span>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Background Effects */}
//       <div className="hero-background">
//         <div className="glowing-orbs">
//           <div className="orb orb-1"></div>
//           <div className="orb orb-2"></div>
//           <div className="orb orb-3"></div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Hero;




import React, { useEffect, useState } from "react";
import "./css/Hero.css";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const slides = [
  {
    icon: "🛒",
    titleKey: "hero_slide_ecommerce_title",
    textKey: "hero_slide_ecommerce_text",
  },
  {
    icon: "👥",
    titleKey: "hero_slide_mlm_title",
    textKey: "hero_slide_mlm_text",
  },
  {
    icon: "💰",
    titleKey: "hero_slide_commission_title",
    textKey: "hero_slide_commission_text",
  },
  {
    icon: "🚀",
    titleKey: "hero_slide_growth_title",
    textKey: "hero_slide_growth_text",
  },
];

const Hero = () => {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="hero-section">
      <div className="hero-content">
        {/* Left Side Text */}
        <div className="hero-text">
          <h1 className="hero-title">
            {t("hero_welcome")}{" "}
            <span className="brand-gradient">Swanand Vibes</span>
          </h1>
          <p className="hero-subtitle">{t("hero_description")}</p>
          <div className="hero-actions">
            <button
              onClick={() => navigate("/products")}
              className="btn-primary"
            >
              {t("hero_start_shopping")}
            </button>
            <button
              onClick={() => navigate("/about")}
              className="btn-secondary"
            >
              {t("hero_learn_more")}
            </button>
          </div>
        </div>

        {/* Right Side Auto Slider */}
        <div className="hero-visual">
          <div className="slider">
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`slide ${index === current ? "active" : ""}`}
              >
                <div className="card-icon">{slide.icon}</div>
                <h4>{t(slide.titleKey)}</h4>
                <p>{t(slide.textKey)}</p>
              </div>
            ))}
          </div>

          {/* Dots Indicator */}
          <div className="dots">
            {slides.map((_, index) => (
              <span
                key={index}
                className={`dot ${index === current ? "active-dot" : ""}`}
                onClick={() => setCurrent(index)}
              ></span>
            ))}
          </div>
        </div>
      </div>

      {/* Background Effects */}
      <div className="hero-background">
        <div className="glowing-orbs">
          <div className="orb orb-1"></div>
          <div className="orb orb-2"></div>
          <div className="orb orb-3"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
