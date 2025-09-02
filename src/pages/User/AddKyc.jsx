// import React, { useState, useEffect } from "react";
// import "../../CssFiles/User/Kyc.css";
// import { CheckCircle, XCircle, Clock, Upload } from "lucide-react";
// import { motion } from "framer-motion";
// import { MdVerifiedUser } from "react-icons/md";
// import axios from "axios";

// export default function AddKyc() {
//   const [kycStatus, setKycStatus] = useState("Pending");

//   const [form, setForm] = useState({
//     adharNumber: "",
//     adharName: "",
//     panNumber: "",
//     bankName: "",
//     bankAccount: "",
//     ifscCode: "",
//   });

//   const [images, setImages] = useState({
//     aadhaar: [],
//     pan: [],
//     bank: [],
//   });

//   const [previewImages, setPreviewImages] = useState({
//     aadhaar: [],
//     pan: [],
//     bank: [],
//   });

//   const [loading, setLoading] = useState(false);
//   const [step, setStep] = useState(1);

//   useEffect(() => {
//     const fetchKyc = async () => {
//       const data = { status: "Pending" };
//       setKycStatus(data.status);
//     };
//     fetchKyc();
//   }, []);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setForm({ ...form, [name]: value });
//   };

//   const handleImageChange = (e, type) => {
//     const files = Array.from(e.target.files);
//     const updatedFiles = [...images[type], ...files];
//     setImages((prev) => ({ ...prev, [type]: updatedFiles }));

//     const previews = updatedFiles.map((file) => URL.createObjectURL(file));
//     setPreviewImages((prev) => ({ ...prev, [type]: previews }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const sigRes = await axios.get("http://localhost:5000/api/products/signature");
//       const { timestamp, signature, cloudName, apiKey } = sigRes.data;

//       const uploadedFiles = {
//         aadhaar: [],
//         pan: [],
//         bank: [],
//       };

//       for (const type of ["aadhaar", "pan", "bank"]) {
//         for (const file of images[type]) {
//           const data = new FormData();
//           data.append("file", file);
//           data.append("api_key", apiKey);
//           data.append("timestamp", timestamp);
//           data.append("signature", signature);
//           data.append("folder", "kyc_documents");

//           const uploadRes = await fetch(
//             `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`,
//             {
//               method: "POST",
//               body: data,
//             }
//           );

//           const uploadData = await uploadRes.json();
//           uploadedFiles[type].push({
//             public_id: uploadData.public_id,
//             url: uploadData.secure_url,
//           });
//         }
//       }

//       const userId = window.localStorage.getItem("userId");
//       if (!userId) throw new Error("User not logged in");

//       const payload = {
//         userId,
//         kycData: { ...form, files: uploadedFiles },
//       };

//      const response = await axios.post("http://localhost:5000/api/user/kyc/", payload, {
//         headers: { "Content-Type": "application/json" },
//       });

//       if (response.status === 200) {
//         alert("KYC submitted successfully!");
//       } else {
//         alert("Failed to submit KYC.");
//       }
//       setKycStatus("Pending");

//       setForm({
//         adharNumber: "",
//         adharName: "",
//         panNumber: "",
//         bankName: "",
//         bankAccount: "",
//         ifscCode: "",
//       });
//       setImages({ aadhaar: [], pan: [], bank: [] });
//       setPreviewImages({ aadhaar: [], pan: [], bank: [] });
//     } catch (err) {
//       console.error("Error uploading KYC:", err);
//       alert("Failed to upload KYC.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const renderStatus = () => {
//     switch (kycStatus) {
//       case "Verified":
//         return <div className="status verified"><CheckCircle size={22} /> Verified</div>;
//       case "Rejected":
//         return <div className="status rejected"><XCircle size={22} /> Rejected</div>;
//       default:
//         return <div className="status pending"><Clock size={22} /> Pending</div>;
//     }
//   };

//   return (
//     <main className="kyc-container">
//       <h1 className="kyc-title"><MdVerifiedUser /> KYC Verification</h1>

//       <motion.div
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="kyc-status-box"
//       >
//         <h2 className="section-title">Current Status</h2>
//         {renderStatus()}
//       </motion.div>

//       <form onSubmit={handleSubmit} className="kyc-form">
//         {step === 1 && (
//           <div className="form-section">
//             <h2 className="section-title">Aadhaar Details</h2>
//             <input
//               type="text"
//               name="adharNumber"
//               value={form.adharNumber}
//               onChange={handleInputChange}
//               placeholder="Aadhaar Number"
//               required
//             />
//             <input
//               type="text"
//               name="adharName"
//               value={form.adharName}
//               onChange={handleInputChange}
//               placeholder="Aadhaar Name"
//               required
//             />
//             <label htmlFor="aadhaarUpload" className="upload-btn">📂 Upload Aadhaar</label>
//             <input
//               id="aadhaarUpload"
//               type="file"
//               accept="image/*,application/pdf"
//               multiple
//               onChange={(e) => handleImageChange(e, "aadhaar")}
//               className="hidden-input"
//               required
//             />
//             <div className="image-preview">
//               {previewImages.aadhaar.map((src, idx) => (
//                 <img key={idx} src={src} alt={`Aadhaar Preview ${idx + 1}`} />
//               ))}
//             </div>
//           </div>
//         )}

