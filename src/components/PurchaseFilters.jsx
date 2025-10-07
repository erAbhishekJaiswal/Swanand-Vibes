import React from 'react';
import './css/PurchaseFilters.css';

const PurchaseFilters = ({ 
  filters, 
  onFilterChange, 
  onSearchChange, 
  vendors, 
  purchaseCount, 
  onClearFilters 
}) => {
  const statusOptions = [
    { value: '', label: 'All Status' },
    { value: 'received', label: 'Received' },
    { value: 'processing', label: 'Processing' },
    { value: 'completed', label: 'Completed' },
    { value: 'cancelled', label: 'Cancelled' }
  ];

  const paymentStatusOptions = [
    { value: '', label: 'All Payments' },
    { value: 'pending', label: 'Pending' },
    { value: 'paid', label: 'Paid' },
    { value: 'partial', label: 'Partial' },
    { value: 'cancelled', label: 'Cancelled' }
  ];

  const handleFilterUpdate = (key, value) => {
    onFilterChange({
      ...filters,
      [key]: value
    });
  };

  const hasActiveFilters = filters.search || filters.vendorId || filters.status || filters.from || filters.to;

  return (
    <div className="ecom-purchase-filters">
      <div className="ecom-purchase-filters__search">
        <div className="ecom-purchase-filters__search-container">
          <i className="fas fa-search ecom-purchase-filters__search-icon"></i>
          <input
            type="text"
            placeholder="Search by invoice number or vendor name..."
            defaultValue={filters.search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="ecom-purchase-filters__search-input"
          />
          {filters.search && (
            <button
              className="ecom-purchase-filters__search-clear"
              onClick={() => onSearchChange('')}
            >
              <i className="fas fa-times"></i>
            </button>
          )}
        </div>
      </div>

      <div className="ecom-purchase-filters__controls">
        <div className="ecom-purchase-filters__select-group">
          <label className="ecom-purchase-filters__label">Vendor</label>
          <select
            value={filters.vendorId}
            onChange={(e) => handleFilterUpdate('vendorId', e.target.value)}
            className="ecom-purchase-filters__select"
          >
            <option value="">All Vendors</option>
            {vendors.map(vendor => (
              <option key={vendor._id} value={vendor._id}>
                {vendor.name}
              </option>
            ))}
          </select>
        </div>

        <div className="ecom-purchase-filters__select-group">
          <label className="ecom-purchase-filters__label">Status</label>
          <select
            value={filters.status}
            onChange={(e) => handleFilterUpdate('status', e.target.value)}
            className="ecom-purchase-filters__select"
          >
            {statusOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="ecom-purchase-filters__date-group">
          <label className="ecom-purchase-filters__label">From Date</label>
          <input
            type="date"
            value={filters.from}
            onChange={(e) => handleFilterUpdate('from', e.target.value)}
            className="ecom-purchase-filters__date-input"
          />
        </div>

        <div className="ecom-purchase-filters__date-group">
          <label className="ecom-purchase-filters__label">To Date</label>
          <input
            type="date"
            value={filters.to}
            onChange={(e) => handleFilterUpdate('to', e.target.value)}
            className="ecom-purchase-filters__date-input"
          />
        </div>

        <div className="ecom-purchase-filters__results">
          <span className="ecom-purchase-filters__count">{purchaseCount} purchases found</span>
          {hasActiveFilters && (
            <button
              className="ecom-purchase-filters__clear-btn"
              onClick={onClearFilters}
            >
              Clear Filters
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PurchaseFilters;