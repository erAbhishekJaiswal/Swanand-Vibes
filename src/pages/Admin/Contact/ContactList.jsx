// // AdminContactList.js
// import React, { useState, useEffect } from 'react';
// import { FiSearch, FiFilter, FiMessageSquare, FiMail, FiClock, FiCheck, FiAlertCircle, FiEye, FiTrash2, FiArrowLeft, FiArrowRight } from 'react-icons/fi';
// import '../../../CssFiles/Admin/contact/ContactList.css';
// import { GrView } from "react-icons/gr";
// import { MdDeleteOutline } from "react-icons/md";
// import axios from 'axios';
// import toast from 'react-hot-toast';
// import { contactslist, contactdelete, contactupdate } from '../../../utills/apicall';

// const ContactList = () => {
//   const [contacts, setContacts] = useState([]);
//   const [filteredContacts, setFilteredContacts] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [statusFilter, setStatusFilter] = useState('all');
//   const [priorityFilter, setPriorityFilter] = useState('all');
//   const [selectedContact, setSelectedContact] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage] = useState(8);

//   // Fetch contacts from API

//   useEffect(() => {

//   // fetch('http://localhost:5000/api/contact/') // Replace with your actual endpoint
//   const fatchContacts = async () => {
//       const res = await contactslist()
//     // .then(res => res.json())
//     // .then(data => {
//       // // console.log(data);
//       const data = res.data
      
//       const formatted = data.map(contact => ({
//         id: contact._id,
//         name: contact.name,
//         email: contact.email,
//         phone: contact.phone,
//         subject: contact.subject,
//         message: contact.message,
//         status: contact.status,
//         date: contact.createdAt,
//         priority: 'medium',
//         category: 'General'
//       }));
//       setContacts(formatted);
//       setFilteredContacts(formatted);
//     // });
//   }

//   fatchContacts();

// }, []);


//   // Filter contacts based on search and filters
//   useEffect(() => {
//     let result = contacts;
    
//     // Apply search filter
//     if (searchTerm) {
//       result = result.filter(contact => 
//         contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         contact.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         contact.message.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//     }
    
//     // Apply status filter
//     if (statusFilter !== 'all') {
//       result = result.filter(contact => contact.status === statusFilter);
//     }
    
//     // Apply priority filter
//     if (priorityFilter !== 'all') {
//       result = result.filter(contact => contact.priority === priorityFilter);
//     }
    
//     setFilteredContacts(result);
//     setCurrentPage(1); // Reset to first page when filters change
//   }, [searchTerm, statusFilter, priorityFilter, contacts]);

//   // Get current contacts for pagination
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentContacts = filteredContacts.slice(indexOfFirstItem, indexOfLastItem);
//   const totalPages = Math.ceil(filteredContacts.length / itemsPerPage);

//   // Change page
//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   // Handle status change
//   const updateStatus = (id, newStatus) => {
//     setContacts(contacts.map(contact => 
//       contact.id === id ? { ...contact, status: newStatus } : contact
//     ));

//     // This would be your actual API call
//     // axios.put(`http://localhost:5000/api/contact/${id}`, { status: newStatus });
//     contactupdate(id, newStatus);
//     toast.success('Contact status updated');

//   };

//   // Handle delete contact
//   const deleteContact = (id) => {
//     setContacts(contacts.filter(contact => contact.id !== id));

//     // This would be your actual API call
//     // axios.delete(`http://localhost:5000/api/contact/${id}`);
//     contactdelete(id);
//     toast.success('Contact deleted successfully');
//   };

//   // Format date
//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
//   };

//   // Get status badge class
//   const getStatusBadgeClass = (status) => {
//     switch (status) {
//       case 'new': return 'status-badge new';
//       case 'in-progress': return 'status-badge in-progress';
//       case 'resolved': return 'status-badge resolved';
//       default: return 'status-badge';
//     }
//   };

