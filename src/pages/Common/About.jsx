// import React from 'react'

// const About = () => {
//   return (
//     <div>
//         <h1>About Us</h1>
//         <p>Welcome to the About page!</p>
//     </div>
//   )
// }

// export default About












// About.js
import React from 'react';
import '../../CssFiles/common/About.css';
import Footer from '../../components/Footer';
const About = () => {

  return (
    <div className="about-container">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <h1 className="hero-title">About Swanand Vibes</h1>
          <p className="hero-subtitle">
            Revolutionizing e-commerce with a integrated multi-level marketing ecosystem
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mission-section">
        <div className="container">
          <div className="mission-content">
            <div className="mission-text">
              <h2>Our Mission</h2>
              <p>
                At Swanand Vibes, we're committed to creating opportunities for financial growth 
                through our unique combination of premium e-commerce products and a sophisticated 
                12-level MLM reward system. We believe in empowering individuals to build sustainable 
                income streams while providing exceptional value to our customers.
              </p>
              <div className="mission-stats">
                <div className="mission-stat">
                  <h4>2023</h4>
                  <p>Year Established</p>
                </div>
                <div className="mission-stat">
                  <h4>50+</h4>
                  <p>Countries Served</p>
                </div>
                <div className="mission-stat">
                  <h4>24/7</h4>
                  <p>Support</p>
                </div>
              </div>
            </div>
            <div className="mission-visual">

              <div className="mission-image-container">
                <img src="https://cdn.pixabay.com/photo/2018/10/10/10/53/business-3736926_1280.jpg" alt="mission" className="mission-image" style={{ width: '100%', height: 'auto' }} />
              </div>
              {/* <div className="floating-shapes">
                <div className="shape shape-1"></div>
                <div className="shape shape-2"></div>
                <div className="shape shape-3"></div>
              </div> */}
            </div>
          </div>
        </div>
      </section>

      {/* MLM System Section */}
      <section className="mlm-system">
        <div className="container">
          <h2 className="section-title">The 12-Level MLM Advantage</h2>
          <div className="mlm-content">
            <div className="mlm-visual">
              <div className="level-chart">
                <div className="level level-1">Level 1</div>
                <div className="connector"></div>
                <div className="level level-2">Level 2</div>
                <div className="connector"></div>
                <div className="level level-3">Level 3</div>
                <div className="connector"></div>
                <div className="level level-4">Level 4</div>
                <div className="connector"></div>
                <div className="level level-5">Level 5</div>
                <div className="connector"></div>
                <div className="level level-6">Level 6</div>
                <div className="connector"></div>
                <div className="level level-7">Level 7</div>
                <div className="connector"></div>
                <div className="level level-8">Level 8</div>
                <div className="connector"></div>
                <div className="level level-9">Level 9</div>
                <div className="connector"></div>
                <div className="level level-10">Level 10</div>
                <div className="connector"></div>
                <div className="level level-11">Level 11</div>
                <div className="connector"></div>
                <div className="level level-12">Level 12</div>
              </div>
            </div>
            <div className="mlm-info">
              <h3>Earn Across All Levels</h3>
              <p>
                Our unique 12-level system allows you to earn commissions not just from your direct 
                referrals, but from the entire network across all 12 levels. This creates exponential 
                earning potential as your network grows.
              </p>
              <ul className="mlm-features">
                <li>✅ Commission on personal sales</li>
                <li>✅ Team override commissions</li>
                <li>✅ Leadership bonuses</li>
                <li>✅ Performance incentives</li>
                <li>✅ Rank advancement rewards</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <div className="container">
          <h2 className="section-title">Leadership Team</h2>
          <div className="team-grid">
            <div className="team-member">
              <div className="member-image">
                <img src="https://cdn.pixabay.com/photo/2023/09/24/21/09/ai-generated-8273849_960_720.jpg" alt="team member" className='member-image' />
              </div>
              <h3>Alex Johnson</h3>
              <p>Founder & CEO</p>
            </div>
            <div className="team-member">
              <div className="member-image">
                <img src="https://cdn.pixabay.com/photo/2024/08/31/21/30/ai-generated-9012418_1280.png" alt="team member" className='member-image' />
              </div>
              <h3>Sarah Chen</h3>
              <p>MLM System Architect</p>
            </div>
            <div className="team-member">
              <div className="member-image">
                <img src="https://cdn.pixabay.com/photo/2023/08/24/21/48/ai-generated-8211716_1280.jpg" alt="team member" className='member-image' />
              </div>
              <h3>Marcus Rivera</h3>
              <p>E-Commerce Director</p>
            </div>
            <div className="team-member">
              <div className="member-image">
                <img src="https://cdn.pixabay.com/photo/2023/12/04/06/14/ai-generated-8428762_1280.jpg" alt="team member" className='member-image' />
              </div>
              <h3>Lisa Zhang</h3>
              <p>Technology Lead</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section">
        <div className="container">
          <h2 className="section-title">Our Core Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">🤝</div>
              <h3>Integrity</h3>
              <p>We operate with transparency and honesty in all our dealings.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">🌱</div>
              <h3>Growth</h3>
              <p>We're committed to the personal and financial growth of our members.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">💡</div>
              <h3>Innovation</h3>
              <p>Continuously improving our platform and MLM system.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">👥</div>
              <h3>Community</h3>
              <p>Building a supportive network that helps everyone succeed.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;