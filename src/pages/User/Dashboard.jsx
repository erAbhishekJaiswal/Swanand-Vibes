// // UserDashboard.js
// import React, { useState, useEffect } from 'react';
// import { getUserId } from '../../utills/authService';
// // import '../../CssFiles/User/Dashboard.css';

// // Import icons (you can use react-icons or custom SVGs)
// import {
//   FiShoppingCart,
//   FiPackage,
//   FiCreditCard,
//   FiList,
//   FiUsers,
//   FiFileText,
//   FiHome,
//   FiUser,
//   FiSettings,
//   FiBell,
//   FiSearch
// } from 'react-icons/fi';

// const Dashboard = () => {
//   const [activeTab, setActiveTab] = useState('dashboard');
//   const [userData, setUserData] = useState({
//     name: 'John Doe',
//     email: 'john.doe@example.com',
//     avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
//     balance: 1250.75,
//     level: 'Gold Member',
//     points: 4500
//   });
//   const [cartItems, setCartItems] = useState([]);
//   const [orders, setOrders] = useState([]);
//   const [products, setProducts] = useState([]);
//   const [kycStatus, setKycStatus] = useState('verified');
//   const [treeData, setTreeData] = useState({});
//   const userId = getUserId();

//   // Mock data - replace with actual API calls
//   useEffect(() => {
//     // Fetch user data
//     const fetchUserData = async () => {
//       try {
//         // const response = await axios.get(`/api/user/${userId}`);
//         // setUserData(response.data);

//         // Mock data
//         setUserData({
//           name: 'John Doe',
//           email: 'john.doe@example.com',
//           avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
//           balance: 1250.75,
//           level: 'Gold Member',
//           points: 4500
//         });
//       } catch (error) {
//         console.error('Error fetching user data:', error);
//       }
//     };

//     // Fetch cart items
//     const fetchCartItems = async () => {
//       try {
//         // const response = await axios.get(`/api/user/cart/${userId}`);
//         // setCartItems(response.data.items);

//         // Mock data
//         setCartItems([
//           { id: 1, name: 'Wireless Headphones', price: 99.99, quantity: 1, image: 'https://via.placeholder.com/60x60/3b82f6/ffffff?text=H' },
//           { id: 2, name: 'Smart Watch', price: 199.99, quantity: 1, image: 'https://via.placeholder.com/60x60/3b82f6/ffffff?text=W' },
//           { id: 3, name: 'Phone Case', price: 24.99, quantity: 2, image: 'https://via.placeholder.com/60x60/3b82f6/ffffff?text=C' }
//         ]);
//       } catch (error) {
//         console.error('Error fetching cart items:', error);
//       }
//     };

//     // Fetch orders
//     const fetchOrders = async () => {
//       try {
//         // const response = await axios.get(`/api/user/orders/${userId}`);
//         // setOrders(response.data);

//         // Mock data
//         setOrders([
//           { id: 'ORD-12345', date: '2023-11-15', status: 'delivered', total: 539.99, items: 3 },
//           { id: 'ORD-12346', date: '2023-11-10', status: 'shipped', total: 849.97, items: 2 },
//           { id: 'ORD-12347', date: '2023-11-05', status: 'processing', total: 971.99, items: 1 }
//         ]);
//       } catch (error) {
//         console.error('Error fetching orders:', error);
//       }
//     };

//     // Fetch products
//     const fetchProducts = async () => {
//       try {
//         // const response = await axios.get('/api/products');
//         // setProducts(response.data);

//         // Mock data
//         setProducts([
//           { id: 1, name: 'Wireless Headphones', price: 99.99, image: 'https://via.placeholder.com/150x150/3b82f6/ffffff?text=H', rating: 4.5 },
//           { id: 2, name: 'Smart Watch', price: 199.99, image: 'https://via.placeholder.com/150x150/3b82f6/ffffff?text=W', rating: 4.2 },
//           { id: 3, name: 'Bluetooth Speaker', price: 79.99, image: 'https://via.placeholder.com/150x150/3b82f6/ffffff?text=S', rating: 4.7 },
//           { id: 4, name: 'Phone Case', price: 24.99, image: 'https://via.placeholder.com/150x150/3b82f6/ffffff?text=C', rating: 4.0 }
//         ]);
//       } catch (error) {
//         console.error('Error fetching products:', error);
//       }
//     };

//     // Fetch tree data
//     const fetchTreeData = async () => {
//       try {
//         // const response = await axios.get(`/api/user/tree/${userId}`);
//         // setTreeData(response.data);

