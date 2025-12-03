import React, { useState, useEffect } from "react";
import axios from "axios";
import '../../../CssFiles/Admin/product/ProductForm.css';
import { createProduct } from '../../../utills/apicall';
import Spinner from "../../../components/Spinner";
import { toast } from 'react-hot-toast';
import axiosInstance from "../../../utills/axiosInstance";

const CreateProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    tax: 0,
    brand: "",
    category: "",
    stock: "", // This will be calculated from variants
  });

  const [variants, setVariants] = useState([
    {
      size: "",
      price: "",
      stock: "",
      images: [],
      previewImages: [],
    }
  ]);

  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [variantErrors, setVariantErrors] = useState([{}]);
  const [categoryOptions, setCategoryOptions] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axiosInstance.get(`${import.meta.env.VITE_API_URL}/category`);
      setCategoryOptions(response.data.categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast.error("Failed to load categories");
    }
  };

  // Handle text input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  // Handle variant changes
  const handleVariantChange = (index, e) => {
    const { name, value } = e.target;
    const updatedVariants = [...variants];
    updatedVariants[index][name] = value;
    setVariants(updatedVariants);
    
    // Clear variant error when field is edited
    if (variantErrors[index] && variantErrors[index][name]) {
      const updatedErrors = [...variantErrors];
      updatedErrors[index] = { ...updatedErrors[index], [name]: '' };
      setVariantErrors(updatedErrors);
    }
  };

  // Add a new variant
  const addVariant = () => {
    setVariants([...variants, {
      size: "",
      price: "",
      stock: "",
      images: [],
      previewImages: [],
    }]);
    setVariantErrors([...variantErrors, {}]);
  };

  // Remove a variant
  const removeVariant = (index) => {
    if (variants.length === 1) {
      toast.error("At least one variant is required");
      return;
    }
    
    const updatedVariants = [...variants];
    updatedVariants.splice(index, 1);
    setVariants(updatedVariants);
    
    const updatedErrors = [...variantErrors];
    updatedErrors.splice(index, 1);
    setVariantErrors(updatedErrors);
  };

  // Handle main product image changes
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

  // Handle variant image changes
  const handleVariantImageChange = (variantIndex, e) => {
    const files = Array.from(e.target.files);
    
    // Validate file types and size
    const validFiles = files.filter(file => {
      if (!file.type.startsWith('image/')) {
        const updatedErrors = [...variantErrors];
        updatedErrors[variantIndex] = { 
          ...updatedErrors[variantIndex], 
          images: 'Please select only image files' 
        };
        setVariantErrors(updatedErrors);
        return false;
      }
      if (file.size > 5 * 1024 * 1024) {
        const updatedErrors = [...variantErrors];
        updatedErrors[variantIndex] = { 
          ...updatedErrors[variantIndex], 
          images: 'Image size should be less than 5MB' 
        };
        setVariantErrors(updatedErrors);
        return false;
      }
      return true;
    });

    if (validFiles.length === 0) return;

    // Append new files with old ones
    const updatedVariants = [...variants];
    const currentVariant = updatedVariants[variantIndex];
    const updatedFiles = [...currentVariant.images, ...validFiles];
    
    updatedVariants[variantIndex] = {
      ...currentVariant,
      images: updatedFiles,
      previewImages: updatedFiles.map((file) => URL.createObjectURL(file))
    };
    
    setVariants(updatedVariants);
    
    // Clear image errors if any
    if (variantErrors[variantIndex] && variantErrors[variantIndex].images) {
      const updatedErrors = [...variantErrors];
      updatedErrors[variantIndex] = { ...updatedErrors[variantIndex], images: '' };
      setVariantErrors(updatedErrors);
    }
  };

  // Remove main product image
  const removeImage = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    const updatedPreviews = previewImages.filter((_, i) => i !== index);
    
    setImages(updatedImages);
    setPreviewImages(updatedPreviews);
    
    // Revoke the object URL to avoid memory leaks
    URL.revokeObjectURL(previewImages[index]);
  };

  // Remove variant image
  const removeVariantImage = (variantIndex, imageIndex) => {
    const updatedVariants = [...variants];
    const currentVariant = updatedVariants[variantIndex];
    
    const updatedImages = currentVariant.images.filter((_, i) => i !== imageIndex);
    const updatedPreviews = currentVariant.previewImages.filter((_, i) => i !== imageIndex);
    
    // Revoke the object URL to avoid memory leaks
    URL.revokeObjectURL(currentVariant.previewImages[imageIndex]);
    
    updatedVariants[variantIndex] = {
      ...currentVariant,
      images: updatedImages,
      previewImages: updatedPreviews
    };
    
    setVariants(updatedVariants);
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Product name is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.brand.trim()) newErrors.brand = 'Brand is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (images.length === 0) newErrors.images = 'At least one image is required';
    
    // Validate variants
    const newVariantErrors = [];
    let hasVariantErrors = false;
    
    variants.forEach((variant, index) => {
      const variantError = {};
      
      if (!variant.size.trim()) {
        variantError.size = 'Size is required';
        hasVariantErrors = true;
      }
      
      if (!variant.price || variant.price <= 0) {
        variantError.price = 'Valid price is required';
        hasVariantErrors = true;
      }
      
      if (!variant.stock || variant.stock < 0) {
        variantError.stock = 'Valid stock count is required';
        hasVariantErrors = true;
      }
      
      if (variant.images.length === 0) {
        variantError.images = 'At least one image is required for this variant';
        hasVariantErrors = true;
      }
      
      newVariantErrors.push(variantError);
    });
    
    setErrors(newErrors);
    setVariantErrors(newVariantErrors);
    
    return Object.keys(newErrors).length === 0 && !hasVariantErrors;
  };

  // Upload images to Cloudinary
  const uploadImagesToCloudinary = async (imageFiles, signatureData) => {
    const { timestamp, signature, cloudName, apiKey } = signatureData;
    const uploadedImages = [];
    
    for (const image of imageFiles) {
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
    
    return uploadedImages;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    setLoading(true);

    try {
      // 1. Get Cloudinary signature from backend
      const sigRes = await axiosInstance.get(
        `${import.meta.env.VITE_API_URL}/products/signature`
      );
      const signatureData = sigRes.data;

      // 2. Upload main product images to Cloudinary
      const uploadedMainImages = await uploadImagesToCloudinary(images, signatureData);

      // 3. Upload variant images to Cloudinary
      const variantsWithUploadedImages = await Promise.all(
        variants.map(async (variant) => {
          const uploadedVariantImages = await uploadImagesToCloudinary(variant.images, signatureData);
          return {
            size: variant.size,
            price: variant.price,
            stock: variant.stock,
            images: uploadedVariantImages,
          };
        })
      );

      // Calculate total stock from variants
      const totalStock = variantsWithUploadedImages.reduce((total, variant) => total + parseInt(variant.stock || 0), 0);

      // 4. Send product data with images to backend
      const newProduct =  await axiosInstance.post(
        `${import.meta.env.VITE_API_URL}/products/`,
        {
          ...formData,
          stock: totalStock,
          images: uploadedMainImages,
          variants: variantsWithUploadedImages,
          user: "689ff606db12335b27127163", // Example user ID
        })
        // console.log("Product created:", newProduct.data);
        
      // await createProduct({
      //   ...formData,
      //   stock: totalStock,
      //   images: uploadedMainImages,
      //   variants: variantsWithUploadedImages,
      //   user: "689ff606db12335b27127163", // Example user ID
      // });

      // console.log("Product created:", newProduct.data);
      
      // Show success message
      toast.success("Product uploaded successfully!");

      // Reset form
      setFormData({
        name: "",
        description: "",
        tax: 0,
        brand: "",
        category: "",
        stock: "",
      });
      
      setVariants([{
        size: "",
        price: "",
        stock: "",
        images: [],
        previewImages: [],
      }]);
      
      setImages([]);
      setPreviewImages([]);
      setErrors({});
      setVariantErrors([{}]);
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

      {loading ? <Spinner size="lg"/> : 
      <form onSubmit={handleSubmit} className="product-form">
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Product Name
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
            <label htmlFor="tax" className="form-label">
              Tax (%)
            </label>
            <input
              type="number"
              id="tax"
              name="tax"
              className={`form-input ${errors.tax ? 'error' : ''}`}
              placeholder="0"
              min="0"
              step="0.01"
              value={formData.tax}
              onChange={handleChange}
            />
            {errors.tax && <span className="error-text">{errors.tax}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="brand" className="form-label">
              Brand
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

          <div className="form-group full-width">
            <label htmlFor="category" className="form-label">
              Category
            </label>
            <select
              name="category"
              id="category"
              className={`form-select ${errors.category ? 'error' : ''}`}
              value={formData.category}
              onChange={handleChange}
            >
              <option className="catg-option" value="">Select Category</option>
              {categoryOptions?.map((category) => (
                <option className="catg-option" key={category?._id} value={category?._id}>
                  {category?.name}
                </option>
              ))}
            </select>
            {errors.category && <span className="error-text">{errors.category}</span>}
          </div>

          <div className="form-group full-width">
            <label htmlFor="description" className="form-label">
              Description 
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

          {/* Variants Section */}
          <div className="form-group full-width">
            <div className="variants-header">
              <h3>Product Variants </h3>
              <button type="button" className="add-variant-btn" onClick={addVariant}>
                + Add Variant
              </button>
            </div>
            
            {variants.map((variant, index) => (
              <div key={index} className="variant-card">
                <div className="variant-header">
                  <h4>Variant {index + 1}</h4>
                  {variants.length > 1 && (
                    <button 
                      type="button" 
                      className="remove-variant-btn"
                      onClick={() => removeVariant(index)}
                    >
                      Remove
                    </button>
                  )}
                </div>
                
                <div className="variant-fields">
                  <div className="form-group">
                    <label htmlFor={`size-${index}`} className="form-label">
                      Size 
                    </label>
                    <input
                      type="text"
                      id={`size-${index}`}
                      name="size"
                      className={`form-input ${variantErrors[index]?.size ? 'error' : ''}`}
                      placeholder="e.g., S, M, L, XL"
                      value={variant.size}
                      onChange={(e) => handleVariantChange(index, e)}
                    />
                    {variantErrors[index]?.size && (
                      <span className="error-text">{variantErrors[index].size}</span>
                    )}
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor={`variant-price-${index}`} className="form-label">
                      Price (₹) 
                    </label>
                    <input
                      type="number"
                      id={`variant-price-${index}`}
                      name="price"
                      className={`form-input ${variantErrors[index]?.price ? 'error' : ''}`}
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                      value={variant.price}
                      onChange={(e) => handleVariantChange(index, e)}
                    />
                    {variantErrors[index]?.price && (
                      <span className="error-text">{variantErrors[index].price}</span>
                    )}
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor={`variant-stock-${index}`} className="form-label">
                      Stock Quantity 
                    </label>
                    <input
                      type="number"
                      id={`variant-stock-${index}`}
                      name="stock"
                      className={`form-input ${variantErrors[index]?.stock ? 'error' : ''}`}
                      placeholder="0"
                      min="0"
                      value={variant.stock}
                      onChange={(e) => handleVariantChange(index, e)}
                    />
                    {variantErrors[index]?.stock && (
                      <span className="error-text">{variantErrors[index].stock}</span>
                    )}
                  </div>
                  
                  <div className="form-group full-width">
                    <label htmlFor={`variant-images-${index}`} className="form-label">
                      Variant Images *
                    </label>
                    <div className={`file-upload ${variantErrors[index]?.images ? 'error' : ''}`}>
                      <input
                        type="file"
                        id={`variant-images-${index}`}
                        accept="image/*"
                        multiple
                        onChange={(e) => handleVariantImageChange(index, e)}
                        className="file-input"
                      />
                      <label htmlFor={`variant-images-${index}`} className="file-upload-label">
                        <span className="upload-icon">📁</span>
                        <span>Choose variant images</span>
                        <span className="upload-hint">(Max 5MB per image)</span>
                      </label>
                    </div>
                    {variantErrors[index]?.images && (
                      <span className="error-text">{variantErrors[index].images}</span>
                    )}
                    
                    {/* Variant image previews */}
                    {variant.previewImages.length > 0 && (
                      <div className="preview-container">
                        <h4 className="preview-title">Variant Images ({variant.previewImages.length})</h4>
                        <div className="preview-grid">
                          {variant.previewImages.map((src, imgIndex) => (
                            <div key={imgIndex} className="preview-item">
                              <img
                                src={src}
                                alt={`Variant ${index + 1} Preview ${imgIndex + 1}`}
                                className="preview-image"
                              />
                              <button
                                type="button"
                                className="delete-image-btn"
                                onClick={() => removeVariantImage(index, imgIndex)}
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
              </div>
            ))}
          </div>

          <div className="form-group full-width">
            <label htmlFor="images" className="form-label">
              Main Product Images *
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
                <span>Choose main product images</span>
                <span className="upload-hint">(Max 5MB per image)</span>
              </label>
            </div>
            {errors.images && <span className="error-text">{errors.images}</span>}
            
            {/* Main product image previews */}
            {previewImages.length > 0 && (
              <div className="preview-container">
                <h3 className="preview-title">Main Product Images ({previewImages.length})</h3>
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
                description: "",
                tax: 0,
                brand: "",
                category: "",
                stock: "",
              });
              setVariants([{
                size: "",
                price: "",
                stock: "",
                images: [],
                previewImages: []
              }]);
              setImages([]);
              setPreviewImages([]);
              setErrors({});
              setVariantErrors([{}]);
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
              "Create Product"
            )}
          </button>
        </div>
      </form>}
    </div>
  );
};

export default CreateProduct;