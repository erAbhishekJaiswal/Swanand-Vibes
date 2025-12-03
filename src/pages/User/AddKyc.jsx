import React, { useState, useEffect } from "react";
import "../../CssFiles/User/Kyc.css";
import axios from "axios";
import { submitKyc } from "../../utills/apicall";
import { toast } from "react-hot-toast";
import Spinner from "../../components/Spinner";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utills/axiosInstance";

export default function AddKyc() {
  const navigate = useNavigate();
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
    passportPhoto: null
  });

  const [previewImages, setPreviewImages] = useState({
    aadhaar: null,
    pan: null,
    bank: null,
    passportPhoto: null
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

    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      toast.error(`${type === 'passportPhoto' ? 'Passport photo' : 'Document'} must be less than 2MB`);
      return;
    }

    // Validate file type
    if (!file.type.startsWith('image/') && !file.type.includes('pdf')) {
      toast.error('Please upload only images or PDF files');
      return;
    }

    // Special validation for passport photo
    if (type === 'passportPhoto') {
      const img = new Image();
      const objectUrl = URL.createObjectURL(file);
      
      img.onload = function() {
        // Check if image dimensions are appropriate for passport photo
        if (this.width < 200 || this.height < 200) {
          toast.error('Passport photo should be at least 200x200 pixels');
          URL.revokeObjectURL(objectUrl);
          return;
        }
        
        // Resize image if it's too large
        if (this.width > 800 || this.height > 800) {
          resizeImage(file, 800, 800).then(resizedFile => {
            setImages((prev) => ({ ...prev, [type]: resizedFile }));
            setPreviewImages((prev) => ({ ...prev, [type]: URL.createObjectURL(resizedFile) }));
          });
        } else {
          setImages((prev) => ({ ...prev, [type]: file }));
          setPreviewImages((prev) => ({ ...prev, [type]: objectUrl }));
        }
      };
      
      img.src = objectUrl;
    } else {
      setImages((prev) => ({ ...prev, [type]: file }));
      const previewUrl = URL.createObjectURL(file);
      setPreviewImages((prev) => ({ ...prev, [type]: previewUrl }));
    }
  };

  // Function to resize image
  const resizeImage = (file, maxWidth, maxHeight) => {
    return new Promise((resolve) => {
      const img = new Image();
      const reader = new FileReader();
      
      reader.onload = function(e) {
        img.onload = function() {
          let width = img.width;
          let height = img.height;
          
          // Calculate the new dimensions
          if (width > height) {
            if (width > maxWidth) {
              height = Math.round((height * maxWidth) / width);
              width = maxWidth;
            }
          } else {
            if (height > maxHeight) {
              width = Math.round((width * maxHeight) / height);
              height = maxHeight;
            }
          }
          
          // Create canvas for resizing
          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          
          // Convert back to file
          canvas.toBlob((blob) => {
            const resizedFile = new File([blob], file.name, {
              type: 'image/jpeg',
              lastModified: Date.now()
            });
            resolve(resizedFile);
          }, 'image/jpeg', 0.8);
        };
        
        img.src = e.target.result;
      };
      
      reader.readAsDataURL(file);
    });
  };

  const handleImageDelete = (type) => {
    setImages((prev) => ({ ...prev, [type]: null }));
    setPreviewImages((prev) => ({ ...prev, [type]: null }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const sigRes = await axiosInstance.get(`${import.meta.env.VITE_API_URL}/products/signature`);
      const { timestamp, signature, cloudName, apiKey } = sigRes.data;

      const uploadedFiles = {
        aadhaar: [],
        pan: [],
        bank: [],
        passportPhoto: []
      };

      for (const type of ["aadhaar", "pan", "bank", "passportPhoto"]) {
        const file = images[type];
        if (!file) {
          if (type !== "passportPhoto") {
            throw new Error(`Please upload ${type} document`);
          }
          continue;
        }

        const data = new FormData();
        data.append("file", file);
        data.append("api_key", apiKey);
        data.append("timestamp", timestamp);
        data.append("signature", signature);

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

      const response = await submitKyc(payload);

      if (response.status === 200) {
        toast.success("KYC submitted successfully!");
        navigate("/user/profile");
      } else {
        toast.error("Failed to submit KYC.");
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
      setImages({ aadhaar: null, pan: null, bank: null, passportPhoto: null });
      setPreviewImages({ aadhaar: null, pan: null, bank: null, passportPhoto: null });

    } catch (err) {
      console.error("Error uploading KYC:", err);
      toast.error(err.message || "Failed to upload KYC.");
    } finally {
      setLoading(false);
    }
  };

  const renderStatus = () => {
    switch (kycStatus) {
      case "Verified":
        return <div className="status verified">✓ Verified</div>;
      case "Rejected":
        return <div className="status rejected">✗ Rejected</div>;
      default:
        return <div className="status pending">⏰ Pending</div>;
    }
  };

  if (loading) {
    return <Spinner size="lg" />;
  }

  return (
    <main className="kyc-container">
      <h1 className="kyc-title">📷 KYC Verification</h1>

      <div className="kyc-status-box">
        <h2 className="section-title">Current Status</h2>
        {renderStatus()}
      </div>

      <form onSubmit={handleSubmit} className="kyc-form">
        {step === 1 && (
          <div className="form-section">
            <h2 className="section-title">Personal Details & Passport Photo</h2>
            
            <div className="passport-photo-section">
              <h3>Passport Size Photo *</h3>
              <p className="photo-guidelines">
                Requirements: Recent photo, clear face view, plain background, size less than 2MB
              </p>
              
              {!previewImages.passportPhoto ? (
                <div className="photo-upload-area">
                  <label htmlFor="passportUpload" className="upload-btn">
                    📸 Upload Passport Photo
                  </label>
                  <input
                    id="passportUpload"
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageChange(e, "passportPhoto")}
                    className="hidden-input"
                    required
                  />
                </div>
              ) : (
                <div className="image-preview passport-preview">
                  <img src={previewImages.passportPhoto} alt="Passport Preview" />
                  <button 
                    type="button" 
                    className="delete-btn" 
                    onClick={() => handleImageDelete("passportPhoto")}
                  >
                    ✕
                  </button>
                </div>
              )}
            </div>

            <input
              type="text"
              name="adharName"
              value={form.adharName}
              onChange={handleInputChange}
              placeholder="Full Name (as per Aadhaar)"
              required
            />
          </div>
        )}

        {step === 2 && (
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
            
            {!previewImages.aadhaar && (
              <label htmlFor="aadhaarUpload" className="upload-btn">
                📂 Upload Aadhaar (Front & Back)
              </label>
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
                <button 
                  type="button" 
                  className="delete-btn" 
                  onClick={() => handleImageDelete("aadhaar")}
                >
                  ✕
                </button>
              </div>
            )}
          </div>
        )}

        {step === 3 && (
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
            
            {!previewImages.pan && (
              <label htmlFor="panUpload" className="upload-btn">
                📂 Upload PAN Card
              </label>
            )}
            
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
                <button 
                  type="button" 
                  className="delete-btn" 
                  onClick={() => handleImageDelete("pan")}
                >
                  ✕
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
            
            {!previewImages.bank && (
              <label htmlFor="bankUpload" className="upload-btn">
                📂 Upload Bank Proof (Passbook/Statement)
              </label>
            )}
            
            <input
              id="bankUpload"
              type="file"
              accept="image/*,application/pdf"
              onChange={(e) => handleImageChange(e, "bank")}
              className="hidden-input"
              required
            />
            
            {previewImages.bank && (
              <div className="image-preview">
                <img src={previewImages.bank} alt="Bank Preview" />
                <button 
                  type="button" 
                  className="delete-btn" 
                  onClick={() => handleImageDelete("bank")}
                >
                  ✕
                </button>
              </div>
            )}
          </div>
        )}

        <div className="form-actions">
          {step > 1 && (
            <button 
              type="button" 
              className="btn btn-secondary" 
              onClick={() => setStep(step - 1)}
            >
              Back
            </button>
          )}
          
          {step < 3 ? (
            <button 
              type="button" 
              className="btn btn-primary" 
              onClick={() => setStep(step + 1)}
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              disabled={loading}
              className="btn btn-submit"
            >
              {loading ? "Uploading..." : "Submit for Verification"}
            </button>
          )}
        </div>
      </form>
    </main>
  );
}