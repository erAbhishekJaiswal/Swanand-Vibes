import React from 'react';
import { useTranslation } from 'react-i18next';
import '../../CssFiles/common/About.css';
import Footer from '../../components/Footer';

const About = () => {
  const { t } = useTranslation();

  return (
    <div className="about-container">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <h1 className="hero-title">{t('hero_title')}</h1>
          <p className="hero-subtitle">{t('hero_subtitle')}</p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mission-section">
        <div className="container">
          <div className="mission-content">
            <div className="mission-text">
              <h2>{t('mission_title')}</h2>
              <p>{t('mission_desc')}</p>
              <div className="mission-stats">
                <div className="mission-stat">
                  <h4>2023</h4>
                  <p>{t('year_established')}</p>
                </div>
                <div className="mission-stat">
                  <h4>50+</h4>
                  <p>{t('countries_served')}</p>
                </div>
                <div className="mission-stat">
                  <h4>24/7</h4>
                  <p>{t('support')}</p>
                </div>
              </div>
            </div>
            <div className="mission-visual">
              <div className="mission-image-container">
                <img src="https://cdn.pixabay.com/photo/2018/10/10/10/53/business-3736926_1280.jpg" alt="mission" className="mission-image" style={{ width: '100%', height: 'auto' }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      {/* <section className="values-section">
        <div className="container">
          <h2 className="section-title">{t('leadership_team')}</h2>
        
        </div>
      </section> */}

      {/* Values Section */}
      <section className="team-section">
        <div className="container">
          <h2 className="section-title">{t('core_values')}</h2>
          <div className="values-grid">
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
            <div className="value-card">
              <h3>{t('community')}</h3>
              <p>{t('community_desc')}</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
