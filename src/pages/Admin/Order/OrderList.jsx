// import React, { useState, useEffect } from 'react';
// import { FiSearch, FiFilter, FiEye, FiChevronLeft, FiChevronRight, FiChevronDown, FiChevronUp, FiDollarSign, FiPackage, FiClock, FiCheck, FiX, FiCalendar, FiUser, FiTruck, FiCreditCard, FiShoppingCart, FiRefreshCw } from 'react-icons/fi';
// import { GrView } from "react-icons/gr";
// import { MdDeleteOutline } from "react-icons/md";
// import '../../../CssFiles/Admin/order/OrderList.css';
// import Spinner from '../../../components/Spinner';
// import { toast } from 'react-hot-toast';
// import axios from 'axios';
// import Pagination from '../../../components/Pagination';
// import { FcShipped } from "react-icons/fc";
// import { Link } from 'react-router-dom';
// const OrderList = () => {
//   const [orders, setOrders] = useState([]);
//   const [filteredOrders, setFilteredOrders] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [statusFilter, setStatusFilter] = useState('all');
//   const [startDate, setStartDate] = useState('');
//   const [endDate, setEndDate] = useState('');
//   const [sortField, setSortField] = useState('createdAt');
//   const [sortDirection, setSortDirection] = useState('desc');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage, setItemsPerPage] = useState(10);
//   const [totalOrders, setTotalOrders] = useState(0);
//   const [totalPages, setTotalPages] = useState(0);
//   const [selectedOrder, setSelectedOrder] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [updatedStatus, setUpdatedStatus] = useState('');
//   const [isFilterOpen, setIsFilterOpen] = useState(false);
//   const [totalPendingOrders, setTotalPendingOrders] = useState(0);
//   const [totalDeliveredOrders, setTotalDeliveredOrders] = useState(0);
//   const [totalshippedOrders, setTotalShippedOrders] = useState(0);
  

//   // Fetch orders from API
//   const fetchOrders = async (page = 1, limit = 10, search = "", status = "all", start = "", end = "") => {
//     try {
//       setIsLoading(true);
      
//       // Build query parameters
//       const params = new URLSearchParams({
//         page: page.toString(),
//         limit: limit.toString(),
//         ...(search && { search}),
//         ...(status !== 'all' && { status }),
//         ...(start && { startDate: start }),
//         ...(end && { endDate: end })
//       });

//       // // console.log({
//       //   page: page.toString(),
//       //   limit: limit.toString(),
//       //   ...(search && { search }),
//       //   ...(status !== 'all' && { status }),
//       //   ...(start && { startDate: start }),
//       //   ...(end && { endDate: end })
//       // });
      
//       // Replace with actual API call
//       const response = await fetch(`${import.meta.env.VITE_API_URL}/order?${params}`);
//       const data = await response.json();
//       console.log(data.data);
      
//       if (data.success) {
//         setOrders(data.data);
//         setFilteredOrders(data.data);
//         setTotalOrders(data.totalOrders);
//         setTotalPages(data.totalPages);
//         setCurrentPage(data.page);
//         setTotalPendingOrders(data.totalPendingOrders);
//         setTotalDeliveredOrders(data.totalDeliveredOrders);
//         setTotalShippedOrders(data.totalshippedOrders);
//       } else {
//         console.error('Error fetching orders:', data.error);
//         toast.error('Failed to fetch orders');
//       }
//     } catch (error) {
//       console.error('Error fetching orders:', error);
//       toast.error('Failed to fetch orders');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Initial data load
//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   // Apply filters and search
//   useEffect(() => {
//     const applyFilters = () => {
//       let result = [...orders];
      
//       // Apply status filter
//       if (statusFilter !== 'all') {
//         result = result.filter(order => order.deliveryStatus === statusFilter);
//       }
      
//       // Apply search filter
//       if (searchTerm) {
//         const term = searchTerm.toLowerCase();
//         result = result.filter(order => 
//           order._id.toLowerCase().includes(term) ||
//           (order.user?.name?.toLowerCase().includes(term) || '') ||
//           (order.user?.email?.toLowerCase().includes(term) || '') ||
//           (order.shippingAddress?.email?.toLowerCase().includes(term) || '') ||
//           (order.shippingAddress?.mobile?.toLowerCase().includes(term) || '')
//         );
//       }
      
//       // Apply sorting
//       result.sort((a, b) => {
//         let aValue, bValue;
        
//         if (sortField === 'createdAt' || sortField === 'paidAt' || sortField === 'deliveredAt') {
//           aValue = new Date(a[sortField] || 0);
//           bValue = new Date(b[sortField] || 0);
//         } else if (sortField === 'totalPrice') {
//           aValue = a.totalPrice;
//           bValue = b.totalPrice;
//         } else if (sortField === 'user') {
//           aValue = a.user?.name || '';
//           bValue = b.user?.name || '';
//         } else {
//           aValue = a[sortField];
//           bValue = b[sortField];
//         }
        
//         if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
//         if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
//         return 0;
//       });
      
//       setFilteredOrders(result);
//     };

//     applyFilters();
//   }, [searchTerm, statusFilter, sortField, sortDirection, orders]);

