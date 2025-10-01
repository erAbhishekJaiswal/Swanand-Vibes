// import React from 'react'

// const KycList = () => {
//   return (
//     <div>
//         <h1>KYC List</h1>
//         <table>
//             <thead>
//                 <tr>
//                     <th>ID</th>
//                     <th>Name</th>
//                     <th>Status</th>
//                     <th>Actions</th>
//                 </tr>
//             </thead>
//             <tbody>
//                 {/* KYC rows will be mapped here */}
//             </tbody>
//         </table>
//     </div>
//   )
// }

// export default KycList













// ******************

// import { useEffect, useState } from 'react';
// import '../../../CssFiles/Admin/kyc/KycList.css';
// import { GoIssueClosed } from 'react-icons/go';
// import { MdOutlineCancel } from 'react-icons/md';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import {getAllKycs} from '../../../utills/apicall';
// import Spinner from '../../../components/Spinner';

// const KYCList = () => {
//       const [kycList, setKycList] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchKycList = async () => {
//       const response = await getAllKycs()
//       // axios.get("http://localhost:5000/api/user/kyc");
//       setKycList(response.data);
//       setLoading(false);
//     };
//     fetchKycList();
//   }, []);

//   if (loading) return <div><Spinner size="lg" /></div>;
//   return (
//     // <div className="kyc-container">
//     //   {/* Search bar */}
//     //   <div className="kyc-search">
//     //     <input
//     //       type="text"
//     //       placeholder="Search by name or email"
//     //       className="kyc-input"
//     //     />
//     //   </div>

//     //   {/* Table Card */}
//     //   <div className="kyc-table-wrapper">
//     //     <div className="kyc-table-header">
//     //       <h2>KYC List</h2>
//     //       <p>Browse a list of KYC submissions</p>
//     //     </div>

//     //     <table className="kyc-table">
//     //       <thead>
//     //         <tr>
//     //           <th>Name</th>
//     //           <th>KYC Status</th>
//     //           <th>Action</th>
//     //         </tr>
//     //       </thead>
//     //       <tbody>
//     //         {kycList.map((kyc, idx) => (
//     //           <tr key={kyc.id} className={idx % 2 === 0 ? 'even' : 'odd'}>
//     //             <td>{kyc.adharName}</td>
//     //             <td>
//     //               <span className={`status-badge ${kyc.status}`}>
//     //                 {kyc.status === "approved" ? (
//     //                   <GoIssueClosed className="status-icon" />
//     //                 ) : kyc.status === "rejected" ? (
//     //                   <MdOutlineCancel className="status-icon" />
//     //                 ) : null}
//     //                 {kyc.status || "Not Submitted"}
//     //               </span>
//     //             </td>
//     //             <td>
//     //               <button
//     //                 className="details-btn"
//     //                 onClick={() =>
//     //                   (window.location.href = `/admin/kyc/${kyc ? kyc.id : 'list'}`)
//     //                 }
//     //               >
//     //                 Details
//     //               </button>
//     //             </td>
//     //           </tr>
//     //         ))}
//     //       </tbody>
//     //     </table>
//     //   </div>
//     // </div>

//     <div className="kyc-container">
//   {/* Search Bar */}
//   <div className="search-bar">
//     <input
//       type="text"
//       placeholder="🔍 Search by name or email"
//       className="search-input"
//     />
//   </div>

//   {/* Table */}
//   <div className="kyc-table-wrapper">
//     <table className="kyc-table">
//       <caption className="table-caption">
//         KYC List
//         <p className="table-subcaption">Browse a list of KYC submissions</p>
//       </caption>

//       <thead>
//         <tr>
//           <th>Name</th>
//           <th>KYC Status</th>
//           <th>Action</th>
//         </tr>
//       </thead>

//       <tbody>
//         {kycList.map((kyc, idx) => (
//           <tr key={kyc._id} className="kyc-row">
//             <td>{kyc.adharName}</td>
//             <td>
//               <span className={`status-badge ${kyc.status}`}>
//                 {kyc.status === "approved" ? "✔ Approved" : ""}
//                 {kyc.status === "pending" ? "⏳ Pending" : ""}
//                 {kyc.status === "rejected" ? "❌ Rejected" : ""}
//               </span>
//             </td>
//             <td>
//               <button
//                 className="details-button"
//                 onClick={() =>
//                   navigate(`/admin/kyc/${kyc?._id}`)
//                 }
//               >
//                 🔎 Details
//               </button>
//             </td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   </div>
// </div>

