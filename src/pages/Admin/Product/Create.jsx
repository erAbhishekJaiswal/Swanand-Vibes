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
// import React, { useState } from "react";
// import axios from "axios";
// import '../../../CssFiles/Admin/product/ProductForm.css';
// import {createProduct} from '../../../utills/apicall'
// import Spinner from "../../../components/Spinner";
// import {toast} from 'react-hot-toast';

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
//   const [previewImages, setPreviewImages] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [errors, setErrors] = useState({});

//   // Handle text input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
    
//     // Clear error when field is edited
//     if (errors[name]) {
//       setErrors({ ...errors, [name]: '' });
//     }
//   };

//   const handleImageChange = (e) => {
//     const files = Array.from(e.target.files);
    
//     // Validate file types and size
//     const validFiles = files.filter(file => {
//       if (!file.type.startsWith('image/')) {
//         setErrors({ ...errors, images: 'Please select only image files' });
//         return false;
//       }
//       if (file.size > 5 * 1024 * 1024) { // 5MB limit
//         setErrors({ ...errors, images: 'Image size should be less than 5MB' });
//         return false;
//       }
//       return true;
//     });

//     if (validFiles.length === 0) return;

//     // Append new files with old ones
//     const updatedFiles = [...images, ...validFiles];
//     setImages(updatedFiles);

//     // Generate preview URLs
//     const previews = updatedFiles.map((file) => URL.createObjectURL(file));
//     setPreviewImages(previews);
    
//     // Clear image errors if any
//     if (errors.images) {
//       setErrors({ ...errors, images: '' });
//     }
//   };

//   // Remove image from selection
//   const removeImage = (index) => {
//     const updatedImages = images.filter((_, i) => i !== index);
//     const updatedPreviews = previewImages.filter((_, i) => i !== index);
    
//     setImages(updatedImages);
//     setPreviewImages(updatedPreviews);
    
//     // Revoke the object URL to avoid memory leaks
//     URL.revokeObjectURL(previewImages[index]);
//   };

//   // Validate form
//   const validateForm = () => {
//     const newErrors = {};
    
