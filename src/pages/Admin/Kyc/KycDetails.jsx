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
        console.log(response.data);
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

  // const documents = [
  //   { title: "📷 Passport Photo", src: kycData.passportPhoto },
  //   { title: "🆔 Aadhaar Card", src: kycData.adharImage },
  //   { title: "💳 PAN Card", src: kycData.panImage },
  //   { title: "🏦 Bank Document", src: kycData.bankDocImage },
  // ];

  const documents = [
  {
    title: "📷 Passport Photo",
    src: kycData.passportPhoto,
    details: [
      { label: "Full Name", value: user?.name },
      { label: "Email", value: user?.email },
    ],
  },
  {
    title: "🆔 Aadhaar Card",
    src: kycData.adharImage,
    details: [
      { label: "Aadhaar Name", value: kycData.adharName },
      { label: "Aadhaar Number", value: kycData.adharNumber },
    ],
  },
  {
    title: "💳 PAN Card",
    src: kycData.panImage,
    details: [
      { label: "PAN Number", value: kycData.panNumber },
    ],
  },
  {
    title: "🏦 Bank Document",
    src: kycData.bankDocImage,
    details: [
      { label: "Bank Name", value: kycData.bankName },
      { label: "Account Number", value: kycData.bankAccount },
      { label: "IFSC Code", value: kycData.ifscCode },
    ],
  },
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
              // <div
              //   key={idx}
              //   className="kyc-document-card"
              //   onClick={() => setZoomedImage(doc.src)}
              // >
              //   <h3>{doc.title}</h3>
              //   <img src={doc.src} alt={doc.title} />
              //   <div className="kyc-zoom-overlay">🔍 View</div>
              // </div>

              <div key={idx} className="kyc-document-card">
  <h3>{doc.title}</h3>
  <img
    src={doc.src}
    alt={doc.title}
    onClick={() => setZoomedImage(doc.src)}
  />
  <div className="kyc-zoom-overlay">🔍 View</div>

  {doc.details && (
    <ul className="kyc-doc-details">
      {doc.details.map((item, i) => (
        <li key={i}>
          <strong>{item.label}:</strong> {item.value || "N/A"}
        </li>
      ))}
    </ul>
  )}
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
