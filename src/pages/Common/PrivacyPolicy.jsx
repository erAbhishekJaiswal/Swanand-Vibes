// PrivacyPolicy.js
import React, { useState } from 'react';
import '../../CssFiles/common/PrivacyPolicy.css';
import Footer from '../../components/Footer';

const PrivacyPolicy = () => {
  const [activeSection, setActiveSection] = useState('introduction');
  const [searchTerm, setSearchTerm] = useState('');

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const policySections = [
    { id: 'introduction', title: 'Introduction' },
    { id: 'data-collection', title: 'Data Collection' },
    { id: 'data-usage', title: 'Data Usage' },
    { id: 'data-protection', title: 'Data Protection' },
    { id: 'cookies', title: 'Cookies' },
    { id: 'user-rights', title: 'Your Rights' },
    { id: 'policy-changes', title: 'Policy Changes' },
    { id: 'contact', title: 'Contact Us' }
  ];

  return (
    <div className="privacy-policy-page">
      <header className="policy-header">
        <div className="header-content">
          <h1>Privacy Policy</h1>
          <p>Last updated: {new Date().toLocaleDateString()}</p>
          {/* <div className="search-box">
            <input
              type="text"
              placeholder="Search in policy..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="search-btn">🔍</button>
          </div> */}
        </div>
      </header>

      <div className="policy-container">
        {/* <aside className="policy-sidebar">
          <h3>Policy Sections</h3>
          <ul>
            {policySections.map((section) => (
              <li key={section.id}>
                <button
                  className={activeSection === section.id ? 'active' : ''}
                  onClick={() => scrollToSection(section.id)}
                >
                  {section.title}
                </button>
              </li>
            ))}
          </ul>
        </aside> */}

        <main className="policy-content">
          <section id="introduction" className="policy-section">
            <h2>1. Introduction</h2>
            <p>Welcome to our Privacy Policy. Your privacy is critically important to us. This policy describes how we collect, use, and share your personal information when you use our services.</p>
            <p>This Privacy Policy applies to all users of our services, and by using our services, you consent to the collection and use of information in accordance with this policy.</p>
          </section>

          <section id="data-collection" className="policy-section">
            <h2>2. Data Collection</h2>
            <p>We collect information that you provide directly to us, including when you create an account, use our services, or communicate with us. The types of information we may collect include:</p>
            <ul>
              <li><strong>Personal Information:</strong> Name, email address, phone number, and other contact details.</li>
              <li><strong>Account Information:</strong> Username, password, and other credentials.</li>
              <li><strong>Payment Information:</strong> Credit card details, billing address, and transaction history.</li>
              <li><strong>Usage Information:</strong> Information about how you use our services.</li>
              <li><strong>Device Information:</strong> IP address, browser type, and operating system.</li>
            </ul>
          </section>

          <section id="data-usage" className="policy-section">
            <h2>3. How We Use Your Data</h2>
            <p>We use the information we collect for various purposes, including to:</p>
            <div className="usage-grid">
              <div className="usage-card">
                <div className="card-icon">🚀</div>
                <h4>Provide Services</h4>
                <p>Deliver and maintain our services, process transactions, and provide customer support.</p>
              </div>
              <div className="usage-card">
                <div className="card-icon">📊</div>
                <h4>Improve Services</h4>
                <p>Understand how our services are used and develop new features and improvements.</p>
              </div>
              <div className="usage-card">
                <div className="card-icon">📱</div>
                <h4>Communicate</h4>
                <p>Send service-related announcements, updates, and marketing communications.</p>
              </div>
              <div className="usage-card">
                <div className="card-icon">🔒</div>
                <h4>Security</h4>
                <p>Detect, prevent, and address technical issues and unauthorized access to our services.</p>
              </div>
            </div>
          </section>

          <section id="data-protection" className="policy-section">
            <h2>4. Data Protection</h2>
            <p>We implement appropriate technical and organizational measures to protect your personal information against unauthorized or unlawful processing, accidental loss, destruction, or damage.</p>
            <div className="protection-measures">
              <h4>Security Measures Include:</h4>
              <ul>
                <li>Encryption of data in transit and at rest</li>
                <li>Regular security assessments and testing</li>
                <li>Access controls and authentication mechanisms</li>
                <li>Employee training on data protection</li>
                <li>Incident response plans</li>
              </ul>
            </div>
          </section>

          <section id="cookies" className="policy-section">
            <h2>5. Cookies and Tracking Technologies</h2>
            <p>We use cookies and similar tracking technologies to track activity on our service and hold certain information.</p>
            <div className="cookie-types">
              <div className="cookie-type">
                <h4>Essential Cookies</h4>
                <p>Required for the operation of our service. They enable basic functions like page navigation and access to secure areas.</p>
              </div>
              <div className="cookie-type">
                <h4>Analytical/Performance Cookies</h4>
                <p>Allow us to recognize and count the number of visitors and see how visitors move around our website.</p>
              </div>
              <div className="cookie-type">
                <h4>Functionality Cookies</h4>
                <p>Used to recognize you when you return to our website and enable personalized features.</p>
              </div>
              <div className="cookie-type">
                <h4>Targeting Cookies</h4>
                <p>Record your visit to our website, the pages you have visited, and the links you have followed.</p>
              </div>
            </div>
          </section>

          <section id="user-rights" className="policy-section">
            <h2>6. Your Rights</h2>
            <p>Depending on your location, you may have the following rights regarding your personal information:</p>
            <div className="rights-container">
              <div className="rights-column">
                <h4>Access & Portability</h4>
                <ul>
                  <li>Right to access your personal data</li>
                  <li>Right to data portability</li>
                  <li>Right to know how we process your data</li>
                </ul>
              </div>
              <div className="rights-column">
                <h4>Control & Objection</h4>
                <ul>
                  <li>Right to correct inaccurate data</li>
                  <li>Right to object to processing</li>
                  <li>Right to restrict processing</li>
                </ul>
              </div>
              <div className="rights-column">
                <h4>Deletion & Complaints</h4>
                <ul>
                  <li>Right to be forgotten</li>
                  <li>Right to withdraw consent</li>
                  <li>Right to lodge complaints</li>
                </ul>
              </div>
            </div>
          </section>

          <section id="policy-changes" className="policy-section">
            <h2>7. Policy Changes</h2>
            <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.</p>
            <p>You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.</p>
          </section>

          <section id="contact" className="policy-section">
            <h2>8. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us:</p>
            <div className="contact-methods">
              <div className="contact-method">
                <h4>Email</h4>
                <p>privacy@company.com</p>
              </div>
              <div className="contact-method">
                <h4>Postal Address</h4>
                <p>123 Privacy Lane, Data Protection City, DP 12345</p>
              </div>
              <div className="contact-method">
                <h4>Phone</h4>
                <p>+1 (555) 123-4567</p>
              </div>
            </div>
          </section>

          {/* <div className="policy-actions">
            <button className="download-btn">Download Policy (PDF)</button>
            <button className="print-btn" onClick={() => window.print()}>Print Policy</button>
          </div> */}
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;