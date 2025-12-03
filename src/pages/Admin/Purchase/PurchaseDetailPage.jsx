import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import '../../../CssFiles/Admin/Purchase/PurchaseDetailPage.css';
import UpdatePaymentStatus from '../../../components/UpdatePaymentStatus';
import { TbFileInvoice } from "react-icons/tb";
import { FaCreditCard } from "react-icons/fa6";
import { BsBoxes } from "react-icons/bs";
import { FaIndianRupeeSign } from "react-icons/fa6";
import axiosInstance from '../../../utills/axiosInstance';
const PurchaseDetailPage = () => {
  const { id } = useParams();
  const [purchase, setPurchase] = useState(null);
  const [lots, setLots] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('details');

  useEffect(() => {
    fetchPurchaseDetails();
  }, [id]);

  const fetchPurchaseDetails = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Simulate API call - replace with actual API
          // const response = await fetch(`${import.meta.env.VITE_API_URL}/purchase/${id}`);
          // const data = await response.json();
      // console.log(data);
      const response = await axiosInstance.get(`${import.meta.env.VITE_API_URL}/purchase/${id}`);
      const data = response.data;

      
      if (!response) {
        throw new Error(data.message || 'Failed to fetch purchase details');
      }
      
      setPurchase(data.purchase);
      setLots(data.lots);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching purchase details:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      received: { label: 'Received', class: 'ecom-purchase-detail__status--received' },
      processing: { label: 'Processing', class: 'ecom-purchase-detail__status--processing' },
      completed: { label: 'Completed', class: 'ecom-purchase-detail__status--completed' },
      cancelled: { label: 'Cancelled', class: 'ecom-purchase-detail__status--cancelled' }
    };
    
    const config = statusConfig[status] || statusConfig.received;
    return (
      <span className={`ecom-purchase-detail__status ${config.class}`}>
        {config.label}
      </span>
    );
  };

  const getPaymentStatusBadge = (paymentStatus) => {
    const paymentConfig = {
      paid: { label: 'Paid', class: 'ecom-purchase-detail__payment-status--paid' },
      pending: { label: 'Pending', class: 'ecom-purchase-detail__payment-status--pending' },
      partial: { label: 'Partial', class: 'ecom-purchase-detail__payment-status--partial' },
      cancelled: { label: 'Cancelled', class: 'ecom-purchase-detail__payment-status--cancelled' }
    };
    
    const config = paymentConfig[paymentStatus] || paymentConfig.pending;
    return (
      <span className={`ecom-purchase-detail__payment-status ${config.class}`}>
        {config.label}
      </span>
    );
  };

  // const handlePrintInvoice = () => {
  //   window.print();
  // };

  const handleDownloadInvoice = async (id) => {
    // Implement download functionality
    // console.log('Download invoice');
     try {
    const res = await axiosInstance.get(`${import.meta.env.VITE_API_URL}/report/${id}/invoice`, {
      responseType: "blob",
    });

    const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `invoice_${id}.pdf`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (err) {
    console.error("Invoice download failed:", err);
  }
  };

  // const handleEditPurchase = () => {
  //   // Navigate to edit page
  //   console.log('Edit purchase');
  // };

//   const handleUpdateStatus = (newStatus) => {
//     // Implement status update
//     console.log('Update status to:', newStatus);
//   };

  if (isLoading) {
    return (
      <div className="ecom-purchase-detail-page">
        <div className="ecom-purchase-detail-page__loading">
          <div className="ecom-purchase-detail-page__loading-spinner"></div>
          <p>Loading purchase details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="ecom-purchase-detail-page">
        <div className="ecom-purchase-detail-page__error">
          <div className="ecom-purchase-detail-page__error-icon">
            <i className="fas fa-exclamation-triangle"></i>
          </div>
          <h3 className="ecom-purchase-detail-page__error-title">Error Loading Purchase</h3>
          <p className="ecom-purchase-detail-page__error-text">{error}</p>
          <button 
            className="ecom-purchase-detail-page__error-btn"
            onClick={fetchPurchaseDetails}
          >
            <i className="fas fa-redo"></i>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!purchase) {
    return (
      <div className="ecom-purchase-detail-page">
        <div className="ecom-purchase-detail-page__not-found">
          <div className="ecom-purchase-detail-page__not-found-icon">
            <i className="fas fa-file-invoice"></i>
          </div>
          <h3 className="ecom-purchase-detail-page__not-found-title">Purchase Not Found</h3>
          <p className="ecom-purchase-detail-page__not-found-text">
            The purchase you're looking for doesn't exist or has been removed.
          </p>
        </div>
      </div>
    );
  }
  // console.log(lots);
  

  return (
    <div className="ecom-purchase-detail-page">
      <div className="ecom-purchase-detail-page__container">
        {/* Header */}
        <div className="ecom-purchase-detail-page__header">
          <div className="ecom-purchase-detail-page__header-content">
            <div className="ecom-purchase-detail-page__breadcrumb">
              <Link to="/admin/purchases" className="ecom-purchase-detail-page__breadcrumb-link">
                Purchases
              </Link>
              <i className="fas fa-chevron-right ecom-purchase-detail-page__breadcrumb-separator"></i>
              <span className="ecom-purchase-detail-page__breadcrumb-current">
                {purchase.invoiceNumber}
              </span>
            </div>
            <h1 className="ecom-purchase-detail-page__title">
              Purchase Order: {purchase.invoiceNumber}
            </h1>
            <div className="ecom-purchase-detail-page__meta">
              <span className="ecom-purchase-detail-page__meta-item">
                <i className="fas fa-calendar"></i>
                Created {formatDate(purchase.createdAt)}
              </span>
              <span className="ecom-purchase-detail-page__meta-item">
                <i className="fas fa-user"></i>
                By {purchase.createdBy.name}
              </span>
            </div>
          </div>
          
          <div className="ecom-purchase-detail-page__header-actions">
            {/* <button 
              className="ecom-purchase-detail-page__action-btn ecom-purchase-detail-page__action-btn--secondary"
              onClick={handlePrintInvoice}
            >
              <i className="fas fa-print"></i>
              Print
            </button> */}
            <button 
              className="ecom-purchase-detail-page__action-btn ecom-purchase-detail-page__action-btn--secondary"
              onClick={()=>handleDownloadInvoice(id)}
            >
              <i className="fas fa-download"></i>
              Download
            </button>
            {/* <button 
              className="ecom-purchase-detail-page__action-btn ecom-purchase-detail-page__action-btn--primary"
              onClick={handleEditPurchase}
            >
              <i className="fas fa-edit"></i>
              Edit Purchase
            </button> */}
          </div>
        </div>

        {/* Status Cards */}
        <div className="ecom-purchase-detail-page__status-cards">
          <div className="ecom-purchase-detail-page__status-card">
            <div className="ecom-purchase-detail-page__status-card-icon">
              {/* <i className="fas fa-file-invoice"></i> */}
              <TbFileInvoice />
            </div>
            <div className="ecom-purchase-detail-page__status-card-content">
              <span className="ecom-purchase-detail-page__status-card-label">Order Status</span>
              <div className="ecom-purchase-detail-page__status-card-value">
                {getStatusBadge(purchase.status)}
              </div>
            </div>
          </div>

          <div className="ecom-purchase-detail-page__status-card">
            <div className="ecom-purchase-detail-page__status-card-icon">
              {/* <i className="fas fa-credit-card"></i> */}
              <FaCreditCard />
            </div>
            <div className="ecom-purchase-detail-page__status-card-content">
              <span className="ecom-purchase-detail-page__status-card-label">Payment Status</span>
              <div className="ecom-purchase-detail-page__status-card-value">
                {getPaymentStatusBadge(purchase.paymentStatus)}
              </div>
            </div>
          </div>

          <div className="ecom-purchase-detail-page__status-card">
            <div className="ecom-purchase-detail-page__status-card-icon">
              {/* <i className="fas fa-boxes"></i> */}
              <BsBoxes />
            </div>
            <div className="ecom-purchase-detail-page__status-card-content">
              <span className="ecom-purchase-detail-page__status-card-label">Total Items</span>
              <span className="ecom-purchase-detail-page__status-card-number">
                {purchase.totalQuantity}
              </span>
            </div>
          </div>

          <div className="ecom-purchase-detail-page__status-card">
            <div className="ecom-purchase-detail-page__status-card-icon">
              {/* <i className="fas fa-dollar-sign"></i> */}
              <FaIndianRupeeSign />
            </div>
            <div className="ecom-purchase-detail-page__status-card-content">
              <span className="ecom-purchase-detail-page__status-card-label">Total Amount</span>
              <span className="ecom-purchase-detail-page__status-card-amount">
                {formatCurrency(purchase.totalAmount)}
              </span>
            </div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="ecom-purchase-detail-page__tabs">
          <button
            className={`ecom-purchase-detail-page__tab ${
              activeTab === 'details' ? 'ecom-purchase-detail-page__tab--active' : ''
            }`}
            onClick={() => setActiveTab('details')}
          >
            <i className="fas fa-info-circle"></i>
            Purchase Details
          </button>
          <button
            className={`ecom-purchase-detail-page__tab ${
              activeTab === 'items' ? 'ecom-purchase-detail-page__tab--active' : ''
            }`}
            onClick={() => setActiveTab('items')}
          >
            <i className="fas fa-list"></i>
            Items ({purchase.items.length})
          </button>
          <button
            className={`ecom-purchase-detail-page__tab ${
              activeTab === 'inventory' ? 'ecom-purchase-detail-page__tab--active' : ''
            }`}
            onClick={() => setActiveTab('inventory')}
          >
            <i className="fas fa-warehouse"></i>
            Inventory Lots ({lots.length})
          </button>
          {/* <button
            className={`ecom-purchase-detail-page__tab ${
              activeTab === 'documents' ? 'ecom-purchase-detail-page__tab--active' : ''
            }`}
            onClick={() => setActiveTab('documents')}
          >
            <i className="fas fa-file"></i>
            Documents ({purchase.invoiceFiles.length})
          </button> */}
        </div>

        {/* Tab Content */}
        <div className="ecom-purchase-detail-page__content">
          {activeTab === 'details' && (
            <div className="ecom-purchase-detail-page__details">
              <div className="ecom-purchase-detail-page__details-grid">
                {/* Vendor Information */}
                <div className="ecom-purchase-detail-page__detail-section">
                  <h3 className="ecom-purchase-detail-page__detail-section-title">
                    <i className="fas fa-truck"></i>
                    Vendor Information
                  </h3>
                  <div className="ecom-purchase-detail-page__detail-content">
                    <div className="ecom-purchase-detail-page__detail-item">
                      <span className="ecom-purchase-detail-page__detail-label">Vendor Name</span>
                      <span className="ecom-purchase-detail-page__detail-value">
                        {purchase.vendor.name}
                      </span>
                    </div>
                    <div className="ecom-purchase-detail-page__detail-item">
                      <span className="ecom-purchase-detail-page__detail-label">Email</span>
                      <span className="ecom-purchase-detail-page__detail-value">
                        {purchase.vendor.email}
                      </span>
                    </div>
                    <div className="ecom-purchase-detail-page__detail-item">
                      <span className="ecom-purchase-detail-page__detail-label">Phone</span>
                      <span className="ecom-purchase-detail-page__detail-value">
                        {purchase.vendor.phone}
                      </span>
                    </div>
                    <div className="ecom-purchase-detail-page__detail-item">
                      <span className="ecom-purchase-detail-page__detail-label">Address</span>
                      <span className="ecom-purchase-detail-page__detail-value">
                        {purchase.vendor.address}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Purchase Information */}
                <div className="ecom-purchase-detail-page__detail-section">
                  <h3 className="ecom-purchase-detail-page__detail-section-title">
                    <i className="fas fa-shopping-cart"></i>
                    Purchase Information
                  </h3>
                  <div className="ecom-purchase-detail-page__detail-content">
                    <div className="ecom-purchase-detail-page__detail-item">
                      <span className="ecom-purchase-detail-page__detail-label">Invoice Number</span>
                      <span className="ecom-purchase-detail-page__detail-value">
                        {purchase.invoiceNumber}
                      </span>
                    </div>
                    <div className="ecom-purchase-detail-page__detail-item">
                      <span className="ecom-purchase-detail-page__detail-label">Created Date</span>
                      <span className="ecom-purchase-detail-page__detail-value">
                        {formatDate(purchase.createdAt)}
                      </span>
                    </div>
                    <div className="ecom-purchase-detail-page__detail-item">
                      <span className="ecom-purchase-detail-page__detail-label">Created By</span>
                      <span className="ecom-purchase-detail-page__detail-value">
                        {purchase.createdBy.name} ({purchase.createdBy.email})
                      </span>
                    </div>
                    <div className="ecom-purchase-detail-page__detail-item">
                      <span className="ecom-purchase-detail-page__detail-label">Payment Method</span>
                      <span className="ecom-purchase-detail-page__detail-value">
                        {purchase.paymentMethod ? purchase.paymentMethod.toUpperCase() : 'Not specified'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Financial Summary */}
                <div className="ecom-purchase-detail-page__detail-section">
                  <h3 className="ecom-purchase-detail-page__detail-section-title">
                    <i className="fas fa-calculator"></i>
                    Financial Summary
                  </h3>
                  <div className="ecom-purchase-detail-page__detail-content">
                    <div className="ecom-purchase-detail-page__detail-item">
                      <span className="ecom-purchase-detail-page__detail-label">Subtotal</span>
                      <span className="ecom-purchase-detail-page__detail-value">
                        {formatCurrency(purchase.subTotal)}
                      </span>
                    </div>
                    <div className="ecom-purchase-detail-page__detail-item">
                      <span className="ecom-purchase-detail-page__detail-label">Total Tax</span>
                      <span className="ecom-purchase-detail-page__detail-value">
                        {formatCurrency(purchase.totalTax)}
                      </span>
                    </div>
                    <div className="ecom-purchase-detail-page__detail-item ecom-purchase-detail-page__detail-item--total">
                      <span className="ecom-purchase-detail-page__detail-label">Total Amount</span>
                      <span className="ecom-purchase-detail-page__detail-value">
                        {formatCurrency(purchase.totalAmount)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Notes */}
                {purchase.notes && (
                  <div className="ecom-purchase-detail-page__detail-section">
                    <h3 className="ecom-purchase-detail-page__detail-section-title">
                      <i className="fas fa-sticky-note"></i>
                      Notes
                    </h3>
                    <div className="ecom-purchase-detail-page__detail-content">
                      <p className="ecom-purchase-detail-page__notes">
                        {purchase.notes}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'items' && (
            <div className="ecom-purchase-detail-page__items">
              <div className="ecom-purchase-detail-page__items-header">
                <h3 className="ecom-purchase-detail-page__items-title">Purchase Items</h3>
                <span className="ecom-purchase-detail-page__items-count">
                  {purchase.items.length} item{purchase.items.length !== 1 ? 's' : ''}
                </span>
              </div>
              
              <div className="ecom-purchase-detail-page__items-list">
                {purchase.items.map((item) => (
                  <div key={item._id} className="ecom-purchase-detail-page__item-card">
                    <div className="ecom-purchase-detail-page__item-image">
                      {item.product.images && item.product.images.length > 0 ? (
                        <img 
                          src={item.product.images[0].url} 
                          alt={item.product.name}
                          className="ecom-purchase-detail-page__item-img"
                        />
                      ) : (
                        <div className="ecom-purchase-detail-page__item-placeholder">
                          <i className="fas fa-box"></i>
                        </div>
                      )}
                    </div>
                    
                    <div className="ecom-purchase-detail-page__item-details">
                      <h4 className="ecom-purchase-detail-page__item-name">
                        {item.product.name}
                      </h4>
                      <div className="ecom-purchase-detail-page__item-meta">
                        {item.variantSize && (
                          <span className="ecom-purchase-detail-page__item-variant">
                            Size: {item.variantSize}
                          </span>
                        )}
                        <span className="ecom-purchase-detail-page__item-sku">
                          SKU: {item.product._id}
                        </span>
                      </div>
                      {item.product.description && (
                        <p className="ecom-purchase-detail-page__item-description">
                          {item.product.description}
                        </p>
                      )}
                    </div>
                    
                    <div className="ecom-purchase-detail-page__item-quantity">
                      <span className="ecom-purchase-detail-page__item-quantity-label">Quantity</span>
                      <span className="ecom-purchase-detail-page__item-quantity-value">
                        {item.quantity}
                      </span>
                    </div>
                    
                    <div className="ecom-purchase-detail-page__item-pricing">
                      <div className="ecom-purchase-detail-page__item-price">
                        <span className="ecom-purchase-detail-page__item-price-label">Unit Price</span>
                        <span className="ecom-purchase-detail-page__item-price-value">
                          {formatCurrency(item.purchasePrice)}
                        </span>
                      </div>
                      <div className="ecom-purchase-detail-page__item-tax">
                        <span className="ecom-purchase-detail-page__item-tax-label">Tax</span>
                        <span className="ecom-purchase-detail-page__item-tax-value">
                          {formatCurrency(item.tax)}
                        </span>
                      </div>
                      <div className="ecom-purchase-detail-page__item-subtotal">
                        <span className="ecom-purchase-detail-page__item-subtotal-label">Subtotal</span>
                        <span className="ecom-purchase-detail-page__item-subtotal-value">
                          {formatCurrency(item.subtotal)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'inventory' && (
            <div className="ecom-purchase-detail-page__inventory">
              <div className="ecom-purchase-detail-page__inventory-header">
                <h3 className="ecom-purchase-detail-page__inventory-title">Inventory Lots</h3>
                <span className="ecom-purchase-detail-page__inventory-count">
                  {lots.length} lot{lots.length !== 1 ? 's' : ''}
                </span>
              </div>
              
              {lots.length > 0 ? (
                <div className="ecom-purchase-detail-page__inventory-table">
                  <table className="ecom-purchase-detail-page__inventory-table-content">
                    <thead>
                      <tr>
                        <th>Product</th>
                        <th>Variant</th>
                        <th>Remaining Qty</th>
                        <th>Unit Cost</th>
                        <th>Received Date</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {lots.map((lot) => (
                        <tr key={lot._id}>
                          <td>
                            <div className="ecom-purchase-detail-page__lot-product">
                              {lot.product && (
                                <>
                                  {/* <span className="ecom-purchase-detail-page__lot-product-name">
                                    {lot.product || 'Unknown'}
                                  </span> */}
                                  <span className="ecom-purchase-detail-page__lot-product-id">
                                    {lot.product}
                                  </span>
                                </>
                              )}
                            </div>
                          </td>
                          <td>
                            <span className="ecom-purchase-detail-page__lot-variant">
                              {lot.variantSize || 'Standard'}
                            </span>
                          </td>
                          <td>
                            <span className="ecom-purchase-detail-page__lot-quantity">
                              {lot.remainingQty}
                            </span>
                          </td>
                          <td>
                            <span className="ecom-purchase-detail-page__lot-cost">
                              {formatCurrency(lot.unitCost)}
                            </span>
                          </td>
                          <td>
                            <span className="ecom-purchase-detail-page__lot-date">
                              {formatDate(lot.receivedAt)}
                            </span>
                          </td>
                          <td>
                            <span className={`ecom-purchase-detail-page__lot-status ${
                              lot.remainingQty > 0 
                                ? 'ecom-purchase-detail-page__lot-status--active' 
                                : 'ecom-purchase-detail-page__lot-status--depleted'
                            }`}>
                              {lot.remainingQty > 0 ? 'Active' : 'Depleted'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="ecom-purchase-detail-page__inventory-empty">
                  <i className="fas fa-warehouse"></i>
                  <p>No inventory lots found for this purchase.</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'documents' && (
            <div className="ecom-purchase-detail-page__documents">
              <div className="ecom-purchase-detail-page__documents-header">
                <h3 className="ecom-purchase-detail-page__documents-title">Invoice Documents</h3>
                <button className="ecom-purchase-detail-page__upload-btn">
                  <i className="fas fa-upload"></i>
                  Upload Document
                </button>
              </div>
              
              {purchase.invoiceFiles.length > 0 ? (
                <div className="ecom-purchase-detail-page__documents-list">
                  {purchase.invoiceFiles.map((file, index) => (
                    <div key={index} className="ecom-purchase-detail-page__document-card">
                      <div className="ecom-purchase-detail-page__document-icon">
                        <i className="fas fa-file-invoice"></i>
                      </div>
                      <div className="ecom-purchase-detail-page__document-info">
                        <h4 className="ecom-purchase-detail-page__document-name">
                          {file.filename}
                        </h4>
                        <span className="ecom-purchase-detail-page__document-date">
                          Uploaded {formatDate(file.uploadedAt)}
                        </span>
                      </div>
                      <div className="ecom-purchase-detail-page__document-actions">
                        <button className="ecom-purchase-detail-page__document-btn">
                          <i className="fas fa-eye"></i>
                        </button>
                        <button className="ecom-purchase-detail-page__document-btn">
                          <i className="fas fa-download"></i>
                        </button>
                        <button className="ecom-purchase-detail-page__document-btn">
                          <i className="fas fa-trash"></i>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="ecom-purchase-detail-page__documents-empty">
                  <i className="fas fa-file"></i>
                  <p>No documents uploaded for this purchase.</p>
                  <button className="ecom-purchase-detail-page__upload-btn ecom-purchase-detail-page__upload-btn--primary">
                    <i className="fas fa-upload"></i>
                    Upload First Document
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        <UpdatePaymentStatus purchaseId={id} paystatus={purchase.paymentStatus} />
      </div>
    </div>
  );
};

export default PurchaseDetailPage;