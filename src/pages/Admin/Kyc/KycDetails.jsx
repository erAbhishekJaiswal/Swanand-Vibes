// import axios from 'axios';
// import React, { useEffect, useState } from 'react'
// import { useParams } from 'react-router-dom';
// import '../../../CssFiles/Admin/kyc/KycDetails.css';
// import { getKycById, approveKyc, rejectKyc } from '../../../utills/apicall';
// import {toast} from 'react-hot-toast';
// import Spinner from '../../../components/Spinner';

// const KycDetails = () => {
//   const [kycdata, setKycData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [showApproveModal, setShowApproveModal] = useState(false);
//   const [showRejectModal, setShowRejectModal] = useState(false);
//   const [actionLoading, setActionLoading] = useState(false);

//   const formatDate = (dateString) => new Date(dateString).toLocaleDateString();
//   const { id } = useParams();

//   useEffect( () => {
//     const fetchData = async () => {
//       setLoading(true);
//       try {
//         const res = await getKycById(id);
//         // console.log(res.data);
//         setKycData(res.data);
//       } catch (error) {
//         console.error('Error fetching KYC data:', error);
//         toast.error('Failed to load KYC details');
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchData();
//   }, [id]);

//   const handleApprove = async () => {
//     setActionLoading(true);
//     try {
//       const response = await approveKyc(id);
//       // console.log(response.data);
//       setKycData(prev => ({ ...prev, status: 'approved' }));
//       toast.success('KYC Approved Successfully');
//       setShowApproveModal(false);
//     } catch (error) {
//       console.error('Error approving KYC:', error);
//       toast.error('Failed to approve KYC');
//     } finally {
//       setActionLoading(false);
//     }
//   };

//   const handleReject = async () => {
//     setActionLoading(true);
//     try {
//       const response = await rejectKyc(id);
//       // console.log(response.data);
//       setKycData(prev => ({ ...prev, status: 'rejected' }));
//       toast.success('KYC Rejected Successfully');
//       setShowRejectModal(false);
//     } catch (error) {
//       console.error('Error rejecting KYC:', error);
//       toast.error('Failed to reject KYC');
//     } finally {
//       setActionLoading(false);
//     }
//   };

//   if (loading) return <Spinner size="lg" />;

//   return (
//     <div className="kyc-details-container">
//       {/* Approve Confirmation Modal */}
//       {showApproveModal && (
//         <div className="modal-overlay">
//           <div className="confirmation-modal">
//             <div className="modal-header">
//               <h3>Confirm Approval</h3>
//               <button 
//                 className="modal-close"
//                 onClick={() => setShowApproveModal(false)}
//                 disabled={actionLoading}
//               >
//                 &times;
//               </button>
//             </div>
//             <div className="modal-content">
//               <div className="modal-icon approve">
//                 <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                   <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" 
//                         stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//                 </svg>
//               </div>
//               <p>Are you sure you want to approve this KYC application?</p>
//               <p className="modal-subtext">This action cannot be undone.</p>
//             </div>
//             <div className="modal-actions">
//               <button 
//                 className="modal-btn cancel"
//                 onClick={() => setShowApproveModal(false)}
//                 disabled={actionLoading}
//               >
//                 Cancel
//               </button>
//               <button 
//                 className="modal-btn confirm approve"
//                 onClick={handleApprove}
//                 disabled={actionLoading}
//               >
//                 {actionLoading ? (
//                   <>
//                     <Spinner size="sm" type="ring" color="light" />
//                     Approving...
//                   </>
//                 ) : (
//                   'Confirm Approval'
//                 )}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Reject Confirmation Modal */}
//       {showRejectModal && (
//         <div className="modal-overlay">
//           <div className="confirmation-modal">
//             <div className="modal-header">
//               <h3>Confirm Rejection</h3>
//               <button 
//                 className="modal-close"
//                 onClick={() => setShowRejectModal(false)}
//                 disabled={actionLoading}
//               >
//                 &times;
//               </button>
//             </div>
//             <div className="modal-content">
//               <div className="modal-icon reject">
//                 <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                   <path d="M10 14L12 12M12 12L14 10M12 12L10 10M12 12L14 14M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" 
//                         stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//                 </svg>
//               </div>
//               <p>Are you sure you want to reject this KYC application?</p>
//               <p className="modal-subtext">This action cannot be undone.</p>
//             </div>
//             <div className="modal-actions">
//               <button 
//                 className="modal-btn cancel"
//                 onClick={() => setShowRejectModal(false)}
//                 disabled={actionLoading}
//               >
//                 Cancel
//               </button>
//               <button 
//                 className="modal-btn confirm reject"
//                 onClick={handleReject}
//                 disabled={actionLoading}
//               >
//                 {actionLoading ? (
//                   <>
//                     <Spinner size="sm" type="ring" color="light" />
//                     Rejecting...
//                   </>
//                 ) : (
//                   'Confirm Rejection'
//                 )}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       <h1 className="page-title">KYC Details</h1>
      
