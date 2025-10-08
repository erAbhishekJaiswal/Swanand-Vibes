// WithdrawalRequests.js
import React, { useState, useEffect } from 'react';
import { FiSearch, FiFilter, FiDollarSign, FiUser, FiClock, FiCheck, FiX, FiAlertCircle, FiEye, FiChevronDown, FiChevronUp, FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import '../../../CssFiles/Admin/Withdrawal/WithdrawalRequests.css';
import axios from 'axios';
import Spinner from "../../../components/Spinner";
import Pagination from '../../../components/Pagination';
import toast from 'react-hot-toast';
const WithdrawalRequests = () => {
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortField, setSortField] = useState('date');
  const [sortDirection, setSortDirection] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const today = new Date().toISOString().split("T")[0];
  const [startDate, setStartDate] = useState("2025-09-01");
  const [endDate, setEndDate] = useState(today);
  const [showModal, setShowModal] = useState(false);
  

  const handleWithdrawalReport = async () => {
  try {
    if (!startDate || !endDate) {
      alert("Please select both start and end dates.");
      return;
    }

    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/user/wallet/withdrawal-report?start=${encodeURIComponent(
        startDate
      )}&end=${encodeURIComponent(endDate)}`,
      { responseType: "blob" }
    );

    const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "withdrawal-report.xlsx");
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (err) {
    console.error("Error downloading report:", err);
  }
};

useEffect(() => {
  const fetchData = async () => {
    try {
      setIsLoading(true);

      const response = await axios.get(`${import.meta.env.VITE_API_URL}/user/wallet/requests`);
      const data = response.data;

      console.log(data);

      const withdrawalRequests = data.withdrawalRequests;

      // Format to expected structure
      const formattedRequests = withdrawalRequests.map(request => {
        const transaction = request.transactions; // Single object now

        // Optional: Only include if the transaction is valid
        if (!transaction || transaction.type !== 'debit' || !transaction.status.includes('withdrawal')) {
          return null;
        }

        return {
          _id: `${request.walletId}-${transaction._id}`, // using walletId as unique ID
          user: request.user,
          balance: request.balance,
          transactions: [transaction] // Wrapping single object into array to keep UI logic unchanged
        };
      }).filter(Boolean); // Remove any nulls

      console.log(formattedRequests);

      setRequests(formattedRequests);
      setFilteredRequests(formattedRequests);
      
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching withdrawal requests:', error);
      setIsLoading(false);
    }
  };

  fetchData();
}, []);

 
 
 
  useEffect(() => {
    let result = [...requests];
    
    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(request => 
        request.user.name.toLowerCase().includes(term) ||
        request.user.email.toLowerCase().includes(term) ||
        request.balance.toString().includes(term)
      );
    }
    
    // Apply status filter
    // if (statusFilter !== 'all') {
    //   result = result.filter(request => 
    //     request.transactions[0].status === statusFilter
    //   );
    // }
    // In your useEffect filter logic:
if (statusFilter !== 'all') {
  result = result.filter(request => {
    if (statusFilter === 'pending') {
      return request.transactions[0].status === 'withdrawal-requested';
    } else if (statusFilter === 'approved') {
      return request.transactions[0].status === 'withdrawal-approved';
    } else if (statusFilter === 'rejected') {
      return request.transactions[0].status === 'withdrawal-rejected';
    } else {
      return request.transactions[0].status === statusFilter;
    }
  });
}
    
    // Apply sorting
    result.sort((a, b) => {
      let aValue, bValue;
      
      if (sortField === 'date') {
        aValue = new Date(a.transactions[0].date);
        bValue = new Date(b.transactions[0].date);
      } else if (sortField === 'amount') {
        aValue = a.transactions[0].amount;
        bValue = b.transactions[0].amount;
      } else if (sortField === 'name') {
        aValue = a.user.name;
        bValue = b.user.name;
      } else if (sortField === 'balance') {
        aValue = a.balance;
        bValue = b.balance;
      } else {
        aValue = a.transactions[0].status;
        bValue = b.transactions[0].status;
      }
      
      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
    
    setFilteredRequests(result);
    setCurrentPage(1);
  }, [searchTerm, statusFilter, sortField, sortDirection, requests]);

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentRequests = filteredRequests;
  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };


  const updateStatus = async (requestId, newStatus) => {
  try {
    // Find the request using the composite _id (walletId-txnId)
    const request = requests.find(r => r._id === requestId);
    if (!request) return;

    setIsLoading(true);

    // Extract walletId and txnId from composite id
    const [walletId, txnId] = request._id.split("-");

    // Prepare payload
    const payload = {
      walletId,
      txnId,
      status: newStatus,
    };

    let endpoint = "";
    if (newStatus === "withdrawal-rejected") {
      endpoint = `${import.meta.env.VITE_API_URL}/user/wallet/${walletId}/reject-withdrawal`;
    } else if (newStatus === "withdrawal-approved") {
      endpoint = `${import.meta.env.VITE_API_URL}/user/wallet/${walletId}/approve-withdrawal`;
    } else if (newStatus === "completed") {
      endpoint = `${import.meta.env.VITE_API_URL}/user/wallet/${walletId}/complete-withdrawal`;
    }

    console.log("Updating status:", { requestId, newStatus, payload });

    if (endpoint) {
      await axios.put(endpoint, payload);
    }

    setIsLoading(false);
    toast.success(`Withdrawal ${newStatus.replace("withdrawal-", "")} successfully`);

    // Update local state
    setRequests(
      requests.map(req =>
        req._id === requestId
          ? {
              ...req,
              transactions: req.transactions.map(transaction => ({
                ...transaction,
                status: newStatus,
              })),
            }
          : req
      )
    );
  } catch (error) {
    console.error("Error updating status:", error);
    setIsLoading(false);
  }
};


  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(amount);
  };

// Functions to get status class and icon
  // const getStatusClass = (status) => {
  //   switch (status) {
  //     case 'pending': return 'status-pending';
  //     case 'approved': return 'status-approved';
  //     case 'processing': return 'status-processing';
  //     case 'rejected': return 'status-rejected';
  //     case 'completed': return 'status-completed';
  //     default: return '';
  //   }
  // };

  const getStatusClass = (status) => {
  switch (status) {
    case 'withdrawal-requested': return 'status-pending';
    case 'withdrawal-approved': return 'status-approved';
    case 'withdrawal-rejected': return 'status-rejected';
    case 'completed': return 'status-completed';
    default: return '';
  }
};

const getStatusIcon = (status) => {
  switch (status) {
    case 'withdrawal-requested': return <FiClock />;
    case 'withdrawal-approved': return <FiCheck />;
    case 'withdrawal-rejected': return <FiX />;
    case 'completed': return <FiCheck />;
    default: return <FiAlertCircle />;
  }
};

  if (isLoading) {
    return (
      <Spinner size="lg"/>
    );
  }

  return (
    <div className="withdrawal-requests-container">
      <div className="requests-header">
        <div className='requests-header-text'>
          <h1>Withdrawal Requests</h1>
          <p>Manage user withdrawal requests and transactions</p>
        </div>
        <div className='outter-main-download-btn'>
          <button className="main-download-btn" onClick={() => setShowModal(true)}>
        Download Report
      </button>
      </div>
       
      </div>

      


            {/* Popup Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2 className="withdrawal-report-title">Withdrawal Report</h2>
            <div className="withdrawal-report-filters">
              <div className="withdrawal-report-filter-group">
                <label>Start Date</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
              <div className="withdrawal-report-filter-group">
                <label>End Date</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
            </div>

            <div className="modal-actions">
              <button
                className="withdrawal-report-download-btn"
                onClick={handleWithdrawalReport}
              >
                Download
              </button>
              <button
                className="withdrawal-report-cancel-btn"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}


       {/* <div className="withdrawal-report-container">
      <h2 className="withdrawal-report-title">Withdrawal Report</h2>
      <div className="withdrawal-report-filters">
        <div className="withdrawal-report-filter-group">
          <label>Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div className="withdrawal-report-filter-group">
          <label>End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <button className="withdrawal-report-download-btn" onClick={handleWithdrawalReport}>
          Download Report
        </button>
      </div>
       </div> */}

      <div className="withdrawal-requests-controls">
        <div className="withdrawal-search-box">
          {/* <FiSearch className="search-icon" /> */}
          <input
            type="text"
            placeholder="Search users or amount..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="withdrawal-filter-controls">
          <div className="withdrawal-filter-group">
            <FiFilter className="withdrawal-filter-icon" />
            <select 
              value={statusFilter} 
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="approved">Approved</option>
              <option value="completed">Completed</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>

          <div className="withdrawal-filter-group">
            <select 
              value={itemsPerPage} 
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
            >
              <option value="5">5 per page</option>
              <option value="10">10 per page</option>
              <option value="20">20 per page</option>
              <option value="50">50 per page</option>
            </select>
          </div>
        </div>
      </div>

      {/* <div className="stats-cards">
        <div className="stat-card">
          <div className="stat-icon total">
            <FiDollarSign />
          </div>
          <div className="stat-info">
            <h3>{requests.length}</h3>
            <p>Total Requests</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon pending">
            <FiClock />
          </div>
          <div className="stat-info">
            <h3>{requests.filter(r => r.transactions[0].status === 'pending').length}</h3>
            <p>Pending</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon approved">
            <FiCheck />
          </div>
          <div className="stat-info">
            <h3>{requests.filter(r => r.transactions[0].status === 'approved' || r.transactions[0].status === 'completed').length}</h3>
            <p>Approved</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon rejected">
            <FiX />
          </div>
          <div className="stat-info">
            <h3>{requests.filter(r => r.transactions[0].status === 'rejected').length}</h3>
            <p>Rejected</p>
          </div>
        </div>
      </div> */}
      <div className="withdrawal-stats-cards">
  <div className="stat-card">
    <div className="stat-icon total">
      <FiDollarSign />
    </div>
    <div className="stat-info">
      <h3>{requests.length}</h3>
      <p>Total Requests</p>
    </div>
  </div>

  <div className="stat-card">
    <div className="stat-icon pending">
      <FiClock />
    </div>
    <div className="stat-info">
      <h3>{requests.filter(r => r.transactions[0].status === 'withdrawal-requested').length}</h3>
      <p>Pending</p>
    </div>
  </div>

  <div className="stat-card">
    <div className="stat-icon approved">
      <FiCheck />
    </div>
    <div className="stat-info">
      <h3>{requests.filter(r => r.transactions[0].status === 'withdrawal-approved').length}</h3>
      <p>Approved</p>
    </div>
  </div>

  <div className="stat-card">
    <div className="stat-icon rejected">
      <FiX />
    </div>
    <div className="stat-info">
      <h3>{requests.filter(r => r.transactions[0].status === 'withdrawal-rejected').length}</h3>
      <p>Rejected</p>
    </div>
  </div>
</div>

      <div className="requests-table-container">
        <table className="requests-table">
          <thead>
            <tr>
              <th onClick={() => handleSort('name')}>
                <div className="withdrawal-table-header">
                  User
                  {sortField === 'name' && (
                    sortDirection === 'asc' ? <FiChevronUp /> : <FiChevronDown />
                  )}
                </div>
              </th>
              <th onClick={() => handleSort('amount')}>
                <div className="withdrawal-table-header">
                  Amount
                  {sortField === 'amount' && (
                    sortDirection === 'asc' ? <FiChevronUp /> : <FiChevronDown />
                  )}
                </div>
              </th>
              <th onClick={() => handleSort('balance')}>
                <div className="withdrawal-table-header">
                  Balance
                  {sortField === 'balance' && (
                    sortDirection === 'asc' ? <FiChevronUp /> : <FiChevronDown />
                  )}
                </div>
              </th>
              <th onClick={() => handleSort('status')}>
                <div className="withdrawal-table-header">
                  Status
                  {sortField === 'status' && (
                    sortDirection === 'asc' ? <FiChevronUp /> : <FiChevronDown />
                  )}
                </div>
              </th>
              <th onClick={() => handleSort('date')}>
                <div className="withdrawal-table-header">
                  Request Date
                  {sortField === 'date' && (
                    sortDirection === 'asc' ? <FiChevronUp /> : <FiChevronDown />
                  )}
                </div>
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentRequests.length > 0 ? (
              currentRequests?.map(request => {
                const transaction = request.transactions[0];
                return (
                  <tr key={request._id}>
                    <td>
                      <div className="user-cell">
                        <div className="user-avatar">
                          {request.user.avatar}
                        </div>
                        <div className="user-details">
                          <div className="user-name">{request.user.name}</div>
                          <div className="user-email">{request.user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="amount-cell">
                        {formatCurrency(transaction.amount)}
                      </div>
                    </td>
                    <td>
                      <div className="balance-cell">
                        {formatCurrency(request.balance)}
                      </div>
                    </td>
                    <td>
                      <div className={`status-badge ${getStatusClass(transaction.status)}`}>
                        {getStatusIcon(transaction.status)}
                        {transaction.status}
                      </div>
                    </td>
                    <td>
                      {formatDate(transaction.date)}
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button 
                          className="action-btn view"
                          onClick={() => setSelectedRequest(request)}
                          title="View Details"
                        >
                          <FiEye />
                        </button>
                        {transaction.status === "withdrawal-requested" && (
                          <>
                            <button 
                              className="action-btn approve"
                              onClick={() => updateStatus(request._id, 'withdrawal-approved')}
                              title="Approve"
                            >
                              <FiCheck />
                            </button>
                            <button 
                              className="action-btn reject"
                              onClick={() => updateStatus(request._id, 'withdrawal-rejected')}
                              title="Reject"
                            >
                              <FiX />
                            </button>
                          </>
                        )}
                        {transaction.status === 'withdrawal-approved' && (
                          <button 
                            className="action-btn complete"
                            onClick={() => updateStatus(request._id, 'completed')}
                            title="Mark as Completed"
                          >
                            <FiDollarSign />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="6" className="no-requests">
                  <FiAlertCircle />
                  <p>No withdrawal requests found</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="pagination-controls">
          <div className="pagination-info">
            Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredRequests.length)} of {filteredRequests.length} requests
          </div>
          
          {/* <div className="pagination-buttons">
            <button 
              className="pagination-btn"
              disabled={currentPage === 1}
              onClick={() => paginate(currentPage - 1)}
            >
              <FiArrowLeft />
            </button>
            
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              // Show pages around current page
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }
              
              return (
                <button
                  key={pageNum}
                  className={`pagination-btn ${currentPage === pageNum ? 'active' : ''}`}
                  onClick={() => paginate(pageNum)}
                >
                  {pageNum}
                </button>
              );
            })}
            
            <button 
              className="pagination-btn"
              disabled={currentPage === totalPages}
              onClick={() => paginate(currentPage + 1)}
            >
              <FiArrowRight />
            </button>
          </div> */}

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={filteredRequests.length}
            onPageChange={paginate}
          />

        </div>
      )}

      {selectedRequest && (
        <div className="request-modal">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Withdrawal Request Details</h2>
              <button 
                className="close-btn"
                onClick={() => setSelectedRequest(null)}
              >
                &times;
              </button>
            </div>
            
            <div className="modal-body">
              <div className="detail-section">
                <h3>User Information</h3>
                <div className="detail-row">
                  <div className="detail-label">Name:</div>
                  <div className="detail-value">{selectedRequest.user.name}</div>
                </div>
                <div className="detail-row">
                  <div className="detail-label">Email:</div>
                  <div className="detail-value">
                    <a href={`mailto:${selectedRequest.user.email}`}>{selectedRequest.user.email}</a>
                  </div>
                </div>
                <div className="detail-row">
                  <div className="detail-label">User ID:</div>
                  <div className="detail-value">{selectedRequest.user._id}</div>
                </div>
              </div>
              
              <div className="detail-section">
                <h3>Transaction Details</h3>
                <div className="detail-row">
                  <div className="detail-label">Request ID:</div>
                  <div className="detail-value">{selectedRequest._id}</div>
                </div>
                <div className="detail-row">
                  <div className="detail-label">Amount:</div>
                  <div className="detail-value">{formatCurrency(selectedRequest.transactions[0].amount)}</div>
                </div>
                <div className="detail-row">
                  <div className="detail-label">Current Balance:</div>
                  <div className="detail-value">{formatCurrency(selectedRequest.balance)}</div>
                </div>
                <div className="detail-row">
                  <div className="detail-label">Status:</div>
                  <div className="detail-value">
                    <span className={`status-badge ${getStatusClass(selectedRequest.transactions[0].status)}`}>
                      {getStatusIcon(selectedRequest.transactions[0].status)}
                      {selectedRequest.transactions[0].status}
                    </span>
                  </div>
                </div>
                <div className="detail-row">
                  <div className="detail-label">Request Date:</div>
                  <div className="detail-value">{formatDate(selectedRequest.transactions[0].date)}</div>
                </div>
                <div className="detail-row">
                  <div className="detail-label">Transaction ID:</div>
                  <div className="detail-value">{selectedRequest.transactions[0]._id}</div>
                </div>
              </div>
            </div>
            
            <div className="modal-actions">
              <button className="btn secondary" onClick={() => setSelectedRequest(null)}>
                Close
              </button>
              {selectedRequest.transactions[0].status === 'pending' && (
                <>
                  <button 
                    className="btn reject"
                    onClick={() => {
                      updateStatus(selectedRequest._id, 'rejected');
                      setSelectedRequest(null);
                    }}
                  >
                    Reject
                  </button>
                  <button 
                    className="btn approve"
                    onClick={() => {
                      updateStatus(selectedRequest._id, 'approved');
                      setSelectedRequest(null);
                    }}
                  >
                    Approve
                  </button>
                </>
              )}
              {selectedRequest.transactions[0].status === 'approved' && (
                <button 
                  className="btn complete"
                  onClick={() => {
                    updateStatus(selectedRequest._id, 'completed');
                    setSelectedRequest(null);
                  }}
                >
                  Mark as Completed
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WithdrawalRequests;