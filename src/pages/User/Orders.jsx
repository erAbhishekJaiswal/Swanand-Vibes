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