//     if (!formData.name.trim()) newErrors.name = 'Product name is required';
//     if (!formData.price || formData.price <= 0) newErrors.price = 'Valid price is required';
//     if (!formData.description.trim()) newErrors.description = 'Description is required';
//     if (!formData.brand.trim()) newErrors.brand = 'Brand is required';
//     if (!formData.category) newErrors.category = 'Category is required';
//     if (!formData.countInStock || formData.countInStock < 0) newErrors.countInStock = 'Valid stock count is required';
//     if (images.length === 0) newErrors.images = 'At least one image is required';
    
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!validateForm()) {
//       return;
//     }

//     setLoading(true);

//     try {
//       // 1. Get Cloudinary signature from backend
//       const sigRes = await axios.get(
//         "https://swanand-vibes-backend.vercel.app/api/products/signature"
//       );
//       const { timestamp, signature, cloudName, apiKey } = sigRes.data;

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
//       const newProduct = await createProduct({
//         ...formData,
//         images: uploadedImages,
//         user: "689ff606db12335b27127163", // Example user ID
//       });
//       // axios.post(
//       //   "http://localhost:5000/api/products/",
//       //   {
//       //     ...formData,
//       //     images: uploadedImages,
//       //     user: "689ff606db12335b27127163", // Example user ID
//       //   }
//       // );

//       console.log("Product created:", newProduct.data);
      
//       // Show success message
//       toast.success("Product uploaded successfully!");

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
//       setErrors({});
//     } catch (err) {
//       console.error("Error uploading product:", err);
//       toast.error("Failed to upload product. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="product-form-container">
//       <div className="form-header">
//         <h1>Create New Product</h1>
//         <p>Add a new product to your inventory</p>
//       </div>

//       {loading ? <Spinner /> : <form onSubmit={handleSubmit} className="product-form">
//         <div className="form-grid">
//           <div className="form-group">
//             <label htmlFor="name" className="form-label">
//               Product Name *
//             </label>
//             <input
//               type="text"
//               id="name"
//               name="name"
//               className={`form-input ${errors.name ? 'error' : ''}`}
//               placeholder="Enter product name"
//               value={formData.name}
//               onChange={handleChange}
//             />
//             {errors.name && <span className="error-text">{errors.name}</span>}
//           </div>

//           <div className="form-group">
//             <label htmlFor="price" className="form-label">
//               Price ($) *
//             </label>
//             <input
//               type="number"
//               id="price"
//               name="price"
//               className={`form-input ${errors.price ? 'error' : ''}`}
//               placeholder="0.00"
//               min="0"
//               step="0.01"
//               value={formData.price}
//               onChange={handleChange}
//             />
//             {errors.price && <span className="error-text">{errors.price}</span>}
//           </div>

//           <div className="form-group">
//             <label htmlFor="brand" className="form-label">
//               Brand *
//             </label>
//             <input
//               type="text"
//               id="brand"
//               name="brand"
//               className={`form-input ${errors.brand ? 'error' : ''}`}
//               placeholder="Enter brand name"
//               value={formData.brand}
//               onChange={handleChange}
//             />
//             {errors.brand && <span className="error-text">{errors.brand}</span>}
//           </div>

//           <div className="form-group">
//             <label htmlFor="countInStock" className="form-label">
//               Stock Quantity *
//             </label>
//             <input
//               type="number"
//               id="countInStock"
//               name="countInStock"
//               className={`form-input ${errors.countInStock ? 'error' : ''}`}
//               placeholder="0"
//               min="0"
//               value={formData.countInStock}
//               onChange={handleChange}
//             />
//             {errors.countInStock && <span className="error-text">{errors.countInStock}</span>}
//           </div>

//           <div className="form-group full-width">
//             <label htmlFor="category" className="form-label">
//               Category *
//             </label>
//             <select
//               id="category"
//               name="category"
//               className={`form-select ${errors.category ? 'error' : ''}`}
//               value={formData.category}
//               onChange={handleChange}
//             >
//               <option className="catg-option" value="">Select Category</option>
//               <option className="catg-option" value="Electronics">Electronics</option>
//               <option className="catg-option" value="Clothing">Clothing</option>
//               <option className="catg-option" value="Home">Home</option>
//               <option className="catg-option" value="Books">Books</option>
//               <option className="catg-option" value="Beauty">Beauty</option>
//               <option className="catg-option" value="Sports">Sports</option>
//               <option className="catg-option" value="Spiritual">Spiritual</option>
//               <option className="catg-option" value="Other">Other</option>
//             </select>
//             {errors.category && <span className="error-text">{errors.category}</span>}
//           </div>

//           <div className="form-group full-width">
//             <label htmlFor="description" className="form-label">
//               Description *
//             </label>
//             <textarea
//               id="description"
//               name="description"
//               className={`form-textarea ${errors.description ? 'error' : ''}`}
//               placeholder="Enter product description..."
//               rows="4"
//               value={formData.description}
//               onChange={handleChange}
//             />
//             {errors.description && <span className="error-text">{errors.description}</span>}
//           </div>

//           <div className="form-group full-width">
//             <label htmlFor="images" className="form-label">
//               Product Images *
//             </label>
//             <div className={`file-upload ${errors.images ? 'error' : ''}`}>
//               <input
//                 type="file"
//                 id="images"
//                 accept="image/*"
//                 multiple
//                 onChange={handleImageChange}
//                 className="file-input"
//               />
//               <label htmlFor="images" className="file-upload-label">
//                 <span className="upload-icon">📁</span>
//                 <span>Choose images</span>
//                 <span className="upload-hint">(Max 5MB per image)</span>
//               </label>
//             </div>
//             {errors.images && <span className="error-text">{errors.images}</span>}
            
//             {/* Image previews with delete buttons */}
//             {previewImages.length > 0 && (
//               <div className="preview-container">
//                 <h3 className="preview-title">Selected Images ({previewImages.length})</h3>
//                 <div className="preview-grid">
//                   {previewImages.map((src, index) => (
//                     <div key={index} className="preview-item">
//                       <img
//                         src={src}
//                         alt={`Preview ${index + 1}`}
//                         className="preview-image"
//                       />
//                       <button
//                         type="button"
//                         className="delete-image-btn"
//                         onClick={() => removeImage(index)}
//                         title="Remove image"
//                       >
//                         ×
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>

//         <div className="form-actions">
//           <button 
//             type="button" 
//             className="cancel-btn"
//             onClick={() => {
//               setFormData({
//                 name: "",
//                 price: "",
//                 description: "",
//                 brand: "",
//                 category: "",
//                 countInStock: "",
//               });
//               setImages([]);
//               setPreviewImages([]);
//               setErrors({});
//             }}
//           >
//             Clear Form
//           </button>
//           <button 
//             type="submit" 
//             className="submit-btn"
//             disabled={loading}
//           >
//             {loading ? (
//               <>
//                 <span className="spinner"></span>
//                 Uploading...
//               </>
//             ) : (
//               <>
//                 {/* <span className="submit-icon">🚀</span> */}
//                 Create Product
//               </>
//             )}
//           </button>
//         </div>
//       </form>}
//     </div>
//   );
// };

// export default CreateProduct;


// 18-09-2025
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import '../../../CssFiles/Admin/product/ProductForm.css';
// import { createProduct } from '../../../utills/apicall';
// import Spinner from "../../../components/Spinner";
// import { toast } from 'react-hot-toast';

// const CreateProduct = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     price: "",
//     discountPrice: "",
//     description: "",
//     brand: "",
//     category: "",
//     stock: "",
//   });

//   const [variants, setVariants] = useState([
//     {
//       size: "",
//       price: "",
//       stock: "",
//       images: [],
//       previewImages: [],
//       tax: 0
//     }
//   ]);

//   const [images, setImages] = useState([]);
//   const [previewImages, setPreviewImages] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [errors, setErrors] = useState({});
//   const [variantErrors, setVariantErrors] = useState([{}]);
//   const [categoryOptions, setCategoryOptions] = useState([]);

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   const fetchCategories = async () => {
//     try {
//       const response = await axios.get("https://swanand-vibes-backend.vercel.app/api/category");
//       setCategoryOptions(response.data.categories);
//       console.log(response.data.categories);
      
//     } catch (error) {
//       console.error("Error fetching categories:", error);
//     }
//   };

//   // const listing = categoryOptions.map((category) => console.log(category.name));
//   // console.log(listing);
  
//   // Handle text input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
    
//     // Clear error when field is edited
//     if (errors[name]) {
//       setErrors({ ...errors, [name]: '' });
//     }
//   };

//   // Handle variant changes
//   const handleVariantChange = (index, e) => {
//     const { name, value } = e.target;
//     const updatedVariants = [...variants];
//     updatedVariants[index][name] = value;
//     setVariants(updatedVariants);
    
//     // Clear variant error when field is edited
//     if (variantErrors[index] && variantErrors[index][name]) {
//       const updatedErrors = [...variantErrors];
//       updatedErrors[index] = { ...updatedErrors[index], [name]: '' };
//       setVariantErrors(updatedErrors);
//     }
//   };

//   // Add a new variant
//   const addVariant = () => {
//     setVariants([...variants, {
//       size: "",
//       price: "",
//       stock: "",
//       images: [],
//       previewImages: [],
//       tax: 0
//     }]);
//     setVariantErrors([...variantErrors, {}]);
//   };

//   // Remove a variant
//   const removeVariant = (index) => {
//     if (variants.length === 1) {
//       toast.error("At least one variant is required");
//       return;
//     }
    
//     const updatedVariants = [...variants];
//     updatedVariants.splice(index, 1);
//     setVariants(updatedVariants);
    
//     const updatedErrors = [...variantErrors];
//     updatedErrors.splice(index, 1);
//     setVariantErrors(updatedErrors);
//   };

//   // Handle main product image changes
//   const handleImageChange = (e) => {
//     const files = Array.from(e.target.files);
    
//     // Validate file types and size
//     const validFiles = files.filter(file => {
//       if (!file.type.startsWith('image/')) {
//         setErrors({ ...errors, images: 'Please select only image files' });
//         return false;
//       }
//       if (file.size > 5 * 1024 * 1024) { // 5MB limit
//         setErrors({ ...errors, images: 'Image size should be less than 5MB' });
//         return false;
//       }
//       return true;
//     });

//     if (validFiles.length === 0) return;

//     // Append new files with old ones
//     const updatedFiles = [...images, ...validFiles];
//     setImages(updatedFiles);

//     // Generate preview URLs
//     const previews = updatedFiles.map((file) => URL.createObjectURL(file));
//     setPreviewImages(previews);
    
//     // Clear image errors if any
//     if (errors.images) {
//       setErrors({ ...errors, images: '' });
//     }
//   };

//   // Handle variant image changes
//   const handleVariantImageChange = (variantIndex, e) => {
//     const files = Array.from(e.target.files);
    
//     // Validate file types and size
//     const validFiles = files.filter(file => {
//       if (!file.type.startsWith('image/')) {
//         const updatedErrors = [...variantErrors];
//         updatedErrors[variantIndex] = { 
//           ...updatedErrors[variantIndex], 
//           images: 'Please select only image files' 
//         };
//         setVariantErrors(updatedErrors);
//         return false;
//       }
//       if (file.size > 5 * 1024 * 1024) {
//         const updatedErrors = [...variantErrors];
//         updatedErrors[variantIndex] = { 
//           ...updatedErrors[variantIndex], 
//           images: 'Image size should be less than 5MB' 
//         };
//         setVariantErrors(updatedErrors);
//         return false;
//       }
//       return true;
//     });

//     if (validFiles.length === 0) return;

//     // Append new files with old ones
//     const updatedVariants = [...variants];
//     const currentVariant = updatedVariants[variantIndex];
//     const updatedFiles = [...currentVariant.images, ...validFiles];
    
//     updatedVariants[variantIndex] = {
//       ...currentVariant,
//       images: updatedFiles,
//       previewImages: updatedFiles.map((file) => URL.createObjectURL(file))
//     };
    
//     setVariants(updatedVariants);
    
//     // Clear image errors if any
//     if (variantErrors[variantIndex] && variantErrors[variantIndex].images) {
//       const updatedErrors = [...variantErrors];
//       updatedErrors[variantIndex] = { ...updatedErrors[variantIndex], images: '' };
//       setVariantErrors(updatedErrors);
//     }
//   };

//   // Remove main product image
//   const removeImage = (index) => {
//     const updatedImages = images.filter((_, i) => i !== index);
//     const updatedPreviews = previewImages.filter((_, i) => i !== index);
    
//     setImages(updatedImages);
//     setPreviewImages(updatedPreviews);
    
//     // Revoke the object URL to avoid memory leaks
//     URL.revokeObjectURL(previewImages[index]);
//   };

//   // Remove variant image
//   const removeVariantImage = (variantIndex, imageIndex) => {
//     const updatedVariants = [...variants];
//     const currentVariant = updatedVariants[variantIndex];
    
//     const updatedImages = currentVariant.images.filter((_, i) => i !== imageIndex);
//     const updatedPreviews = currentVariant.previewImages.filter((_, i) => i !== imageIndex);
    
//     // Revoke the object URL to avoid memory leaks
//     URL.revokeObjectURL(currentVariant.previewImages[imageIndex]);
    
//     updatedVariants[variantIndex] = {
//       ...currentVariant,
//       images: updatedImages,
//       previewImages: updatedPreviews
//     };
    
//     setVariants(updatedVariants);
//   };

//   // Validate form
//   const validateForm = () => {
//     const newErrors = {};
    
//     if (!formData.name.trim()) newErrors.name = 'Product name is required';
//     if (!formData.price || formData.price <= 0) newErrors.price = 'Valid price is required';
//     // if (formData.discountPrice && formData.discountPrice > formData.price) {
//     //   newErrors.discountPrice = 'Discount price cannot be higher than regular price';
//     // }
//     if (!formData.description.trim()) newErrors.description = 'Description is required';
//     if (!formData.brand.trim()) newErrors.brand = 'Brand is required';
//     if (!formData.category) newErrors.category = 'Category is required';
//     if (!formData.stock || formData.stock < 0) newErrors.stock = 'Valid stock count is required';
//     if (images.length === 0) newErrors.images = 'At least one image is required';
    
//     // Validate variants
//     const newVariantErrors = [];
//     let hasVariantErrors = false;
    
//     variants.forEach((variant, index) => {
//       const variantError = {};
      
//       if (!variant.size.trim()) {
//         variantError.size = 'Size is required';
//         hasVariantErrors = true;
//       }
      
//       if (!variant.price || variant.price <= 0) {
//         variantError.price = 'Valid price is required';
//         hasVariantErrors = true;
//       }
      
//       if (!variant.stock || variant.stock < 0) {
//         variantError.stock = 'Valid stock count is required';
//         hasVariantErrors = true;
//       }
      
//       if (variant.images.length === 0) {
//         variantError.images = 'At least one image is required for this variant';
//         hasVariantErrors = true;
//       }
      
//       newVariantErrors.push(variantError);
//     });
    
//     setErrors(newErrors);
//     setVariantErrors(newVariantErrors);
    
//     return Object.keys(newErrors).length === 0 && !hasVariantErrors;
//   };

//   // Upload images to Cloudinary
//   const uploadImagesToCloudinary = async (imageFiles, signatureData) => {
//     const { timestamp, signature, cloudName, apiKey } = signatureData;
//     const uploadedImages = [];
    
//     for (const image of imageFiles) {
//       const imageFormData = new FormData();
//       imageFormData.append("file", image);
//       imageFormData.append("api_key", apiKey);
//       imageFormData.append("timestamp", timestamp);
//       imageFormData.append("signature", signature);

//       const uploadRes = await axios.post(
//         `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
//         imageFormData
//       );

//       uploadedImages.push({
//         public_id: uploadRes.data.public_id,
//         url: uploadRes.data.secure_url,
//       });
//     }
    
//     return uploadedImages;
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!validateForm()) {
//       toast.error("Please fix the errors in the form");
//       return;
//     }

//     setLoading(true);

//     try {
//       // 1. Get Cloudinary signature from backend
//       const sigRes = await axios.get(
//         "https://swanand-vibes-backend.vercel.app/api/products/signature"
//       );
//       const signatureData = sigRes.data;

//       // 2. Upload main product images to Cloudinary
//       const uploadedMainImages = await uploadImagesToCloudinary(images, signatureData);

//       // 3. Upload variant images to Cloudinary
//       const variantsWithUploadedImages = await Promise.all(
//         variants.map(async (variant) => {
//           const uploadedVariantImages = await uploadImagesToCloudinary(variant.images, signatureData);
//           return {
//             size: variant.size,
//             price: variant.price,
//             stock: variant.stock,
//             images: uploadedVariantImages,
//             tax: variant.tax
//           };
//         })
//       );

//       // 4. Send product data with images to backend
//       const newProduct = await axios.post(
//         "http://localhost:5000/api/products",
//         {
//           ...formData,
//           images: uploadedMainImages,
//           variants: variantsWithUploadedImages,
//           user: "689ff606db12335b27127163", // Example user ID
//         }
//       )
//       // createProduct({
//       //   ...formData,
//       //   images: uploadedMainImages,
//       //   variants: variantsWithUploadedImages,
//       //   user: "689ff606db12335b27127163", // Example user ID
//       // });

//       console.log("Product created:", newProduct.data);
      
//       // Show success message
//       toast.success("Product uploaded successfully!");

//       // Reset form
//       setFormData({
//         name: "",
//         price: "",
//         discountPrice: "",
//         description: "",
//         brand: "",
//         category: "",
//         stock: "",
//       });
      
//       setVariants([{
//         size: "",
//         price: "",
//         stock: "",
//         images: [],
//         previewImages: [],
//         tax: 0
//       }]);
      
//       setImages([]);
//       setPreviewImages([]);
//       setErrors({});
//       setVariantErrors([{}]);
//     } catch (err) {
//       console.error("Error uploading product:", err);
//       toast.error("Failed to upload product. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="product-form-container">
//       <div className="form-header">
//         <h1>Create New Product</h1>
//         <p>Add a new product to your inventory</p>
//       </div>

//       {loading ? <Spinner size="lg"/> : 
//       <form onSubmit={handleSubmit} className="product-form">
//         <div className="form-grid">
//           <div className="form-group">
//             <label htmlFor="name" className="form-label">
//               Product Name
//             </label>
//             <input
//               type="text"
//               id="name"
//               name="name"
//               className={`form-input ${errors.name ? 'error' : ''}`}
//               placeholder="Enter product name"
//               value={formData.name}
//               onChange={handleChange}
//             />
//             {errors.name && <span className="error-text">{errors.name}</span>}
//           </div>

//           <div className="form-group">
//             <label htmlFor="price" className="form-label">
//               Base Price (₹) 
//             </label>
//             <input
//               type="number"
//               id="price"
//               name="price"
//               className={`form-input ${errors.price ? 'error' : ''}`}
//               placeholder="0.00"
//               min="0"
//               step="0.01"
//               value={formData.price}
//               onChange={handleChange}
//             />
//             {errors.price && <span className="error-text">{errors.price}</span>}
//           </div>

//           <div className="form-group">
//             <label htmlFor="discountPrice" className="form-label">
//               Discount Price In Percentege (%)
//             </label>
//             <input
//               type="number"
//               id="discountPrice"
//               name="discountPrice"
//               className={`form-input ${errors.discountPrice ? 'error' : ''}`}
//               placeholder="0.00"
//               min="0"
//               step="0.01"
//               value={formData.discountPrice}
//               onChange={handleChange}
//             />
//             {errors.discountPrice && <span className="error-text">{errors.discountPrice}</span>}
//           </div>

//           <div className="form-group">
//             <label htmlFor="brand" className="form-label">
//               Brand
//             </label>
//             <input
//               type="text"
//               id="brand"
//               name="brand"
//               className={`form-input ${errors.brand ? 'error' : ''}`}
//               placeholder="Enter brand name"
//               value={formData.brand}
//               onChange={handleChange}
//             />
//             {errors.brand && <span className="error-text">{errors.brand}</span>}
//           </div>

//           <div className="form-group">
//             <label htmlFor="stock" className="form-label">
//               Base Stock Quantity
//             </label>
//             <input
//               type="number"
//               id="stock"
//               name="stock"
//               className={`form-input ${errors.stock ? 'error' : ''}`}
//               placeholder="0"
//               min="0"
//               value={formData.stock}
//               onChange={handleChange}
//             />
//             {errors.stock && <span className="error-text">{errors.stock}</span>}
//           </div>

//           <div className="form-group full-width">
//             <label htmlFor="category" className="form-label">
//               Category
//             </label>
//             {/* <select
//               id="category"
//               name="category"
//               className={`form-select ${errors.category ? 'error' : ''}`}
//               value={formData.category}
//               onChange={handleChange}
//             >
//               <option className="catg-option" value="">Select Category</option>
//               <option className="catg-option" value="Electronics">Electronics</option>
//               <option className="catg-option" value="Clothing">Clothing</option>
//               <option className="catg-option" value="Home">Home</option>
//               <option className="catg-option" value="Books">Books</option>
//               <option className="catg-option" value="Beauty">Beauty</option>
//               <option className="catg-option" value="Sports">Sports</option>
//               <option className="catg-option" value="Spiritual">Spiritual</option>
//               <option className="catg-option" value="Other">Other</option>
//             </select> */}
//             <select name="category" id="category" className={`form-select ${errors.category ? 'error' : ''}`}
//               value={formData.category}
//               onChange={handleChange}>
//                 {categoryOptions?.map((category) => (
//                   <option className="catg-option" key={category?._id} value={category?._id}>
//                     {category?.name}
//                   </option>
//                 ))}
//               </select>
//             {errors.category && <span className="error-text">{errors.category}</span>}
//           </div>

//           <div className="form-group full-width">
//             <label htmlFor="description" className="form-label">
//               Description 
//             </label>
//             <textarea
//               id="description"
//               name="description"
//               className={`form-textarea ${errors.description ? 'error' : ''}`}
//               placeholder="Enter product description..."
//               rows="4"
//               value={formData.description}
//               onChange={handleChange}
//             />
//             {errors.description && <span className="error-text">{errors.description}</span>}
//           </div>

//           {/* Variants Section */}
//           <div className="form-group full-width">
//             <div className="variants-header">
//               <h3>Product Variants </h3>
//               <button type="button" className="add-variant-btn" onClick={addVariant}>
//                 + Add Variant
//               </button>
//             </div>
            
//             {variants.map((variant, index) => (
//               <div key={index} className="variant-card">
//                 <div className="variant-header">
//                   <h4>Variant {index + 1}</h4>
//                   {variants.length > 1 && (
//                     <button 
//                       type="button" 
//                       className="remove-variant-btn"
//                       onClick={() => removeVariant(index)}
//                     >
//                       Remove
//                     </button>
//                   )}
//                 </div>
                
//                 <div className="variant-fields">
//                   <div className="form-group">
//                     <label htmlFor={`size-${index}`} className="form-label">
//                       Size 
//                     </label>
//                     <input
//                       type="text"
//                       id={`size-${index}`}
//                       name="size"
//                       className={`form-input ${variantErrors[index]?.size ? 'error' : ''}`}
//                       placeholder="e.g., S, M, L, XL"
//                       value={variant.size}
//                       onChange={(e) => handleVariantChange(index, e)}
//                     />
//                     {variantErrors[index]?.size && (
//                       <span className="error-text">{variantErrors[index].size}</span>
//                     )}
//                   </div>
                  
//                   <div className="form-group">
//                     <label htmlFor={`variant-price-${index}`} className="form-label">
//                       Price (₹) 
//                     </label>
//                     <input
//                       type="number"
//                       id={`variant-price-${index}`}
//                       name="price"
//                       className={`form-input ${variantErrors[index]?.price ? 'error' : ''}`}
//                       placeholder="0.00"
//                       min="0"
//                       step="0.01"
//                       value={variant.price}
//                       onChange={(e) => handleVariantChange(index, e)}
//                     />
//                     {variantErrors[index]?.price && (
//                       <span className="error-text">{variantErrors[index].price}</span>
//                     )}
//                   </div>
                  
//                   <div className="form-group">
//                     <label htmlFor={`variant-stock-${index}`} className="form-label">
//                       Stock Quantity 
//                     </label>
//                     <input
//                       type="number"
//                       id={`variant-stock-${index}`}
//                       name="stock"
//                       className={`form-input ${variantErrors[index]?.stock ? 'error' : ''}`}
//                       placeholder="0"
//                       min="0"
//                       value={variant.stock}
//                       onChange={(e) => handleVariantChange(index, e)}
//                     />
//                     {variantErrors[index]?.stock && (
//                       <span className="error-text">{variantErrors[index].stock}</span>
//                     )}
//                   </div>

//                    <div className="form-group">
//                     <label htmlFor={`variant-tax-${index}`} className="form-label">
//                       Tax in Percentage (%)
//                     </label>
//                     <input
//                       type="number"
//                       id={`variant-tax-${index}`}
//                       name="tax"
//                       className={`form-input ${variantErrors[index]?.tax ? 'error' : ''}`}
//                       placeholder="0"
//                       min="0"
//                       value={variant.tax}
//                       onChange={(e) => handleVariantChange(index, e)}
//                     />
//                     {variantErrors[index]?.tax && (
//                       <span className="error-text">{variantErrors[index].tax}</span>
//                     )}
//                   </div>
                  
//                   <div className="form-group full-width">
//                     <label htmlFor={`variant-images-${index}`} className="form-label">
//                       Variant Images *
//                     </label>
//                     <div className={`file-upload ${variantErrors[index]?.images ? 'error' : ''}`}>
//                       <input
//                         type="file"
//                         id={`variant-images-${index}`}
//                         accept="image/*"
//                         multiple
//                         onChange={(e) => handleVariantImageChange(index, e)}
//                         className="file-input"
//                       />
//                       <label htmlFor={`variant-images-${index}`} className="file-upload-label">
//                         <span className="upload-icon">📁</span>
//                         <span>Choose variant images</span>
//                         <span className="upload-hint">(Max 5MB per image)</span>
//                       </label>
//                     </div>
//                     {variantErrors[index]?.images && (
//                       <span className="error-text">{variantErrors[index].images}</span>
//                     )}
                    
//                     {/* Variant image previews */}
//                     {variant.previewImages.length > 0 && (
//                       <div className="preview-container">
//                         <h4 className="preview-title">Variant Images ({variant.previewImages.length})</h4>
//                         <div className="preview-grid">
//                           {variant.previewImages.map((src, imgIndex) => (
//                             <div key={imgIndex} className="preview-item">
//                               <img
//                                 src={src}
//                                 alt={`Variant ${index + 1} Preview ${imgIndex + 1}`}
//                                 className="preview-image"
//                               />
//                               <button
//                                 type="button"
//                                 className="delete-image-btn"
//                                 onClick={() => removeVariantImage(index, imgIndex)}
//                                 title="Remove image"
//                               >
//                                 ×
//                               </button>
//                             </div>
//                           ))}
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>

//           <div className="form-group full-width">
//             <label htmlFor="images" className="form-label">
//               Main Product Images *
//             </label>
//             <div className={`file-upload ${errors.images ? 'error' : ''}`}>
//               <input
//                 type="file"
//                 id="images"
//                 accept="image/*"
//                 multiple
//                 onChange={handleImageChange}
//                 className="file-input"
//               />
//               <label htmlFor="images" className="file-upload-label">
//                 <span className="upload-icon">📁</span>
//                 <span>Choose main product images</span>
//                 <span className="upload-hint">(Max 5MB per image)</span>
//               </label>
//             </div>
//             {errors.images && <span className="error-text">{errors.images}</span>}
            
//             {/* Main product image previews */}
//             {previewImages.length > 0 && (
//               <div className="preview-container">
//                 <h3 className="preview-title">Main Product Images ({previewImages.length})</h3>
//                 <div className="preview-grid">
//                   {previewImages.map((src, index) => (
//                     <div key={index} className="preview-item">
//                       <img
//                         src={src}
//                         alt={`Preview ${index + 1}`}
//                         className="preview-image"
//                       />
//                       <button
//                         type="button"
//                         className="delete-image-btn"
//                         onClick={() => removeImage(index)}
//                         title="Remove image"
//                       >
//                         ×
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>

//         <div className="form-actions">
//           <button 
//             type="button" 
//             className="cancel-btn"
//             onClick={() => {
//               setFormData({
//                 name: "",
//                 price: "",
//                 discountPrice: "",
//                 description: "",
//                 brand: "",
//                 category: "",
//                 stock: "",
//               });
//               setVariants([{
//                 size: "",
//                 price: "",
//                 stock: "",
//                 images: [],
//                 previewImages: []
//               }]);
//               setImages([]);
//               setPreviewImages([]);
//               setErrors({});
//               setVariantErrors([{}]);
//             }}
//           >
//             Clear Form
//           </button>
//           <button 
//             type="submit" 
//             className="submit-btn"
//             disabled={loading}
//           >
//             {loading ? (
//               <>
//                 <span className="spinner"></span>
//                 Uploading...
//               </>
//             ) : (
//               "Create Product"
//             )}
//           </button>
//         </div>
//       </form>}
//     </div>
//   );
// };

// export default CreateProduct;













import React, { useState, useEffect } from "react";
import axios from "axios";
import '../../../CssFiles/Admin/product/ProductForm.css';
import { createProduct } from '../../../utills/apicall';
import Spinner from "../../../components/Spinner";
import { toast } from 'react-hot-toast';

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
      const response = await axios.get("https://swanand-vibes-backend.vercel.app/api/category");
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
      const sigRes = await axios.get(
        "https://swanand-vibes-backend.vercel.app/api/products/signature"
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
      const newProduct =  await axios.post(
        "https://swanand-vibes-backend.vercel.app/api/products/",
        {
          ...formData,
          stock: totalStock,
          images: uploadedMainImages,
          variants: variantsWithUploadedImages,
          user: "689ff606db12335b27127163", // Example user ID
        })
        console.log("Product created:", newProduct.data);
        
      // await createProduct({
      //   ...formData,
      //   stock: totalStock,
      //   images: uploadedMainImages,
      //   variants: variantsWithUploadedImages,
      //   user: "689ff606db12335b27127163", // Example user ID
      // });

      console.log("Product created:", newProduct.data);
      
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








// import React, { useState } from "react";

// export default function CreateProduct() {
//   const [name, setName] = useState("");
//   const [variants, setVariants] = useState([
//     { size: "", price: "", stock: "", images: [] },
//   ]);

//   // ✅ Add a new empty variant
//   const addVariant = () => {
//     setVariants([...variants, { size: "", price: "", stock: "", images: [] }]);
//   };

//   // ✅ Remove a variant
//   const removeVariant = (index) => {
//     const updated = [...variants];
//     updated.splice(index, 1);
//     setVariants(updated);
//   };

//   // ✅ Update field in a variant
//   const handleVariantChange = (index, field, value) => {
//     const updated = [...variants];
//     updated[index][field] = value;
//     setVariants(updated);
//   };

//   // ✅ Handle image upload (local preview for now)
//   const handleImageUpload = (index, files) => {
//     const updated = [...variants];
//     updated[index].images = Array.from(files).map((f) => URL.createObjectURL(f));
//     setVariants(updated);
//   };

//   // ✅ Submit form
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const productData = { name, variants };
//     console.log("Submitting Product:", productData);

//     // 👉 send `productData` to backend using fetch/axios
//   };

//   return (
//     <div className="product-form">
//       <h2>Create Product</h2>
//       <form onSubmit={handleSubmit}>
//         {/* Product Name */}
//         <div className="form-group">
//           <label>Product Name</label>
//           <input
//             type="text"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             required
//           />
//         </div>

//         {/* Variants Section */}
//         <div className="variants-section">
//           <h3>Product Variants</h3>
//           {variants.map((variant, index) => (
//             <div key={index} className="variant-card">
//               <label>Size</label>
//               <input
//                 type="text"
//                 placeholder="S / M / L / XL"
//                 value={variant.size}
//                 onChange={(e) =>
//                   handleVariantChange(index, "size", e.target.value)
//                 }
//               />

//               <label>Price</label>
//               <input
//                 type="number"
//                 placeholder="Price"
//                 value={variant.price}
//                 onChange={(e) =>
//                   handleVariantChange(index, "price", e.target.value)
//                 }
//               />

//               <label>Stock</label>
//               <input
//                 type="number"
//                 placeholder="Stock"
//                 value={variant.stock}
//                 onChange={(e) =>
//                   handleVariantChange(index, "stock", e.target.value)
//                 }
//               />

//               <label>Upload Images</label>
//               <input
//                 type="file"
//                 multiple
//                 onChange={(e) => handleImageUpload(index, e.target.files)}
//               />
//               <div className="preview">
//                 {variant.images.map((img, i) => (
//                   <img key={i} src={img} alt="preview" />
//                 ))}
//               </div>

//               {/* Remove Button */}
//               {variants.length > 1 && (
//                 <button
//                   type="button"
//                   className="btn danger"
//                   onClick={() => removeVariant(index)}
//                 >
//                   Remove Variant
//                 </button>
//               )}
//             </div>
//           ))}

//           {/* Add Variant Button */}
//           <button
//             type="button"
//             className="btn primary"
//             onClick={addVariant}
//           >
//             + Add Another Variant
//           </button>
//         </div>

//         {/* Submit Button */}
//         <button type="submit" className="btn success">
//           Save Product
//         </button>
//       </form>
//     </div>
//   );
// }









//eveny

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { toast } from "react-hot-toast";
// import '../../../CssFiles/Admin/product/create.css';

// const CreateProduct = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     description: "",
//     brand: "",
//     category: "",
//     stock: "",
//     tax: 0,
//   });

//   const [categories, setCategories] = useState([]);
//   const [images, setImages] = useState([]);
//   const [previewImages, setPreviewImages] = useState([]);
//   const [variants, setVariants] = useState([
//     {
//       size: "",
//       price: "",
//       stock: "",
//       images: [],
//       previewImages: [],
//       tax: 0,
//     },
//   ]);

//   const [errors, setErrors] = useState({});
//   const [variantErrors, setVariantErrors] = useState([{}]);
//   const [loading, setLoading] = useState(false);

//   // ✅ Fetch categories
//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/api/category/");
//         setCategories(res.data.categories);
//       } catch (err) {
//         console.error("Error fetching categories:", err);
//         toast.error("Failed to load categories");
//       }
//     };
//     fetchCategories();
//   }, []);

//   // ✅ Handle input changes
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // ✅ Handle image uploads (main product)
//   const handleImageChange = (e) => {
//     const files = Array.from(e.target.files);
//     setImages(files);
//     setPreviewImages(files.map((file) => URL.createObjectURL(file)));
//   };

//   // ✅ Handle variant change
//   const handleVariantChange = (index, e) => {
//     const updated = [...variants];
//     updated[index][e.target.name] = e.target.value;
//     setVariants(updated);
//   };

//   // ✅ Handle variant image change
//   const handleVariantImageChange = (index, e) => {
//     const files = Array.from(e.target.files);
//     const updated = [...variants];
//     updated[index].images = files;
//     updated[index].previewImages = files.map((file) =>
//       URL.createObjectURL(file)
//     );
//     setVariants(updated);
//   };

//   // ✅ Add variant
//   const addVariant = () => {
//     setVariants([
//       ...variants,
//       { size: "", price: "", stock: "", images: [], previewImages: [], tax: 0 },
//     ]);
//     setVariantErrors([...variantErrors, {}]);
//   };

//   // ✅ Remove variant
//   const removeVariant = (index) => {
//     const updated = variants.filter((_, i) => i !== index);
//     const updatedErrors = variantErrors.filter((_, i) => i !== index);
//     setVariants(updated);
//     setVariantErrors(updatedErrors);
//   };

//   // ✅ Upload helper
//   const uploadImagesToCloudinary = async (files, sigData) => {
//     const uploaded = [];
//     for (const file of files) {
//       const formData = new FormData();
//       formData.append("file", file);
//       formData.append("api_key", sigData.apiKey);
//       formData.append("timestamp", sigData.timestamp);
//       formData.append("signature", sigData.signature);
//       formData.append("upload_preset", "ml_default");

//       const res = await axios.post(
//         `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
//         imageFormData
//       );
//       // await axios.post(sigData.cloudinaryUrl, formData);
//       uploaded.push({
//         public_id: res.data.public_id,
//         url: res.data.secure_url,
//       });
//     }
//     return uploaded;
//   };

//   // ✅ Validation
//   const validateForm = () => {
//     const newErrors = {};
//     if (!formData.name.trim()) newErrors.name = "Product name is required";
//     if (!formData.description.trim())
//       newErrors.description = "Description is required";
//     if (!formData.brand.trim()) newErrors.brand = "Brand is required";
//     if (!formData.category) newErrors.category = "Category is required";
//     if (images.length === 0) newErrors.images = "At least one image is required";

//     const newVariantErrors = [];
//     let hasVariantErrors = false;

//     variants.forEach((variant) => {
//       const variantError = {};
//       if (!variant.size.trim()) {
//         variantError.size = "Size is required";
//         hasVariantErrors = true;
//       }
//       if (!variant.price || variant.price <= 0) {
//         variantError.price = "Valid price is required";
//         hasVariantErrors = true;
//       }
//       if (!variant.stock || variant.stock < 0) {
//         variantError.stock = "Valid stock is required";
//         hasVariantErrors = true;
//       }
//       if (variant.images.length === 0) {
//         variantError.images = "At least one image is required";
//         hasVariantErrors = true;
//       }
//       newVariantErrors.push(variantError);
//     });

//     setErrors(newErrors);
//     setVariantErrors(newVariantErrors);

//     return Object.keys(newErrors).length === 0 && !hasVariantErrors;
//   };

//   // ✅ Submit
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!validateForm()) {
//       toast.error("Please fix the errors");
//       return;
//     }

//     setLoading(true);

//     try {
//       const sigRes = await axios.get(
//         "https://swanand-vibes-backend.vercel.app/api/products/signature"
//       );
//       const sigData = sigRes.data;

//       const uploadedMainImages = await uploadImagesToCloudinary(images, sigData);

//       const variantsWithImages = await Promise.all(
//         variants.map(async (variant) => {
//           const uploaded = await uploadImagesToCloudinary(
//             variant.images,
//             sigData
//           );
//           return {
//             size: variant.size,
//             price: variant.price,
//             stock: variant.stock,
//             tax: variant.tax,
//             images: uploaded,
//           };
//         })
//       );

//       const payload = {
//         ...formData,
//         images: uploadedMainImages,
//         variants: variantsWithImages,
//         user: "689ff606db12335b27127163", // Example user ID
//       };

//       const res = await axios.post(
//         "http://localhost:5000/api/products/",
//         payload
//       );

//       toast.success("Product uploaded successfully!");
//       console.log("Created product:", res.data);

//       // Reset
//       setFormData({
//         name: "",
//         description: "",
//         brand: "",
//         category: "",
//         stock: "",
//         tax: 0,
//       });
//       setVariants([
//         { size: "", price: "", stock: "", images: [], previewImages: [], tax: 0 },
//       ]);
//       setImages([]);
//       setPreviewImages([]);
//       setErrors({});
//       setVariantErrors([{}]);
//     } catch (err) {
//       console.error("Error uploading product:", err);
//       toast.error("Failed to upload product");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="create-product">
//       <h2>Create Product</h2>
//       <form onSubmit={handleSubmit}>
//         {/* Name */}
//         <input
//           type="text"
//           name="name"
//           placeholder="Product Name"
//           value={formData.name}
//           onChange={handleChange}
//           className="create-product-input"
//         />
//         {errors.name && <p className="error">{errors.name}</p>}

//         {/* Description */}
//         <textarea
//           name="description"
//           placeholder="Description"
//           value={formData.description}
//           onChange={handleChange}
//           className="create-product-textarea"
//         />
//         {errors.description && <p className="error">{errors.description}</p>}

//         {/* Brand */}
//         <input
//           type="text"
//           name="brand"
//           placeholder="Brand"
//           value={formData.brand}
//           onChange={handleChange}
//           className="create-product-input"
//         />
//         {errors.brand && <p className="error">{errors.brand}</p>}

//         {/* Category */}
//         <select
//           name="category"
//           value={formData.category}
//           onChange={handleChange}
//           className="create-product-select"
//         >
//           <option className="create-product-option" value="">Select Category</option>
//           {categories.map((cat) => (
//             <option className="create-product-option" key={cat._id} value={cat._id}>
//               {cat.name}
//             </option>
//           ))}
//         </select>
//         {errors.category && <p className="error">{errors.category}</p>}

//         {/* Tax */}
//         <input
//           type="number"
//           name="tax"
//           placeholder="Tax"
//           value={formData.tax}
//           onChange={handleChange}
//           className="create-product-input"
//         />

//         {/* Stock */}
//         <input
//           type="number"
//           name="stock"
//           placeholder="Total Stock"
//           value={formData.stock}
//           onChange={handleChange}
//           className="create-product-input"
//         />

//         {/* Main Images */}
//         <input type="file" multiple onChange={handleImageChange} className="create-product-input" />
//         <div className="create-product-preview">
//           {previewImages.map((src, i) => (
//             <img key={i} src={src} alt="preview" width="80"  className="create-product-img"/>
//           ))}
//         </div>
//         {errors.images && <p className="error">{errors.images}</p>}

//         {/* Variants */}
//         <h3>Variants</h3>
//         {variants.map((variant, index) => (
//           <div key={index} className="create-product-variant-block">
//             <input
//               type="text"
//               name="size"
//               placeholder="Size"
//               value={variant.size}
//               onChange={(e) => handleVariantChange(index, e)}
//               className="create-product-input"
//             />
//             {variantErrors[index]?.size && (
//               <p className="create-product-error">{variantErrors[index].size}</p>
//             )}

//             <input
//               type="number"
//               name="price"
//               placeholder="Price"
//               value={variant.price}
//               onChange={(e) => handleVariantChange(index, e)}
//               className="create-product-input"
//             />
//             {variantErrors[index]?.price && (
//               <p className="create-product-error">{variantErrors[index].price}</p>
//             )}

//             <input
//               type="number"
//               name="stock"
//               placeholder="Stock"
//               value={variant.stock}
//               onChange={(e) => handleVariantChange(index, e)}
//               className="create-product-input"
//             />
//             {variantErrors[index]?.stock && (
//               <p className="create-product-error">{variantErrors[index].stock}</p>
//             )}

//             <input
//               type="number"
//               name="tax"
//               placeholder="Tax"
//               value={variant.tax}
//               onChange={(e) => handleVariantChange(index, e)}
//               className="create-product-input"
//             />

//             <input
//               type="file"
//               multiple
//               onChange={(e) => handleVariantImageChange(index, e)}
//               className="create-product-input-file"
//             />
//             <div className="create-product-preview">
//               {variant.previewImages.map((src, i) => (
//                 <img key={i} src={src} alt="variant preview" width="60" className="create-product-input"/>
//               ))}
//             </div>
//             {variantErrors[index]?.images && (
//               <p className="create-product-error">{variantErrors[index].images}</p>
//             )}

//             {variants.length > 1 && (
//               <button className="create-product-remove-btn" type="button" onClick={() => removeVariant(index)}>
//                 Remove Variant
//               </button>
//             )}
//           </div>
//         ))}
//         <button type="button" onClick={addVariant} className="create-product-add-variant-btn">
//           Add Variant
//         </button>

//         {/* Submit */}
//         <button type="submit" disabled={loading} className="create-product-btn">
//           {loading ? "Uploading..." : "Create Product"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default CreateProduct;