//       <div className="kyc-header">
//         <h2 className="kyc-user-name">{kycdata?.userId?.name} - {kycdata?.userId?.email}</h2>
//         <p className="kyc-status">
//           Status: <span className={`status ${kycdata?.status}`}>
//             {kycdata?.status === "approved" ? "✅ Approved" : kycdata?.status === "rejected" ? "❌ Rejected" : "⏳ Pending"}
//           </span>
//         </p>
//       </div>

//       <div className="kyc-content">
//         <div className="kyc-section">
//           <h3 className="section-title">Aadhaar Details</h3>
//           <p><strong>Aadhaar Number:</strong> {kycdata?.adharNumber}</p>
//           <p><strong>Name on Aadhaar:</strong> {kycdata?.adharName}</p>
//           <div className="image-container">
//             <img src={kycdata?.adharImage} alt="Aadhaar" className="image-preview" />
//           </div>
//         </div>

//         <div className="kyc-section">
//           <h3 className="section-title">PAN Details</h3>
//           <p><strong>PAN Number:</strong> {kycdata?.panNumber}</p>
//           <div className="image-container">
//             <img src={kycdata?.panImage} alt="PAN Card" className="image-preview" />
//           </div>
//         </div>

//         <div className="kyc-section">
//           <h3 className="section-title">Bank Details</h3>
//           <p><strong>Bank Name:</strong> {kycdata?.bankName}</p>
//           <p><strong>Bank Account:</strong> {kycdata?.bankAccount}</p>
//           <p><strong>IFSC Code:</strong> {kycdata?.ifscCode}</p>
//           <div className="image-container">
//             <img src={kycdata?.bankDocImage} alt="Bank Proof" className="image-preview" />
//           </div>
//         </div>
        
//         <div className="kyc-footer">
//           <p><strong>Created At:</strong> {formatDate(kycdata?.createdAt)}</p>
//           <p><strong>Last Updated:</strong> {formatDate(kycdata?.updatedAt)}</p>
//         </div>
        
//         {kycdata?.status === 'pending' && (
//           <div className='approve-reject-buttons'>
//             <button 
//               onClick={() => setShowApproveModal(true)} 
//               className='approve-button'
//             >
//               <span className="btn-icon">✅</span>
//               Approve KYC
//             </button>
//             <button 
//               onClick={() => setShowRejectModal(true)} 
//               className='reject-button'
//             >
//               <span className="btn-icon">❌</span>
//               Reject KYC
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default KycDetails;








import React, { useState, useEffect } from "react";
import "../../../CssFiles/Admin/KYCDetails.css";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import Spinner from "../../../components/Spinner";
import {
  getKycById,
  approveKyc,
  rejectKyc,
  // requestChangesKyc,
} from "../../../utills/apicall";

