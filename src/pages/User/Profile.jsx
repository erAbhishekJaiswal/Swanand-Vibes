// Profile.js
import React, { useEffect, useState } from "react";
import "../../CssFiles/profile.css";
import axios from "axios";
import { getUserId,logoutUser } from "../../utills/authService";
import { getUserProfile } from "../../utills/apicall";
import {toast} from 'react-hot-toast';
import Spinner from "../../components/Spinner";
import { useNavigate } from "react-router-dom";

const Profile = ({ user, onUpdateProfile,}) => {
  const [refLink, setRefLink] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "Loading...",
    email: user?.email || "Loading...",
    mobile: user?.mobile || "N/A",
    address: user?.address || "No address provided",
    companyid: user?.companyid || "No company ID provided",
    avatar: user?.avatar || null,
  });

  const id = getUserId();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const userData = await getUserProfile(id);
      // axios.get(
      //   `http://localhost:5000/api/users/${id}/profile`
      // );
      setFormData(userData.data);
      console.log(userData.data);
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateProfile(formData);
    setIsEditing(false);
    toast.success("Profile updated successfully");
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || "Alex Morgan",
      email: user?.email || "alex.morgan@example.com",
      phone: user?.phone || "+1 (555) 123-4567",
      location: user?.location || "San Francisco, CA",
      bio:
        user?.bio ||
        "Senior UX Designer and AI enthusiast with a passion for creating futuristic interfaces.",
      avatar: user?.avatar || null,
    });
    setIsEditing(false);
    toast.error("Edit cancelled");
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData({
          ...formData,
          avatar: e.target.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (formData?.referralCode) {
      const baseUrl = window.location.origin; // http://localhost:3000
      setRefLink(`${baseUrl}/register?ref=${formData.referralCode}`);
    }
  }, [formData]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(refLink);
    alert("Referral link copied!");
  };

    const handleLogout = async () => {
      await logoutUser();
      window.location.href = "/login"; // Redirect to login page after logout
    };

    // const handleKycEnable = async () => {
    //   setLoading(true);
    //   const response = await axios.post(
    //     `http://localhost:5000/api/users/${id}/kyc/enable`
    //   );
    //   setLoading(false);
    //   if (response.status === 200) {
    //     toast.success("KYC verification enabled");
    //   } else {
    //     toast.error("Failed to enable KYC verification");
    //   }
    // };

    const handleKycEnable = async () => {
      navigate("/user/kyc");
    };

  if (loading) {
    return <Spinner size="lg" />;
  }

  return (
    <div className="profile-container futuristic-profile">
      <div className="profile-header">
        <h1>Profile Settings</h1>
        <p>Manage your account information and preferences</p>
      </div>

      <div className="profile-content">
        <div className="profile-card">
          <div className="profile-avatar-section">
            <div className="avatar-upload">
              <div className="avatar-preview">
                <div
                  className="avatar-image"
                  style={{
                    backgroundImage: `url(${
                      formData.avatar || "https://via.placeholder.com/120"
                    })`,
                  }}
                ></div>
                {isEditing && (
                  <label htmlFor="avatar-upload" className="avatar-edit">
                    <span>✏️</span>
                    <input
                      type="file"
                      id="avatar-upload"
                      accept="image/*"
                      onChange={handleAvatarChange}
                    />
                  </label>
                )}
              </div>
            </div>
            <div className="avatar-info">
              <h2>{formData.name}</h2>
              <p>{formData.email}</p>
              <p>company id: {formData.companyid}</p>

              <div className="member-status">
                <span className="status-badge">Premium Member</span>
              </div>
            </div>
          </div>

          <form className="profile-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled
                  className="futuristic-input"

                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled
                  className="futuristic-input"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="phone">Mobile Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData?.mobile || "N/A"}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="futuristic-input"
                />
              </div>
              <div className="form-group">
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData?.address || "N/A"}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="futuristic-input"
                />
              </div>
            </div>

              {/* <div className="form-group">
              <label htmlFor="bio">Bio</label>
              <textarea
                id="bio"
                name="bio"
                value={formData?.bio}
                onChange={handleChange}
                disabled={!isEditing}
                className="futuristic-textarea"
                rows="4"
              />
            </div> */}

            <div className="referral-section">
              <h3 className="">Your Referral Link</h3>
              <input type="text" value={refLink} readOnly className="futuristic-input" />
              <button onClick={copyToClipboard} className="futuristic-btn">
                Copy Link
              </button>
            </div>

          

            <div className="form-actions">
              {isEditing ? (
                <>
                  <button type="submit" className="futuristic-btn primary">
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="futuristic-btn"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => setIsEditing(true)}
                    className="futuristic-btn primary"
                  >
                    Edit Profile
                  </button>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="futuristic-btn"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </form>
        </div>

        <div className="profile-sidebar">
          <div className="sidebar-card">
            <h3>Account Security</h3>
            <div className="security-item">
              <span className="security-icon">🔒</span>
              <div className="security-info">
                <h4>Password</h4>
                <p>Last changed 2 weeks ago</p>
              </div>
              <button className="security-action futuristic-btn">Change</button>
            </div>
            <div className="security-item">
              <span className="security-icon">📱</span>
              <div className="security-info">
                <h4>KYC Verification</h4>
                <p>Status: {"Pending"}</p>
              </div>
              <button onClick={handleKycEnable} className="security-action futuristic-btn">Kyc Now</button>
            </div>

          </div>

          {/* <div className="sidebar-card">
            <h3>Subscription</h3>
            <div className="subscription-info">
              <div className="plan-badge premium">Premium Plan</div>
              <p>Next billing date: May 15, 2023</p>
            </div>
            <button className="futuristic-btn">Manage Subscription</button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Profile;
