// // AdminOrderList.js
// import React, { useState, useEffect } from 'react';
// import { FiSearch, FiFilter, FiEye, FiChevronLeft, FiChevronRight, FiChevronDown, FiChevronUp, FiDollarSign, FiPackage, FiClock, FiCheck, FiX, FiArrowLeft, FiArrowRight } from 'react-icons/fi';
// import '../../../CssFiles/Admin/order/OrderList.css';

// const OrderList = () => {
//   const [orders, setOrders] = useState([]);
//   const [filteredOrders, setFilteredOrders] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [statusFilter, setStatusFilter] = useState('all');
//   const [sortField, setSortField] = useState('createdAt');
//   const [sortDirection, setSortDirection] = useState('desc');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage, setItemsPerPage] = useState(10);
//   const [selectedOrder, setSelectedOrder] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [darkMode, setDarkMode] = useState(() => {
//     // Check if user has dark mode preference
//     if (typeof window !== 'undefined') {
//       return localStorage.getItem('darkMode') === 'true' || 
//              window.matchMedia('(prefers-color-scheme: dark)').matches;
//     }
//     return false;
//   });

//   // Sample order data
//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         setIsLoading(true);
//         // Simulate API call
//         const response = await fetch('http://localhost:5000/api/order');
//         const data = await response.json();
//         console.log(data.data);
        
