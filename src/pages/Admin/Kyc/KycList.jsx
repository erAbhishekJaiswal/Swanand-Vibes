// import React from 'react'

// const KycList = () => {
//   return (
//     <div>
//         <h1>KYC List</h1>
//         <table>
//             <thead>
//                 <tr>
//                     <th>ID</th>
//                     <th>Name</th>
//                     <th>Status</th>
//                     <th>Actions</th>
//                 </tr>
//             </thead>
//             <tbody>
//                 {/* KYC rows will be mapped here */}
//             </tbody>
//         </table>
//     </div>
//   )
// }

// export default KycList















import { useEffect, useState } from 'react';
import '../../../CssFiles/Admin/kyc/KycList.css';
import { GoIssueClosed } from 'react-icons/go';
import { MdOutlineCancel } from 'react-icons/md';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {getAllKycs} from '../../../utills/apicall';
import Spinner from '../../../components/Spinner';

const KYCList = () => {
      const [kycList, setKycList] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchKycList = async () => {
      const response = await getAllKycs()
      // axios.get("http://localhost:5000/api/user/kyc");
      setKycList(response.data);
      setLoading(false);
    };
    fetchKycList();
  }, []);

  if (loading) return <div><Spinner /></div>;
  return (
    // <div className="kyc-container">
    //   {/* Search bar */}
    //   <div className="kyc-search">
    //     <input
    //       type="text"
    //       placeholder="Search by name or email"
    //       className="kyc-input"
    //     />
    //   </div>

    //   {/* Table Card */}
    //   <div className="kyc-table-wrapper">
    //     <div className="kyc-table-header">
    //       <h2>KYC List</h2>
    //       <p>Browse a list of KYC submissions</p>
    //     </div>

    //     <table className="kyc-table">
    //       <thead>
    //         <tr>
    //           <th>Name</th>
    //           <th>KYC Status</th>
    //           <th>Action</th>
    //         </tr>
    //       </thead>
    //       <tbody>
    //         {kycList.map((kyc, idx) => (
    //           <tr key={kyc.id} className={idx % 2 === 0 ? 'even' : 'odd'}>
    //             <td>{kyc.adharName}</td>
    //             <td>
    //               <span className={`status-badge ${kyc.status}`}>
    //                 {kyc.status === "approved" ? (
    //                   <GoIssueClosed className="status-icon" />
    //                 ) : kyc.status === "rejected" ? (
    //                   <MdOutlineCancel className="status-icon" />
    //                 ) : null}
    //                 {kyc.status || "Not Submitted"}
    //               </span>
    //             </td>
    //             <td>
    //               <button
    //                 className="details-btn"
    //                 onClick={() =>
    //                   (window.location.href = `/admin/kyc/${kyc ? kyc.id : 'list'}`)
    //                 }
    //               >
    //                 Details
    //               </button>
    //             </td>
    //           </tr>
    //         ))}
    //       </tbody>
    //     </table>
    //   </div>
    // </div>

    <div className="kyc-container">
  {/* Search Bar */}
  <div className="search-bar">
    <input
      type="text"
      placeholder="🔍 Search by name or email"
      className="search-input"
    />
  </div>

  {/* Table */}
  <div className="kyc-table-wrapper">
    <table className="kyc-table">
      <caption className="table-caption">
        KYC List
        <p className="table-subcaption">Browse a list of KYC submissions</p>
      </caption>

      <thead>
        <tr>
          <th>Name</th>
          <th>KYC Status</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        {kycList.map((kyc, idx) => (
          <tr key={kyc._id} className="kyc-row">
            <td>{kyc.adharName}</td>
            <td>
              <span className={`status-badge ${kyc.status}`}>
                {kyc.status === "approved" ? "✔ Approved" : ""}
                {kyc.status === "pending" ? "⏳ Pending" : ""}
                {kyc.status === "rejected" ? "❌ Rejected" : ""}
              </span>
            </td>
            <td>
              <button
                className="details-button"
                onClick={() =>
                  navigate(`/admin/kyc/${kyc?._id}`)
                }
              >
                🔎 Details
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

  );
};

export default KYCList;