//   // Get priority badge class
//   // const getPriorityBadgeClass = (priority) => {
//   //   switch (priority) {
//   //     case 'high': return 'priority-badge high';
//   //     case 'medium': return 'priority-badge medium';
//   //     case 'low': return 'priority-badge low';
//   //     default: return 'priority-badge';
//   //   }
//   // };

//   return (
//     <div className="admin-contact-container">
//       <div className="contact-header">
//         <h1>Contact Management</h1>
//         <p>Manage user inquiries and messages</p>
//       </div>

//       <div className="contact-controls">
//         <div className="search-box">
//           {/* <FiSearch className="search-icon" /> */}
//           <input
//             type="text"
//             placeholder="Search contacts..."
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
//               <option className='contact-fiter-group' value="all">All Status</option>
//               <option className='contact-fiter-group' value="new">New</option>
//               <option className='contact-fiter-group' value="in-progress">In Progress</option>
//               <option className='contact-fiter-group' value="resolved">Resolved</option>
//             </select>
//           </div>

//           {/* <div className="filter-group">
//             <select 
//               value={priorityFilter} 
//               onChange={(e) => setPriorityFilter(e.target.value)}
//             >
//               <option value="all">All Priority</option>
//               <option value="high">High</option>
//               <option value="medium">Medium</option>
//               <option value="low">Low</option>
//             </select>
//           </div> */}
//         </div>
//       </div>

//       <div className="stats-cards">
//         <div className="stat-card">
//           <div className="stat-icon total">
//             <FiMessageSquare />
//           </div>
//           <div className="stat-info">
//             <h3>{contacts.length}</h3>
//             <p>Total Contacts</p>
//           </div>
//         </div>

//         <div className="stat-card">
//           <div className="stat-icon new">
//             <FiMail />
//           </div>
//           <div className="stat-info">
//             <h3>{contacts.filter(c => c.status === 'new').length}</h3>
//             <p>New Messages</p>
//           </div>
//         </div>

//         <div className="stat-card">
//           <div className="stat-icon progress">
//             <FiClock />
//           </div>
//           <div className="stat-info">
//             <h3>{contacts.filter(c => c.status === 'in-progress').length}</h3>
//             <p>In Progress</p>
//           </div>
//         </div>

//         <div className="stat-card">
//           <div className="stat-icon resolved">
//             <FiCheck />
//           </div>
//           <div className="stat-info">
//             <h3>{contacts.filter(c => c.status === 'resolved').length}</h3>
//             <p>Resolved</p>
//           </div>
//         </div>
//       </div>

