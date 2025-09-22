import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import Profile from "./User/Profile";
import Dashboard from "./Admin/Dashboard";
import "../CssFiles/main.css";
import Home from "./Common/Home";
import About from "./Common/About";
import Contact from "./Common/Contact";
import { PrivateRoute } from "../components/PrivateRoute";
import UserDashboard from "./User/UserDashboard";
import NotAuthorized from "./NotAuthorized";
import ProductList from "./Common/ProductList";
import ProductDetail from "./Common/ProductDetail";
import { Toaster } from 'react-hot-toast';
import OtpVerification from "../components/OtpVerification";
import ForgetPassword from "../components/ForgetPassword";
import ResetPassword from "../components/ResetPassword";
import OtpForgetVerification from "../components/OtpForgetPassword";
import TermsAndConditions from "./Common/TermsAndConditions";
import PrivacyPolicy from "./Common/PrivacyPolicy";
import AutoLogoutManager from "../utills/AutoLogoutManager";
// import Footer from "../components/Footer";

const Main = () => {
  return (
    <main className="main-content">
      {/* <BrowserRouter> */}
      <Toaster position="top-center" reverseOrder={false} />
      <AutoLogoutManager />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin/*" element={
            <PrivateRoute role="admin">
              <Dashboard />
            </PrivateRoute>
          } />
          <Route path="/user/*" element={
            <PrivateRoute role="user">
              <UserDashboard />
            </PrivateRoute>
          } />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/email-verify" element={<OtpVerification />} />
          <Route path="/register/:referralCode" element={<Register />} />
          <Route path="/forgot-password" element={<ForgetPassword />} />
          <Route path="/otp-forget-verification" element={<OtpForgetVerification />} />
          <Route path="/reset-password" element={<ResetPassword />} />


          <Route path="/profile" element={<Profile />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/terms" element={<TermsAndConditions />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
           {/* Not Authorized Page */}
        <Route path="/not-authorized" element={<NotAuthorized />} />
        </Routes>
        {/* <Footer /> */}
      {/* </BrowserRouter> */}
    </main>
  );
};

export default Main;
