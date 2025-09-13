// Contact.js
// import React, { useState } from "react";
// import Footer from "../../components/Footer";
// import { useNavigate } from "react-router-dom";
// import "../../CssFiles/common/Contact.css";
// import { toast } from "react-hot-toast";
// import Spinner from "../../components/Spinner";
// import { isAuthenticated } from "../../utills/authService";
// import {contactcreate} from '../../utills/apicall'
// import axios from "axios";

// const Contact = () => {
//   const navigate = useNavigate();
//   const isLoggedIn = isAuthenticated();

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     subject: "",
//     message: "",
//   });
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     // Handle form submission
//     console.log(formData);
//     // const res = await axios.post("/api/contact/", formData )
//     const res = await contactcreate(formData);
//     console.log(res);
//     toast.success("Thank you for your message! We will get back to you soon.");
//     setFormData({
//       name: "",
//       email: "",
//       phone: "",
//       subject: "",
//       message: "",
//     });
//     setLoading(false);
//   };

//   return (
//     <div className="contact-container">
//       {/* Hero Section */}
//       <section className="contact-hero">
//         <div className="container">
//           <h1 className="hero-title">Get In Touch</h1>
//           <p className="hero-subtitle">
//             We'd love to hear from you. Reach out to us for questions, support,
//             or partnership opportunities.
//           </p>
//         </div>
//       </section>

//       <div className="contact-content">
//         <div className="container">
//           <div className="contact-grid">
//             {/* Contact Information */}
//             <div className="contact-info">
//               <h2>Contact Information</h2>
//               <p>
//                 Fill out the form or contact us directly using the information
//                 below
//               </p>

//               <div className="contact-methods">
//                 <div className="contact-method">
//                   <div className="method-icon">📧</div>
//                   <div className="method-info">
//                     <h3>Email</h3>
//                     <p>support@swanandvibes.com</p>
//                     <p>info@swanandvibes.com</p>
//                   </div>
//                 </div>

//                 <div className="contact-method">
//                   <div className="method-icon">📞</div>
//                   <div className="method-info">
//                     <h3>Phone</h3>
//                     <p>+1 (555) 123-4567</p>
//                     <p>+1 (555) 987-6543</p>
//                   </div>
//                 </div>

//                 <div className="contact-method">
//                   <div className="method-icon">📍</div>
//                   <div className="method-info">
//                     <h3>Address</h3>
//                     <p>123 Business Avenue</p>
//                     <p>Suite 456, Tech District</p>
//                     <p>San Francisco, CA 94107</p>
//                   </div>
//                 </div>

//                 <div className="contact-method">
//                   <div className="method-icon">🕒</div>
//                   <div className="method-info">
//                     <h3>Hours</h3>
//                     <p>Monday - Friday: 9AM - 6PM</p>
//                     <p>Saturday: 10AM - 4PM</p>
//                     <p>Sunday: Closed</p>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Contact Form */}
//             <div className="contact-form-container">
//               <h2>Send us a Message</h2>
//               {loading ? (
//                 <div className="loader">
//                 <Spinner size="lg"/>
//                 </div>
//               ) : (
//                 <form className="contact-form" onSubmit={handleSubmit}>
//                   <div className="form-row">
//                     <div className="form-group">
//                       <label htmlFor="name">Full Name *</label>
//                       <input
//                         type="text"
//                         id="name"
//                         name="name"
//                         value={formData.name}
//                         onChange={handleChange}
//                         required
//                       />
//                     </div>
//                     <div className="form-group">
//                       <label htmlFor="email">Email Address *</label>
//                       <input
//                         type="email"
//                         id="email"
//                         name="email"
//                         value={formData.email}
//                         onChange={handleChange}
//                         required
//                       />
//                     </div>
//                     <div className="form-group">
//                       <label htmlFor="name">Phone Number *</label>
//                       <input
//                         type="text"
//                         id="phone"
//                         name="phone"
//                         value={formData.phone}
//                         onChange={handleChange}
//                         required
//                       />
//                     </div>
//                   </div>