const KYCDetails = () => {
  const { id } = useParams();
  const [kycData, setKycData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [notes, setNotes] = useState("");
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [zoomedImage, setZoomedImage] = useState(null); // For image zoom modal

  // Fetch KYC Data

      const fetchKYCData = async () => {
      try {
        setLoading(true);
        const response = await getKycById(id);
        setKycData(response.data);
        setNotes(response.data?.verificationNotes || "");
        toast.success("KYC details fetched successfully");
        setLoading(false);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch KYC details");
      }
    };


  useEffect(() => {
    fetchKYCData(id);
  }, [id]);

  

  // Helper functions
  const formatDate = (date) =>
    new Date(date).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  const handleApprove = async () => {
    setActionLoading(true);
    try {
      const response = await approveKyc(id, { notes });
      setKycData((prev) => ({ ...prev, status: "approved" }));
      toast.success(response?.data?.message || "KYC Approved Successfully");
      setShowApproveModal(false);
    } catch (error) {
      toast.error("Failed to approve KYC");
      console.error(error);
    } finally {
      setActionLoading(false);
    }
  };

  const handleReject = async () => {
    setActionLoading(true);
    try {
      const response = await rejectKyc(id, { notes });
      setKycData((prev) => ({ ...prev, status: "rejected" }));
      toast.success(response?.data?.message || "KYC Rejected Successfully");
      setShowRejectModal(false);
    } catch (error) {
      toast.error("Failed to reject KYC");
      console.error(error);
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) return <Spinner size="lg" />;

  if (!kycData)
    return (
      <div className="kyc-error">
        <h3>KYC Not Found</h3>
        <p>Unable to fetch KYC details.</p>
      </div>
    );

  const { userId: user } = kycData;

  const documents = [
    { title: "📷 Passport Photo", src: kycData.passportPhoto },
    { title: "🆔 Aadhaar Card", src: kycData.adharImage },
    { title: "💳 PAN Card", src: kycData.panImage },
    { title: "🏦 Bank Document", src: kycData.bankDocImage },
  ];

  return (
    <div className="kyc-container">
      {/* Header */}
      <header className="kyc-header">
        <div className="kyc-user-info">
          <div className="kyc-avatar">👤</div>
          <div>
            <h1>{user?.name}</h1>
            <p>{user?.email}</p>
          </div>
        </div>
        <div className="kyc-status-info">
          <span
            className={`kyc-status-badge ${kycData.status}`}
            style={{
              color:
                kycData.status === "approved"
                  ? "var(--success)"
                  : kycData.status === "rejected"
                  ? "var(--danger)"
                  : "var(--warning)",
            }}
          >
            {kycData.status === "approved"
              ? "✅ Approved"
              : kycData.status === "rejected"
              ? "❌ Rejected"
              : "⏳ Pending Review"}
          </span>
          <p>Submitted: {formatDate(kycData.createdAt)}</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="kyc-main-content">
        {/* Documents */}
        <section className="kyc-documents">
          <h2>KYC Documents</h2>
          <div className="kyc-documents-grid">
            {documents.map((doc, idx) => (
              <div
                key={idx}
                className="kyc-document-card"
                onClick={() => setZoomedImage(doc.src)}
              >
                <h3>{doc.title}</h3>
                <img src={doc.src} alt={doc.title} />
                <div className="kyc-zoom-overlay">🔍 View</div>
              </div>
            ))}
          </div>
        </section>

        {/* Actions */}
        {kycData.status === "pending" && (
          <section className="kyc-actions">
            <h3>Verification Actions</h3>
            {/* <textarea
              placeholder="Add verification notes..."
              rows="4"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            /> */}
            <div className="kyc-action-buttons">
              <button
                onClick={() => setShowApproveModal(true)}
                className="kyc-btn-approve"
              >
                ✅ Approve
              </button>
              {/* <button
                onClick={() => setShowRequestModal(true)}
                className="kyc-btn-request"
              >
                📝 Request Changes
              </button> */}
              <button
                onClick={() => setShowRejectModal(true)}
                className="kyc-btn-reject"
              >
                ❌ Reject
              </button>
            </div>
          </section>
        )}
      </main>

      {/* Image Zoom Modal */}
      {zoomedImage && (
        <div
          className="kyc-zoom-modal"
          onClick={() => setZoomedImage(null)}
        >
          <img src={zoomedImage} alt="Zoomed Document" />
        </div>
      )}

      {/* Confirmation Modals */}
      {showApproveModal && (
        <ConfirmationModal
          title="Approve KYC"
          message="Are you sure you want to approve this KYC?"
          onCancel={() => setShowApproveModal(false)}
          onConfirm={handleApprove}
          loading={actionLoading}
          type="approve"
        />
      )}
      {showRejectModal && (
        <ConfirmationModal
          title="Reject KYC"
          message="Are you sure you want to reject this KYC?"
          onCancel={() => setShowRejectModal(false)}
          onConfirm={handleReject}
          loading={actionLoading}
          type="reject"
        />
      )}
      {/* {showRequestModal && (
        <ConfirmationModal
          title="Request Changes"
          message="Send a change request to the user?"
          onCancel={() => setShowRequestModal(false)}
          onConfirm={handleRequestChanges}
          loading={actionLoading}
          type="request"
        />
      )} */}
    </div>
  );
};

// Confirmation Modal
const ConfirmationModal = ({ title, message, onCancel, onConfirm, loading, type }) => (
  <div className="kyc-modal-overlay">
    <div className="kyc-confirmation-modal">
      <div className="kyc-modal-header">
        <h3>{title}</h3>
        <button onClick={onCancel} disabled={loading}>
          &times;
        </button>
      </div>
      <div className="kyc-modal-content">
        <p>{message}</p>
        <p className="kyc-modal-subtext">This action cannot be undone.</p>
      </div>
      <div className="kyc-modal-actions">
        <button
          onClick={onCancel}
          disabled={loading}
          className="kyc-modal-btn cancel"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          disabled={loading}
          className={`kyc-modal-btn confirm ${type}`}
        >
          {loading ? "Processing..." : "Confirm"}
        </button>
      </div>
    </div>
  </div>
);

export default KYCDetails;











// import React, { useState, useEffect } from "react";
// import "../../../CssFiles/Admin/KYCDetails.css";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import { toast } from "react-hot-toast";
// import Spinner from "../../../components/Spinner";

// const KYCDetails = () => {
//   const { id } = useParams();
//   const [kycData, setKycData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [selectedDocument, setSelectedDocument] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [actionLoading, setActionLoading] = useState(false);
//   const [notes, setNotes] = useState("");
//   const [showNotes, setShowNotes] = useState(false);
//   const [error, setError] = useState(null);

//   // Fetch KYC data from API
//   useEffect(() => {
//     const fetchKYCData = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const response = await axios.get(`http://localhost:5000/user/kyc/${id}`);
//         console.log(response);
//         // if (!response.ok) throw new Error("Failed to fetch KYC data");
//         // const data = await response.json();
//         toast.success("KYC details fetched successfully");
//         setKycData(response.data);
//         setNotes(response.data.verificationNotes || "");
//       } catch (err) {
//         console.error(err);
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchKYCData();
//   }, [id]);

//   // Utility functions
//   const getStatusInfo = (status) => {
//     const statusMap = {
//       pending: { label: "Pending Review", color: "var(--warning)", bgColor: "rgba(237, 137, 54, 0.1)", icon: "⏳" },
//       approved: { label: "Approved", color: "var(--success)", bgColor: "rgba(72, 187, 120, 0.1)", icon: "✅" },
//       rejected: { label: "Rejected", color: "var(--danger)", bgColor: "rgba(245, 101, 101, 0.1)", icon: "❌" },
//     };
//     return statusMap[status] || statusMap.pending;
//   };

//   const handleDocumentClick = (type, url) => {
//     setSelectedDocument({ type, url });
//     setIsModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setSelectedDocument(null);
//     setIsModalOpen(false);
//   };

//   const handleStatusUpdate = async (newStatus, notes = "") => {
//     setActionLoading(true);
//     try {
//       // Call your API to update status here
//       // await fetch(`http://localhost:5000/user/kyc/${kycId}`, { method: 'PUT', body: JSON.stringify({ status: newStatus, verificationNotes: notes }) })

//       setKycData((prev) => ({
//         ...prev,
//         status: newStatus,
//         verificationNotes: notes,
//         updatedAt: new Date().toISOString(),
//         history: [
//           ...(prev.history || []),
//           { status: newStatus, timestamp: new Date().toISOString(), note: notes || `Status changed to ${newStatus}` },
//         ],
//       }));
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setActionLoading(false);
//     }
//   };

//   const handleApprove = () => handleStatusUpdate("approved", notes);
//   const handleReject = () => {
//     if (!notes.trim()) return setShowNotes(true);
//     handleStatusUpdate("rejected", notes);
//   };
//   const handleRequestChanges = () => {
//     if (!notes.trim()) return setShowNotes(true);
//     handleStatusUpdate("pending", notes);
//   };

//   const getStatusColor = (status) => {
//     const colors = { pending: "var(--warning)", approved: "var(--success)", rejected: "var(--danger)" };
//     return colors[status] || "var(--light-text-secondary)";
//   };

//   const getStatusIcon = (status) => {
//     const icons = { pending: "⏳", approved: "✅", rejected: "❌" };
//     return icons[status] || "📝";
//   };

//   if (loading) {
//     return (
//       <div className="kyc-details-loading">
//         <div className="loading-spinner"></div>
//         <p>Loading KYC details...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="kyc-details-error">
//         <div className="error-icon">❌</div>
//         <h3>Error</h3>
//         <p>{error}</p>
//       </div>
//     );
//   }

//   if (!kycData) {
//     return (
//       <div className="kyc-details-error">
//         <div className="error-icon">❌</div>
//         <h3>KYC Not Found</h3>
//         <p>The requested KYC details could not be loaded.</p>
//       </div>
//     );
//   }

//   const { userId: user, status, createdAt, history = [] } = kycData;
//   const statusInfo = getStatusInfo(status);
//   const formattedDate = new Date(createdAt).toLocaleString("en-IN", {
//     day: "numeric",
//     month: "long",
//     year: "numeric",
//     hour: "2-digit",
//     minute: "2-digit",
//   });

//   const documents = [
//     { type: "passport", title: "Passport Photo", description: "Recent passport-sized photograph", image: kycData.passportPhoto, icon: "📷" },
//     { type: "aadhar", title: "Aadhar Card", description: `Number: ${kycData.adharNumber}`, subtitle: `Name: ${kycData.adharName}`, image: kycData.adharImage, icon: "🆔" },
//     { type: "pan", title: "PAN Card", description: `Number: ${kycData.panNumber}`, image: kycData.panImage, icon: "💳" },
//     { type: "bank", title: "Bank Details", description: `${kycData.bankName} • ${kycData.bankAccount}`, subtitle: `IFSC: ${kycData.ifscCode}`, image: kycData.bankDocImage, icon: "🏦" },
//   ];

//   const sortedHistory = [...history].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

//   return (
//     <div className="kyc-details">
//       {/* HEADER */}
//       <header className="kyc-header">
//         <div className="kyc-header__user">
//           <div className="kyc-header__avatar">👤</div>
//           <div className="kyc-header__user-info">
//             <h1 className="kyc-header__name">{user.name}</h1>
//             <p className="kyc-header__contact">{user.email}</p>
//           </div>
//         </div>

//         <div className="kyc-header__status">
//           <div
//             className="status-badge"
//             style={{ color: statusInfo.color, backgroundColor: statusInfo.bgColor, borderColor: statusInfo.color }}
//           >
//             <span className="status-badge__icon">{statusInfo.icon}</span>
//             <span className="status-badge__label">{statusInfo.label}</span>
//           </div>
//           <div className="submission-info">
//             <span className="submission-info__label">Submitted on:</span>
//             <span className="submission-info__date">{formattedDate}</span>
//           </div>
//         </div>
//       </header>

//       {/* MAIN CONTENT */}
//       <div className="kyc-details__content">
//         {/* DOCUMENTS */}
//         <section className="document-viewer">
//           <h2>KYC Documents</h2>
//           <div className="documents-grid">
//             {documents.map((doc) => (
//               <div key={doc.type} className="document-card" onClick={() => handleDocumentClick(doc.type, doc.image)}>
//                 <div className="document-card__preview">
//                   <img src={doc.image} alt={doc.title} />
//                   <div className="document-card__overlay">
//                     <button>🔍 View Full Size</button>
//                   </div>
//                 </div>
//                 <div className="document-card__content">
//                   <h3>{doc.title}</h3>
//                   <p>{doc.description}</p>
//                   {doc.subtitle && <p>{doc.subtitle}</p>}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </section>

//         {/* HISTORY */}
//         <section className="status-history">
//           <h3>Verification History</h3>
//           <div className="status-timeline">
//             {sortedHistory.map((entry, index) => (
//               <div key={index} className="timeline-item">
//                 <div className="timeline-item__dot" style={{ backgroundColor: getStatusColor(entry.status) }}>
//                   {getStatusIcon(entry.status)}
//                 </div>
//                 <div className="timeline-item__content">
//                   <strong style={{ color: getStatusColor(entry.status) }}>{entry.status.toUpperCase()}</strong>
//                   <p>{entry.note}</p>
//                   <span>{new Date(entry.timestamp).toLocaleString("en-IN")}</span>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </section>

//         {/* ACTIONS */}
//         <aside className="kyc-details__sidebar">
//           <section className="action-panel">
//             <h3>Verification Actions</h3>
//             <p style={{ color: getStatusColor(status) }}>Current: {status.toUpperCase()}</p>

//             <textarea
//               value={notes}
//               onChange={(e) => setNotes(e.target.value)}
//               placeholder="Add verification notes..."
//               rows="4"
//             />

//             <div className="action-buttons">
//               <button onClick={handleApprove} disabled={actionLoading || status === "approved"}>
//                 ✅ Approve
//               </button>
//               <button onClick={handleRequestChanges} disabled={actionLoading || !notes.trim()}>
//                 📝 Request Changes
//               </button>
//               <button onClick={handleReject} disabled={actionLoading || !notes.trim()}>
//                 ❌ Reject
//               </button>
//             </div>
//           </section>
//         </aside>
//       </div>

//       {/* MODAL */}
//       {isModalOpen && selectedDocument && (
//         <div className="document-modal" onClick={handleCloseModal}>
//           <div className="document-modal__content">
//             <div className="document-modal__header">
//               <h2>{selectedDocument.type.toUpperCase()}</h2>
//               <button onClick={handleCloseModal}>✕</button>
//             </div>
//             <img src={selectedDocument.url} alt={selectedDocument.type} className="document-modal__img" />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default KYCDetails;








// KYCDetails.js
// import React, { useState, useEffect } from "react";
// import "../../../CssFiles/Admin/KYCDetails.css";

// const KYCDetails = ({ kycId }) => {
//   const [kycData, setKycData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [selectedDocument, setSelectedDocument] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [actionLoading, setActionLoading] = useState(false);
//   const [notes, setNotes] = useState("");
//   const [showNotes, setShowNotes] = useState(false);

//   // Fetch mock KYC data
//   useEffect(() => {
//     const fetchKYCData = async () => {
//       setLoading(true);
//       await new Promise((resolve) => setTimeout(resolve, 1000));

//       const mockKYCData = {
//         _id: kycId,
//         userId: {
//           _id: "507f1f77bcf86cd799439011",
//           name: "Rajesh Kumar",
//           email: "rajesh.kumar@example.com",
//           phone: "+91 9876543210",
//           profileImage: "👨‍💼",
//         },
//         passportPhoto: "/images/passport.jpg",
//         adharNumber: "1234 5678 9012",
//         adharName: "Rajesh Kumar",
//         adharImage: "/images/aadhar.jpg",
//         panNumber: "ABCDE1234F",
//         panImage: "/images/pan.jpg",
//         bankName: "State Bank of India",
//         bankAccount: "12345678901234",
//         ifscCode: "SBIN0001234",
//         bankDocImage: "/images/bank.jpg",
//         status: "pending",
//         createdAt: "2024-01-15T10:30:00.000Z",
//         updatedAt: "2024-01-15T10:30:00.000Z",
//         verificationNotes: "",
//         history: [
//           {
//             status: "pending",
//             timestamp: "2024-01-15T10:30:00.000Z",
//             note: "KYC submission received",
//           },
//         ],
//       };

//       setKycData(mockKYCData);
//       setNotes(mockKYCData.verificationNotes || "");
//       setLoading(false);
//     };

//     fetchKYCData();
//   }, [kycId]);

//   // Utility: Status mapping
//   const getStatusInfo = (status) => {
//     const statusMap = {
//       pending: {
//         label: "Pending Review",
//         color: "var(--warning)",
//         bgColor: "rgba(237, 137, 54, 0.1)",
//         icon: "⏳",
//       },
//       approved: {
//         label: "Approved",
//         color: "var(--success)",
//         bgColor: "rgba(72, 187, 120, 0.1)",
//         icon: "✅",
//       },
//       rejected: {
//         label: "Rejected",
//         color: "var(--danger)",
//         bgColor: "rgba(245, 101, 101, 0.1)",
//         icon: "❌",
//       },
//     };
//     return statusMap[status] || statusMap.pending;
//   };

//   const handleDocumentClick = (type, url) => {
//     setSelectedDocument({ type, url });
//     setIsModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setSelectedDocument(null);
//     setIsModalOpen(false);
//   };

//   const handleStatusUpdate = async (newStatus, notes = "") => {
//     setActionLoading(true);
//     await new Promise((resolve) => setTimeout(resolve, 1000));

//     setKycData((prev) => ({
//       ...prev,
//       status: newStatus,
//       verificationNotes: notes,
//       updatedAt: new Date().toISOString(),
//       history: [
//         ...prev.history,
//         {
//           status: newStatus,
//           timestamp: new Date().toISOString(),
//           note: notes || `Status changed to ${newStatus}`,
//         },
//       ],
//     }));

//     setActionLoading(false);
//   };

//   const handleApprove = () => handleStatusUpdate("approved", notes);
//   const handleReject = () => {
//     if (!notes.trim()) return setShowNotes(true);
//     handleStatusUpdate("rejected", notes);
//   };
//   const handleRequestChanges = () => {
//     if (!notes.trim()) return setShowNotes(true);
//     handleStatusUpdate("pending", notes);
//   };

//   const getStatusColor = (status) => {
//     const colors = {
//       pending: "var(--warning)",
//       approved: "var(--success)",
//       rejected: "var(--danger)",
//     };
//     return colors[status] || "var(--light-text-secondary)";
//   };

//   const getStatusIcon = (status) => {
//     const icons = {
//       pending: "⏳",
//       approved: "✅",
//       rejected: "❌",
//     };
//     return icons[status] || "📝";
//   };

//   const getDocumentStatus = () => "verified";

//   if (loading) {
//     return (
//       <div className="kyc-details-loading">
//         <div className="loading-spinner"></div>
//         <p>Loading KYC details...</p>
//       </div>
//     );
//   }

//   if (!kycData) {
//     return (
//       <div className="kyc-details-error">
//         <div className="error-icon">❌</div>
//         <h3>KYC Not Found</h3>
//         <p>The requested KYC details could not be loaded.</p>
//       </div>
//     );
//   }

//   const { userId: user, status, createdAt, history } = kycData;
//   const statusInfo = getStatusInfo(status);
//   const formattedDate = new Date(createdAt).toLocaleString("en-IN", {
//     day: "numeric",
//     month: "long",
//     year: "numeric",
//     hour: "2-digit",
//     minute: "2-digit",
//   });

//   const documents = [
//     {
//       type: "passport",
//       title: "Passport Photo",
//       description: "Recent passport-sized photograph",
//       image: kycData.passportPhoto,
//       icon: "📷",
//     },
//     {
//       type: "aadhar",
//       title: "Aadhar Card",
//       description: `Number: ${kycData.adharNumber}`,
//       subtitle: `Name: ${kycData.adharName}`,
//       image: kycData.adharImage,
//       icon: "🆔",
//     },
//     {
//       type: "pan",
//       title: "PAN Card",
//       description: `Number: ${kycData.panNumber}`,
//       image: kycData.panImage,
//       icon: "💳",
//     },
//     {
//       type: "bank",
//       title: "Bank Details",
//       description: `${kycData.bankName} • ${kycData.bankAccount}`,
//       subtitle: `IFSC: ${kycData.ifscCode}`,
//       image: kycData.bankDocImage,
//       icon: "🏦",
//     },
//   ];

//   const sortedHistory = [...history].sort(
//     (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
//   );

//   return (
//     <div className="kyc-details">
//       {/* HEADER */}
//       <header className="kyc-header">
//         <div className="kyc-header__user">
//           <div className="kyc-header__avatar">{user.profileImage}</div>
//           <div className="kyc-header__user-info">
//             <h1 className="kyc-header__name">{user.name}</h1>
//             <p className="kyc-header__contact">
//               {user.email} • {user.phone}
//             </p>
//           </div>
//         </div>

//         <div className="kyc-header__status">
//           <div
//             className="status-badge"
//             style={{
//               color: statusInfo.color,
//               backgroundColor: statusInfo.bgColor,
//               borderColor: statusInfo.color,
//             }}
//           >
//             <span className="status-badge__icon">{statusInfo.icon}</span>
//             <span className="status-badge__label">{statusInfo.label}</span>
//           </div>
//           <div className="submission-info">
//             <span className="submission-info__label">Submitted on:</span>
//             <span className="submission-info__date">{formattedDate}</span>
//           </div>
//         </div>
//       </header>

//       {/* MAIN CONTENT */}
//       <div className="kyc-details__content">
//         {/* DOCUMENTS */}
//         <section className="document-viewer">
//           <h2>KYC Documents</h2>
//           <div className="documents-grid">
//             {documents.map((doc) => (
//               <div
//                 key={doc.type}
//                 className="document-card"
//                 onClick={() => handleDocumentClick(doc.type, doc.image)}
//               >
//                 <div className="document-card__preview">
//                   <img src={doc.image} alt={doc.title} />
//                   <div className="document-card__overlay">
//                     <button>🔍 View Full Size</button>
//                   </div>
//                 </div>
//                 <div className="document-card__content">
//                   <h3>{doc.title}</h3>
//                   <p>{doc.description}</p>
//                   {doc.subtitle && <p>{doc.subtitle}</p>}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </section>

//         {/* HISTORY */}
//         <section className="status-history">
//           <h3>Verification History</h3>
//           <div className="status-timeline">
//             {sortedHistory.map((entry, index) => (
//               <div key={index} className="timeline-item">
//                 <div
//                   className="timeline-item__dot"
//                   style={{ backgroundColor: getStatusColor(entry.status) }}
//                 >
//                   {getStatusIcon(entry.status)}
//                 </div>
//                 <div className="timeline-item__content">
//                   <strong style={{ color: getStatusColor(entry.status) }}>
//                     {entry.status.toUpperCase()}
//                   </strong>
//                   <p>{entry.note}</p>
//                   <span>
//                     {new Date(entry.timestamp).toLocaleString("en-IN")}
//                   </span>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </section>

//         {/* ACTIONS */}
//         <aside className="kyc-details__sidebar">
//           <section className="action-panel">
//             <h3>Verification Actions</h3>
//             <p style={{ color: getStatusColor(status) }}>
//               Current: {status.toUpperCase()}
//             </p>

//             <textarea
//               value={notes}
//               onChange={(e) => setNotes(e.target.value)}
//               placeholder="Add verification notes..."
//               rows="4"
//             />

//             <div className="action-buttons">
//               <button
//                 onClick={handleApprove}
//                 disabled={actionLoading || status === "approved"}
//               >
//                 ✅ Approve
//               </button>
//               <button
//                 onClick={handleRequestChanges}
//                 disabled={actionLoading || !notes.trim()}
//               >
//                 📝 Request Changes
//               </button>
//               <button
//                 onClick={handleReject}
//                 disabled={actionLoading || !notes.trim()}
//               >
//                 ❌ Reject
//               </button>
//             </div>
//           </section>
//         </aside>
//       </div>

//       {/* MODAL */}
//       {isModalOpen && selectedDocument && (
//         <div className="document-modal" onClick={handleCloseModal}>
//           <div className="document-modal__content">
//             <div className="document-modal__header">
//               <h2>{selectedDocument.type.toUpperCase()}</h2>
//               <button onClick={handleCloseModal}>✕</button>
//             </div>
//             <img
//               src={selectedDocument.url}
//               alt={selectedDocument.type}
//               className="document-modal__img"
//             />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default KYCDetails;
