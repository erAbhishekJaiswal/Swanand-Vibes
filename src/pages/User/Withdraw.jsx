// WithdrawalPage.js
import React, { useState, useEffect } from 'react';
// import { FiDollarSign, FiWallet, FiAlertCircle, FiCheck, FiX, FiInfo, FiArrowLeft } from 'react-icons/fi';
import '../../CssFiles/User/Withdraw.css';
import axios from 'axios';

const Withdraw = () => {
  const [amount, setAmount] = useState('');
  const [wallet, setWallet] = useState(null);
  const [kycStatus, setKycStatus] = useState('approved'); // Change to 'pending' or 'rejected' for testing
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [withdrawalHistory, setWithdrawalHistory] = useState([]);
  const userId = localStorage.getItem('userId'); // Get user ID from storage

  // Fetch wallet data and KYC status
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Fetch wallet data  http://localhost:5000/api/user/wallet/68b5650b7505b81ebfa4a48e/withdraw-request
        const walletResponse = await axios.get(`https://swanand-vibes-backend.vercel.app/api/user/wallet/${userId}`);
        console.log(walletResponse);
        if (walletResponse.status === 200) {
          // const walletData = await walletResponse.json();
          setWallet(walletResponse.data);
          
          
          
          // Filter withdrawal transactions
          if (walletResponse.data.transactions) {
            const withdrawals = walletResponse.data.transactions.filter(
              transaction => transaction.type === 'debit' && transaction.status.includes('withdrawal')
            );
            setWithdrawalHistory(withdrawals);
          }
        }

        // Fetch KYC status
        const kycResponse = await fetch(`https://swanand-vibes-backend.vercel.app/api/user/kyc/user/${userId}`);
        if (kycResponse.ok) {
          const kycData = await kycResponse.json();
          console.log(kycData);
          
          setKycStatus(kycData.status || 'not-submitted');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        setMessage({ type: 'error', text: 'Failed to load wallet information' });
      }
    };

    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  const handleWithdrawal = async (e) => {
    e.preventDefault();
    
    if (!amount || amount <= 0) {
      setMessage({ type: 'error', text: 'Please enter a valid amount' });
      return;
    }

    if (wallet && wallet.balance < amount) {
      setMessage({ type: 'error', text: 'Insufficient balance' });
      return;
    }

    if (kycStatus !== 'approved') {
      setMessage({ type: 'error', text: 'KYC verification required' });
      return;
    }

    setIsSubmitting(true);
    setMessage({ type: '', text: '' });

    try {
      const response = await fetch(`https://swanand-vibes-backend.vercel.app/api/user/wallet/${userId}/withdraw-request`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: parseFloat(amount) }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: 'success', text: data.message || 'Withdrawal request submitted successfully' });
        setAmount('');
        
        // Update wallet balance
        setWallet(prev => ({
          ...prev,
          balance: prev.balance - parseFloat(amount),
          transactions: [...prev.transactions, {
            type: 'debit',
            amount: parseFloat(amount),
            status: 'withdrawal-requested',
            date: new Date().toISOString()
          }]
        }));

        // Add to withdrawal history
        setWithdrawalHistory(prev => [...prev, {
          type: 'debit',
          amount: parseFloat(amount),
          status: 'withdrawal-requested',
          date: new Date().toISOString()
        }]);
      } else {
        setMessage({ type: 'error', text: data.message || 'Withdrawal request failed' });
      }
    } catch (error) {
      console.error('Withdrawal error:', error);
      setMessage({ type: 'error', text: 'Network error. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'withdrawal-requested':
        return <span className="status-badge pending">Pending</span>;
      case 'withdrawal-approved':
        return <span className="status-badge approved">Approved</span>;
      case 'withdrawal-rejected':
        return <span className="status-badge rejected">Rejected</span>;
      case 'withdrawal-completed':
        return <span className="status-badge completed">Completed</span>;
      default:
        return <span className="status-badge">{status}</span>;
    }
  };

  // Predefined withdrawal amounts
  const quickAmounts = [50, 100, 200, 500, 1000];

  return (
    <div className="withdrawal-container">
      <div className="withdrawal-header">
        <h1>
            {/* <FiWallet />  */}
            Withdraw Funds</h1>
        <p>Transfer your earnings to your bank account</p>
      </div>

      <div className="withdrawal-content">
        <div className="withdrawal-main">
          <div className="balance-card">
            <div className="balance-info">
              <div className="balance-icon">
                {/* <FiDollarSign /> */}
              </div>
              <div className="balance-details">
                <h3>Available Balance</h3>
                <p className="balance-amount">
                  {wallet ? formatCurrency(wallet.balance) : 'Loading...'}
                </p>
              </div>
            </div>
          </div>

          {kycStatus !== 'approved' && (
            <div className="kyc-alert">
              {/* <FiAlertCircle /> */}
              <div className="alert-content">
                <h4>KYC Verification Required</h4>
                <p>
                  {kycStatus === 'pending' 
                    ? 'Your KYC verification is under review. You can still request withdrawals, but they will be processed after approval.'
                    : 'Please complete your KYC verification to withdraw funds.'
                  }
                </p>
                {kycStatus !== 'pending' && (
                  <button className="kyc-button">Complete KYC</button>
                )}
              </div>
            </div>
          )}

          <div className="withdrawal-form-card">
            <h3>Request Withdrawal</h3>
            
            {message.text && (
              <div className={`message ${message.type}`}>
                {message.type === 'success' ? "S": "F"
                // <FiCheck /> 
                // <FiX />
                }
                <span>{message.text}</span>
              </div>
            )}

            <form onSubmit={handleWithdrawal}>
              <div className="form-group">
                <label htmlFor="amount">Withdrawal Amount</label>
                <div className="amount-input-container">
                  <span className="currency-symbol">$</span>
                  <input
                    type="number"
                    id="amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.00"
                    min="1"
                    step="0.01"
                    disabled={isSubmitting}
                  />
                </div>
                <div className="quick-amounts">
                  {quickAmounts.map(quickAmount => (
                    <button
                      key={quickAmount}
                      type="button"
                      className="quick-amount-btn"
                      onClick={() => setAmount(quickAmount.toString())}
                      disabled={isSubmitting || (wallet && wallet.balance < quickAmount)}
                    >
                      ${quickAmount}
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-info">
                {/* <FiInfo /> */}
                <p>Minimum withdrawal amount: $10. Processing may take 3-5 business days.</p>
              </div>

              <button
                type="submit"
                className="withdraw-button"
                disabled={isSubmitting || !amount || (wallet && wallet.balance < amount)}
              >
                {isSubmitting ? 'Processing...' : 'Request Withdrawal'}
              </button>
            </form>
          </div>

          {withdrawalHistory.length > 0 && (
            <div className="withdrawal-history">
              <h3>Withdrawal History</h3>
              <div className="history-list">
                {withdrawalHistory.map((transaction, index) => (
                  <div key={index} className="history-item">
                    <div className="transaction-info">
                      <div className="transaction-amount">
                        {formatCurrency(transaction.amount)}
                      </div>
                      <div className="transaction-date">
                        {formatDate(transaction.date)}
                      </div>
                    </div>
                    <div className="transaction-status">
                      {getStatusBadge(transaction.status)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="withdrawal-sidebar">
          <div className="info-card">
            <h4>Withdrawal Information</h4>
            <ul>
              <li>
                <strong>Processing Time:</strong> 3-5 business days
              </li>
              <li>
                <strong>Minimum Amount:</strong> $10
              </li>
              <li>
                <strong>Transaction Fee:</strong> 1% (min $2)
              </li>
              <li>
                <strong>Daily Limit:</strong> $5,000
              </li>
            </ul>
          </div>

          <div className="help-card">
            <h4>Need Help?</h4>
            <p>If you have any questions about withdrawals, contact our support team.</p>
            <button className="support-button">Contact Support</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Withdraw;