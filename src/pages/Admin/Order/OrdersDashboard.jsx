import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './OrdersDashboard.css';
import axiosInstance from '../../../utills/axiosInstance';

const OrdersDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    paymentStatus: '',
    paymentMethod: '',
    deliveryStatus: '',
    startDate: '',
    endDate: ''
  });
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    totalOrders: 0,
    totalAmount: 0,
    todayTotalAmount: 0,
    totalPages: 0
  });

  // Fetch orders from API
  const fetchOrders = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });
      
      params.append('page', pagination.page);
      params.append('limit', pagination.limit);

      const response = await axiosInstance.get(`${import.meta.env.VITE_API_URL}/order/all?${params}`);
      const data = response.data;

      if (data.success) {
        setOrders(data.orders);
        setPagination(prev => ({
          ...prev,
          totalOrders: data.totalOrders,
          totalAmount: data.totalAmount,
          todayTotalAmount: data.todayTotalAmount,
          totalPages: data.totalPages
        }));
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [pagination.page, pagination.limit]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleApplyFilters = () => {
    setPagination(prev => ({ ...prev, page: 1 }));
    fetchOrders();
  };

  const handleClearFilters = () => {
    setFilters({
      search: '',
      paymentStatus: '',
      paymentMethod: '',
      deliveryStatus: '',
      startDate: '',
      endDate: ''
    });
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  const handlePageChange = (newPage) => {
    setPagination(prev => ({ ...prev, page: newPage }));
  };

  const handleLimitChange = (newLimit) => {
    setPagination(prev => ({ ...prev, limit: Number(newLimit), page: 1 }));
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  // Shorten order ID
  const shortenOrderId = (id) => {
    return `${id.slice(0, 8)}...`;
  };

  return (
    <div className="orders-dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-content">
          <div className="header-title">
            <h1>Orders Dashboard</h1>
            <p>Manage and track all customer orders</p>
          </div>
        </div>
      </header>

      {/* Filters Section */}
      <div className="filters-section">
        <div className="search-bar">
          <div className="search-input-wrapper">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search by address, city, or product name..."
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              className="search-input"
            />
          </div>
        </div>

        <div className="filter-controls">
          <select
            value={filters.paymentStatus}
            onChange={(e) => handleFilterChange('paymentStatus', e.target.value)}
            className="order-dash-filter-select"
          >
            <option value="">Payment Status</option>
            <option value="Paid">Paid</option>
            <option value="Pending">Pending</option>
            <option value="Failed">Failed</option>
          </select>

          <select
            value={filters.paymentMethod}
            onChange={(e) => handleFilterChange('paymentMethod', e.target.value)}
            className="order-dash-filter-select"
          >
            <option value="">Payment Method</option>
            <option value="Razorpay">Razorpay</option>
            <option value="Cash">Cash</option>
            <option value="Card">Card</option>
          </select>

          <select
            value={filters.deliveryStatus}
            onChange={(e) => handleFilterChange('deliveryStatus', e.target.value)}
            className="order-dash-filter-select"
          >
            <option value="">Delivery Status</option>
            <option value="pending">Pending</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>

          <input
            type="date"
            value={filters.startDate}
            onChange={(e) => handleFilterChange('startDate', e.target.value)}
            className="date-input"
            placeholder="Start Date"
          />

          <input
            type="date"
            value={filters.endDate}
            onChange={(e) => handleFilterChange('endDate', e.target.value)}
            className="date-input"
            placeholder="End Date"
          />

          <button className="apply-filters-btn" onClick={handleApplyFilters}>
            Apply Filters
          </button>

          <button className="clear-filters-btn" onClick={handleClearFilters}>
            Clear
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="kpi-cards">
        <div className="kpi-card revenue-card">
          <div className="kpi-icon">💰</div>
          <div className="kpi-content">
            <h3>Total Revenue</h3>
            <div className="kpi-value">{formatCurrency(pagination.totalAmount)}</div>
          </div>
        </div>

        <div className="kpi-card orders-card">
          <div className="kpi-icon">📦</div>
          <div className="kpi-content">
            <h3>Total Orders</h3>
            <div className="kpi-value">{pagination.totalOrders}</div>
          </div>
        </div>

        <div className="kpi-card today-card">
          <div className="kpi-icon">📈</div>
          <div className="kpi-content">
            <h3>Today's Revenue</h3>
            <div className="kpi-value">{formatCurrency(pagination.todayTotalAmount)}</div>
          </div>
        </div>

        <div className="kpi-card pages-card">
          <div className="kpi-icon">📄</div>
          <div className="kpi-content">
            <h3>Total Pages</h3>
            <div className="kpi-value">{pagination.totalPages}</div>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="orders-table-section">
        <div className="table-header">
          <h2>Recent Orders</h2>
          <div className="table-controls">
            <span>Show:</span>
            <select
              value={pagination.limit}
              onChange={(e) => handleLimitChange(e.target.value)}
              className="limit-select"
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="loading-state">
            <div className="loading-spinner"></div>
            <p>Loading orders...</p>
          </div>
        ) : (
          <>
            <div className="table-container">
              <table className="orders-table">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Payment Method</th>
                    <th>Payment Status</th>
                    <th>Total Price</th>
                    <th>Delivery Status</th>
                    <th>Date Created</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order._id}>
                      <td className="order-id">{shortenOrderId(order._id)}</td>
                      <td>
                        <span className="payment-method">{order.paymentMethod}</span>
                      </td>
                      <td>
                        <span className={`status-badge payment-status ${order.paymentStatus.toLowerCase()}`}>
                          {order.paymentStatus}
                        </span>
                      </td>
                      <td className="total-price">{formatCurrency(order.totalPrice)}</td>
                      <td>
                        <span className={`status-badge delivery-status ${order.deliveryStatus}`}>
                          {order.deliveryStatus}
                        </span>
                      </td>
                      <td className="order-date">{formatDate(order.createdAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards View */}
            <div className="mobile-orders-list">
              {orders.map((order) => (
                <div key={order._id} className="order-card">
                  <div className="order-card-header">
                    <span className="order-id-mobile">{shortenOrderId(order._id)}</span>
                    <span className="order-date-mobile">{formatDate(order.createdAt)}</span>
                  </div>
                  <div className="order-card-body">
                    <div className="order-detail">
                      <span>Payment Method:</span>
                      <span>{order.paymentMethod}</span>
                    </div>
                    <div className="order-detail">
                      <span>Payment Status:</span>
                      <span className={`status-badge payment-status ${order.paymentStatus.toLowerCase()}`}>
                        {order.paymentStatus}
                      </span>
                    </div>
                    <div className="order-detail">
                      <span>Delivery Status:</span>
                      <span className={`status-badge delivery-status ${order.deliveryStatus}`}>
                        {order.deliveryStatus}
                      </span>
                    </div>
                    <div className="order-detail">
                      <span>Total Price:</span>
                      <span className="total-price">{formatCurrency(order.totalPrice)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className="pagination">
                <button
                  className="pagination-btn"
                  onClick={() => handlePageChange(pagination.page - 1)}
                  disabled={pagination.page === 1}
                >
                  Previous
                </button>

                <div className="page-numbers">
                  {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((pageNum) => (
                    <button
                      key={pageNum}
                      className={`page-btn ${pageNum === pagination.page ? 'active' : ''}`}
                      onClick={() => handlePageChange(pageNum)}
                    >
                      {pageNum}
                    </button>
                  ))}
                </div>

                <button
                  className="pagination-btn"
                  onClick={() => handlePageChange(pagination.page + 1)}
                  disabled={pagination.page === pagination.totalPages}
                >
                  Next
                </button>

                <div className="pagination-info">
                  Page {pagination.page} of {pagination.totalPages}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};


export default OrdersDashboard;

