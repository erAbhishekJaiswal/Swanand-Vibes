// // Orders.js
// import React, { useState } from 'react';
// import '../../CssFiles/User/Cart.css';
// import { useEffect } from 'react';
// import {getOrders} from '../../utills/apicall';
// import { getUserId } from '../../utills/authService';

// const Orders = () => {
//   const [activeTab, setActiveTab] = useState('all');
//   const [orders, setOrders] = useState([
//     {
//       id: 'ORD-12345',
//       date: '2023-11-15',
//       status: 'delivered',
//       items: [
//         {
//           name: "Quantum VR Headset",
//           price: 499.99,
//           quantity: 1,
//           image: "https://via.placeholder.com/80x80/1e293b/ffffff?text=VR"
//         }
//       ],
//       total: 539.99,
//       trackingNumber: 'TRK789456123',
//       deliveryDate: '2023-11-18'
//     },
//     {
//       id: 'ORD-12346',
//       date: '2023-11-10',
//       status: 'shipped',
//       items: [
//         {
//           name: "Neural Smartwatch",
//           price: 349.99,
//           quantity: 2,
//           image: "https://via.placeholder.com/80x80/1e293b/ffffff?text=Watch"
//         },
//         {
//           name: "Wireless Charger",
//           price: 89.99,
//           quantity: 1,
//           image: "https://via.placeholder.com/80x80/1e293b/ffffff?text=Charger"
//         }
//       ],
//       total: 849.97,
//       trackingNumber: 'TRK456789123',
//       estimatedDelivery: '2023-11-17'
//     },
//     {
//       id: 'ORD-12347',
//       date: '2023-11-05',
//       status: 'processing',
//       items: [
//         {
//           name: "Holographic Display",
//           price: 899.99,
//           quantity: 1,
//           image: "https://via.placeholder.com/80x80/1e293b/ffffff?text=Display"
//         }
//       ],
//       total: 971.99,
//       expectedShipDate: '2023-11-12'
//     },
//     {
//       id: 'ORD-12348',
//       date: '2023-10-28',
//       status: 'cancelled',
//       items: [
//         {
//           name: "Smart Home Hub",
//           price: 129.99,
//           quantity: 1,
//           image: "https://via.placeholder.com/80x80/1e293b/ffffff?text=Hub"
//         }
//       ],
//       total: 140.39,
//       cancellationReason: 'Customer request'
//     }
//   ]);
//   const userId = getUserId();

// useEffect(() => {
//     // Fetch orders from API or context
//     const fetchOrders = async () => {
//       try {
//         const response = await getOrders(userId);
//         const data = response.data.data;
//         console.log('Fetched orders:', data);
//         setOrders(data);
//       } catch (error) {
//         console.error('Error fetching orders:', error);
//       }
//     };

//     fetchOrders();
//   }, []);

