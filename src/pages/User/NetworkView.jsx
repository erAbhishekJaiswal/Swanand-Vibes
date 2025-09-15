// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "../../CssFiles/User/Network.css";
// import { getUserId } from "../../utills/authService";

// const NetworkView = () => {
//   const [downline, setDownline] = useState([]);
//   const [upline, setUpline] = useState([]);
//   const [viewMode, setViewMode] = useState("table"); // table | tree

//   const userId = getUserId();
//   useEffect(() => {
//     const fetchData = async () => {
//       const resDownline = await axios.get(`http://localhost:5000/api/users/downline/${userId}`);
//       const resUpline = await axios.get(`http://localhost:5000/api/users/upline/${userId}`);
//       setDownline(resDownline.data.downline);
//       setUpline(resUpline.data.upline);
//     };
//     fetchData();
//   }, [userId]);

//   return (
//     <div className="network-network-container">
//       <h2>My Network</h2>
//       <div className="network-view-toggle">
//         <button onClick={() => setViewMode("table")}>Table View</button>
//         <button onClick={() => setViewMode("tree")}>Tree View</button>
//       </div>

//       {viewMode === "table" ? (
//         <div className="network-table-view">
//           <h3>Upline</h3>
//           <table>
//             <thead>
//               <tr>
//                 <th>Level</th>
//                 <th>Name</th>
//                 <th>Email</th>
//               </tr>
//             </thead>
//             <tbody>
//               {upline.map((user, i) => (
//                 <tr key={user._id}>
//                   <td>{i + 1}</td>
//                   <td>{user.name}</td>
//                   <td>{user.email}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>

//           <h3>Downline</h3>
//           <table>
//             <thead>
//               <tr>
//                 <th>Level</th>
//                 <th>Name</th>
//                 <th>Email</th>
//               </tr>
//             </thead>
//             <tbody>
//               {downline.map((user, i) => (
//                 <tr key={user._id}>
//                   <td>{i + 1}</td>
//                   <td>{user.name}</td>
//                   <td>{user.email}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       ) : (
//         <div className="network-tree-view">
//           <h3>Tree Format</h3>
//           <div className="network-tree">
//             <div className="network-node main">{userId}</div>
//             <div className="network-children">
//               {downline.map((user) => (
//                 <div className="network-node" key={user._id}>
//                   {user.name} ({user.email})
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default NetworkView;








import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../CssFiles/User/Network.css";
import { getUserId } from "../../utills/authService";
import Spinner from "../../components/Spinner";

const NetworkView = () => {
  const [downline, setDownline] = useState([]);
  const [upline, setUpline] = useState([]);
  const [viewMode, setViewMode] = useState("table"); // table | tree | cards
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedLevels, setExpandedLevels] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

  const userId = getUserId();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const [resDownline, resUpline] = await Promise.all([
          axios.get(`https://swanand-vibes-backend.vercel.app/users/downline/${userId}`),
          axios.get(`https://swanand-vibes-backend.vercel.app/api/users/upline/${userId}`)
        ]);
        
        setDownline(resDownline.data.downline || []);
        setUpline(resUpline.data.upline || []);
      } catch (err) {
        setError("Failed to load network data. Please try again later.");
        console.error("Network data fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [userId]);

  const toggleLevel = (level) => {
    setExpandedLevels(prev => ({
      ...prev,
      [level]: !prev[level]
    }));
  };

  const filteredDownline = downline.filter(user =>
    user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredUpline = upline.filter(user =>
    user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderTable = (data, title) => (
    <div className="network-network-section">
      <h3 className="network-section-title">{title} ({data.length})</h3>
      <div className="network-table-container">
        <table className="network-network-table">
          <thead>
            <tr>
              <th>Level</th>
              <th>Name</th>
              <th>Email</th>
              <th>Join Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {data.map((user, index) => (
              <tr key={user._id || index} className="network-table-row">
                <td className="network-level-cell">{index + 1}</td>
                <td className="network-name-cell">
                  <div className="network-user-avatar">
                    {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                  {user.name || 'Unknown User'}
                </td>
                <td className="network-email-cell">{user.email || 'No email'}</td>
                <td className="network-date-cell">
                  {user.joinDate ? new Date(user.joinDate).toLocaleDateString() : 'N/A'}
                </td>
                <td className="network-status-cell">
                  <span className={`status-badge ${user.status || 'active'}`}>
                    {user.status || 'Active'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {data.length === 0 && (
          <div className="network-empty-state">
            <p>No {title.toLowerCase()} found</p>
          </div>
        )}
      </div>
    </div>
  );

  const renderTreeView = () => {
    const groupByLevel = (users) => {
      return users.reduce((acc, user, index) => {
        const level = index + 1;
        if (!acc[level]) acc[level] = [];
        acc[level].push(user);
        return acc;
      }, {});
    };

    const groupedUpline = groupByLevel(upline);
    const groupedDownline = groupByLevel(downline);

    return (
      <div className="network-tree-view-container">
        <div className="network-tree-structure">
          {/* Upline Tree */}
          {Object.keys(groupedUpline).reverse().map(level => (
            <div key={`upline-${level}`} className="network-tree-level">
              <div className="network-level-header" onClick={() => toggleLevel(`upline-${level}`)}>
                <span className="network-level-label">Level {level} (Upline)</span>
                <span className="network-toggle-icon">
                  {expandedLevels[`upline-${level}`] ? '▼' : '►'}
                </span>
                <span className="network-user-count">({groupedUpline[level].length} users)</span>
              </div>
              {expandedLevels[`upline-${level}`] && (
                <div className="network-level-users">
                  {groupedUpline[level].map(user => (
                    <div key={user._id} className="network-tree-node upline-node">
                      <div className="network-node-avatar">
                        {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                      </div>
                      <div className="network-node-info">
                        <div className="network-node-name">{user.name || 'Unknown User'}</div>
                        <div className="network-node-email">{user.email || 'No email'}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* Current User */}
          <div className="network-tree-level current-user-level">
            <div className="network-tree-node main-node">
              <div className="network-node-avatar main-avatar">
                {getUserId().charAt(0).toUpperCase()}
              </div>
              <div className="network-node-info">
                <div className="network-node-name">You</div>
                <div className="network-node-email">Current Position</div>
              </div>
            </div>
          </div>

          {/* Downline Tree */}
          {Object.keys(groupedDownline).map(level => (
            <div key={`downline-${level}`} className="network-tree-level">
              <div className="network-level-header" onClick={() => toggleLevel(`downline-${level}`)}>
                <span className="network-level-label">Level {level} (Downline)</span>
                <span className="network-toggle-icon">
                  {expandedLevels[`downline-${level}`] ? '▼' : '►'}
                </span>
                <span className="network-user-count">({groupedDownline[level].length} users)</span>
              </div>
              {expandedLevels[`downline-${level}`] && (
                <div className="network-level-users">
                  {groupedDownline[level].map(user => (
                    <div key={user._id} className="network-tree-node downline-node">
                      <div className="network-node-avatar">
                        {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                      </div>
                      <div className="network-node-info">
                        <div className="network-node-name">{user.name || 'Unknown User'}</div>
                        <div className="network-node-email">{user.email || 'No email'}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderCardView = () => (
    <div className="network-cards-view">
      <div className="network-network-section">
        <h3 className="network-section-title">Upline Network ({filteredUpline.length})</h3>
        <div className="network-cards-container">
          {filteredUpline.map((user, index) => (
            <div key={user._id} className="network-network-card">
              <div className="network-card-header">
                <div className="network-user-avatar card-avatar">
                  {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                </div>
                <div className="network-card-level">Level {index + 1}</div>
              </div>
              <div className="network-card-body">
                <h4 className="network-card-name">{user.name || 'Unknown User'}</h4>
                <p className="network-card-email">{user.email || 'No email'}</p>
                <div className="network-card-meta">
                  <span className="network-meta-item">
                    Joined: {user.joinDate ? new Date(user.joinDate).toLocaleDateString() : 'N/A'}
                  </span>
                </div>
              </div>
              <div className="network-card-footer">
                <span className={`status-badge ${user.status || 'active'}`}>
                  {user.status || 'Active'}
                </span>
              </div>
            </div>
          ))}
          {filteredUpline.length === 0 && (
            <div className="network-empty-card">
              <p>No upline connections</p>
            </div>
          )}
        </div>
      </div>

      <div className="network-network-section">
        <h3 className="network-section-title">Downline Network ({filteredDownline.length})</h3>
        <div className="network-cards-container">
          {filteredDownline.map((user, index) => (
            <div key={user._id} className="network-network-card">
              <div className="network-card-header">
                <div className="network-user-avatar card-avatar">
                  {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                </div>
                <div className="network-card-level">Level {index + 1}</div>
              </div>
              <div className="network-card-body">
                <h4 className="network-card-name">{user.name || 'Unknown User'}</h4>
                <p className="network-card-email">{user.email || 'No email'}</p>
                <div className="network-card-meta">
                  <span className="network-meta-item">
                    Joined: {user.joinDate ? new Date(user.joinDate).toLocaleDateString() : 'N/A'}
                  </span>
                </div>
              </div>
              <div className="network-card-footer">
                <span className={`status-badge ${user.status || 'active'}`}>
                  {user.status || 'Active'}
                </span>
              </div>
            </div>
          ))}
          {filteredDownline.length === 0 && (
            <div className="network-empty-card">
              <p>No downline connections</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
     <Spinner size="lg" />
    );
  }

  if (error) {
    return (
      <div className="network-network-container">
        <div className="network-error-container">
          <div className="network-error-icon">⚠️</div>
          <h3>Oops! Something went wrong</h3>
          <p>{error}</p>
          <button 
            className="network-retry-button"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="network-network-container">
      <div className="network-network-header">
        <h1 className="network-network-title">My Network</h1>
        <p className="network-network-subtitle">Manage and view your network connections</p>
      </div>

      <div className="network-network-controls">
        <div className="network-search-box">
          <input
            type="text"
            placeholder="🔍 Search network..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="network-search-input"
          />
        </div>

        <div className="network-view-toggle">
          <button 
            className={`network-toggle-btn ${viewMode === 'table' ? 'active' : ''}`}
            onClick={() => setViewMode("table")}
          >
            📊 Table
          </button>
          <button 
            className={`network-toggle-btn ${viewMode === 'tree' ? 'active' : ''}`}
            onClick={() => setViewMode("tree")}
          >
            🌳 Tree
          </button>
          <button 
            className={`network-toggle-btn ${viewMode === 'cards' ? 'active' : ''}`}
            onClick={() => setViewMode("cards")}
          >
            🃏 Cards
          </button>
        </div>
      </div>

      <div className="network-network-stats">
        <div className="network-stat-card">
          <div className="network-stat-value">{upline.length}</div>
          <div className="network-stat-label">Upline Members</div>
        </div>
        <div className="network-stat-card">
          <div className="network-stat-value">{downline.length}</div>
          <div className="network-stat-label">Downline Members</div>
        </div>
        <div className="network-stat-card">
          <div className="network-stat-value">{upline.length + downline.length}</div>
          <div className="network-stat-label">Total Network</div>
        </div>
      </div>

      <div className="network-network-content">
        {viewMode === "table" && (
          <>
            {renderTable(filteredUpline, "Upline Network")}
            {renderTable(filteredDownline, "Downline Network")}
          </>
        )}

        {viewMode === "tree" && renderTreeView()}

        {viewMode === "cards" && renderCardView()}
        
      <div className="busimessplan">
        <div className="level-plans">
           <section className="mlm-system">
         <div className="container">
           <h2 className="section-title">The 12-Level MLM Advantage</h2>
           <div className="mlm-content">
             <div className="mlm-visual">
               <div className="level-chart">
                 <div className="level level-1">
                   <div className='inner-level'>
                     <h3 className='inner-level-title'>Level 1</h3>
                     <p className='inner-level-para'>Direct Referrals or New Register</p>
                   </div>
                 </div>
                 <div className="connector"></div>
                 <div className="level level-2">
                   <div className='inner-level'>
                     <h3 className='inner-level-title'>Level 2</h3>
                     <p className='inner-level-para'>Indirect Referrals</p>
                   </div>
                 </div>
                 <div className="connector"></div>
                 <div className="level level-3">
                   <div className='inner-level'>
                     <h3 className='inner-level-title'>Level 3</h3>
                     <p className='inner-level-para'>Indirect Referrals</p>
                   </div>
                 </div>
                 <div className="connector"></div>
                 <div className="level level-4">
                   <div className='inner-level'>
                     <h3 className='inner-level-title'>Level 4</h3>
                     <p className='inner-level-para'>Indirect Referrals</p>
                   </div>
                 </div>
                 <div className="connector"></div>
                 <div className="level level-5">
                   <div className='inner-level'>
                     <h3 className='inner-level-title'>Level 5</h3>
                     <p className='inner-level-para'>Indirect Referrals</p>
                   </div>
                 </div>
                 <div className="connector"></div>
                 <div className="level level-6">
                   <div className='inner-level'>
                     <h3 className='inner-level-title'>Level 6</h3>
                     <p className='inner-level-para'>Indirect Referrals</p>
                   </div>
                 </div>
                 <div className="connector"></div>
                 <div className="level level-7">
                   <div className='inner-level'>
                     <h3 className='inner-level-title'>Level 7</h3>
                     <p className='inner-level-para'>Indirect Referrals</p>
                   </div>
                 </div>
                 <div className="connector"></div>
                 <div className="level level-8">
                   <div className='inner-level'>
                     <h3 className='inner-level-title'>Level 8</h3>
                     <p className='inner-level-para'>Indirect Referrals</p>
                   </div>
                 </div>
                 <div className="connector"></div>
                 <div className="level level-9">
                   <div className='inner-level'>
                     <h3 className='inner-level-title'>Level 9</h3>
                     <p className='inner-level-para'>Indirect Referrals</p>
                   </div>
                 </div>
                 <div className="connector"></div>
                 <div className="level level-10">
                   <div className='inner-level'>
                     <h3 className='inner-level-title'>Level 10</h3>
                     <p className='inner-level-para'>Indirect Referrals</p>
                   </div>
                 </div>
                 <div className="connector"></div>
                 <div className="level level-11">
                   <div className='inner-level'>
                     <h3 className='inner-level-title'>Level 11</h3>
                     <p className='inner-level-para'>Indirect Referrals</p>
                   </div>
                 </div>
                 <div className="connector"></div>
                 <div className="level level-12">
                   <div className='inner-level'>
                     <h3 className='inner-level-title'>Level 12</h3>
                     <p className='inner-level-para'>Indirect Referrals</p>
                   </div>
                 </div>
               </div>
             </div>
             <div className="mlm-info">
               <h3>Earn Across All Levels</h3>
               <p>
                 Our unique 12-level system allows you to earn commissions not just from your direct 
                 referrals, but from the entire network across all 12 levels. This creates exponential 
                 earning potential as your network grows.
               </p>
               <ul className="mlm-features">
                 <li>✅ Commission on personal sales</li>
                 <li>✅ Team override commissions</li>
                 <li>✅ Leadership bonuses</li>
                 <li>✅ Performance incentives</li>
                 <li>✅ Rank advancement rewards</li>
               </ul>
             </div>
           </div>
         </div>
       </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NetworkView;