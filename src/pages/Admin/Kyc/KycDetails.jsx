// import axios from 'axios';
// import React, { useEffect } from 'react'
// import { useParams } from 'react-router-dom';

// const KycDetails = () => {
//   const { id } = useParams();

//   useEffect( async () => {
//     const res = await axios.get(`http://localhost:5000/api/user/kyc/${id}`)
//     console.log(res.data);
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



import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import '../../../CssFiles/Admin/kyc/KycDetails.css';
import { getKycById, approveKyc, rejectKyc } from '../../../utills/apicall';

const KycDetails = () => {
  const [kycdata, setKycData] = useState(null);
  // const { userId, adharNumber, adharName, adharImage, panNumber, panImage, bankName, bankAccount, ifscCode, bankDocImage, status, createdAt, updatedAt } = kycData;

  const formatDate = (dateString) => new Date(dateString).toLocaleDateString();
    const { id } = useParams();

  useEffect( () => {
    const fetchData = async () => {
      const res = await getKycById(id);
      // axios.get(`http://localhost:5000/api/user/kyc/${id}`)
      console.log(res.data);
      setKycData(res.data);
    }
    fetchData();
  }, [id])

  const handleApprove = async () => {
    const confirmed = window.confirm("Are you sure you want to approve this KYC?");
    if (confirmed) {
      const response = await approveKyc(id);
      // axios.put(`http://localhost:5000/api/user/kyc/${id}/approve`);
      console.log(response.data);
      alert("KYC Approved Successfully");
      // Optionally, you can redirect or show a success message
    } else {
      alert("KYC Approval Cancelled");
    }
  };

  const handleReject = async () => {
    const confirmed = window.confirm("Are you sure you want to reject this KYC?");
    if (confirmed) {
      const response = await rejectKyc(id);
      // axios.put(`http://localhost:5000/api/user/kyc/${id}/reject`);
      console.log(response.data);
      alert("KYC Rejected Successfully");
      // Optionally, you can redirect or show a success message
    } else {
      alert("KYC Rejection Cancelled");
    }
  };

  return (
    <div className="kyc-details-container">
      <h1 className="page-title">KYC Details</h1>
      
      <div className="kyc-header">
        <h2 className="kyc-user-name">{kycdata?.userId?.name} - {kycdata?.userId?.email}</h2>
        <p className="kyc-status">
          Status: <span className={`status ${kycdata?.status}`}>
            {kycdata?.status === "approved" ? "✅ Approved" : kycdata?.status === "rejected" ? "❌ Rejected" : "⏳ Pending"}
            {/* {kycdata?.status.charAt(0).toUpperCase() + kycdata?.status.slice(1)} */}
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
        <div className='approve-reject-buttons'>
          { !kycdata?.status === "approved" && <button onClick={() => handleApprove(id)} className='approve-button'>✅ Approve</button>}
          <button onClick={() => handleReject(id)} className='reject-button'>❌ Reject</button>
        </div>
      </div>
    </div>
  );
};

export default KycDetails;
