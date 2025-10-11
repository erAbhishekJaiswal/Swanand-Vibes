import React, { useState, useEffect, useCallback } from 'react';
import PurchaseTable from '../../../components/PurchaseTable';
import PurchaseFilters from '../../../components/PurchaseFilters';
import '../../../CssFiles/Admin/Purchase/PurchaseListPage.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaRegClock , FaRegCheckCircle,FaRupeeSign } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
const PurchaseListPage = () => {
  const navigate = useNavigate();
  const [purchases, setPurchases] = useState([]);
  const [filteredPurchases, setFilteredPurchases] = useState([]);
  const [filters, setFilters] = useState({
    search: '',
    vendorId: '',
    status: '',
    from: '',
    to: ''
  });
  const [sortConfig, setSortConfig] = useState({ key: 'createdAt', direction: 'desc' });
  const [currentPage, setCurrentPage] = useState(1);
  const [purchasesPerPage] = useState(20);
  const [isLoading, setIsLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [totalPurchases, setTotalPurchases] = useState(0);
  const [vendors, setVendors] = useState([]);



    useEffect(() => {
      axios
        .get(`${import.meta.env.VITE_API_URL}/vendor/`)
        .then((res) => setVendors(res.data.data || res.data))
        .catch((error) => {
          // console.log('Error fetching vendors');
          console.log(error);
        });
    }, []);

  // Debounced search function
  const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  };

  // Fetch purchases (simulated API call)
  const fetchPurchases = useCallback(async (filters, page, sortConfig) => {
    setIsLoading(true);
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In real implementation, you would call your API:
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/purchase/`, {
        params: { ...filters, page, limit: purchasesPerPage }
      });

      console.log(response.data.data);
      
      setPurchases(response.data.data);
     const mockPurchases = response?.data?.data || [];
      
      
      // For now, using mock data with filtering
      let filtered = [...mockPurchases];
      
      // Apply search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        filtered = filtered.filter(purchase => 
          purchase.invoiceNumber.toLowerCase().includes(searchLower) ||
          purchase.vendor.name.toLowerCase().includes(searchLower)
        );
      }
      
      // Apply vendor filter
      if (filters.vendorId) {
        filtered = filtered.filter(purchase => purchase.vendor._id === filters.vendorId);
      }
      
      // Apply status filter
      if (filters.status) {
        filtered = filtered.filter(purchase => purchase.status === filters.status);
      }
      
      // Apply date filters
      if (filters.from) {
        const fromDate = new Date(filters.from);
        filtered = filtered.filter(purchase => new Date(purchase.createdAt) >= fromDate);
      }
      
      if (filters.to) {
        const toDate = new Date(filters.to);
        toDate.setHours(23, 59, 59, 999); // End of day
        filtered = filtered.filter(purchase => new Date(purchase.createdAt) <= toDate);
      }
      
      // Apply sorting
      filtered.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
      
      // Simulate pagination
      const startIndex = (page - 1) * purchasesPerPage;
      const paginatedData = filtered.slice(startIndex, startIndex + purchasesPerPage);
      
      setPurchases(paginatedData);
      setFilteredPurchases(paginatedData);
      setTotalPurchases(filtered.length);
      setTotalPages(Math.ceil(filtered.length / purchasesPerPage));
      
    } catch (error) {
      console.error('Error fetching purchases:', error);
    } finally {
      setIsLoading(false);
    }
  }, [purchasesPerPage]);

  // Debounced search handler
  const debouncedSearch = useCallback(
    debounce((searchValue) => {
      setFilters(prev => ({ ...prev, search: searchValue }));
      setCurrentPage(1);
    }, 500),
    []
  );

  const curruncyFormat = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  }

  // Handle search input change
  const handleSearchChange = (value) => {
    debouncedSearch(value);
  };

  // Handle filter changes
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  // Handle sort
  const handleSort = (key) => {
    setSortConfig({
      key,
      direction: sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc'
    });
  };

  // Clear all filters
  const clearAllFilters = () => {
    setFilters({
      search: '',
      vendorId: '',
      status: '',
      from: '',
      to: ''
    });
    setCurrentPage(1);
  };

  // Fetch purchases when filters, page, or sort change
  useEffect(() => {
    fetchPurchases(filters, currentPage, sortConfig);
  }, [filters, currentPage, sortConfig, fetchPurchases]);

  const getStats = () => {
    const total = totalPurchases;
    const totalAmount = purchases.reduce((sum, purchase) => sum + purchase.totalAmount, 0);
    const paidPurchases = purchases.filter(p => p.paymentStatus === 'paid').length;
    const pendingPurchases = purchases.filter(p => p.paymentStatus === 'pending').length;

    return { total, totalAmount, paidPurchases, pendingPurchases };
  };

  const handleCreatePurchase = () => {
    // Navigate to create purchase page
    navigate('/admin/adminpurchaseform');
  };

  const handleAddVendor = () => {
    // Open add vendor modal or navigate to vendor page
    navigate('/admin/vendorcreateform');
  };

  const handleExportPurchases = () => {
    // Export purchases functionality
    const csvContent = [
      ['Invoice Number', 'Vendor', 'Total Amount', 'Status', 'Payment Status', 'Created Date'],
      ...purchases.map(purchase => [
        purchase.invoiceNumber,
        purchase.vendor.name,
        purchase.totalAmount,
        purchase.status,
        purchase.paymentStatus,
        new Date(purchase.createdAt).toLocaleDateString()
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `purchases_export_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };



  if (isLoading && purchases.length === 0) {
    return (
      <div className="ecom-purchase-list-page">
        <div className="ecom-purchase-list-page__loading">
          <div className="ecom-purchase-list-page__loading-spinner"></div>
          <p>Loading purchases...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="ecom-purchase-list-page">
      <div className="ecom-purchase-list-page__container">
        {/* Header */}
        <div className="ecom-purchase-list-page__header">
          <div className="ecom-purchase-list-page__header-content">
            <h1 className="ecom-purchase-list-page__title">Purchase Management</h1>
            <p className="ecom-purchase-list-page__subtitle">
              Manage your purchase orders and Company transactions
            </p>
          </div>
          <div className="ecom-purchase-list-page__header-actions">
            <button 
              className="ecom-purchase-list-page__export-btn"
              onClick={handleExportPurchases}
            >
              <i className="fas fa-download"></i>
              Export
            </button>
            <button 
              className="ecom-purchase-list-page__action-btn ecom-purchase-list-page__action-btn--secondary"
              onClick={handleAddVendor}
            >
              <i className="fas fa-plus"></i>
              Add Company
            </button>
            <button 
              className="ecom-purchase-list-page__action-btn ecom-purchase-list-page__action-btn--primary"
              onClick={handleCreatePurchase}
            >
              <i className="fas fa-file-invoice"></i>
              New Purchase
            </button>
             <button 
              className="ecom-purchase-list-page__export-btn"
              onClick={()=>navigate('/admin/profit-loss')}
            >
              Profit & Loss
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="ecom-purchase-list-page__stats">
          <div className="ecom-purchase-list-page__stat-card">
            <div className="ecom-purchase-list-page__stat-icon ecom-purchase-list-page__stat-icon--total">
              {/* <i className="fas fa-shopping-cart"></i> */}
              <FaCartShopping />
            </div>
            <div className="ecom-purchase-list-page__stat-content">
              <span className="ecom-purchase-list-page__stat-number">{getStats().total}</span>
              <span className="ecom-purchase-list-page__stat-label">Total Purchases</span>
            </div>
          </div>

          <div className="ecom-purchase-list-page__stat-card">
            <div className="ecom-purchase-list-page__stat-icon ecom-purchase-list-page__stat-icon--amount">
              {/* <i className="fas fa-dollar-sign"></i> */}
              <FaRupeeSign />
            </div>
            <div className="ecom-purchase-list-page__stat-content">
              <span className="ecom-purchase-list-page__stat-number">
                {/* {getStats().totalAmount.toLocaleString()} */}
                {curruncyFormat(getStats().totalAmount)}
              </span>
              <span className="ecom-purchase-list-page__stat-label">Total Amount</span>
            </div>
          </div>

          <div className="ecom-purchase-list-page__stat-card">
            <div className="ecom-purchase-list-page__stat-icon ecom-purchase-list-page__stat-icon--paid">
              {/* <i className="fas fa-check-circle"></i> */}
              < FaRegCheckCircle />
            </div>
            <div className="ecom-purchase-list-page__stat-content">
              <span className="ecom-purchase-list-page__stat-number">{getStats().paidPurchases}</span>
              <span className="ecom-purchase-list-page__stat-label">Paid</span>
            </div>
          </div>

          <div className="ecom-purchase-list-page__stat-card">
            <div className="ecom-purchase-list-page__stat-icon ecom-purchase-list-page__stat-icon--pending">
              {/* <i className="fas fa-clock"></i> */}
              < FaRegClock />
            </div>
            <div className="ecom-purchase-list-page__stat-content">
              <span className="ecom-purchase-list-page__stat-number">{getStats().pendingPurchases}</span>
              <span className="ecom-purchase-list-page__stat-label">Pending</span>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="ecom-purchase-list-page__filters-section">
          <PurchaseFilters
            filters={filters}
            onFilterChange={handleFilterChange}
            onSearchChange={handleSearchChange}
            vendors={vendors}
            purchaseCount={totalPurchases}
            onClearFilters={clearAllFilters}
          />
        </div>

        {/* Purchases Table */}
        <div className="ecom-purchase-list-page__content">
          <PurchaseTable
            purchases={purchases}
            onSort={handleSort}
            sortConfig={sortConfig}
            isLoading={isLoading}
          />

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="ecom-purchase-list-page__pagination">
              <div className="ecom-purchase-list-page__pagination-info">
                Showing {((currentPage - 1) * purchasesPerPage) + 1}-{Math.min(currentPage * purchasesPerPage, totalPurchases)} of {totalPurchases} purchases
              </div>
              
              <div className="ecom-purchase-list-page__pagination-controls">
                <button
                  className="ecom-purchase-list-page__pagination-btn"
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  <i className="fas fa-chevron-left"></i>
                  Previous
                </button>

                <div className="ecom-purchase-list-page__pagination-numbers">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <button
                      key={page}
                      className={`ecom-purchase-list-page__pagination-number ${
                        currentPage === page ? 'ecom-purchase-list-page__pagination-number--active' : ''
                      }`}
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </button>
                  ))}
                </div>

                <button
                  className="ecom-purchase-list-page__pagination-btn"
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                >
                  Next
                  <i className="fas fa-chevron-right"></i>
                </button>
              </div>

              <div className="ecom-purchase-list-page__pagination-size">
                <label>Show:</label>
                <select
                  value={purchasesPerPage}
                  onChange={(e) => console.log('Change page size to:', e.target.value)}
                  className="ecom-purchase-list-page__pagination-select"
                >
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                </select>
                <span>per page</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PurchaseListPage;