//   // Handle date filter application
//   const applyDateFilter = () => {
//     fetchOrders(1, itemsPerPage, searchTerm, statusFilter, startDate, endDate);
//   };

//   // Clear all filters
//   const clearAllFilters = () => {
//     setSearchTerm('');
//     setStatusFilter('all');
//     setStartDate('');
//     setEndDate('');
//     fetchOrders(1, itemsPerPage, '', 'all', '', '');
//   };

//   const handleSort = (field) => {
//     if (sortField === field) {
//       setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
//     } else {
//       setSortField(field);
//       setSortDirection('asc');
//     }
//   };

//   const formatDate = (dateString) => {
//     if (!dateString) return 'N/A';
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit'
//     });
//   };

//   const formatCurrency = (amount) => {
//     return new Intl.NumberFormat('en-IN', {
//       style: 'currency',
//       currency: 'INR',
//       minimumFractionDigits: 0,
//       maximumFractionDigits: 0
//     }).format(amount);
//   };

//   const getStatusClass = (status) => {
//     switch (status) {
//       case 'pending': return 'status-pending';
//       case 'processing': return 'status-processing';
//       case 'shipped': return 'status-shipped';
//       case 'delivered': return 'status-delivered';
//       case 'cancelled': return 'status-cancelled';
//       default: return '';
//     }
//   };

//   const getStatusIcon = (status) => {
//     switch (status) {
//       case 'pending': return <FiClock />;
//       case 'processing': return <FiPackage />;
//       case 'shipped': return <FiTruck />;
//       case 'delivered': return <FiCheck />;
//       case 'cancelled': return <FiX />;
//       default: return <FiClock />;
//     }
//   };

//   const handleUpdateStatus = async (orderId, newStatus) => {
//     try {
//       await axios.put(`${import.meta.env.VITE_API_URL}/order/${orderId}`, { 
//         deliveryStatus: newStatus 
//       });
//       fetchOrders(currentPage, itemsPerPage, searchTerm, statusFilter, startDate, endDate);
//       setSelectedOrder(null);
//       toast.success('Order status updated successfully');
//     } catch (error) {
//       console.error('Error updating order status:', error);
//       toast.error('Failed to update order status');
//     }
//   };

//   const refreshOrders = () => {
//     fetchOrders(currentPage, itemsPerPage, searchTerm, statusFilter, startDate, endDate);
//     toast.success('Orders refreshed');
//   };

//    const handleDownload = async (order) => {
//     console.log(order._id);
    
//     try {
//       const response = await fetch(`${import.meta.env.VITE_API_URL}/order/shipping-label/${order._id}`, {
//         method: 'GET',
//       });

//       if (!response.ok) {
//         throw new Error('Failed to fetch the shipping label PDF');
//       }

//       const blob = await response.blob();
//       const url = window.URL.createObjectURL(blob);

//       // Create a temporary <a> element to trigger download
//       const a = document.createElement('a');
//       a.href = url;
//       a.download = `shipping-label-${order._id}.pdf`;
//       document.body.appendChild(a);
//       a.click();
//       a.remove();

//       // Clean up
//       window.URL.revokeObjectURL(url);
//     } catch (error) {
//       console.error('Error downloading shipping label:', error);
//       // alert('Could not download the shipping label. Please try again.');
//     }
//   };


//   if (isLoading) {
//     return (
//       <div className="loading-container">
//         <Spinner size='lg' />
//         <p>Loading orders...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="admin-order-container">
//       <div className="admin-header">
//         <div className="header-content">
//           <h1>📦 Order Management</h1>
//           <p>Manage {totalOrders} customer orders efficiently</p>
//         </div>
//         <button className="refresh-btn" onClick={refreshOrders}>
//           <FiRefreshCw /> Refresh
//         </button>
//       </div>

//       {/* Stats Cards */}
//       <div className="stats-cards">
//         <div className="stat-card total">
//           <div className="stat-icon">
//             <FiShoppingCart />
//           </div>
//           <div className="stat-info">
//             <h3>{totalOrders}</h3>
//             <p>Total Orders</p>
//           </div>
//         </div>

//         <div className="stat-card pending">
//           <div className="stat-icon">
//             <FiClock />
//           </div>
//           <div className="stat-info">
//             <h3>{totalPendingOrders}
//               {/* {orders.filter(o => o.deliveryStatus === 'pending').length} */}
//               </h3>
//             <p>Pending</p>
//           </div>
//         </div>

//         <div className="stat-card processing">
//           <div className="stat-icon">
//             <FiPackage />
//           </div>
//           <div className="stat-info">
//             <h3>{totalshippedOrders}
//               {/* {orders.filter(o => o.deliveryStatus === 'shipped').length} */}
//               </h3>
//             <p>Shipped</p>
//           </div>
//         </div>

//         <div className="stat-card delivered">
//           <div className="stat-icon">
//             <FiCheck />
//           </div>
//           <div className="stat-info">
//             <h3>{totalDeliveredOrders}
//               {/* {orders.filter(o => o.deliveryStatus === 'delivered').length} */}
//               </h3>
//             <p>Delivered</p>
//           </div>
//         </div>
//       </div>