//         // Mock data
//         const mockOrders = [
//           {
//             _id: 'ord_001',
//             user: {
//               _id: 'user_001',
//               name: 'Sarah Johnson',
//               email: 'sarah@example.com'
//             },
//             orderItems: [
//               {
//                 product: 'prod_001',
//                 name: 'Wireless Headphones',
//                 price: 99.99,
//                 quantity: 1,
//                 image: 'https://via.placeholder.com/60'
//               }
//             ],
//             shippingAddress: {
//               address: '123 Main St',
//               city: 'San Francisco',
//               postalCode: '94101',
//               country: 'USA'
//             },
//             paymentMethod: 'credit_card',
//             itemsPrice: 99.99,
//             taxPrice: 8.00,
//             shippingPrice: 5.99,
//             totalPrice: 113.98,
//             isPaid: true,
//             paidAt: '2023-11-15T14:30:00Z',
//             isDelivered: false,
//             deliveryStatus: 'processing',
//             createdAt: '2023-11-15T10:15:00Z',
//             updatedAt: '2023-11-15T14:30:00Z'
//           },
//           {
//             _id: 'ord_002',
//             user: {
//               _id: 'user_002',
//               name: 'Michael Chen',
//               email: 'michael@example.com'
//             },
//             orderItems: [
//               {
//                 product: 'prod_002',
//                 name: 'Smart Watch',
//                 price: 199.99,
//                 quantity: 1,
//                 image: 'https://via.placeholder.com/60'
//               },
//               {
//                 product: 'prod_003',
//                 name: 'Phone Case',
//                 price: 24.99,
//                 quantity: 2,
//                 image: 'https://via.placeholder.com/60'
//               }
//             ],
//             shippingAddress: {
//               address: '456 Oak Ave',
//               city: 'New York',
//               postalCode: '10001',
//               country: 'USA'
//             },
//             paymentMethod: 'paypal',
//             itemsPrice: 249.97,
//             taxPrice: 20.00,
//             shippingPrice: 0,
//             totalPrice: 269.97,
//             isPaid: true,
//             paidAt: '2023-11-14T16:45:00Z',
//             isDelivered: true,
//             deliveryStatus: 'delivered',
//             deliveredAt: '2023-11-16T11:20:00Z',
//             createdAt: '2023-11-14T09:30:00Z',
//             updatedAt: '2023-11-16T11:20:00Z'
//           },
//           {
//             _id: 'ord_003',
//             user: {
//               _id: 'user_003',
//               name: 'Emma Rodriguez',
//               email: 'emma@example.com'
//             },
//             orderItems: [
//               {
//                 product: 'prod_004',
//                 name: 'Laptop Backpack',
//                 price: 59.99,
//                 quantity: 1,
//                 image: 'https://via.placeholder.com/60'
//               }
//             ],
//             shippingAddress: {
//               address: '789 Pine Rd',
//               city: 'Los Angeles',
//               postalCode: '90001',
//               country: 'USA'
//             },
//             paymentMethod: 'credit_card',
//             itemsPrice: 59.99,
//             taxPrice: 4.80,
//             shippingPrice: 7.99,
//             totalPrice: 72.78,
//             isPaid: false,
//             isDelivered: false,
//             deliveryStatus: 'pending',
//             createdAt: '2023-11-16T08:20:00Z',
//             updatedAt: '2023-11-16T08:20:00Z'
//           },
//           {
//             _id: 'ord_004',
//             user: {
//               _id: 'user_004',
//               name: 'David Kim',
//               email: 'david@example.com'
//             },
//             orderItems: [
//               {
//                 product: 'prod_005',
//                 name: 'Bluetooth Speaker',
//                 price: 79.99,
//                 quantity: 1,
//                 image: 'https://via.placeholder.com/60'
//               }
//             ],
//             shippingAddress: {
//               address: '321 Elm St',
//               city: 'Chicago',
//               postalCode: '60601',
//               country: 'USA'
//             },
//             paymentMethod: 'stripe',
//             itemsPrice: 79.99,
//             taxPrice: 6.40,
//             shippingPrice: 5.99,
//             totalPrice: 92.38,
//             isPaid: true,
//             paidAt: '2023-11-13T11:30:00Z',
//             isDelivered: true,
//             deliveryStatus: 'delivered',
//             deliveredAt: '2023-11-15T15:45:00Z',
//             createdAt: '2023-11-13T10:15:00Z',
//             updatedAt: '2023-11-15T15:45:00Z'
//           },
//           {
//             _id: 'ord_005',
//             user: {
//               _id: 'user_005',
//               name: 'Lisa Thompson',
//               email: 'lisa@example.com'
//             },
//             orderItems: [
//               {
//                 product: 'prod_006',
//                 name: 'Wireless Earbuds',
//                 price: 129.99,
//                 quantity: 1,
//                 image: 'https://via.placeholder.com/60'
//               },
//               {
//                 product: 'prod_007',
//                 name: 'Charging Cable',
//                 price: 19.99,
//                 quantity: 1,
//                 image: 'https://via.placeholder.com/60'
//               }
//             ],
//             shippingAddress: {
//               address: '654 Maple Ave',
//               city: 'Seattle',
//               postalCode: '98101',
//               country: 'USA'
//             },
//             paymentMethod: 'paypal',
//             itemsPrice: 149.98,
//             taxPrice: 12.00,
//             shippingPrice: 0,
//             totalPrice: 161.98,
//             isPaid: true,
//             paidAt: '2023-11-12T13:20:00Z',
//             isDelivered: false,
//             deliveryStatus: 'shipped',
//             createdAt: '2023-11-12T09:45:00Z',
//             updatedAt: '2023-11-14T16:30:00Z'
//           },
//           {
//             _id: 'ord_006',
//             user: {
//               _id: 'user_006',
//               name: 'James Wilson',
//               email: 'james@example.com'
//             },
//             orderItems: [
//               {
//                 product: 'prod_008',
//                 name: 'Smartphone',
//                 price: 699.99,
//                 quantity: 1,
//                 image: 'https://via.placeholder.com/60'
//               }
//             ],
//             shippingAddress: {
//               address: '987 Cedar Ln',
//               city: 'Boston',
//               postalCode: '02101',
//               country: 'USA'
//             },
//             paymentMethod: 'credit_card',
//             itemsPrice: 699.99,
//             taxPrice: 56.00,
//             shippingPrice: 9.99,
//             totalPrice: 765.98,
//             isPaid: true,
//             paidAt: '2023-11-11T15:10:00Z',
//             isDelivered: true,
//             deliveryStatus: 'delivered',
//             deliveredAt: '2023-11-13T14:20:00Z',
//             createdAt: '2023-11-11T11:30:00Z',
//             updatedAt: '2023-11-13T14:20:00Z'
//           },
//           {
//             _id: 'ord_007',
//             user: {
//               _id: 'user_007',
//               name: 'Olivia Martinez',
//               email: 'olivia@example.com'
//             },
//             orderItems: [
//               {
//                 product: 'prod_009',
//                 name: 'Tablet',
//                 price: 399.99,
//                 quantity: 1,
//                 image: 'https://via.placeholder.com/60'
//               }
//             ],
//             shippingAddress: {
//               address: '147 Oak St',
//               city: 'Austin',
//               postalCode: '73301',
//               country: 'USA'
//             },
//             paymentMethod: 'stripe',
//             itemsPrice: 399.99,
//             taxPrice: 32.00,
//             shippingPrice: 0,
//             totalPrice: 431.99,
//             isPaid: false,
//             isDelivered: false,
//             deliveryStatus: 'pending',
//             createdAt: '2023-11-10T14:25:00Z',
//             updatedAt: '2023-11-10T14:25:00Z'
//           },
//           {
//             _id: 'ord_008',
//             user: {
//               _id: 'user_008',
//               name: 'Robert Taylor',
//               email: 'robert@example.com'
//             },
//             orderItems: [
//               {
//                 product: 'prod_010',
//                 name: 'Gaming Mouse',
//                 price: 49.99,
//                 quantity: 2,
//                 image: 'https://via.placeholder.com/60'
//               }
//             ],
//             shippingAddress: {
//               address: '258 Pine St',
//               city: 'Denver',
//               postalCode: '80201',
//               country: 'USA'
//             },
//             paymentMethod: 'paypal',
//             itemsPrice: 99.98,
//             taxPrice: 8.00,
//             shippingPrice: 5.99,
//             totalPrice: 113.97,
//             isPaid: true,
//             paidAt: '2023-11-09T10:45:00Z',
//             isDelivered: false,
//             deliveryStatus: 'processing',
//             createdAt: '2023-11-09T08:15:00Z',
//             updatedAt: '2023-11-09T10:45:00Z'
//           }
//         ];
        
//         setOrders(data.data);
//         setFilteredOrders(data.data);
//         setIsLoading(false);
//       } catch (error) {
//         console.error('Error fetching orders:', error);
//         setIsLoading(false);
//       }
//     };

//     fetchOrders();
//   }, []);

//   // Toggle dark mode
//   useEffect(() => {
//     document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
//     localStorage.setItem('darkMode', darkMode);
//   }, [darkMode]);

//   // Filter and sort orders
//   useEffect(() => {
//     let result = [...orders];
    
//     // Apply search filter
//     if (searchTerm) {
//       const term = searchTerm.toLowerCase();
//       result = result.filter(order => 
//         order._id.toLowerCase().includes(term) ||
//         order.user.name.toLowerCase().includes(term) ||
//         order.user.email.toLowerCase().includes(term) ||
//         order.paymentMethod.toLowerCase().includes(term)
//       );
//     }
    
