// Wallet.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../CssFiles/User/Wallet.css';
import {getUserId} from '../../utills/authService';
import { getWallet as fetchWallet } from '../../utills/apicall';
import {toast} from 'react-hot-toast';
import Spinner from '../../components/Spinner';
import { useNavigate } from 'react-router-dom';

const Wallet = () => {
  const [walletData, setWalletData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const navigate = useNavigate();
  useEffect(() => {
    const fetchWalletData = async () => {
      try {
        const userId = getUserId(); // Replace with actual user ID
        setLoading(true);
        const response = await fetchWallet(userId);
        // axios.get(`http://localhost:5000/api/user/wallet/${userId}`);
        setWalletData(response.data);
        console.log(response.data);

      } catch (err) {
        toast.error('Error fetching wallet data:', err);
        toast.error('Failed to load wallet data. Please try again later.');

        // Mock data for demonstration
        // setWalletData({
        //   balance: 1250.75,
        //   transactions: [
        //     {
        //       _id: '1',
        //       type: 'credit',
        //       amount: 500,
        //       level: 1,
        //       fromUser: {
        //         _id: 'user2',
        //         name: 'John Doe'
        //       },
        //       date: '2023-11-15T10:30:00Z',
        //       description: 'Level 1 Commission'
        //     },
        //     {
        //       _id: '2',
        //       type: 'credit',
        //       amount: 250.75,
        //       level: 2,
        //       fromUser: {
        //         _id: 'user3',
        //         name: 'Jane Smith'
        //       },
        //       date: '2023-11-10T14:45:00Z',
        //       description: 'Level 2 Commission'
        //     },
        //     {
        //       _id: '3',
        //       type: 'debit',
        //       amount: 300,
        //       level: null,
        //       fromUser: null,
        //       date: '2023-11-05T09:15:00Z',
        //       description: 'Withdrawal'
        //     },
        //     {
        //       _id: '4',
        //       type: 'credit',
        //       amount: 800,
        //       level: 1,
        //       fromUser: {
        //         _id: 'user4',
        //         name: 'Mike Johnson'
        //       },
        //       date: '2023-10-28T16:20:00Z',
        //       description: 'Level 1 Commission'
        //     },
        //     {
        //       _id: '5',
        //       type: 'credit',
        //       amount: 150,
        //       level: 3,
        //       fromUser: {
        //         _id: 'user5',
        //         name: 'Sarah Wilson'
        //       },
        //       date: '2023-10-22T11:30:00Z',
        //       description: 'Level 3 Commission'
        //     }
        //   ]
        // });
      } finally {
        setLoading(false);
      }
    };

    fetchWalletData();
  }, []);

  const filteredTransactions = () => {
    if (!walletData) return [];
    
    let transactions = walletData.transactions;
    
    // Filter by type
    if (activeTab !== 'all') {
      transactions = transactions.filter(tx => tx.type === activeTab);
    }
    
    // Filter by level
    if (selectedLevel !== 'all') {
      transactions = transactions.filter(tx => tx.level === parseInt(selectedLevel));
    }
    
    return transactions.sort((a, b) => new Date(b.date) - new Date(a.date));
  };

  const calculateLevelEarnings = () => {
    if (!walletData) return {};
    
    const levelEarnings = {};
    walletData.transactions
      .filter(tx => tx.type === 'credit' && tx.level)
      .forEach(tx => {
        if (!levelEarnings[tx.level]) {
          levelEarnings[tx.level] = 0;
        }
        levelEarnings[tx.level] += tx.amount;
      });
    
    return levelEarnings;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
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

  const handleWithdraw = () => {
    navigate('/user/withdraw');
  };

  if (loading) {
    return <Spinner size="lg" />;
    // return (
    //   <div className="wallet-container">
    //     <div className="loading-spinner">
    //       <div className="spinner"></div>
    //       <p>Loading wallet data...</p>
    //     </div>
    //   </div>
    // );
  }

  if (error && !walletData) {
    return (
      <div className="wallet-container">
        <div className="error-message">
          <span className="error-icon">⚠️</span>
          <h3>{error}</h3>
          <button onClick={() => window.location.reload()} className="retry-btn">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const levelEarnings = calculateLevelEarnings();
  const transactions = filteredTransactions();

  return (
    <div className="wallet-container">
      <div className="wallet-header">
        <h1>My Wallet</h1>
        <p>Manage your earnings and transactions</p>
      </div>

      <div className="wallet-content">
        <div className="wallet-overview">
          <div className="balance-card">
            <div className="balance-info">
              <h3>Total Balance</h3>
              <div className="balance-amount">
                {formatCurrency(walletData.balance)}
              </div>
              <p>Available for withdrawal</p>
            </div>
            <div className="balance-actions">
              <button className="withdraw-btn" onClick={handleWithdraw}>
                Withdraw Funds
              </button>
            </div>
            <div className="balance-graph">
              <div className="graph-bar">
                <div 
                  className="graph-fill"
                  style={{ width: `${Math.min((walletData.balance / 2000) * 100, 100)}%` }}
                ></div>
              </div>
              <div className="graph-labels">
                <span>$0</span>
                <span>$2,000</span>
              </div>
            </div>
          </div>

          <div className="earnings-card">
            <h3>Earnings by Level</h3>
            <div className="levels-grid">
              {[1, 2, 3, 4, 5].map(level => (
                <div key={level} className="level-item">
                  <div className="level-header">
                    <span className="level-badge">Level {level}</span>
                    <span className="level-amount">
                      {formatCurrency(levelEarnings[level] || 0)}
                    </span>
                  </div>
                  <div className="level-progress">
                    <div 
                      className="progress-bar"
                      style={{ 
                        width: `${levelEarnings[level] ? (levelEarnings[level] / Math.max(...Object.values(levelEarnings).filter(val => val > 0)) * 100) : 0}%` 
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="transactions-section">
          <div className="section-header">
            <h2>Transaction History</h2>
            <div className="filter-controls">
              <div className="filter-group">
                <label>Type:</label>
                <select 
                  value={activeTab} 
                  onChange={(e) => setActiveTab(e.target.value)}
                  className="filter-select"
                >
                  <option value="all">All Transactions</option>
                  <option value="credit">Earnings</option>
                  <option value="debit">Withdrawals</option>
                </select>
              </div>
              <div className="filter-group">
                <label>Level:</label>
                <select 
                  value={selectedLevel} 
                  onChange={(e) => setSelectedLevel(e.target.value)}
                  className="filter-select"
                >
                  <option value="all">All Levels</option>
                  <option value="1">Level 1</option>
                  <option value="2">Level 2</option>
                  <option value="3">Level 3</option>
                  <option value="4">Level 4</option>
                  <option value="5">Level 5</option>
                </select>
              </div>
            </div>
          </div>

          <div className="transactions-list">
            {transactions.length === 0 ? (
              <div className="empty-transactions">
                <div className="empty-icon">💸</div>
                <h3>No transactions found</h3>
                <p>No transactions match your current filters</p>
              </div>
            ) : (
              transactions.map(transaction => (
                <div key={transaction._id} className="transaction-item">
                  <div className="transaction-icon">
                    {transaction.type === 'credit' ? '⬇️' : '⬆️'}
                  </div>
                  <div className="transaction-details">
                    <h4 className="transaction-title">
                      {transaction.description}
                      {transaction.level && (
                        <span className="level-tag">Level {transaction.level}</span>
                      )}
                    </h4>
                    <p className="transaction-info">
                      {transaction.fromUser ? `From: ${transaction.fromUser.name}` : 'Withdrawal processing'}
                    </p>
                    <p className="transaction-date">
                      {formatDate(transaction.date)}
                    </p>
                  </div>
                  <div className={`transaction-amount ${transaction.type}`}>
                    {transaction.type === 'credit' ? '+' : '-'}
                    {formatCurrency(transaction.amount)}
                  </div>
                </div>
              ))
            )}
          </div>

          {transactions.length > 0 && (
            <div className="transactions-summary">
              <div className="summary-item">
                <span>Total Credits:</span>
                <span className="credit-amount">
                  {formatCurrency(transactions
                    .filter(tx => tx.type === 'credit')
                    .reduce((sum, tx) => sum + tx.amount, 0)
                  )}
                </span>
              </div>
              <div className="summary-item">
                <span>Total Debits:</span>
                <span className="debit-amount">
                  {formatCurrency(transactions
                    .filter(tx => tx.type === 'debit')
                    .reduce((sum, tx) => sum + tx.amount, 0)
                  )}
                </span>
              </div>
              <div className="summary-item net">
                <span>Net Amount:</span>
                <span className={`net-amount ${
                  transactions.reduce((sum, tx) => 
                    tx.type === 'credit' ? sum + tx.amount : sum - tx.amount, 0
                  ) >= 0 ? 'positive' : 'negative'
                }`}>
                  {formatCurrency(transactions.reduce((sum, tx) => 
                    tx.type === 'credit' ? sum + tx.amount : sum - tx.amount, 0
                  ))}
                </span>
              </div>
            </div>
          )}
        </div>

        <div className="wallet-stats">
          <div className="stat-card">
            <h3>Performance Overview</h3>
            <div className="stats-grid">
              <div className="stat-item">
                <div className="stat-icon">💰</div>
                <div className="stat-info">
                  <span className="stat-value">
                    {formatCurrency(walletData.balance)}
                  </span>
                  <span className="stat-label">Current Balance</span>
                </div>
              </div>
              <div className="stat-item">
                <div className="stat-icon">📈</div>
                <div className="stat-info">
                  <span className="stat-value">
                    {formatCurrency(Object.values(levelEarnings).reduce((sum, amount) => sum + amount, 0))}
                  </span>
                  <span className="stat-label">Total Earned</span>
                </div>
              </div>
              <div className="stat-item">
                <div className="stat-icon">👥</div>
                <div className="stat-info">
                  <span className="stat-value">
                    {new Set(walletData.transactions
                      .filter(tx => tx.fromUser)
                      .map(tx => tx.fromUser._id)
                    ).size}
                  </span>
                  <span className="stat-label">Active Referrals</span>
                </div>
              </div>
              <div className="stat-item">
                <div className="stat-icon">🏆</div>
                <div className="stat-info">
                  <span className="stat-value">
                    {Math.max(...Object.keys(levelEarnings).map(Number), 0)}
                  </span>
                  <span className="stat-label">Highest Level</span>
                </div>
              </div>
            </div>
          </div>

          <div className="info-card">
            <h3>How It Works</h3>
            <div className="info-content">
              <div className="info-item">
                <span className="info-number">1</span>
                <div className="info-text">
                  <h4>Earn Commissions</h4>
                  <p>Get paid for referrals at multiple levels</p>
                </div>
              </div>
              <div className="info-item">
                <span className="info-number">2</span>
                <div className="info-text">
                  <h4>Track Earnings</h4>
                  <p>Monitor your performance across all levels</p>
                </div>
              </div>
              <div className="info-item">
                <span className="info-number">3</span>
                <div className="info-text">
                  <h4>Withdraw Funds</h4>
                  <p>Transfer your earnings to your bank account</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wallet;