//         {step === 2 && (
//           <div className="form-section">
//             <h2 className="section-title">PAN & Bank Details</h2>
//             <input
//               type="text"
//               name="panNumber"
//               value={form.panNumber}
//               onChange={handleInputChange}
//               placeholder="PAN Number"
//               required
//             />
//             <label htmlFor="panUpload" className="upload-btn">📂 Upload PAN</label>
//             <input
//               id="panUpload"
//               type="file"
//               accept="image/*,application/pdf"
//               multiple
//               onChange={(e) => handleImageChange(e, "pan")}
//               className="hidden-input"
//               required
//             />
//             <div className="image-preview">
//               {previewImages.pan.map((src, idx) => (
//                 <img key={idx} src={src} alt={`PAN Preview ${idx + 1}`} />
//               ))}
//             </div>

//             <input
//               type="text"
//               name="bankName"
//               value={form.bankName}
//               onChange={handleInputChange}
//               placeholder="Bank Name"
//               required
//             />
//             <input
//               type="text"
//               name="bankAccount"
//               value={form.bankAccount}
//               onChange={handleInputChange}
//               placeholder="Bank Account Number"
//               required
//             />
//             <input
//               type="text"
//               name="ifscCode"
//               value={form.ifscCode}
//               onChange={handleInputChange}
//               placeholder="IFSC Code"
//               required
//             />
//             <label htmlFor="bankUpload" className="upload-btn">📂 Upload Bank Proof</label>
//             <input
//               id="bankUpload"
//               type="file"
//               accept="image/*,application/pdf"
//               multiple
//               onChange={(e) => handleImageChange(e, "bank")}
//               className="hidden-input"
//             />
//             <div className="image-preview">
//               {previewImages.bank.map((src, idx) => (
//                 <img key={idx} src={src} alt={`Bank Preview ${idx + 1}`} />
//               ))}
//             </div>
//           </div>
//         )}

//         <div className="form-actions">
//           {step > 1 && (
//             <button type="button" className="btn" onClick={() => setStep(step - 1)}>Back</button>
//           )}
//           {step < 2 ? (
//             <button type="button" className="btn primary" onClick={() => setStep(step + 1)}>Next</button>
//           ) : (
//             <motion.button
//               whileTap={{ scale: 0.95 }}
//               type="submit"
//               disabled={loading}
//               className="btn submit"
//             >
//               <Upload className="icon" size={18} />
//               {loading ? "Uploading..." : "Submit for Verification"}
//             </motion.button>
//           )}
//         </div>
//       </form>
//     </main>
//   );
// }















