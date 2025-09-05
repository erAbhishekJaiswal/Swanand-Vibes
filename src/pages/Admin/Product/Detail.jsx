// ProductDetail.js
// import React, { useState } from 'react';
// import '../../../CssFiles/Admin/product/productcommon.css'

// const ProductDetail = () => {
//   const [selectedImage, setSelectedImage] = useState(0);
//   const [selectedVariant, setSelectedVariant] = useState(0);
//   const [quantity, setQuantity] = useState(1);
//   const [activeTab, setActiveTab] = useState('description');

//   if (!product) {
//     return (
//       <div className="product-detail-container">
//         <div className="product-not-found">
//           <h2>Product not found</h2>
//           <button onClick={onBack} className="futuristic-btn">
//             Back to Products
//           </button>
//         </div>
//       </div>
//     );
//   }

//   // Mock product images
//   const productImages = [
//     product.image,
//     "https://via.placeholder.com/600x600/1e293b/ffffff?text=Product+View+2",
//     "https://via.placeholder.com/600x600/1e293b/ffffff?text=Product+View+3",
//     "https://via.placeholder.com/600x600/1e293b/ffffff?text=Product+View+4"
//   ];

//   // Mock variants
//   const variants = [
//     { id: 1, name: "128GB", price: product.price },
//     { id: 2, name: "256GB", price: product.price + 100 },
//     { id: 3, name: "512GB", price: product.price + 200 }
//   ];

//   // Mock related products
//   const relatedProducts = [
//     {
//       id: 10,
//       name: "Wireless Charging Pad",
//       price: 79.99,
//       image: "https://via.placeholder.com/200x200/1e293b/ffffff?text=Charging+Pad"
//     },
//     {
//       id: 11,
//       name: "Smart Home Hub",
//       price: 129.99,
//       image: "https://via.placeholder.com/200x200/1e293b/ffffff?text=Home+Hub"
//     },
//     {
//       id: 12,
//       name: "Bluetooth Speaker",
//       price: 149.99,
//       image: "https://via.placeholder.com/200x200/1e293b/ffffff?text=Speaker"
//     }
//   ];

//   const handleAddToCart = () => {
//     const productToAdd = {
//       ...product,
//       variant: variants[selectedVariant],
//       quantity
//     };
//     addToCart(productToAdd);
//   };

//   const increaseQuantity = () => {
//     setQuantity(prev => prev + 1);
//   };

//   const decreaseQuantity = () => {
//     if (quantity > 1) {
//       setQuantity(prev => prev - 1);
//     }
//   };

//   return (
//     <div className="product-detail-container">
//       <button onClick={onBack} className="back-button">
//         ← Back to Products
//       </button>

//       <div className="product-detail">
//         <div className="product-gallery">
//           <div className="main-image">
//             <img src={productImages[selectedImage]} alt={product.name} />
//           </div>
//           <div className="image-thumbnails">
//             {productImages.map((img, index) => (
//               <div 
//                 key={index} 
//                 className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
//                 onClick={() => setSelectedImage(index)}
//               >
//                 <img src={img} alt={`${product.name} view ${index + 1}`} />
//               </div>
//             ))}
//           </div>
//         </div>

//         <div className="product-info">
//           <div className="product-header">
//             <h1>{product.name}</h1>
//             <div className="product-rating-large">
//               <span className="rating-stars">
//                 {'★'.repeat(Math.floor(product.rating))}
//                 {'☆'.repeat(5 - Math.floor(product.rating))}
//               </span>
//               <span className="rating-value">{product.rating} • 124 Reviews</span>
//             </div>
//             <div className="product-price-large">
//               ${variants[selectedVariant].price.toFixed(2)}
//             </div>
//           </div>

//           <div className="product-variants">
//             <h3>Select Variant</h3>
//             <div className="variant-options">
//               {variants.map((variant, index) => (
//                 <button
//                   key={variant.id}
//                   className={`variant-option ${selectedVariant === index ? 'active' : ''}`}
//                   onClick={() => setSelectedVariant(index)}
//                 >
//                   {variant.name}
//                   <span className="variant-price">+${(variant.price - product.price).toFixed(2)}</span>
//                 </button>
//               ))}
//             </div>
//           </div>

//           <div className="product-description-short">
//             <p>{product.description}</p>
//           </div>

//           <div className="purchase-section">
//             <div className="quantity-selector">
//               <button onClick={decreaseQuantity} className="quantity-btn">-</button>
//               <span className="quantity-value">{quantity}</span>
//               <button onClick={increaseQuantity} className="quantity-btn">+</button>
//             </div>
//             <button onClick={handleAddToCart} className="add-to-cart-btn futuristic-btn primary">
//               Add to Cart • ${(variants[selectedVariant].price * quantity).toFixed(2)}
//             </button>
//           </div>

