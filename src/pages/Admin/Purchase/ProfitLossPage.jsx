import React, { useState, useEffect } from 'react';
import '../../../CssFiles/Admin/Purchase/ProfitLossPage.css';

const ProfitLossPage = () => {
  const [reportData, setReportData] = useState(null);
  const [filters, setFilters] = useState({
    from: '',
    to: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Set default date range (last 30 days)
  useEffect(() => {
    const today = new Date();
    const lastMonth = new Date();
    lastMonth.setMonth(today.getMonth() - 1);
    
    setFilters({
      from: lastMonth.toISOString().split('T')[0],
      to: today.toISOString().split('T')[0]
    });
  }, []);

  const fetchProfitLossReport = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const params = new URLSearchParams();
      if (filters.from) params.append('from', filters.from);
      if (filters.to) params.append('to', filters.to);
      
      const response = await fetch(`${import.meta.env.VITE_API_URL}/report/profitandloss?${params}`);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch profit and loss report');
      }
      
      setReportData(data);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching profit loss report:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (filters.from && filters.to) {
      fetchProfitLossReport();
    }
  }, [filters.from, filters.to]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount || 0);
  };

  const formatPercentage = (value, total) => {
    if (!total || total === 0) return '0.00%';
    const percentage = (value / total) * 100;
    return `${percentage.toFixed(2)}%`;
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleDateRangeChange = (range) => {
    const today = new Date();
    const newDate = new Date();
    
    switch (range) {
      case 'today':
        setFilters({
          from: today.toISOString().split('T')[0],
          to: today.toISOString().split('T')[0]
        });
        break;
      case 'week':
        newDate.setDate(today.getDate() - 7);
        setFilters({
          from: newDate.toISOString().split('T')[0],
          to: today.toISOString().split('T')[0]
        });
        break;
      case 'month':
        newDate.setMonth(today.getMonth() - 1);
        setFilters({
          from: newDate.toISOString().split('T')[0],
          to: today.toISOString().split('T')[0]
        });
        break;
      case 'quarter':
        newDate.setMonth(today.getMonth() - 3);
        setFilters({
          from: newDate.toISOString().split('T')[0],
          to: today.toISOString().split('T')[0]
        });
        break;
      case 'year':
        newDate.setFullYear(today.getFullYear() - 1);
        setFilters({
          from: newDate.toISOString().split('T')[0],
          to: today.toISOString().split('T')[0]
        });
        break;
      default:
        break;
    }
  };

//   const exportToPDF = () => {
//     // Implement PDF export functionality
//     console.log('Export to PDF');
//   };

//   const exportToExcel = () => {
//     // Implement Excel export functionality
//     console.log('Export to Excel');
//   };

  if (isLoading && !reportData) {
    return (
      <div className="ecom-profit-loss-page">
        <div className="ecom-profit-loss-page__loading">
          <div className="ecom-profit-loss-page__loading-spinner"></div>
          <p>Generating profit and loss report...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="ecom-profit-loss-page">
      <div className="ecom-profit-loss-page__container">
        {/* Header */}
        <div className="ecom-profit-loss-page__header">
          <div className="ecom-profit-loss-page__header-content">
            <h1 className="ecom-profit-loss-page__title">Profit & Loss Statement</h1>
            <p className="ecom-profit-loss-page__subtitle">
              Comprehensive financial performance overview
            </p>
          </div>
          {/* <div className="ecom-profit-loss-page__header-actions">
            <button 
              className="ecom-profit-loss-page__export-btn ecom-profit-loss-page__export-btn--excel"
              onClick={exportToExcel}
            >
              <i className="fas fa-file-excel"></i>
              Export Excel
            </button>
            <button 
              className="ecom-profit-loss-page__export-btn ecom-profit-loss-page__export-btn--pdf"
              onClick={exportToPDF}
            >
              <i className="fas fa-file-pdf"></i>
              Export PDF
            </button>
          </div> */}
        </div>

        {/* Filters */}
        <div className="ecom-profit-loss-page__filters">
          <div className="ecom-profit-loss-page__filter-group">
            <label className="ecom-profit-loss-page__filter-label">From Date</label>
            <input
              type="date"
              value={filters.from}
              onChange={(e) => handleFilterChange('from', e.target.value)}
              className="ecom-profit-loss-page__filter-input"
            />
          </div>
          
          <div className="ecom-profit-loss-page__filter-group">
            <label className="ecom-profit-loss-page__filter-label">To Date</label>
            <input
              type="date"
              value={filters.to}
              onChange={(e) => handleFilterChange('to', e.target.value)}
              className="ecom-profit-loss-page__filter-input"
            />
          </div>

          <div className="ecom-profit-loss-page__quick-filters">
            <label className="ecom-profit-loss-page__filter-label">Quick Range</label>
            <div className="ecom-profit-loss-page__quick-filter-buttons">
              <button 
                className="ecom-profit-loss-page__quick-filter-btn"
                onClick={() => handleDateRangeChange('today')}
              >
                Today
              </button>
              <button 
                className="ecom-profit-loss-page__quick-filter-btn"
                onClick={() => handleDateRangeChange('week')}
              >
                Last 7 Days
              </button>
              <button 
                className="ecom-profit-loss-page__quick-filter-btn"
                onClick={() => handleDateRangeChange('month')}
              >
                Last 30 Days
              </button>
              <button 
                className="ecom-profit-loss-page__quick-filter-btn"
                onClick={() => handleDateRangeChange('quarter')}
              >
                Last Quarter
              </button>
              <button 
                className="ecom-profit-loss-page__quick-filter-btn"
                onClick={() => handleDateRangeChange('year')}
              >
                Last Year
              </button>
            </div>
          </div>
        </div>

        {error && (
          <div className="ecom-profit-loss-page__error">
            <div className="ecom-profit-loss-page__error-icon">
              <i className="fas fa-exclamation-triangle"></i>
            </div>
            <div className="ecom-profit-loss-page__error-content">
              <h3 className="ecom-profit-loss-page__error-title">Report Generation Failed</h3>
              <p className="ecom-profit-loss-page__error-text">{error}</p>
            </div>
            <button 
              className="ecom-profit-loss-page__error-retry"
              onClick={fetchProfitLossReport}
            >
              <i className="fas fa-redo"></i>
              Retry
            </button>
          </div>
        )}

        {/* Key Metrics */}
        {reportData && (
          <div className="ecom-profit-loss-page__metrics">
            <div className="ecom-profit-loss-page__metric-card ecom-profit-loss-page__metric-card--revenue">
              <div className="ecom-profit-loss-page__metric-icon">
                <i className="fas fa-chart-line"></i>
              </div>
              <div className="ecom-profit-loss-page__metric-content">
                <span className="ecom-profit-loss-page__metric-label">Total Revenue</span>
                <span className="ecom-profit-loss-page__metric-value">
                  {formatCurrency(reportData.totalSales)}
                </span>
                <span className="ecom-profit-loss-page__metric-change">
                  Net Sales: {formatCurrency(reportData.netSales)}
                </span>
              </div>
            </div>

            <div className="ecom-profit-loss-page__metric-card ecom-profit-loss-page__metric-card--gross">
              <div className="ecom-profit-loss-page__metric-icon">
                <i className="fas fa-hand-holding-usd"></i>
              </div>
              <div className="ecom-profit-loss-page__metric-content">
                <span className="ecom-profit-loss-page__metric-label">Gross Profit</span>
                <span className="ecom-profit-loss-page__metric-value">
                  {formatCurrency(reportData.grossProfit)}
                </span>
                <span className="ecom-profit-loss-page__metric-change">
                  Margin: {formatPercentage(reportData.grossProfit, reportData.netSales)}
                </span>
              </div>
            </div>

            <div className="ecom-profit-loss-page__metric-card ecom-profit-loss-page__metric-card--net">
              <div className="ecom-profit-loss-page__metric-icon">
                <i className="fas fa-piggy-bank"></i>
              </div>
              <div className="ecom-profit-loss-page__metric-content">
                <span className="ecom-profit-loss-page__metric-label">Net Profit</span>
                <span className="ecom-profit-loss-page__metric-value">
                  {formatCurrency(reportData.netProfit)}
                </span>
                <span className="ecom-profit-loss-page__metric-change">
                  Margin: {formatPercentage(reportData.netProfit, reportData.netSales)}
                </span>
              </div>
            </div>

            <div className="ecom-profit-loss-page__metric-card ecom-profit-loss-page__metric-card--cogs">
              <div className="ecom-profit-loss-page__metric-icon">
                <i className="fas fa-boxes"></i>
              </div>
              <div className="ecom-profit-loss-page__metric-content">
                <span className="ecom-profit-loss-page__metric-label">COGS</span>
                <span className="ecom-profit-loss-page__metric-value">
                  {formatCurrency(reportData.cogs)}
                </span>
                <span className="ecom-profit-loss-page__metric-change">
                  {formatPercentage(reportData.cogs, reportData.netSales)} of Revenue
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Profit & Loss Statement */}
        {reportData && (
          <div className="ecom-profit-loss-page__statement">
            <div className="ecom-profit-loss-page__statement-header">
              <h2 className="ecom-profit-loss-page__statement-title">
                Profit & Loss Statement
              </h2>
              <div className="ecom-profit-loss-page__statement-period">
                Period: {new Date(filters.from).toLocaleDateString()} - {new Date(filters.to).toLocaleDateString()}
              </div>
            </div>

            <div className="ecom-profit-loss-page__statement-content">
              {/* Revenue Section */}
              <div className="ecom-profit-loss-page__statement-section">
                <h3 className="ecom-profit-loss-page__section-title">Revenue</h3>
                
                <div className="ecom-profit-loss-page__statement-row">
                  <span className="ecom-profit-loss-page__row-label">Total Sales</span>
                  <span className="ecom-profit-loss-page__row-value">
                    {formatCurrency(reportData.totalSales)}
                  </span>
                </div>
                
                <div className="ecom-profit-loss-page__statement-row ecom-profit-loss-page__statement-row--negative">
                  <span className="ecom-profit-loss-page__row-label">Tax Collected</span>
                  <span className="ecom-profit-loss-page__row-value">
                    {formatCurrency(reportData.totalTaxCollected)}
                  </span>
                </div>
                
                <div className="ecom-profit-loss-page__statement-row ecom-profit-loss-page__statement-row--total">
                  <span className="ecom-profit-loss-page__row-label">Net Sales</span>
                  <span className="ecom-profit-loss-page__row-value">
                    {formatCurrency(reportData.netSales)}
                  </span>
                </div>
              </div>

              {/* Cost of Goods Sold */}
              <div className="ecom-profit-loss-page__statement-section">
                <h3 className="ecom-profit-loss-page__section-title">Cost of Goods Sold</h3>
                
                <div className="ecom-profit-loss-page__statement-row">
                  <span className="ecom-profit-loss-page__row-label">Cost of Goods Sold</span>
                  <span className="ecom-profit-loss-page__row-value">
                    {formatCurrency(reportData.cogs)}
                  </span>
                </div>
                
                <div className="ecom-profit-loss-page__statement-row ecom-profit-loss-page__statement-row--total">
                  <span className="ecom-profit-loss-page__row-label">Gross Profit</span>
                  <span className="ecom-profit-loss-page__row-value ecom-profit-loss-page__row-value--profit">
                    {formatCurrency(reportData.grossProfit)}
                  </span>
                </div>
                
                <div className="ecom-profit-loss-page__statement-row ecom-profit-loss-page__statement-row--note">
                  <span className="ecom-profit-loss-page__row-label">
                    Gross Profit Margin
                  </span>
                  <span className="ecom-profit-loss-page__row-value">
                    {formatPercentage(reportData.grossProfit, reportData.netSales)}
                  </span>
                </div>
              </div>

              {/* Operating Expenses */}
              <div className="ecom-profit-loss-page__statement-section">
                <h3 className="ecom-profit-loss-page__section-title">Operating Expenses</h3>
                
                <div className="ecom-profit-loss-page__statement-row">
                  <span className="ecom-profit-loss-page__row-label">Operating Expenses</span>
                  <span className="ecom-profit-loss-page__row-value">
                    {formatCurrency(reportData.operatingExpenses)}
                  </span>
                </div>
                
                <div className="ecom-profit-loss-page__statement-row ecom-profit-loss-page__statement-row--total">
                  <span className="ecom-profit-loss-page__row-label">Profit Before Tax</span>
                  <span className="ecom-profit-loss-page__row-value ecom-profit-loss-page__row-value--profit">
                    {formatCurrency(reportData.profitBeforeTax)}
                  </span>
                </div>
              </div>

              {/* Taxes */}
              <div className="ecom-profit-loss-page__statement-section">
                <h3 className="ecom-profit-loss-page__section-title">Taxes</h3>
                
                <div className="ecom-profit-loss-page__statement-row ecom-profit-loss-page__statement-row--negative">
                  <span className="ecom-profit-loss-page__row-label">Tax Expense</span>
                  <span className="ecom-profit-loss-page__row-value">
                    {formatCurrency(reportData.taxExpense)}
                  </span>
                </div>
                
                <div className="ecom-profit-loss-page__statement-row ecom-profit-loss-page__statement-row--grand-total">
                  <span className="ecom-profit-loss-page__row-label">Net Profit</span>
                  <span className="ecom-profit-loss-page__row-value ecom-profit-loss-page__row-value--net-profit">
                    {formatCurrency(reportData.netProfit)}
                  </span>
                </div>
                
                <div className="ecom-profit-loss-page__statement-row ecom-profit-loss-page__statement-row--note">
                  <span className="ecom-profit-loss-page__row-label">
                    Net Profit Margin
                  </span>
                  <span className="ecom-profit-loss-page__row-value">
                    {formatPercentage(reportData.netProfit, reportData.netSales)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Financial Ratios */}
        {reportData && (
          <div className="ecom-profit-loss-page__ratios">
            <h3 className="ecom-profit-loss-page__ratios-title">Key Financial Ratios</h3>
            <div className="ecom-profit-loss-page__ratios-grid">
              <div className="ecom-profit-loss-page__ratio-card">
                <div className="ecom-profit-loss-page__ratio-value">
                  {formatPercentage(reportData.grossProfit, reportData.netSales)}
                </div>
                <div className="ecom-profit-loss-page__ratio-label">Gross Margin</div>
                <div className="ecom-profit-loss-page__ratio-description">
                  Percentage of revenue remaining after COGS
                </div>
              </div>
              
              <div className="ecom-profit-loss-page__ratio-card">
                <div className="ecom-profit-loss-page__ratio-value">
                  {formatPercentage(reportData.netProfit, reportData.netSales)}
                </div>
                <div className="ecom-profit-loss-page__ratio-label">Net Profit Margin</div>
                <div className="ecom-profit-loss-page__ratio-description">
                  Percentage of revenue remaining as profit
                </div>
              </div>
              
              <div className="ecom-profit-loss-page__ratio-card">
                <div className="ecom-profit-loss-page__ratio-value">
                  {formatPercentage(reportData.cogs, reportData.netSales)}
                </div>
                <div className="ecom-profit-loss-page__ratio-label">COGS Ratio</div>
                <div className="ecom-profit-loss-page__ratio-description">
                  Cost of goods as percentage of revenue
                </div>
              </div>
              
              <div className="ecom-profit-loss-page__ratio-card">
                <div className="ecom-profit-loss-page__ratio-value">
                  {reportData.netSales > 0 ? (reportData.netProfit / reportData.netSales * 100).toFixed(1) + 'x' : '0x'}
                </div>
                <div className="ecom-profit-loss-page__ratio-label">Return on Sales</div>
                <div className="ecom-profit-loss-page__ratio-description">
                  Profit generated per dollar of sales
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!reportData && !isLoading && !error && (
          <div className="ecom-profit-loss-page__empty">
            <div className="ecom-profit-loss-page__empty-icon">
              <i className="fas fa-chart-bar"></i>
            </div>
            <h3 className="ecom-profit-loss-page__empty-title">No Data Available</h3>
            <p className="ecom-profit-loss-page__empty-text">
              Select a date range to generate your profit and loss report.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfitLossPage;