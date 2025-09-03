// import React, { useState } from "react";
// import axios from "axios";
// import "../../../CssFiles/Admin/product/create.css";

// const CreateProduct = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     price: "",
//     description: "",
//     brand: "",
//     category: "",
//     countInStock: "",
//   });

//   const [images, setImages] = useState([]);
//   const [previewImages, setPreviewImages] = useState([]); // for preview
//   const [loading, setLoading] = useState(false);

//   // Handle text input changes
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleImageChange = (e) => {
//     const files = Array.from(e.target.files);

//     // Append new files with old ones
//     const updatedFiles = [...images, ...files];
//     setImages(updatedFiles);

//     // Generate preview URLs
//     const previews = updatedFiles.map((file) => URL.createObjectURL(file));
//     setPreviewImages(previews);
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       // 1. Get Cloudinary signature from backend
//       const sigRes = await axios.get(
//         "http://localhost:5000/api/products/signature"
//       );
//       const { timestamp, signature, cloudName, apiKey } = sigRes.data;

//       // 2. Prepare FormData for image upload
//       console.log({
//         images,
//         previewImages,
//       });
//       // 2. Upload all images to Cloudinary
//       const uploadedImages = [];
//       for (const image of images) {
//         const imageFormData = new FormData();
//         imageFormData.append("file", image);
//         imageFormData.append("api_key", apiKey);
//         imageFormData.append("timestamp", timestamp);
//         imageFormData.append("signature", signature);

//         const uploadRes = await axios.post(
//           `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
//           imageFormData
//         );

//         uploadedImages.push({
//           public_id: uploadRes.data.public_id,
//           url: uploadRes.data.secure_url,
//         });
//       }

//       // 3. Send product data with images to backend
//       const newProduct = await axios.post(
//         "http://localhost:5000/api/products/",
//         {
//           ...formData,
//           images: uploadedImages,
//           user: "689ff606db12335b27127163", // Example user ID
//         }
//       );

//       console.log("Product created:", newProduct.data);
//       alert("Product uploaded successfully!");

//       // Reset form
//       setFormData({
//         name: "",
//         price: "",
//         description: "",
//         brand: "",
//         category: "",
//         countInStock: "",
//       });
//       setImages([]);
//       setPreviewImages([]);
//     } catch (err) {
//       console.error("Error uploading product:", err);
//       alert("Failed to upload product.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <form onSubmit={handleSubmit} className="product-form">
//         <input
//           type="text"
//           name="name"
//           className="input-field"
//           placeholder="Product Name"
//           value={formData.name}
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="number"
//           name="price"
//           className="input-field"
//           placeholder="Price"
//           value={formData.price}
//           onChange={handleChange}
//           required
//         />
//         <textarea
//           name="description"
//           placeholder="Description"
//           className="input-field"
//           value={formData.description}
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="text"
//           name="brand"
//           placeholder="Brand"
//           className="input-field"
//           value={formData.brand}
//           onChange={handleChange}
//           required
//         />

//         <select
//           name="category"
//           value={formData.category}
//           className="input-field"
//           onChange={handleChange}
//           required
//         >
//           <option className="select-options" value="">Select Category</option>
//           <option className="select-options" value="Electronics">Electronics</option>
//           <option className="select-options" value="Clothing">Clothing</option>
//           <option className="select-options" value="Home">Home</option>
//           <option className="select-options" value="Books">Books</option>
//           <option className="select-options" value="Beauty">Beauty</option>
//           <option className="select-options" value="Sports">Sports</option>
//           <option className="select-options" value="Spiritual">Spiritual</option>
//           <option className="select-options" value="Other">Other</option>
//         </select>

//         <input
//           type="number"
//           name="countInStock"
//           className="input-field"       
//           placeholder="Count in Stock"
//           value={formData.countInStock}
//           onChange={handleChange}
//           required
//         />

//         {/* File input for multiple images */}
//         <input
//           type="file"
//           accept="image/*"
//           className="input-field"
//           multiple
//           onChange={handleImageChange}
//           required
//         />

//         {/* Preview selected images */}
//         <div className="preview-container">
//           {previewImages.map((src, index) => (
//             <img
//               width={200}
//               height={200}
//               key={index}
//               src={src}
//               alt={`Preview ${index + 1}`}
//               className="preview-image"
//             />
//           ))}
//         </div>

//         <button type="submit" disabled={loading}>
//           {loading ? "Uploading..." : "Create Product"}
//         </button>
//       </form>
//     </>
//   );
// };

// export default CreateProduct;




















// CreateProduct.js (Updated)
import React, { useState } from "react";
import axios from "axios";
import '../../../CssFiles/Admin/product/ProductForm.css';
import {createProduct} from '../../../utills/apicall'
import Spinner from "../../../components/Spinner";
import {toast} from 'react-hot-toast';

const CreateProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    brand: "",
    category: "",
    countInStock: "",
  });

  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Handle text input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    
    // Validate file types and size
    const validFiles = files.filter(file => {
      if (!file.type.startsWith('image/')) {
        setErrors({ ...errors, images: 'Please select only image files' });
        return false;
      }
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setErrors({ ...errors, images: 'Image size should be less than 5MB' });
        return false;
      }
      return true;
    });

    if (validFiles.length === 0) return;

    // Append new files with old ones
    const updatedFiles = [...images, ...validFiles];
    setImages(updatedFiles);

    // Generate preview URLs
    const previews = updatedFiles.map((file) => URL.createObjectURL(file));
    setPreviewImages(previews);
    
    // Clear image errors if any
    if (errors.images) {
      setErrors({ ...errors, images: '' });
    }
  };

  // Remove image from selection
  const removeImage = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    const updatedPreviews = previewImages.filter((_, i) => i !== index);
    
    setImages(updatedImages);
    setPreviewImages(updatedPreviews);
    
    // Revoke the object URL to avoid memory leaks
    URL.revokeObjectURL(previewImages[index]);
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Product name is required';
    if (!formData.price || formData.price <= 0) newErrors.price = 'Valid price is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.brand.trim()) newErrors.brand = 'Brand is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.countInStock || formData.countInStock < 0) newErrors.countInStock = 'Valid stock count is required';
    if (images.length === 0) newErrors.images = 'At least one image is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // 1. Get Cloudinary signature from backend
      const sigRes = await axios.get(
        "http://localhost:5000/api/products/signature"
      );
      const { timestamp, signature, cloudName, apiKey } = sigRes.data;

      // 2. Upload all images to Cloudinary
      const uploadedImages = [];
      for (const image of images) {
        const imageFormData = new FormData();
        imageFormData.append("file", image);
        imageFormData.append("api_key", apiKey);
        imageFormData.append("timestamp", timestamp);
        imageFormData.append("signature", signature);

        const uploadRes = await axios.post(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          imageFormData
        );

        uploadedImages.push({
          public_id: uploadRes.data.public_id,
          url: uploadRes.data.secure_url,
        });
      }

      // 3. Send product data with images to backend
      const newProduct = await createProduct({
        ...formData,
        images: uploadedImages,
        user: "689ff606db12335b27127163", // Example user ID
      });
      // axios.post(
      //   "http://localhost:5000/api/products/",
      //   {
      //     ...formData,
      //     images: uploadedImages,
      //     user: "689ff606db12335b27127163", // Example user ID
      //   }
      // );

      console.log("Product created:", newProduct.data);
      
      // Show success message
      toast.success("Product uploaded successfully!");

      // Reset form
      setFormData({
        name: "",
        price: "",
        description: "",
        brand: "",
        category: "",
        countInStock: "",
      });
      setImages([]);
      setPreviewImages([]);
      setErrors({});
    } catch (err) {
      console.error("Error uploading product:", err);
      toast.error("Failed to upload product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="product-form-container">
      <div className="form-header">
        <h1>Create New Product</h1>
        <p>Add a new product to your inventory</p>
      </div>

      {loading ? <Spinner /> : <form onSubmit={handleSubmit} className="product-form">
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Product Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className={`form-input ${errors.name ? 'error' : ''}`}
              placeholder="Enter product name"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <span className="error-text">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="price" className="form-label">
              Price ($) *
            </label>
            <input
              type="number"
              id="price"
              name="price"
              className={`form-input ${errors.price ? 'error' : ''}`}
              placeholder="0.00"
              min="0"
              step="0.01"
              value={formData.price}
              onChange={handleChange}
            />
            {errors.price && <span className="error-text">{errors.price}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="brand" className="form-label">
              Brand *
            </label>
            <input
              type="text"
              id="brand"
              name="brand"
              className={`form-input ${errors.brand ? 'error' : ''}`}
              placeholder="Enter brand name"
              value={formData.brand}
              onChange={handleChange}
            />
            {errors.brand && <span className="error-text">{errors.brand}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="countInStock" className="form-label">
              Stock Quantity *
            </label>
            <input
              type="number"
              id="countInStock"
              name="countInStock"
              className={`form-input ${errors.countInStock ? 'error' : ''}`}
              placeholder="0"
              min="0"
              value={formData.countInStock}
              onChange={handleChange}
            />
            {errors.countInStock && <span className="error-text">{errors.countInStock}</span>}
          </div>

          <div className="form-group full-width">
            <label htmlFor="category" className="form-label">
              Category *
            </label>
            <select
              id="category"
              name="category"
              className={`form-select ${errors.category ? 'error' : ''}`}
              value={formData.category}
              onChange={handleChange}
            >
              <option className="catg-option" value="">Select Category</option>
              <option className="catg-option" value="Electronics">Electronics</option>
              <option className="catg-option" value="Clothing">Clothing</option>
              <option className="catg-option" value="Home">Home</option>
              <option className="catg-option" value="Books">Books</option>
              <option className="catg-option" value="Beauty">Beauty</option>
              <option className="catg-option" value="Sports">Sports</option>
              <option className="catg-option" value="Spiritual">Spiritual</option>
              <option className="catg-option" value="Other">Other</option>
            </select>
            {errors.category && <span className="error-text">{errors.category}</span>}
          </div>

          <div className="form-group full-width">
            <label htmlFor="description" className="form-label">
              Description *
            </label>
            <textarea
              id="description"
              name="description"
              className={`form-textarea ${errors.description ? 'error' : ''}`}
              placeholder="Enter product description..."
              rows="4"
              value={formData.description}
              onChange={handleChange}
            />
            {errors.description && <span className="error-text">{errors.description}</span>}
          </div>

          <div className="form-group full-width">
            <label htmlFor="images" className="form-label">
              Product Images *
            </label>
            <div className={`file-upload ${errors.images ? 'error' : ''}`}>
              <input
                type="file"
                id="images"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                className="file-input"
              />
              <label htmlFor="images" className="file-upload-label">
                <span className="upload-icon">📁</span>
                <span>Choose images</span>
                <span className="upload-hint">(Max 5MB per image)</span>
              </label>
            </div>
            {errors.images && <span className="error-text">{errors.images}</span>}
            
            {/* Image previews with delete buttons */}
            {previewImages.length > 0 && (
              <div className="preview-container">
                <h3 className="preview-title">Selected Images ({previewImages.length})</h3>
                <div className="preview-grid">
                  {previewImages.map((src, index) => (
                    <div key={index} className="preview-item">
                      <img
                        src={src}
                        alt={`Preview ${index + 1}`}
                        className="preview-image"
                      />
                      <button
                        type="button"
                        className="delete-image-btn"
                        onClick={() => removeImage(index)}
                        title="Remove image"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="form-actions">
          <button 
            type="button" 
            className="cancel-btn"
            onClick={() => {
              setFormData({
                name: "",
                price: "",
                description: "",
                brand: "",
                category: "",
                countInStock: "",
              });
              setImages([]);
              setPreviewImages([]);
              setErrors({});
            }}
          >
            Clear Form
          </button>
          <button 
            type="submit" 
            className="submit-btn"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner"></span>
                Uploading...
              </>
            ) : (
              <>
                <span className="submit-icon">🚀</span>
                Create Product
              </>
            )}
          </button>
        </div>
      </form>}
    </div>
  );
};

export default CreateProduct;