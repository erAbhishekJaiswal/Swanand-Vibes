import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import "../../../CssFiles/Admin/Gift/GiftUpload.css";

const UploadImage = () => {
  const [formData, setFormData] = useState({
    title: "",
    category: "Certificate",
  });
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handle form field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle image selection with preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image must be less than 2MB");
      return;
    }

    setImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  // Handle image delete
  const handleImageDelete = () => {
    setImage(null);
    setPreviewImage(null);
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) return toast.error("Please upload an image");

    setLoading(true);
    try {
      // 🔹 Get Cloudinary signature from backend
      const sigRes = await axios.get("https://swanand-vibes-backend.vercel.app/api/products/signature");
      console.log(sigRes.data);
      
      const { timestamp, signature, cloudName, apiKey } = sigRes.data;

      // 🔹 Upload to Cloudinary
      const data = new FormData();
      data.append("file", image);
      data.append("api_key", apiKey);
      data.append("timestamp", timestamp);
      data.append("signature", signature);

      const uploadRes = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        data
      );

      const { secure_url } = uploadRes.data;

      console.log({
        title: formData.title,
        category: formData.category,
        imageUrl: secure_url,
      });
      
      // 🔹 Save to database
      await axios.post("https://swanand-vibes-backend.vercel.app/api/gallery", {
        title: formData.title,
        category: formData.category,
        imageUrl: secure_url,
      });

      toast.success("Image uploaded successfully!");
      setFormData({ title: "", category: "Certificate" });
      setImage(null);
      setPreviewImage(null);
    } catch (err) {
      console.error("Upload failed:", err);
      toast.error("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-container">
      <h2>Upload Gallery Image</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleInputChange}
          required
        />

        <select
          name="category"
          value={formData.category}
          onChange={handleInputChange}
        >
          <option className="gift-category-option">Certificate</option>
          <option className="gift-category-option">Business Plan</option>
          <option className="gift-category-option">Product Catalog</option>
          <option className="gift-category-option">Banner</option>
        </select>

        {!previewImage ? (
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            required
          />
        ) : (
          <div className="image-preview">
            <img src={previewImage} alt="Preview" />
            <button
              type="button"
              className="delete-btn"
              onClick={handleImageDelete}
            >
              ✕
            </button>
          </div>
        )}

        <button type="submit" disabled={loading}>
          {loading ? "Uploading..." : "Upload"}
        </button>
      </form>
    </div>
  );
};

export default UploadImage;
