import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../../CssFiles/Admin/user/UserList.css";
import { getAllUsers, deleteUser } from "../../../utills/apicall";
import Spinner from "../../../components/Spinner";
import { toast } from "react-hot-toast";

const UserList = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
    // Filters
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
  const [debouncedRoleFilter, setDebouncedRoleFilter] = useState(roleFilter);



  // Pagination
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
      setDebouncedRoleFilter(roleFilter);
    }, 500); // 500ms debounce time

    return () => {
      clearTimeout(handler); // Clean up
    };
  }, [searchTerm, roleFilter]);

  const fetchUsers = async () => {
    try {
      setLoading(true);

      // const params = {
      //   page,
      //   limit,
      //   search: searchTerm !== '' ? searchTerm : '',
      //   role: roleFilter !== 'all' ? roleFilter : ''};

      const params = {
        page,
        limit,
        search: debouncedSearchTerm !== "" ? debouncedSearchTerm : "",
        role: debouncedRoleFilter !== "all" ? debouncedRoleFilter : "",
      };

      const response = await getAllUsers(params);
      // console.log(response.data.data);
      const result = response.data;
      if (result.success) {
        setUsers(response.data.data);
        setTotalPages(response.data.totalPages);
      } else {
        setError("Failed to load users.");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      setError("Failed to load users. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   fetchUsers();
  // }, [page, searchTerm, roleFilter]);

  useEffect(() => {
    fetchUsers();
  }, [page, debouncedSearchTerm, debouncedRoleFilter]);

  const handleDeleteUser = async (userId, userName) => {
    if (window.confirm(`Are you sure you want to delete ${userName}?`)) {
      try {
        await deleteUser(userId);
        toast.success("User deleted successfully!");
        fetchUsers();
      } catch (error) {
        console.error("Error deleting user:", error);
        toast.error("Failed to delete user. Please try again.");
      }
    }
  };

  const getRoleBadgeClass = (role) => {
    switch (role) {
      case "admin":
        return "badge admin";
      case "moderator":
        return "badge moderator";
      case "user":
        return "badge user";
      default:
        return "badge";
    }
  };

  const getRoleDisplayName = (role) => {
    switch (role) {
      case "admin":
        return "Administrator";
      case "moderator":
        return "Moderator";
      case "user":
        return "User";
      default:
        return role;
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
          <button
            onClick={() => {
              setError(null);
              fetchUsers();
            }}
            className="retry-btn"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="user-list-container">
      <div className="user-list-header">
        <div className="header-content">
          <h2 className="user-list-title">User Management</h2>
          <p className="user-list-subtitle">
            Manage your system users and permissions
          </p>
        </div>
      </div>

      <div className="user-controls">
        <div className="search-box">
          <input
            type="text"
            placeholder="🔍 Search users..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setPage(1); // reset to page 1 on new search
            }}
            className="userserch-list search-input"
          />
        </div>
        <div className="filter-controls">
          <label htmlFor="role-filter">Filter by Role:</label>
          <select
            id="role-filter"
            value={roleFilter}
            onChange={(e) => {
              setRoleFilter(e.target.value);
              setPage(1); // reset to page 1 on new filter
            }}
            className="role-filter"
          >
            <option value="all">All Roles</option>
            <option value="admin">Administrators</option>
            <option value="user">Users</option>
          </select>
        </div>
      </div>

      <div className="requests-table-container">
        <table className="requests-table">
          <thead>
            <tr>
              <th>
                <div className="userlist-table-header">#</div>
              </th>
              <th>
                <div className="userlist-table-header">Name</div>
              </th>
              <th>
                <div className="userlist-table-header">Email</div>
              </th>
              <th>
                <div className="userlist-table-header">Role</div>
              </th>
              <th>
                <div className="userlist-table-header">Joined</div>
              </th>
              <th>
                <div className="userlist-table-header">Actions</div>
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <td>{(page - 1) * limit + index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <span className={getRoleBadgeClass(user.role)}>
                    {getRoleDisplayName(user.role)}
                  </span>
                </td>
                <td>
                  {new Date(user.createdAt || Date.now()).toLocaleDateString()}
                </td>
                <td className="action-buttons">
                  <button onClick={() => handleViewUser(user._id)} title="View">
                    👁️
                  </button>
                  <button
                    onClick={() => handleDeleteUser(user._id, user.name)}
                    title="Delete"
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="pagination">
          <button
            disabled={page === 1}
            onClick={() => setPage((prev) => prev - 1)}
            className="user-pagination-btn"
          >
            ⬅ Prev
          </button>
          <span className="user-pagination-text">
            Page {page} of {totalPages}
          </span>
          <button
            disabled={page === totalPages}
            onClick={() => setPage((prev) => prev + 1)}
            className="user-pagination-btn"
          >
            Next ➡
          </button>
        </div>
      )}

      {users.length === 0 && (
        <div className="empty-state">
          <h3>No users found</h3>
          <p>
            {searchTerm || roleFilter !== "all"
              ? "Try adjusting your search or filter criteria."
              : "No users available in the system."}
          </p>
          {(searchTerm || roleFilter !== "all") && (
            <button
              className="clear-filters-btn"
              onClick={() => {
                setSearchTerm("");
                setRoleFilter("all");
                setPage(1);
              }}
            >
              Clear Filters
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default UserList;