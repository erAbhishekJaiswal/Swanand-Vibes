import React, { useState, useEffect } from "react";
import "../../CssFiles/Admin/AdminDashboard.css";
import {getUserId} from '../../utills/authService'
import { useNavigate } from "react-router-dom";
import { FiUsers } from "react-icons/fi";
import { FaCartArrowDown } from "react-icons/fa";
import { TiShoppingCart } from "react-icons/ti";
import { RiCustomerService2Fill } from "react-icons/ri";
import { ImProfile } from "react-icons/im";
import { BiMoneyWithdraw } from "react-icons/bi";
import { FaRupeeSign } from "react-icons/fa";

const AdminDashboard = () => {

  const id = getUserId();
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    users: 0,
    orders: 0,
    products: 0,
    inquiries: 0,
  });
  useEffect(() => {
    // Fetch stats from API (mock data for now)
    setStats({
      users: 0,
      orders: 0,
      products: 0,
      inquiries: 0,
    });
    const fetchStats = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/users/dashboard/${id}`);
        const data = await response.json();
        // console.log(data);
        
        setStats({
      users: data.userCount,
      orders: data.orderCount,
      products: data.productCount,
      inquiries: data.contactCount,
      kycs: data.kycPendingCount,
      deposits: data.depositCount,
      withdrawals: data.withdrawalCount,
      withdrawalAmount: data.withdrawalAmount,
      totalAmount:data.totalAmount

    });
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="admin-dashboard">
      <div className="admin-container">
        <main className="admin-main">
          <div className="dashboard-content">
            <h2>Dashboard Overview</h2>
            <div className="stats-grid">
                            <div className="stat-card" onClick={() => navigate("/admin/withdraw")}>
                <div className="stat-icon deposits">
                  <FaRupeeSign />
                </div>
                <div className="stat-info">
                  <h3>{stats.totalAmount}</h3>
                  <p>Total Balance</p>
                </div>
              </div>
              <div className="stat-card" onClick={() => navigate("/admin/users")}>
                <div className="stat-icon users">
                  {/* <i className="fas fa-users"><FiUsers /></i> */}
                  <FiUsers />
                </div>
                <div className="stat-info">
                  <h3>{stats.users}</h3>
                  <p>Total Users</p>
                </div>
              </div>
              <div className="stat-card" onClick={() => navigate("/admin/orderlist")}>
                <div className="stat-icon orders">
                  {/* <i className="fas fa-shopping-cart"></i> */}
                  <FaCartArrowDown />
                </div>
                <div className="stat-info">
                  <h3>{stats.orders}</h3>
                  <p>Orders</p>
                </div>
              </div>
              <div className="stat-card" onClick={() => navigate("/admin/products")}>
                <div className="stat-icon products">
                  {/* <i className="fas fa-box"></i> */}
                  <TiShoppingCart />
                </div>
                <div className="stat-info">
                  <h3>{stats.products}</h3>
                  <p>Products</p>
                </div>
              </div>
              <div className="stat-card" onClick={() => navigate("/admin/contactlist")}>
                <div className="stat-icon inquiries">
                  {/* <i className="fas fa-envelope"></i> */}
                  <RiCustomerService2Fill />
                </div>
                <div className="stat-info">
                  <h3>{stats.inquiries}</h3>
                  <p>Inquiries</p>
                </div>
              </div>
              <div className="stat-card" onClick={() => navigate("/admin/kyc")}>
                <div className="stat-icon kycs">
                  {/* <i className="fas fa-envelope"></i> */}
                  <ImProfile />
                </div>
                <div className="stat-info">
                  <h3>{stats.kycs}</h3>
                  <p>KYC Pending</p>
                </div>
              </div>
              <div className="stat-card" onClick={() => navigate("/admin/withdraw")}>
                <div className="stat-icon deposits">
                  {/* <i className="fas fa-envelope"></i> */}
                  <BiMoneyWithdraw />
                </div>
                <div className="stat-info">
                  <h3>{stats.deposits}</h3>
                  <p>Deposits</p>
                </div>
              </div>
              <div className="stat-card" onClick={() => navigate("/admin/withdraw")}>
                <div className="stat-icon withdrawalamount">
                  <BiMoneyWithdraw />
                </div>
                <div className="stat-info">
                  <h3>{stats.withdrawalAmount}</h3>
                  <p>Withdrawal Amount</p>
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
