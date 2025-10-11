import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import "../../../CssFiles/Admin/Purchase/VendorCreateForm.css"; // custom stylesheet

const VendorCreateForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    gstNumber: "",
    companyName: "",
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
    try {
      const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/vendor/`, formData); // Adjust backend route
      toast.success("Vendor created successfully!");
      console.log("Vendor created:", data);
      setFormData({
        name: "",
        email: "",
        phone: "",
        address: "",
        gstNumber: "",
        companyName: "",
      });
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Error creating vendor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="vendor-form-container-unique">
      <h2 className="vendor-form-title-unique">Create New Company</h2>

      <form className="vendor-form-unique" onSubmit={handleSubmit}>
        <div className="vendor-form-group-unique">
          <label htmlFor="name">Company Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter Company name"
            required
          />
        </div>

        <div className="vendor-form-group-unique">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter vendor email"
            required
          />
        </div>

        <div className="vendor-form-group-unique">
          <label htmlFor="phone">Phone</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter phone number"
            required
          />
        </div>

        <div className="vendor-form-group-unique">
          <label htmlFor="companyName">Vendor Name</label>
          <input
            type="text"
            id="companyName"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            placeholder="Enter Vendor name"
          />
        </div>

        <div className="vendor-form-group-unique">
          <label htmlFor="gstNumber">GST Number</label>
          <input
            type="text"
            id="gstNumber"
            name="gstNumber"
            value={formData.gstNumber}
            onChange={handleChange}
            placeholder="Enter GST number"
          />
        </div>

        <div className="vendor-form-group-unique">
          <label htmlFor="address">Address</label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter full address"
            rows="3"
          ></textarea>
        </div>

        <button
          type="submit"
          className="vendor-form-submit-btn-unique"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Company"}
        </button>
      </form>
    </div>
  );
};

export default VendorCreateForm;
