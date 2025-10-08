import React, { useEffect, useState } from "react";
import "../../../CssFiles/Admin/product/Detail.css";
import "../../../CssFiles/Admin/product/productcommon.css";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { getUserId } from "../../../utills/authService";
import axios from "axios";
import Spinner from "../../../components/Spinner";
import Footer from "../../../components/Footer";

const Detail = () => {
  const { id } = useParams();
  const userId = getUserId();
  const navigate = useNavigate();

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Rating & Review States
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [reviewComment, setReviewComment] = useState("");
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [userHasReviewed, setUserHasReviewed] = useState(false);

  useEffect(() => {
    fetchProduct(id);
  }, [id]);

  const fetchProduct = async (id) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/products/common/${id}`
      );
      setProductData(response.data.data);
      console.log(response.data.data);
      
      
      // Check if user has already reviewed this product
      if (userId && response.data.data.reviews) {
        const userReview = response.data.data.reviews.find(
          review => review.user === userId
        );
        setUserHasReviewed(!!userReview);
        if (userReview) {
          setUserRating(userReview.rating);
          setReviewComment(userReview.comment);
        }
      }
      
      setLoading(false);
    } catch (error) {
      toast.error("Failed to load product");
      setLoading(false);
    }
  };

  // ✅ Decide which images to show
  const productImages =
    selectedVariant && selectedVariant.images?.length > 0
      ? selectedVariant.images.map((img) => img.url)
      : productData?.images?.map((img) => img.url) || [];

  const handleAddToCart = async () => {
    if (!userId) {
      toast.error("Please login to add products to cart");
      navigate("/login");
      return;
    }

    const productToAdd = {
      userId,
      productId: id,
      quantity,
      variantId: selectedVariant?._id || null,
      size: selectedVariant?._id ? null : selectedVariant?.size || null,
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/user/cart/${id}`,
        productToAdd
      );

      if (response.data.success) {
        if (selectedVariant) {
          toast.success(
            `${productData.name} (${selectedVariant.size}) added to cart!`
          );
        } else {
          toast.success(`${productData.name} added to cart!`);
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error adding to cart");
    }
  };

  // ✅ Rating & Review Functions
  const handleSubmitReview = async () => {
    if (!userId) {
      toast.error("Please login to submit a review");
      navigate("/login");
      return;
    }

    if (userRating === 0) {
      toast.error("Please select a rating");
      return;
    }

    if (!reviewComment.trim()) {
      toast.error("Please write a review comment");
      return;
    }

    setIsSubmittingReview(true);
    try {
      console.log({ rating: userRating, comment: reviewComment, userid: userId });
      
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/products/rate/${id}`,
        {
          rating: userRating,
          comment: reviewComment,
          userid: userId,
        }
      );

      if (response.data.success) {
        toast.success("Review submitted successfully!");
        setProductData(response.data.data);
        setUserHasReviewed(true);
        setShowReviewForm(false);
      }
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to submit review");
    } finally {
      setIsSubmittingReview(false);
    }
  };

  const handleEditReview = () => {
    setShowReviewForm(true);
  };

  const handleCancelReview = () => {
    setShowReviewForm(false);
    if (!userHasReviewed) {
      setUserRating(0);
      setReviewComment("");
    }
  };

  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () =>
    quantity > 1 && setQuantity((prev) => prev - 1);

  // Helper function to render star ratings
  const renderStars = (rating, interactive = false, onStarClick = null) => {
    return (
      <div className="stars-container">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`star ${interactive ? 'interactive' : ''} ${
              star <= rating ? 'filled' : ''
            }`}
            onClick={() => interactive && onStarClick && onStarClick(star)}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  if (loading) return <Spinner size="lg" />;

  return (
    <div className="product-detail-container">
      <button onClick={() => window.history.back()} className="back-button">
        ← Back to Products
      </button>

      <div className="product-detail">
        {/* ✅ Product / Variant Images */}
        <div className="product-gallery">
          <div className="main-image">
            <img src={productImages[selectedImage]} alt={productData?.name} />
          </div>
          <div className="image-thumbnails">
            {productImages?.map((img, index) => (
              <div
                key={index}
                className={`thumbnail ${
                  selectedImage === index ? "active" : ""
                }`}
                onClick={() => setSelectedImage(index)}
              >
                <img src={img} alt={`${productData.name} view ${index + 1}`} />
              </div>
            ))}
          </div>
        </div>

        {/* ✅ Product / Variant Info */}
        <div className="product-info">
          <div className="product-header">
            <h1>{productData?.name}</h1>
            
            {/* Rating Display */}
            <div className="product-rating-large">
              {renderStars(Math.floor(productData?.rating || 0))}
              <span className="rating-value">
                {productData?.rating?.toFixed(1) || '0.0'} • {productData?.numOfReviews || 0} Reviews
              </span>
            </div>

            {/* ✅ Show price (general OR variant) */}
            {selectedVariant ? (
              <div className="product-price-large">
                ₹ {(selectedVariant.price + (productData.tax || 0)).toFixed(2)}
              </div>
            ) : productData?.variants?.length > 0 ? (
              <div className="product-price-large">
                From ₹{" "}
                {Math.min(...productData.variants.map((v) => v.price)).toFixed(2)}
              </div>
            ) : (
              <div className="product-price-large">Price not available</div>
            )}
          </div>

          {/* ✅ Variant Selection */}
          {productData?.variants?.length > 0 && (
            <div className="product-variants">
              <h3>Select Variant</h3>
              <div className="variant-options">
                {productData.variants.map((variant) => (
                  <button
                    key={variant.id}
                    className={`variant-option ${
                      selectedVariant?.id === variant.id ? "active" : ""
                    }`}
                    onClick={() => {
                      setSelectedVariant(variant);
                      setSelectedImage(0);
                    }}
                  >
                    {variant.size} • ₹
                    {(variant.price.toFixed(2))}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ✅ Show selected variant details */}
          {selectedVariant ? (
            <div className="variant-details">
              <p>
                <strong>Size:</strong> {selectedVariant.size}
              </p>
              <p>
                <strong>Price:</strong> ₹{selectedVariant.price} All Included
              </p>
              <p>
                <strong>Tax:</strong> {productData.tax}%
              </p>
              <p>
                <strong>Stock:</strong>{" "}
                {selectedVariant.stock > 0
                  ? `${selectedVariant.stock} available`
                  : "Out of Stock"}
              </p>
            </div>
          ) : (
            <div className="general-product-details">
              <p>{productData?.description}</p>
              <p>
                <strong>Total Stock:</strong> {productData?.stock}
              </p>
            </div>
          )}

          {/* ✅ Quantity + Cart */}
          <div className="purchase-section">
            <div className="quantity-selector">
              <button onClick={decreaseQuantity} className="quantity-btn">
                -
              </button>
              <span className="quantity-value">{quantity}</span>
              <button onClick={increaseQuantity} className="quantity-btn">
                +
              </button>
            </div>
            <button
              onClick={handleAddToCart}
              className="add-to-cart-btn futuristic-btn primary"
              disabled={selectedVariant?.stock === 0}
            >
              {selectedVariant ? (
                selectedVariant.stock > 0 ? (
                  <>
                    Add to Cart • ₹
                    {(selectedVariant.price * quantity).toFixed(2)}
                  </>
                ) : (
                  "Out of Stock"
                )
              ) : productData?.variants?.length > 0 ? (
                <>Select a Variant</>
              ) : (
                "Unavailable"
              )}
            </button>
          </div>

          {/* ✅ Rating & Review Section */}
          <div className="review-section">
            <div className="review-header">
              <h3>Customer Reviews</h3>
              {/* {!showReviewForm && (
                <button 
                  className="review-btn futuristic-btn secondary"
                  onClick={() => setShowReviewForm(true)}
                >
                  {userHasReviewed ? 'Edit Review' : 'Write a Review'}
                </button>
              )} */}
            </div>

            {/* Review Form */}
            {/* {showReviewForm && (
              <div className="review-form">
                <h4>{userHasReviewed ? 'Edit Your Review' : 'Write Your Review'}</h4>
                <div className="rating-input">
                  <label>Your Rating:</label>
                  {renderStars(userRating, true, setUserRating)}
                  <span className="rating-text">
                    {userRating > 0 ? `${userRating} star${userRating > 1 ? 's' : ''}` : 'Select rating'}
                  </span>
                </div>
                <div className="comment-input">
                  <label>Your Review:</label>
                  <textarea
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                    placeholder="Share your experience with this product..."
                    rows="4"
                  />
                </div>
                <div className="review-actions">
                  <button
                    onClick={handleSubmitReview}
                    className="futuristic-btn primary"
                    disabled={isSubmittingReview}
                  >
                    {isSubmittingReview ? 'Submitting...' : 'Submit Review'}
                  </button>
                  <button
                    onClick={handleCancelReview}
                    className="futuristic-btn outline"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )} */}

            {/* Reviews List */}
            <div className="reviews-list">
              {productData?.reviews && productData.reviews.length > 0 ? (
                productData.reviews.map((review, index) => (
                  <div key={index} className="review-item">
                    <div className="review-header">
                      <div className="reviewer-info">
                        <strong>{review.name}</strong>
                        <div className="review-meta">
                          {renderStars(review.rating)}
                          <span className="review-date">
                            {new Date(review.createdAt || Date.now()).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      {review.user === userId && (
                        <span className="your-review-badge">Your Review</span>
                      )}
                    </div>
                    <p className="review-comment">{review.comment}</p>
                  </div>
                ))
              ) : (
                <div className="no-reviews">
                  <p>No reviews yet. Be the first to review this product!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* <Footer /> */}
    </div>
  );
};

export default Detail;