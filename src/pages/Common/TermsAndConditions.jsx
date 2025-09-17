// TermsAndConditions.js
import React, { useState } from 'react';
import '../../CssFiles/common/TermsAndConditions.css';

const TermsAndConditions = () => {
  const [accepted, setAccepted] = useState(false);
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  // Handle scroll event to show/hide scroll to top button
  const handleScroll = (e) => {
    if (e.target.scrollTop > 300) {
      setShowScrollToTop(true);
    } else {
      setShowScrollToTop(false);
    }
  };

  // Scroll to top function
  const scrollToTop = () => {
    const termsContainer = document.querySelector('.terms-container');
    termsContainer.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="terms-page">
      <div className="terms-header">
        <h1>Terms and Conditions</h1>
        <p>Last Updated: {new Date().toLocaleDateString()}</p>
      </div>

      <div className="terms-container" onScroll={handleScroll}>
        <div className="terms-content">
          <section className="terms-section">
            <h2>1. Introduction</h2>
            <p>Welcome to our website. These terms and conditions outline the rules and regulations for the use of our Company's website.</p>
            <p>By accessing this website we assume you accept these terms and conditions. Do not continue to use this website if you do not agree to all the terms and conditions stated on this page.</p>
          </section>

          <section className="terms-section">
            <h2>2. Intellectual Property Rights</h2>
            <p>Other than the content you own, under these terms, our Company and/or its licensors own all the intellectual property rights and materials contained in this website.</p>
            <p>You are granted limited license only for purposes of viewing the material contained on this website.</p>
          </section>

          <section className="terms-section">
            <h2>3. Restrictions</h2>
            <p>You are specifically restricted from all of the following:</p>
            <ul>
              <li>Publishing any website material in any other media</li>
              <li>Selling, sublicensing and/or otherwise commercializing any website material</li>
              <li>Publicly performing and/or showing any website material</li>
              <li>Using this website in any way that is or may be damaging to this website</li>
              <li>Using this website in any way that impacts user access to this website</li>
              <li>Using this website contrary to applicable laws and regulations</li>
            </ul>
          </section>

          <section className="terms-section">
            <h2>4. Your Content</h2>
            <p>In these terms and conditions, "Your Content" shall mean any audio, video, text, images or other material you choose to display on this website.</p>
            <p>By displaying Your Content, you grant our Company a non-exclusive, worldwide, irrevocable, sublicensable license to use, reproduce, adapt, publish, translate and distribute it in any and all media.</p>
          </section>

          <section className="terms-section">
            <h2>5. No warranties</h2>
            <p>This website is provided "as is," with all faults, and our Company expresses no representations or warranties of any kind related to this website or the materials contained on this website.</p>
          </section>

          <section className="terms-section">
            <h2>6. Limitation of liability</h2>
            <p>In no event shall our Company, nor any of its officers, directors, and employees, be held liable for anything arising out of or in any way connected with your use of this website.</p>
          </section>

          <section className="terms-section">
            <h2>7. Indemnification</h2>
            <p>You hereby indemnify to the fullest extent our Company from and against any and/or all liabilities, costs, demands, causes of action, damages and expenses arising in any way related to your breach of any of the provisions of these terms.</p>
          </section>

          <section className="terms-section">
            <h2>8. Severability</h2>
            <p>If any provision of these terms is found to be invalid under any applicable law, such provisions shall be deleted without affecting the remaining provisions herein.</p>
          </section>

          <section className="terms-section">
            <h2>9. Variation of Terms</h2>
            <p>Our Company is permitted to revise these terms at any time as it sees fit, and by using this website you are expected to review these terms on a regular basis.</p>
          </section>

          <section className="terms-section">
            <h2>10. Governing Law & Jurisdiction</h2>
            <p>These terms will be governed by and interpreted in accordance with the laws of the State, and you submit to the non-exclusive jurisdiction of the state and federal courts located in the State for the resolution of any disputes.</p>
          </section>

          {/* <div className="acceptance-section">
            <label className="checkbox-container">
              <input 
                type="checkbox" 
                checked={accepted} 
                onChange={() => setAccepted(!accepted)} 
              />
              <span className="checkmark"></span>
              I have read and agree to the Terms and Conditions
            </label>
            <button 
              className={`accept-btn ${accepted ? 'active' : 'disabled'}`}
              disabled={!accepted}
            >
              Continue
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;