// import React, { useEffect, useState } from 'react'
// import axios from 'axios';

// const UserList = () => {
//     const [users, setUsers] = useState([]);
//     useEffect(() => {
//         const fetchUsers = async () => {
//             try {
//                 const response = await axios.get('http://localhost:5000/api/users/');
//                 setUsers(response.data);
//                 console.log(response.data);
//             } catch (error) {
//                 console.error('Error fetching users:', error);
//             }
//         };
//         fetchUsers();
//     }, []);

//   return (
//     <div>
//         <h1>User List</h1>
//         <table>
//             <thead>
//                 <tr>
//                     <th>Name</th>
//                     <th>Email</th>
//                     <th>Role</th>
//                     <th>Actions</th>
//                 </tr>
//             </thead>
//             <tbody>
//                 {users.map(user => (
//                     <tr key={user.id}>
//                         <td>{user.name}</td>
//                         <td>{user.email}</td>
//                         <td>{user.role}</td>
//                         <td>
//                             <button>View</button>
//                             <button>Edit</button>
//                             <button>Delete</button>
//                         </td>
//                     </tr>
//                 ))}
//             </tbody>
//         </table>
//     </div>
//   )
// }

// export default UserList









import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../../CssFiles/Admin/user/UserList.css';
import {getAllUsers,deleteUser} from '../../../utills/apicall';
import Spinner from '../../../components/Spinner';
import { toast } from 'react-hot-toast';

