// import React from 'react'
// import { useState, useEffect } from 'react'
// import axios from 'axios';
// import { useParams } from 'react-router-dom';
// import {getUserById} from '../../../utills/apicall';
// import Spinner from '../../../components/Spinner';
// import { toast } from 'react-hot-toast';

// const UserDetails = () => {
//   const { id } = useParams();
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchUserDetails = async () => {
//       setLoading(true);
//       try {
//         const response = await getUserById(id);
//         // axios.get(`http://localhost:5000/api/users/${id}`);
//         setUser(response.data);
//         // console.log(response.data);

//       } catch (error) {
//         console.error('Error fetching user details:', error);
//         toast.error('Failed to load user details. Please try again later.');
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchUserDetails();
//   }, [id]);

//   if (loading) {
//     return <Spinner size="lg" />;
//   }

//   // if (error) {
//   //   return <div>{error}</div>;
//   // }

//   return (
//     <div>
//         <h1>User Details</h1>
//         <p>ID: {user.id}</p>
//         <p>Name: {user.name}</p>
//         <p>Email: {user.email}</p>
//         <p>Role: {user.role}</p>

//     </div>
//   )
// }

// export default UserDetails















import React, { useState, useEffect } from 'react';
import { FiUser, FiMail, FiCalendar, FiCreditCard, FiUsers, FiShare2, FiEdit, FiSave, FiX, FiDollarSign, FiKey } from 'react-icons/fi';
import { toast } from 'react-hot-toast';
import Spinner from '../../../components/Spinner';
import {getUserById} from '../../../utills/apicall';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../../../CssFiles/Admin/user/userDetail.css';

const UserDetails = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [editData, setEditData] = useState({});

  const { id } = useParams();
  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        // Replace with actual API call
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/users/${id}`);
        const data = response.data;
        // console.log(data);
        
        if (response.status === 200) {
          setUser(data);
          setEditData(data);
        } else {
          toast.error('Failed to fetch user data');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        toast.error('Error loading user profile');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [id]);

  const handleInputChange = (field, value) => {
    setEditData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async () => {
    try {
      // Replace with actual API call
      const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editData)
      });
      
      const data = await response.json();
      
      if (data.success) {
        setUser(data.user);
        setEditing(false);
        toast.success('Profile updated successfully');
      } else {
        toast.error('Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating user:', error);
      toast.error('Error updating profile');
    }
  };

  const handleCancel = () => {
    setEditData(user);
    setEditing(false);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="admin-user-profile-loading">
        <Spinner size="lg" />
        <p>Loading user profile...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="admin-user-profile-error">
        <h2>User Not Found</h2>
        <p>The requested user profile could not be loaded.</p>
      </div>
    );
  }

  return (
    <div className="admin-user-profile-container">
      {/* <div className="admin-user-profile-header">
        <h1>User Profile Management</h1>
        <p>View and manage user account details</p>
      </div> */}

      <div className="admin-user-profile-content">
        {/* Main Profile Card */}
        <div className="admin-user-profile-card">
          <div className="admin-user-profile-card-header">
            <h2>User Information</h2>
            <div className="admin-user-profile-actions">
              {editing ? (
                <>
                  <button className="admin-user-profile-btn admin-user-profile-btn-primary" onClick={handleSave}>
                    <FiSave /> Save
                  </button>
                  <button className="admin-user-profile-btn admin-user-profile-btn-secondary" onClick={handleCancel}>
                    <FiX /> Cancel
                  </button>
                </>
              ) : (
                // <button 
                //   className="admin-user-profile-btn admin-user-profile-btn-primary"
                //   onClick={() => setEditing(true)}
                // >
                //   <FiEdit /> Edit Profile
                // </button>
                <></>
              )}
            </div>
          </div>

          <div className="admin-user-profile-card-body">
            <div className="admin-user-profile-avatar">
              <div className="admin-user-profile-avatar-icon">
                <FiUser />
              </div>
              <div className="admin-user-profile-avatar-info">
                <h3>{user.name}</h3>
                <p>User ID: {user._id}</p>
              </div>
            </div>

            <div className="admin-user-profile-details-grid">
              <div className="admin-user-profile-detail-item">
                <label>
                  <FiUser className="admin-user-profile-detail-icon" />
                  Full Name
                </label>
                {editing ? (
                  <input
                    type="text"
                    value={editData.name || ''}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="admin-user-profile-input"
                  />
                ) : (
                  <span>{user.name}</span>
                )}
              </div>

              <div className="admin-user-profile-detail-item">
                <label>
                  <FiMail className="admin-user-profile-detail-icon" />
                  Email Address
                </label>
                {editing ? (
                  <input
                    type="email"
                    value={editData.email || ''}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="admin-user-profile-input"
                  />
                ) : (
                  <span>{user.email}</span>
                )}
              </div>

              <div className="admin-user-profile-detail-item">
                <label>
                  <FiKey className="admin-user-profile-detail-icon" />
                  User Role
                </label>
                <span className={`admin-user-profile-role admin-user-profile-role-${user.role}`}>
                  {user.role}
                </span>
              </div>

              <div className="admin-user-profile-detail-item">
                <label>
                  <FiCalendar className="admin-user-profile-detail-icon" />
                  Member Since
                </label>
                <span>{formatDate(user.createdAt)}</span>
              </div>

              <div className="admin-user-profile-detail-item">
                <label>
                  <FiCreditCard className="admin-user-profile-detail-icon" />
                  Company ID
                </label>
                <span>{user.companyid}</span>
              </div>

              <div className="admin-user-profile-detail-item">
                <label>
                  <FiShare2 className="admin-user-profile-detail-icon" />
                  Referral Code
                </label>
                <span className="admin-user-profile-referral-code">
                  {user.referralCode}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="admin-user-profile-stats-grid">
          <div className="admin-user-profile-stat-card">
            <div className="admin-user-profile-stat-icon admin-user-profile-stat-wallet">
              <FiDollarSign />
            </div>
            <div className="admin-user-profile-stat-info">
              <h3>Wallet Connected</h3>
              <p>Active wallet account</p>
            </div>
          </div>

          <div className="admin-user-profile-stat-card">
            <div className="admin-user-profile-stat-icon admin-user-profile-stat-referral">
              <FiUsers />
            </div>
            <div className="admin-user-profile-stat-info">
              <h3>Referral Network</h3>
              <p>{user.sponsorPath?.length || 0} level(s) deep</p>
            </div>
          </div>

          <div className="admin-user-profile-stat-card">
            <div className="admin-user-profile-stat-icon admin-user-profile-stat-activity">
              <FiCalendar />
            </div>
            <div className="admin-user-profile-stat-info">
              <h3>Last Updated</h3>
              <p>{formatDate(user.updatedAt)}</p>
            </div>
          </div>
        </div>

        {/* Additional Information Section */}
        <div className="admin-user-profile-additional-info">
          <h3>Additional Information</h3>
          
          <div className="admin-user-profile-info-grid">
            <div className="admin-user-profile-info-item">
              <strong>User ID:</strong>
              <span>{user._id}</span>
            </div>
            
            <div className="admin-user-profile-info-item">
              <strong>Wallet ID:</strong>
              <span>{user.wallet}</span>
            </div>
            
            <div className="admin-user-profile-info-item">
              <strong>Referred By:</strong>
              <span>{user.referredBy || 'Not referred'}</span>
            </div>
            
            <div className="admin-user-profile-info-item">
              <strong>Account Status:</strong>
              <span className="admin-user-profile-status-active">Active</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        {/* <div className="admin-user-profile-action-buttons">
          <button className="admin-user-profile-action-btn admin-user-profile-action-btn-secondary">
            Reset Password
          </button>
          <button className="admin-user-profile-action-btn admin-user-profile-action-btn-warning">
            Suspend Account
          </button>
          <button className="admin-user-profile-action-btn admin-user-profile-action-btn-danger">
            Delete Account
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default UserDetails;