//     // Apply status filter
//     if (statusFilter !== 'all') {
//       result = result.filter(order => order.deliveryStatus === statusFilter);
//     }
    
//     // Apply sorting
//     result.sort((a, b) => {
//       let aValue, bValue;
      
//       if (sortField === 'createdAt' || sortField === 'paidAt' || sortField === 'deliveredAt') {
//         aValue = new Date(a[sortField] || 0);
//         bValue = new Date(b[sortField] || 0);
//       } else if (sortField === 'totalPrice') {
//         aValue = a.totalPrice;
//         bValue = b.totalPrice;
//       } else if (sortField === 'user') {
//         aValue = a.user.name;
//         bValue = b.user.name;
//       } else {
//         aValue = a[sortField];
//         bValue = b[sortField];
//       }
      
//       if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
//       if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
//       return 0;
//     });
    
//     setFilteredOrders(result);
//     setCurrentPage(1);
//   }, [searchTerm, statusFilter, sortField, sortDirection, orders]);

//   // Pagination
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentOrders = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);
//   const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
//     return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { 
//       hour: '2-digit', 
//       minute: '2-digit' 
//     });
//   };

//   const formatCurrency = (amount) => {
//     return new Intl.NumberFormat('en-US', {
//       style: 'currency',
//       currency: 'USD',
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
//       case 'shipped': return <FiChevronRight />;
//       case 'delivered': return <FiCheck />;
//       case 'cancelled': return <FiX />;
//       default: return <FiClock />;
//     }
//   };

//   const toggleDarkMode = () => {
//     setDarkMode(!darkMode);
//   };

//   if (isLoading) {
//     return (
//       <div className="admin-order-container">
//         <div className="loading-spinner">
//           <div className="spinner"></div>
//           <p>Loading orders...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="admin-order-container">
//       <div className="admin-header">
//         <div className="header-content">
//           <h1>Order Management</h1>
//           <p>View and manage all customer orders</p>
//         </div>
//         <button className="dark-mode-toggle" onClick={toggleDarkMode}>
//           {darkMode ? 'Light Mode' : 'Dark Mode'}
//         </button>
//       </div>

//       <div className="order-controls">
//         <div className="search-box">
//           <FiSearch className="search-icon" />
//           <input
//             type="text"
//             placeholder="Search orders..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </div>

//         <div className="filter-controls">
//           <div className="filter-group">
//             <FiFilter className="filter-icon" />
//             <select 
//               value={statusFilter} 
//               onChange={(e) => setStatusFilter(e.target.value)}
//             >
//               <option value="all">All Status</option>
//               <option value="pending">Pending</option>
//               <option value="processing">Processing</option>
//               <option value="shipped">Shipped</option>
//               <option value="delivered">Delivered</option>
//               <option value="cancelled">Cancelled</option>
//             </select>
//           </div>

//           <div className="filter-group">
//             <select 
//               value={itemsPerPage} 
//               onChange={(e) => setItemsPerPage(Number(e.target.value))}
//             >
//               <option value="5">5 per page</option>
//               <option value="10">10 per page</option>
//               <option value="20">20 per page</option>
//               <option value="50">50 per page</option>
//             </select>
//           </div>
//         </div>
//       </div>

//       <div className="stats-cards">
//         <div className="stat-card">
//           <div className="stat-icon total">
//             <FiPackage />
//           </div>
//           <div className="stat-info">
//             <h3>{orders.length}</h3>
//             <p>Total Orders</p>
//           </div>
//         </div>

//         <div className="stat-card">
//           <div className="stat-icon pending">
//             <FiClock />
//           </div>
//           <div className="stat-info">
//             <h3>{orders.filter(o => o.deliveryStatus === 'pending').length}</h3>
//             <p>Pending</p>
//           </div>
//         </div>

//         <div className="stat-card">
//           <div className="stat-icon processing">
//             <FiPackage />
//           </div>
//           <div className="stat-info">
//             <h3>{orders.filter(o => o.deliveryStatus === 'processing').length}</h3>
//             <p>Processing</p>
//           </div>
//         </div>

//         <div className="stat-card">
//           <div className="stat-icon delivered">
//             <FiCheck />
//           </div>
//           <div className="stat-info">
//             <h3>{orders.filter(o => o.deliveryStatus === 'delivered').length}</h3>
//             <p>Delivered</p>
//           </div>
//         </div>
//       </div>

//       <div className="orders-table-container">
//         <table className="orders-table">
//           <thead>
//             <tr>
//               <th onClick={() => handleSort('_id')}>
//                 <div className="table-header">
//                   Order ID
//                   {sortField === '_id' && (
//                     sortDirection === 'asc' ? <FiChevronUp /> : <FiChevronDown />
//                   )}
//                 </div>
//               </th>
//               <th onClick={() => handleSort('user')}>
//                 <div className="table-header">
//                   Customer
//                   {sortField === 'user' && (
//                     sortDirection === 'asc' ? <FiChevronUp /> : <FiChevronDown />
//                   )}
//                 </div>
//               </th>
//               <th onClick={() => handleSort('totalPrice')}>
//                 <div className="table-header">
//                   Amount
//                   {sortField === 'totalPrice' && (
//                     sortDirection === 'asc' ? <FiChevronUp /> : <FiChevronDown />
//                   )}
//                 </div>
//               </th>
//               <th onClick={() => handleSort('paymentMethod')}>
//                 <div className="table-header">
//                   Payment
//                   {sortField === 'paymentMethod' && (
//                     sortDirection === 'asc' ? <FiChevronUp /> : <FiChevronDown />
//                   )}
//                 </div>
//               </th>
//               <th onClick={() => handleSort('deliveryStatus')}>
//                 <div className="table-header">
//                   Status
//                   {sortField === 'deliveryStatus' && (
//                     sortDirection === 'asc' ? <FiChevronUp /> : <FiChevronDown />
//                   )}
//                 </div>
//               </th>
//               <th onClick={() => handleSort('createdAt')}>
//                 <div className="table-header">
//                   Date
//                   {sortField === 'createdAt' && (
//                     sortDirection === 'asc' ? <FiChevronUp /> : <FiChevronDown />
//                   )}
//                 </div>
//               </th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {currentOrders.length > 0 ? (
//               currentOrders.map(order => (
//                 <tr key={order._id}>
//                   <td>
//                     <div className="order-id">
//                       {order._id}
//                     </div>
//                   </td>
//                   <td>
//                     <div className="customer-cell">
//                       <div className="customer-name">{order.user.name}</div>
//                       <div className="customer-email">{order.user.email}</div>
//                     </div>
//                   </td>
//                   <td>
//                     <div className="amount-cell">
//                       {formatCurrency(order.totalPrice)}
//                     </div>
//                   </td>
//                   <td>
//                     <div className="payment-cell">
//                       {order.paymentMethod.replace('_', ' ').toUpperCase()}
//                       {order.isPaid === true && <span className="paid-badge">Paid</span>}
//                     </div>
//                   </td>
//                   <td>
//                     <div className={`status-badge ${getStatusClass(order.deliveryStatus)}`}>
//                       {getStatusIcon(order.deliveryStatus)}
//                       {order.deliveryStatus}
//                     </div>
//                   </td>
//                   <td>
//                     {formatDate(order.createdAt)}
//                   </td>
//                   <td>
//                     <div className="action-buttons">
//                       <button 
//                         className="action-btn view"
//                         onClick={() => setSelectedOrder(order)}
//                         title="View Details"
//                       >
//                         <FiEye />
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="7" className="no-orders">
//                   <FiPackage />
//                   <p>No orders found</p>
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {filteredOrders.length > 0 && (
//         <div className="pagination-controls">
//           <div className="pagination-info">
//             Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredOrders.length)} of {filteredOrders.length} orders
//           </div>
          
//           <div className="pagination-buttons">
//             <button 
//               className="pagination-btn"
//               disabled={currentPage === 1}
//               onClick={() => paginate(currentPage - 1)}
//             >
//               <FiChevronLeft />
//             </button>
            
//             {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
//               // Show pages around current page
//               let pageNum;
//               if (totalPages <= 5) {
//                 pageNum = i + 1;
//               } else if (currentPage <= 3) {
//                 pageNum = i + 1;
//               } else if (currentPage >= totalPages - 2) {
//                 pageNum = totalPages - 4 + i;
//               } else {
//                 pageNum = currentPage - 2 + i;
//               }
              
//               return (
//                 <button
//                   key={pageNum}
//                   className={`pagination-btn ${currentPage === pageNum ? 'active' : ''}`}
//                   onClick={() => paginate(pageNum)}
//                 >
//                   {pageNum}
//                 </button>
//               );
//             })}
            
//             <button 
//               className="pagination-btn"
//               disabled={currentPage === totalPages}
//               onClick={() => paginate(currentPage + 1)}
//             >
//               <FiChevronRight />
//             </button>
//           </div>
//         </div>
//       )}

//       {selectedOrder && (
//         <div className="order-modal">
//           <div className="modal-content">
//             <div className="modal-header">
//               <h2>Order Details</h2>
//               <button 
//                 className="close-btn"
//                 onClick={() => setSelectedOrder(null)}
//               >
//                 &times;
//               </button>
//             </div>
            
//             <div className="modal-body">
//               <div className="order-detail-section">
//                 <h3>Order Information</h3>
//                 <div className="detail-grid">
//                   <div className="detail-item">
//                     <span className="order-detail-label">Order ID:</span>
//                     <span className="detail-value">{selectedOrder._id}</span>
//                   </div>
//                   <div className="detail-item">
//                     <span className="order-detail-label">Order Date:</span>
//                     <span className="detail-value">{formatDate(selectedOrder.createdAt)}</span>
//                   </div>
//                   <div className="detail-item">
//                     <span className="order-detail-label">Status:</span>
//                     <span className={`detail-value status-badge ${getStatusClass(selectedOrder.deliveryStatus)}`}>
//                       {getStatusIcon(selectedOrder.deliveryStatus)}
//                       {selectedOrder.deliveryStatus}
//                     </span>
//                   </div>
//                   <div className="detail-item">
//                     <span className="order-detail-label">Total Amount:</span>
//                     <span className="detail-value">{formatCurrency(selectedOrder.totalPrice)}</span>
//                   </div>
//                 </div>
//               </div>

//               <div className="order-detail-section">
//                 <h3>Customer Information</h3>
//                 <div className="detail-grid">
//                   <div className="detail-item">
//                     <span className="order-detail-label">Name:</span>
//                     <span className="detail-value">{selectedOrder.user.name}</span>
//                   </div>
//                   <div className="detail-item">
//                     <span className="order-detail-label">Email:</span>
//                     <span className="detail-value">{selectedOrder.user.email}</span>
//                   </div>
//                   <div className="detail-item">
//                     <span className="order-detail-label">Shipping Address:</span>
//                     <span className="detail-value">
//                       {selectedOrder.shippingAddress.address}, {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.postalCode}, {selectedOrder.shippingAddress.country}
//                     </span>
//                   </div>
//                 </div>
//               </div>

//               <div className="order-detail-section">
//                 <h3>Payment Information</h3>
//                 <div className="detail-grid">
//                   <div className="detail-item">
//                     <span className="order-detail-label">Method:</span>
//                     <span className="detail-value">{selectedOrder.paymentMethod.replace('_', ' ').toUpperCase()}</span>
//                   </div>
//                   <div className="detail-item">
//                     <span className="order-detail-label">Status:</span>
//                     <span className="detail-value">
//                       {selectedOrder.isPaid ? (
//                         <span className="paid-badge">Paid on {formatDate(selectedOrder.paidAt)}</span>
//                       ) : (
//                         <span className="unpaid-badge">Unpaid</span>
//                       )}
//                     </span>
//                   </div>
//                 </div>
//               </div>

//               <div className="order-detail-section">
//                 <h3>Order Items</h3>
//                 <div className="order-items-list">
//                   {selectedOrder.orderItems.map((item, index) => (
//                     <div key={index} className="order-item">
//                       <div className="item-image">
//                         <img src={item.image} alt={item.name} />
//                       </div>
//                       <div className="item-details">
//                         <h4>{item.name}</h4>
//                         <p>Quantity: {item.quantity}</p>
//                       </div>
//                       <div className="item-price">
//                         {formatCurrency(item.price * item.quantity)}
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               <div className="order-detail-section">
//                 <h3>Order Summary</h3>
//                 <div className="summary-grid">
//                   <div className="summary-item">
//                     <span>Items:</span>
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
//                     <span>Total:</span>
//                     <span>{formatCurrency(selectedOrder.totalPrice)}</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
            
//             <div className="modal-actions">
//               <button className="btn secondary" onClick={() => setSelectedOrder(null)}>
//                 Close
//               </button>
//               {selectedOrder.deliveryStatus !== 'delivered' && selectedOrder.deliveryStatus !== 'cancelled' && (
//                 <button className="btn primary">
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





// ******************************************


// AdminOrderList.js
// import React, { useState, useEffect } from 'react';
// import { FiSearch, FiFilter, FiEye, FiChevronLeft, FiChevronRight, FiChevronDown, FiChevronUp, FiDollarSign, FiPackage, FiClock, FiCheck, FiX, FiCalendar } from 'react-icons/fi';
// import '../../../CssFiles/Admin/order/OrderList.css';
// import Spinner from '../../../components/Spinner';
// import {toast} from 'react-hot-toast';

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


//   // Fetch orders from API
//   const fetchOrders = async (page = 1, limit = 10, search = "", status = "all", start = "", end = "") => {
//     try {
//       setIsLoading(true);
      
//       // Build query parameters
//       const params = new URLSearchParams({
//         page: page.toString(),
//         limit: limit.toString(),
//         ...(search && { search }),
//         ...(status !== 'all' && { status }),
//         ...(start && { startDate: start }),
//         ...(end && { endDate: end })
//       });

//       const response = await fetch(`https://swanand-vibes-backend.vercel.app/api/order?${params}`);
//       const data = await response.json();
//       console.log(data);
      
//       if (data.success) {
//         setOrders(data.data);
//         setFilteredOrders(data.data);
//         setTotalOrders(data.totalOrders);
//         setTotalPages(data.totalPages);
//         setCurrentPage(data.page);
//       } else {
//         console.error('Error fetching orders:', data.error);
//       }
//     } catch (error) {
//       console.error('Error fetching orders:', error);
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

//   // Clear date filters
//   const clearDateFilter = () => {
//     setStartDate('');
//     setEndDate('');
//     fetchOrders(1, itemsPerPage, searchTerm, statusFilter, '', '');
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
//     return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { 
//       hour: '2-digit', 
//       minute: '2-digit' 
//     });
//   };

//   const formatCurrency = (amount) => {
//     return new Intl.NumberFormat('en-IN', {
//       style: 'currency',
//       currency: 'INR'
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
//       case 'shipped': return <FiChevronRight />;
//       case 'delivered': return <FiCheck />;
//       case 'cancelled': return <FiX />;
//       default: return <FiClock />;
//     }
//   };

// //   const toggleDarkMode = () => {
// //     setDarkMode(!darkMode);
// //   };

//   const handleUpdateStatus = async (orderId, updatedStatus) => {
//     try {
//       console.log(orderId, updatedStatus);
      
//       await axios.put(`https://swanand-vibes-backend.vercel.app/api/order/${orderId}`, { deliveryStatus: updatedStatus });
//       fetchOrders(currentPage, itemsPerPage, searchTerm, statusFilter, startDate, endDate);
//       toast.success('Order status updated successfully');
//     } catch (error) {
//       console.error('Error updating order status:', error);
//       toast.error('Failed to update order status');
//     }
//   };

//   if (isLoading) {
//     return (
//         <Spinner size='lg' />
//     );
//   }

//   return (
//     <div className="admin-order-container">
//       <div className="admin-header">
//         <div className="header-content">
//           <h1>Order Management</h1>
//           <p>View and manage all customer orders</p>
//         </div>
//         {/* <button className="dark-mode-toggle" onClick={toggleDarkMode}>
//           {darkMode ? 'Light Mode' : 'Dark Mode'}
//         </button> */}
//       </div>

//       <div className="order-controls">
//         <div className="search-box">
//           <FiSearch className="search-icon" />
//           <input
//             type="text"
//             placeholder="Search by order ID, name, email, or phone..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </div>

//         <div className="filter-controls">
//           <div className="filter-group">
//             <FiFilter className="filter-icon" />
//             <select 
//               value={statusFilter} 
//               onChange={(e) => setStatusFilter(e.target.value)}
//             >
//               <option value="all">All Status</option>
//               <option value="pending">Pending</option>
//               <option value="processing">Processing</option>
//               <option value="shipped">Shipped</option>
//               <option value="delivered">Delivered</option>
//               <option value="cancelled">Cancelled</option>
//             </select>
//           </div>

//           <div className="filter-group">
//             <select 
//               value={itemsPerPage} 
//               onChange={(e) => {
//                 const newLimit = Number(e.target.value);
//                 setItemsPerPage(newLimit);
//                 fetchOrders(1, newLimit, searchTerm, statusFilter, startDate, endDate);
//               }}
//             >
//               <option value="5">5 per page</option>
//               <option value="10">10 per page</option>
//               <option value="20">20 per page</option>
//               <option value="50">50 per page</option>
//             </select>
//           </div>
//         </div>
//       </div>

//       <div className="date-filter-controls">
//         <div className="date-filter-group">
//           <FiCalendar className="filter-icon" />
//           <input
//             type="date"
//             value={startDate}
//             onChange={(e) => setStartDate(e.target.value)}
//             placeholder="Start Date"
//             className='date-filter-input'
//           />
//           <span>to</span>
//           <input
//             type="date"
//             value={endDate}
//             onChange={(e) => setEndDate(e.target.value)}
//             placeholder="End Date"
//             className='date-filter-input'
//           />
//           <button onClick={applyDateFilter} className="apply-date-btn">
//             Apply
//           </button>
//           <button onClick={clearDateFilter} className="clear-date-btn">
//             Clear
//           </button>
//         </div>
//       </div>

//       <div className="stats-cards">
//         <div className="stat-card">
//           <div className="stat-icon total">
//             <FiPackage />
//           </div>
//           <div className="stat-info">
//             <h3>{totalOrders}</h3>
//             <p>Total Orders</p>
//           </div>
//         </div>

//         <div className="stat-card">
//           <div className="stat-icon pending">
//             <FiClock />
//           </div>
//           <div className="stat-info">
//             <h3>{orders.filter(o => o.deliveryStatus === 'pending').length}</h3>
//             <p>Pending</p>
//           </div>
//         </div>

//         <div className="stat-card">
//           <div className="stat-icon processing">
//             <FiPackage />
//           </div>
//           <div className="stat-info">
//             <h3>{orders.filter(o => o.deliveryStatus === 'processing').length}</h3>
//             <p>Processing</p>
//           </div>
//         </div>

//         <div className="stat-card">
//           <div className="stat-icon delivered">
//             <FiCheck />
//           </div>
//           <div className="stat-info">
//             <h3>{orders.filter(o => o.deliveryStatus === 'delivered').length}</h3>
//             <p>Delivered</p>
//           </div>
//         </div>
//       </div>

//       <div className="orders-table-container">
//         <table className="orders-table">
//           <thead>
//             <tr>
//               {/* <th onClick={() => handleSort('_id')}>
//                 <div className="table-header">
//                   Order ID
//                   {sortField === '_id' && (
//                     sortDirection === 'asc' ? <FiChevronUp /> : <FiChevronDown />
//                   )}
//                 </div>
//               </th> */}
//               <th onClick={() => handleSort('user')}>
//                 <div className="table-header">
//                   Customer
//                   {sortField === 'user' && (
//                     sortDirection === 'asc' ? <FiChevronUp /> : <FiChevronDown />
//                   )}
//                 </div>
//               </th>
//               <th onClick={() => handleSort('totalPrice')}>
//                 <div className="table-header">
//                   Amount
//                   {sortField === 'totalPrice' && (
//                     sortDirection === 'asc' ? <FiChevronUp /> : <FiChevronDown />
//                   )}
//                 </div>
//               </th>
//               <th onClick={() => handleSort('paymentMethod')}>
//                 <div className="table-header">
//                   Payment
//                   {sortField === 'paymentMethod' && (
//                     sortDirection === 'asc' ? <FiChevronUp /> : <FiChevronDown />
//                   )}
//                 </div>
//               </th>
//               <th onClick={() => handleSort('deliveryStatus')}>
//                 <div className="table-header">
//                   Delivery Status
//                   {sortField === 'deliveryStatus' && (
//                     sortDirection === 'asc' ? <FiChevronUp /> : <FiChevronDown />
//                   )}
//                 </div>
//               </th>
//               <th onClick={() => handleSort('createdAt')}>
//                 <div className="table-header">
//                   Date
//                   {sortField === 'createdAt' && (
//                     sortDirection === 'asc' ? <FiChevronUp /> : <FiChevronDown />
//                   )}
//                 </div>
//               </th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredOrders.length > 0 ? (
//               filteredOrders.map(order => (
//                 <tr key={order._id}>
//                   {/* <td>
//                     <div className="order-id">
//                       {order._id}
//                     </div>
//                   </td> */}
//                   <td>
//                     <div className="customer-cell">
//                       <div className="customer-name">{order.user?.name || 'N/A'}</div>
//                       <div className="customer-email">{order.user?.email || order.shippingAddress?.email || 'N/A'}</div>
//                     </div>
//                   </td>
//                   <td>
//                     <div className="amount-cell">
//                       {formatCurrency(order.totalPrice)}
//                     </div>
//                   </td>
//                   <td>
//                     <div className="payment-cell">
//                       {order.paymentMethod?.replace('_', ' ').toUpperCase() || 'N/A'}
//                       {order.isPaid && <span className="paid-badge">Paid</span>}
//                     </div>
//                   </td>
//                   <td>
//                     <div className={`status-badge ${getStatusClass(order.deliveryStatus)}`}>
//                       {getStatusIcon(order.deliveryStatus)}
//                       {order.deliveryStatus}
//                     </div>
//                   </td>
//                   <td>
//                     {formatDate(order.createdAt)}
//                   </td>
//                   <td>
//                     <div className="action-buttons">
//                       <button 
//                         className="action-btn view"
//                         onClick={() => setSelectedOrder(order)}
//                         title="View Details"
//                       >
//                         <FiEye />
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="7" className="no-orders">
//                   <FiPackage />
//                   <p>No orders found</p>
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {totalOrders > 0 && (
//         <div className="pagination-controls">
//           <div className="pagination-info">
//             Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, totalOrders)} of {totalOrders} orders
//           </div>
          
//           <div className="pagination-buttons">
//             <button 
//               className="pagination-btn"
//               disabled={currentPage === 1}
//               onClick={() => fetchOrders(currentPage - 1, itemsPerPage, searchTerm, statusFilter, startDate, endDate)}
//             >
//               <FiChevronLeft />
//             </button>
            
//             {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
//               let pageNum;
//               if (totalPages <= 5) {
//                 pageNum = i + 1;
//               } else if (currentPage <= 3) {
//                 pageNum = i + 1;
//               } else if (currentPage >= totalPages - 2) {
//                 pageNum = totalPages - 4 + i;
//               } else {
//                 pageNum = currentPage - 2 + i;
//               }
              
//               return (
//                 <button
//                   key={pageNum}
//                   className={`pagination-btn ${currentPage === pageNum ? 'active' : ''}`}
//                   onClick={() => fetchOrders(pageNum, itemsPerPage, searchTerm, statusFilter, startDate, endDate)}
//                 >
//                   {pageNum}
//                 </button>
//               );
//             })}
            
//             <button 
//               className="pagination-btn"
//               disabled={currentPage === totalPages}
//               onClick={() => fetchOrders(currentPage + 1, itemsPerPage, searchTerm, statusFilter, startDate, endDate)}
//             >
//               <FiChevronRight />
//             </button>
//           </div>
//         </div>
//       )}

//       {selectedOrder && (
//         <div className="order-modal">
//           <div className="modal-content">
//             <div className="modal-header">
//               <h2>Order Details</h2>
//               <button 
//                 className="close-btn"
//                 onClick={() => setSelectedOrder(null)}
//               >
//                 &times;
//               </button>
//             </div>
            
//             <div className="modal-body">
//               <div className="order-detail-section">
//                 <h3>Order Information</h3>
//                 <div className="detail-grid">
//                   <div className="detail-item">
//                     <span className="order-detail-label">Order ID:</span>
//                     <span className="detail-value">{selectedOrder._id}</span>
//                   </div>
//                   <div className="detail-item">
//                     <span className="order-detail-label">Order Date:</span>
//                     <span className="detail-value">{formatDate(selectedOrder.createdAt)}</span>
//                   </div>
//                   <div className="detail-item">
//                     <span className="order-detail-label">Status:</span>
//                     <select name="status" id="status" value={selectedOrder.deliveryStatus} 
//                     // onChange={handleStatusChange}
//                     onChange={(e) => setUpdatedStatus(e.target.value )}
//                     >
//                       <option value="pending">Pending</option>
//                       <option value="processing">Processing</option>
//                       <option value="shipped">Shipped</option>
//                       <option value="delivered">Delivered</option>
//                       <option value="cancelled">Cancelled</option>
//                     </select>
//                     <span className={`detail-value status-badge ${getStatusClass(selectedOrder.deliveryStatus)}`}>
//                       {getStatusIcon(selectedOrder.deliveryStatus)}
//                       {selectedOrder.deliveryStatus}
//                     </span>
//                   </div>
//                   <div className="detail-item">
//                     <span className="order-detail-label">Total Amount:</span>
//                     <span className="detail-value">{formatCurrency(selectedOrder.totalPrice)}</span>
//                   </div>
//                 </div>
//               </div>

//               <div className="order-detail-section">
//                 <h3>Customer Information</h3>
//                 <div className="detail-grid">
//                   <div className="detail-item">
//                     <span className="order-detail-label">Name:</span>
//                     <span className="detail-value">{selectedOrder.user?.name || selectedOrder.shippingAddress?.name || 'N/A'}</span>
//                   </div>
//                   <div className="detail-item">
//                     <span className="order-detail-label">Email:</span>
//                     <span className="detail-value">{selectedOrder.user?.email || selectedOrder.shippingAddress?.email || 'N/A'}</span>
//                   </div>
//                   <div className="detail-item">
//                     <span className="order-detail-label">Phone:</span>
//                     <span className="detail-value">{selectedOrder.shippingAddress?.mobile || 'N/A'}</span>
//                   </div>
//                   <div className="detail-item">
//                     <span className="order-detail-label">Shipping Address:</span>
//                     <span className="detail-value">
//                       {selectedOrder.shippingAddress?.address}, {selectedOrder.shippingAddress?.city}, {selectedOrder.shippingAddress?.postalCode}, {selectedOrder.shippingAddress?.country}
//                     </span>
//                   </div>
//                 </div>
//               </div>

//               <div className="order-detail-section">
//                 <h3>Payment Information</h3>
//                 <div className="detail-grid">
//                   <div className="detail-item">
//                     <span className="order-detail-label">Method:</span>
//                     <span className="detail-value">{selectedOrder.paymentMethod?.replace('_', ' ').toUpperCase() || 'N/A'}</span>
//                   </div>
//                   <div className="detail-item">
//                     <span className="order-detail-label">Status:</span>
//                     <span className="detail-value">
//                       {selectedOrder.isPaid ? (
//                         <span className="paid-badge">Paid on {formatDate(selectedOrder.paidAt)}</span>
//                       ) : (
//                         <span className="unpaid-badge">Unpaid</span>
//                       )}
//                     </span>
//                   </div>
//                 </div>
//               </div>

//               <div className="order-detail-section">
//                 <h3>Order Items</h3>
//                 <div className="order-items-list">
//                   {selectedOrder.orderItems.map((item, index) => (
//                     <div key={index} className="order-item">
//                       <div className="item-image">
//                         <img src={item.image || 'https://via.placeholder.com/60'} alt={item.name} />
//                       </div>
//                       <div className="item-details">
//                         <h4>{item.name}</h4>
//                         <p>Quantity: {item.quantity}</p>
//                         <p>Price: {formatCurrency(item.price)} each</p>
//                       </div>
//                       <div className="item-price">
//                         {formatCurrency(item.price * item.quantity)}
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               <div className="order-detail-section">
//                 <h3>Order Summary</h3>
//                 <div className="summary-grid">
//                   <div className="summary-item">
//                     <span>Items:</span>
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
//                     <span>Total:</span>
//                     <span>{formatCurrency(selectedOrder.totalPrice)}</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
            
//             <div className="modal-actions">
//               <button className="btn secondary" onClick={() => setSelectedOrder(null)}>
//                 Close
//               </button>
//               {selectedOrder.deliveryStatus !== 'delivered' && selectedOrder.deliveryStatus !== 'cancelled' && (
//                 <button className="btn primary" onClick={() => handleUpdateStatus()}>
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




// **********************************************

import React, { useState, useEffect } from 'react';
import { FiSearch, FiFilter, FiEye, FiChevronLeft, FiChevronRight, FiChevronDown, FiChevronUp, FiDollarSign, FiPackage, FiClock, FiCheck, FiX, FiCalendar, FiUser, FiTruck, FiCreditCard, FiShoppingCart, FiRefreshCw } from 'react-icons/fi';
import '../../../CssFiles/Admin/order/OrderList.css';
import Spinner from '../../../components/Spinner';
import { toast } from 'react-hot-toast';
import axios from 'axios';

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

  // Fetch orders from API
  const fetchOrders = async (page = 1, limit = 10, search = "", status = "all", start = "", end = "") => {
    try {
      setIsLoading(true);
      
      // Build query parameters
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        ...(search && { search }),
        ...(status !== 'all' && { status }),
        ...(start && { startDate: start }),
        ...(end && { endDate: end })
      });

      const response = await fetch(`https://swanand-vibes-backend.vercel.app/api/order?${params}`);
      const data = await response.json();
      
      if (data.success) {
        setOrders(data.data);
        setFilteredOrders(data.data);
        setTotalOrders(data.totalOrders);
        setTotalPages(data.totalPages);
        setCurrentPage(data.page);
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
      await axios.put(`https://swanand-vibes-backend.vercel.app/api/order/${orderId}`, { 
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
            <h3>{orders.filter(o => o.deliveryStatus === 'pending').length}</h3>
            <p>Pending</p>
          </div>
        </div>

        <div className="stat-card processing">
          <div className="stat-icon">
            <FiPackage />
          </div>
          <div className="stat-info">
            <h3>{orders.filter(o => o.deliveryStatus === 'processing').length}</h3>
            <p>Processing</p>
          </div>
        </div>

        <div className="stat-card delivered">
          <div className="stat-icon">
            <FiCheck />
          </div>
          <div className="stat-info">
            <h3>{orders.filter(o => o.deliveryStatus === 'delivered').length}</h3>
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
          </div>

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
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
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
          <table className="orders-table">
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
                      <div className="action-buttons">
                        <button 
                          className="action-btn view-btn"
                          onClick={() => setSelectedOrder(order)}
                          title="View Details"
                        >
                          <FiEye />
                        </button>
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
      {totalPages > 1 && (
        <div className="pagination-controls">
          <div className="pagination-info">
            Page {currentPage} of {totalPages} • {totalOrders} total orders
          </div>
          
          <div className="pagination-buttons">
            <button 
              className="pagination-btn"
              disabled={currentPage === 1}
              onClick={() => fetchOrders(currentPage - 1, itemsPerPage, searchTerm, statusFilter, startDate, endDate)}
            >
              <FiChevronLeft /> Previous
            </button>
            
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
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
                  onClick={() => fetchOrders(pageNum, itemsPerPage, searchTerm, statusFilter, startDate, endDate)}
                >
                  {pageNum}
                </button>
              );
            })}
            
            <button 
              className="pagination-btn"
              disabled={currentPage === totalPages}
              onClick={() => fetchOrders(currentPage + 1, itemsPerPage, searchTerm, statusFilter, startDate, endDate)}
            >
              Next <FiChevronRight />
            </button>
          </div>
        </div>
      )}

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
                        <option value="processing">Processing</option>
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
                        <p>Quantity: {item.quantity}</p>
                        <p>Price: {formatCurrency(item.price)} each</p>
                      </div>
                      <div className="item-total">
                        {formatCurrency(item.price * item.quantity)}
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