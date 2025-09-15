// GalleryPage.js
import React, { useState, useEffect } from 'react';
import { FiSearch, FiFilter, FiCalendar, FiChevronLeft, FiChevronRight, FiGrid, FiImage, FiDownload, FiEye } from 'react-icons/fi';
import '../../CssFiles/User/userGallery.css';
import Spinner from '../../components/Spinner';
const Gallery = () => {
  const [images, setImages] = useState([]);
  const [filteredImages, setFilteredImages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'masonry'

  // Fetch gallery data
  useEffect(() => {
    const fetchGalleryData = async () => {
      try {
        setIsLoading(true);
        
        // Build query parameters
        const params = new URLSearchParams({
          page: currentPage,
          limit: itemsPerPage,
          ...(selectedCategory !== 'all' && { category: selectedCategory }),
          ...(searchTerm && { search: searchTerm }),
          ...(startDate && { startDate }),
          ...(endDate && { endDate })
        });

        const response = await fetch(`https://swanand-vibes-backend.vercel.app/api/gallery/common?${params}`);
        const data = await response.json();
        console.log(data);
        
        if (data.data) {
          setImages(data.data);
          setFilteredImages(data.data);
          setTotalItems(data.pagination.total);
          setTotalPages(data.pagination.pages);
          
          // Extract unique categories
          const uniqueCategories = [...new Set(data.data.map(img => img.category))];
          setCategories(uniqueCategories);
        }
      } catch (error) {
        console.error('Error fetching gallery data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGalleryData();
  }, [currentPage, itemsPerPage, selectedCategory, searchTerm, startDate, endDate]);

  // Handle search with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentPage(1); // Reset to first page when search changes
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Handle category filter
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  // Handle date filter application
  const applyDateFilter = () => {
    setCurrentPage(1);
  };

  // Clear all filters
  const clearFilters = () => {
    setSelectedCategory('all');
    setSearchTerm('');
    setStartDate('');
    setEndDate('');
    setCurrentPage(1);
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Download image
  const downloadImage = (imageUrl, imageName) => {
    fetch(imageUrl)
      .then(response => response.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = imageName || 'image';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      })
      .catch(() => alert('Download failed'));
  };

  if (isLoading) {
    return (
      <Spinner size='lg' />
    );
  }

  return (
    <div className="gallery-container">
      <div className="gallery-header">
        <div className="header-content">
          <h1><FiImage /> Image Gallery</h1>
          <p>Browse and manage your image collection</p>
        </div>
        <div className="view-toggle">
          <button 
            className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
            onClick={() => setViewMode('grid')}
            title="Grid View"
          >
            <FiGrid />
          </button>
          <button 
            className={`view-btn ${viewMode === 'masonry' ? 'active' : ''}`}
            onClick={() => setViewMode('masonry')}
            title="Masonry View"
          >
            <FiImage />
          </button>
        </div>
      </div>

      {/* Filters Section */}
      <div className="gallery-filters">
        <div className="filter-group">
          <div className="search-box">
            <FiSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search images..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="category-filter">
            <FiFilter className="filter-icon" />
            <select 
              value={selectedCategory} 
              onChange={(e) => handleCategoryChange(e.target.value)}
            >
              <option className="gallery-catg-option" value="all">All Categories</option>
              {categories.map(category => (
                <option className="gallery-catg-option" key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="date-filter">
            <FiCalendar className="filter-icon" />
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              placeholder="Start Date"
            />
            <span>to</span>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              placeholder="End Date"
            />
            <button onClick={applyDateFilter} className="apply-btn">
              Apply
            </button>
          </div>

          <button onClick={clearFilters} className="clear-filters-btn">
            Clear Filters
          </button>
        </div>

        <div className="results-info">
          <span>{totalItems} images found</span>
          <select 
            value={itemsPerPage} 
            onChange={(e) => setItemsPerPage(Number(e.target.value))}
          >
            <option value="12">12 per page</option>
            <option value="24">24 per page</option>
            <option value="36">36 per page</option>
            <option value="48">48 per page</option>
          </select>
        </div>
      </div>

      {/* Gallery Content */}
      <div className={`gallery-content ${viewMode}`}>
        {filteredImages.length > 0 ? (
          filteredImages.map((image, index) => (
            <div key={image._id || index} className="gallery-item">
              <div className="gallery-image-container">
                <img 
                  src={image.imageUrl} 
                  alt={image.title || 'Gallery image'}
                  loading="lazy"
                  onClick={() => setSelectedImage(image)}
                />
                <div className="image-overlay">
                  <div className="image-actions">
                    <button 
                      className="action-btn view"
                      onClick={() => setSelectedImage(image)}
                      title="View"
                    >
                      <FiEye />
                    </button>
                    <button 
                      className="action-btn download"
                      onClick={() => downloadImage(image.imageUrl, image.title)}
                      title="Download"
                    >
                      <FiDownload />
                    </button>
                  </div>
                </div>
              </div>
              <div className="image-info">
                <h3 className="image-title">{image.title}</h3>
                {image.description && (
                  <p className="image-description">{image.description}</p>
                )}
                <div className="image-meta">
                  <span className="category-badge">{image.category}</span>
                  <span className="image-date">{formatDate(image.createdAt)}</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="no-images">
            <FiImage size={48} />
            <h3>No images found</h3>
            <p>Try adjusting your filters or search terms</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pagination-controls">
          <button 
            className="pagination-btn"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            <FiChevronLeft />
            Previous
          </button>
          
          <div className="page-numbers">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }
              
              return (
                <button
                  key={pageNum}
                  className={`pagination-btn ${currentPage === pageNum ? 'active' : ''}`}
                  onClick={() => setCurrentPage(pageNum)}
                >
                  {pageNum}
                </button>
              );
            })}
            
            {totalPages > 5 && currentPage < totalPages - 2 && (
              <span className="ellipsis">...</span>
            )}
            
            {totalPages > 5 && currentPage < totalPages - 2 && (
              <button
                className="pagination-btn"
                onClick={() => setCurrentPage(totalPages)}
              >
                {totalPages}
              </button>
            )}
          </div>
          
          <button 
            className="pagination-btn"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
            <FiChevronRight />
          </button>
        </div>
      )}

      {/* Image Modal */}
      {selectedImage && (
        <div className="image-modal" onClick={() => setSelectedImage(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button 
              className="close-btn"
              onClick={() => setSelectedImage(null)}
            >
              &times;
            </button>
            
            <div className="modal-image-container">
              <img 
                src={selectedImage.imageUrl} 
                alt={selectedImage.title || 'Gallery image'}
              />
            </div>
            
            <div className="modal-info">
              <h2>{selectedImage.title}</h2>
              {selectedImage.description && (
                <p className="modal-description">{selectedImage.description}</p>
              )}
              <div className="modal-meta">
                <span className="category-badge">{selectedImage.category}</span>
                <span className="image-date">{formatDate(selectedImage.createdAt)}</span>
              </div>
              <div className="modal-actions">
                <button 
                  className="btn primary"
                  onClick={() => downloadImage(selectedImage.imageUrl, selectedImage.title)}
                >
                  <FiDownload />
                  Download
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;