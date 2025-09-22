// src/pages/NotAuthorized.js
import React from "react";
import { Link } from "react-router-dom";
import '../CssFiles/NotAuthorized.css';
import Footer from "../components/Footer";

const NotAuthorized = () => {
  return (
    <div className="not-authorized-container">
      <div className="not-authorized-card">
        <h1 className="">403</h1>
        <h2 className="">Access Denied</h2>
        <p className="">
          You don’t have permission to view this page.
        </p>
        <Link
        to="/"
        className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
      >
        Go Back Home
      </Link>
      </div>

      <Footer />
    </div>
  );
};

export default NotAuthorized;