//   // const orders = [
//   //   {
//   //     id: 'ORD-12345',
//   //     date: '2023-11-15',
//   //     status: 'delivered',
//   //     items: [
//   //       {
//   //         name: "Quantum VR Headset",
//   //         price: 499.99,
//   //         quantity: 1,
//   //         image: "https://via.placeholder.com/80x80/1e293b/ffffff?text=VR"
//   //       }
//   //     ],
//   //     total: 539.99,
//   //     trackingNumber: 'TRK789456123',
//   //     deliveryDate: '2023-11-18'
//   //   },
//   //   {
//   //     id: 'ORD-12346',
//   //     date: '2023-11-10',
//   //     status: 'shipped',
//   //     items: [
//   //       {
//   //         name: "Neural Smartwatch",
//   //         price: 349.99,
//   //         quantity: 2,
//   //         image: "https://via.placeholder.com/80x80/1e293b/ffffff?text=Watch"
//   //       },
//   //       {
//   //         name: "Wireless Charger",
//   //         price: 89.99,
//   //         quantity: 1,
//   //         image: "https://via.placeholder.com/80x80/1e293b/ffffff?text=Charger"
//   //       }
//   //     ],
//   //     total: 849.97,
//   //     trackingNumber: 'TRK456789123',
//   //     estimatedDelivery: '2023-11-17'
//   //   },
//   //   {
//   //     id: 'ORD-12347',
//   //     date: '2023-11-05',
//   //     status: 'processing',
//   //     items: [
//   //       {
//   //         name: "Holographic Display",
//   //         price: 899.99,
//   //         quantity: 1,
//   //         image: "https://via.placeholder.com/80x80/1e293b/ffffff?text=Display"
//   //       }
//   //     ],
//   //     total: 971.99,
//   //     expectedShipDate: '2023-11-12'
//   //   },
//   //   {
//   //     id: 'ORD-12348',
//   //     date: '2023-10-28',
//   //     status: 'cancelled',
//   //     items: [
//   //       {
//   //         name: "Smart Home Hub",
//   //         price: 129.99,
//   //         quantity: 1,
//   //         image: "https://via.placeholder.com/80x80/1e293b/ffffff?text=Hub"
//   //       }
//   //     ],
//   //     total: 140.39,
//   //     cancellationReason: 'Customer request'
//   //   }
//   // ];

//   const filteredOrders = activeTab === 'all' 
//     ? orders 
//     : orders.filter(order => order.status === activeTab);

//   const getStatusBadge = (status) => {
//     switch (status) {
//       case 'delivered': return 'status-badge delivered';
//       case 'shipped': return 'status-badge shipped';
//       case 'processing': return 'status-badge processing';
//       case 'cancelled': return 'status-badge cancelled';
//       default: return 'status-badge';
//     }
//   };

//   const getStatusText = (status) => {
//     switch (status) {
//       case 'delivered': return 'Delivered';
//       case 'shipped': return 'Shipped';
//       case 'processing': return 'Processing';
//       case 'cancelled': return 'Cancelled';
//       default: return status;
//     }
//   };

//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric'
//     });
//   };

//   return (
//     <div className="orders-container">
//       <div className="orders-header">
//         <h1>My Orders</h1>
//         <p>Track and manage your orders</p>
//       </div>

//       <div className="orders-tabs">
//         <button 
//           className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`}
//           onClick={() => setActiveTab('all')}
//         >
//           All Orders
//         </button>
//         <button 
//           className={`tab-btn ${activeTab === 'processing' ? 'active' : ''}`}
//           onClick={() => setActiveTab('processing')}
//         >
//           Processing
//         </button>
//         <button 
//           className={`tab-btn ${activeTab === 'shipped' ? 'active' : ''}`}
//           onClick={() => setActiveTab('shipped')}
//         >
//           Shipped
//         </button>
//         <button 
//           className={`tab-btn ${activeTab === 'delivered' ? 'active' : ''}`}
//           onClick={() => setActiveTab('delivered')}
//         >
//           Delivered
//         </button>
//         <button 
//           className={`tab-btn ${activeTab === 'cancelled' ? 'active' : ''}`}
//           onClick={() => setActiveTab('cancelled')}
//         >
//           Cancelled
//         </button>
//       </div>

//       <div className="orders-content">
//         {filteredOrders?.length === 0 ? (
//           <div className="no-orders">
//             <div className="no-orders-icon">📦</div>
//             <h3>No orders found</h3>
//             <p>You don't have any {activeTab !== 'all' ? activeTab : ''} orders yet.</p>
//             <button className="shop-now-btn">
//               Start Shopping
//             </button>
//           </div>
//         ) : (
//           <div className="orders-list">
//             {filteredOrders?.map(order => (
//               <div key={order.id} className="order-card">
//                 <div className="order-header">
//                   <div className="order-info">
//                     <h3 className="order-id">Order #{order.id}</h3>
//                     <p className="order-date">Placed on {formatDate(order.date)}</p>
//                   </div>
//                   <div className="order-status">
//                     <span className={getStatusBadge(order.status)}>
//                       {getStatusText(order.status)}
//                     </span>
//                   </div>
//                 </div>

