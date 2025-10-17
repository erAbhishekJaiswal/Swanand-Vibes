import React, { useState } from "react";
import Footer from "../../components/Footer";
import { useNavigate } from "react-router-dom";
import "../../CssFiles/common/Contact.css";
import { toast } from "react-hot-toast";
import Spinner from "../../components/Spinner";
import { isAuthenticated } from "../../utills/authService";
import { contactcreate } from "../../utills/apicall";
import { useTranslation } from "react-i18next";

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

  // ✅ handleChange with phone validation
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone") {
      // Allow only numbers and limit to 10 digits
      const cleanedValue = value.replace(/\D/g, "").slice(0, 10);
      setFormData({
        ...formData,
        [name]: cleanedValue,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  // ✅ handleSubmit with phone validation check
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.phone.length !== 10) {
      toast.error("Please enter a valid 10-digit phone number.");
      return;
    }

    setLoading(true);
    try {
      const res = await contactcreate(formData);
      // // console.log(res);
      toast.success(`Message sent successfully`);
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      toast.error("Failed to send message");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-container">
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="container">
          <h1 className="hero-title">{t("get_in_touch")}</h1>
          <p className="contact-hero-subtitle">{t("contact_subtitle")}</p>
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
                    <p>+91-9821611417</p>
                  </div>
                </div>

                <div className="contact-method">
                  <div className="method-icon">📍</div>
                  <div className="method-info">
                    <h3>{t("address")}</h3>
                    <p>Kharghar</p>
                    <p>Navi Mumbai</p>
                    <p>Maharashtra, India</p>
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
                        maxLength="10"
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