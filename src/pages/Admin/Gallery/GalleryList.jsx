// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { toast } from 'react-hot-toast';
// import "../../../CssFiles/Admin/Gallery/Gallery.css";

// const GalleryList = () => {
//   const [images, setImages] = useState([]);
//   const [filteredImages, setFilteredImages] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState('all');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [editingImage, setEditingImage] = useState(null);
//   const [showEditModal, setShowEditModal] = useState(false);

//   useEffect(() => {
//     fetchImages();
//   }, []);

//   useEffect(() => {
//     filterImages();
//   }, [images, selectedCategory, searchTerm]);

//   const fetchImages = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.get('http://localhost:5000/api/gallery/');
//       setImages(response.data);
      
//       // Extract unique categories
//       const uniqueCategories = [...new Set(response.data.map(img => img.category))];
//       setCategories(uniqueCategories);
//     } catch (error) {
//       toast.error('Failed to fetch images');
//       console.error('Error fetching images:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const filterImages = () => {
//     let filtered = images;

//     // Filter by category
//     if (selectedCategory !== 'all') {
//       filtered = filtered.filter(image => image.category === selectedCategory);
//     }

//     // Filter by search term
//     if (searchTerm) {
//       filtered = filtered.filter(image =>
//         image.title.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//     }

//     setFilteredImages(filtered);
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm('Are you sure you want to delete this image?')) return;

//     try {
//       await axios.delete(`http://localhost:5000/api/gallery/${id}`);
//       toast.success('Image deleted successfully');
//       fetchImages(); // Refresh the list
//     } catch (error) {
//       toast.error('Failed to delete image');
//       console.error('Error deleting image:', error);
//     }
//   };

//   const handleEdit = (image) => {
//     setEditingImage({ ...image });
//     setShowEditModal(true);
//   };

//   const handleUpdate = async (e) => {
//     e.preventDefault();
    
//     try {
//       const formData = new FormData();
//       formData.append('title', editingImage.title);
//       formData.append('category', editingImage.category);
      
//       if (editingImage.newImage) {
//         formData.append('image', editingImage.newImage);
//       }

      
//       const response = await axios.put(
//         `http://localhost:5000/api/gallery/${editingImage._id}`,
//         formData,
//         {
//           headers: {
//             'Content-Type': 'multipart/form-data'
//           }
//         }
//       );

//       toast.success('Image updated successfully');
//       console.log(response.data);
      
