// Profile.js
import React, { useEffect, useState } from "react";
import "../../CssFiles/profile.css";
import axios from "axios";
import { getUserId, logoutUser, getUserRole} from "../../utills/authService";
import { getUserProfile, updateUserProfile } from "../../utills/apicall";
import { toast } from 'react-hot-toast';
import Spinner from "../../components/Spinner";
import { useNavigate } from "react-router-dom";

const Profile = ({ user, onUpdateProfile }) => {
  const [refLink, setRefLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    address: "",
    companyid: "",
    avatar: null,
    kycstatus: "",
    Orders: 0,
  });

  const id = getUserId();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const userData = await getUserProfile(id);
        // const userData = await axios.get(`https//users/${id}/profile`);
        console.log("userData", userData.data);
        
        setFormData({
          name: userData.data.user.name || "Loading...",
          email: userData.data.user.email || "Loading...",
          mobile: userData.data.user.mobile || "",
          address: userData.data.user.address || "",
          companyid: userData.data.user.companyid || "",
          avatar: userData.data.user.avatar || null,
          referralCode: userData.data.user.referralCode || "",
          kycstatus: userData.data.kyc || "",
          Orders: userData.data.Isorder || 0,
        });
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching profile:", error);
        setIsLoading(false);
        toast.error("Failed to load profile data");
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    if (formData?.referralCode) {
      const baseUrl = window.location.origin;
      setRefLink(`${baseUrl}/register?ref=${formData.referralCode}`);
    }
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when field is edited
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const errors = {};
    // Validate mobile number
    if (!formData.mobile) {
      errors.mobile = "Mobile number is required";
    } else if (!/^\d{10}$/.test(formData.mobile)) {
      errors.mobile = "Enter a valid 10-digit mobile number";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      toast.error("Please fix form errors before submitting");
      return;
    }

    setLoading(true);
    try {
      const res = await updateUserProfile(id, formData);
      toast.success("Profile updated successfully");
      setIsEditing(false);
      // Refresh user data
      const userData = await getUserProfile(id);
      setFormData(userData.data);
    } catch (error) {
      console.error("Profile update failed:", error);
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    // Reset form data to original values
    getUserProfile(id).then(userData => {
      setFormData(userData.data);
    });
    setIsEditing(false);
    setFormErrors({});
    toast.error("Edit cancelled");
  };

  // const handleAvatarChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onload = (e) => {
  //       setFormData(prev => ({
  //         ...prev,
  //         avatar: e.target.result,
  //       }));
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  const handleShare = (link) => {
    if (navigator.share) {
      navigator
        .share({
          title: "Join with my referral",
          text: "Check out this amazing platform!",
          url: link,
        })
        .then(() => toast.success("Referral link shared successfully!"))
        .catch((error) => console.error("Error sharing:", error));
    } else {
      navigator.clipboard.writeText(link);
      toast.success("Referral link copied to clipboard!");
    }
  };

  const handleLogout = async () => {
    await logoutUser();
    window.location.href = "/login";
  };

  const handleKycEnable = async () => {
    navigate("/user/kyc");
  };

 const handlePasswordChange = async () => {
   const resetToken = localStorage.getItem("refreshToken");
   const email = formData?.email;
   if (getUserRole() === "admin") {
     navigate('/admin/profile/reset-password', {state: {resetToken, email}})
   }else {
     navigate('/user/profile/reset-password', {state: {resetToken, email}})
   }
   
 }

  if (isLoading) {
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
            {/* <div className="avatar-upload">
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
            </div> */}
            <div className="avatar-info">
              <h2>{formData.name}</h2>
              <p>{formData.email}</p>
              <p>Company ID: {formData.companyid || "No company ID provided"}</p>
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
                  disabled={!isEditing}
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
                <label htmlFor="mobile">Mobile Number</label>
                <input
                  type="tel"
                  id="mobile"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={`futuristic-input ${formErrors.mobile ? 'error' : ''}`}
                  placeholder="Enter 10-digit mobile number"
                />
                {formErrors.mobile && (
                  <span className="error-text">{formErrors.mobile}</span>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="futuristic-input"
                  placeholder="Enter your address"
                />
              </div>
            </div>

           { getUserRole() === "user" && formData?.Orders !== 0 && <div className="referral-section">
              <h3>Your Referral Link</h3>
              <div className="referral-input-group">
                <input 
                  type="text" 
                  value={refLink} 
                  readOnly 
                  className="futuristic-input" 
                />
                <button 
                  type="button"
                  onClick={() => handleShare(refLink)} 
                  className="futuristic-btn share-btn"
                >
                  Share Link
                </button>
              </div>
            </div>}

            <div className="form-actions">
              {isEditing ? (
                <>
                  <button 
                    type="submit" 
                    className="futuristic-btn primary"
                    disabled={loading}
                  >
                    {loading ? "Saving..." : "Save Changes"}
                  </button>
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="futuristic-btn secondary"
                    disabled={loading}
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
                    className="futuristic-btn secondary"
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
              <button onClick={handlePasswordChange} className="security-action futuristic-btn">Change</button>
            </div>
            
            <div className="security-item">
              <span className="security-icon">📱</span>
              <div className="security-info">
                <h4>KYC Verification</h4>
                <p>Complete identity verification</p>
              </div>
             { formData?.kycstatus === 'notSubmitted' ? 
             <><button 
                onClick={handleKycEnable} 
                className="security-action futuristic-btn"
              >
                Verify Now
              </button></> :<>
              <p className="profile-kyc-status">
              {formData.kycstatus.toUpperCase()}</p>
              </>
              }
            </div>
          </div>
        </div>
      </div>

      {/* <Footer /> */}
    </div>
  );
};

export default Profile;