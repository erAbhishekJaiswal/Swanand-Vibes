import { useEffect, useState } from 'react';
import '../../../CssFiles/Admin/kyc/KycList.css';
import { GoSearch } from 'react-icons/go';
import { FiUserCheck, FiClock, FiXCircle, FiEye, FiFilter, FiTrash2 } from 'react-icons/fi'; // ✅ Added FiTrash2
import { useNavigate } from 'react-router-dom';
import Spinner from '../../../components/Spinner';
import { getAllKycs } from '../../../utills/apicall'; // ✅ Import delete API
import Pagination from '../../../components/Pagination';
import axios from 'axios';
import axiosInstance from '../../../utills/axiosInstance';

const KYCList = () => {
  const [kycList, setKycList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit] = useState(10);

  const navigate = useNavigate();

  // ✅ Fetch KYC data
  const fetchKycData = async () => {
    try {
      setLoading(true);
      const params = {
        page: currentPage,
        limit,
        search: searchTerm,
        status: statusFilter !== 'all' ? statusFilter : undefined,
      };

      const res = await getAllKycs(params);

      if (res.success) {
        setKycList(res.data);
        setTotalPages(res.totalPages);
      }
    } catch (error) {
      console.error('Error fetching KYC list:', error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Delete KYC method
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this KYC?")) return;

    try {
      setLoading(true);
      const res = await axiosInstance.delete(`${import.meta.env.VITE_API_URL}/user/kyc/${id}`);
      // deleteKycById(id);
      if (res.success) {
        // Remove from list without reloading
        setKycList((prev) => prev.filter((item) => item._id !== id));
      } else {
        alert(res.message || "Failed to delete KYC");
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("Something went wrong while deleting");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchKycData();
    }, 1000);
    return () => clearTimeout(timer);
  }, [searchTerm, statusFilter, currentPage]);

    // Helpers
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const pageChange = (page) => {
    setCurrentPage(page);
    fetchKycData();
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved':
        return <FiUserCheck className="kyc-status-icon" />;
      case 'pending':
        return <FiClock className="kyc-status-icon" />;
      case 'rejected':
        return <FiXCircle className="kyc-status-icon" />;
      default:
        return <FiClock className="kyc-status-icon" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved':
        return 'kyc-status-approved';
      case 'pending':
        return 'kyc-status-pending';
      case 'rejected':
        return 'kyc-status-rejected';
      default:
        return 'kyc-status-pending';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'approved':
        return 'Approved';
      case 'pending':
        return 'Pending Review';
      case 'rejected':
        return 'Rejected';
      default:
        return 'Pending';
    }
  };

  if (loading) {
    return (
      <div className="kyc-loading-container">
        <Spinner size="lg" />
        <p>Loading KYC applications...</p>
      </div>
    );
  }

  // ✅ Table UI
  return (
    <div className="kyc-admin-container">
      <div className="kyc-admin-header">
        <div className="kyc-admin-header-content">
          <h1>KYC Verification Portal</h1>
          <p>Manage and review user identity verification requests</p>
        </div>
      </div>

      <div className="kyc-admin-content">
        <div className="kyc-main-section">
          {/* Search + Filter */}
          <div className="kyc-controls">
            <div className="kyc-search-box">
              <input
                type="text"
                placeholder="Search by name, email, or KYC ID..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="kyc-search-input"
              />
            </div>

            <div className="kyc-filters">
              <div className="kyc-filter-group">
                <FiFilter className="kyc-filter-icon" />
                <select
                  value={statusFilter}
                  onChange={(e) => {
                    setStatusFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="kyc-filter-select"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="kyc-table-container">
            <div className="kyc-table-header">
              <span>{kycList.length} KYC {kycList.length === 1 ? 'application' : 'applications'} found</span>
            </div>

            <div className="kyc-table-wrapper">
              <table className="kyc-data-table">
                <thead>
                  <tr>
                    <th>User Information</th>
                    <th>KYC Status</th>
                    <th>Submission Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {kycList.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="kyc-no-results">
                        <div className="kyc-empty-state">
                          <GoSearch className="kyc-empty-icon" />
                          <h3>No KYC applications found</h3>
                          <p>Try adjusting your search or filters</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    kycList.map((kyc) => (
                      <tr key={kyc._id} className="kyc-data-row">
                        <td>
                          <div className="kyc-user-info">
                            <div className="kyc-user-avatar">
                              {kyc.adharName?.charAt(0)?.toUpperCase() || 'U'}
                            </div>
                            <div className="kyc-user-details">
                              <div className="kyc-user-name">{kyc.adharName || 'Unknown User'}</div>
                              <div className="kyc-user-email">{kyc.userId?.email || 'No email provided'}</div>
                              <div className="kyc-user-id">KYC ID: {kyc._id?.slice(-8).toUpperCase()}</div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className={`kyc-status-badge ${getStatusColor(kyc.status)}`}>
                            {getStatusIcon(kyc.status)}
                            {getStatusText(kyc.status)}
                          </div>
                        </td>
                        <td>{formatDate(kyc.createdAt)}</td>
                        <td className="kyc-actions">
                              <div className="kyclist-action-buttons"> 
                                <button
                                className="kyc-action-btn"
                                onClick={() => navigate(`/admin/kyc/${kyc._id}`)}
                              >
                                <FiEye /> View
                              </button>
                              <button
                                className="kyc-action-btn kyc-delete-btn"
                                onClick={() => handleDelete(kyc._id)}
                              >
                                <FiTrash2 /> Delete
                              </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={pageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default KYCList;