//           <div className="product-features">
//             <div className="feature">
//               <span className="feature-icon">🚚</span>
//               <div className="feature-text">
//                 <h4>Free Shipping</h4>
//                 <p>On orders over $50</p>
//               </div>
//             </div>
//             <div className="feature">
//               <span className="feature-icon">↩️</span>
//               <div className="feature-text">
//                 <h4>30-Day Returns</h4>
//                 <p>No questions asked</p>
//               </div>
//             </div>
//             <div className="feature">
//               <span className="feature-icon">🔒</span>
//               <div className="feature-text">
//                 <h4>2-Year Warranty</h4>
//                 <p>Covered for defects</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="product-details-tabs">
//         <div className="tabs-header">
//           <button 
//             className={`tab-button ${activeTab === 'description' ? 'active' : ''}`}
//             onClick={() => setActiveTab('description')}
//           >
//             Description
//           </button>
//           <button 
//             className={`tab-button ${activeTab === 'specs' ? 'active' : ''}`}
//             onClick={() => setActiveTab('specs')}
//           >
//             Specifications
//           </button>
//           <button 
//             className={`tab-button ${activeTab === 'reviews' ? 'active' : ''}`}
//             onClick={() => setActiveTab('reviews')}
//           >
//             Reviews (124)
//           </button>
//         </div>

//         <div className="tab-content">
//           {activeTab === 'description' && (
//             <div className="description-content">
//               <h3>About this product</h3>
//               <p>Experience the future with our cutting-edge {product.name}. Designed with precision engineering and the latest technology, this product will transform how you interact with the digital world.</p>
//               <ul>
//                 <li>Advanced AI-powered features for seamless operation</li>
//                 <li>Sleek, futuristic design that stands out from the crowd</li>
//                 <li>Eco-friendly materials and energy-efficient performance</li>
//                 <li>Compatible with all major platforms and devices</li>
//                 <li>Regular firmware updates with new features</li>
//               </ul>
//             </div>
//           )}

//           {activeTab === 'specs' && (
//             <div className="specs-content">
//               <h3>Technical Specifications</h3>
//               <div className="specs-table">
//                 <div className="spec-row">
//                   <span className="spec-name">Dimensions</span>
//                   <span className="spec-value">6.3" x 3.1" x 0.3"</span>
//                 </div>
//                 <div className="spec-row">
//                   <span className="spec-name">Weight</span>
//                   <span className="spec-value">189g</span>
//                 </div>
//                 <div className="spec-row">
//                   <span className="spec-name">Display</span>
//                   <span className="spec-value">6.7" OLED, 120Hz</span>
//                 </div>
//                 <div className="spec-row">
//                   <span className="spec-name">Battery</span>
//                   <span className="spec-value">4500mAh, all-day life</span>
//                 </div>
//                 <div className="spec-row">
//                   <span className="spec-name">Connectivity</span>
//                   <span className="spec-value">5G, Wi-Fi 6E, Bluetooth 5.3</span>
//                 </div>
//               </div>
//             </div>
//           )}

//           {activeTab === 'reviews' && (
//             <div className="reviews-content">
//               <h3>Customer Reviews</h3>
//               <div className="review-summary">
//                 <div className="overall-rating">
//                   <span className="rating-large">{product.rating}</span>
//                   <span className="rating-stars-large">
//                     {'★'.repeat(Math.floor(product.rating))}
//                     {'☆'.repeat(5 - Math.floor(product.rating))}
//                   </span>
//                   <p>Based on 124 reviews</p>
//                 </div>
//                 <div className="rating-bars">
//                   {[5, 4, 3, 2, 1].map(stars => (
//                     <div key={stars} className="rating-bar">
//                       <span className="stars">{stars}★</span>
//                       <div className="bar-container">
//                         <div 
//                           className="bar-fill" 
//                           style={{ width: `${(5 - stars) * 20 + 20}%` }}
//                         ></div>
//                       </div>
//                       <span className="percentage">{(5 - stars) * 20 + 20}%</span>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       <div className="related-products">
//         <h2>You might also like</h2>
//         <div className="related-products-grid">
//           {relatedProducts.map(relatedProduct => (
//             <div key={relatedProduct.id} className="related-product-card">
//               <img src={relatedProduct.image} alt={relatedProduct.name} />
//               <h4>{relatedProduct.name}</h4>
//               <p>${relatedProduct.price.toFixed(2)}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductDetail;










