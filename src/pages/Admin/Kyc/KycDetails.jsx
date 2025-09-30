// import axios from 'axios';
// import React, { useEffect } from 'react'
// import { useParams } from 'react-router-dom';

// const KycDetails = () => {
//   const { id } = useParams();

//   useEffect( async () => {
//     const res = await axios.get(`http://localhost:5000/api/user/kyc/${id}`)
//     // console.log(res.data);
//   }, [id])

//   return (
//     <div>
//         <h1>KYC Details</h1>
//         <p>ID: {id}</p>
//         <p>Name: John Doe</p>
//         <p>Status: Verified</p>
//     </div>
//   )
// }

// export default KycDetails



// import axios from 'axios';
// import React, { useEffect, useState } from 'react'
// import { useParams } from 'react-router-dom';
// import '../../../CssFiles/Admin/kyc/KycDetails.css';
// import { getKycById, approveKyc, rejectKyc } from '../../../utills/apicall';
// import {toast} from 'react-hot-toast';
// import Spinner from '../../../Components/Spinner';

// const KycDetails = () => {
//   const [kycdata, setKycData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // const { userId, adharNumber, adharName, adharImage, panNumber, panImage, bankName, bankAccount, ifscCode, bankDocImage, status, createdAt, updatedAt } = kycData;

//   const formatDate = (dateString) => new Date(dateString).toLocaleDateString();
//     const { id } = useParams();

//   useEffect( () => {
//     const fetchData = async () => {
//       setLoading(true);
//       const res = await getKycById(id);
//       // axios.get(`http://localhost:5000/api/user/kyc/${id}`)
//       // console.log(res.data);
//       setKycData(res.data);
//       setLoading(false);
//     }
//     fetchData();
//   }, [id])

//   const handleApprove = async () => {
//     const confirmed = window.confirm("Are you sure you want to approve this KYC?");
//     if (confirmed) {
//       const response = await approveKyc(id);
//       // axios.put(`http://localhost:5000/api/user/kyc/${id}/approve`);
//       // console.log(response.data);
//       alert("KYC Approved Successfully");
//       // Optionally, you can redirect or show a success message
//     } else {
//       alert("KYC Approval Cancelled");
//     }
//   };

//   const handleReject = async () => {
//     const confirmed = window.confirm("Are you sure you want to reject this KYC?");
//     if (confirmed) {
//       const response = await rejectKyc(id);
//       // axios.put(`http://localhost:5000/api/user/kyc/${id}/reject`);
//       // console.log(response.data);
//       alert("KYC Rejected Successfully");
//       // Optionally, you can redirect or show a success message
//     } else {
//       alert("KYC Rejection Cancelled");
//     }
//   };
//   if (loading) return <Spinner size="lg" />;

//   return (
//     <div className="kyc-details-container">
//       <h1 className="page-title">KYC Details</h1>
      
//       <div className="kyc-header">
//         <h2 className="kyc-user-name">{kycdata?.userId?.name} - {kycdata?.userId?.email}</h2>
//         <p className="kyc-status">
//           Status: <span className={`status ${kycdata?.status}`}>
//             {kycdata?.status === "approved" ? "✅ Approved" : kycdata?.status === "rejected" ? "❌ Rejected" : "⏳ Pending"}
//             {/* {kycdata?.status.charAt(0).toUpperCase() + kycdata?.status.slice(1)} */}
//             </span>
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
//         <div className='approve-reject-buttons'>
//           { !kycdata?.status === "approved" && <button onClick={() => handleApprove(id)} className='approve-button'>✅ Approve</button>}
//           <button onClick={() => handleReject(id)} className='reject-button'>❌ Reject</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default KycDetails;











import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import '../../../CssFiles/Admin/kyc/KycDetails.css';
import { getKycById, approveKyc, rejectKyc } from '../../../utills/apicall';
import {toast} from 'react-hot-toast';
import Spinner from '../../../components/Spinner';