//   );
// };

// export default KYCList;







// **********************************************************
// import { useEffect, useState } from 'react';
// import '../../../CssFiles/Admin/kyc/KycList.css';
// import { GoIssueClosed, GoSearch } from 'react-icons/go';
// import { MdOutlineCancel, MdOutlinePendingActions } from 'react-icons/md';
// import { FiUserCheck, FiClock, FiXCircle, FiEye, FiFilter } from 'react-icons/fi';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { getAllKycs } from '../../../utills/apicall';
// import Spinner from '../../../components/Spinner';

// const KYCList = () => {
//   const [kycList, setKycList] = useState([]);
//   const [filteredKycList, setFilteredKycList] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [statusFilter, setStatusFilter] = useState('all');
//   const [sortBy, setSortBy] = useState('recent');
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchKycList = async () => {
//       try {
//         setLoading(true);
//         const response = await getAllKycs();
//         // console.log(response);
        
//         setKycList(response.data);
//         setFilteredKycList(response.data);
//       } catch (error) {
//         console.error('Error fetching KYC list:', error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchKycList();
//   }, []);

//   // Filter and search function
//   useEffect(() => {
//     let results = kycList;

//     // Apply search filter
//     if (searchTerm) {
//       const term = searchTerm.toLowerCase();
//       results = results.filter(kyc =>
//         kyc.adharName?.toLowerCase().includes(term) ||
//         kyc.userId?.email?.toLowerCase().includes(term) ||
//         kyc.userId?.name?.toLowerCase().includes(term) ||
//         kyc._id?.toLowerCase().includes(term)
//       );
//     }

//     // Apply status filter
//     if (statusFilter !== 'all') {
//       results = results.filter(kyc => kyc.status === statusFilter);
//     }

//     // Apply sorting
//     results.sort((a, b) => {
//       if (sortBy === 'recent') {
//         return new Date(b.createdAt || b.updatedAt) - new Date(a.createdAt || a.updatedAt);
//       } else if (sortBy === 'name') {
//         return (a.adharName || '').localeCompare(b.adharName || '');
//       }
//       return 0;
//     });

//     setFilteredKycList(results);
//   }, [searchTerm, statusFilter, sortBy, kycList]);

//   const getStatusIcon = (status) => {
//     switch (status) {
//       case 'approved':
//         return <FiUserCheck className="kyc-status-icon" />;
//       case 'pending':
//         return <FiClock className="kyc-status-icon" />;
//       case 'rejected':
//         return <FiXCircle className="kyc-status-icon" />;
//       default:
//         return <FiClock className="kyc-status-icon" />;
//     }
//   };

//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'approved':
//         return 'kyc-status-approved';
//       case 'pending':
//         return 'kyc-status-pending';
//       case 'rejected':
//         return 'kyc-status-rejected';
//       default:
//         return 'kyc-status-pending';
//     }
//   };

//   const getStatusText = (status) => {
//     switch (status) {
//       case 'approved':
//         return 'Approved';
//       case 'pending':
//         return 'Pending Review';
//       case 'rejected':
//         return 'Rejected';
//       default:
//         return 'Pending';
//     }
//   };

//   const formatDate = (dateString) => {
//     if (!dateString) return 'N/A';
//     return new Date(dateString).toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric'
//     });
//   };

//   const getRecentKycs = () => {
//     return kycList
//       .sort((a, b) => new Date(b.createdAt || b.updatedAt) - new Date(a.createdAt || a.updatedAt))
//       .slice(0, 5);
//   };

//   const getStats = () => {
//     const total = kycList.length;
//     const approved = kycList.filter(k => k.status === 'approved').length;
//     const pending = kycList.filter(k => k.status === 'pending').length;
//     const rejected = kycList.filter(k => k.status === 'rejected').length;

//     return { total, approved, pending, rejected };
//   };

//   const stats = getStats();
//   const recentKycs = getRecentKycs();

//   if (loading) {
//     return (
//       <div className="kyc-loading-container">
//         <Spinner size="lg" />
//         <p>Loading KYC applications...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="kyc-admin-container">
//       {/* Header */}
//       <div className="kyc-admin-header">
//         <div className="kyc-admin-header-content">
//           <h1>KYC Verification Portal</h1>
//           <p>Manage and review user identity verification requests</p>
//         </div>
//       </div>

//       {/* Stats Cards */}
//       <div className="kyc-stats-grid">
//         <div className="kyc-stat-card kyc-stat-total">
//           <div className="kyc-stat-icon">
//             <FiUserCheck />
//           </div>
//           <div className="kyc-stat-info">
//             <h3>{stats.total}</h3>
//             <p>Total Applications</p>
//           </div>
//         </div>

//         <div className="kyc-stat-card kyc-stat-pending">
//           <div className="kyc-stat-icon">
//             <FiClock />
//           </div>
//           <div className="kyc-stat-info">
//             <h3>{stats.pending}</h3>
//             <p>Pending Review</p>
//           </div>
//         </div>

//         <div className="kyc-stat-card kyc-stat-approved">
//           <div className="kyc-stat-icon">
//             <FiUserCheck />
//           </div>
//           <div className="kyc-stat-info">
//             <h3>{stats.approved}</h3>
//             <p>Approved</p>
//           </div>
//         </div>

//         <div className="kyc-stat-card kyc-stat-rejected">
//           <div className="kyc-stat-icon">
//             <FiXCircle />
//           </div>
//           <div className="kyc-stat-info">
//             <h3>{stats.rejected}</h3>
//             <p>Rejected</p>
//           </div>
//         </div>
//       </div>

//       <div className="kyc-admin-content">
//         {/* Recent KYC Section */}
//         {/* <div className="kyc-recent-section">
//           <div className="kyc-section-header">
//             <h2>Recent KYC Applications</h2>
//             <span className="kyc-section-badge">{recentKycs.length} recent</span>
//           </div>
          
//           <div className="kyc-recent-list">
//             {recentKycs.map((kyc) => (
//               <div key={kyc._id} className="kyc-recent-item">
//                 <div className="kyc-recent-avatar">
//                   {kyc.adharName?.charAt(0)?.toUpperCase() || 'U'}
//                 </div>
//                 <div className="kyc-recent-info">
//                   <h4>{kyc.adharName || 'Unknown User'}</h4>
//                   <p>{kyc.userId?.email || 'No email provided'}</p>
//                   <span className={`kyc-recent-status ${getStatusColor(kyc.status)}`}>
//                     {getStatusIcon(kyc.status)}
//                     {getStatusText(kyc.status)}
//                   </span>
//                 </div>
//                 <div className="kyc-recent-date">
//                   {formatDate(kyc.createdAt)}
//                 </div>
//                 <button
//                   className="kyc-recent-view-btn"
//                   onClick={() => navigate(`/admin/kyc/${kyc._id}`)}
//                 >
//                   <FiEye />
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div> */}