//                   <div className="form-group">
//                     <label htmlFor="subject">Subject *</label>
//                     <input
//                       type="text"
//                       id="subject"
//                       name="subject"
//                       value={formData.subject}
//                       onChange={handleChange}
//                       required
//                     />
//                   </div>

//                   <div className="form-group">
//                     <label htmlFor="message">Message *</label>
//                     <textarea
//                       id="message"
//                       name="message"
//                       rows="5"
//                       value={formData.message}
//                       onChange={handleChange}
//                       required
//                     ></textarea>
//                   </div>

//                   <button type="submit" className="btn-primary">
//                     Send Message
//                   </button>
//                 </form>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* FAQ Section */}
//       <section className="faq-section">
//         <div className="container">
//           <h2 className="section-title">Frequently Asked Questions</h2>
//           <div className="faq-grid">
//             <div className="faq-item">
//               <h3>How does the 12-level MLM system work?</h3>
//               <p>
//                 Our MLM system allows you to earn commissions across 12 levels
//                 of your network. You earn from direct referrals and the entire
//                 downline network, creating multiple income streams.
//               </p>
//             </div>
//             <div className="faq-item">
//               <h3>How often are commissions paid out?</h3>
//               <p>
//                 Commissions are processed weekly and paid out every Friday. You
//                 can track all your earnings in real-time through your dashboard.
//               </p>
//             </div>
//             <div className="faq-item">
//               <h3>What products are available?</h3>
//               <p>
//                 We offer a wide range of premium products including wellness
//                 supplements, tech gadgets, lifestyle products, and exclusive
//                 member-only items.
//               </p>
//             </div>
//             <div className="faq-item">
//               <h3>How do I upgrade my membership?</h3>
//               <p>
//                 You can upgrade through your account dashboard. Higher
//                 membership levels unlock greater commission rates and additional
//                 benefits.
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       {!isLoggedIn ? (
//         <section className="contact-cta">
//           <div className="container">
//             <h2>Ready to Start Your Journey?</h2>
//             <p>
//               Join thousands of successful members in our thriving community
//             </p>
//             <div className="cta-buttons">
//               <button
//                 className="btn-primary"
//                 onClick={() => navigate("/register")}
//               >
//                 Create Account
//               </button>
//               <button
//                 className="btn-outline-light"
//                 onClick={() => navigate("/about")}
//               >
//                 Learn More
//               </button>
//             </div>
//           </div>
//         </section>
//       ) : null}

//       <Footer />
//     </div>
//   );
// };

// export default Contact;








import React, { useState } from "react";
import Footer from "../../components/Footer";
import { useNavigate } from "react-router-dom";
import "../../CssFiles/common/Contact.css";
import { toast } from "react-hot-toast";
import Spinner from "../../components/Spinner";
import { isAuthenticated } from "../../utills/authService";
import { contactcreate } from "../../utills/apicall";
import { useTranslation } from 'react-i18next';

const Contact = () => {
  const navigate = useNavigate();
  const isLoggedIn = isAuthenticated();
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await contactcreate(formData);
    console.log(res);
    toast.success("धन्यवाद! आम्ही लवकरच आपल्याशी संपर्क करू.");
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });
    setLoading(false);
  };

  return (
    <div className="contact-container">
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="container">
          <h1 className="hero-title">{t("get_in_touch")}</h1>
          <p className="hero-subtitle">{t("contact_subtitle")}</p>
        </div>
      </section>

      <div className="contact-content">
        <div className="container">
          <div className="contact-grid">
            {/* Contact Information */}
            <div className="contact-info">
              <h2>{t("contact_information")}</h2>
              <p>{t("contact_info_text")}</p>

              <div className="contact-methods">
                <div className="contact-method">
                  <div className="method-icon">📧</div>
                  <div className="method-info">
                    <h3>{t("email")}</h3>
                    <p>support@swanandvibes.com</p>
                    <p>info@swanandvibes.com</p>
                  </div>
                </div>

                <div className="contact-method">
                  <div className="method-icon">📞</div>
                  <div className="method-info">
                    <h3>{t("phone")}</h3>
                    <p>+1 (555) 123-4567</p>
                    <p>+1 (555) 987-6543</p>
                  </div>
                </div>

                <div className="contact-method">
                  <div className="method-icon">📍</div>
                  <div className="method-info">
                    <h3>{t("address")}</h3>
                    <p>123 Business Avenue</p>
                    <p>Suite 456, Tech District</p>
                    <p>San Francisco, CA 94107</p>
                  </div>
                </div>

                <div className="contact-method">
                  <div className="method-icon">🕒</div>
                  <div className="method-info">
                    <h3>{t("hours")}</h3>
                    <p>Monday - Friday: 9AM - 6PM</p>
                    <p>Saturday: 10AM - 4PM</p>
                    <p>Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="contact-form-container">
              <h2>{t("send_message")}</h2>
              {loading ? (
                <div className="loader">
                  <Spinner size="lg" />
                </div>
              ) : (
                <form className="contact-form" onSubmit={handleSubmit}>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="name">{t("full_name")}</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">{t("email_address")}</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="phone">{t("phone_number")}</label>
                      <input
                        type="text"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="subject">{t("subject")}</label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="message">{t("message")}</label>
                    <textarea
                      id="message"
                      name="message"
                      rows="5"
                      value={formData.message}
                      onChange={handleChange}
                      required
                    ></textarea>
                  </div>

                  <button type="submit" className="btn-primary">
                    {t("send_btn")}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <section className="faq-section">
        <div className="container">
          <h2 className="section-title">{t("faq")}</h2>
          <div className="faq-grid">
            <div className="faq-item">
              <h3>{t("faq1_q")}</h3>
              <p>{t("faq1_a")}</p>
            </div>
            <div className="faq-item">
              <h3>{t("faq2_q")}</h3>
              <p>{t("faq2_a")}</p>
            </div>
            <div className="faq-item">
              <h3>{t("faq3_q")}</h3>
              <p>{t("faq3_a")}</p>
            </div>
            <div className="faq-item">
              <h3>{t("faq4_q")}</h3>
              <p>{t("faq4_a")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {!isLoggedIn ? (
        <section className="contact-cta">
          <div className="container">
            <h2>{t("cta_title")}</h2>
            <p>{t("cta_text")}</p>
            <div className="cta-buttons">
              <button
                className="btn-primary"
                onClick={() => navigate("/register")}
              >
                {t("create_account")}
              </button>
              <button
                className="btn-outline-light"
                onClick={() => navigate("/about")}
              >
                {t("learn_more")}
              </button>
            </div>
          </div>
        </section>
      ) : null}

      <Footer />
    </div>
  );
};

export default Contact;







// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useTranslation } from "react-i18next";
// import { toast } from "react-hot-toast";
// import Spinner from "../../components/Spinner";
// import Footer from "../../components/Footer";
// import { isAuthenticated } from "../../utills/authService";
// import { contactcreate } from "../../utills/apicall";

// const Contact = () => {
//   const { t } = useTranslation();
//   const navigate = useNavigate();
//   const isLoggedIn = isAuthenticated();

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     subject: "",
//     message: ""
//   });
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     const res = await contactcreate(formData);
//     console.log(res);
//     toast.success(t("send_message")); // localized toast
//     setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
//     setLoading(false);
//   };

//   return (
//     <div className="contact-container">
//       {/* Hero Section */}
//       <section className="contact-hero">
//         <div className="container">
//           <h1 className="hero-title">{t("contact_hero_title")}</h1>
//           <p className="hero-subtitle">{t("contact_hero_subtitle")}</p>
//         </div>
//       </section>

//       <div className="contact-content">
//         <div className="container">
//           <div className="contact-grid">
//             {/* Contact Information */}
//             <div className="contact-info">
//               <h2>{t("contact_info_title")}</h2>
//               <p>{t("contact_info_desc")}</p>

//               <div className="contact-methods">
//                 <div className="contact-method">
//                   <div className="method-icon">📧</div>
//                   <div className="method-info">
//                     <h3>{t("email")}</h3>
//                     <p>support@swanandvibes.com</p>
//                     <p>info@swanandvibes.com</p>
//                   </div>
//                 </div>

//                 <div className="contact-method">
//                   <div className="method-icon">📞</div>
//                   <div className="method-info">
//                     <h3>{t("phone")}</h3>
//                     <p>+1 (555) 123-4567</p>
//                     <p>+1 (555) 987-6543</p>
//                   </div>
//                 </div>

//                 <div className="contact-method">
//                   <div className="method-icon">📍</div>
//                   <div className="method-info">
//                     <h3>{t("address")}</h3>
//                     <p>123 Business Avenue</p>
//                     <p>Suite 456, Tech District</p>
//                     <p>San Francisco, CA 94107</p>
//                   </div>
//                 </div>

//                 <div className="contact-method">
//                   <div className="method-icon">🕒</div>
//                   <div className="method-info">
//                     <h3>{t("hours")}</h3>
//                     <p>Monday - Friday: 9AM - 6PM</p>
//                     <p>Saturday: 10AM - 4PM</p>
//                     <p>Sunday: Closed</p>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Contact Form */}
//             <div className="contact-form-container">
//               <h2>{t("send_message")}</h2>
//               {loading ? (
//                 <div className="loader">
//                   <Spinner size="lg" />
//                 </div>
//               ) : (
//                 <form className="contact-form" onSubmit={handleSubmit}>
//                   <div className="form-row">
//                     <div className="form-group">
//                       <label htmlFor="name">{t("full_name")}</label>
//                       <input
//                         type="text"
//                         id="name"
//                         name="name"
//                         value={formData.name}
//                         onChange={handleChange}
//                         required
//                       />
//                     </div>
//                     <div className="form-group">
//                       <label htmlFor="email">{t("email_address")}</label>
//                       <input
//                         type="email"
//                         id="email"
//                         name="email"
//                         value={formData.email}
//                         onChange={handleChange}
//                         required
//                       />
//                     </div>
//                     <div className="form-group">
//                       <label htmlFor="phone">{t("phone_number")}</label>
//                       <input
//                         type="text"
//                         id="phone"
//                         name="phone"
//                         value={formData.phone}
//                         onChange={handleChange}
//                         required
//                       />
//                     </div>
//                   </div>

//                   <div className="form-group">
//                     <label htmlFor="subject">{t("subject")}</label>
//                     <input
//                       type="text"
//                       id="subject"
//                       name="subject"
//                       value={formData.subject}
//                       onChange={handleChange}
//                       required
//                     />
//                   </div>

//                   <div className="form-group">
//                     <label htmlFor="message">{t("message")}</label>
//                     <textarea
//                       id="message"
//                       name="message"
//                       rows="5"
//                       value={formData.message}
//                       onChange={handleChange}
//                       required
//                     ></textarea>
//                   </div>

//                   <button type="submit" className="btn-primary">
//                     {t("send_btn")}
//                   </button>
//                 </form>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* FAQ Section */}
//       <section className="faq-section">
//         <div className="container">
//           <h2 className="section-title">{t("faq_title")}</h2>
//           <div className="faq-grid">
//             <div className="faq-item">
//               <h3>{t("faq_q1")}</h3>
//               <p>{t("faq_a1")}</p>
//             </div>
//             <div className="faq-item">
//               <h3>{t("faq_q2")}</h3>
//               <p>{t("faq_a2")}</p>
//             </div>
//             <div className="faq-item">
//               <h3>{t("faq_q3")}</h3>
//               <p>{t("faq_a3")}</p>
//             </div>
//             <div className="faq-item">
//               <h3>{t("faq_q4")}</h3>
//               <p>{t("faq_a4")}</p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       {!isLoggedIn ? (
//         <section className="contact-cta">
//           <div className="container">
//             <h2>{t("cta_title")}</h2>
//             <p>{t("cta_subtitle")}</p>
//             <div className="cta-buttons">
//               <button
//                 className="btn-primary"
//                 onClick={() => navigate("/register")}
//               >
//                 {t("cta_create_account")}
//               </button>
//               <button
//                 className="btn-outline-light"
//                 onClick={() => navigate("/about")}
//               >
//                 {t("cta_learn_more")}
//               </button>
//             </div>
//           </div>
//         </section>
//       ) : null}

//       <Footer />
//     </div>
//   );
// };

// export default Contact;

