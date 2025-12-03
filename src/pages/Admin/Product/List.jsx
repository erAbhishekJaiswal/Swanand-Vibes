import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../CssFiles/Admin/product/list.css';
import { getAllProducts, deleteProduct } from '../../../utills/apicall';
import Spinner from '../../../components/Spinner';
import { toast } from 'react-hot-toast';
import { FiArrowLeft, FiArrowRight, FiEdit, FiTrash2, FiEye, FiPlus, FiDownload, FiBox, FiChevronDown, FiChevronUp, FiFilter } from 'react-icons/fi';
import { LuDownload } from "react-icons/lu";
import axios from 'axios';
import axiosInstance from '../../../utills/axiosInstance';

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
      // console.log(response.data);
      
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
      const res = await axiosInstance.get('https://swanand-vibes-backend.vercel.app/api/products/stock', {
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
            {/* <button 
              className={`btn-filter ${showFilters ? 'active' : ''}`}
              onClick={() => setShowFilters(!showFilters)}
            >
              <FiFilter /> Filters
            </button> */}
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
                    
                  >
                    Name 
                  </th>
                  <th 
                    className="product-price-col sortable"
                    
                  >
                    Price 
                  </th>
                  <th 
                    className="product-stock-col sortable"
                    
                  >
                    Stock 
                  </th>
                  <th className="product-category-col">Category</th>
                  <th 
                    className="product-updated-col sortable"
                  
                  >
                    Updated
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
                              <span className="min-price">₹{variantInfo?.minPrice.toLocaleString()}</span>
                              <span className="range-separator">-</span>
                              <span className="max-price">₹{variantInfo?.maxPrice === variantInfo?.minPrice.toLocaleString() ? '': variantInfo?.maxPrice.toLocaleString() }</span>
                              {variantInfo?.variantCount > 1 && (
                                <div className="variant-count">{variantInfo?.variantCount} variants</div>
                              )}
                            </div>
                          ) : (
                            <div className="single-price">₹{variantInfo?.minPrice.toLocaleString()}</div>
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