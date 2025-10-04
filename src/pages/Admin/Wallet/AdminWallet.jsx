import React, { useState, useEffect } from "react";
import "../../../CssFiles/Admin/wallet/AdminWallet.css";
import axios from "axios";
import { toast } from "react-hot-toast";
import Spinner from "../../../components/Spinner";
import Pagination from "../../../components/Pagination";

const AdminWallet = () => {
  const [walletData, setWalletData] = useState({
    balance: 0,
    transactions: []
  });
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("all");
  const [stats, setStats] = useState({
    totalCredit: 0,
    totalDebit: 0,
    transactionCount: 0
  });
  const [totalPages, setTotalPages] = useState(0);
  const [CurrentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

//   useEffect(() => {
//     fetchWalletData();
//   }, []);

//   const fetchWalletData = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.get(
//         `http://localhost:5000/api/user/wallet/adminwallet`,
//         { withCredentials: true }
//       );
//       const data = response.data;
//       setWalletData(data);
      
//       // Calculate stats
//       const credits = data.transactions.filter(t => t.type === 'credit');
//       const debits = data.transactions.filter(t => t.type === 'debit');
      
//       setStats({
//         totalCredit: credits.reduce((sum, t) => sum + t.amount, 0),
//         totalDebit: debits.reduce((sum, t) => sum + t.amount, 0),
//         transactionCount: data.transactions.length
//       });
      
//       setLoading(false);
//     } catch (error) {
//       toast.error("Failed to load wallet data");
//       setLoading(false);
//     }
//   };


useEffect(() => {
  fetchWalletData();
}, [CurrentPage, itemsPerPage, activeFilter]);


const fetchWalletData = async () => {
  try {
    setLoading(true);
    // console.log(`Fetching wallet data for page ${CurrentPage} with limit ${itemsPerPage} ${import.meta.env.VITE_API_URL}`);
    
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/user/wallet/adminwallet?page=${CurrentPage}&limit=${itemsPerPage}`
    );

    const data = response.data;
    console.log(`Wallet data fetched successfully:`, data);
    

    setWalletData(data);
setTotalPages(data?.pagination?.totalPages || 0);

    // Calculate stats from full filtered transaction data
const credits = (data.transactions || []).filter(t => t.type === 'credit');
const debits = (data.transactions || []).filter(t => t.type === 'debit');


    setStats({
      totalCredit: credits.reduce((sum, t) => sum + t.amount, 0),
      totalDebit: debits.reduce((sum, t) => sum + t.amount, 0),
      transactionCount: data?.pagination?.total || 0,

    });

    setLoading(false);
  } catch (error) {
    toast.error("Failed to load wallet data");
    setLoading(false);
    console.error(error);
  }
};

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount); // Convert from paise to rupees
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // const getFilteredTransactions = () => {
  //   if (activeFilter === 'all') return walletData.transactions;
  //   return walletData.transactions.filter(t => t.type === activeFilter);
  // };
  const getFilteredTransactions = () => {
  const transactions = walletData?.transactions;
  if (!Array.isArray(transactions)) return [];
  
  if (activeFilter === 'all') return transactions;
  return transactions.filter(t => t.type === activeFilter);
};


  const getTransactionIcon = (type) => {
    return type === 'credit' ? '📥' : '📤';
  };

  const getTransactionColor = (type) => {
    return type === 'credit' ? '#00b894' : '#ff7675';
  };

  const getTransactionText = (type) => {
    return type === 'credit' ? 'Credit' : 'Debit';
  };

  const handlePageChange = (page) => {
      setCurrentPage(page);
    };

  if (loading) {
    return (
      <div className="admin-wallet-loading">
        <Spinner size="lg" />
        <p>Loading wallet data...</p>
      </div>
    );
  }

//   const filteredTransactions = getFilteredTransactions();
const filteredTransactions = getFilteredTransactions(); // still used for frontend filtering if needed

  return (
    <div className="admin-wallet">
      <div className="wallet-header">
        <h1>💰 Admin Wallet</h1>
        <p>Manage and monitor your wallet transactions</p>
      </div>

      {/* Wallet Overview Cards */}
      <div className="wallet-overview">
        <div className="wallet-card balance-card">
          <div className="card-icon">💳</div>
          <div className="card-content">
            <h3>Current Balance</h3>
            <div className="balance-amount">
              {formatCurrency(walletData.balance)}
            </div>
            <p>Available for withdrawals</p>
          </div>
        </div>

        <div className="wallet-card stats-card">
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #00b894, #00a085)' }}>
                📥
              </div>
              <div className="stat-info">
                <span className="stat-label">Total Credit</span>
                <span className="stat-value" style={{ color: '#00b894' }}>
                  {formatCurrency(stats.totalCredit)}
                </span>
              </div>
            </div>

            <div className="stat-item">
              <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #ff7675, #e17055)' }}>
                📤
              </div>
              <div className="stat-info">
                <span className="stat-label">Total Debit</span>
                <span className="stat-value" style={{ color: '#ff7675' }}>
                  {formatCurrency(stats.totalDebit)}
                </span>
              </div>
            </div>

            <div className="stat-item">
              <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #6c5ce7, #a363d9)' }}>
                📊
              </div>
              <div className="stat-info">
                <span className="stat-label">Transactions</span>
                <span className="stat-value" style={{ color: '#6c5ce7' }}>
                  {stats.transactionCount}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Transaction History */}
      <div className="transaction-section">
        <div className="section-header">
          <h2>Transaction History</h2>
          <div className="filter-tabs">
            <button 
              className={`filter-tab ${activeFilter === 'all' ? 'active' : ''}`}
              onClick={() => setActiveFilter('all')}
            >
              All
            </button>
            <button 
              className={`filter-tab ${activeFilter === 'credit' ? 'active' : ''}`}
              onClick={() => setActiveFilter('credit')}
            >
              Credits
            </button>
            <button 
              className={`filter-tab ${activeFilter === 'debit' ? 'active' : ''}`}
              onClick={() => setActiveFilter('debit')}
            >
              Debits
            </button>
          </div>
        </div>

        <div className="transactions-list">
          {filteredTransactions?.length > 0 ? (
            filteredTransactions?.map((transaction, index) => (
              <div key={index} className="transaction-item">
                <div className="transaction-main">
                  <div className="transaction-icon" style={{ backgroundColor: `${getTransactionColor(transaction.type)}20` }}>
                    <span style={{ color: getTransactionColor(transaction.type) }}>
                      {getTransactionIcon(transaction.type)}
                    </span>
                  </div>
                  <div className="transaction-details">
                    <div className="transaction-type">
                      <span 
                        className="type-badge"
                        style={{ backgroundColor: getTransactionColor(transaction.type) }}
                      >
                        {getTransactionText(transaction.type)}
                      </span>
                    </div>
                    <div className="transaction-date">
                      {formatDate(transaction.timestamp)}
                    </div>
                  </div>
                  <div 
                    className="transaction-amount"
                    style={{ color: getTransactionColor(transaction.type) }}
                  >
                    {transaction.type === 'credit' ? '+' : '-'}
                    {formatCurrency(transaction.amount)}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="no-transactions">
              <div className="empty-state">
                <div className="empty-icon">💸</div>
                <h3>No transactions found</h3>
                <p>
                  {activeFilter === 'all' 
                    ? "You haven't made any transactions yet."
                    : `No ${activeFilter} transactions found.`
                  }
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        {/* <h2>Quick Actions</h2>
        <div className="action-buttons">
          <button className="action-btn primary">
            <span className="btn-icon">💳</span>
            Withdraw Funds
          </button>
          <button className="action-btn secondary">
            <span className="btn-icon">📊</span>
            Generate Report
          </button>
          <button className="action-btn outline" onClick={fetchWalletData}>
            <span className="btn-icon">🔄</span>
            Refresh Data
          </button>
        </div> */}
        {/* {totalPages > 0 && (
  <div className="pagination-controls">
    <button
      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
      disabled={CurrentPage === 1}
    >
      ◀ Prev
    </button>
    
    {Array.from({ length: totalPages }, (_, index) => (
      <button
        key={index + 1}
        className={CurrentPage === index + 1 ? 'active-page' : ''}
        onClick={() => setCurrentPage(index + 1)}
      >
        {index + 1}
      </button>
    ))}
    
    <button
      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
      disabled={CurrentPage === totalPages}
    >
      Next ▶
    </button>
  </div>
            )} */}
        <Pagination
          currentPage={CurrentPage}
          totalPages={totalPages}
          totalItems={filteredTransactions.length}
          onPageChange={handlePageChange}
        />  
      </div>
    </div>
  );
};

export default AdminWallet;