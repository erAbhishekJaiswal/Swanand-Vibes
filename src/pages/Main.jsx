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

const Main = () => {
  return (
    <main className="main-content">
      {/* <BrowserRouter> */}
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
          <Route path="/register/:referralCode" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductDetail />} />
           {/* Not Authorized Page */}
        <Route path="/not-authorized" element={<NotAuthorized />} />
        </Routes>
      {/* </BrowserRouter> */}
    </main>
  );
};

export default Main;
