import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import "../../../CssFiles/Admin/Gift/GiftList.css";
import { useNavigate } from 'react-router-dom';
import Spinner from '../../../components/Spinner';

const GiftList = () => {
  const navigate = useNavigate();
  const [gifts, setGifts] = useState([]);
  const [filteredGifts, setFilteredGifts] = useState([]);
  const [achievementLevels, setAchievementLevels] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [editingGift, setEditingGift] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    fetchGifts();
  }, []);

  useEffect(() => {
    filterGifts();
  }, [gifts, selectedLevel, searchTerm]);

  const fetchGifts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/gift/`);
      setGifts(response.data);
      
      const uniqueLevels = [...new Set(response.data.map(gift => gift.achievementLevel))];
      setAchievementLevels(uniqueLevels);
    } catch (error) {
      toast.error('Failed to fetch gifts');
      console.error('Error fetching gifts:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterGifts = () => {
    let filtered = gifts;

    // Filter by achievement level
    if (selectedLevel !== 'all') {
      filtered = filtered.filter(gift => gift.achievementLevel === selectedLevel);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(gift =>
        gift.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        gift.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredGifts(filtered);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this gift?')) return;

    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/gift/${id}`);
      toast.success('Gift deleted successfully');
      fetchGifts();
    } catch (error) {
      toast.error('Failed to delete gift');
      console.error('Error deleting gift:', error);
    }
  };

  const handleEdit = (gift) => {
    setEditingGift({ 
      ...gift,
      validity: gift.validity ? gift.validity.split('T')[0] : '' // Format date for input
    });
    setShowEditModal(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = editingGift.imageUrl;

      // If new image selected, upload to Cloudinary
      if (editingGift.newImage) {
        const sigRes = await axios.get(`${import.meta.env.VITE_API_URL}/products/signature`);
        const { timestamp, signature, cloudName, apiKey } = sigRes.data;

        const data = new FormData();
        data.append("file", editingGift.newImage);
        data.append("api_key", apiKey);
        data.append("timestamp", timestamp);
        data.append("signature", signature);

        const uploadRes = await axios.post(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          data
        );

        imageUrl = uploadRes.data.secure_url;
      }

      // Update gift in database
      await axios.put(`h${import.meta.env.VITE_API_URL}/gift/${editingGift._id}`, {
        title: editingGift.title,
        description: editingGift.description,
        achievementLevel: editingGift.achievementLevel,
        validity: editingGift.validity,
        imageUrl
      });

      toast.success('Gift updated successfully');
      setShowEditModal(false);
      setEditingGift(null);
      fetchGifts();
    } catch (error) {
      toast.error('Failed to update gift');
      console.error('Error updating gift:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEditingGift({
        ...editingGift,
        newImage: file,
        imagePreview: URL.createObjectURL(file)
      });
    }
  };

  const handleNewGift = () => {
    navigate('/admin/giftupload');
  };

  const getLevelBadgeClass = (level) => {
    switch (level) {
      case 'Bronze': return 'gift-level-bronze';
      case 'Silver': return 'gift-level-silver';
      case 'Gold': return 'gift-level-gold';
      case 'Platinum': return 'gift-level-platinum';
      default: return 'gift-level-default';
    }
  };

  const isExpired = (validityDate) => {
    return new Date(validityDate) < new Date();
  };

  if (loading) {
    return (
      <Spinner size='lg'/>
      // <div className="gift-loading">
      //   <div className="gift-spinner"></div>
      //   <p>Loading gifts...</p>
      // </div>
    );
  }

  return (
    <div className="gift-container">
      <div className='gift-header-main'>
        <h1>Gifts & Offers</h1>
        <div className='gift-add-section'>
          <button onClick={handleNewGift} className='gift-add-btn'>Add New Gift</button>
        </div>
      </div>
      
      <div className="gift-controls">
        <div className="gift-search-box">
          <input
            type="text"
            placeholder="🔍 Search gifts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="gift-search-input"
          />
        </div>

        <select
          value={selectedLevel}
          onChange={(e) => setSelectedLevel(e.target.value)}
          className="gift-level-filter"
        >
          <option value="all">All Levels</option>
          {achievementLevels.map(level => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </select>
      </div>

      <div className="gift-stats">
        <p>Showing {filteredGifts.length} of {gifts.length} gifts</p>
      </div>

      {filteredGifts.length === 0 ? (
        <div className="gift-no-items">
          <p>No gifts found matching your criteria.</p>
        </div>
      ) : (
        <div className="gift-grid">
          {filteredGifts.map(gift => (
            <div key={gift._id} className="gift-items">
              <div className="gift-image-container">
                <img src={gift.imageUrl} alt={gift.title} loading="lazy" />
                {isExpired(gift.validity) && (
                  <div className="gift-expired-badge">Expired</div>
                )}
                <div className="gift-image-overlay">
                  <button 
                    className="gift-btn-edit"
                    onClick={() => handleEdit(gift)}
                  >
                    Edit
                  </button>
                  <button 
                    className="gift-btn-delete"
                    onClick={() => handleDelete(gift._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
              
              <div className="gift-info">
                <h3 className="gift-title">{gift.title}</h3>
                <p className="gift-description">{gift.description}</p>
                
                <div className="gift-meta">
                  <span className={`gift-level ${getLevelBadgeClass(gift.achievementLevel)}`}>
                    {gift.achievementLevel}
                  </span>
                  
                  <div className="gift-validity">
                    <span className="validity-label">Valid until:</span>
                    <span className={`validity-date ${isExpired(gift.validity) ? 'expired' : ''}`}>
                      {new Date(gift.validity).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                
                <div className="gift-date">
                  Added: {new Date(gift.createdAt).toLocaleDateString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showEditModal && editingGift && (
        <div className="gift-modal-overlay">
          <div className="gift-modal-content">
            <div className="gift-modal-header">
              <h2>Edit Gift</h2>
              <button 
                className="gift-modal-close"
                onClick={() => setShowEditModal(false)}
              >
                ×
              </button>
            </div>

            <form onSubmit={handleUpdate} className="gift-edit-form">
              <div className="gift-form-group">
                <label htmlFor="title">Title *</label>
                <input
                  type="text"
                  id="title"
                  value={editingGift.title}
                  onChange={(e) => setEditingGift({
                    ...editingGift,
                    title: e.target.value
                  })}
                  required
                />
              </div>

              <div className="gift-form-group">
                <label htmlFor="description">Description *</label>
                <textarea
                  id="description"
                  value={editingGift.description}
                  onChange={(e) => setEditingGift({
                    ...editingGift,
                    description: e.target.value
                  })}
                  rows="3"
                  required
                />
              </div>

              <div className="gift-form-group">
                <label htmlFor="achievementLevel">Achievement Level *</label>
                <select
                  id="achievementLevel"
                  value={editingGift.achievementLevel}
                  onChange={(e) => setEditingGift({
                    ...editingGift,
                    achievementLevel: e.target.value
                  })}
                  required
                >
                  <option value="">Select Level</option>
                  <option value="Bronze">Bronze</option>
                  <option value="Silver">Silver</option>
                  <option value="Gold">Gold</option>
                  <option value="Platinum">Platinum</option>
                </select>
              </div>

              <div className="gift-form-group">
                <label htmlFor="validity">Validity Date *</label>
                <input
                  type="date"
                  id="validity"
                  value={editingGift.validity}
                  onChange={(e) => setEditingGift({
                    ...editingGift,
                    validity: e.target.value
                  })}
                  required
                />
              </div>

              <div className="gift-form-group">
                <label htmlFor="image">Replace Image (Optional)</label>
                <input
                  type="file"
                  id="image"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                {editingGift.imagePreview && (
                  <div className="gift-image-preview">
                    <img src={editingGift.imagePreview} alt="Preview" />
                  </div>
                )}
              </div>

              <div className="gift-form-actions">
                <button 
                  type="button" 
                  className="gift-btn-cancel"
                  onClick={() => setShowEditModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="gift-btn-save">
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

export default GiftList;