const KycDetails = () => {
  const [kycdata, setKycData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  const formatDate = (dateString) => new Date(dateString).toLocaleDateString();
  const { id } = useParams();

  useEffect( () => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await getKycById(id);
        // console.log(res.data);
        setKycData(res.data);
      } catch (error) {
        console.error('Error fetching KYC data:', error);
        toast.error('Failed to load KYC details');
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id]);

  const handleApprove = async () => {
    setActionLoading(true);
    try {
      const response = await approveKyc(id);
      // console.log(response.data);
      setKycData(prev => ({ ...prev, status: 'approved' }));
      toast.success('KYC Approved Successfully');
      setShowApproveModal(false);
    } catch (error) {
      console.error('Error approving KYC:', error);
      toast.error('Failed to approve KYC');
    } finally {
      setActionLoading(false);
    }
  };

  const handleReject = async () => {
    setActionLoading(true);
    try {
      const response = await rejectKyc(id);
      // console.log(response.data);
      setKycData(prev => ({ ...prev, status: 'rejected' }));
      toast.success('KYC Rejected Successfully');
      setShowRejectModal(false);
    } catch (error) {
      console.error('Error rejecting KYC:', error);
      toast.error('Failed to reject KYC');
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) return <Spinner size="lg" />;

  return (
    <div className="kyc-details-container">
      {/* Approve Confirmation Modal */}
      {showApproveModal && (
        <div className="modal-overlay">
          <div className="confirmation-modal">
            <div className="modal-header">
              <h3>Confirm Approval</h3>
              <button 
                className="modal-close"
                onClick={() => setShowApproveModal(false)}
                disabled={actionLoading}
              >
                &times;
              </button>
            </div>
            <div className="modal-content">
              <div className="modal-icon approve">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" 
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <p>Are you sure you want to approve this KYC application?</p>
              <p className="modal-subtext">This action cannot be undone.</p>
            </div>
            <div className="modal-actions">
              <button 
                className="modal-btn cancel"
                onClick={() => setShowApproveModal(false)}
                disabled={actionLoading}
              >
                Cancel
              </button>
              <button 
                className="modal-btn confirm approve"
                onClick={handleApprove}
                disabled={actionLoading}
              >
                {actionLoading ? (
                  <>
                    <Spinner size="sm" type="ring" color="light" />
                    Approving...
                  </>
                ) : (
                  'Confirm Approval'
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reject Confirmation Modal */}
      {showRejectModal && (
        <div className="modal-overlay">
          <div className="confirmation-modal">
            <div className="modal-header">
              <h3>Confirm Rejection</h3>
              <button 
                className="modal-close"
                onClick={() => setShowRejectModal(false)}
                disabled={actionLoading}
              >
                &times;
              </button>
            </div>
            <div className="modal-content">
              <div className="modal-icon reject">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 14L12 12M12 12L14 10M12 12L10 10M12 12L14 14M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" 
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <p>Are you sure you want to reject this KYC application?</p>
              <p className="modal-subtext">This action cannot be undone.</p>
            </div>
            <div className="modal-actions">
              <button 
                className="modal-btn cancel"
                onClick={() => setShowRejectModal(false)}
                disabled={actionLoading}
              >
                Cancel
              </button>
              <button 
                className="modal-btn confirm reject"
                onClick={handleReject}
                disabled={actionLoading}
              >
                {actionLoading ? (
                  <>
                    <Spinner size="sm" type="ring" color="light" />
                    Rejecting...
                  </>
                ) : (
                  'Confirm Rejection'
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      <h1 className="page-title">KYC Details</h1>
      
      <div className="kyc-header">
        <h2 className="kyc-user-name">{kycdata?.userId?.name} - {kycdata?.userId?.email}</h2>
        <p className="kyc-status">
          Status: <span className={`status ${kycdata?.status}`}>
            {kycdata?.status === "approved" ? "✅ Approved" : kycdata?.status === "rejected" ? "❌ Rejected" : "⏳ Pending"}
          </span>
        </p>
      </div>

      <div className="kyc-content">
        <div className="kyc-section">
          <h3 className="section-title">Aadhaar Details</h3>
          <p><strong>Aadhaar Number:</strong> {kycdata?.adharNumber}</p>
          <p><strong>Name on Aadhaar:</strong> {kycdata?.adharName}</p>
          <div className="image-container">
            <img src={kycdata?.adharImage} alt="Aadhaar" className="image-preview" />
          </div>
        </div>

        <div className="kyc-section">
          <h3 className="section-title">PAN Details</h3>
          <p><strong>PAN Number:</strong> {kycdata?.panNumber}</p>
          <div className="image-container">
            <img src={kycdata?.panImage} alt="PAN Card" className="image-preview" />
          </div>
        </div>

        <div className="kyc-section">
          <h3 className="section-title">Bank Details</h3>
          <p><strong>Bank Name:</strong> {kycdata?.bankName}</p>
          <p><strong>Bank Account:</strong> {kycdata?.bankAccount}</p>
          <p><strong>IFSC Code:</strong> {kycdata?.ifscCode}</p>
          <div className="image-container">
            <img src={kycdata?.bankDocImage} alt="Bank Proof" className="image-preview" />
          </div>
        </div>
        
        <div className="kyc-footer">
          <p><strong>Created At:</strong> {formatDate(kycdata?.createdAt)}</p>
          <p><strong>Last Updated:</strong> {formatDate(kycdata?.updatedAt)}</p>
        </div>
        
        {kycdata?.status === 'pending' && (
          <div className='approve-reject-buttons'>
            <button 
              onClick={() => setShowApproveModal(true)} 
              className='approve-button'
            >
              <span className="btn-icon">✅</span>
              Approve KYC
            </button>
            <button 
              onClick={() => setShowRejectModal(true)} 
              className='reject-button'
            >
              <span className="btn-icon">❌</span>
              Reject KYC
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default KycDetails;