//       <div className="contacts-table-container">
//         <table className="contacts-table">
//           <thead>
//             <tr>
//               <th>User</th>
//               <th>Subject</th>
//               {/* <th>Category</th> */}
//               {/* <th>Priority</th> */}
//               <th>Status</th>
//               <th>Date</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {currentContacts.length > 0 ? (
//               currentContacts.map(contact => (
//                 <tr key={contact.id}>
//                   <td>
//                     <div className="user-info">
//                       <div className="user-avatar">
//                         {contact.name.charAt(0)}
//                       </div>
//                       <div className="user-details">
//                         <div className="user-name">{contact.name}</div>
//                         <div className="user-email">{contact.email}</div>
//                       </div>
//                     </div>
//                   </td>
//                   <td>
//                     <div className="subject-cell">
//                       {contact.subject}
//                     </div>
//                   </td>
//                   {/* <td>
//                     <span className="category-badge">{contact.category}</span>
//                   </td> */}
//                   {/* <td>
//                     <span className={getPriorityBadgeClass(contact.priority)}>
//                       {contact.priority}
//                     </span>
//                   </td> */}
//                   <td>
//                     <span className={getStatusBadgeClass(contact.status)}>
//                       {contact.status}
//                     </span>
//                   </td>
//                   <td>
//                     {formatDate(contact.date)}
//                   </td>
//                   <td>
//                     <div className="action-buttons">
//                       <button 
//                         className="action-btn view"
//                         onClick={() => setSelectedContact(contact)}
//                       >
//                       <GrView />
//                       </button>
//                       <button 
//                         className="action-btn delete"
//                         onClick={() => deleteContact(contact.id)}
//                       >
//                         <MdDeleteOutline />
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="7" className="no-contacts">
//                   <FiAlertCircle />
//                   <p>No contacts found</p>
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {filteredContacts.length > 0 && (
//         <div className="pagination">
//           <button 
//             className="pagination-btn"
//             disabled={currentPage === 1}
//             onClick={() => paginate(currentPage - 1)}
//           >
//             <FiArrowLeft />
//           </button>
          
//           {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
//             <button
//               key={number}
//               className={`pagination-btn ${currentPage === number ? 'active' : ''}`}
//               onClick={() => paginate(number)}
//             >
//               {number}
//             </button>
//           ))}
          
//           <button 
//             className="pagination-btn"
//             disabled={currentPage === totalPages}
//             onClick={() => paginate(currentPage + 1)}
//           >
//             <FiArrowRight />
//           </button>
//         </div>
//       )}

//       {selectedContact && (
//         <div className="contact-modal">
//           <div className="modal-content">
//             <div className="modal-header">
//               <h2>Contact Details</h2>
//               <button 
//                 className="close-btn"
//                 onClick={() => setSelectedContact(null)}
//               >
//                 &times;
//               </button>
//             </div>
            
//             <div className="modal-body">
//               <div className="contact-detail-section">
//                 <h3>User Information</h3>
//                 <div className="detail-row">
//                   <div className="detail-label">Name:</div>
//                   <div className="detail-value">{selectedContact.name}</div>
//                 </div>
//                 <div className="detail-row">
//                   <div className="detail-label">Email:</div>
//                   <div className="detail-value">
//                     <a href={`mailto:${selectedContact.email}`}>{selectedContact.email}</a>
//                   </div>
//                 </div>
//                 <div className="detail-row">
//                   <div className="detail-label">Phone:</div>
//                   <div className="detail-value">
//                     <a href={`tel:${selectedContact.phone}`}>{selectedContact.phone}</a>
//                   </div>
//                 </div>
//               </div>
              
//               <div className="contact-detail-section">
//                 <h3>Message Details</h3>
//                 <div className="detail-row">
//                   <div className="detail-label">Subject:</div>
//                   <div className="detail-value">{selectedContact.subject}</div>
//                 </div>
//                 <div className="detail-row">
//                   <div className="detail-label">Category:</div>
//                   <div className="detail-value">
//                     <span className="category-badge">{selectedContact.category}</span>
//                   </div>
//                 </div>
//                 <div className="detail-row">
//                   <div className="detail-label">Priority:</div>
//                   <div className="detail-value">
//                     {/* <span className={getPriorityBadgeClass(selectedContact.priority)}>
//                       {selectedContact.priority}
//                     </span> */}
//                   </div>
//                 </div>
//                 <div className="detail-row">
//                   <div className="detail-label">Status:</div>
//                   <div className="detail-value">
//                     <select 
//                       value={selectedContact.status} 
//                       onChange={(e) => updateStatus(selectedContact.id, e.target.value)}
//                       className="status-select"
//                     >
//                       <option value="new">New</option>
//                       <option value="in-progress">In Progress</option>
//                       <option value="resolved">Resolved</option>
//                     </select>
//                   </div>
//                 </div>
//                 <div className="detail-row">
//                   <div className="detail-label">Date:</div>
//                   <div className="detail-value">{formatDate(selectedContact.date)}</div>
//                 </div>
//               </div>
              
//               <div className="contact-detail-section">
//                 <h3>Message</h3>
//                 <div className="message-content">
//                   {selectedContact.message}
//                 </div>
//               </div>
//             </div>
            
//             <div className="modal-actions">
//               <button className="btn secondary" onClick={() => setSelectedContact(null)}>
//                 Close
//               </button>
//               <a href={`mailto:${selectedContact.email}`} className="btn primary">
//                 Reply via Email
//               </a>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ContactList;









import React, { useState, useEffect } from 'react';
import { FiSearch, FiFilter, FiMessageSquare, FiMail, FiClock, FiCheck, FiAlertCircle, FiEye, FiTrash2, FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import '../../../CssFiles/Admin/contact/ContactList.css';
import { GrView } from "react-icons/gr";
import { MdDeleteOutline } from "react-icons/md";
import axios from 'axios';
import toast from 'react-hot-toast';
import { contactslist, contactdelete, contactupdate } from '../../../utills/apicall';
import Pagination from '../../../components/Pagination'

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [selectedContact, setSelectedContact] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [loading, setLoading] = useState(false);
  const [totalContacts, setTotalContacts] = useState(0);
  const [newContacts, setNewContacts] = useState(0);
  const [totalProgress, setTotalProgress] = useState(0);
  const [totalResolved, setTotalResolved] = useState(0);
  // Fetch contacts from API with filters
  const fetchContacts = async (page = 1, search = '', status = 'all', priority = 'all') => {
    setLoading(true);
    try {
      // Build query parameters
      const params = {
        page,
        limit: itemsPerPage,
        ...(search && { search }),
        ...(status !== 'all' && { status }),
        ...(priority !== 'all' && { priority })
      };

      // // console.log({
      //   page,
      //   limit: itemsPerPage,
      //   ...(search && { search }),
      //   ...(status !== 'all' && { status }),
      //   ...(priority !== 'all' && { priority })
      // });
      
      // Assuming your contactslist function can accept params
      const res = await contactslist(params);
      const data = res.data;
      // console.log(data);
      
      // If your backend returns paginated data, adjust accordingly
      const formatted = data.contacts ? data.contacts.map(contact => ({
        id: contact._id,
        name: contact.name,
        email: contact.email,
        phone: contact.phone,
        subject: contact.subject,
        message: contact.message,
        status: contact.status,
        date: contact.createdAt,
        priority: contact.priority || 'medium',
        category: contact.category || 'General'
      })) : data.map(contact => ({
        id: contact._id,
        name: contact.name,
        email: contact.email,
        phone: contact.phone,
        subject: contact.subject,
        message: contact.message,
        status: contact.status,
        date: contact.createdAt,
        priority: contact.priority || 'medium',
        category: contact.category || 'General'
      }));

      setContacts(formatted);
      setFilteredContacts(formatted);
      setTotalContacts(data.totalContacts);
      setNewContacts(data.totalNew);
      setTotalProgress(data.totalProgress);
      setTotalResolved(data.totalResolved);

    } catch (error) {
      console.error('Error fetching contacts:', error);
      toast.error('Failed to fetch contacts');
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch and fetch when filters change
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      fetchContacts(1, searchTerm, statusFilter, priorityFilter);
      setCurrentPage(1);
    }, 300); // Debounce search to avoid too many API calls

    return () => clearTimeout(debounceTimer);
  }, [searchTerm, statusFilter, priorityFilter]);

  // Fetch specific page
  const fetchPage = (pageNumber) => {
    fetchContacts(pageNumber, searchTerm, statusFilter, priorityFilter);
    setCurrentPage(pageNumber);
  };

  // Handle status change
  const updateStatus = async (id, newStatus) => {
    try {
      await contactupdate(id, { status: newStatus });
      
      // Update local state
      setContacts(contacts.map(contact => 
        contact.id === id ? { ...contact, status: newStatus } : contact
      ));
      
      setFilteredContacts(filteredContacts.map(contact => 
        contact.id === id ? { ...contact, status: newStatus } : contact
      ));
      
      toast.success('Contact status updated');
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Failed to update status');
    }
  };

  // Handle delete contact
  const deleteContact = async (id) => {
    if (!window.confirm('Are you sure you want to delete this contact?')) {
      return;
    }

    try {
      await contactdelete(id);
      
      // Refetch data to ensure consistency
      fetchContacts(currentPage, searchTerm, statusFilter, priorityFilter);
      toast.success('Contact deleted successfully');
    } catch (error) {
      console.error('Error deleting contact:', error);
      toast.error('Failed to delete contact');
    }
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Get status badge class
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'new': return 'status-badge new';
      case 'in-progress': return 'status-badge in-progress';
      case 'resolved': return 'status-badge resolved';
      default: return 'status-badge';
    }
  };

  // Get priority badge class
  const getPriorityBadgeClass = (priority) => {
    switch (priority) {
      case 'high': return 'priority-badge high';
      case 'medium': return 'priority-badge medium';
      case 'low': return 'priority-badge low';
      default: return 'priority-badge';
    }
  };

  // Calculate total pages based on backend total count
  const totalPages = Math.ceil(totalContacts / itemsPerPage);

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    return pages;
  };

  return (
    <div className="admin-contact-container">
      <div className="contact-header">
        <h1>Contact Management</h1>
        <p>Manage user inquiries and messages</p>
      </div>

      <div className="contact-controls">
        <div className="search-box">
          {/* <FiSearch className="search-icon" /> */}
          <input
            type="text"
            placeholder="Search contacts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-controls">
          <div className="filter-group">
            <FiFilter className="filter-icon" />
            <select 
              value={statusFilter} 
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="new">New</option>
              <option value="in-progress">In Progress</option>
              <option value="resolved">Resolved</option>
            </select>
          </div>

          {/* <div className="filter-group">
            <select 
              value={priorityFilter} 
              onChange={(e) => setPriorityFilter(e.target.value)}
            >
              <option value="all">All Priority</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div> */}
        </div>
      </div>

      <div className="stats-cards">
        <div className="stat-card">
          <div className="stat-icon total">
            <FiMessageSquare />
          </div>
          <div className="stat-info">
            <h3>{totalContacts}</h3>
            <p>Total Contacts</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon new">
            <FiMail />
          </div>
          <div className="stat-info">
            <h3>{newContacts}
              {/* {contacts.filter(c => c.status === 'new').length} */}
              </h3>
            <p>New Messages</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon progress">
            <FiClock />
          </div>
          <div className="stat-info">
            <h3>{totalProgress}
              {/* {contacts.filter(c => c.status === 'in-progress').length} */}
              </h3>
            <p>In Progress</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon resolved">
            <FiCheck />
          </div>
          <div className="stat-info">
            <h3>{totalResolved}
              {/* {contacts.filter(c => c.status === 'resolved').length} */}
              </h3>
            <p>Resolved</p>
          </div>
        </div>
      </div>

      {loading && (
        <div className="loading-container">
          <p>Loading contacts...</p>
        </div>
      )}

      <div className="contacts-table-container">
        <table className="contacts-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Subject</th>
              <th>Category</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {!loading && filteredContacts.length > 0 ? (
              filteredContacts.map(contact => (
                <tr key={contact.id}>
                  <td>
                    <div className="user-info">
                      <div className="user-avatar">
                        {contact.name.charAt(0)}
                      </div>
                      <div className="user-details">
                        <div className="user-name">{contact.name}</div>
                        <div className="user-email">{contact.email}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="subject-cell">
                      {contact.subject}
                    </div>
                  </td>
                  <td>
                    <span className="category-badge">{contact.category}</span>
                  </td>
                  <td>
                    <span className={getPriorityBadgeClass(contact.priority)}>
                      {contact.priority}
                    </span>
                  </td>
                  <td>
                    <span className={getStatusBadgeClass(contact.status)}>
                      {contact.status}
                    </span>
                  </td>
                  <td>
                    {formatDate(contact.date)}
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button 
                        className="action-btn view"
                        onClick={() => setSelectedContact(contact)}
                      >
                        <GrView />
                      </button>
                      <button 
                        className="action-btn delete"
                        onClick={() => deleteContact(contact.id)}
                      >
                        <MdDeleteOutline />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              !loading && (
                <tr>
                  <td colSpan="7" className="no-contacts">
                    <FiAlertCircle />
                    <p>No contacts found</p>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>

      {/* {!loading && totalPages > 1 && (
        <div className="pagination">
          <button 
            className="pagination-btn"
            disabled={currentPage === 1}
            onClick={() => fetchPage(currentPage - 1)}
          >
            <FiArrowLeft />
          </button>
          
          {getPageNumbers().map(number => (
            <button
              key={number}
              className={`pagination-btn ${currentPage === number ? 'active' : ''}`}
              onClick={() => fetchPage(number)}
            >
              {number}
            </button>
          ))}
          
          <button 
            className="pagination-btn"
            disabled={currentPage === totalPages}
            onClick={() => fetchPage(currentPage + 1)}
          >
            <FiArrowRight />
          </button>
        </div>
      )} */}

     
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalContacts}
        onPageChange={fetchPage}
      />
      

      {selectedContact && (
        <div className="contact-modal">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Contact Details</h2>
              <button 
                className="close-btn"
                onClick={() => setSelectedContact(null)}
              >
                &times;
              </button>
            </div>
            
            <div className="modal-body">
              <div className="contact-detail-section">
                <h3>User Information</h3>
                <div className="detail-row">
                  <div className="detail-label">Name:</div>
                  <div className="detail-value">{selectedContact.name}</div>
                </div>
                <div className="detail-row">
                  <div className="detail-label">Email:</div>
                  <div className="detail-value">
                    <a href={`mailto:${selectedContact.email}`}>{selectedContact.email}</a>
                  </div>
                </div>
                <div className="detail-row">
                  <div className="detail-label">Phone:</div>
                  <div className="detail-value">
                    <a href={`tel:${selectedContact.phone}`}>{selectedContact.phone}</a>
                  </div>
                </div>
              </div>
              
              <div className="contact-detail-section">
                <h3>Message Details</h3>
                <div className="detail-row">
                  <div className="detail-label">Subject:</div>
                  <div className="detail-value">{selectedContact.subject}</div>
                </div>
                <div className="detail-row">
                  <div className="detail-label">Category:</div>
                  <div className="detail-value">
                    <span className="category-badge">{selectedContact.category}</span>
                  </div>
                </div>
                <div className="detail-row">
                  <div className="detail-label">Priority:</div>
                  <div className="detail-value">
                    <span className={getPriorityBadgeClass(selectedContact.priority)}>
                      {selectedContact.priority}
                    </span>
                  </div>
                </div>
                <div className="detail-row">
                  <div className="detail-label">Status:</div>
                  <div className="detail-value">
                    <select 
                      value={selectedContact.status} 
                      onChange={(e) => updateStatus(selectedContact.id, e.target.value)}
                      className="status-select"
                    >
                      <option value="new">New</option>
                      <option value="in-progress">In Progress</option>
                      <option value="resolved">Resolved</option>
                    </select>
                  </div>
                </div>
                <div className="detail-row">
                  <div className="detail-label">Date:</div>
                  <div className="detail-value">{formatDate(selectedContact.date)}</div>
                </div>
              </div>
              
              <div className="contact-detail-section">
                <h3>Message</h3>
                <div className="message-content">
                  {selectedContact.message}
                </div>
              </div>
            </div>
            
            <div className="modal-actions">
              <button className="btn secondary" onClick={() => setSelectedContact(null)}>
                Close
              </button>
              <a href={`mailto:${selectedContact.email}`} className="btn primary">
                Reply via Email
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactList;