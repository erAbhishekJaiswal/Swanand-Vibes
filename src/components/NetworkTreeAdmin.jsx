import React, { useState, useEffect } from "react";
import axios from "axios";
import "./css/NetworkTreeAdmin.css";
import axiosInstance from "../utills/axiosInstance";
const NetworkTreeAdmin = ({ userId: initialUserId }) => {
  const [userId, setUserId] = useState(initialUserId);
  const [currentUser, setCurrentUser] = useState(null);
  const [downline, setDownline] = useState([]);
  const [upline, setUpline] = useState([]);
  const [expandedNodes, setExpandedNodes] = useState(new Set());
  const [loading, setLoading] = useState(true);

  /* ------------------------
      LOAD TREE DATA
  ------------------------- */
  useEffect(() => {
    const loadNetwork = async () => {
      setLoading(true);

      try {
        const [resUser, resDown, resUp] = await Promise.all([
          axiosInstance.get(`${import.meta.env.VITE_API_URL}/users/${userId}`),
          axiosInstance.get(`${import.meta.env.VITE_API_URL}/users/downline/${userId}`),
          axiosInstance.get(`${import.meta.env.VITE_API_URL}/users/upline/${userId}`),
        ]);

        const userData = resUser.data.user || resUser.data;
        const downlineData = resDown.data.downline || [];
        const uplineData = resUp.data.upline || [];

        // Calculate total downline count recursively
        const calculateTotalDownline = (users) => {
          let total = users.length;
          users.forEach(user => {
            if (user.downline && user.downline.length > 0) {
              total += calculateTotalDownline(user.downline);
            }
          });
          return total;
        };

        setCurrentUser({
          ...userData,
          totalDownline: calculateTotalDownline(downlineData)
        });
        setDownline(downlineData);
        setUpline(uplineData);
      } catch (err) {
        console.log("Network load error:", err);
      } finally {
        setLoading(false);
      }
    };

    loadNetwork();
  }, [userId]);

  /* ------------------------
      EXPAND / COLLAPSE
  ------------------------- */
  const toggleNode = (id) => {
    const newSet = new Set(expandedNodes);
    newSet.has(id) ? newSet.delete(id) : newSet.add(id);
    setExpandedNodes(newSet);
  };

  /* ------------------------
      NODE RENDERER
  ------------------------- */
  const renderNode = (node, level = 0, isLast = false) => {
    const nodeId = node._id;
    const hasChildren = node.downline?.length > 0;
    const isExpanded = expandedNodes.has(nodeId);
    const isCurrentUser = currentUser && currentUser._id === nodeId;

    return (
      <div className={`nta-node-wrapper level-${level}`} key={nodeId}>
        <div className="nta-node-connector">
          {level > 0 && <div className="nta-vertical-connector"></div>}
          {hasChildren && isExpanded && (
            <div className="nta-horizontal-connector"></div>
          )}
        </div>

        <div
          className={`nta-node ${isCurrentUser ? "current" : ""} ${
            isExpanded ? "expanded" : ""
          }`}
          onClick={(e) => {
            e.stopPropagation();
            if (!isCurrentUser) {
              setUserId(nodeId);
            }
          }}
        >
          <div className="nta-node-content">
            <div className="nta-avatar">
              {node.name?.charAt(0)?.toUpperCase() || "U"}
            </div>

            <div className="nta-info">
              <div className="nta-name">{node.name || "Unknown User"}</div>
              <div className="nta-email">{node.email}</div>
              <div className="nta-stats">
                <span className="nta-downline-count">
                  {node.totalDownline || 0} total
                </span>
                {hasChildren && (
                  <span className="nta-direct-count">
                    {node.downline.length} direct
                  </span>
                )}
              </div>
            </div>

            {hasChildren && (
              <div
                className="nta-expand-icon"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleNode(nodeId);
                }}
              >
                {isExpanded ? "−" : "+"}
              </div>
            )}
          </div>
        </div>

        {hasChildren && isExpanded && (
          <div className="nta-children-container">
            {node.downline.map((child, index) => 
              renderNode(child, level + 1, index === node.downline.length - 1)
            )}
          </div>
        )}
      </div>
    );
  };

  /* ------------------------
      RENDER UPLINE PATH
  ------------------------- */
  const renderUplinePath = () => {
    if (upline.length === 0) return null;

    return (
      <div className="nta-upline-path">
        <h3>Upline Path</h3>
        <div className="nta-upline-container">
          {upline.map((user, index) => (
            <div key={user._id} className="nta-upline-node">
              {renderNode(user)}
              {index < upline.length - 1 && (
                <div className="nta-upline-connector">
                  <div className="nta-connector-arrow">↓</div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  /* ------------------------
      CALCULATE TOTAL DOWNLINE
  ------------------------- */
  const calculateTotalDownline = (users) => {
    let total = users.length;
    users.forEach(user => {
      if (user.downline && user.downline.length > 0) {
        total += calculateTotalDownline(user.downline);
      }
    });
    return total;
  };

  const totalDownline = calculateTotalDownline(downline);

  /* ------------------------
      LOADING / ERROR
  ------------------------- */
  if (loading)
    return (
      <div className="nta-loading">
        <div className="nta-spinner"></div>
        <p>Loading network tree...</p>
      </div>
    );

  if (!currentUser)
    return (
      <div className="nta-error">
        <p>Failed to load user data</p>
      </div>
    );

  return (
    <div className="nta-tree-container">
      {/* HEADER */}
      <div className="nta-header">
        <h2>Network Tree</h2>
        <div className="nta-stats-summary">
          <div className="nta-stat-item">
            <span className="nta-stat-label">Total Downline:</span>
            <span className="nta-stat-value">{totalDownline}</span>
          </div>
          <div className="nta-stat-item">
            <span className="nta-stat-label">Direct Downline:</span>
            <span className="nta-stat-value">{downline.length}</span>
          </div>
          <div className="nta-stat-item">
            <span className="nta-stat-label">Upline Levels:</span>
            <span className="nta-stat-value">{upline.length}</span>
          </div>
        </div>
      </div>

      <div className="nta-tree">
        {/* UPLINE PATH */}
        {renderUplinePath()}

        {/* CURRENT USER */}
        <div className="nta-current-user-section">
          <div className="nta-current-user-highlight">
            {renderNode({ ...currentUser, downline, totalDownline })}
          </div>
        </div>

        {/* DOWNLINE TREE */}
        <div className="nta-downline-section">
          <h3>Downline Network ({totalDownline} members)</h3>
          {downline.length > 0 ? (
            <div className="nta-downline-tree">
              {downline.map((node, index) => 
                renderNode(node, 0, index === downline.length - 1)
              )}
            </div>
          ) : (
            <div className="nta-no-downline">
              <p>No downline members found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NetworkTreeAdmin;
