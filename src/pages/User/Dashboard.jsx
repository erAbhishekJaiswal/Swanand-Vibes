import React, { useState, useEffect } from "react";
import "../../CssFiles/User/UserDashboard.css";
import axios from "axios";
import { getUserId } from "../../utills/authService";
import { useNavigate } from "react-router-dom";
import { IoIosCart } from "react-icons/io";
import { LuBoxes, LuReceiptIndianRupee } from "react-icons/lu";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";
import { CgFileDocument } from "react-icons/cg";
import { PiNetworkDuotone } from "react-icons/pi";
import { toast } from "react-hot-toast";

const Dashboard = () => {
  const id = getUserId();
  const navigate = useNavigate();
  // const [activeTab, setActiveTab] = useState("dashboard");

  const [userData, setUserData] = useState({
    name: "Loading...",
    cart: "Loading...",
    totalNetwork: 0,
    walletBalance: 0,
    kycStatus: "Loading...",
    orders: 0,
    totalOrderAmount: 0,
    gifts: [],
  });

  const [topusers, setTopusers] = useState([
    {
      userId: "ORD001",
      name: "Loading...",
      amount: 0,
      email: "Loading...",
    },
    {
      userId: "ORD002",
      name: "Loading...",
      amount: 0,
      email: "Loading...",
    },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fatchdashboard = await axios.get(
          `${import.meta.env.VITE_API_URL}/users/dashboard/user/${id}`
        );

        setUserData({
          name: fatchdashboard.data.user.name,
          cart: fatchdashboard.data.cartCount,
          orders: fatchdashboard.data.orderCount,
          totalNetwork: fatchdashboard.data.totalNetwork,
          totalOrderAmount: fatchdashboard.data.totalOrderAmount,
          walletBalance: fatchdashboard.data.walletBalance,
          kycStatus: fatchdashboard.data.kycStatus,
          gifts: fatchdashboard.data.gifts || [],
        });
        console.log(fatchdashboard)
        setTopusers(fatchdashboard.data.topWithdrawalUsers || []);
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast.error("Error fetching user data");
      }
    };
    fetchData();
  }, [id]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    }).format(amount);
  };

  const getKycStatusColor = (status) => {
    const statusMap = {
      'verified': '#00b894',
      'pending': '#fdcb6e',
      'not-submitted': '#e17055',
      'rejected': '#d63031'
    };
    return statusMap[status.toLowerCase().replace(" ", "-")] || '#636e72';
  };

  return (
    <div className="ud-dashboard">
      <div className="ud-container">
        <main className="ud-main">
          <div className="ud-content">
            <h2>Welcome back, {userData.name}! 👋</h2>
            
            {/* Stats Grid */}
            <div className="ud-stats">
              <div className="ud-stat-card" onClick={() => navigate('/user/cart')}>
                <div className="ud-stat-icon ud-level">
                  <IoIosCart />
                </div>
                <div className="ud-stat-info">
                  <h3>{userData.cart}</h3>
                  <p>Product Cart</p>
                </div>
              </div>

              <div className="ud-stat-card" onClick={() => navigate('/user/orders')}>
                <div className="ud-stat-icon ud-order">
                  <LuBoxes />
                </div>
                <div className="ud-stat-info">
                  <h3>{userData.orders}</h3>
                  <p>Total Orders</p>
                </div>
              </div>

              <div className="ud-stat-card" onClick={() => navigate('/user/network')}>
                <div className="ud-stat-icon ud-network">
                  <PiNetworkDuotone />
                </div>
                <div className="ud-stat-info">
                  <h3>{userData?.totalNetwork}</h3>
                  <p>Total Network</p>
                </div>
              </div>

              <div className="ud-stat-card">
                <div className="ud-stat-icon ud-points">
                  <LuReceiptIndianRupee />
                </div>
                <div className="ud-stat-info">
                  <h3>{formatCurrency(userData.totalOrderAmount)}</h3>
                  <p>Total Order Amount</p>
                </div>
              </div>

              <div className="ud-stat-card" onClick={() => navigate('/user/wallet')}>
                <div className="ud-stat-icon ud-wallet">
                  <MdOutlineAccountBalanceWallet />
                </div>
                <div className="ud-stat-info">
                  <h3>{formatCurrency(userData.walletBalance)}</h3>
                  <p>Wallet Balance</p>
                </div>
              </div>

              <div className="ud-stat-card" onClick={() => navigate('/user/kyc')}>
                <div className="ud-stat-icon ud-kyc">
                  <CgFileDocument />
                </div>
                <div className="ud-stat-info">
                  <h3 
                    className={`ud-kyc-${userData.kycStatus.toLowerCase().replace(" ", "-")}`}
                    style={{ color: getKycStatusColor(userData.kycStatus) }}
                  >
                    {userData.kycStatus}
                  </h3>
                  <p>KYC Status</p>
                </div>
              </div>
            </div>

            {/* Main Content Sections */}
            <div className="ud-sections">
              {/* Top Users Withdraws */}
              <div className="ud-card ud-recent-orders">
                <h3 className="ud-section-title">
                  💰 Top Users Withdraws
                </h3>
                {topusers.length > 0 ? (
                  topusers.slice(0, 5).map((user) => (
                    <div key={user.userId} className="ud-order-item">
                      <div className="ud-order-info">
                        <h4>{user?.name || 'Unknown User'}</h4>
                        <p>{user?.email || 'No email provided'}</p>
                      </div>
                      <div className="ud-order-status">
                        {formatCurrency(user.amount)}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="ud-no-data">
                    <p>No withdrawal data available</p>
                  </div>
                )}
              </div>

              {/* Gifts & Offers */}
              <div className="ud-card ud-gift-offer">
                <h3 className="ud-section-title">
                  🎁 Gifts & Offers
                </h3>
                <div className="ud-gift-list">
                  {userData?.gifts?.length > 0 ? (
                    userData.gifts.map((gift, index) => (
                      <div key={index} className="ud-gift-item">
                        <div className="ud-gift-icon">
                          <img 
                            src={gift.imageUrl || '/default-gift.png'} 
                            alt={gift.name}
                            onError={(e) => {
                              e.target.src = '/default-gift.png';
                            }}
                          />
                        </div>
                        <div className="ud-gift-info">
                          <h4>{gift.title}</h4>
                          <p>{gift.description}</p>
                        </div>
                        <div className="ud-gift-status">
                          <p>Status: {gift.status}</p>
                        </div>
                        <div className="ud-gift-validity">
                          <p>
                            Valid until: {new Date(gift.validity).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="ud-no-data">
                      <p>No active gifts or offers</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