//       {/* Controls Section */}
//       <div className="controls-section">
//         <div className="search-controls">
//           <div className="search-box">
//             {/* <FiSearch className="search-icon" /> */}
//             <input
//               type="text"
//               placeholder="Search orders..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//             <button className="search-btn" onClick={() => applyDateFilter()}>
//               <FiSearch />
//             </button>
//           </div>

//            {/* add the order dashboard button */}
//           <Link  to="/admin/ordersdashboard">
//             <button className="order-dashboard-link">
//              Order Dashboard
//             </button>
//           </Link>

//           <button 
//             className="filter-toggle-btn"
//             onClick={() => setIsFilterOpen(!isFilterOpen)}
//           >
//             <FiFilter /> Filters
//           </button>
//         </div>

//         {isFilterOpen && (
//           <div className="advanced-filters">
//             <div className="filter-group">
//               <label>Status</label>
//               <select 
//                 value={statusFilter} 
//                 onChange={(e) => setStatusFilter(e.target.value)}
//               >
//                 <option value="all">All Status</option>
//                 <option value="pending">Pending</option>
//                 {/* <option value="processing">Processing</option> */}
//                 <option value="shipped">Shipped</option>
//                 <option value="delivered">Delivered</option>
//                 {/* <option value="cancelled">Cancelled</option> */}
//               </select>
//             </div>

//             <div className="filter-group">
//               <label>Date Range</label>
//               <div className="date-inputs">
//                 <input
//                   type="date"
//                   value={startDate}
//                   onChange={(e) => setStartDate(e.target.value)}
//                   placeholder="Start Date"
//                 />
//                 <span>to</span>
//                 <input
//                   type="date"
//                   value={endDate}
//                   onChange={(e) => setEndDate(e.target.value)}
//                   placeholder="End Date"
//                 />
//               </div>
//             </div>

//             <div className="filter-group">
//               <label>Items per page</label>
//               <select 
//                 value={itemsPerPage} 
//                 onChange={(e) => {
//                   const newLimit = Number(e.target.value);
//                   setItemsPerPage(newLimit);
//                   fetchOrders(1, newLimit, searchTerm, statusFilter, startDate, endDate);
//                 }}
//               >
//                 <option value="5">5 per page</option>
//                 <option value="10">10 per page</option>
//                 <option value="20">20 per page</option>
//                 <option value="50">50 per page</option>
//               </select>
//             </div>

//             <div className="filter-actions">
//               <button onClick={applyDateFilter} className="apply-btn">
//                 Apply Filters
//               </button>
//               <button onClick={clearAllFilters} className="clear-btn">
//                 Clear All
//               </button>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Orders Table */}
//       <div className="table-container">
//         <div className="table-header">
//           <h3>Order List</h3>
//           <span className="results-count">
//             Showing {filteredOrders.length} of {totalOrders} orders
//           </span>
//         </div>
        
//         <div className="orders-table-wrapper">
//           <table className="orders-table">
//             <thead>
//               <tr>
//                 <th onClick={() => handleSort('user')}>
//                   <div className="table-header-cell">
//                     <FiUser /> Customer
//                     {sortField === 'user' && (
//                       sortDirection === 'asc' ? <FiChevronUp /> : <FiChevronDown />
//                     )}
//                   </div>
//                 </th>
//                 <th onClick={() => handleSort('totalPrice')}>
//                   <div className="table-header-cell">
//                     <FiDollarSign /> Amount
//                     {sortField === 'totalPrice' && (
//                       sortDirection === 'asc' ? <FiChevronUp /> : <FiChevronDown />
//                     )}
//                   </div>
//                 </th>
//                 <th onClick={() => handleSort('paymentMethod')}>
//                   <div className="table-header-cell">
//                     <FiCreditCard /> Payment
//                     {sortField === 'paymentMethod' && (
//                       sortDirection === 'asc' ? <FiChevronUp /> : <FiChevronDown />
//                     )}
//                   </div>
//                 </th>
//                 <th onClick={() => handleSort('deliveryStatus')}>
//                   <div className="table-header-cell">
//                     <FiTruck /> Status
//                     {sortField === 'deliveryStatus' && (
//                       sortDirection === 'asc' ? <FiChevronUp /> : <FiChevronDown />
//                     )}
//                   </div>
//                 </th>
//                 <th onClick={() => handleSort('createdAt')}>
//                   <div className="table-header-cell">
//                     <FiCalendar /> Date
//                     {sortField === 'createdAt' && (
//                       sortDirection === 'asc' ? <FiChevronUp /> : <FiChevronDown />
//                     )}
//                   </div>
//                 </th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredOrders.length > 0 ? (
//                 filteredOrders.map(order => (
//                   <tr key={order._id} className="order-row">
//                     <td>
//                       <div className="customer-info">
//                         <div className="customer-name">{order.user?.name || 'Guest Customer'}</div>
//                         <div className="customer-contact">
//                           {order.user?.email || order.shippingAddress?.email || 'No email'}
//                           {order.shippingAddress?.mobile && ` • ${order.shippingAddress.mobile}`}
//                         </div>
//                       </div>
//                     </td>
//                     <td>
//                       <div className="amount-cell">
//                         <span className="amount">{formatCurrency(order.totalPrice)}</span>
//                       </div>
//                     </td>
//                     <td>
//                       <div className="payment-info">
//                         <span className="payment-method">
//                           {order.paymentMethod?.replace('_', ' ').toUpperCase()}
//                         </span>
//                         {order.isPaid && (
//                           <span className="payment-status paid">Paid</span>
//                         )}
//                       </div>
//                     </td>
//                     <td>
//                       <div className={`status-badge ${getStatusClass(order.deliveryStatus)}`}>
//                         {getStatusIcon(order.deliveryStatus)}
//                         <span>{order.deliveryStatus}</span>
//                       </div>
//                     </td>
//                     <td>
//                       <div className="date-cell">
//                         {formatDate(order.createdAt)}
//                       </div>
//                     </td>
//                     <td>
//                       <div className="action-buttons-containers">
//                       <div className="action-buttons">
//                         <button 
//                           className="action-btn view-btn"
//                           onClick={() => setSelectedOrder(order)}
//                           title="View Details"
//                         >
//                           <GrView />
//                         </button>
//                       </div>
//                        <div className="action-buttons">
//                             <button onClick={() => handleDownload(order)} >
//                               <FcShipped />
//                             </button>
//                       </div>
//                       </div>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="6" className="no-orders">
//                     <div className="empty-state">
//                       <FiPackage size={48} />
//                       <h3>No orders found</h3>
//                       <p>Try adjusting your search or filters</p>
//                     </div>
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* Pagination */}
//       <Pagination
//   currentPage={currentPage}
//   totalPages={totalPages}
//   totalItems={totalOrders}
//   onPageChange={(pageNum) =>
//     fetchOrders(pageNum, itemsPerPage, searchTerm, statusFilter, startDate, endDate)
//   }
// />