//         // Mock data
//         setTreeData({
//           totalMembers: 24,
//           directReferrals: 5,
//           levels: [
//             { level: 1, members: 5, commission: 250.50 },
//             { level: 2, members: 12, commission: 125.75 },
//             { level: 3, members: 7, commission: 62.25 }
//           ]
//         });
//       } catch (error) {
//         console.error('Error fetching tree data:', error);
//       }
//     };

//     fetchUserData();
//     fetchCartItems();
//     fetchOrders();
//     fetchProducts();
//     fetchTreeData();
//   }, [userId]);

//   const calculateCartTotal = () => {
//     return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
//   };

//   const renderDashboard = () => (
//     <div className="dashboard-content">
//       <div className="welcome-banner">
//         <div className="welcome-text">
//           <h2>Welcome back, {userData.name}!</h2>
//           <p>Here's what's happening with your account today.</p>
//         </div>
//         <div className="user-stats">
//           <div className="stat-card">
//             <div className="stat-icon wallet">
//               <FiCreditCard />
//             </div>
//             <div className="stat-info">
//               <h3>${userData.balance.toFixed(2)}</h3>
//               <p>Wallet Balance</p>
//             </div>
//           </div>
//           <div className="stat-card">
//             <div className="stat-icon points">
//               <FiUsers />
//             </div>
//             <div className="stat-info">
//               <h3>{userData.points}</h3>
//               <p>Reward Points</p>
//             </div>
//           </div>
//           <div className="stat-card">
//             <div className="stat-icon level">
//               <FiUser />
//             </div>
//             <div className="stat-info">
//               <h3>{userData.level}</h3>
//               <p>Current Level</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="dashboard-grid">
//         <div className="recent-orders">
//           <h3>Recent Orders</h3>
//           {orders.slice(0, 3).map(order => (
//             <div key={order.id} className="order-item">
//               <div className="order-info">
//                 <p className="order-id">{order.id}</p>
//                 <p className="order-date">{new Date(order.date).toLocaleDateString()}</p>
//               </div>
//               <div className="order-status">
//                 <span className={`status-badge ${order.status}`}>{order.status}</span>
//               </div>
//               <div className="order-total">
//                 ${order.total.toFixed(2)}
//               </div>
//             </div>
//           ))}
//           <button className="view-all-btn" onClick={() => setActiveTab('orders')}>
//             View All Orders
//           </button>
//         </div>

//         <div className="cart-summary">
//           <h3>Shopping Cart</h3>
//           {cartItems.slice(0, 2).map(item => (
//             <div key={item.id} className="cart-item">
//               <img src={item.image} alt={item.name} />
//               <div className="item-details">
//                 <p className="item-name">{item.name}</p>
//                 <p className="item-price">${item.price.toFixed(2)} x {item.quantity}</p>
//               </div>
//             </div>
//           ))}
//           {cartItems.length > 2 && (
//             <p className="more-items">+{cartItems.length - 2} more items</p>
//           )}
//           <div className="cart-total">
//             <p>Total: ${calculateCartTotal().toFixed(2)}</p>
//             <button className="checkout-btn" onClick={() => setActiveTab('cart')}>
//               Checkout
//             </button>
//           </div>
//         </div>

//         <div className="kyc-status">
//           <h3>KYC Verification</h3>
//           <div className={`kyc-badge ${kycStatus}`}>
//             {kycStatus === 'verified' ? 'Verified' : 'Pending'}
//           </div>
//           <p>Your identity verification is {kycStatus === 'verified' ? 'complete' : 'pending'}.</p>
//           {kycStatus !== 'verified' && (
//             <button className="verify-btn" onClick={() => setActiveTab('kyc')}>
//               Complete Verification
//             </button>
//           )}
//         </div>

//         <div className="network-summary">
//           <h3>Your Network</h3>
//           <div className="network-stats">
//             <div className="network-stat">
//               <span className="stat-value">{treeData.totalMembers || 0}</span>
//               <span className="stat-label">Total Members</span>
//             </div>
//             <div className="network-stat">
//               <span className="stat-value">{treeData.directReferrals || 0}</span>
//               <span className="stat-label">Direct Referrals</span>
//             </div>
//           </div>
//           <button className="view-network-btn" onClick={() => setActiveTab('tree')}>
//             View Network Tree
//           </button>
//         </div>
//       </div>
//     </div>
//   );