//         {/* Main KYC List */}
//         <div className="kyc-main-section">
//           <div className="kyc-controls">
//             <div className="kyc-search-box">
//               {/* <GoSearch className="kyc-search-icon" /> */}
//               <input
//                 type="text"
//                 placeholder="Search by name, email, or KYC ID..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="kyc-search-input"
//               />
//             </div>

//             <div className="kyc-filters">
//               <div className="kyc-filter-group">
//                 <FiFilter className="kyc-filter-icon" />
//                 <select
//                   value={statusFilter}
//                   onChange={(e) => setStatusFilter(e.target.value)}
//                   className="kyc-filter-select"
//                 >
//                   <option value="all">All Status</option>
//                   <option value="pending">Pending</option>
//                   <option value="approved">Approved</option>
//                   <option value="rejected">Rejected</option>
//                 </select>
//               </div>

//               <div className="kyc-filter-group">
//                 <select
//                   value={sortBy}
//                   onChange={(e) => setSortBy(e.target.value)}
//                   className="kyc-filter-select"
//                 >
//                   <option value="recent">Most Recent</option>
//                   <option value="name">By Name</option>
//                 </select>
//               </div>
//             </div>
//           </div>

//           <div className="kyc-table-container">
//             <div className="kyc-table-header">
//               <span>{filteredKycList.length} KYC {filteredKycList.length === 1 ? 'application' : 'applications'} found</span>
//             </div>

