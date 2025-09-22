// import React from 'react'
// import axios from 'axios'
// import { useState, useEffect } from 'react'


// const List = () => {
//     const [products, setProducts] = useState([])

//     useEffect(() => {
//         const fetchProducts = async () => {
//             const response = await axios.get('http://localhost:5000/api/products/')
//             setProducts(response.data.data)
//             console.log(response.data)
//         }
//         fetchProducts()
//     }, [])

//   return (
//     <div>
//         <h1>Product List</h1>
//         <table>
//             <thead>
//                 <tr>
//                     <th>Img</th>
//                     <th>Name</th>
//                     <th>Price</th>
//                     <th>Category</th>
//                     <th>Actions</th>
//                 </tr>
//             </thead>
//             <tbody>
//                 {products?.map(product => (
//                     <tr key={product._id}>
//                         <td><img src={product.images[0].url} alt={product.name} /></td>
//                         <td>{product.name}</td>
//                         <td>{product.price}</td>
//                         <td>{product.category}</td>
//                         <td>
//                             <button>Edit</button>
//                             <button>Delete</button>
//                         </td>
//                     </tr>
//                 ))}
//             </tbody>
//         </table>
//     </div>
//   )
// }

// export default List









// List.js (Updated)
// import React from 'react';
// import axios from 'axios';
// import { useState, useEffect } from 'react';
// import {useNavigate} from 'react-router-dom'
// import '../../../CssFiles/Admin/product/list.css';
// import {getAllProducts, deleteProduct} from '../../../utills/apicall' 
// import Spinner from '../../../components/Spinner';
// import { toast } from 'react-hot-toast';

// const List = () => {
//     const navigate = useNavigate();
//     const [products, setProducts] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchProducts = async () => {
//             try {
//                 setLoading(true);
//                 const response = await getAllProducts();
//                 // axios.get('http://localhost:5000/api/products/');
//                 setProducts(response.data.data);
//                 console.log(response.data);
//             } catch (err) {
//                 setError('Failed to fetch products. Please try again later.');
//                 console.error('Error fetching products:', err);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchProducts();
//     }, []);

//     const handleDelete = async (productId) => {
//         if (window.confirm('Are you sure you want to delete this product?')) {
//             try {
//                 await deleteProduct(productId);
//                 // axios.delete(`http://localhost:5000/api/products/${productId}`);
//                 setProducts(products.filter(product => product._id !== productId));
//                 toast.success('Product deleted successfully.');
//             } catch (err) {
//                 toast.error('Failed to delete product.');
//                 console.error('Error deleting product:', err);
//             }
//         }
//     };

//     const handleEdit = (id) => {
//         // Navigate to the edit page or open a modal for editing
//         navigate(`/admin/product/edit/${id}`);
//     };

//     const handleAdd = () => {
//         // Navigate to the add product page or open a modal for adding
//         navigate('/admin/product/add');
//     };

//     const handleView = (id) => {
//         // Navigate to the product detail page
//         navigate(`/admin/product/${id}`);
//     };

//     if (loading) {
//         return <Spinner size='lg' />;
//     }

//     if (error) {
//         return (
//             <div className="product-list-container">
//                 <div className="error-message">
//                     <span className="error-icon">⚠️</span>
//                     <h3>{error}</h3>
//                     <button onClick={() => window.location.reload()} className="retry-btn">
//                         Try Again
//                     </button>
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <div className="product-list-container">
//             <div className="product-list-header">
//                 <h1>Product Inventory</h1>
//                 <p>Manage your product catalog with ease</p>
//                 <button className="add-product-btn" onClick={handleAdd}>
//                     + Add New Product
//                 </button>
//             </div>

//             <div className="products-grid">
//                 {products?.map(product => (
//                     <div key={product._id} className="product-cards">
//                         <div className="product-image">
//                             <img 
//                                 src={product.images[0]?.url || 'https://via.placeholder.com/300x200/1e293b/ffffff?text=No+Image'} 
//                                 alt={product.name} 
//                             />
//                             <div className="product-overlay">
//                                 <button onClick={() => handleView(product._id)} className="action-btn view-btn">View</button>
//                             </div>
//                         </div>
                        
//                         <div className="product-list-info">
//                             <h3 className="product-name">{product.name}</h3>
//                             <p className="product-description">{product.description?.substring(0, 60)}...</p>
                            
//                             <div className="product-details">
//                                 <div className="product-price">₹{product.price}</div>
//                                 <span className="product-category">{product.category}</span>
//                             </div>
                            
//                             <div className="product-stock">
//                                 <span className={`stock-status ${product.stock > 0 ? 'in-stock' : 'out-of-stock'}`}>
//                                     {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
//                                 </span>
//                             </div>
                            
//                             <div className="product-actions">
//                                 <button onClick={() => handleEdit(product._id)} className="product-action-btn edit-btn">
//                                     <span className="btn-icon">✏️</span>
//                                     Edit
//                                 </button>
//                                 <button 
//                                     className="product-action-btn delete-btn"
//                                     onClick={() => handleDelete(product._id)}
//                                 >
//                                     <span className="btn-icon">🗑️</span>
//                                     Delete
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 ))}
//             </div>

//             {products.length === 0 && (
//                 <div className="empty-state">
//                     <div className="empty-icon">📦</div>
//                     <h3>No products found</h3>
//                     <p>Get started by adding your first product</p>
//                     <button className="add-product-btn primary">
//                         + Add New Product
//                     </button>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default List;





// *************************************
// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import '../../../CssFiles/Admin/product/list.css';
// import { getAllProducts, deleteProduct, generateStockReport } from '../../../utills/apicall';
// import Spinner from '../../../components/Spinner';
// import { toast } from 'react-hot-toast';
// import {FiArrowLeft, FiArrowRight } from 'react-icons/fi';
// import axios from 'axios';
// import { LuDownload } from "react-icons/lu";

// const List = () => {
//   const navigate = useNavigate();
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [page, setPage] = useState(1);
//   const [limit] = useState(10); // You can make this dynamic if needed
//   const [totalPages, setTotalPages] = useState(1);

//   const fetchProducts = async () => {
//     try {
//       setLoading(true);
//       const response = await getAllProducts(page, limit, ' ', ' '); // Pass pagination params
//       setProducts(response.data.data);
//       setTotalPages(response.data.totalPages);
//       console.log(response.data);
//     } catch (err) {
//       setError('Failed to fetch products. Please try again later.');
//       console.error('Error fetching products:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, [page]);

//   const handleDelete = async (productId) => {
//     if (window.confirm('Are you sure you want to delete this product?')) {
//       try {
//         await deleteProduct(productId);
//         toast.success('Product deleted successfully.');
//         fetchProducts(); // Refresh after deletion
//       } catch (err) {
//         toast.error('Failed to delete product.');
//         console.error('Error deleting product:', err);
//       }
//     }
//   };

//   const handleEdit = (id) => navigate(`/admin/product/edit/${id}`);
//   const handleAdd = () => navigate('/admin/product/add');
//   const handleView = (id) => navigate(`/admin/product/${id}`);

//   const handlePrevPage = () => setPage((prev) => Math.max(prev - 1, 1));
//   const handleNextPage = () => setPage((prev) => Math.min(prev + 1, totalPages));

//   // const handlegenerateStockReport = () => {
//   //   try {
//   //     const res = generateStockReport();
//   //     // download the file
//   //        const url = window.URL.createObjectURL(new Blob([res.data]));
//   //   const link = document.createElement('a');
//   //   link.href = url;
//   //   link.setAttribute('download', 'stock_report.xlsx');
//   //   document.body.appendChild(link);
//   //   link.click();
//   //   link.remove();

//   //     // console.log(res.data);
//   //     toast.success('Stock report generated successfully.');
//   //   } catch (error) {
//   //     console.error('Error generating stock report:', error);
//   //     toast.error('Failed to generate stock report.');
//   //   }
//   // };

//   const handlegenerateStockReport = async () => {
//   try {
//     const res = await axios.get('https://swanand-vibes-backend.vercel.app/api/products/stock', {
//       responseType: 'blob', // 👈 required!
//     });

//     const blob = new Blob([res.data], {
//       type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
//     });

//     const url = window.URL.createObjectURL(blob);
//     const link = document.createElement('a');
//     link.href = url;
//     link.setAttribute('download', 'stock_report.xlsx');
//     document.body.appendChild(link);
//     link.click();
//     link.remove();

//     toast.success('Stock report generated successfully.');
//   } catch (error) {
//     console.error('Error generating stock report:', error);
//     toast.error('Failed to generate stock report.');
//   }
// };

//   const handleaddCategory=() => navigate('/admin/category/add');

//   if (loading) return <Spinner size="lg" />;
//   if (error) {
//     return (
//       <div className="product-list-container">
//         <div className="error-message">
//           <span className="error-icon">⚠️</span>
//           <h3>{error}</h3>
//           <button onClick={() => window.location.reload()} className="retry-btn">
//             Try Again
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="product-list-container">
//       <div className="product-list-header">
//         <h1>Product Inventory</h1>
//         <p>Manage your product catalog with ease</p>
//         <div className="add-product-stock-btn-container">
//            <button className="add-product-btn" onClick={handleAdd}>
//           + Add New Product
//         </button>
//         <button className='add-product-btn' onClick={handleaddCategory}>Add Category</button>
//         <button className="download-product-btn" onClick={handlegenerateStockReport}>
//           Stock Report <LuDownload />
//         </button>
//         </div>
       
//       </div>

//       <div className="products-grid">
//         {products.map((product) => (
//           <div key={product._id} className="product-cards">
//             <div className="product-image">
//               <img
//                 src={product.images[0]?.url || 'https://via.placeholder.com/300x200/1e293b/ffffff?text=No+Image'}
//                 alt={product.name}
//               />
//               <div className="product-overlay">
//                 <button onClick={() => handleView(product._id)} className="action-btn view-btn">
//                   View
//                 </button>
//               </div>
//             </div>

