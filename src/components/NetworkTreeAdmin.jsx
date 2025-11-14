import React, { useState, useEffect } from "react";
import axios from "axios";
import "./css/NetworkTreeAdmin.css"; // create new CSS file

const NetworkTreeAdmin = ({ userId }) => {
  const [downline, setDownline] = useState([]);
  const [upline, setUpline] = useState([]);
  const [expanded, setExpanded] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadNetwork = async () => {
      try {
        const [resDown, resUp] = await Promise.all([
          axios.get(`${import.meta.env.VITE_API_URL}/users/downline/${userId}`),
          axios.get(`${import.meta.env.VITE_API_URL}/users/upline/${userId}`),
        ]);

        setDownline(resDown.data.downline || []);
        setUpline(resUp.data.upline || []);
      } catch (err) {
        console.log("Network load error:", err);
      } finally {
        setLoading(false);
      }
    };

    loadNetwork();
  }, [userId]);

  const toggle = (key) => {
    setExpanded(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const groupByLevel = (arr) => {
    return arr.reduce((acc, user, index) => {
      const level = index + 1;
      if (!acc[level]) acc[level] = [];
      acc[level].push(user);
      return acc;
    }, {});
  };

  const renderLevel = (grouped, type) => {
    return Object.keys(grouped).map(level => {
      const key = `${type}-${level}`;

      return (
        <div key={key} className="nta-level">
          <div className="nta-level-header" onClick={() => toggle(key)}>
            <span className="nta-label">
              Level {level} ({type})
            </span>
            <span className="nta-count">({grouped[level].length} users)</span>
            <span className="nta-arrow">{expanded[key] ? "▼" : "▶"}</span>
          </div>

          {expanded[key] && (
            <div className="nta-users">
              {grouped[level].map(u => (
                <div key={u._id} className="nta-node">
                  <div className="nta-avatar">{u.name?.charAt(0) || "U"}</div>
                  <div className="nta-info">
                    <div className="nta-name">{u.name}</div>
                    <div className="nta-email">{u.email}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      );
    });
  };

  if (loading) return <p>Loading network...</p>;

  const groupedUp = groupByLevel(upline);
  const groupedDown = groupByLevel(downline);

  return (
    <div className="nta-tree-container">
      {/* Upline */}
      <h3>Upline Tree</h3>
      {renderLevel(groupedUp, "upline")}

      {/* Current User */}
      <div className="nta-current-user">
        <div className="nta-node">
          <div className="nta-avatar main">U</div>
          <div className="nta-info">
            <div className="nta-name">Selected User</div>
            <div className="nta-email">Current Position</div>
          </div>
        </div>
      </div>

      {/* Downline */}
      <h3>Downline Tree</h3>
      {renderLevel(groupedDown, "downline")}
    </div>
  );
};

export default NetworkTreeAdmin;
