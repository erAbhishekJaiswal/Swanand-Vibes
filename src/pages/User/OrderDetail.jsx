// OrderDetail.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { getUserId } from '../../utills/authService';
import '../../CssFiles/User/OrderDetail.css';
import { toast } from 'react-hot-toast';
import Spinner from '../../components/Spinner';

const OrderDetail = () => {
  const { id } = useParams();
  // // console.log(id);

  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const userId = getUserId();

  useEffect(() => {
    const fetchOrderDetail = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/order/${id}`
        //     , {
        //   params: { userId }
        // }
    );
    // // console.log(response.data.data);
    
        setOrder(response.data.data);
      } catch (err) {
        console.error('Error fetching order details:', err);
        setError('Failed to load order details. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrderDetail();
  }, []);

  const getStatusBadge = (order) => {
    if (order.isDelivered) return 'status-badge delivered';
    if (order.deliveryStatus === 'shipped') return 'status-badge shipped';
    if (order.deliveryStatus === 'pending') return 'status-badge processing';
    if (order.deliveryStatus === 'cancelled') return 'status-badge cancelled';
    return 'status-badge';
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
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getProgressSteps = (order) => {
    const steps = [
      { name: 'Order Placed', status: 'completed' },
      { name: 'Processing', status: order.deliveryStatus !== 'pending' ? 'completed' : 'active' },
      { name: 'Shipped', status: order.deliveryStatus === 'shipped' || order.isDelivered ? 'completed' : 'pending' },
      { name: 'Delivered', status: order.isDelivered ? 'completed' : 'pending' }
    ];
    
    if (order.deliveryStatus === 'cancelled') {
      steps.forEach(step => {
        if (step.name !== 'Order Placed') step.status = 'cancelled';
      });
    }
    
    return steps;
  };

  if (isLoading) {
    return (
      <Spinner size='lg' />
      // <div className="order-detail-container">
      //   <div className="loading-spinner">
      //     <div className="spinner"></div>
      //     <p>Loading order details...</p>
      //   </div>
      // </div>
    );
  }

  if (error) {
    return (
      <div className="order-detail-container">
        <div className="error-message">
          <h3>Oops! Something went wrong</h3>
          <p>{error}</p>
          <button className="retry-btn" onClick={() => window.location.reload()}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="order-detail-container">
        <div className="not-found">
          <h3>Order Not Found</h3>
          <p>The order you're looking for doesn't exist.</p>
          <button className="back-btn" onClick={() => window.history.back()}>
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const progressSteps = getProgressSteps(order);

  return (
    <div className="order-detail-container">
      <div className="order-detail-header">
        <button className="back-button" onClick={() => window.history.back()}>
          &larr; Back to Orders
        </button>
        <h1>Order Details</h1>
        <p className="order-id">Order #: {order._id.slice(-8).toUpperCase()}</p>
      </div>

      <div className="order-detail-content">
        {/* Order Status Card */}
        <div className="order-status-card">
          <div className="status-header">
            <h2>Order Status</h2>
            <span className={getStatusBadge(order)}>
              {getStatusText(order)}
            </span>
          </div>
          
          <div className="progress-tracker">
            {progressSteps.map((step, index) => (
              <div key={index} className={`progress-step ${step.status}`}>
                <div className="step-icon">
                  {step.status === 'completed' && '✓'}
                  {step.status === 'active' && '•'}
                  {step.status === 'pending' && index + 1}
                  {step.status === 'cancelled' && '✕'}
                </div>
                <span className="step-label">{step.name}</span>
                {/* {index < progressSteps.length - 1 && (
                  <div className="step-connector"></div>
                )} */}
              </div>
            ))}
          </div>
          
          <div className="order-dates">
            <div className="date-info">
              <span className="date-label">Order Placed:</span>
              <span className="date-value">{formatDate(order.createdAt)}</span>
            </div>
            {order.updatedAt !== order.createdAt && (
              <div className="date-info">
                <span className="date-label">Last Updated:</span>
                <span className="date-value">{formatDate(order.updatedAt)}</span>
              </div>
            )}
          </div>
        </div>

        <div className="order-detail-grid">
          {/* Order Items Card */}
          <div className="order-items-card">
            <h2>Order Items</h2>
            <div className="order-items-list">
              {order.orderItems.map((item, index) => (
                <div key={index} className="order-item-detail">
                  <img 
                    src={item.image || "https://via.placeholder.com/80x80/1e293b/ffffff?text=Product"} 
                    alt={item.name} 
                    className="item-image" 
                  />
                  <div className="item-details">
                    <h4 className="item-name">{item.name}</h4>
                    <p className="item-price">₹{item.price.toFixed(2)} each</p>
                    <p className="item-quantity">Quantity: {item.qty}</p>
                  </div>
                  <div className="item-total">
                    ₹{(item.price * item.qty).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary Card */}
          <div className="order-summary-card">
            <h2>Order Summary</h2>
            <div className="summary-details">
              <div className="summary-row">
                <span>Items ({order.orderItems.reduce((total, item) => total + item.qty, 0)}):</span>
                <span>₹{order.itemsPrice.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Shipping:</span>
                <span>{order.shippingPrice === 0 ? 'Free' : `₹${order.shippingPrice.toFixed(2)}`}</span>
              </div>
              <div className="summary-row">
                <span>Tax:</span>
                <span>₹{order.taxPrice.toFixed(2)}</span>
              </div>
              <div className="summary-divider"></div>
              <div className="summary-row total">
                <span>Total:</span>
                <span>₹{order.totalPrice.toFixed(2)}</span>
              </div>
            </div>

            <div className="payment-info">
              <h3>Payment Information</h3>
              <div className="payment-detail">
                <span className="payment-label">Method:</span>
                <span className="payment-value">{order.paymentMethod}</span>
              </div>
              <div className="payment-detail">
                <span className="payment-label">Status:</span>
                <span className={`payment-status ${order.isPaid ? 'paid' : 'pending'}`}>
                  {order.isPaid ? 'Paid' : 'Pending'}
                </span>
              </div>
            </div>

            <div className="shipping-info">
              <h3>Shipping Method</h3>
              <p className="shipping-method">{order.shippingMethod}</p>
            </div>
          </div>
        </div>

        {/* Shipping Address Card */}
        <div className="shipping-address-card">
          <h2>Shipping Address</h2>
          <div className="address-details">
            <p className="address-name">{order.shippingAddress.apartment}</p>
            <p className="address-street">{order.shippingAddress.address}</p>
            <p className="address-city">
              {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}
            </p>
            <p className="address-country">{order.shippingAddress.country}</p>
          </div>
        </div>

        {/* Order Actions */}
        {/* <div className="order-actions-card">
          <h2>Order Actions</h2>
          <div className="action-buttons">
            {!order.isDelivered && order.deliveryStatus !== 'cancelled' && (
              <button className="order-action-btn cancel-btn">
                Cancel Order
              </button>
            )}
            {order.isDelivered && (
              <>
                <button className="order-action-btn return-btn">
                  Return Items
                </button>
                <button className="order-action-btn review-btn">
                  Write a Review
                </button>
              </>
            )}
            <button className="order-action-btn help-btn">
              Get Help
            </button>
            <button className="order-action-btn invoice-btn">
              Download Invoice
            </button>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default OrderDetail;