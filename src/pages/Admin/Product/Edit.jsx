// EditProduct.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import '../../../CssFiles/Admin/product/ProductForm.css';

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    brand: "",
    category: "",
    countInStock: "",
  });

  const [existingImages, setExistingImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [errors, setErrors] = useState({});

  // Fetch product data
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setFetching(true);
        const response = await axios.get(
          `http://localhost:5000/api/products/${id}`
        );
        const product = response.data.data;
        
        setFormData({
          name: product.name || "",
          price: product.price || "",
          description: product.description || "",
          brand: product.brand || "",
          category: product.category || "",
          countInStock: product.countInStock || "",
        });

        setExistingImages(product.images || []);
        setPreviewImages(product.images?.map(img => img.url) || []);
      } catch (err) {
        console.error("Error fetching product:", err);
        alert("Failed to load product data.");
      } finally {
        setFetching(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

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

    // Append new files
    const updatedFiles = [...newImages, ...validFiles];
    setNewImages(updatedFiles);

    // Generate preview URLs for new images
    const newPreviews = validFiles.map((file) => URL.createObjectURL(file));
    setPreviewImages([...previewImages, ...newPreviews]);
    
    // Clear image errors if any
    if (errors.images) {
      setErrors({ ...errors, images: '' });
    }
  };

  // Remove existing image
  const removeExistingImage = (index) => {
    const updatedImages = existingImages.filter((_, i) => i !== index);
    const updatedPreviews = previewImages.filter((_, i) => i !== index);
    
    setExistingImages(updatedImages);
    setPreviewImages(updatedPreviews);
  };

  // Remove new image (not yet uploaded)
  const removeNewImage = (index) => {
    const newIndex = index - existingImages.length;
    const updatedImages = newImages.filter((_, i) => i !== newIndex);
    const updatedPreviews = previewImages.filter((_, i) => i !== index);
    
    setNewImages(updatedImages);
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
    if (previewImages.length === 0) newErrors.images = 'At least one image is required';
    
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
      let uploadedImages = [...existingImages];

      // Upload new images to Cloudinary if any
      if (newImages.length > 0) {
        // 1. Get Cloudinary signature from backend
        const sigRes = await axios.get(
          "http://localhost:5000/api/products/signature"
        );
        const { timestamp, signature, cloudName, apiKey } = sigRes.data;

        for (const image of newImages) {
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
      }

      // 3. Update product data
      const updatedProduct = await axios.put(
        `http://localhost:5000/api/products/${id}`,
        {
          ...formData,
          images: uploadedImages,
        }
      );

      console.log("Product updated:", updatedProduct.data);
      
      // Show success message
      alert("Product updated successfully!");
      
      // Call the onSave callback if provided
    //   if (onSave) {
    //     onSave(updatedProduct.data);
    //   }
        // Optionally, redirect or reset form here
        navigate(`/admin/product/${id}`);
    } catch (err) {
      console.error("Error updating product:", err);
      alert("Failed to update product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="product-form-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading product data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="product-form-container">
      <div className="form-header">
        <h1>Edit Product</h1>
        <p>Update product information</p>
      </div>

      <form onSubmit={handleSubmit} className="product-form">
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
              <option value="">Select Category</option>
              <option value="Electronics">Electronics</option>
              <option value="Clothing">Clothing</option>
              <option value="Home">Home</option>
              <option value="Books">Books</option>
              <option value="Beauty">Beauty</option>
              <option value="Sports">Sports</option>
              <option value="Spiritual">Spiritual</option>
              <option value="Other">Other</option>
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
                <span>Add more images</span>
                <span className="upload-hint">(Max 5MB per image)</span>
              </label>
            </div>
            {errors.images && <span className="error-text">{errors.images}</span>}
            
            {/* Image previews with delete buttons */}
            {previewImages.length > 0 && (
              <div className="preview-container">
                <h3 className="preview-title">
                  Product Images ({previewImages.length})
                  <span className="image-type-hint">
                    {existingImages.length > 0 && `(${existingImages.length} existing, ${newImages.length} new)`}
                  </span>
                </h3>
                <div className="preview-grid">
                  {previewImages?.map((src, index) => (
                    <div key={index} className="preview-item">
                      <img
                        src={src}
                        alt={`Preview ${index + 1}`}
                        className="preview-image"
                      />
                      <button
                        type="button"
                        className="delete-image-btn"
                        onClick={() => 
                          index < existingImages.length 
                            ? removeExistingImage(index) 
                            : removeNewImage(index)
                        }
                        title="Remove image"
                      >
                        ×
                      </button>
                      {index < existingImages.length && (
                        <span className="existing-badge">Existing</span>
                      )}
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
            // onClick={onCancel}
            disabled={loading}
          >
            Cancel
          </button>
          <button 
            type="submit" 
            className="submit-btn"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner"></span>
                Updating...
              </>
            ) : (
              <>
                <span className="submit-icon">💾</span>
                Update Product
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;