//             <div className="kyc-table-wrapper">
//               <table className="kyc-data-table">
//                 <thead>
//                   <tr>
//                     <th>User Information</th>
//                     <th>KYC Status</th>
//                     <th>Submission Date</th>
//                     <th>Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {filteredKycList.length === 0 ? (
//                     <tr>
//                       <td colSpan="4" className="kyc-no-results">
//                         <div className="kyc-empty-state">
//                           <GoSearch className="kyc-empty-icon" />
//                           <h3>No KYC applications found</h3>
//                           <p>Try adjusting your search or filters</p>
//                         </div>
//                       </td>
//                     </tr>
//                   ) : (
//                     filteredKycList.map((kyc) => (
//                       <tr key={kyc._id} className="kyc-data-row">
//                         <td>
//                           <div className="kyc-user-info">
//                             <div className="kyc-user-avatar">
//                               {kyc.adharName?.charAt(0)?.toUpperCase() || 'U'}
//                             </div>
//                             <div className="kyc-user-details">
//                               <div className="kyc-user-name">{kyc.adharName || 'Unknown User'}</div>
//                               <div className="kyc-user-email">{kyc.userId?.email || 'No email provided'}</div>
//                               <div className="kyc-user-id">KYC ID: {kyc._id?.slice(-8).toUpperCase()}</div>
//                             </div>
//                           </div>
//                         </td>
//                         <td>
//                           <div className={`kyc-status-badge ${getStatusColor(kyc.status)}`}>
//                             {getStatusIcon(kyc.status)}
//                             {getStatusText(kyc.status)}
//                           </div>
//                         </td>
//                         <td>
//                           <div className="kyc-date-info">
//                             {formatDate(kyc.createdAt)}
//                           </div>
//                         </td>
//                         <td>
//                           <button
//                             className="kyc-action-btn"
//                             onClick={() => navigate(`/admin/kyc/${kyc._id}`)}
//                             title="View details"
//                           >
//                             <FiEye /> View
//                           </button>
//                         </td>
//                       </tr>
//                     ))
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default KYCList;




// **********************************************

import { useEffect, useState } from 'react';
import '../../../CssFiles/Admin/kyc/KycList.css';
import { GoSearch } from 'react-icons/go';
import { FiUserCheck, FiClock, FiXCircle, FiEye, FiFilter, FiTrash2 } from 'react-icons/fi'; // ✅ Added FiTrash2
import { useNavigate } from 'react-router-dom';
import Spinner from '../../../components/Spinner';
import { getAllKycs } from '../../../utills/apicall'; // ✅ Import delete API
import Pagination from '../../../components/Pagination';
import axios from 'axios';

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
      const res = await axios.delete(`${import.meta.env.VITE_API_URL}/user/kyc/${id}`);
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








// import { useEffect, useState } from 'react';
// import '../../../CssFiles/Admin/kyc/KycList.css';
// import { GoSearch } from 'react-icons/go';
// import { FiUserCheck, FiClock, FiXCircle, FiEye, FiFilter, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
// import { useNavigate } from 'react-router-dom';
// import Spinner from '../../../components/Spinner';
// import { getAllKycs } from '../../../utills/apicall';
// import Pagination from '../../../components/Pagination';

// const KYCList = () => {
//   const [kycList, setKycList] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [statusFilter, setStatusFilter] = useState('all');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [limit] = useState(10); // You can make this dynamic if needed

//   const navigate = useNavigate();

//   // Fetch KYC data
//   const fetchKycData = async () => {
//     try {
//       setLoading(true);
//       const params = {
//         page: currentPage,
//         limit,
//         search: searchTerm,
//         status: statusFilter !== 'all' ? statusFilter : undefined
//       };
      
//       const res = await getAllKycs(params);

//       // console.log(res);
      
//       if (res.success) {
//         setKycList(res.data);
//         setTotalPages(res.totalPages);
//       }
//     } catch (error) {
//       console.error('Error fetching KYC list:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Re-fetch data on filter/pagination changes
//   useEffect(() => {
//     // set time delay of 2 seconds
//     setTimeout(() => {
//       fetchKycData();
//     }, 1000);
//     // fetchKycData();
//   }, [searchTerm, statusFilter, currentPage]);

//   // Helpers
//   const formatDate = (dateString) => {
//     if (!dateString) return 'N/A';
//     return new Date(dateString).toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric'
//     });
//   };

//   const pageChange = (page) => {
//     setCurrentPage(page);
//     fetchKycData();
//   }

//   const getStatusIcon = (status) => {
//     switch (status) {
//       case 'approved':
//         return <FiUserCheck className="kyc-status-icon" />;
//       case 'pending':
//         return <FiClock className="kyc-status-icon" />;
//       case 'rejected':
//         return <FiXCircle className="kyc-status-icon" />;
//       default:
//         return <FiClock className="kyc-status-icon" />;
//     }
//   };

//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'approved':
//         return 'kyc-status-approved';
//       case 'pending':
//         return 'kyc-status-pending';
//       case 'rejected':
//         return 'kyc-status-rejected';
//       default:
//         return 'kyc-status-pending';
//     }
//   };

//   const getStatusText = (status) => {
//     switch (status) {
//       case 'approved':
//         return 'Approved';
//       case 'pending':
//         return 'Pending Review';
//       case 'rejected':
//         return 'Rejected';
//       default:
//         return 'Pending';
//     }
//   };

//   if (loading) {
//     return (
//       <div className="kyc-loading-container">
//         <Spinner size="lg" />
//         <p>Loading KYC applications...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="kyc-admin-container">
//       <div className="kyc-admin-header">
//         <div className="kyc-admin-header-content">
//           <h1>KYC Verification Portal</h1>
//           <p>Manage and review user identity verification requests</p>
//         </div>
//       </div>

//       <div className="kyc-admin-content">
//         <div className="kyc-main-section">
//           {/* Search and Filter */}
//           <div className="kyc-controls">
//             <div className="kyc-search-box">
//               <input
//                 type="text"
//                 placeholder="Search by name, email, or KYC ID..."
//                 value={searchTerm}
//                 onChange={(e) => {
//                   setSearchTerm(e.target.value);
//                   setCurrentPage(1); // reset to first page
//                 }}
//                 className="kyc-search-input"
//               />
//             </div>

//             <div className="kyc-filters">
//               <div className="kyc-filter-group">
//                 <FiFilter className="kyc-filter-icon" />
//                 <select
//                   value={statusFilter}
//                   onChange={(e) => {
//                     setStatusFilter(e.target.value);
//                     setCurrentPage(1); // reset to first page
//                   }}
//                   className="kyc-filter-select"
//                 >
//                   <option value="all">All Status</option>
//                   <option value="pending">Pending</option>
//                   <option value="approved">Approved</option>
//                   <option value="rejected">Rejected</option>
//                 </select>
//               </div>
//             </div>
//           </div>

//           {/* Table */}
//           <div className="kyc-table-container">
//             <div className="kyc-table-header">
//               <span>{kycList.length} KYC {kycList.length === 1 ? 'application' : 'applications'} found</span>
//             </div>

//             <div className="kyc-table-wrapper">
//               <table className="kyc-data-table">
//                 <thead>
//                   <tr>
//                     <th>User Information</th>
//                     <th>KYC Status</th>
//                     <th>Submission Date</th>
//                     <th>Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {kycList.length === 0 ? (
//                     <tr>
//                       <td colSpan="4" className="kyc-no-results">
//                         <div className="kyc-empty-state">
//                           <GoSearch className="kyc-empty-icon" />
//                           <h3>No KYC applications found</h3>
//                           <p>Try adjusting your search or filters</p>
//                         </div>
//                       </td>
//                     </tr>
//                   ) : (
//                     kycList.map((kyc) => (
//                       <tr key={kyc._id} className="kyc-data-row">
//                         <td>
//                           <div className="kyc-user-info">
//                             <div className="kyc-user-avatar">
//                               {kyc.adharName?.charAt(0)?.toUpperCase() || 'U'}
//                             </div>
//                             <div className="kyc-user-details">
//                               <div className="kyc-user-name">{kyc.adharName || 'Unknown User'}</div>
//                               <div className="kyc-user-email">{kyc.userId?.email || 'No email provided'}</div>
//                               <div className="kyc-user-id">KYC ID: {kyc._id?.slice(-8).toUpperCase()}</div>
//                             </div>
//                           </div>
//                         </td>
//                         <td>
//                           <div className={`kyc-status-badge ${getStatusColor(kyc.status)}`}>
//                             {getStatusIcon(kyc.status)}
//                             {getStatusText(kyc.status)}
//                           </div>
//                         </td>
//                         <td>{formatDate(kyc.createdAt)}</td>
//                         <td>
//                           <button
//                             className="kyc-action-btn"
//                             onClick={() => navigate(`/admin/kyc/${kyc._id}`)}
//                           >
//                             <FiEye /> View
//                           </button>
//                         </td>
//                       </tr>
//                     ))
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           </div>

//           {/* Pagination */}

//           <Pagination
//             currentPage={currentPage}
//             totalPages={totalPages}
//             onPageChange={pageChange}
//           />

//         </div>
//       </div>
//     </div>
//   );
// };

// export default KYCList;
