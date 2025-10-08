import React from 'react';
import './css/PurchaseTable.css';
import { FaEye } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { MdFileDownload } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const PurchaseTable = ({ purchases, onSort, sortConfig, isLoading }) => {
  const navigate = useNavigate();
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
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
      received: { label: 'Received', class: 'ecom-purchase-table__status--received' },
      processing: { label: 'Processing', class: 'ecom-purchase-table__status--processing' },
      completed: { label: 'Completed', class: 'ecom-purchase-table__status--completed' },
      cancelled: { label: 'Cancelled', class: 'ecom-purchase-table__status--cancelled' }
    };
    
    const config = statusConfig[status] || statusConfig.received;
    return (
      <span className={`ecom-purchase-table__status ${config.class}`}>
        {config.label}
      </span>
    );
  };

  const getPaymentStatusBadge = (paymentStatus) => {
    const paymentConfig = {
      paid: { label: 'Paid', class: 'ecom-purchase-table__payment-status--paid' },
      pending: { label: 'Pending', class: 'ecom-purchase-table__payment-status--pending' },
      partial: { label: 'Partial', class: 'ecom-purchase-table__payment-status--partial' },
      cancelled: { label: 'Cancelled', class: 'ecom-purchase-table__payment-status--cancelled' }
    };
    
    const config = paymentConfig[paymentStatus] || paymentConfig.pending;
    return (
      <span className={`ecom-purchase-table__payment-status ${config.class}`}>
        {config.label}
      </span>
    );
  };

  const SortIcon = ({ columnKey }) => {
    if (sortConfig.key !== columnKey) {
      return <i className="fas fa-sort ecom-purchase-table__sort-icon"></i>;
    }
    
    return sortConfig.direction === 'asc' 
      ? <i className="fas fa-sort-up ecom-purchase-table__sort-icon ecom-purchase-table__sort-icon--active"></i>
      : <i className="fas fa-sort-down ecom-purchase-table__sort-icon ecom-purchase-table__sort-icon--active"></i>;
  };

  const ViewDetails = (id) => {
   navigate(`/admin/purchasedetail/${id}`);
  };

  const DeletePurchase = async(id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this purchase?");
    if (confirmDelete) {
      // Handle deletion logic here
      try {
        alert("Purchase delete within 24 hours");
        const res = await axios.delete(`http://localhost:5000/api/purchase/${id}`)
        console.log(res.data);
        window.location.reload();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const DownloadInvoice = async (id) => {
    // Implement download functionality
    // console.log('Download invoice');
     try {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/report/${id}/invoice`, {
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

  if (isLoading && purchases.length === 0) {
    return (
      <div className="ecom-purchase-table">
        <div className="ecom-purchase-table__skeleton">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="ecom-purchase-table__skeleton-row">
              <div className="ecom-purchase-table__skeleton-cell ecom-purchase-table__skeleton-cell--invoice"></div>
              <div className="ecom-purchase-table__skeleton-cell ecom-purchase-table__skeleton-cell--vendor"></div>
              <div className="ecom-purchase-table__skeleton-cell ecom-purchase-table__skeleton-cell--amount"></div>
              <div className="ecom-purchase-table__skeleton-cell ecom-purchase-table__skeleton-cell--status"></div>
              <div className="ecom-purchase-table__skeleton-cell ecom-purchase-table__skeleton-cell--date"></div>
              <div className="ecom-purchase-table__skeleton-cell ecom-purchase-table__skeleton-cell--actions"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="ecom-purchase-table">
      <div className="ecom-purchase-table__container">
        <table className="ecom-purchase-table__table">
          <thead className="ecom-purchase-table__header">
            <tr>
              <th 
                className="ecom-purchase-table__th ecom-purchase-table__th--sortable"
                onClick={() => onSort('invoiceNumber')}
              >
                <span className="ecom-purchase-table__th-content">
                  Invoice Number
                  <SortIcon columnKey="invoiceNumber" />
                </span>
              </th>
              <th className="ecom-purchase-table__th">Vendor</th>
              <th className="ecom-purchase-table__th">Items</th>
              <th 
                className="ecom-purchase-table__th ecom-purchase-table__th--sortable"
                onClick={() => onSort('totalAmount')}
              >
                <span className="ecom-purchase-table__th-content">
                  Total Amount
                  <SortIcon columnKey="totalAmount" />
                </span>
              </th>
              <th 
                className="ecom-purchase-table__th ecom-purchase-table__th--sortable"
                onClick={() => onSort('status')}
              >
                <span className="ecom-purchase-table__th-content">
                  Status
                  <SortIcon columnKey="status" />
                </span>
              </th>
              <th className="ecom-purchase-table__th">Payment</th>
              <th 
                className="ecom-purchase-table__th ecom-purchase-table__th--sortable"
                onClick={() => onSort('createdAt')}
              >
                <span className="ecom-purchase-table__th-content">
                  Created Date
                  <SortIcon columnKey="createdAt" />
                </span>
              </th>
              <th className="ecom-purchase-table__th">Actions</th>
            </tr>
          </thead>
          
          <tbody className="ecom-purchase-table__body">
            {purchases.map(purchase => (
              <tr key={purchase._id} className="ecom-purchase-table__row">
                <td className="ecom-purchase-table__td">
                  <div className="ecom-purchase-table__invoice">
                    <div className="ecom-purchase-table__invoice-number">
                      {purchase.invoiceNumber}
                    </div>
                    {purchase.notes && (
                      <div className="ecom-purchase-table__notes" title={purchase.notes}>
                        <i className="fas fa-sticky-note"></i>
                      </div>
                    )}
                  </div>
                </td>
                
                <td className="ecom-purchase-table__td">
                  <div className="ecom-purchase-table__vendor">
                    <div className="ecom-purchase-table__vendor-name">
                      {purchase.vendor.name}
                    </div>
                    <div className="ecom-purchase-table__created-by">
                      by {purchase.createdBy.name}
                    </div>
                  </div>
                </td>
                
                <td className="ecom-purchase-table__td">
                  <div className="ecom-purchase-table__items">
                    <div className="ecom-purchase-table__items-count">
                      {purchase.items.length} item{purchase.items.length !== 1 ? 's' : ''}
                    </div>
                    <div className="ecom-purchase-table__items-preview">
                      {purchase.items.slice(0, 2).map((item, index) => (
                        <span key={index} className="ecom-purchase-table__item-preview">
                          {item.product.name} ({item.quantity})
                        </span>
                      ))}
                      {purchase.items.length > 2 && (
                        <span className="ecom-purchase-table__more-items">
                          +{purchase.items.length - 2} more
                        </span>
                      )}
                    </div>
                  </div>
                </td>
                
                <td className="ecom-purchase-table__td">
                  <div className="ecom-purchase-table__amount">
                    <div className="ecom-purchase-table__total-amount">
                      {formatCurrency(purchase.totalAmount)}
                    </div>
                    <div className="ecom-purchase-table__quantity">
                      {purchase.totalQuantity} units
                    </div>
                  </div>
                </td>
                
                <td className="ecom-purchase-table__td">
                  {getStatusBadge(purchase.status)}
                </td>
                
                <td className="ecom-purchase-table__td">
                  <div className="ecom-purchase-table__payment">
                    {getPaymentStatusBadge(purchase.paymentStatus)}
                    {purchase.paymentMethod && (
                      <div className="ecom-purchase-table__payment-method">
                        via {purchase.paymentMethod}
                      </div>
                    )}
                  </div>
                </td>
                
                <td className="ecom-purchase-table__td">
                  <div className="ecom-purchase-table__date">
                    {formatDate(purchase.createdAt)}
                  </div>
                </td>
                
                <td className="ecom-purchase-table__td">
                  <div className="ecom-purchase-table__actions">
                    <button 
                      className="ecom-purchase-table__action-btn ecom-purchase-table__action-btn--view"
                      title="View Details"
                      onClick={() => ViewDetails(purchase._id)}
                    >
                      {/* <i className="fas fa-eye"></i> */}
                      <FaEye />
                    </button>
                    
                    <button 
                      className="ecom-purchase-table__action-btn ecom-purchase-table__action-btn--delete"
                      title="Edit Purchase"
                      onClick={() => DeletePurchase(purchase._id)}
                    >
                      {/* <i className="fas fa-edit"></i> */}
                      <MdDelete />
                    </button>
                    
                    <button 
                      className="ecom-purchase-table__action-btn ecom-purchase-table__action-btn--download"
                      title="Download Invoice"
                      onClick={() => DownloadInvoice(purchase._id)}
                    >
                      {/* <i className="fas fa-download"></i> */}
                      <MdFileDownload />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {purchases.length === 0 && !isLoading && (
          <div className="ecom-purchase-table__empty">
            <div className="ecom-purchase-table__empty-icon">
              <i className="fas fa-file-invoice"></i>
            </div>
            <h3 className="ecom-purchase-table__empty-title">No purchases found</h3>
            <p className="ecom-purchase-table__empty-text">
              Try adjusting your filters or create a new purchase order.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PurchaseTable;