// ProductDetail.js
import React, { useEffect, useState } from 'react';
import '../../../CssFiles/Admin/product/productcommon.css'
import {useParams} from 'react-router-dom';
import axios from 'axios';
// import { addToCart } from '../../../store/cartSlice';
import {getProductById} from '../../../utills/apicall';
import Spinner from '../../../components/Spinner';

const Detail = () => {
  const { id } = useParams();

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProduct(id);
  }, [id]);

  const fetchProduct = async (id) => {
    setLoading(true);
    try {
      const response = await getProductById(id);
      setProductData(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.error("Error fetching product:", error);
    } finally {
      setLoading(false);
    }
  };

  const productImages = productData?.images.map((image) => image.url) || [];



// Mock product data
const product = {
  id: 1,
  name: "Futuristic SmartPhone X12",
  description: "A next-gen smartphone with AI-powered features, sleek design, and unmatched performance.",
  price: 999.99,
  rating: 4.5,
};



// Mock related products
const relatedProducts = [
  {
    id: 101,
    name: "SmartWatch Pro 5",
    price: 299.99,
    image: "https://images.pexels.com/photos/3907507/pexels-photo-3907507.jpeg?_gl=1*144obys*_ga*NDI5NDQ1ODc2LjE3NTYzODM2OTM.*_ga_8JE65Q40S6*czE3NTY0NDcyMDckbzIkZzEkdDE3NTY0NDgwNTMkajUwJGwwJGgw",
  },
  {
    id: 102,
    name: "Wireless Earbuds X",
    price: 149.99,
    image: "https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?_gl=1*1txyc8c*_ga*NDI5NDQ1ODc2LjE3NTYzODM2OTM.*_ga_8JE65Q40S6*czE3NTY0NDcyMDckbzIkZzEkdDE3NTY0NDcyMTYkajUxJGwwJGgw",
  },
  {
    id: 103,
    name: "Fast Charger 65W",
    price: 49.99,
    image: "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?_gl=1*ykgxgc*_ga*NDI5NDQ1ODc2LjE3NTYzODM2OTM.*_ga_8JE65Q40S6*czE3NTY0NDcyMDckbzIkZzEkdDE3NTY0NDc5OTYkajQwJGwwJGgw",
  },
];


  const handleAddToCart = () => {
    const productToAdd = {
      ...product,
      variant: variants[selectedVariant],
      quantity
    };
    addToCart(productToAdd);
  };

  const increaseQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const onBack = () => {
    // Handle back navigation
    window.history.back();
  };
  if (loading) {
    return <Spinner size="lg" />;
  }

  return (
    <div className="product-detail-container">
      <button onClick={onBack} className="back-button">
        ← Back to Products
      </button>

      <div className="product-detail">
        <div className="product-gallery">
          <div className="main-image">
            <img src={productImages[selectedImage]} alt={product.name} />
          </div>
          <div className="image-thumbnails">
            {productImages.map((img, index) => (
              <div 
                key={index} 
                className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                onClick={() => setSelectedImage(index)}
              >
                <img src={img} alt={`${product.name} view ${index + 1}`} />
              </div>
            ))}
          </div>
        </div>

        <div className="product-info">
          <div className="product-header">
            <h1>{productData?.name}</h1>
            <div className="product-rating-large">
              <span className="rating-stars">
                {'★'.repeat(Math.floor(productData?.rating))}
                {'☆'.repeat(5 - Math.floor(productData?.rating))}
              </span>
              <span className="rating-value">{productData?.rating} • 524 Reviews</span>
            </div>
            <div className="product-price-large">
              ₹ {productData?.price}
              {/* ₹{variants[selectedVariant].price.toFixed(2)} */}
            </div>
          </div>

          <div className="product-description-short">
            <p>{productData?.description}</p>
          </div>

          {/* <div className="purchase-section">
            <div className="quantity-selector">
              <button onClick={decreaseQuantity} className="quantity-btn">-</button>
              <span className="quantity-value">{quantity}</span>
              <button onClick={increaseQuantity} className="quantity-btn">+</button>
            </div>
            <button onClick={handleAddToCart} className="add-to-cart-btn futuristic-btn primary">
              Add to Cart • ₹ {(productData?.price* quantity).toFixed(2)}
            </button>
          </div> */}
        </div>
      </div>

      <div className="related-products">
        <h2>You might also like</h2>
        <div className="related-products-grid">
          {relatedProducts.map(relatedProduct => (
            <div key={relatedProduct.id} className="related-product-card">
              <img src={relatedProduct.image} alt={relatedProduct.name} />
              <h4>{relatedProduct.name}</h4>
              <p>${relatedProduct.price.toFixed(2)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Detail;