const UserList = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [roleFilter, setRoleFilter] = useState('all');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setLoading(true);
                const response = await getAllUsers();
                setUsers(response.data);
                setFilteredUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
                setError('Failed to load users. Please try again later.');
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    useEffect(() => {
        let results = users;
        if (searchTerm) {
            results = results.filter(user =>
                user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.email.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        if (roleFilter !== 'all') {
            results = results.filter(user => user.role === roleFilter);
        }
        setFilteredUsers(results);
    }, [users, searchTerm, roleFilter]);

    const handleDeleteUser = async (userId, userName) => {
        if (window.confirm(`Are you sure you want to delete ${userName}?`)) {
            try {
                await deleteUser(userId);
                // axios.delete(`http://localhost:5000/api/users/${userId}`);
                setUsers(users.filter(user => user.id !== userId));
                alert('User deleted successfully!');
            } catch (error) {
                console.error('Error deleting user:', error);
                alert('Failed to delete user. Please try again.');
            }
        }
    };

    const getRoleBadgeClass = (role) => {
        switch (role) {
            case 'admin': return 'badge admin';
            case 'moderator': return 'badge moderator';
            case 'user': return 'badge user';
            default: return 'badge';
        }
    };

    const getRoleDisplayName = (role) => {
        switch (role) {
            case 'admin': return 'Administrator';
            case 'moderator': return 'Moderator';
            case 'user': return 'User';
            default: return role;
        }
    };

    const handleViewUser = (id) => {
        navigate(`/admin/detail/${id}`);
    };

    if (loading) {
        return <Spinner size="lg" />;
    }

    if (error) {
        return (
            <div className="user-list-container">
                <div className="error-message">
                    <span className="error-icon">⚠️</span>
                    <h3>{error}</h3>
                    <button onClick={() => window.location.reload()} className="retry-btn">Try Again</button>
                </div>
            </div>
        );
    }

    return (
        <div className="user-list-container">
            <div className="user-list-header">
                <div className="header-content">
                    <h2>User Management</h2>
                    <p>Manage your system users and permissions</p>
                </div>
            </div>

            <div className="user-controls">
                <div className="search-box">
                    <input
                        type="text"
                        placeholder="🔍Search users..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="userserch-list search-input"
                    />
                    {/* <span className="search-icon">🔍</span> */}
                </div>
                <div className="filter-controls">
                    <label htmlFor="role-filter">Filter by Role:</label>
                    <select
                        id="role-filter"
                        value={roleFilter}
                        onChange={(e) => setRoleFilter(e.target.value)}
                        className="role-filter"
                    >
                        <option value="all">All Roles</option>
                        <option value="admin">Administrators</option>
                        <option value="user">Users</option>
                    </select>
                </div>
            </div>

            <div className="user-table-wrapper">
                <table className="user-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Orders</th>
                            <th>Spent</th>
                            <th>Rating</th>
                            <th>Joined</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map((user, index) => (
                            <tr key={user._id}>
                                <td>{index + 1}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td><span className={getRoleBadgeClass(user.role)}>{getRoleDisplayName(user.role)}</span></td>
                                <td>12</td>
                                <td>$1,240</td>
                                <td>4.8</td>
                                <td>{new Date(user.createdAt || Date.now()).toLocaleDateString()}</td>
                                <td className="action-buttons">
                                    <button onClick={() => handleViewUser(user._id)} title="View"><span>👁️</span></button>
                                    <button title="Edit"><span>✏️</span></button>
                                    <button onClick={() => handleDeleteUser(user.id, user.name)} title="Delete"><span>🗑️</span></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {filteredUsers.length === 0 && (
                <div className="empty-state">
                    <h3>No users found</h3>
                    <p>{searchTerm || roleFilter !== 'all' ? 'Try adjusting your search or filter criteria.' : 'No users available in the system.'}</p>
                    {(searchTerm || roleFilter !== 'all') && (
                        <button className="clear-filters-btn" onClick={() => {
                            setSearchTerm('');
                            setRoleFilter('all');
                        }}>Clear Filters</button>
                    )}
                </div>
            )}
        </div>
    );
};

export default UserList;






// UserList.js (Updated)
// import React, { useEffect, useState } from 'react'
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import '../../../CssFiles/Admin/user/UserList.css';

// const UserList = () => {
//     const navigate = useNavigate();
//     const [users, setUsers] = useState([]);
//     const [filteredUsers, setFilteredUsers] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [searchTerm, setSearchTerm] = useState('');
//     const [roleFilter, setRoleFilter] = useState('all');

//     useEffect(() => {
//         const fetchUsers = async () => {
//             try {
//                 setLoading(true);
//                 const response = await axios.get('http://localhost:5000/api/users/');
//                 setUsers(response.data);
//                 setFilteredUsers(response.data);
//             } catch (error) {
//                 console.error('Error fetching users:', error);
//                 setError('Failed to load users. Please try again later.');
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchUsers();
//     }, []);

//     // Filter users based on search term and role filter
//     useEffect(() => {
//         let results = users;
        
//         // Apply search filter
//         if (searchTerm) {
//             results = results.filter(user =>
//                 user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                 user.email.toLowerCase().includes(searchTerm.toLowerCase())
//             );
//         }
        
//         // Apply role filter
//         if (roleFilter !== 'all') {
//             results = results.filter(user => user.role === roleFilter);
//         }
        
//         setFilteredUsers(results);
//     }, [users, searchTerm, roleFilter]);

//     const handleDeleteUser = async (userId, userName) => {
//         if (window.confirm(`Are you sure you want to delete ${userName}?`)) {
//             try {
//                 await axios.delete(`http://localhost:5000/api/users/${userId}`);
//                 setUsers(users.filter(user => user.id !== userId));
//                 // Show success message
//                 alert('User deleted successfully!');
//             } catch (error) {
//                 console.error('Error deleting user:', error);
//                 alert('Failed to delete user. Please try again.');
//             }
//         }
//     };

//     const getRoleBadgeClass = (role) => {
//         switch (role) {
//             case 'admin': return 'role-badge admin';
//             case 'moderator': return 'role-badge moderator';
//             case 'user': return 'role-badge user';
//             default: return 'role-badge';
//         }
//     };

//     const getRoleDisplayName = (role) => {
//         switch (role) {
//             case 'admin': return 'Administrator';
//             case 'moderator': return 'Moderator';
//             case 'user': return 'User';
//             default: return role;
//         }
//     };
    
//     const handleViewUser = (id) => {
//         navigate(`/admin/detail/${id}`);
//     };

//     if (loading) {
//         return (
//             <div className="user-list-container">
//                 <div className="loading-spinner">
//                     <div className="spinner"></div>
//                     <p>Loading users...</p>
//                 </div>
//             </div>
//         );
//     }

//     if (error) {
//         return (
//             <div className="user-list-container">
//                 <div className="error-message">
//                     <span className="error-icon">⚠️</span>
//                     <h3>{error}</h3>
//                     <button onClick={() => window.location.reload()} className="retry-btn">
//                         Try Again
//                     </button>
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <div className="user-list-container">
//             <div className="user-list-header">
//                 <div className="header-content">
//                     <h1>User Management</h1>
//                     <p>Manage your system users and permissions</p>
//                 </div>
//                 <button className="add-user-btn">
//                     <span className="btn-icon">+</span>
//                     Add New User
//                 </button>
//             </div>

//             <div className="user-controls">
//                 <div className="search-box">
//                     <input
//                         type="text"
//                         placeholder="Search users..."
//                         value={searchTerm}
//                         onChange={(e) => setSearchTerm(e.target.value)}
//                         className="search-input"
//                     />
//                     <span className="search-icon">🔍</span>
//                 </div>

//                 <div className="filter-controls">
//                     <label htmlFor="role-filter">Filter by Role:</label>
//                     <select
//                         id="role-filter"
//                         value={roleFilter}
//                         onChange={(e) => setRoleFilter(e.target.value)}
//                         className="role-filter"
//                     >
//                         <option value="all">All Roles</option>
//                         <option value="admin">Administrators</option>
//                         <option value="moderator">Moderators</option>
//                         <option value="user">Users</option>
//                     </select>
//                 </div>
//             </div>

//             <div className="users-grid">
//                 {filteredUsers.map(user => (
//                     <div key={user._id} className="user-card">
//                         <div className="user-card-header">
//                             <div className="user-avatar">
//                                 {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
//                             </div>
//                             <div className="user-status">
//                                 <span className="status-dot active"></span>
//                                 <span className="status-text">Active</span>
//                             </div>
//                         </div>

//                         <div className="user-info">
//                             <h3 className="user-name">{user.name}</h3>
//                             <p className="user-email">{user.email}</p>
//                             <div className={getRoleBadgeClass(user.role)}>
//                                 {getRoleDisplayName(user.role)}
//                             </div>
//                         </div>

//                         <div className="user-stats">
//                             <div className="stat-item">
//                                 <span className="stat-number">12</span>
//                                 <span className="stat-label">Orders</span>
//                             </div>
//                             <div className="stat-item">
//                                 <span className="stat-number">$1,240</span>
//                                 <span className="stat-label">Spent</span>
//                             </div>
//                             <div className="stat-item">
//                                 <span className="stat-number">4.8</span>
//                                 <span className="stat-label">Rating</span>
//                             </div>
//                         </div>

//                         <div className="user-actions">
//                             <button onClick={() => handleViewUser(user._id)} className="action-btn view-btn" title="View Profile">
//                                 <span className="btn-icon">👁️</span>
//                             </button>
//                             <button className="action-btn edit-btn" title="Edit User">
//                                 <span className="btn-icon">✏️</span>
//                             </button>
//                             <button 
//                                 className="action-btn delete-btn" 
//                                 title="Delete User"
//                                 onClick={() => handleDeleteUser(user.id, user.name)}
//                             >
//                                 <span className="btn-icon">🗑️</span>
//                             </button>
//                         </div>

//                         <div className="user-meta">
//                             <span className="join-date">
//                                 Joined: {new Date(user.createdAt || Date.now()).toLocaleDateString()}
//                             </span>
//                         </div>
//                     </div>
//                 ))}
//             </div>

//             {filteredUsers.length === 0 && (
//                 <div className="empty-state">
//                     <div className="empty-icon">👥</div>
//                     <h3>No users found</h3>
//                     <p>
//                         {searchTerm || roleFilter !== 'all' 
//                             ? 'Try adjusting your search or filter criteria'
//                             : 'No users available in the system'
//                         }
//                     </p>
//                     {(searchTerm || roleFilter !== 'all') && (
//                         <button 
//                             className="clear-filters-btn"
//                             onClick={() => {
//                                 setSearchTerm('');
//                                 setRoleFilter('all');
//                             }}
//                         >
//                             Clear Filters
//                         </button>
//                     )}
//                 </div>
//             )}

//             <div className="user-list-footer">
//                 <div className="pagination-info">
//                     <span>Showing {filteredUsers.length} of {users.length} users</span>
//                 </div>
//                 <div className="pagination-controls">
//                     <button className="pagination-btn" disabled>
//                         ← Previous
//                     </button>
//                     <span className="page-number">Page 1 of 1</span>
//                     <button className="pagination-btn" disabled>
//                         Next →
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default UserList;