//       setShowEditModal(false);
//       setEditingImage(null);
//       fetchImages(); // Refresh the list
//     } catch (error) {
//       toast.error('Failed to update image');
//       console.error('Error updating image:', error);
//     }
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setEditingImage({
//         ...editingImage,
//         newImage: file,
//         imagePreview: URL.createObjectURL(file)
//       });
//     }
//   };

//   if (loading) {
//     return (
//       <div className="gallery-loading">
//         <div className="spinner"></div>
//         <p>Loading images...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="gallery-container">
//       <div className="gallery-header">
//         <h1>Image Gallery</h1>
//         <div className="gallery-controls">
//           <div className="gallery-search-box">
//             <input
//               type="text"
//               placeholder="🔍Search images..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="gallery-search-input"
//             />
//             {/* <span className="search-icon">🔍</span> */}
//           </div>

//           <select
//             value={selectedCategory}
//             onChange={(e) => setSelectedCategory(e.target.value)}
//             className="gallery-category-filter"
//           >
//             <option value="all">All Categories</option>
//             {categories.map(category => (
//               <option key={category} value={category}>
//                 {category}
//               </option>
//             ))}
//           </select>
//         </div>
//       </div>

//       <div className="gallery-stats">
//         <p>Showing {filteredImages.length} of {images.length} images</p>
//       </div>

//       {filteredImages.length === 0 ? (
//         <div className="gallery-no-images">
//           <p>No images found matching your criteria.</p>
//         </div>
//       ) : (
//         <div className="gallery-grid">
//           {filteredImages.map(image => (
//             <div key={image._id} className="gallery-item">
//               <div className="gallery-image-container">
//                 <img 
//                   src={image.imageUrl} 
//                   alt={image.title}
//                   loading="lazy"
//                 />
//                 <div className="gallery-image-overlay">
//                   <button 
//                     className="gallery-btn-edit"
//                     onClick={() => handleEdit(image)}
//                   >
//                     Edit
//                   </button>
//                   <button 
//                     className="gallery-btn-delete"
//                     onClick={() => handleDelete(image._id)}
//                   >
//                     Delete
//                   </button>
//                 </div>
//               </div>
//               <div className="gallery-image-info">
//                 <h3 className="gallery-image-title">{image.title}</h3>
//                 <span className="gallery-image-category">{image.category}</span>
//                 <span className="gallery-image-date">
//                   {new Date(image.createdAt).toLocaleDateString()}
//                 </span>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {showEditModal && editingImage && (
//         <div className="gallery-modal-overlay">
//           <div className="gallery-modal-content">
//             <div className="gallery-modal-header">
//               <h2>Edit Image</h2>
//               <button 
//                 className="gallery-modal-close"
//                 onClick={() => setShowEditModal(false)}
//               >
//                 ×
//               </button>
//             </div>

//             <form onSubmit={handleUpdate} className="gallery-edit-form">
//               <div className="gallery-form-group">
//                 <label htmlFor="title">Title</label>
//                 <input
//                   type="text"
//                   id="title"
//                   value={editingImage.title}
//                   onChange={(e) => setEditingImage({
//                     ...editingImage,
//                     title: e.target.value
//                   })}
//                   required
//                 />
//               </div>

//               <div className="gallery-form-group">
//                 <label htmlFor="category">Category</label>
//                 <select
//                   id="category"
//                   value={editingImage.category}
//                   onChange={(e) => setEditingImage({
//                     ...editingImage,
//                     category: e.target.value
//                   })}
//                   required
//                 >
//                   <option value="">Select Category</option>
//                   {categories.map(category => (
//                     <option key={category} value={category}>
//                       {category}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div className="gallery-form-group">
//                 <label htmlFor="image">Replace Image (Optional)</label>
//                 <input
//                   type="file"
//                   id="image"
//                   accept="image/*"
//                   onChange={handleImageChange}
//                 />
//                 {editingImage.imagePreview && (
//                   <div className="gallery-image-preview">
//                     <img 
//                       src={editingImage.imagePreview} 
//                       alt="Preview" 
//                     />
//                   </div>
//                 )}
//               </div>

//               <div className="gallery-form-actions">
//                 <button 
//                   type="button" 
//                   className="gallery-btn-cancel"
//                   onClick={() => setShowEditModal(false)}
//                 >
//                   Cancel
//                 </button>
//                 <button type="submit" className="gallery-btn-save">
//                   Save Changes
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default GalleryList;










import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import "../../../CssFiles/Admin/Gallery/Gallery.css";
import { useNavigate } from 'react-router-dom';
import Spinner from '../../../components/Spinner';

const GalleryList = () => {
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [filteredImages, setFilteredImages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [editingImage, setEditingImage] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    fetchImages();
  }, []);

  useEffect(() => {
    filterImages();
  }, [images, selectedCategory, searchTerm]);

  const fetchImages = async () => {
    try {
      setLoading(true);
      const response = await axios.get('https://swanand-vibes-backend.vercel.app/api/gallery/');
      setImages(response.data);
      
      const uniqueCategories = [...new Set(response.data.map(img => img.category))];
      setCategories(uniqueCategories);
    } catch (error) {
      toast.error('Failed to fetch images');
      console.error('Error fetching images:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterImages = () => {
    let filtered = images;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(image => image.category === selectedCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter(image =>
        image.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredImages(filtered);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this image?')) return;

    try {
      await axios.delete(`https://swanand-vibes-backend.vercel.app/gallery/${id}`);
      toast.success('Image deleted successfully');
      fetchImages();
    } catch (error) {
      toast.error('Failed to delete image');
      console.error('Error deleting image:', error);
    }
  };

  const handleEdit = (image) => {
    setEditingImage({ ...image });
    setShowEditModal(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = editingImage.imageUrl;

      // 🔹 If new image selected, upload to Cloudinary
      if (editingImage.newImage) {
        const sigRes = await axios.get("https://swanand-vibes-backend.vercel.app/api/products/signature");
        const { timestamp, signature, cloudName, apiKey } = sigRes.data;

        const data = new FormData();
        data.append("file", editingImage.newImage);
        data.append("api_key", apiKey);
        data.append("timestamp", timestamp);
        data.append("signature", signature);

        const uploadRes = await axios.post(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          data
        );

        imageUrl = uploadRes.data.secure_url;
      }

      // 🔹 Update DB
      await axios.put(`https://swanand-vibes-backend.vercel.app/api/gallery/${editingImage._id}`, {
        title: editingImage.title,
        category: editingImage.category,
        imageUrl
      });

      toast.success('Image updated successfully');
      setShowEditModal(false);
      setEditingImage(null);
      fetchImages();
    } catch (error) {
      toast.error('Failed to update image');
      console.error('Error updating image:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEditingImage({
        ...editingImage,
        newImage: file,
        imagePreview: URL.createObjectURL(file)
      });
    }
  };

  const handleNewGallery = () =>{
    navigate('/admin/uploadimage')
  }

  if (loading) {
    return (
      <Spinner size='lg'/>
      // <div className="gallery-loading">
      //   <div className="spinner"></div>
      //   <p>Loading images...</p>
      // </div>
    );
  }

  return (
    <div className="gallery-container">
      <div className='gallery-add-gallery'>
        <h1>Image Gallery</h1>
        <div className='add-gallery-section'>
          <button onClick={handleNewGallery} className='add-gallery-btn'>Add New Gallery</button>
        </div>
      </div>
      <div className="gallery-header">
        
        <div className="gallery-controls">
          <div className="gallery-search-box">
            <input
              type="text"
              placeholder="🔍 Search images..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="gallery-search-input"
            />
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="gallery-category-filter"
          >
            <option value="all">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="gallery-stats">
        <p>Showing {filteredImages.length} of {images.length} images</p>
      </div>

      {filteredImages.length === 0 ? (
        <div className="gallery-no-images">
          <p>No images found matching your criteria.</p>
        </div>
      ) : (
        <div className="gallery-grid">
          {filteredImages.map(image => (
            <div key={image._id} className="gallery-item">
              <div className="gallery-image-container">
                <img src={image.imageUrl} alt={image.title} loading="lazy" />
                <div className="gallery-image-overlay">
                  <button 
                    className="gallery-btn-edit"
                    onClick={() => handleEdit(image)}
                  >
                    Edit
                  </button>
                  <button 
                    className="gallery-btn-delete"
                    onClick={() => handleDelete(image._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
              <div className="gallery-image-info">
                <h3 className="gallery-image-title">{image.title}</h3>
                <span className="gallery-image-category">{image.category}</span>
                <span className="gallery-image-date">
                  {new Date(image.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {showEditModal && editingImage && (
        <div className="gallery-modal-overlay">
          <div className="gallery-modal-content">
            <div className="gallery-modal-header">
              <h2>Edit Image</h2>
              <button 
                className="gallery-modal-close"
                onClick={() => setShowEditModal(false)}
              >
                ×
              </button>
            </div>

            <form onSubmit={handleUpdate} className="gallery-edit-form">
              <div className="gallery-form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  id="title"
                  value={editingImage.title}
                  onChange={(e) => setEditingImage({
                    ...editingImage,
                    title: e.target.value
                  })}
                  required
                />
              </div>

              <div className="gallery-form-group">
                <label htmlFor="category">Category</label>
                <select
                  id="category"
                  value={editingImage.category}
                  onChange={(e) => setEditingImage({
                    ...editingImage,
                    category: e.target.value
                  })}
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div className="gallery-form-group">
                <label htmlFor="image">Replace Image (Optional)</label>
                <input
                  type="file"
                  id="image"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                {editingImage.imagePreview && (
                  <div className="gallery-image-preview">
                    <img src={editingImage.imagePreview} alt="Preview" />
                  </div>
                )}
              </div>

              <div className="gallery-form-actions">
                <button 
                  type="button" 
                  className="gallery-btn-cancel"
                  onClick={() => setShowEditModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="gallery-btn-save">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryList;
