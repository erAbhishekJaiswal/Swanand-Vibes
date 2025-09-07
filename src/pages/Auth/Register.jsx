// // Register.js
import React, { useState } from 'react';
import '../../CssFiles/Auth/Auth.css';
import imgLogo from '../../assets/logo.jpg';
import {Link, useNavigate,  Navigate } from "react-router-dom";
import { isAuthenticated, getUserRole } from "../../utills/authService";
import { useLocation } from "react-router-dom";
import { registerUser,verifyUser } from '../../utills/apicall';
import {toast} from 'react-hot-toast';
import Spinner from "../../components/Spinner"

const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const referralCode = queryParams.get("ref") || ""; // get referral from URL
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    referralCode: referralCode, // pre-filled if referral is in URL
    agreeTerms: false
  });

   if (isAuthenticated()) {
    const role = getUserRole();
    return <Navigate to={role === "admin" ? "/admin/dashboard" : "/user/dashboard"} replace />;
  }

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(formData);
    try {
        // const res = await registerUser(formData);
    const res = await verifyUser(formData);
    const data = res.data;
    // console.log(data);

    // fetch("http://localhost:5000/api/auth/register", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(formData),
    // });
    // const data = await res.json();

    if (res.status === 200) {
      console.log(data);
      
      // Handle successful registration
      toast.success("Registration successful!");
      navigate("/email-verify", { state: formData });
      setLoading(false);
    } else {
      // Handle registration error
      toast.error(data.message);
      setLoading(false);
    }
    setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error('Error registering user:', error.response.data.msg);
      toast.error(error.response.data.msg,'Registration failed. Please try again.');
    }
  };

  if (loading) {
    return <Spinner size="lg" />;
  }

  return (

    <div className="auth-container futuristic-auth">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-logo">
            {/* <span className="logo-icon">⚡</span> */}
            <img src={imgLogo} alt="Logo" className="logo-image" />
            <span className="logo-text">Swanand vibes</span>
          </div>
          <h2>Create Account</h2>
          {/* <p>Join us to begin your journey</p> */}
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <div className="input-container">
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="futuristic-input"
                placeholder='👤 Full Name'
              />
              {/* <span className="input-icon">👤</span> */}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <div className="input-container">
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="futuristic-input"
                placeholder='📧 Email Address'
              />
              {/* <span className="input-icon">📧</span> */}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="input-container">
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="futuristic-input"
                placeholder='🔒 Password'
              />
              {/* <span className="input-icon">🔒</span> */}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <div className="input-container">
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="futuristic-input"
                placeholder='🔒 Confirm Password'
              />
              {/* <span className="input-icon">🔒</span> */}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="referralCode">Referral Code:</label>
            <div className="input-container">
                     <input
          type="text"
          name="referralCode"
          placeholder="Referral Code (Optional)"
          value={formData.referralCode}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-3"
        />
              {/* <span className="input-icon">🔒</span> */}
            </div>
          </div>



          <div className="form-group checkbox-group">
            <label className="checkbox-container" style={{ fontSize: "13px" }}>
              <input
                type="checkbox"
                name="agreeTerms"
                checked={formData.agreeTerms}
                onChange={handleChange}
                required
              />
              <span className="checkmark"></span>
              {"  "}I agree to the <Link to="/terms">Terms of Service</Link> and <Link to="/privacy">Privacy Policy</Link>
            </label>
          </div>

          <button type="submit" className="auth-btn futuristic-btn primary">
            Create Account
          </button>
        </form>

        <div className="auth-footer">
          <p>Already have an account? <Link to="/login" className="auth-link">Sign in</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Register;










// // src/pages/Register.js
// import React, { useState } from "react";
// import axios from "axios";
// import { useLocation, useNavigate } from "react-router-dom";

// const Register = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const queryParams = new URLSearchParams(location.search);
//   const referralCode = queryParams.get("ref") || ""; // get referral from URL

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     referralCode: referralCode, // pre-filled if referral is in URL
//   });

//   const [message, setMessage] = useState("");

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post("http://localhost:5000/api/auth/register", formData);
//       setMessage(res.data.message);
//       navigate("/login"); // redirect to login after register
//     } catch (err) {
//       setMessage(err.response?.data?.message || "Registration failed");
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white p-6 rounded-2xl shadow-md w-full max-w-md"
//       >
//         <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
        
//         <input
//           type="text"
//           name="name"
//           placeholder="Full Name"
//           value={formData.name}
//           onChange={handleChange}
//           className="w-full p-2 border rounded mb-3"
//           required
//         />
        
//         <input
//           type="email"
//           name="email"
//           placeholder="Email Address"
//           value={formData.email}
//           onChange={handleChange}
//           className="w-full p-2 border rounded mb-3"
//           required
//         />
        
//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           value={formData.password}
//           onChange={handleChange}
//           className="w-full p-2 border rounded mb-3"
//           required
//         />
        
//         <input
//           type="text"
//           name="referralCode"
//           placeholder="Referral Code (Optional)"
//           value={formData.referralCode}
//           onChange={handleChange}
//           className="w-full p-2 border rounded mb-3"
//         />

//         <button
//           type="submit"
//           className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
//         >
//           Register
//         </button>

//         {message && <p className="mt-3 text-center text-sm text-gray-700">{message}</p>}
//       </form>
//     </div>
//   );
// };

// export default Register;
