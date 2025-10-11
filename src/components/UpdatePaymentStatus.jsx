// import React, { useState } from 'react';
// import axios from 'axios';

// const UpdatePaymentStatus = () => {
//   const [purchaseId, setPurchaseId] = useState('');
//   const [paymentStatus, setPaymentStatus] = useState('pending');
//   const [message, setMessage] = useState('');
//   const [error, setError] = useState('');

//   const validStatuses = ['pending', 'paid', 'partial', 'cancelled'];

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setMessage('');
//     setError('');

//     if (!purchaseId) {
//       setError('Purchase ID is required');
//       return;
//     }

//     try {
//       const response = await axios.patch(`/api/purchases/${purchaseId}/payment-status`, {
//         paymentStatus
//       });

//       setMessage(`Success: ${response.data.message}`);
//     } catch (err) {
//       console.error('Error updating payment status:', err);
//       if (err.response?.data?.error) {
//         setError(err.response.data.error);
//       } else {
//         setError('Something went wrong while updating payment status.');
//       }
//     }
//   };

//   return (
//     <div style={{ maxWidth: '400px', margin: '2rem auto', padding: '1rem', border: '1px solid #ccc', borderRadius: '8px' }}>
//       <h2>Update Payment Status</h2>
//       <form onSubmit={handleSubmit}>
//         <div style={{ marginBottom: '1rem' }}>
//           <label>Purchase ID:</label>
//           <input
//             type="text"
//             value={purchaseId}
//             onChange={(e) => setPurchaseId(e.target.value)}
//             placeholder="Enter Purchase ID"
//             style={{ width: '100%', padding: '8px' }}
//           />
//         </div>

//         <div style={{ marginBottom: '1rem' }}>
//           <label>Payment Status:</label>
//           <select
//             value={paymentStatus}
//             onChange={(e) => setPaymentStatus(e.target.value)}
//             style={{ width: '100%', padding: '8px' }}
//           >
//             {validStatuses.map((status) => (
//               <option key={status} value={status}>
//                 {status}
//               </option>
//             ))}
//           </select>
//         </div>

//         <button type="submit" style={{ padding: '10px 15px' }}>Update</button>
//       </form>

//       {message && <p style={{ color: 'green', marginTop: '1rem' }}>{message}</p>}
//       {error && <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>}
//     </div>
//   );
// };

// export default UpdatePaymentStatus;




import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./css/UpdatePaymentStatus.css";

const UpdatePaymentStatus = ({ purchaseId: initialId, paystatus: initialStatus }) => {
  const [purchaseId, setPurchaseId] = useState(initialId || '');
  const [paymentStatus, setPaymentStatus] = useState(initialStatus || 'pending');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    setPurchaseId(initialId);
  }, [initialId]);

  const validStatuses = ['pending', 'paid', 'partial', 'cancelled'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (!purchaseId) {
      setError('Purchase ID is required');
      return;
    }

    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_API_URL}/purchase/${purchaseId}/payment-status`,
        { paymentStatus }
      );

      setMessage(`✅ ${response.data.message || 'Payment status updated successfully'}`);
    } catch (err) {
      console.error('Error updating payment status:', err);
      setError(err.response?.data?.error || 'Something went wrong.');
    }
  };

  return (
    <div className="update-payment-container">
      <h3 className="update-payment-title">Update Payment Status</h3>
      <form className="update-payment-form" onSubmit={handleSubmit}>
        {!initialId && (
          <div className="update-form-group">
            <label htmlFor="purchaseId" className="update-form-label">Purchase ID</label>
            <input
              type="text"
              id="purchaseId"
              value={purchaseId}
              onChange={(e) => setPurchaseId(e.target.value)}
              placeholder="Enter Purchase ID"
              className="update-form-input"
            />
          </div>
        )}

        <div className="update-form-group">
          <label htmlFor="paymentStatus" className="update-form-label">Payment Status</label>
          <select
            id="paymentStatus"
            value={paymentStatus}
            onChange={(e) => setPaymentStatus(e.target.value)}
            className="update-form-select"
          >
            {validStatuses.map((status) => (
              <option key={status} value={status}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="update-btn">Update</button>
      </form>

      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default UpdatePaymentStatus;



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const UpdatePaymentStatus = ({ purchaseId: initialId }) => {
//   const [purchaseId, setPurchaseId] = useState(initialId || '');
//   const [paymentStatus, setPaymentStatus] = useState('pending');
//   const [message, setMessage] = useState('');
//   const [error, setError] = useState('');

//   // If the parent component updates the ID, update local state too
//   useEffect(() => {
//     setPurchaseId(initialId);
//   }, [initialId]);

//   const validStatuses = ['pending', 'paid', 'partial', 'cancelled'];

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setMessage('');
//     setError('');

//     if (!purchaseId) {
//       setError('Purchase ID is required');
//       return;
//     }

//     try {
//       const response = await axios.patch(
//         `${import.meta.env.VITE_API_URL}/purchase/${purchaseId}/payment-status`,
//         { paymentStatus }
//       );

//       setMessage(`✅ ${response.data.message || 'Payment status updated successfully'}`);
//     } catch (err) {
//       console.error('Error updating payment status:', err);
//       setError(err.response?.data?.error || 'Something went wrong.');
//     }
//   };

//   return (
//     <div style={{ maxWidth: '500px', marginTop: '2rem', padding: '1rem', border: '1px solid #ccc', borderRadius: '8px' }}>
//       <h3>Update Payment Status</h3>
//       <form onSubmit={handleSubmit}>
//         {/* Hidden if ID is passed via props */}
//         {!initialId && (
//           <div style={{ marginBottom: '1rem' }}>
//             <label>Purchase ID:</label>
//             <input
//               type="text"
//               value={purchaseId}
//               onChange={(e) => setPurchaseId(e.target.value)}
//               placeholder="Enter Purchase ID"
//               style={{ width: '100%', padding: '8px' }}
//             />
//           </div>
//         )}

//         <div style={{ marginBottom: '1rem' }}>
//           <label>Payment Status:</label>
//           <select
//             value={paymentStatus}
//             onChange={(e) => setPaymentStatus(e.target.value)}
//             style={{ width: '100%', padding: '8px' }}
//           >
//             {validStatuses.map((status) => (
//               <option key={status} value={status}>
//                 {status.charAt(0).toUpperCase() + status.slice(1)}
//               </option>
//             ))}
//           </select>
//         </div>

//         <button type="submit" style={{ padding: '10px 15px' }}>Update</button>
//       </form>

//       {message && <p style={{ color: 'green', marginTop: '1rem' }}>{message}</p>}
//       {error && <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>}
//     </div>
//   );
// };

// export default UpdatePaymentStatus;
