// Orders.js
import React, { useState } from 'react';
import '../../CssFiles/User/Cart.css';
import { useEffect } from 'react';
import {getOrders} from '../../utills/apicall';
import { getUserId } from '../../utills/authService';

const Orders = () => {
  const [activeTab, setActiveTab] = useState('all');
  const userId = getUserId();

useEffect(() => {
    // Fetch orders from API or context
    const fetchOrders = async () => {
      try {
        const response = await getOrders(userId);
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  const orders = [
    {
      id: 'ORD-12345',
      date: '2023-11-15',
      status: 'delivered',
      items: [
        {
          name: "Quantum VR Headset",
          price: 499.99,
          quantity: 1,
          image: "https://via.placeholder.com/80x80/1e293b/ffffff?text=VR"
        }
      ],
      total: 539.99,
      trackingNumber: 'TRK789456123',
      deliveryDate: '2023-11-18'
    },
    {
      id: 'ORD-12346',
      date: '2023-11-10',
      status: 'shipped',
      items: [
        {
          name: "Neural Smartwatch",
          price: 349.99,
          quantity: 2,
          image: "https://via.placeholder.com/80x80/1e293b/ffffff?text=Watch"
        },
        {
          name: "Wireless Charger",
          price: 89.99,
          quantity: 1,
          image: "https://via.placeholder.com/80x80/1e293b/ffffff?text=Charger"
        }
      ],
      total: 849.97,
      trackingNumber: 'TRK456789123',
      estimatedDelivery: '2023-11-17'
    },
    {
      id: 'ORD-12347',
      date: '2023-11-05',
      status: 'processing',
      items: [
        {
          name: "Holographic Display",
          price: 899.99,
          quantity: 1,
          image: "https://via.placeholder.com/80x80/1e293b/ffffff?text=Display"
        }
      ],
      total: 971.99,
      expectedShipDate: '2023-11-12'
    },
    {
      id: 'ORD-12348',
      date: '2023-10-28',
      status: 'cancelled',
      items: [
        {
          name: "Smart Home Hub",
          price: 129.99,
          quantity: 1,
          image: "https://via.placeholder.com/80x80/1e293b/ffffff?text=Hub"
        }
      ],
      total: 140.39,
      cancellationReason: 'Customer request'
    }
  ];

  const filteredOrders = activeTab === 'all' 
    ? orders 
    : orders.filter(order => order.status === activeTab);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'delivered': return 'status-badge delivered';
      case 'shipped': return 'status-badge shipped';
      case 'processing': return 'status-badge processing';
      case 'cancelled': return 'status-badge cancelled';
      default: return 'status-badge';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'delivered': return 'Delivered';
      case 'shipped': return 'Shipped';
      case 'processing': return 'Processing';
      case 'cancelled': return 'Cancelled';
      default: return status;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="orders-container">
      <div className="orders-header">
        <h1>My Orders</h1>
        <p>Track and manage your orders</p>
      </div>

      <div className="orders-tabs">
        <button 
          className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`}
          onClick={() => setActiveTab('all')}
        >
          All Orders
        </button>
        <button 
          className={`tab-btn ${activeTab === 'processing' ? 'active' : ''}`}
          onClick={() => setActiveTab('processing')}
        >
          Processing
        </button>
        <button 
          className={`tab-btn ${activeTab === 'shipped' ? 'active' : ''}`}
          onClick={() => setActiveTab('shipped')}
        >
          Shipped
        </button>
        <button 
          className={`tab-btn ${activeTab === 'delivered' ? 'active' : ''}`}
          onClick={() => setActiveTab('delivered')}
        >
          Delivered
        </button>
        <button 
          className={`tab-btn ${activeTab === 'cancelled' ? 'active' : ''}`}
          onClick={() => setActiveTab('cancelled')}
        >
          Cancelled
        </button>
      </div>

      <div className="orders-content">
        {filteredOrders.length === 0 ? (
          <div className="no-orders">
            <div className="no-orders-icon">📦</div>
            <h3>No orders found</h3>
            <p>You don't have any {activeTab !== 'all' ? activeTab : ''} orders yet.</p>
            <button className="shop-now-btn">
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="orders-list">
            {filteredOrders.map(order => (
              <div key={order.id} className="order-card">
                <div className="order-header">
                  <div className="order-info">
                    <h3 className="order-id">Order #{order.id}</h3>
                    <p className="order-date">Placed on {formatDate(order.date)}</p>
                  </div>
                  <div className="order-status">
                    <span className={getStatusBadge(order.status)}>
                      {getStatusText(order.status)}
                    </span>
                  </div>
                </div>

                <div className="order-items">
                  {order.items.map((item, index) => (
                    <div key={index} className="order-item">
                      <img src={item.image} alt={item.name} className="item-image" />
                      <div className="item-info">
                        <h4 className="item-name">{item.name}</h4>
                        <p className="item-quantity">Quantity: {item.quantity}</p>
                      </div>
                      <div className="item-price">₹{item.price.toFixed(2)}</div>
                    </div>
                  ))}
                </div>

                <div className="order-footer">
                  <div className="order-total">
                    <span>Total: </span>
                    <span className="total-amount">₹{order.total.toFixed(2)}</span>
                  </div>

                  <div className="order-actions">
                    {order.status === 'delivered' && (
                      <>
                        <button className="action-btn">Buy Again</button>
                        <button className="action-btn">Return Item</button>
                        <button className="action-btn">Write Review</button>
                      </>
                    )}
                    {order.status === 'shipped' && (
                      <>
                        <button className="action-btn">Track Package</button>
                        <button className="action-btn">View Details</button>
                      </>
                    )}
                    {order.status === 'processing' && (
                      <button className="action-btn">Cancel Order</button>
                    )}
                    <button className="action-btn primary">View Details</button>
                  </div>
                </div>

                {order.trackingNumber && (
                  <div className="tracking-info">
                    <span className="tracking-label">Tracking Number: </span>
                    <span className="tracking-number">{order.trackingNumber}</span>
                  </div>
                )}

                {order.deliveryDate && (
                  <div className="delivery-info">
                    <span className="delivery-label">Delivered on: </span>
                    <span className="delivery-date">{formatDate(order.deliveryDate)}</span>
                  </div>
                )}

                {order.estimatedDelivery && (
                  <div className="delivery-info">
                    <span className="delivery-label">Estimated Delivery: </span>
                    <span className="delivery-date">{formatDate(order.estimatedDelivery)}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;