//             <div className="product-list-info">
//               <h3 className="product-name">{product.name}</h3>
//               <p className="product-description">{product.description?.substring(0, 60)}...</p>

//               <div className="product-details">
//                 <div className="product-price">₹{product.price}</div>
//                 <span className="product-category">{product.category}</span>
//               </div>

//               <div className="product-stock">
//                 <span className={`stock-status ${product.stock > 0 ? 'in-stock' : 'out-of-stock'}`}>
//                   {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
//                 </span>
//               </div>

//               <div className="product-actions">
//                 <button onClick={() => handleEdit(product._id)} className="product-action-btn edit-btn">
//                   {/* <span className="btn-icon"></span>  */}
//                   Edit
//                 </button>
//                 <button onClick={() => handleDelete(product._id)} className="product-action-btn delete-btn">
//                   {/* <span className="btn-icon"></span>  */}
//                   Delete
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {products.length === 0 && (
//         <div className="empty-state">
//           <div className="empty-icon">📦</div>
//           <h3>No products found</h3>
//           <p>Get started by adding your first product</p>
//           <button className="add-product-btn primary" onClick={handleAdd}>
//             + Add New Product
//           </button>
//         </div>
//       )}

//       {/* Pagination Controls */}
//       <div className="pagination">
//         <button className='user-pagination-btn' onClick={handlePrevPage} disabled={page === 1}>
//           <FiArrowLeft />
//         </button>
//         <span className="user-pagination-text">
//          {" "} Page {page} of {totalPages} {" "}
//         </span>
//         <button className='user-pagination-btn' onClick={handleNextPage} disabled={page === totalPages}>
//           <FiArrowRight />
//         </button>
//       </div>
//     </div>
//   );
// };

// export default List;
// ***********************

// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import '../../../CssFiles/Admin/product/list.css';
// import { getAllProducts, deleteProduct } from '../../../utills/apicall';
// import Spinner from '../../../components/Spinner';
// import { toast } from 'react-hot-toast';
// import { FiArrowLeft, FiArrowRight, FiEdit, FiTrash2, FiEye, FiPlus, FiDownload, FiBox } from 'react-icons/fi';
// import { LuDownload } from "react-icons/lu";
// import axios from 'axios';

// const List = () => {
//   const navigate = useNavigate();
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [page, setPage] = useState(1);
//   const [limit] = useState(10);
//   const [totalPages, setTotalPages] = useState(1);
//   const [totalItems, setTotalItems] = useState(0);
//   const [selectedProduct, setSelectedProduct] = useState(null);

//   const fetchProducts = async () => {
//     try {
//       setLoading(true);
//       const response = await getAllProducts(page, limit, ' ', ' ');
//       setProducts(response.data.data);
//       console.log(response.data);
      
//       setTotalPages(response.data.totalPages);
//       setTotalItems(response.data.totalItems);
//     } catch (err) {
//       setError('Failed to fetch products. Please try again later.');
//       console.error('Error fetching products:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, [page]);

//   const handleDelete = async (productId) => {
//     if (window.confirm('Are you sure you want to delete this product?')) {
//       try {
//         await deleteProduct(productId);
//         toast.success('Product deleted successfully.');
//         fetchProducts();
//       } catch (err) {
//         toast.error('Failed to delete product.');
//         console.error('Error deleting product:', err);
//       }
//     }
//   };

//   const handleEdit = (id) => navigate(`/admin/product/edit/${id}`);
//   const handleAdd = () => navigate('/admin/product/add');
//   const handleView = (id) => navigate(`/admin/product/${id}`);
//   const handleaddCategory = () => navigate('/admin/category/add');

//   const handlePrevPage = () => setPage((prev) => Math.max(prev - 1, 1));
//   const handleNextPage = () => setPage((prev) => Math.min(prev + 1, totalPages));

//   const handlegenerateStockReport = async () => {
//     try {
//       const res = await axios.get('https://swanand-vibes-backend.vercel.app/api/products/stock', {
//         responseType: 'blob',
//       });

//       const blob = new Blob([res.data], {
//         type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
//       });

//       const url = window.URL.createObjectURL(blob);
//       const link = document.createElement('a');
//       link.href = url;
//       link.setAttribute('download', 'stock_report.xlsx');
//       document.body.appendChild(link);
//       link.click();
//       link.remove();

//       toast.success('Stock report generated successfully.');
//     } catch (error) {
//       console.error('Error generating stock report:', error);
//       toast.error('Failed to generate stock report.');
//     }
//   };

//   const getVariantInfo = (product) => {
//     if (!product.variants || product.variants.length === 0) {
//       return { minPrice: product.price || 0, maxPrice: product.price || 0, totalStock: product.stock || 0 };
//     }

//     const prices = product.variants.map(v => v.price);
//     const stocks = product.variants.map(v => v.stock);
    
//     return {
//       minPrice: Math.min(...prices),
//       maxPrice: Math.max(...prices),
//       totalStock: stocks.reduce((sum, stock) => sum + stock, 0),
//       variantCount: product.variants.length
//     };
//   };

//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric'
//     });
//   };

//   if (loading) return (
//     <div className="loading-container">
//       <Spinner size="lg" />
//       <p>Loading products...</p>
//     </div>
//   );

//   if (error) {
//     return (
//       <div className="product-list-container">
//         <div className="error-message">
//           <span className="error-icon">⚠️</span>
//           <h3>{error}</h3>
//           <button onClick={() => window.location.reload()} className="retry-btn">
//             Try Again
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="product-list-container">
//       <div className="product-list-header">
//         <div className="header-content">
//           <div className="header-text">
//             <h1>📦 Product Inventory</h1>
//             <p>Manage {totalItems} products in your catalog</p>
//           </div>
//           <div className="header-actions">
//             <button className="btn-primary" onClick={handleAdd}>
//               <FiPlus /> Add Product
//             </button>
//             <button className="btn-secondary" onClick={handleaddCategory}>
//               <FiBox /> Add Category
//             </button>
//             <button className="btn-success" onClick={handlegenerateStockReport}>
//               <FiDownload /> Stock Report
//             </button>
//           </div>
//         </div>
//       </div>

//       {products.length > 0 ? (
//         <>
//           <div className="products-grid">
//             {products.map((product) => {
//               const variantInfo = getVariantInfo(product);
//               const hasVariants = product.variants && product.variants.length > 0;
              
//               return (
//                 <div key={product._id} className="product-card">
//                   <div className="product-image">
//                     <img
//                       src={product.images[0]?.url || 'https://via.placeholder.com/300x200/1e293b/ffffff?text=No+Image'}
//                       alt={product.name}
//                     />
//                     <div className="product-badges">
//                       {!product.isActive && <span className="badge-inactive">Inactive</span>}
//                       {hasVariants && <span className="badge-variants">{variantInfo.variantCount} variants</span>}
//                     </div>
//                   </div>

//                   <div className="product-content">
//                     <div className="product-header">
//                       <h3 className="product-name">{product.name}</h3>
//                       <p className="product-brand">{product.brand}</p>
//                     </div>

//                     <p className="product-description">
//                       {product.description?.substring(0, 80)}...
//                     </p>

//                     <div className="product-details">
//                       <div className="detail-row">
//                         <span className="detail-label">Category:</span>
//                         <span className="detail-value">{product?.category?.name}</span>
//                       </div>
                      
//                       <div className="detail-row">
//                         <span className="detail-label">Price:</span>
//                         <span className="detail-value">
//                           {hasVariants ? (
//                             `₹${variantInfo.minPrice} - ₹${variantInfo.maxPrice}`
//                           ) : (
//                             `₹${variantInfo.minPrice}`
//                           )}
//                         </span>
//                       </div>

//                       <div className="detail-row">
//                         <span className="detail-label">Stock:</span>
//                         <span className={`detail-value ${variantInfo.totalStock === 0 ? 'out-of-stock' : 'in-stock'}`}>
//                           {variantInfo.totalStock} units
//                         </span>
//                       </div>

//                       <div className="detail-row">
//                         <span className="detail-label">Tax:</span>
//                         <span className="detail-value">{product.tax}%</span>
//                       </div>

//                       <div className="detail-row">
//                         <span className="detail-label">Updated:</span>
//                         <span className="detail-value">{formatDate(product.updatedAt)}</span>
//                       </div>
//                     </div>

//                     {hasVariants && (
//                       <div className="variants-preview">
//                         <div className="variants-header">
//                           <span>Variants:</span>
//                           <span>{product.variants.length} sizes</span>
//                         </div>
//                         <div className="variants-list">
//                           {product.variants.slice(0, 3).map((variant, index) => (
//                             <span key={index} className="variant-tag">
//                               {variant.size} (₹{variant.price})
//                             </span>
//                           ))}
//                           {product.variants.length > 3 && (
//                             <span className="variant-more">+{product.variants.length - 3} more</span>
//                           )}
//                         </div>
//                       </div>
//                     )}

//                     <div className="product-actions">
//                       <button onClick={() => handleView(product._id)} className="btn-action view">
//                         <FiEye /> View
//                       </button>
//                       <button onClick={() => handleEdit(product._id)} className="btn-action edit">
//                         <FiEdit /> Edit
//                       </button>
//                       <button onClick={() => handleDelete(product._id)} className="btn-action delete">
//                         <FiTrash2 /> Delete
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>

//           {/* Pagination */}
//           {totalPages > 1 && (
//             <div className="pagination">
//               <button 
//                 className="pagination-btn" 
//                 onClick={handlePrevPage} 
//                 disabled={page === 1}
//               >
//                 <FiArrowLeft /> Previous
//               </button>
              
//               <div className="pagination-info">
//                 Page {page} of {totalPages} • {totalItems} total products
//               </div>
              
//               <button 
//                 className="pagination-btn" 
//                 onClick={handleNextPage} 
//                 disabled={page === totalPages}
//               >
//                 Next <FiArrowRight />
//               </button>
//             </div>
//           )}
//         </>
//       ) : (
//         <div className="empty-state">
//           <div className="empty-icon">📦</div>
//           <h3>No products found</h3>
//           <p>Get started by adding your first product to the catalog</p>
//           <button className="btn-primary" onClick={handleAdd}>
//             <FiPlus /> Add New Product
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default List;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../CssFiles/Admin/product/list.css';
import { getAllProducts, deleteProduct } from '../../../utills/apicall';
import Spinner from '../../../components/Spinner';
import { toast } from 'react-hot-toast';
import { FiArrowLeft, FiArrowRight, FiEdit, FiTrash2, FiEye, FiPlus, FiDownload, FiBox, FiChevronDown, FiChevronUp, FiFilter } from 'react-icons/fi';
import { LuDownload } from "react-icons/lu";
import axios from 'axios';

const List = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [sortField, setSortField] = useState('updatedAt');
  const [sortOrder, setSortOrder] = useState('desc');
  const [expandedProduct, setExpandedProduct] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await getAllProducts(page, limit, ' ', ' ');
      setProducts(response.data.data);
      console.log(response.data);
      
      setTotalPages(response.data.totalPages);
      setTotalItems(response.data.totalItems);
    } catch (err) {
      setError('Failed to fetch products. Please try again later.');
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page]);

  const handleDelete = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(productId);
        toast.success('Product deleted successfully.');
        fetchProducts();
      } catch (err) {
        toast.error('Failed to delete product.');
        console.error('Error deleting product:', err);
      }
    }
  };

  const handleEdit = (id) => navigate(`/admin/product/edit/${id}`);
  const handleAdd = () => navigate('/admin/product/add');
  const handleView = (id) => navigate(`/admin/product/${id}`);
  const handleaddCategory = () => navigate('/admin/category/add');

  const handlePrevPage = () => setPage((prev) => Math.max(prev - 1, 1));
  const handleNextPage = () => setPage((prev) => Math.min(prev + 1, totalPages));

  const handlegenerateStockReport = async () => {
    try {
      const res = await axios.get('https://swanand-vibes-backend.vercel.app/api/products/stock', {
        responseType: 'blob',
      });

      const blob = new Blob([res.data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'stock_report.xlsx');
      document.body.appendChild(link);
      link.click();
      link.remove();

      toast.success('Stock report generated successfully.');
    } catch (error) {
      console.error('Error generating stock report:', error);
      toast.error('Failed to generate stock report.');
    }
  };

  const getVariantInfo = (product) => {
    if (!product.variants || product.variants.length === 0) {
      return { minPrice: product.price || 0, maxPrice: product.price || 0, totalStock: product.stock || 0 };
    }

    const prices = product.variants.map(v => v.price);
    const stocks = product.variants.map(v => v.stock);
    
    return {
      minPrice: Math.min(...prices),
      maxPrice: Math.max(...prices),
      totalStock: stocks.reduce((sum, stock) => sum + stock, 0),
      variantCount: product.variants.length
    };
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const toggleExpand = (productId) => {
    if (expandedProduct === productId) {
      setExpandedProduct(null);
    } else {
      setExpandedProduct(productId);
    }
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  if (loading) return (
    <div className="loading-container">
      <Spinner size="lg" />
      <p>Loading products...</p>
    </div>
  );

  if (error) {
    return (
      <div className="product-list-container">
        <div className="error-message">
          <span className="error-icon">⚠️</span>
          <h3>{error}</h3>
          <button onClick={() => window.location.reload()} className="retry-btn">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="product-list-container">
      <div className="product-list-header">
        <div className="header-content">
          <div className="header-text">
            <h1>📦 Product Inventory</h1>
            <p>Manage {totalItems} products in your catalog</p>
          </div>
          <div className="header-actions">
            <button className="btn-primary" onClick={handleAdd}>
              <FiPlus /> Add Product
            </button>
            <button className="btn-secondary" onClick={handleaddCategory}>
              <FiBox /> Add Category
            </button>
            <button className="btn-success" onClick={handlegenerateStockReport}>
              <FiDownload /> Stock Report
            </button>
            <button 
              className={`btn-filter ${showFilters ? 'active' : ''}`}
              onClick={() => setShowFilters(!showFilters)}
            >
              <FiFilter /> Filters
            </button>
          </div>
        </div>
      </div>

      {products.length > 0 ? (
        <>
          <div className="table-container">
            <table className="products-table">
              <thead>
                <tr>
                  <th className="product-image-col">Image</th>
                  <th 
                    className="product-name-col sortable"
                    onClick={() => handleSort('name')}
                  >
                    Name {sortField === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
                  </th>
                  <th 
                    className="product-price-col sortable"
                    onClick={() => handleSort('price')}
                  >
                    Price {sortField === 'price' && (sortOrder === 'asc' ? '↑' : '↓')}
                  </th>
                  <th 
                    className="product-stock-col sortable"
                    onClick={() => handleSort('stock')}
                  >
                    Stock {sortField === 'stock' && (sortOrder === 'asc' ? '↑' : '↓')}
                  </th>
                  <th className="product-category-col">Category</th>
                  <th 
                    className="product-updated-col sortable"
                    onClick={() => handleSort('updatedAt')}
                  >
                    Updated {sortField === 'updatedAt' && (sortOrder === 'asc' ? '↑' : '↓')}
                  </th>
                  <th className="product-status-col">Status</th>
                  <th className="product-actions-col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products?.map((product) => {
                  const variantInfo = getVariantInfo(product);
                  const hasVariants = product?.variants && product?.variants?.length > 0;
                  const isExpanded = expandedProduct === product._id;
                  
                  return (
                    <React.Fragment key={product?._id}>
                      <tr className="product-row">
                        <td className="product-image-cell">
                          <img
                            src={product?.images[0]?.url || 'https://via.placeholder.com/50x50/1e293b/ffffff?text=No+Image'}
                            alt={product?.name}
                            className="product-thumbnail"
                          />
                        </td>
                        <td className="product-name-cell">
                          <div className="product-name-info">
                            <div className="product-name">{product?.name}</div>
                            <div className="product-brand">{product?.brand}</div>
                          </div>
                        </td>
                        <td className="product-price-cell">
                          {hasVariants ? (
                            <div className="price-range">
                              <span className="min-price">₹{variantInfo?.minPrice}</span>
                              <span className="range-separator">-</span>
                              <span className="max-price">₹{variantInfo?.maxPrice}</span>
                              {variantInfo?.variantCount > 1 && (
                                <div className="variant-count">{variantInfo?.variantCount} variants</div>
                              )}
                            </div>
                          ) : (
                            <div className="single-price">₹{variantInfo?.minPrice}</div>
                          )}
                        </td>
                        <td className="product-stock-cell">
                          <div className={`stock-indicator ${variantInfo?.totalStock === 0 ? 'out-of-stock' : 'in-stock'}`}>
                            <div className="stock-value">{variantInfo?.totalStock}</div>
                            <div className="stock-label">units</div>
                          </div>
                        </td>
                        <td className="product-category-cell">
                          {product?.category?.name}
                        </td>
                        <td className="product-updated-cell">
                          {formatDate(product?.updatedAt)}
                        </td>
                        <td className="product-status-cell">
                          <span className={`status-badge ${product?.isActive ? 'active' : 'inactive'}`}>
                            {product?.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td className="product-actions-cell">
                          <div className="action-buttons">
                            <button 
                              onClick={() => handleView(product?._id)} 
                              className="btn-action view"
                              title="View"
                            >
                              <FiEye />
                            </button>
                            <button 
                              onClick={() => handleEdit(product?._id)} 
                              className="btn-action edit"
                              title="Edit"
                            >
                              <FiEdit />
                            </button>
                            <button 
                              onClick={() => handleDelete(product?._id)} 
                              className="btn-action delete"
                              title="Delete"
                            >
                              <FiTrash2 />
                            </button>
                            {hasVariants && (
                              <button 
                                onClick={() => toggleExpand(product?._id)} 
                                className="btn-action expand"
                                title={isExpanded ? "Collapse" : "Expand"}
                              >
                                {isExpanded ? <FiChevronUp /> : <FiChevronDown />}
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                      
                      {isExpanded && hasVariants && (
                        <tr className="variant-details-row">
                          <td colSpan="8">
                            <div className="variant-details">
                              <h4>Product Variants</h4>
                              <div className="variants-grid">
                                {product.variants.map((variant, index) => (
                                  <div key={index} className="variant-card">
                                    <div className="variant-header">
                                      <span className="variant-size">Size: {variant.size}</span>
                                      <span className="variant-price">₹{variant.price}</span>
                                    </div>
                                    <div className="variant-stock">
                                      <span className={`stock-badge ${variant.stock === 0 ? 'out-of-stock' : 'in-stock'}`}>
                                        {variant.stock} in stock
                                      </span>
                                    </div>
                                    {variant.images && variant.images.length > 0 && (
                                      <div className="variant-images">
                                        <img 
                                          src={variant.images[0].url} 
                                          alt={`Variant ${variant.size}`}
                                          className="variant-image"
                                        />
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="pagination">
              <button 
                className="pagination-btn" 
                onClick={handlePrevPage} 
                disabled={page === 1}
              >
                <FiArrowLeft /> Previous
              </button>
              
              <div className="pagination-info">
                Page {page} of {totalPages} • {totalItems} total products
              </div>
              
              <button 
                className="pagination-btn" 
                onClick={handleNextPage} 
                disabled={page === totalPages}
              >
                Next <FiArrowRight />
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="empty-state">
          <div className="empty-icon">📦</div>
          <h3>No products found</h3>
          <p>Get started by adding your first product to the catalog</p>
          <button className="btn-primary" onClick={handleAdd}>
            <FiPlus /> Add New Product
          </button>
        </div>
      )}
    </div>
  );
};

export default List;






// *****************************************************************************



// ProductList.js
// import React, { useState, useEffect } from 'react';
// import '../../../CssFiles/Admin/product/productcommon.css'
// // import './FuturisticProducts.css';

// const List = () => {
//   const [products, setProducts] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState('all');
//   const [sortOption, setSortOption] = useState('featured');
//   const [priceRange, setPriceRange] = useState([0, 1000]);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [isLoading, setIsLoading] = useState(true);

//   // Simulate data fetching
//   useEffect(() => {
//     const fetchProducts = () => {
//       setIsLoading(true);
//       // Simulate API call
//       setTimeout(() => {
//         const mockProducts = [
//           {
//             id: 1,
//             name: "Quantum VR Headset",
//             price: 499.99,
//             category: "electronics",
//             rating: 4.8,
//             image: "https://via.placeholder.com/300x300/1e293b/ffffff?text=VR+Headset",
//             featured: true,
//             description: "Immerse yourself in virtual worlds with our cutting-edge VR technology",
//             tags: ["VR", "Gaming", "Tech"]
//           },
//           {
//             id: 2,
//             name: "Neural Smartwatch",
//             price: 349.99,
//             category: "electronics",
//             rating: 4.5,
//             image: "https://via.placeholder.com/300x300/1e293b/ffffff?text=Smartwatch",
//             featured: true,
//             description: "Stay connected with advanced health monitoring and AI assistance",
//             tags: ["Wearable", "Health", "Smart"]
//           },
//           {
//             id: 3,
//             name: "Holographic Display",
//             price: 899.99,
//             category: "electronics",
//             rating: 4.9,
//             image: "https://via.placeholder.com/300x300/1e293b/ffffff?text=Holo+Display",
//             featured: false,
//             description: "Project 3D holograms with stunning clarity and realism",
//             tags: ["Display", "3D", "Innovation"]
//           },
//           {
//             id: 4,
//             name: "Zenith Gaming Laptop",
//             price: 1899.99,
//             category: "computers",
//             rating: 4.7,
//             image: "https://via.placeholder.com/300x300/1e293b/ffffff?text=Gaming+Laptop",
//             featured: true,
//             description: "Ultimate gaming performance with next-gen graphics and processing",
//             tags: ["Gaming", "Performance", "Laptop"]
//           },
//           {
//             id: 5,
//             name: "Nexus Wireless Earbuds",
//             price: 199.99,
//             category: "audio",
//             rating: 4.6,
//             image: "https://via.placeholder.com/300x300/1e293b/ffffff?text=Wireless+Earbuds",
//             featured: false,
//             description: "Crystal clear audio with adaptive noise cancellation",
//             tags: ["Audio", "Wireless", "Music"]
//           },
//           {
//             id: 6,
//             name: "Orbit Drone Pro",
//             price: 799.99,
//             category: "drones",
//             rating: 4.4,
//             image: "https://via.placeholder.com/300x300/1e293b/ffffff?text=Drone+Pro",
//             featured: false,
//             description: "Professional aerial photography with autonomous flight modes",
//             tags: ["Drone", "Camera", "Aerial"]
//           },
//           {
//             id: 7,
//             name: "Pixel Ultra Monitor",
//             price: 649.99,
//             category: "computers",
//             rating: 4.9,
//             image: "https://via.placeholder.com/300x300/1e293b/ffffff?text=4K+Monitor",
//             featured: true,
//             description: "4K resolution with HDR and 144Hz refresh rate",
//             tags: ["Display", "4K", "Gaming"]
//           },
//           {
//             id: 8,
//             name: "Volt Fast Charger",
//             price: 89.99,
//             category: "accessories",
//             rating: 4.3,
//             image: "https://via.placeholder.com/300x300/1e293b/ffffff?text=Fast+Charger",
//             featured: false,
//             description: "100W fast charging for all your devices",
//             tags: ["Charger", "Accessory", "Fast Charge"]
//           }
//         ];
//         setProducts(mockProducts);
//         setFilteredProducts(mockProducts);
//         setIsLoading(false);
//       }, 1000);
//     };

//     fetchProducts();
//   }, []);

//   // Filter and sort products
//   useEffect(() => {
//     let result = [...products];
    
//     // Category filter
//     if (selectedCategory !== 'all') {
//       result = result.filter(product => product.category === selectedCategory);
//     }
    
//     // Price filter
//     result = result.filter(product => 
//       product.price >= priceRange[0] && product.price <= priceRange[1]
//     );
    
//     // Search filter
//     if (searchQuery) {
//       const query = searchQuery.toLowerCase();
//       result = result.filter(product => 
//         product.name.toLowerCase().includes(query) || 
//         product.description.toLowerCase().includes(query) ||
//         product.tags.some(tag => tag.toLowerCase().includes(query))
//       );
//     }
    
//     // Sort products
//     switch(sortOption) {
//       case 'price-low':
//         result.sort((a, b) => a.price - b.price);
//         break;
//       case 'price-high':
//         result.sort((a, b) => b.price - a.price);
//         break;
//       case 'rating':
//         result.sort((a, b) => b.rating - a.rating);
//         break;
//       case 'name':
//         result.sort((a, b) => a.name.localeCompare(b.name));
//         break;
//       default:
//         // Featured first, then by id
//         result.sort((a, b) => {
//           if (a.featured && !b.featured) return -1;
//           if (!a.featured && b.featured) return 1;
//           return a.id - b.id;
//         });
//     }
    
//     setFilteredProducts(result);
//   }, [products, selectedCategory, sortOption, priceRange, searchQuery]);

//   const categories = [
//     { id: 'all', name: 'All Products' },
//     { id: 'electronics', name: 'Electronics' },
//     { id: 'computers', name: 'Computers' },
//     { id: 'audio', name: 'Audio' },
//     { id: 'drones', name: 'Drones' },
//     { id: 'accessories', name: 'Accessories' }
//   ];

//   const handleQuickAdd = (product, e) => {
//     e.stopPropagation();
//     addToCart(product);
//   };

//   if (isLoading) {
//     return (
//       <div className="products-container">
//         <div className="loading-products">
//           <div className="loading-spinner"></div>
//           <p>Loading futuristic products...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="products-container">
//       <div className="products-header">
//         <h1>Future Tech Products</h1>
//         <p>Discover cutting-edge technology for tomorrow's world</p>
//       </div>

//       <div className="products-content">
//         <aside className="products-sidebar">
//           <div className="sidebar-section">
//             <h3>Categories</h3>
//             <div className="category-filters">
//               {categories.map(category => (
//                 <button
//                   key={category.id}
//                   className={`category-filter ${selectedCategory === category.id ? 'active' : ''}`}
//                   onClick={() => setSelectedCategory(category.id)}
//                 >
//                   <span className="category-name">{category.name}</span>
//                   <span className="product-count">
//                     {category.id === 'all' 
//                       ? products.length 
//                       : products.filter(p => p.category === category.id).length}
//                   </span>
//                 </button>
//               ))}
//             </div>
//           </div>

//           <div className="sidebar-section">
//             <h3>Price Range</h3>
//             <div className="price-filter">
//               <input
//                 type="range"
//                 min="0"
//                 max="2000"
//                 step="50"
//                 value={priceRange[1]}
//                 onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
//                 className="price-slider"
//               />
//               <div className="price-values">
//                 <span>${priceRange[0]}</span>
//                 <span>${priceRange[1]}</span>
//               </div>
//             </div>
//           </div>

//           <div className="sidebar-section">
//             <h3>Popular Tags</h3>
//             <div className="tag-filters">
//               {['VR', 'Gaming', 'Wireless', '4K', 'Smart', 'Tech'].map(tag => (
//                 <button
//                   key={tag}
//                   className="tag-filter"
//                   onClick={() => setSearchQuery(tag)}
//                 >
//                   {tag}
//                 </button>
//               ))}
//             </div>
//           </div>
//         </aside>

//         <main className="products-main">
//           <div className="products-controls">
//             <div className="search-box">
//               <input
//                 type="text"
//                 placeholder="Search products..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="futuristic-input"
//               />
//               <span className="search-icon">🔍</span>
//             </div>

//             <div className="sort-filter">
//               <select 
//                 value={sortOption} 
//                 onChange={(e) => setSortOption(e.target.value)}
//                 className="futuristic-select"
//               >
//                 <option value="featured">Featured</option>
//                 <option value="price-low">Price: Low to High</option>
//                 <option value="price-high">Price: High to Low</option>
//                 <option value="rating">Highest Rated</option>
//                 <option value="name">Name</option>
//               </select>
//             </div>
//           </div>

//           <div className="products-grid">
//             {filteredProducts.length > 0 ? (
//               filteredProducts.map(product => (
//                 <div 
//                   key={product.id} 
//                   className="product-card"
//                   onClick={() => onProductSelect(product)}
//                 >
//                   <div className="product-image">
//                     <img src={product.image} alt={product.name} />
//                     {product.featured && <span className="featured-badge">Featured</span>}
//                     <button 
//                       className="quick-add-btn"
//                       onClick={(e) => handleQuickAdd(product, e)}
//                     >
//                       Add to Cart
//                     </button>
//                   </div>
//                   <div className="product-info">
//                     <h3 className="product-name">{product.name}</h3>
//                     <p className="product-description">{product.description}</p>
//                     <div className="product-meta">
//                       <div className="product-rating">
//                         <span className="rating-stars">
//                           {'★'.repeat(Math.floor(product.rating))}
//                           {'☆'.repeat(5 - Math.floor(product.rating))}
//                         </span>
//                         <span className="rating-value">{product.rating}</span>
//                       </div>
//                       <div className="product-price">${product.price.toFixed(2)}</div>
//                     </div>
//                     <div className="product-tags">
//                       {product.tags.map(tag => (
//                         <span key={tag} className="product-tag">{tag}</span>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <div className="no-products">
//                 <div className="no-products-icon">🔍</div>
//                 <h3>No products found</h3>
//                 <p>Try adjusting your filters or search query</p>
//                 <button 
//                   className="futuristic-btn"
//                   onClick={() => {
//                     setSelectedCategory('all');
//                     setSearchQuery('');
//                     setPriceRange([0, 1000]);
//                   }}
//                 >
//                   Reset Filters
//                 </button>
//               </div>
//             )}
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default List;