// Login.js
import React, { useState } from "react";
import "../../CssFiles/Auth/Auth.css";
import imgLogo from "../../assets/logo.jpg"; // Ensure you have a logo image in the specified path
import {Link, useNavigate,  Navigate } from "react-router-dom";
import { isAuthenticated, getUserRole , loginUser} from "../../utills/authService";
import { loginUser as authlogin } from '../../utills/apicall';
import { toast } from "react-hot-toast";
import Spinner from "../../components/Spinner";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);


  if (isAuthenticated()) {
    const role = getUserRole();
    return <Navigate to={role === "admin" ? "/admin/dashboard" : "/user/dashboard"} replace />;
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    
    e.preventDefault();
    setLoading(true);
    const res = await authlogin(formData);
    const data = res.data;
    // fetch("http://localhost:5000/api/auth/login", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(formData),
    // });
    // const data = await res.json();

    if (res.status === 200) {
      loginUser(data);

      // Redirect based on role
      if (data.user.role === "admin") {
        toast.success("Admin Login successful");
        navigate("/admin/dashboard");
      } else {
        toast.success("User Login successful");
        navigate("/user/dashboard");
      }
    } else {
      toast.error(data.message);
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
          <h2>Welcome Back</h2>
          <p>Sign in to access your account</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
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
              />
              <span className="input-icon">📧</span>
            </div>
          </div>

          <div className="form-group">
            <div className="label-container">
              <label htmlFor="password">Password</label>
              <a href="#forgot" className="forgot-link">
                Forgot password?
              </a>
            </div>
            <div className="input-container">
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="futuristic-input"
              />
              <span className="input-icon">🔒</span>
            </div>
          </div>

          <button type="submit" className="auth-btn futuristic-btn primary">
            Sign In
          </button>
        </form>

        {/* <div className="auth-divider">
          <span>Or continue with</span>
        </div>

        <div className="social-auth">
          <button className="social-btn futuristic-btn">
            <span className="social-icon">G</span>
            Google
          </button>
          <button className="social-btn futuristic-btn">
            <span className="social-icon">f</span>
            Facebook
          </button>
        </div> */}

        <div className="auth-footer">
          <p>
            Don't have an account?{" "}
            <Link to="/register" className="auth-link">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