//   const renderProducts = () => (
//     <div className="tab-content">
//       <h2>Products</h2>
//       <div className="products-grid">
//         {products.map(product => (
//           <div key={product.id} className="product-card">
//             <img src={product.image} alt={product.name} />
//             <div className="product-info">
//               <h4>{product.name}</h4>
//               <div className="product-rating">
//                 {'★'.repeat(Math.floor(product.rating))}
//                 {'☆'.repeat(5 - Math.floor(product.rating))}
//                 <span>({product.rating})</span>
//               </div>
//               <p className="product-price">${product.price.toFixed(2)}</p>
//               <button className="add-to-cart-btn">Add to Cart</button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );

//   const renderCart = () => (
//     <div className="tab-content">
//       <h2>Shopping Cart</h2>
//       {cartItems.length === 0 ? (
//         <div className="empty-cart">
//           <FiShoppingCart size={48} />
//           <h3>Your cart is empty</h3>
//           <p>Browse our products and add items to your cart</p>
//           <button className="shop-now-btn" onClick={() => setActiveTab('products')}>
//             Shop Now
//           </button>
//         </div>
//       ) : (
//         <div className="cart-details">
//           <div className="cart-items">
//             {cartItems.map(item => (
//               <div key={item.id} className="cart-item-detail">
//                 <img src={item.image} alt={item.name} />
//                 <div className="item-info">
//                   <h4>{item.name}</h4>
//                   <p>${item.price.toFixed(2)} each</p>
//                 </div>
//                 <div className="quantity-controls">
//                   <button>-</button>
//                   <span>{item.quantity}</span>
//                   <button>+</button>
//                 </div>
//                 <div className="item-total">
//                   ${(item.price * item.quantity).toFixed(2)}
//                 </div>
//                 <button className="remove-btn">Remove</button>
//               </div>
//             ))}
//           </div>
//           <div className="cart-summary-detail">
//             <h3>Order Summary</h3>
//             <div className="summary-row">
//               <span>Subtotal:</span>
//               <span>${calculateCartTotal().toFixed(2)}</span>
//             </div>
//             <div className="summary-row">
//               <span>Shipping:</span>
//               <span>$5.99</span>
//             </div>
//             <div className="summary-row">
//               <span>Tax:</span>
//               <span>${(calculateCartTotal() * 0.08).toFixed(2)}</span>
//             </div>
//             <div className="summary-divider"></div>
//             <div className="summary-row total">
//               <span>Total:</span>
//               <span>${(calculateCartTotal() + 5.99 + (calculateCartTotal() * 0.08)).toFixed(2)}</span>
//             </div>
//             <button className="checkout-btn-large">Proceed to Checkout</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );

//   const renderOrders = () => (
//     <div className="tab-content">
//       <h2>Your Orders</h2>
//       <div className="orders-list">
//         {orders.map(order => (
//           <div key={order.id} className="order-card">
//             <div className="order-header">
//               <div className="order-info">
//                 <p className="order-id">Order #{order.id}</p>
//                 <p className="order-date">Placed on {new Date(order.date).toLocaleDateString()}</p>
//               </div>
//               <div className="order-status">
//                 <span className={`status-badge ${order.status}`}>{order.status}</span>
//               </div>
//             </div>
//             <div className="order-details">
//               <p>{order.items} items</p>
//               <p className="order-total">${order.total.toFixed(2)}</p>
//             </div>
//             <div className="order-actions">
//               <button className="action-btn">View Details</button>
//               <button className="action-btn">Reorder</button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );

