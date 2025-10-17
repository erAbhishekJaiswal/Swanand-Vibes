// import React from 'react';
// import { useTranslation } from 'react-i18next';
// import '../../CssFiles/common/About.css';
// import Footer from '../../components/Footer';

// const About = () => {
//   const { t } = useTranslation();

//   return (
//     <div className="about-container">
//       {/* Hero Section */}
//       <section className="about-hero">
//         <div className="container">
//           <h1 className="hero-title">{t('hero_title')}</h1>
//           <p className="hero-subtitle">{t('hero_subtitle')}</p>
//         </div>
//       </section>

//       {/* Mission Section */}
//       <section className="mission-section">
//         <div className="container">
//           <div className="mission-content">
//             <div className="mission-text">
//               <h2>{t('mission_title')}</h2>
//               <p>{t('mission_desc')}</p>
//               <div className="mission-stats">
//                 <div className="mission-stat">
//                   <h4>2023</h4>
//                   <p>{t('year_established')}</p>
//                 </div>
//                 <div className="mission-stat">
//                   <h4>50+</h4>
//                   <p>{t('countries_served')}</p>
//                 </div>
//                 <div className="mission-stat">
//                   <h4>24/7</h4>
//                   <p>{t('support')}</p>
//                 </div>
//               </div>
//             </div>
//             <div className="mission-visual">
//               <div className="mission-image-container">
//                 <img src="https://cdn.pixabay.com/photo/2018/10/10/10/53/business-3736926_1280.jpg" alt="mission" className="mission-image" style={{ width: '100%', height: 'auto' }} />
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Team Section */}
//       {/* <section className="values-section">
//         <div className="container">
//           <h2 className="section-title">{t('leadership_team')}</h2>
        
//         </div>
//       </section> */}

//       {/* Values Section */}
//       <section className="team-section">
//         <div className="container">
//           <h2 className="section-title">{t('core_values')}</h2>
//           <div className="values-grid">
//             <div className="value-card">
//               <h3>{t('integrity')}</h3>
//               <p>{t('integrity_desc')}</p>
//             </div>
//             <div className="value-card">
//               <h3>{t('growth')}</h3>
//               <p>{t('growth_desc')}</p>
//             </div>
//             <div className="value-card">
//               <h3>{t('innovation')}</h3>
//               <p>{t('innovation_desc')}</p>
//             </div>
//             <div className="value-card">
//               <h3>{t('community')}</h3>
//               <p>{t('community_desc')}</p>
//             </div>
//           </div>
//         </div>
//       </section>

//       <Footer />
//     </div>
//   );
// };

// export default About;



import React from 'react';
import { useTranslation } from 'react-i18next';
import '../../CssFiles/common/About.css';
import Footer from '../../components/Footer';
import Logo from '../../assets/aboutuslogo.png';

const About = () => {
  const { t } = useTranslation();

  return (
    <div className="about-main-wrapper">
      <div className='image-section'>
        <img src={Logo} alt="logo" className='logo-of-aboutus'/>
      </div>

      {/* Hero Section */}
      {/* <section className="about-hero-section">
        <div className="about-container">
          <h1 className="about-hero-title">{t('hero_title')}</h1>
          <p className="about-hero-subtitle">{t('hero_subtitle')}</p>
        </div>
      </section> */}

      {/* About Us Section */}
      <section className="about-us-section">
        <div className="about-container about-flex">
          <div className="about-us-text">
            <h2>{t('about_us_title')}</h2>
            <p>{t('about_us_description_1')}</p>
            <p>{t('about_us_description_2')}</p>
          </div>
          <div className="about-us-image">
            <img src="https://cdn.pixabay.com/photo/2017/01/07/19/42/incense-1961430_1280.jpg" alt="Spiritual Harmony" />
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mission-highlight-section">
        <div className="about-container about-flex-reverse">
          <div className="mission-image-block">
            <img src="https://cdn.pixabay.com/photo/2016/11/08/05/22/buddhist-1807526_1280.jpg" alt="Meditation" />
          </div>
          <div className="mission-content-block">
            <h2>{t('mission_title')}</h2>
            <p>{t('mission_desc')}</p>
            <div className="mission-stats-row">
              <div className="stat-box">
                <h4>2025</h4>
                <p>{t('year_established')}</p>
              </div>
              <div className="stat-box">
                <h4>5+</h4>
                <p>{t('countries_served')}</p>
              </div>
              <div className="stat-box">
                <h4>24/7</h4>
                <p>{t('support')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Spiritual Companions Section */}
      <section className="spiritual-tools-section">
        <div className="about-container">
          <h2>{t('spiritual_companions_title')}</h2>
          <p>{t('spiritual_companions_desc')}</p>
          <div className="tools-grid">
            <div className="tool-card">
              <img src="https://cdn.pixabay.com/photo/2020/04/10/11/12/crystal-5025318_1280.jpg" alt="Crystals" />
              <h4>{t('crystals')}</h4>
            </div>
            <div className="tool-card">
              <img src="https://images.unsplash.com/photo-1650809652935-2e5002ba40bf?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=870" alt="Rudraksha" />
              <h4>{t('rudraksha')}</h4>
            </div>
            <div className="tool-card">
              <img src="https://cdn.pixabay.com/photo/2018/02/16/13/10/nature-3157664_1280.jpg" alt="Sacred Tools" />
              <h4>{t('sacred_tools')}</h4>
            </div>
          </div>
        </div>
      </section>

      {/* Crystals Importance Section */}
      <section className="importance-crystals-section">
        <div className="about-container about-flex">
          <div className="crystals-info-text">
            <h2>{t('importance_of_crystals_title')}</h2>
            <p>{t('importance_of_crystals_desc')}</p>
          </div>
          <div className="crystals-info-image">
            <img src="https://cdn.pixabay.com/photo/2020/04/10/11/12/crystal-5025318_1280.jpg" alt="Crystals" />
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="vision-section">
        <div className="about-container">
          <h2>{t('vision_title')}</h2>
          <p>{t('vision_desc_1')}</p>
          <p>{t('vision_desc_2')}</p>
          <h4 className="vision-tagline">{t('vision_tagline')}</h4>
        </div>
      </section>

      {/* Values Section */}
      <section className="core-values-section">
        <div className="about-container">
          <h2>{t('core_values')}</h2>
          <div className="core-values-grid">
            <div className="value-card">
              <h3>{t('integrity')}</h3>
              <p>{t('integrity_desc')}</p>
            </div>
            <div className="value-card">
              <h3>{t('growth')}</h3>
              <p>{t('growth_desc')}</p>
            </div>
            <div className="value-card">
              <h3>{t('innovation')}</h3>
              <p>{t('innovation_desc')}</p>
            </div>
            {/* <div className="value-card">
              <h3>{t('community')}</h3>
              <p>{t('community_desc')}</p>
            </div> */}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default About;
