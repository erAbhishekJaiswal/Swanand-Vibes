import React, { useState, useEffect } from "react";
import "../../CssFiles/Admin/AdminDashboard.css";

const AdminDashboard = () => {

  const [stats, setStats] = useState({
    users: 0,
    orders: 0,
    products: 0,
    inquiries: 0,
  });
  useEffect(() => {
    // Fetch stats from API (mock data for now)
    setStats({
      users: 1245,
      orders: 89,
      products: 56,
      inquiries: 12,
    });
  }, []);

  return (
    <div className="admin-dashboard">
      <div className="admin-container">
        <main className="admin-main">
          <div className="dashboard-content">
            <h2>Dashboard Overview</h2>
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon users">
                  <i className="fas fa-users"></i>
                </div>
                <div className="stat-info">
                  <h3>{stats.users}</h3>
                  <p>Total Users</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon orders">
                  <i className="fas fa-shopping-cart"></i>
                </div>
                <div className="stat-info">
                  <h3>{stats.orders}</h3>
                  <p>Orders</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon products">
                  <i className="fas fa-box"></i>
                </div>
                <div className="stat-info">
                  <h3>{stats.products}</h3>
                  <p>Products</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon inquiries">
                  <i className="fas fa-envelope"></i>
                </div>
                <div className="stat-info">
                  <h3>{stats.inquiries}</h3>
                  <p>Inquiries</p>
                </div>
              </div>
            </div>

            <div className="recent-activities">
              <h3>Recent Activities</h3>
              <div className="activity-list">
                <div className="activity-item">
                  <div className="activity-icon">
                    <i className="fas fa-shopping-cart"></i>
                  </div>
                  <div className="activity-details">
                    <p>
                      New order <strong>#ORD003</strong> placed
                    </p>
                    <span className="activity-time">2 hours ago</span>
                  </div>
                </div>
                <div className="activity-item">
                  <div className="activity-icon">
                    <i className="fas fa-user-plus"></i>
                  </div>
                  <div className="activity-details">
                    <p>
                      New user <strong>Rahul Verma</strong> registered
                    </p>
                    <span className="activity-time">5 hours ago</span>
                  </div>
                </div>
                <div className="activity-item">
                  <div className="activity-icon">
                    <i className="fas fa-question-circle"></i>
                  </div>
                  <div className="activity-details">
                    <p>
                      New inquiry from <strong>Meena Desai</strong>
                    </p>
                    <span className="activity-time">Yesterday</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