//       {/* Order Detail Modal */}
//       {selectedOrder && (
//         <div className="modal-overlay">
//           <div className="order-modal">
//             <div className="modal-header">
//               <h2>Order Details</h2>
//               <button 
//                 className="close-btn"
//                 onClick={() => setSelectedOrder(null)}
//               >
//                 &times;
//               </button>
//             </div>
            
//             <div className="modal-content">
//               <div className="modal-section">
//                 <h3>📋 Order Information</h3>
//                 <div className="info-grid">
//                   <div className="info-item">
//                     <span className="label">Order ID:</span>
//                     <span className="value">{selectedOrder._id}</span>
//                   </div>
//                   <div className="info-item">
//                     <span className="label">Order Date:</span>
//                     <span className="value">{formatDate(selectedOrder.createdAt)}</span>
//                   </div>
//                   <div className="info-item">
//                     <span className="label">Status:</span>
//                     <div className="status-control">
//                       <select 
//                         value={updatedStatus || selectedOrder.deliveryStatus}
//                         onChange={(e) => setUpdatedStatus(e.target.value)}
//                         className="status-select"
//                       >
//                         <option value="pending">Pending</option>
//                         {/* <option value="processing">Processing</option> */}
//                         <option value="shipped">Shipped</option>
//                         <option value="delivered">Delivered</option>
//                         <option value="cancelled">Cancelled</option>
//                       </select>
//                       <span className={`status-badge ${getStatusClass(selectedOrder.deliveryStatus)}`}>
//                         {getStatusIcon(selectedOrder.deliveryStatus)}
//                         {selectedOrder.deliveryStatus}
//                       </span>
//                     </div>
//                   </div>
//                   <div className="info-item">
//                     <span className="label">Total Amount:</span>
//                     <span className="value amount">{formatCurrency(selectedOrder.totalPrice)}</span>
//                   </div>
//                 </div>
//               </div>

//               <div className="modal-section">
//                 <h3>👤 Customer Information</h3>
//                 <div className="info-grid">
//                   <div className="info-item">
//                     <span className="label">Name:</span>
//                     <span className="value">{selectedOrder.user?.name || selectedOrder.shippingAddress?.name || 'N/A'}</span>
//                   </div>
//                   <div className="info-item">
//                     <span className="label">Email:</span>
//                     <span className="value">{selectedOrder.user?.email || selectedOrder.shippingAddress?.email || 'N/A'}</span>
//                   </div>
//                   <div className="info-item">
//                     <span className="label">Phone:</span>
//                     <span className="value">{selectedOrder.shippingAddress?.mobile || 'N/A'}</span>
//                   </div>
//                   <div className="info-item full-width">
//                     <span className="label">Shipping Address:</span>
//                     <span className="value">
//                       {selectedOrder.shippingAddress?.address}, {selectedOrder.shippingAddress?.city}, {selectedOrder.shippingAddress?.postalCode}, {selectedOrder.shippingAddress?.country}
//                     </span>
//                   </div>
//                 </div>
//               </div>