//                 <div className="order-items">
//                   {order?.items.map((item, index) => (
//                     <div key={index} className="order-item">
//                       <img src={item.image} alt={item.name} className="item-image" />
//                       <div className="item-info">
//                         <h4 className="item-name">{item.name}</h4>
//                         <p className="item-quantity">Quantity: {item.quantity}</p>
//                       </div>
//                       <div className="item-price">₹{item.price.toFixed(2)}</div>
//                     </div>
//                   ))}
//                 </div>

//                 <div className="order-footer">
//                   <div className="order-total">
//                     <span>Total: </span>
//                     <span className="total-amount">₹{order.total.toFixed(2)}</span>
//                   </div>

//                   <div className="order-actions">
//                     {order?.status === 'delivered' && (
//                       <>
//                         <button className="action-btn">Buy Again</button>
//                         <button className="action-btn">Return Item</button>
//                         <button className="action-btn">Write Review</button>
//                       </>
//                     )}
//                     {order?.status === 'shipped' && (
//                       <>
//                         <button className="action-btn">Track Package</button>
//                         <button className="action-btn">View Details</button>
//                       </>
//                     )}
//                     {order?.status === 'processing' && (
//                       <button className="action-btn">Cancel Order</button>
//                     )}
//                     <button className="action-btn primary">View Details</button>
//                   </div>
//                 </div>

//                 {order?.trackingNumber && (
//                   <div className="tracking-info">
//                     <span className="tracking-label">Tracking Number: </span>
//                     <span className="tracking-number">{order.trackingNumber}</span>
//                   </div>
//                 )}

//                 {order?.deliveryDate && (
//                   <div className="delivery-info">
//                     <span className="delivery-label">Delivered on: </span>
//                     <span className="delivery-date">{formatDate(order.deliveryDate)}</span>
//                   </div>
//                 )}

//                 {order?.estimatedDelivery && (
//                   <div className="delivery-info">
//                     <span className="delivery-label">Estimated Delivery: </span>
//                     <span className="delivery-date">{formatDate(order.estimatedDelivery)}</span>
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Orders;












// *******************************************
// Orders.js
// import React, { useState, useEffect } from 'react';
// import '../../CssFiles/User/Cart.css';
// import { getOrders } from '../../utills/apicall';
// import { getUserId } from '../../utills/authService';
// import Spinner from '../../components/Spinner';
// import { useNavigate } from 'react-router-dom';
// import {toast} from 'react-hot-toast'

// const Orders = () => {
//   const navigate = useNavigate();
//   const [activeTab, setActiveTab] = useState('all');
//   const [orders, setOrders] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const userId = getUserId();

//   useEffect(() => {
//     // Fetch orders from API
//     const fetchOrders = async () => {
//       try {
//         setIsLoading(true);
//         const response = await getOrders(userId);
//         const data = response.data.data;
//         console.log('Fetched orders:', data);
//         setOrders(data);
//       } catch (error) {
//         console.error('Error fetching orders:', error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchOrders();
//   }, [userId]);

//   const filteredOrders = activeTab === 'all' 
//     ? orders 
//     : orders.filter(order => {
//         if (activeTab === 'processing') return order.deliveryStatus === 'pending';
//         if (activeTab === 'shipped') return order.deliveryStatus === 'shipped';
//         if (activeTab === 'delivered') return order.isDelivered;
//         if (activeTab === 'cancelled') return order.deliveryStatus === 'cancelled';
//         return true;
//       });

//   const getStatusBadge = (order) => {
//     if (order.isDelivered) return 'status-badge delivered';
//     if (order.deliveryStatus === 'shipped') return 'status-badge shipped';
//     if (order.deliveryStatus === 'pending') return 'status-badge processing';
//     if (order.deliveryStatus === 'cancelled') return 'status-badge cancelled';
//     return 'status-badge';
//   };

//   const getStatusText = (order) => {
//     if (order.isDelivered) return 'Delivered';
//     if (order.deliveryStatus === 'shipped') return 'Shipped';
//     if (order.deliveryStatus === 'pending') return 'Processing';
//     if (order.deliveryStatus === 'cancelled') return 'Cancelled';
//     return order.deliveryStatus || 'Pending';
//   };

//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric'
//     });
//   };

//   const handleViewDetails = (id) => {
//     // Navigate to the order details page
//     navigate(`/user/orders/${id}`);
//   };

//   const handleCancelOrder = (id) => {
//     // Handle order cancellation
//     console.log(`Cancel order with ID: ${id}`);
//     toast.success('Order cancelled successfully');
//   }

//   if (isLoading) {
//     return <Spinner size='lg' />
//     // (
//     //   <div className="orders-container">
//     //     <div className="orders-header">
//     //       <h1>My Orders</h1>
//     //       <p>Track and manage your orders</p>
//     //     </div>
//     //     <div className="loading">Loading orders...</div>
//     //   </div>
//     // );
//   }

//   return (
//     <div className="orders-container">
//       <div className="orders-header">
//         <h1>My Orders</h1>
//         <p>Track and manage your orders</p>
//       </div>

//       <div className="orders-tabs">
//         <button 
//           className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`}
//           onClick={() => setActiveTab('all')}
//         >
//           All Orders
//         </button>
//         <button 
//           className={`tab-btn ${activeTab === 'processing' ? 'active' : ''}`}
//           onClick={() => setActiveTab('processing')}
//         >
//           Processing
//         </button>
//         <button 
//           className={`tab-btn ${activeTab === 'shipped' ? 'active' : ''}`}
//           onClick={() => setActiveTab('shipped')}
//         >
//           Shipped
//         </button>
//         <button 
//           className={`tab-btn ${activeTab === 'delivered' ? 'active' : ''}`}
//           onClick={() => setActiveTab('delivered')}
//         >
//           Delivered
//         </button>
//         {/* <button 
//           className={`tab-btn ${activeTab === 'cancelled' ? 'active' : ''}`}
//           onClick={() => setActiveTab('cancelled')}
//         >
//           Cancelled
//         </button> */}
//       </div>

//       <div className="orders-content">
//         {filteredOrders.length === 0 ? (
//           <div className="no-orders">
//             <div className="no-orders-icon">📦</div>
//             <h3>No orders found</h3>
//             <p>You don't have any {activeTab !== 'all' ? activeTab : ''} orders yet.</p>
//             <button className="shop-now-btn">
//               Start Shopping
//             </button>
//           </div>
//         ) : (
//           <div className="orders-list">
//             {filteredOrders.map(order => (
//               <div key={order._id} className="order-card">
//                 <div className="order-header">
//                   <div className="order-info">
//                     <h3 className="order-id">Order #{order._id.slice(-8).toUpperCase()}</h3>
//                     <p className="order-date">Placed on {formatDate(order.createdAt)}</p>
//                   </div>
//                   <div className="order-status">
//                     <span className={getStatusBadge(order)}>
//                       {getStatusText(order)}
//                     </span>
//                   </div>
//                 </div>

//                 <div className="order-items">
//                   {order.orderItems.map((item, index) => (
//                     <div key={index} className="order-item">
//                       <img 
//                         src={item.image || "https://via.placeholder.com/80x80/1e293b/ffffff?text=Product"} 
//                         alt={item.name} 
//                         className="item-image" 
//                       />
//                       <div className="item-info">
//                         <h4 className="item-name">{item.name}</h4>
//                         <p className="item-quantity">Quantity: {item.qty}</p>
//                       </div>
//                       <div className="item-price">₹{(item.price * item.qty).toFixed(2)}</div>
//                     </div>
//                   ))}
//                 </div>

//                 <div className="order-details">
//                   <div className="detail-row">
//                     <span className="detail-label">Payment Method:</span>
//                     <span className="detail-value">{order.paymentMethod}</span>
//                   </div>
//                   <div className="detail-row">
//                     <span className="detail-label">Shipping Method:</span>
//                     <span className="detail-value">{order.shippingMethod}</span>
//                   </div>
//                   <div className="detail-row">
//                     <span className="detail-label">Shipping Address:</span>
//                     <span className="detail-value">
//                       {order.shippingAddress.address}, {order.shippingAddress.apartment && `${order.shippingAddress.apartment}, `}
//                       {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}, {order.shippingAddress.country}
//                     </span>
//                   </div>
//                 </div>

//                 <div className="order-footer">
//                   <div className="order-totals">
//                     <div className="total-row">
//                       <span>Items:</span>
//                       <span>₹{order.itemsPrice.toFixed(2)}</span>
//                     </div>
//                     <div className="total-row">
//                       <span>Shipping:</span>
//                       <span>{order.shippingPrice === 0 ? 'Free' : `₹${order.shippingPrice.toFixed(2)}`}</span>
//                     </div>
//                     <div className="total-row">
//                       <span>Tax:</span>
//                       <span>₹{order.taxPrice.toFixed(2)}</span>
//                     </div>
//                     <div className="total-row total">
//                       <span>Total:</span>
//                       <span className="total-amount">₹{order.totalPrice.toFixed(2)}</span>
//                     </div>
//                   </div>

//                   <div className="order-actions">
//                     {/* {order.isDelivered && (
//                       <>
//                         <button className="order-action-btn">Buy Again</button>
//                         <button className="order-action-btn">Return Item</button>
//                         <button className="order-action-btn">Write Review</button>
//                       </>
//                     )}
//                     {order.deliveryStatus === 'shipped' && (
//                       <>
//                         <button className="order-action-btn">Track Package</button>
//                       </>
//                     )}
//                     {order.deliveryStatus === 'pending' && (
//                       <button onClick={() => handleCancelOrder(order._id)} className="order-action-btn">Cancel Order</button>
//                     )} */}
//                     <button onClick={() => handleViewDetails(order._id)} className="order-action-btn primary">View Details</button>
//                   </div>
//                 </div>

//                 {order.deliveryStatus === 'shipped' && (
//                   <div className="tracking-info">
//                     <span className="tracking-label">Tracking Number: </span>
//                     <span className="tracking-number">{order.trackingNumber || 'Not available yet'}</span>
//                   </div>
//                 )}

//                 {order.isDelivered && order.updatedAt && (
//                   <div className="delivery-info">
//                     <span className="delivery-label">Delivered on: </span>
//                     <span className="delivery-date">{formatDate(order.updatedAt)}</span>
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Orders;




import React, { useState, useEffect } from 'react';
import '../../CssFiles/User/Orders.css';
import { getOrders } from '../../utills/apicall';
import { getUserId } from '../../utills/authService';
import Spinner from '../../components/Spinner';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { FiEye, FiPackage, FiTruck, FiCheckCircle, FiXCircle, FiClock, FiSearch } from 'react-icons/fi';

const Orders = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const userId = getUserId();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setIsLoading(true);
        const response = await getOrders(userId);
        const data = response.data.data;
        setOrders(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
        toast.error('Failed to load orders');
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, [userId]);

  const filteredOrders = orders.filter(order => {
    // Status filter
    const statusMatch = activeTab === 'all' || 
      (activeTab === 'processing' && order.deliveryStatus === 'pending') ||
      (activeTab === 'shipped' && order.deliveryStatus === 'shipped') ||
      (activeTab === 'delivered' && order.isDelivered) ||
      (activeTab === 'cancelled' && order.deliveryStatus === 'cancelled');
    
    // Search filter
    const searchMatch = searchTerm === '' || 
      order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.orderItems.some(item => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    
    return statusMatch && searchMatch;
  });

  const getStatusIcon = (order) => {
    if (order.isDelivered) return <FiCheckCircle className="user-order-status-icon" />;
    if (order.deliveryStatus === 'shipped') return <FiTruck className="user-order-status-icon" />;
    if (order.deliveryStatus === 'pending') return <FiClock className="user-order-status-icon" />;
    if (order.deliveryStatus === 'cancelled') return <FiXCircle className="user-order-status-icon" />;
    return <FiPackage className="user-order-status-icon" />;
  };

  const getStatusClass = (order) => {
    if (order.isDelivered) return 'user-order-status-delivered';
    if (order.deliveryStatus === 'shipped') return 'user-order-status-shipped';
    if (order.deliveryStatus === 'pending') return 'user-order-status-processing';
    if (order.deliveryStatus === 'cancelled') return 'user-order-status-cancelled';
    return 'user-order-status-pending';
  };

  const getStatusText = (order) => {
    if (order.isDelivered) return 'Delivered';
    if (order.deliveryStatus === 'shipped') return 'Shipped';
    if (order.deliveryStatus === 'pending') return 'Processing';
    if (order.deliveryStatus === 'cancelled') return 'Cancelled';
    return order.deliveryStatus || 'Pending';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const handleViewDetails = (id) => {
    navigate(`/user/orders/${id}`);
  };

  if (isLoading) {
    return (
      <div className="user-orders-loading">
        <Spinner size='lg' />
        <p>Loading your orders...</p>
      </div>
    );
  }

  return (
    <div className="user-orders-container">
      <div className="user-orders-header">
        <div className="user-orders-header-content">
          <h1>📦 My Orders</h1>
          <p>Track and manage your order history</p>
        </div>
      </div>

      <div className="user-orders-controls">
        <div className="user-orders-search">
          {/* <FiSearch className="user-orders-search-icon" /> */}
          <input
            type="text"
            placeholder="Search orders or products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="user-orders-search-input"
          />
        </div>

        <div className="user-orders-tabs">
          <button 
            className={`user-orders-tab-btn ${activeTab === 'all' ? 'user-orders-tab-active' : ''}`}
            onClick={() => setActiveTab('all')}
          >
            All Orders
          </button>
          <button 
            className={`user-orders-tab-btn ${activeTab === 'processing' ? 'user-orders-tab-active' : ''}`}
            onClick={() => setActiveTab('processing')}
          >
            Processing
          </button>
          <button 
            className={`user-orders-tab-btn ${activeTab === 'shipped' ? 'user-orders-tab-active' : ''}`}
            onClick={() => setActiveTab('shipped')}
          >
            Shipped
          </button>
          <button 
            className={`user-orders-tab-btn ${activeTab === 'delivered' ? 'user-orders-tab-active' : ''}`}
            onClick={() => setActiveTab('delivered')}
          >
            Delivered
          </button>
        </div>
      </div>

      <div className="user-orders-content">
        {filteredOrders.length === 0 ? (
          <div className="user-orders-empty">
            <div className="user-orders-empty-icon">
              <FiPackage />
            </div>
            <h3>No orders found</h3>
            <p>You don't have any {activeTab !== 'all' ? activeTab : ''} orders yet.</p>
            <button 
              className="user-orders-shop-btn"
              onClick={() => navigate('/products')}
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="user-orders-table-container">
            <div className="user-orders-table-header">
              <span>{filteredOrders.length} {filteredOrders.length === 1 ? 'order' : 'orders'} found</span>
            </div>
            
            <div className="user-orders-table-wrapper">
              <table className="user-orders-table">
                <thead>
                  <tr>
                    <th className="user-orders-th-order">Order ID</th>
                    <th className="user-orders-th-date">Date</th>
                    <th className="user-orders-th-items">Items</th>
                    <th className="user-orders-th-total">Total Amount</th>
                    <th className="user-orders-th-status">Status</th>
                    <th className="user-orders-th-actions">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map(order => (
                    <tr key={order._id} className="user-orders-table-row">
                      <td className="user-orders-td-order">
                        <div className="user-orders-order-id">
                          #{order._id.slice(-8).toUpperCase()}
                        </div>
                        <div className="user-orders-payment-method">
                          {order.paymentMethod?.replace('_', ' ').toUpperCase()}
                        </div>
                      </td>
                      
                      <td className="user-orders-td-date">
                        {formatDate(order.createdAt)}
                      </td>
                      
                      <td className="user-orders-td-items">
                        <div className="user-orders-items-list">
                          {order.orderItems.slice(0, 2).map((item, index) => (
                            <div key={index} className="user-orders-item-preview">
                              <img 
                                src={item.image || "https://via.placeholder.com/40x40/1e293b/ffffff?text=Product"} 
                                alt={item.name} 
                                className="user-orders-item-image" 
                              />
                              <span className="user-orders-item-name">
                                {item.name}
                                {item.qty > 1 && ` (×${item.qty})`}
                              </span>
                            </div>
                          ))}
                          {order.orderItems.length > 2 && (
                            <div className="user-orders-more-items">
                              +{order.orderItems.length - 2} more items
                            </div>
                          )}
                        </div>
                      </td>
                      
                      <td className="user-orders-td-total">
                        <div className="user-orders-total-amount">
                          {formatCurrency(order.totalPrice)}
                        </div>
                      </td>
                      
                      <td className="user-orders-td-status">
                        <div className={`user-orders-status ${getStatusClass(order)}`}>
                          {getStatusIcon(order)}
                          <span>{getStatusText(order)}</span>
                        </div>
                        {order.isDelivered && order.updatedAt && (
                          <div className="user-orders-delivery-date">
                            on {formatDate(order.updatedAt)}
                          </div>
                        )}
                      </td>
                      
                      <td className="user-orders-td-actions">
                        <button 
                          onClick={() => handleViewDetails(order._id)}
                          className="user-orders-view-btn"
                          title="View order details"
                        >
                          <FiEye /> Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Order Summary Cards for Mobile */}
      <div className="user-orders-mobile-cards">
        {filteredOrders.map(order => (
          <div key={order._id} className="user-orders-mobile-card">
            <div className="user-orders-mobile-card-header">
              <div className="user-orders-mobile-order-info">
                <div className="user-orders-mobile-order-id">
                  Order #{order._id.slice(-8).toUpperCase()}
                </div>
                <div className="user-orders-mobile-order-date">
                  {formatDate(order.createdAt)}
                </div>
              </div>
              <div className={`user-orders-mobile-status ${getStatusClass(order)}`}>
                {getStatusIcon(order)}
                <span>{getStatusText(order)}</span>
              </div>
            </div>

            <div className="user-orders-mobile-items">
              {order.orderItems.slice(0, 2).map((item, index) => (
                <div key={index} className="user-orders-mobile-item">
                  <img 
                    src={item.image || "https://via.placeholder.com/40x40/1e293b/ffffff?text=Product"} 
                    alt={item.name} 
                    className="user-orders-mobile-item-image" 
                  />
                  <div className="user-orders-mobile-item-info">
                    <div className="user-orders-mobile-item-name">{item.name}</div>
                    <div className="user-orders-mobile-item-quantity">Quantity: {item.qty}</div>
                  </div>
                </div>
              ))}
              {order.orderItems.length > 2 && (
                <div className="user-orders-mobile-more-items">
                  +{order.orderItems.length - 2} more items
                </div>
              )}
            </div>

            <div className="user-orders-mobile-card-footer">
              <div className="user-orders-mobile-total">
                Total: {formatCurrency(order.totalPrice)}
              </div>
              <button 
                onClick={() => handleViewDetails(order._id)}
                className="user-orders-mobile-view-btn"
              >
                <FiEye /> View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;