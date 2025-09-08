// AdminContactList.js
import React, { useState, useEffect } from 'react';
import { FiSearch, FiFilter, FiMessageSquare, FiMail, FiClock, FiCheck, FiAlertCircle, FiEye, FiTrash2, FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import '../../../CssFiles/Admin/contact/ContactList.css';
import { GrView } from "react-icons/gr";
import { MdDeleteOutline } from "react-icons/md";

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [selectedContact, setSelectedContact] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);

  // Sample data - replace with API call
  useEffect(() => {
    setIsLoading(true);
    
    // Simulate API call
    const mockContacts = [
      {
        id: 1,
        name: 'Sarah Johnson',
        email: 'sarah.johnson@example.com',
        subject: 'Product Inquiry',
        message: 'I would like to know more about your premium subscription features and pricing.',
        date: '2023-11-15T14:30:00',
        status: 'new',
        priority: 'high',
        phone: '+1 (555) 123-4567',
        category: 'Sales'
      },
      {
        id: 2,
        name: 'Michael Chen',
        email: 'michael.chen@example.com',
        subject: 'Technical Support',
        message: 'I\'m having issues with the mobile app crashing when I try to upload photos.',
        date: '2023-11-14T10:15:00',
        status: 'in-progress',
        priority: 'high',
        phone: '+1 (555) 987-6543',
        category: 'Technical'
      },
      {
        id: 3,
        name: 'Emma Rodriguez',
        email: 'emma.rodriguez@example.com',
        subject: 'Billing Question',
        message: 'I was charged twice this month. Can you please check and refund the duplicate charge?',
        date: '2023-11-13T16:45:00',
        status: 'resolved',
        priority: 'medium',
        phone: '+1 (555) 456-7890',
        category: 'Billing'
      },
      {
        id: 4,
        name: 'David Kim',
        email: 'david.kim@example.com',
        subject: 'Partnership Opportunity',
        message: 'I represent TechSolutions Inc. and would like to discuss potential partnership opportunities.',
        date: '2023-11-12T09:20:00',
        status: 'new',
        priority: 'medium',
        phone: '+1 (555) 234-5678',
        category: 'Business'
      },
      {
        id: 5,
        name: 'Lisa Thompson',
        email: 'lisa.thompson@example.com',
        subject: 'Feature Request',
        message: 'It would be great if you could add dark mode to the web application.',
        date: '2023-11-11T13:10:00',
        status: 'resolved',
        priority: 'low',
        phone: '+1 (555) 876-5432',
        category: 'Feedback'
      },
      {
        id: 6,
        name: 'James Wilson',
        email: 'james.wilson@example.com',
        subject: 'Account Deletion',
        message: 'I would like to delete my account and all associated data from your system.',
        date: '2023-11-10T11:30:00',
        status: 'new',
        priority: 'medium',
        phone: '+1 (555) 345-6789',
        category: 'Account'
      },
      {
        id: 7,
        name: 'Olivia Martinez',
        email: 'olivia.martinez@example.com',
        subject: 'Login Issues',
        message: 'I cannot log in to my account. It says my password is incorrect, but I\'m sure it\'s correct.',
        date: '2023-11-09T15:40:00',
        status: 'in-progress',
        priority: 'high',
        phone: '+1 (555) 765-4321',
        category: 'Technical'
      },
      {
        id: 8,
        name: 'Robert Taylor',
        email: 'robert.taylor@example.com',
        subject: 'Refund Request',
        message: 'I canceled my subscription within the trial period but was still charged.',
        date: '2023-11-08T12:25:00',
        status: 'new',
        priority: 'high',
        phone: '+1 (555) 543-2109',
        category: 'Billing'
      },
      {
        id: 9,
        name: 'Sophia Anderson',
        email: 'sophia.anderson@example.com',
        subject: 'Product Feedback',
        message: 'I love your service! The new update has made it even better. Thank you!',
        date: '2023-11-07T14:15:00',
        status: 'resolved',
        priority: 'low',
        phone: '+1 (555) 321-0987',
        category: 'Feedback'
      },
      {
        id: 10,
        name: 'William Brown',
        email: 'william.brown@example.com',
        subject: 'Data Export',
        message: 'How can I export all my data from the platform?',
        date: '2023-11-06T10:50:00',
        status: 'in-progress',
        priority: 'medium',
        phone: '+1 (555) 654-7890',
        category: 'Account'
      }
    ];
    
    setContacts(mockContacts);
    setFilteredContacts(mockContacts);
  }, []);

  // Filter contacts based on search and filters
  useEffect(() => {
    let result = contacts;
    
    // Apply search filter
    if (searchTerm) {
      result = result.filter(contact => 
        contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.message.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply status filter
    if (statusFilter !== 'all') {
      result = result.filter(contact => contact.status === statusFilter);
    }
    
    // Apply priority filter
    if (priorityFilter !== 'all') {
      result = result.filter(contact => contact.priority === priorityFilter);
    }
    
    setFilteredContacts(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchTerm, statusFilter, priorityFilter, contacts]);

  // Get current contacts for pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentContacts = filteredContacts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredContacts.length / itemsPerPage);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle status change
  const updateStatus = (id, newStatus) => {
    setContacts(contacts.map(contact => 
      contact.id === id ? { ...contact, status: newStatus } : contact
    ));
  };

  // Handle delete contact
  const deleteContact = (id) => {
    setContacts(contacts.filter(contact => contact.id !== id));
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

  return (
    <div className="admin-contact-container">
      <div className="contact-header">
        <h1>Contact Management</h1>
        <p>Manage user inquiries and messages</p>
      </div>

      <div className="contact-controls">
        <div className="search-box">
          <FiSearch className="search-icon" />
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

          <div className="filter-group">
            <select 
              value={priorityFilter} 
              onChange={(e) => setPriorityFilter(e.target.value)}
            >
              <option value="all">All Priority</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
        </div>
      </div>

      <div className="stats-cards">
        <div className="stat-card">
          <div className="stat-icon total">
            <FiMessageSquare />
          </div>
          <div className="stat-info">
            <h3>{contacts.length}</h3>
            <p>Total Contacts</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon new">
            <FiMail />
          </div>
          <div className="stat-info">
            <h3>{contacts.filter(c => c.status === 'new').length}</h3>
            <p>New Messages</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon progress">
            <FiClock />
          </div>
          <div className="stat-info">
            <h3>{contacts.filter(c => c.status === 'in-progress').length}</h3>
            <p>In Progress</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon resolved">
            <FiCheck />
          </div>
          <div className="stat-info">
            <h3>{contacts.filter(c => c.status === 'resolved').length}</h3>
            <p>Resolved</p>
          </div>
        </div>
      </div>

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
            {currentContacts.length > 0 ? (
              currentContacts.map(contact => (
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
              <tr>
                <td colSpan="7" className="no-contacts">
                  <FiAlertCircle />
                  <p>No contacts found</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {filteredContacts.length > 0 && (
        <div className="pagination">
          <button 
            className="pagination-btn"
            disabled={currentPage === 1}
            onClick={() => paginate(currentPage - 1)}
          >
            <FiArrowLeft />
          </button>
          
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
            <button
              key={number}
              className={`pagination-btn ${currentPage === number ? 'active' : ''}`}
              onClick={() => paginate(number)}
            >
              {number}
            </button>
          ))}
          
          <button 
            className="pagination-btn"
            disabled={currentPage === totalPages}
            onClick={() => paginate(currentPage + 1)}
          >
            <FiArrowRight />
          </button>
        </div>
      )}

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