//               <div className="modal-section">
//                 <h3>💳 Payment Information</h3>
//                 <div className="info-grid">
//                   <div className="info-item">
//                     <span className="label">Method:</span>
//                     <span className="value">{selectedOrder.paymentMethod?.replace('_', ' ').toUpperCase() || 'N/A'}</span>
//                   </div>
//                   <div className="info-item">
//                     <span className="label">Status:</span>
//                     <span className="value">
//                       {selectedOrder.isPaid ? (
//                         <span className="payment-status paid">Paid on {formatDate(selectedOrder.paidAt)}</span>
//                       ) : (
//                         <span className="payment-status unpaid">Unpaid</span>
//                       )}
//                     </span>
//                   </div>
//                 </div>
//               </div>

//               <div className="modal-section">
//                 <h3>🛒 Order Items</h3>
//                 <div className="order-items">
//                   {selectedOrder.orderItems.map((item, index) => (
//                     <div key={index} className="order-item">
//                       <img 
//                         src={item.image || 'https://via.placeholder.com/60x60/1e293b/ffffff?text=Product'} 
//                         alt={item.name}
//                         className="item-image"
//                       />
//                       <div className="item-details">
//                         <h4>{item.name}</h4>
//                         <p>Quantity: {item.qty}</p>
//                         <p>Price: {formatCurrency(item.price)} each</p>
//                       </div>
//                       <div className="item-total">
//                         {formatCurrency(item.price * item.qty)}
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               <div className="modal-section">
//                 <h3>💰 Order Summary</h3>
//                 <div className="order-summary">
//                   <div className="summary-item">
//                     <span>Items Total:</span>
//                     <span>{formatCurrency(selectedOrder.itemsPrice)}</span>
//                   </div>
//                   <div className="summary-item">
//                     <span>Shipping:</span>
//                     <span>{formatCurrency(selectedOrder.shippingPrice)}</span>
//                   </div>
//                   <div className="summary-item">
//                     <span>Tax:</span>
//                     <span>{formatCurrency(selectedOrder.taxPrice)}</span>
//                   </div>
//                   <div className="summary-item total">
//                     <span>Grand Total:</span>
//                     <span>{formatCurrency(selectedOrder.totalPrice)}</span>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="modal-actions">
//               <button className="btn secondary" onClick={() => setSelectedOrder(null)}>
//                 Close
//               </button>
//               {updatedStatus && updatedStatus !== selectedOrder.deliveryStatus && (
//                 <button 
//                   className="btn primary" 
//                   onClick={() => handleUpdateStatus(selectedOrder._id, updatedStatus)}
//                 >
//                   Update Status
//                 </button>
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default OrderList;