//   const renderWallet = () => (
//     <div className="tab-content">
//       <h2>Your Wallet</h2>
//       <div className="wallet-balance">
//         <div className="balance-card">
//           <h3>Available Balance</h3>
//           <p className="balance-amount">${userData.balance.toFixed(2)}</p>
//           <div className="wallet-actions">
//             <button className="wallet-btn primary">Add Funds</button>
//             <button className="wallet-btn">Withdraw</button>
//           </div>
//         </div>
//       </div>
//       <div className="transaction-history">
//         <h3>Transaction History</h3>
//         <div className="transactions-list">
//           <div className="transaction-item">
//             <div className="transaction-info">
//               <p className="transaction-type">Deposit</p>
//               <p className="transaction-date">Nov 15, 2023</p>
//             </div>
//             <p className="transaction-amount positive">+$500.00</p>
//           </div>
//           <div className="transaction-item">
//             <div className="transaction-info">
//               <p className="transaction-type">Purchase</p>
//               <p className="transaction-date">Nov 12, 2023</p>
//             </div>
//             <p className="transaction-amount negative">-$129.99</p>
//           </div>
//           <div className="transaction-item">
//             <div className="transaction-info">
//               <p className="transaction-type">Commission</p>
//               <p className="transaction-date">Nov 10, 2023</p>
//             </div>
//             <p className="transaction-amount positive">+$42.50</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   const renderTree = () => (
//     <div className="tab-content">
//       <h2>Your Network Tree</h2>
//       <div className="tree-stats">
//         <div className="tree-stat-card">
//           <h3>Total Members</h3>
//           <p className="stat-number">{treeData.totalMembers || 0}</p>
//         </div>
//         <div className="tree-stat-card">
//           <h3>Direct Referrals</h3>
//           <p className="stat-number">{treeData.directReferrals || 0}</p>
//         </div>
//         <div className="tree-stat-card">
//           <h3>Total Commission</h3>
//           <p className="stat-number">
//             ${treeData.levels ? treeData.levels.reduce((total, level) => total + level.commission, 0).toFixed(2) : '0.00'}
//           </p>
//         </div>
//       </div>
//       <div className="tree-levels">
//         <h3>Level-wise Distribution</h3>
//         {treeData.levels ? (
//           <div className="levels-list">
//             {treeData.levels.map(level => (
//               <div key={level.level} className="level-item">
//                 <p>Level {level.level}</p>
//                 <div className="level-details">
//                   <span>{level.members} members</span>
//                   <span>${level.commission.toFixed(2)} commission</span>
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <p>No network data available</p>
//         )}
//       </div>
//       <div className="tree-visualization">
//         <h3>Network Visualization</h3>
//         <div className="tree-placeholder">
//           <p>Tree visualization would appear here</p>
//           <button className="view-full-tree-btn">View Full Tree</button>
//         </div>
//       </div>
//     </div>
//   );

//   const renderKYC = () => (
//     <div className="tab-content">
//       <h2>KYC Verification</h2>
//       <div className="kyc-status-card">
//         <div className={`kyc-status-badge ${kycStatus}`}>
//           {kycStatus === 'verified' ? 'Verified' : 'Pending Verification'}
//         </div>
//         <p>
//           {kycStatus === 'verified'
//             ? 'Your identity has been successfully verified.'
//             : 'Please complete your identity verification to access all features.'}
//         </p>
//       </div>
//       <div className="kyc-steps">
//         <h3>Verification Steps</h3>
//         <div className="step">
//           <div className="step-number">1</div>
//           <div className="step-content">
//             <h4>Personal Information</h4>
//             <p>Provide your basic personal details</p>
//             <button className="step-btn">Complete</button>
//           </div>
//         </div>
//         <div className="step">
//           <div className="step-number">2</div>
//           <div className="step-content">
//             <h4>ID Verification</h4>
//             <p>Upload a government-issued ID</p>
//             <button className="step-btn">Upload</button>
//           </div>
//         </div>
//         <div className="step">
//           <div className="step-number">3</div>
//           <div className="step-content">
//             <h4>Address Proof</h4>
//             <p>Submit a document that verifies your address</p>
//             <button className="step-btn">Submit</button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   return (
//     <div className="user-dashboard">
//       {/* <div className="dashboard-sidebar">
//         <div className="sidebar-header">
//           <img src={userData.avatar} alt={userData.name} className="user-avatar" />
//           <div className="user-info">
//             <h3>{userData.name}</h3>
//             <p>{userData.email}</p>
//           </div>
//         </div>
//         <nav className="sidebar-nav">
//           <button
//             className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
//             onClick={() => setActiveTab('dashboard')}
//           >
//             <FiHome /> Dashboard
//           </button>
//           <button
//             className={`nav-item ${activeTab === 'products' ? 'active' : ''}`}
//             onClick={() => setActiveTab('products')}
//           >
//             <FiPackage /> Products
//           </button>
//           <button
//             className={`nav-item ${activeTab === 'cart' ? 'active' : ''}`}
//             onClick={() => setActiveTab('cart')}
//           >
//             <FiShoppingCart /> Cart <span className="cart-count">{cartItems.length}</span>
//           </button>
//           <button
//             className={`nav-item ${activeTab === 'orders' ? 'active' : ''}`}
//             onClick={() => setActiveTab('orders')}
//           >
//             <FiList /> Orders
//           </button>
//           <button
//             className={`nav-item ${activeTab === 'wallet' ? 'active' : ''}`}
//             onClick={() => setActiveTab('wallet')}
//           >
//             <FiCreditCard /> Wallet
//           </button>
//           <button
//             className={`nav-item ${activeTab === 'tree' ? 'active' : ''}`}
//             onClick={() => setActiveTab('tree')}
//           >
//             <FiUsers /> Network Tree
//           </button>
//           <button
//             className={`nav-item ${activeTab === 'kyc' ? 'active' : ''}`}
//             onClick={() => setActiveTab('kyc')}
//           >
//             <FiFileText /> KYC
//           </button>
//         </nav>
//         <div className="sidebar-footer">
//           <button className="nav-item">
//             <FiSettings /> Settings
//           </button>
//         </div>
//       </div> */}

//       <div className="dashboard-main">
//         {/* <div className="dashboard-header">
//           <div className="search-bar">
//             <FiSearch />
//             <input type="text" placeholder="Search..." />
//           </div>
//           <div className="header-actions">
//             <button className="notification-btn">
//               <FiBell />
//               <span className="notification-badge">3</span>
//             </button>
//             <button className="profile-btn">
//               <img src={userData.avatar} alt={userData.name} />
//             </button>
//           </div>
//         </div> */}

//         <div className="dashboard-content-area">
//           {activeTab === 'dashboard' && renderDashboard()}
//           {activeTab === 'products' && renderProducts()}
//           {activeTab === 'cart' && renderCart()}
//           {activeTab === 'orders' && renderOrders()}
//           {activeTab === 'wallet' && renderWallet()}
//           {activeTab === 'tree' && renderTree()}
//           {activeTab === 'kyc' && renderKYC()}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;




import React, { useState, useEffect } from "react";
import "../../CssFiles/User/UserDashboard.css";
import axios from "axios";
import { getUserId } from "../../utills/authService";
import { useNavigate } from "react-router-dom";
import { IoIosCart } from "react-icons/io";
import { LuBoxes, LuReceiptIndianRupee } from "react-icons/lu";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";
import { CgFileDocument } from "react-icons/cg";
import { toast } from "react-hot-toast";

const Dashboard = () => {
  const id = getUserId();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");

  const [userData, setUserData] = useState({
    name: "Loading...",
    cart: "Loading...",
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
          totalOrderAmount: fatchdashboard.data.totalOrderAmount,
          walletBalance: fatchdashboard.data.walletBalance,
          kycStatus: fatchdashboard.data.kycStatus,
          gifts: fatchdashboard.data.gifts || [],
        });
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
              <div className="ud-stat-card" onClick={() => navigate('/cart')}>
                <div className="ud-stat-icon ud-level">
                  <IoIosCart />
                </div>
                <div className="ud-stat-info">
                  <h3>{userData.cart}</h3>
                  <p>Product Cart</p>
                </div>
              </div>

              <div className="ud-stat-card" onClick={() => navigate('/orders')}>
                <div className="ud-stat-icon ud-order">
                  <LuBoxes />
                </div>
                <div className="ud-stat-info">
                  <h3>{userData.orders}</h3>
                  <p>Total Orders</p>
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

              <div className="ud-stat-card" onClick={() => navigate('/wallet')}>
                <div className="ud-stat-icon ud-wallet">
                  <MdOutlineAccountBalanceWallet />
                </div>
                <div className="ud-stat-info">
                  <h3>{formatCurrency(userData.walletBalance)}</h3>
                  <p>Wallet Balance</p>
                </div>
              </div>

              <div className="ud-stat-card" onClick={() => navigate('/kyc')}>
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






// import React, { useState, useEffect } from "react";
// import "../../CssFiles/User/UserDashboard.css";
// import axios from "axios";
// import { getUserId } from "../../utills/authService";
// import { useNavigate } from "react-router-dom";
// import { IoIosCart } from "react-icons/io";
// import { LuBoxes } from "react-icons/lu";
// import { LuReceiptIndianRupee } from "react-icons/lu";
// import { MdOutlineAccountBalanceWallet } from "react-icons/md";
// import { CgFileDocument } from "react-icons/cg";
// import { toast } from "react-hot-toast";

// const Dashboard = () => {
//   const id = getUserId();
//   const navigate = useNavigate()
//   const [activeTab, setActiveTab] = useState("dashboard");

//   const [userData, setUserData] = useState({
//     name: "Loading",
//     cart: "Loading",
//     walletBalance: 0,
//     kycStatus: "Loading",
//     orders: 0,
//     totalOrderAmount: 0,
//     gifts: [],
//   });

//     const [topusers, setTopusers] = useState([
//     {
//       userId: "ORD001",
//       name: "Loading",
//       amount: 0,
//       email: "Loading",
//     },
//     {
//       userId: "ORD002",
//       name: "Loading",
//       amount: 0,
//       email: "Loading",
//     },
//   ]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // // console.log(id);

//         const fatchdashboard = await axios.get(
//           `${import.meta.env.VITE_API_URL}/users/dashboard/user/${id}`
//         );
//         // // console.log(fatchdashboard.data);
//         setUserData({
//           name: fatchdashboard.data.user.name,
//           cart: fatchdashboard.data.cartCount,
//           orders: fatchdashboard.data.orderCount,
//           totalOrderAmount: fatchdashboard.data.totalOrderAmount,
//           walletBalance: fatchdashboard.data.walletBalance,
//           kycStatus: fatchdashboard.data.kycStatus,
//           gifts: fatchdashboard.data.gifts,
//         });
//         setTopusers(fatchdashboard.data.topWithdrawalUsers);
//       } catch (error) {
//         console.error("Error fetching user data:", error);
//         toast.error("Error fetching user data");
//       }
//     };
//     fetchData();
//   }, []);
  

//   return (
//     <div className="user-dashboard">
//       <div className="user-container">
//         <main className="user-main">
//           <div className="dashboard-content">
//             <h2>Welcome, {userData.name}!</h2>
//             <div className="user-stats">
//               <div className="stat-card">
//                 <div className="stat-icon level">
//                   {/* <i className="fas fa-trophy"></i> */}
//                   <IoIosCart />
//                 </div>
//                 <div className="stat-info">
//                   <h3>{userData.cart}</h3>
//                   <p>Product Cart</p>
//                 </div>
//               </div>

//               <div className="stat-card">
//                 <div className="stat-icon order">
//                   {/* <i className="fas fa-trophy"></i> */}
//                   <LuBoxes />
//                 </div>
//                 <div className="stat-info">
//                   <h3>{userData.orders}</h3>
//                   <p>Total Orders</p>
//                 </div>
//               </div>

//               <div className="stat-card">
//                 <div className="stat-icon points">
//                   {/* <i className="fas fa-star"></i> */}
//                   <LuReceiptIndianRupee />
//                 </div>
//                 <div className="stat-info">
//                   <h3>₹{userData.totalOrderAmount.toFixed(1)}</h3>
//                   <p>Total Order Amount</p>
//                 </div>
//               </div>
//               <div className="stat-card">
//                 <div className="stat-icon wallet">
//                   {/* <i className="fas fa-wallet"></i> */}
//                   < MdOutlineAccountBalanceWallet />
//                 </div>
//                 <div className="stat-info">
//                   <h3>₹{userData.walletBalance}</h3>
//                   <p>Wallet Balance</p>
//                 </div>
//               </div>
//               <div className="stat-card">
//                 <div className="stat-icon kyc">
//                   <CgFileDocument />
//                 </div>
//                 <div className="stat-info">
//                   <h3
//                     className={userData.kycStatus
//                       .toLowerCase()
//                       .replace(" ", "-")}
//                   >
//                     {userData.kycStatus}
//                   </h3>
//                   <p>KYC Status</p>
//                 </div>
//               </div>
//             </div>
//             <div className="dashboard-sections">

//               <div className="dashboard-card recent-orders">
//                 <h3 className="section-title">Top Users Withdraws</h3>
//                 {topusers.slice(0, 5).map((order) => (
//                   <div key={order.userId} className="order-item">
//                     <div className="order-info">
//                       <h4>User Name: {order?.name}</h4>
//                       <p>
//                          {order?.email}
//                       </p>
//                     </div>
//                     <div
//                       className={`order-status `}
//                     >
//                       ₹{order.amount}
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               {/* Gifts / Offers */}
//               <div className="dashboard-card gift-offer-info">
//                 <h3 className="section-title">Gifts or Offers</h3>
//                 <div className="gift-list">
//                   {userData?.gifts?.map((gift, index) => (
//                     <div key={index} className="gift-item">
//                       <div className="gift-icon">
//                         <img src={gift.imageUrl} alt={gift.name} />
//                       </div>
//                       <div className="gift-info">
//                         <h4>{gift.title}</h4>
//                         <p>{gift.description}</p>
//                       </div>
//                       <div className="gift-status">
//                         <p>Status: {gift.status}</p>
//                       </div>
//                       <div className="gift-validity">
//                         <p>Validity: {new Date(gift.validity).toISOString().slice(0, 10)}</p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