import React, { useState, useEffect } from "react";
import "../../CssFiles/User/Kyc.css";
import { CheckCircle, XCircle, Clock, Upload, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { MdVerifiedUser } from "react-icons/md";
import axios from "axios";
import { submitKyc } from "../../utills/apicall";

export default function AddKyc() {
  const [kycStatus, setKycStatus] = useState("Pending");

  const [form, setForm] = useState({
    adharNumber: "",
    adharName: "",
    panNumber: "",
    bankName: "",
    bankAccount: "",
    ifscCode: "",
  });

  const [images, setImages] = useState({
    aadhaar: null,
    pan: null,
    bank: null,
  });

  const [previewImages, setPreviewImages] = useState({
    aadhaar: null,
    pan: null,
    bank: null,
  });

  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);

  useEffect(() => {
    const fetchKyc = async () => {
      const data = { status: "Pending" }; // Replace with actual fetch
      setKycStatus(data.status);
    };
    fetchKyc();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    setImages((prev) => ({ ...prev, [type]: file }));
    const previewUrl = URL.createObjectURL(file);
    setPreviewImages((prev) => ({ ...prev, [type]: previewUrl }));
  };

  const handleImageDelete = (type) => {
    setImages((prev) => ({ ...prev, [type]: null }));
    setPreviewImages((prev) => ({ ...prev, [type]: null }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const sigRes = await axios.get("https://swanand-vibes-backend.vercel.app/api/products/signature");
      const { timestamp, signature, cloudName, apiKey } = sigRes.data;

      console.log({timestamp,signature,cloudName,apiKey});
      
      const uploadedFiles = {
        aadhaar: [],
        pan: [],
        bank: [],
      };

      for (const type of ["aadhaar", "pan", "bank"]) {
        const file = images[type];
        if (!file) continue;

        const data = new FormData();
        data.append("file", file);
        data.append("api_key", apiKey);
        data.append("timestamp", timestamp);
        data.append("signature", signature);
        // data.append("folder", "kyc_documents");

        const uploadRes = await axios.post(
           `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          data
        );

        const uploadData = await uploadRes.data;
        uploadedFiles[type].push({
          public_id: uploadData.public_id,
          url: uploadData.secure_url,
        });
      }

      const userId = window.localStorage.getItem("userId");
      if (!userId) throw new Error("User not logged in");

      const payload = {
        userId,
        kycData: { ...form, files: uploadedFiles },
      };
      console.log(payload);

      const response = await submitKyc(payload);
      // axios.post("http://localhost:5000/api/user/kyc/submit", payload, {
      //   headers: { "Content-Type": "application/json" },
      // });

      if (response.status === 200) {
        alert("KYC submitted successfully!");
      } else {
        alert("Failed to submit KYC.");
      }

      setKycStatus("Pending");
      setForm({
        adharNumber: "",
        adharName: "",
        panNumber: "",
        bankName: "",
        bankAccount: "",
        ifscCode: "",
      });
      setImages({ aadhaar: null, pan: null, bank: null });
      setPreviewImages({ aadhaar: null, pan: null, bank: null });

    } catch (err) {
      console.error("Error uploading KYC:", err);
      alert("Failed to upload KYC.");
    } finally {
      setLoading(false);
    }
  };

  const renderStatus = () => {
    switch (kycStatus) {
      case "Verified":
        return <div className="status verified"><CheckCircle size={22} /> Verified</div>;
      case "Rejected":
        return <div className="status rejected"><XCircle size={22} /> Rejected</div>;
      default:
        return <div className="status pending"><Clock size={22} /> Pending</div>;
    }
  };

  return (
    <main className="kyc-container">
      <h1 className="kyc-title"><MdVerifiedUser /> KYC Verification</h1>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="kyc-status-box"
      >
        <h2 className="section-title">Current Status</h2>
        {renderStatus()}
      </motion.div>

      <form onSubmit={handleSubmit} className="kyc-form">
        {step === 1 && (
          <div className="form-section">
            <h2 className="section-title">Aadhaar Details</h2>
            <input
              type="text"
              name="adharNumber"
              value={form.adharNumber}
              onChange={handleInputChange}
              placeholder="Aadhaar Number"
              required
            />
            <input
              type="text"
              name="adharName"
              value={form.adharName}
              onChange={handleInputChange}
              placeholder="Aadhaar Name"
              required
            />
            { !previewImages.aadhaar && (
                <label htmlFor="aadhaarUpload" className="upload-btn">📂 Upload Aadhaar</label>

            )}

            <input
              id="aadhaarUpload"
              type="file"
              accept="image/*,application/pdf"
              onChange={(e) => handleImageChange(e, "aadhaar")}
              className="hidden-input"
              required
            />
            {previewImages.aadhaar && (
              <div className="image-preview">
                <img src={previewImages.aadhaar} alt="Aadhaar Preview" />
                <button type="button" className="delete-btn" onClick={() => handleImageDelete("aadhaar")}>
                  <Trash2 size={18} />
                </button>
              </div>
            )}
          </div>
        )}

        {step === 2 && (
          <div className="form-section">
            <h2 className="section-title">PAN & Bank Details</h2>
            <input
              type="text"
              name="panNumber"
              value={form.panNumber}
              onChange={handleInputChange}
              placeholder="PAN Number"
              required
            />
            {
                !previewImages.pan && (
                    <label htmlFor="panUpload" className="upload-btn">📂 Upload PAN</label>
                )
            }
            <input
              id="panUpload"
              type="file"
              accept="image/*,application/pdf"
              onChange={(e) => handleImageChange(e, "pan")}
              className="hidden-input"
              required
            />
            {previewImages.pan && (
              <div className="image-preview">
                <img src={previewImages.pan} alt="PAN Preview" />
                <button type="button" className="delete-btn" onClick={() => handleImageDelete("pan")}>
                  <Trash2 size={18} />
                </button>
              </div>
            )}

            <input
              type="text"
              name="bankName"
              value={form.bankName}
              onChange={handleInputChange}
              placeholder="Bank Name"
              required
            />
            <input
              type="text"
              name="bankAccount"
              value={form.bankAccount}
              onChange={handleInputChange}
              placeholder="Bank Account Number"
              required
            />
            <input
              type="text"
              name="ifscCode"
              value={form.ifscCode}
              onChange={handleInputChange}
              placeholder="IFSC Code"
              required
            />
           { !previewImages.bank && (
               <label htmlFor="bankUpload" className="upload-btn">📂 Upload Bank Proof</label>
           )}
            <input
              id="bankUpload"
              type="file"
              accept="image/*,application/pdf"
              onChange={(e) => handleImageChange(e, "bank")}
              className="hidden-input"
            />
            {previewImages.bank && (
              <div className="image-preview">
                <img src={previewImages.bank} alt="Bank Preview" />
                <button type="button" className="delete-btn" onClick={() => handleImageDelete("bank")}>
                  <Trash2 size={18} />
                </button>
              </div>
            )}
          </div>
        )}

        <div className="form-actions">
          {step > 1 && (
            <button type="button" className="btn" onClick={() => setStep(step - 1)}>Back</button>
          )}
          {step < 2 ? (
            <button type="button" className="btn primary" onClick={() => setStep(step + 1)}>Next</button>
          ) : (
            <motion.button
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={loading}
              className="btn submit"
            >
              <Upload className="icon" size={18} />
              {loading ? "Uploading..." : "Submit for Verification"}
            </motion.button>
          )}
        </div>
      </form>
    </main>
  );
}