import React, { useState, useEffect } from 'react';
import { FiSearch, FiFilter, FiEye, FiChevronLeft, FiChevronRight, FiChevronDown, FiChevronUp, FiDollarSign, FiPackage, FiClock, FiCheck, FiX, FiCalendar, FiUser, FiTruck, FiCreditCard, FiShoppingCart, FiRefreshCw } from 'react-icons/fi';
import { GrView } from "react-icons/gr";
import { MdDeleteOutline } from "react-icons/md";
import '../../../CssFiles/Admin/order/OrderList.css';
import Spinner from '../../../components/Spinner';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import Pagination from '../../../components/Pagination';
import { FcShipped } from "react-icons/fc";
import { Link } from 'react-router-dom';

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [sortField, setSortField] = useState('createdAt');
  const [sortDirection, setSortDirection] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [updatedStatus, setUpdatedStatus] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [totalPendingOrders, setTotalPendingOrders] = useState(0);
  const [totalDeliveredOrders, setTotalDeliveredOrders] = useState(0);
  const [totalshippedOrders, setTotalShippedOrders] = useState(0);
  

  // Fetch orders from API
  const fetchOrders = async (page = 1, limit = 10, search = "", status = "all", start = "", end = "") => {
    try {
      setIsLoading(true);
      
      // Build query parameters
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        ...(search && { search}),
        ...(status !== 'all' && { status }),
        ...(start && { startDate: start }),
        ...(end && { endDate: end })
      });

      // // console.log({
      //   page: page.toString(),
      //   limit: limit.toString(),
      //   ...(search && { search }),
      //   ...(status !== 'all' && { status }),
      //   ...(start && { startDate: start }),
      //   ...(end && { endDate: end })
      // });
      
      // Replace with actual API call
      const response = await fetch(`${import.meta.env.VITE_API_URL}/order?${params}`);
      const data = await response.json();
      console.log(data.data);
      
      if (data.success) {
        setOrders(data.data);
        setFilteredOrders(data.data);
        setTotalOrders(data.totalOrders);
        setTotalPages(data.totalPages);
        setCurrentPage(data.page);
        setTotalPendingOrders(data.totalPendingOrders);
        setTotalDeliveredOrders(data.totalDeliveredOrders);
        setTotalShippedOrders(data.totalshippedOrders);
      } else {
        console.error('Error fetching orders:', data.error);
        toast.error('Failed to fetch orders');
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast.error('Failed to fetch orders');
    } finally {
      setIsLoading(false);
    }
  };

  // Initial data load
  useEffect(() => {
    fetchOrders();
  }, []);

  // Apply filters and search
  useEffect(() => {
    const applyFilters = () => {
      let result = [...orders];
      
      // Apply status filter
      if (statusFilter !== 'all') {
        result = result.filter(order => order.deliveryStatus === statusFilter);
      }
      
      // Apply search filter
      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        result = result.filter(order => 
          order._id.toLowerCase().includes(term) ||
          (order.user?.name?.toLowerCase().includes(term) || '') ||
          (order.user?.email?.toLowerCase().includes(term) || '') ||
          (order.shippingAddress?.email?.toLowerCase().includes(term) || '') ||
          (order.shippingAddress?.mobile?.toLowerCase().includes(term) || '')
        );
      }
      
      // Apply sorting
      result.sort((a, b) => {
        let aValue, bValue;
        
        if (sortField === 'createdAt' || sortField === 'paidAt' || sortField === 'deliveredAt') {
          aValue = new Date(a[sortField] || 0);
          bValue = new Date(b[sortField] || 0);
        } else if (sortField === 'totalPrice') {
          aValue = a.totalPrice;
          bValue = b.totalPrice;
        } else if (sortField === 'user') {
          aValue = a.user?.name || '';
          bValue = b.user?.name || '';
        } else {
          aValue = a[sortField];
          bValue = b[sortField];
        }
        
        if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
      
      setFilteredOrders(result);
    };

    applyFilters();
  }, [searchTerm, statusFilter, sortField, sortDirection, orders]);

  // Handle date filter application
  const applyDateFilter = () => {
    fetchOrders(1, itemsPerPage, searchTerm, statusFilter, startDate, endDate);
  };

  // Clear all filters
  const clearAllFilters = () => {
    setSearchTerm('');
    setStatusFilter('all');
    setStartDate('');
    setEndDate('');
    fetchOrders(1, itemsPerPage, '', 'all', '', '');
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
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
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'pending': return 'status-pending';
      case 'processing': return 'status-processing';
      case 'shipped': return 'status-shipped';
      case 'delivered': return 'status-delivered';
      case 'cancelled': return 'status-cancelled';
      default: return '';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return <FiClock />;
      case 'processing': return <FiPackage />;
      case 'shipped': return <FiTruck />;
      case 'delivered': return <FiCheck />;
      case 'cancelled': return <FiX />;
      default: return <FiClock />;
    }
  };

  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/order/${orderId}`, { 
        deliveryStatus: newStatus 
      });
      fetchOrders(currentPage, itemsPerPage, searchTerm, statusFilter, startDate, endDate);
      setSelectedOrder(null);
      toast.success('Order status updated successfully');
    } catch (error) {
      console.error('Error updating order status:', error);
      toast.error('Failed to update order status');
    }
  };

  const refreshOrders = () => {
    fetchOrders(currentPage, itemsPerPage, searchTerm, statusFilter, startDate, endDate);
    toast.success('Orders refreshed');
  };

   const handleDownload = async (order) => {
    console.log(order._id);
    
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/order/shipping-label/${order._id}`, {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch the shipping label PDF');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      // Create a temporary <a> element to trigger download
      const a = document.createElement('a');
      a.href = url;
      a.download = `shipping-label-${order._id}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();

      // Clean up
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading shipping label:', error);
      // alert('Could not download the shipping label. Please try again.');
    }
  };


  if (isLoading) {
    return (
      <div className="loading-container">
        <Spinner size='lg' />
        <p>Loading orders...</p>
      </div>
    );
  }

  return (
    <div className="admin-order-container">
      <div className="admin-header">
        <div className="header-content">
          <h1>📦 Order Management</h1>
          <p>Manage {totalOrders} customer orders efficiently</p>
        </div>
        <button className="refresh-btn" onClick={refreshOrders}>
          <FiRefreshCw /> Refresh
        </button>
      </div>

      {/* Stats Cards */}
      <div className="stats-cards">
        <div className="stat-card total">
          <div className="stat-icon">
            <FiShoppingCart />
          </div>
          <div className="stat-info">
            <h3>{totalOrders}</h3>
            <p>Total Orders</p>
          </div>
        </div>

        <div className="stat-card pending">
          <div className="stat-icon">
            <FiClock />
          </div>
          <div className="stat-info">
            <h3>{totalPendingOrders}
              {/* {orders.filter(o => o.deliveryStatus === 'pending').length} */}
              </h3>
            <p>Pending</p>
          </div>
        </div>

        <div className="stat-card processing">
          <div className="stat-icon">
            <FiPackage />
          </div>
          <div className="stat-info">
            <h3>{totalshippedOrders}
              {/* {orders.filter(o => o.deliveryStatus === 'shipped').length} */}
              </h3>
            <p>Shipped</p>
          </div>
        </div>

        <div className="stat-card delivered">
          <div className="stat-icon">
            <FiCheck />
          </div>
          <div className="stat-info">
            <h3>{totalDeliveredOrders}
              {/* {orders.filter(o => o.deliveryStatus === 'delivered').length} */}
              </h3>
            <p>Delivered</p>
          </div>
        </div>
      </div>

      {/* Controls Section */}
      <div className="controls-section">
        <div className="search-controls">
          <div className="search-box">
            {/* <FiSearch className="search-icon" /> */}
            <input
              type="text"
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="search-btn" onClick={() => applyDateFilter()}>
              <FiSearch />
            </button>
          </div>

          {/* add the order dashboard button */}
          <Link  to="/admin/ordersdashboard">
            <button className="order-dashboard-link">
             Order Dashboard
            </button>
          </Link>


          <button 
            className="filter-toggle-btn"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            <FiFilter /> Filters
          </button>
        </div>

        {isFilterOpen && (
          <div className="advanced-filters">
            <div className="filter-group">
              <label>Status</label>
              <select 
                value={statusFilter} 
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                {/* <option value="processing">Processing</option> */}
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                {/* <option value="cancelled">Cancelled</option> */}
              </select>
            </div>

            <div className="filter-group">
              <label>Date Range</label>
              <div className="date-inputs">
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  placeholder="Start Date"
                />
                <span>to</span>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  placeholder="End Date"
                />
              </div>
            </div>

            <div className="filter-group">
              <label>Items per page</label>
              <select 
                value={itemsPerPage} 
                onChange={(e) => {
                  const newLimit = Number(e.target.value);
                  setItemsPerPage(newLimit);
                  fetchOrders(1, newLimit, searchTerm, statusFilter, startDate, endDate);
                }}
              >
                <option value="5">5 per page</option>
                <option value="10">10 per page</option>
                <option value="20">20 per page</option>
                <option value="50">50 per page</option>
              </select>
            </div>

            <div className="filter-actions">
              <button onClick={applyDateFilter} className="apply-btn">
                Apply Filters
              </button>
              <button onClick={clearAllFilters} className="clear-btn">
                Clear All
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Orders Table */}
      <div className="table-container">
        <div className="table-header">
          <h3>Order List</h3>
          <span className="results-count">
            Showing {filteredOrders.length} of {totalOrders} orders
          </span>
        </div>
        
        <div className="orders-table-wrapper">
          <table className="orderslist-table">
            <thead>
              <tr>
                <th onClick={() => handleSort('user')}>
                  <div className="table-header-cell">
                    <FiUser /> Customer
                    {sortField === 'user' && (
                      sortDirection === 'asc' ? <FiChevronUp /> : <FiChevronDown />
                    )}
                  </div>
                </th>
                <th onClick={() => handleSort('totalPrice')}>
                  <div className="table-header-cell">
                    <FiDollarSign /> Amount
                    {sortField === 'totalPrice' && (
                      sortDirection === 'asc' ? <FiChevronUp /> : <FiChevronDown />
                    )}
                  </div>
                </th>
                <th onClick={() => handleSort('paymentMethod')}>
                  <div className="table-header-cell">
                    <FiCreditCard /> Payment
                    {sortField === 'paymentMethod' && (
                      sortDirection === 'asc' ? <FiChevronUp /> : <FiChevronDown />
                    )}
                  </div>
                </th>
                <th onClick={() => handleSort('deliveryStatus')}>
                  <div className="table-header-cell">
                    <FiTruck /> Status
                    {sortField === 'deliveryStatus' && (
                      sortDirection === 'asc' ? <FiChevronUp /> : <FiChevronDown />
                    )}
                  </div>
                </th>
                <th onClick={() => handleSort('createdAt')}>
                  <div className="table-header-cell">
                    <FiCalendar /> Date
                    {sortField === 'createdAt' && (
                      sortDirection === 'asc' ? <FiChevronUp /> : <FiChevronDown />
                    )}
                  </div>
                </th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.length > 0 ? (
                filteredOrders.map(order => (
                  <tr key={order._id} className="order-row">
                    <td>
                      <div className="customer-info">
                        <div className="customer-name">{order.user?.name || 'Guest Customer'}</div>
                        <div className="customer-contact">
                          {order.user?.email || order.shippingAddress?.email || 'No email'}
                          {order.shippingAddress?.mobile && ` • ${order.shippingAddress.mobile}`}
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="amount-cell">
                        <span className="amount">{formatCurrency(order.totalPrice)}</span>
                      </div>
                    </td>
                    <td>
                      <div className="payment-info">
                        <span className="payment-method">
                          {order.paymentMethod?.replace('_', ' ').toUpperCase()}
                        </span>
                        {order.isPaid && (
                          <span className="payment-status paid">Paid</span>
                        )}
                      </div>
                    </td>
                    <td>
                      <div className={`status-badge ${getStatusClass(order.deliveryStatus)}`}>
                        {getStatusIcon(order.deliveryStatus)}
                        <span>{order.deliveryStatus}</span>
                      </div>
                    </td>
                    <td>
                      <div className="date-cell">
                        {formatDate(order.createdAt)}
                      </div>
                    </td>
                    <td>
                      <div className="action-buttons-containers">
                      <div className="action-buttons">
                        <button 
                          className="action-btn view-btn"
                          onClick={() => setSelectedOrder(order)}
                          title="View Details"
                        >
                          <GrView />
                        </button>
                      </div>
                       <div className="action-buttons">
                            <button onClick={() => handleDownload(order)} >
                              <FcShipped />
                            </button>
                      </div>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="no-orders">
                    <div className="empty-state">
                      <FiPackage size={48} />
                      <h3>No orders found</h3>
                      <p>Try adjusting your search or filters</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <Pagination
  currentPage={currentPage}
  totalPages={totalPages}
  totalItems={totalOrders}
  onPageChange={(pageNum) =>
    fetchOrders(pageNum, itemsPerPage, searchTerm, statusFilter, startDate, endDate)
  }
/>


      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="modal-overlay">
          <div className="order-modal">
            <div className="modal-header">
              <h2>Order Details</h2>
              <button 
                className="close-btn"
                onClick={() => setSelectedOrder(null)}
              >
                &times;
              </button>
            </div>
            
            <div className="modal-content">
              <div className="modal-section">
                <h3>📋 Order Information</h3>
                <div className="info-grid">
                  <div className="info-item">
                    <span className="label">Order ID:</span>
                    <span className="value">{selectedOrder._id}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">Order Date:</span>
                    <span className="value">{formatDate(selectedOrder.createdAt)}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">Status:</span>
                    <div className="status-control">
                      <select 
                        value={updatedStatus || selectedOrder.deliveryStatus}
                        onChange={(e) => setUpdatedStatus(e.target.value)}
                        className="status-select"
                      >
                        <option value="pending">Pending</option>
                        {/* <option value="processing">Processing</option> */}
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                      <span className={`status-badge ${getStatusClass(selectedOrder.deliveryStatus)}`}>
                        {getStatusIcon(selectedOrder.deliveryStatus)}
                        {selectedOrder.deliveryStatus}
                      </span>
                    </div>
                  </div>
                  <div className="info-item">
                    <span className="label">Total Amount:</span>
                    <span className="value amount">{formatCurrency(selectedOrder.totalPrice)}</span>
                  </div>
                </div>
              </div>

              <div className="modal-section">
                <h3>👤 Customer Information</h3>
                <div className="info-grid">
                  <div className="info-item">
                    <span className="label">Name:</span>
                    <span className="value">{selectedOrder.user?.name || selectedOrder.shippingAddress?.name || 'N/A'}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">Email:</span>
                    <span className="value">{selectedOrder.user?.email || selectedOrder.shippingAddress?.email || 'N/A'}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">Phone:</span>
                    <span className="value">{selectedOrder.shippingAddress?.mobile || 'N/A'}</span>
                  </div>
                  <div className="info-item full-width">
                    <span className="label">Shipping Address:</span>
                    <span className="value">
                      {selectedOrder.shippingAddress?.address}, {selectedOrder.shippingAddress?.city}, {selectedOrder.shippingAddress?.postalCode}, {selectedOrder.shippingAddress?.country}
                    </span>
                  </div>
                </div>
              </div>

              <div className="modal-section">
                <h3>💳 Payment Information</h3>
                <div className="info-grid">
                  <div className="info-item">
                    <span className="label">Method:</span>
                    <span className="value">{selectedOrder.paymentMethod?.replace('_', ' ').toUpperCase() || 'N/A'}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">Status:</span>
                    <span className="value">
                      {selectedOrder.isPaid ? (
                        <span className="payment-status paid">Paid on {formatDate(selectedOrder.paidAt)}</span>
                      ) : (
                        <span className="payment-status unpaid">Unpaid</span>
                      )}
                    </span>
                  </div>
                </div>
              </div>

              <div className="modal-section">
                <h3>🛒 Order Items</h3>
                <div className="order-items">
                  {selectedOrder.orderItems.map((item, index) => (
                    <div key={index} className="order-item">
                      <img 
                        src={item.image || 'https://via.placeholder.com/60x60/1e293b/ffffff?text=Product'} 
                        alt={item.name}
                        className="item-image"
                      />
                      <div className="item-details">
                        <h4>{item.name}</h4>
                        <p>Quantity: {item.qty}</p>
                        <p>Price: {formatCurrency(item.price)} each</p>
                      </div>
                      <div className="item-total">
                        {formatCurrency(item.price * item.qty)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="modal-section">
                <h3>💰 Order Summary</h3>
                <div className="order-summary">
                  <div className="summary-item">
                    <span>Items Total:</span>
                    <span>{formatCurrency(selectedOrder.itemsPrice)}</span>
                  </div>
                  <div className="summary-item">
                    <span>Shipping:</span>
                    <span>{formatCurrency(selectedOrder.shippingPrice)}</span>
                  </div>
                  <div className="summary-item">
                    <span>Tax:</span>
                    <span>{formatCurrency(selectedOrder.taxPrice)}</span>
                  </div>
                  <div className="summary-item total">
                    <span>Grand Total:</span>
                    <span>{formatCurrency(selectedOrder.totalPrice)}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-actions">
              <button className="btn secondary" onClick={() => setSelectedOrder(null)}>
                Close
              </button>
              {updatedStatus && updatedStatus !== selectedOrder.deliveryStatus && (
                <button 
                  className="btn primary" 
                  onClick={() => handleUpdateStatus(selectedOrder._id, updatedStatus)}
                >
                  Update Status
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderList;

