// ProductDetail.js
// import React, { useEffect, useState } from 'react';
// import '../../CssFiles/Admin/product/productcommon.css'
// import {useParams} from 'react-router-dom';
// import axios from 'axios';
// import {getCommonProductById , addToCart} from '../../utills/apicall';
// import Spinner from '../../components/Spinner';
// import {toast} from 'react-hot-toast';
// import { getUserId } from '../../utills/authService';

// const ProductDetail = () => {
//   const { id } = useParams();
//   // console.log(id);
//   const userid = getUserId();
  
//   const [selectedImage, setSelectedImage] = useState(0);
//   const [selectedVariant, setSelectedVariant] = useState(0);
//   const [quantity, setQuantity] = useState(1);
//   const [activeTab, setActiveTab] = useState('description');
//   const [productData, setProductData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchProduct(id);
//   }, [id]);

//   const fetchProduct = async (id) => {
//     setLoading(true);
//     // Simulate an API call to fetch product details
//     const response = await getCommonProductById(id)
//     // axios.get(`https://swanand-vibes-backend.vercel.app/api/products/common/${id}`);
//     setProductData(response.data.data);
//     // console.log(response.data.data);
//     setLoading(false);
//   };

//   const productImages = productData?.images.map((image) => image.url) || [];

// //   if (product) {
// //     return (
// //       <div className="product-detail-container">
// //         <div className="product-not-found">
// //           <h2>Product not found</h2>
// //           <button onClick={onBack} className="futuristic-btn">
// //             Back to Products
// //           </button>
// //         </div>
// //       </div>
// //     );
// //   }

// //   // Mock product images
// //   const productImages = [
// //     product.image,
// //     "https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?_gl=1*1txyc8c*_ga*NDI5NDQ1ODc2LjE3NTYzODM2OTM.*_ga_8JE65Q40S6*czE3NTY0NDcyMDckbzIkZzEkdDE3NTY0NDcyMTYkajUxJGwwJGgw",
// //     "https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?_gl=1*1txyc8c*_ga*NDI5NDQ1ODc2LjE3NTYzODM2OTM.*_ga_8JE65Q40S6*czE3NTY0NDcyMDckbzIkZzEkdDE3NTY0NDcyMTYkajUxJGwwJGgw",
// //     "https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?_gl=1*1txyc8c*_ga*NDI5NDQ1ODc2LjE3NTYzODM2OTM.*_ga_8JE65Q40S6*czE3NTY0NDcyMDckbzIkZzEkdDE3NTY0NDcyMTYkajUxJGwwJGgw"
// //   ];

// //   // Mock variants
// //   const variants = [
// //     { id: 1, name: "128GB", price: product.price },
// //     { id: 2, name: "256GB", price: product.price + 100 },
// //     { id: 3, name: "512GB", price: product.price + 200 }
// //   ];

// //   // Mock related products
// //   const relatedProducts = [
// //     {
// //       id: 10,
// //       name: "Wireless Charging Pad",
// //       price: 79.99,
// //       image: "https://via.placeholder.com/200x200/1e293b/ffffff?text=Charging+Pad"
// //     },
// //     {
// //       id: 11,
// //       name: "Smart Home Hub",
// //       price: 129.99,
// //       image: "https://via.placeholder.com/200x200/1e293b/ffffff?text=Home+Hub"
// //     },
// //     {
// //       id: 12,
// //       name: "Bluetooth Speaker",
// //       price: 149.99,
// //       image: "https://via.placeholder.com/200x200/1e293b/ffffff?text=Speaker"
// //     }
// //   ];

// // Mock product data
// // const product = {
// //   id: 1,
// //   name: "Futuristic SmartPhone X12",
// //   description: "A next-gen smartphone with AI-powered features, sleek design, and unmatched performance.",
// //   price: 999.99,
// //   rating: 4.5,
// // };

// // Mock product images
// // const productImages = [
// //   "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?_gl=1*ykgxgc*_ga*NDI5NDQ1ODc2LjE3NTYzODM2OTM.*_ga_8JE65Q40S6*czE3NTY0NDcyMDckbzIkZzEkdDE3NTY0NDc5OTYkajQwJGwwJGgw",
// //   "https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?_gl=1*1txyc8c*_ga*NDI5NDQ1ODc2LjE3NTYzODM2OTM.*_ga_8JE65Q40S6*czE3NTY0NDcyMDckbzIkZzEkdDE3NTY0NDcyMTYkajUxJGwwJGgw",
// //   "https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?_gl=1*1txyc8c*_ga*NDI5NDQ1ODc2LjE3NTYzODM2OTM.*_ga_8JE65Q40S6*czE3NTY0NDcyMDckbzIkZzEkdDE3NTY0NDcyMTYkajUxJGwwJGgw",
// //   "https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?_gl=1*1txyc8c*_ga*NDI5NDQ1ODc2LjE3NTYzODM2OTM.*_ga_8JE65Q40S6*czE3NTY0NDcyMDckbzIkZzEkdDE3NTY0NDcyMTYkajUxJGwwJGgw",
// // ];

// // Mock product variants
// // const variants = [
// //   { id: 1, name: "128GB - Black", price: 999.99 },
// //   { id: 2, name: "256GB - Silver", price: 1099.99 },
// //   { id: 3, name: "512GB - Gold", price: 1299.99 },
// // ];

// // Mock related products
// const relatedProducts = [
//   {
//     id: 101,
//     name: "SmartWatch Pro 5",
//     price: 299.99,
//     image: "https://images.pexels.com/photos/3907507/pexels-photo-3907507.jpeg?_gl=1*144obys*_ga*NDI5NDQ1ODc2LjE3NTYzODM2OTM.*_ga_8JE65Q40S6*czE3NTY0NDcyMDckbzIkZzEkdDE3NTY0NDgwNTMkajUwJGwwJGgw",
//   },
//   {
//     id: 102,
//     name: "Wireless Earbuds X",
//     price: 149.99,
//     image: "https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?_gl=1*1txyc8c*_ga*NDI5NDQ1ODc2LjE3NTYzODM2OTM.*_ga_8JE65Q40S6*czE3NTY0NDcyMDckbzIkZzEkdDE3NTY0NDcyMTYkajUxJGwwJGgw",
//   },
//   {
//     id: 103,
//     name: "Fast Charger 65W",
//     price: 49.99,
//     image: "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?_gl=1*ykgxgc*_ga*NDI5NDQ1ODc2LjE3NTYzODM2OTM.*_ga_8JE65Q40S6*czE3NTY0NDcyMDckbzIkZzEkdDE3NTY0NDc5OTYkajQwJGwwJGgw",
//   },
// ];

//   const handleAddToCart = () => {
//     const productToAdd = {
//       // ...product,
//       // variant: variants[selectedVariant],
//       quantity,
//       id,
//       userId: userid
//     };
//     try {
//       // console.log(productToAdd);
//        addToCart(productToAdd);
//     toast.success(`${productData.name} added to cart!`);
//     } catch (error) {
//       toast.error(error.message);
//       // console.log(error);
//     }
   
//   };

//   const increaseQuantity = () => {
//     setQuantity(prev => prev + 1);
//   };

//   const decreaseQuantity = () => {
//     if (quantity > 1) {
//       setQuantity(prev => prev - 1);
//     }
//   };

//   const onBack = () => {
//     // Handle back navigation
//     window.history.back();
//   };

//   if (loading) return <Spinner size="lg" />;

//   return (
//     <div className="product-detail-container">
//       <button onClick={onBack} className="back-button">
//         ← Back to Products
//       </button>

//       <div className="product-detail">
//         <div className="product-gallery">
//           <div className="main-image">
//             <img src={productImages[selectedImage]} alt={productData?.name} />
//           </div>
//           <div className="image-thumbnails">
//             {productImages?.map((img, index) => (
//               <div 
//                 key={index} 
//                 className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
//                 onClick={() => setSelectedImage(index)}
//               >
//                 <img src={img} alt={`${productData.name} view ${index + 1}`} />
//               </div>
//             ))}
//           </div>
//         </div>

//         <div className="product-info">
//           <div className="product-header">
//             <h1>{productData?.name}</h1>
//             <div className="product-rating-large">
//               <span className="rating-stars">
//                 {'★'.repeat(Math.floor(productData?.rating))}
//                 {'☆'.repeat(5 - Math.floor(productData?.rating))}
//               </span>
//               <span className="rating-value">{productData?.rating} • 524 Reviews</span>
//             </div>
//             <div className="product-price-large">
//               ₹ {productData?.price}
//               {/* ₹{variants[selectedVariant].price.toFixed(2)} */}
//             </div>
//           </div>

//           {/* <div className="product-variants">
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
//           </div> */}

//           <div className="product-description-short">
//             <p>{productData?.description}</p>
//           </div>

//           <div className="purchase-section">
//             <div className="quantity-selector">
//               <button onClick={decreaseQuantity} className="quantity-btn">-</button>
//               <span className="quantity-value">{quantity}</span>
//               <button onClick={increaseQuantity} className="quantity-btn">+</button>
//             </div>
//             <button onClick={handleAddToCart} className="add-to-cart-btn futuristic-btn primary">
//               Add to Cart • ₹ {(productData?.price* quantity).toFixed(2)}
//               {/* Add to Cart • ₹{(variants[selectedVariant]?.price * quantity).toFixed(2)} */}
//             </button>
//           </div>

//           {/* <div className="product-features">
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
//           </div> */}
//         </div>
//       </div>

//       {/* <div className="product-details-tabs">
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
//               <p>Experience the future with our cutting-edge {productData?.name}. Designed with precision engineering and the latest technology, this product will transform how you interact with the digital world.</p>
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
//                   <span className="rating-large">{productData.rating}</span>
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
//       </div> */}

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

















// import React, { useEffect, useState } from 'react';
// import '../../CssFiles/Admin/product/productcommon.css';
// import { useParams } from 'react-router-dom';
// import { getCommonProductById, addToCart } from '../../utills/apicall';
// import Spinner from '../../components/Spinner';
// import { toast } from 'react-hot-toast';
// import { getUserId } from '../../utills/authService';
// import axios from 'axios';

// const ProductDetail = () => {
//   const { id } = useParams();
//   const userId = getUserId();

//   const [selectedImage, setSelectedImage] = useState(0);
//   const [selectedVariant, setSelectedVariant] = useState(null);
//   const [quantity, setQuantity] = useState(1);
//   const [productData, setProductData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchProduct(id);
//   }, [id]);

//   const fetchProduct = async (id) => {
//     setLoading(true);
//     // const response = await getCommonProductById(id);
//     const response = await axios.get(`http://localhost:5000/api/products/${id}`);
//     setProductData(response.data.data);
//     // console.log(response.data);

//     // Auto-select first variant if exists
//     if (response.data.data.variants?.length > 0) {
//       setSelectedVariant(response.data.data.variants[0]);
//     }
//     setLoading(false);
//   };

//   // ✅ Get images (variant images > fallback to main images)
//   const productImages =
//     selectedVariant?.images?.length > 0
//       ? selectedVariant.images.map((img) => img.url)
//       : productData?.images?.map((img) => img.url) || [];

//   const handleAddToCart = () => {
//     if (!selectedVariant) {
//       toast.error("Please select a variant");
//       return;
//     }

//     const productToAdd = {
//       productId: id,
//       userId,
//       variantId: selectedVariant._id,
//       quantity,
//     };

//     try {
//       addToCart(productToAdd);
//       toast.success(`${productData.name} (${selectedVariant.size}) added to cart!`);
//     } catch (error) {
//       toast.error(error.message);
//       // console.log(error);
//     }
//   };

//   const increaseQuantity = () => setQuantity((prev) => prev + 1);
//   const decreaseQuantity = () => quantity > 1 && setQuantity((prev) => prev - 1);

//   if (loading) return <Spinner size="lg" />;

//   return (
//     <div className="product-detail-container">
//       <button onClick={() => window.history.back()} className="back-button">
//         ← Back to Products
//       </button>

//       <div className="product-detail">
//         {/* ✅ Product Images */}
//         <div className="product-gallery">
//           <div className="main-image">
//             <img src={productImages[selectedImage]} alt={productData?.name} />
//           </div>
//           <div className="image-thumbnails">
//             {productImages?.map((img, index) => (
//               <div
//                 key={index}
//                 className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
//                 onClick={() => setSelectedImage(index)}
//               >
//                 <img src={img} alt={`${productData.name} view ${index + 1}`} />
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* ✅ Product Info */}
//         <div className="product-info">
//           <div className="product-header">
//             <h1>{productData?.name}</h1>
//             <div className="product-rating-large">
//               <span className="rating-stars">
//                 {'★'.repeat(Math.floor(productData?.ratings || 0))}
//                 {'☆'.repeat(5 - Math.floor(productData?.ratings || 0))}
//               </span>
//               <span className="rating-value">
//                 {productData?.ratings} • {productData?.numOfReviews} Reviews
//               </span>
//             </div>

//             {/* ✅ Show variant price + tax */}
//             {selectedVariant ? (
//               <div className="product-price-large">
//                 ₹ {(selectedVariant.price + (selectedVariant.tax || 0)).toFixed(2)}
//               </div>
//             ) : (
//               <div className="product-price-large">₹ {productData?.price}</div>
//             )}
//           </div>

//           {/* ✅ Variants */}
//           {productData?.variants?.length > 0 && (
//             <div className="product-variants">
//               <h3>Select Variant</h3>
//               <div className="variant-options">
//                 {productData.variants.map((variant) => (
//                   <button
//                     key={variant._id}
//                     className={`variant-option ${
//                       selectedVariant?._id === variant._id ? 'active' : ''
//                     }`}
//                     onClick={() => {
//                       setSelectedVariant(variant);
//                       setSelectedImage(0);
//                     }}
//                   >
//                     {variant.size} • ₹{(variant.price + (variant.tax || 0)).toFixed(2)}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* ✅ Description */}
//           <div className="product-description-short">
//             <p>{productData?.description}</p>
//           </div>

//           {/* ✅ Quantity + Cart */}
//           <div className="purchase-section">
//             <div className="quantity-selector">
//               <button onClick={decreaseQuantity} className="quantity-btn">-</button>
//               <span className="quantity-value">{quantity}</span>
//               <button onClick={increaseQuantity} className="quantity-btn">+</button>
//             </div>
//             <button
//               onClick={handleAddToCart}
//               className="add-to-cart-btn futuristic-btn primary"
//             >
//               Add to Cart • ₹
//               {(
//                 (selectedVariant
//                   ? selectedVariant.price + (selectedVariant.tax || 0)
//                   : productData?.price) * quantity
//               ).toFixed(2)}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductDetail;

















// import React, { useEffect, useState } from 'react';
// import '../../CssFiles/Admin/product/productcommon.css';
// import { useParams } from 'react-router-dom';
// import { getCommonProductById, addToCart } from '../../utills/apicall';
// import Spinner from '../../components/Spinner';
// import { toast } from 'react-hot-toast';
// import { getUserId } from '../../utills/authService';
// import axios from 'axios';

// const ProductDetail = () => {
//   const { id } = useParams();
//   const userId = getUserId();

//   const [selectedImage, setSelectedImage] = useState(0);
//   const [selectedVariant, setSelectedVariant] = useState(null);
//   const [quantity, setQuantity] = useState(1);
//   const [productData, setProductData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchProduct(id);
//   }, [id]);

//   const fetchProduct = async (id) => {
//     setLoading(true);
//     // const response = await getCommonProductById(id);
//     const response = await axios.get(`http://localhost:5000/api/products/${id}`);
//     setProductData(response.data.data);

//     // console.log(response.data.data);
    
//     // Auto-select first variant if exists
//     if (response.data.data.variants?.length > 0) {
//       setSelectedVariant(response.data.data.variants[0]);
//     }
//     setLoading(false);
//   };

//   // ✅ Decide images (variant > fallback product)
//   const productImages =
//     selectedVariant?.images?.length > 0
//       ? selectedVariant.images.map((img) => img.url)
//       : productData?.images?.map((img) => img.url) || [];

//   const handleAddToCart = () => {
//     if (!selectedVariant) {
//       toast.error("Please select a variant");
//       return;
//     }

//     const productToAdd = {
//       productId: id,
//       userId,
//       variantId: selectedVariant._id,
//       quantity,
//     };

//     try {
//       addToCart(productToAdd);
//       toast.success(`${productData.name} (${selectedVariant.size}) added to cart!`);
//     } catch (error) {
//       toast.error(error.message);
//       // console.log(error);
//     }
//   };

//   const increaseQuantity = () => setQuantity((prev) => prev + 1);
//   const decreaseQuantity = () => quantity > 1 && setQuantity((prev) => prev - 1);

//   if (loading) return <Spinner size="lg" />;

//   return (
//     <div className="product-detail-container">
//       <button onClick={() => window.history.back()} className="back-button">
//         ← Back to Products
//       </button>

//       <div className="product-detail">
//         {/* ✅ Product / Variant Images */}
//         <div className="product-gallery">
//           <div className="main-image">
//             <img src={productImages[selectedImage]} alt={productData?.name} />
//           </div>
//           <div className="image-thumbnails">
//             {productImages?.map((img, index) => (
//               <div
//                 key={index}
//                 className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
//                 onClick={() => setSelectedImage(index)}
//               >
//                 <img src={img} alt={`${productData.name} view ${index + 1}`} />
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* ✅ Product / Variant Info */}
//         <div className="product-info">
//           <div className="product-header">
//             <h1>{productData?.name}</h1>
//             <div className="product-rating-large">
//               <span className="rating-stars">
//                 {'★'.repeat(Math.floor(productData?.ratings || 0))}
//                 {'☆'.repeat(5 - Math.floor(productData?.ratings || 0))}
//               </span>
//               <span className="rating-value">
//                 {productData?.ratings} • {productData?.numOfReviews} Reviews
//               </span>
//             </div>

//             {/* ✅ Variant price + tax */}
//             {selectedVariant ? (
//               <div className="product-price-large">
//                 ₹ {(selectedVariant.price + (selectedVariant.tax || 0)).toFixed(2)}
//               </div>
//             ) : (
//               <div className="product-price-large">₹ {productData?.price}</div>
//             )}
//           </div>

//           {/* ✅ Variant Selection */}
//           {productData?.variants?.length > 0 && (
//             <div className="product-variants">
//               <h3>Select Variant</h3>
//               <div className="variant-options">
//                 {productData.variants.map((variant) => (
//                   <button
//                     key={variant._id}
//                     className={`variant-option ${
//                       selectedVariant?._id === variant._id ? 'active' : ''
//                     }`}
//                     onClick={() => {
//                       setSelectedVariant(variant);
//                       setSelectedImage(0);
//                     }}
//                   >
//                     {variant.size} • ₹{(variant.price + (variant.tax || 0)).toFixed(2)}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* ✅ Show selected variant details */}
//           {selectedVariant && (
//             <div className="variant-details">
//               <p><strong>Size:</strong> {selectedVariant.size}</p>
//               <p><strong>Price:</strong> ₹{selectedVariant.price}</p>
//               <p><strong>Tax:</strong> ₹{selectedVariant.tax}</p>
//               <p>
//                 <strong>Stock:</strong>{" "}
//                 {selectedVariant.stock > 0 ? `${selectedVariant.stock} available` : "Out of Stock"}
//               </p>
//             </div>
//           )}

//           {/* ✅ General Description */}
//           <div className="product-description-short">
//             <p>{productData?.description}</p>
//           </div>

//           {/* ✅ Quantity + Cart */}
//           <div className="purchase-section">
//             <div className="quantity-selector">
//               <button onClick={decreaseQuantity} className="quantity-btn">-</button>
//               <span className="quantity-value">{quantity}</span>
//               <button onClick={increaseQuantity} className="quantity-btn">+</button>
//             </div>
//             <button
//               onClick={handleAddToCart}
//               className="add-to-cart-btn futuristic-btn primary"
//               disabled={selectedVariant?.stock <= 0}
//             >
//               {selectedVariant?.stock > 0 ? (
//                 <>Add to Cart • ₹
//                   {(
//                     (selectedVariant.price + (selectedVariant.tax || 0)) * quantity
//                   ).toFixed(2)}
//                 </>
//               ) : (
//                 "Out of Stock"
//               )}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductDetail;












// 19-9-25

// import React, { useEffect, useState } from 'react';
// import '../../CssFiles/Admin/product/productcommon.css';
// import { useParams } from 'react-router-dom';
// import { getCommonProductById, addToCart } from '../../utills/apicall';
// import Spinner from '../../components/Spinner';
// import { toast } from 'react-hot-toast';
// import { getUserId } from '../../utills/authService';
// import axios from 'axios';

// const ProductDetail = () => {
//   const { id } = useParams();
//   const userId = getUserId();

//   const [selectedImage, setSelectedImage] = useState(0);
//   const [selectedVariant, setSelectedVariant] = useState(null);
//   const [quantity, setQuantity] = useState(1);
//   const [productData, setProductData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchProduct(id);
//   }, [id]);

//   const fetchProduct = async (id) => {
//     setLoading(true);
//     const response = await axios.get(`http://localhost:5000/api/products/common/${id}`);
//     setProductData(response.data.data);
//     // console.log(response.data.data);
//     setLoading(false);
//   };

//   // ✅ Decide which images to show
//   const productImages =
//     selectedVariant && selectedVariant.images?.length > 0
//       ? selectedVariant.images.map((img) => img.url)
//       : productData?.images?.map((img) => img.url) || [];

//   const handleAddToCart = async () => {
//     // If no variant selected → add general product
//     const productToAdd = {
//       // id: id,
//       userId,
//       variantId: selectedVariant?._id || null,
//       quantity,
//     };

//     try {
//       // addToCart(productToAdd);
//       // console.log(productToAdd);
      
//       axios.post(`http://localhost:5000/api/user/cart/product/${id}`, productToAdd);
//       if (selectedVariant) {
//         toast.success(`${productData.name} (${selectedVariant.size}) added to cart!`);
//       } else {
//         toast.success(`${productData.name} added to cart!`);
//       }
//     } catch (error) {
//       toast.error(error.message);
//       // console.log(error);
//     }
//   };

//   const increaseQuantity = () => setQuantity((prev) => prev + 1);
//   const decreaseQuantity = () => quantity > 1 && setQuantity((prev) => prev - 1);

//   if (loading) return <Spinner size="lg" />;

//   return (
//     <div className="product-detail-container">
//       <button onClick={() => window.history.back()} className="back-button">
//         ← Back to Products
//       </button>

//       <div className="product-detail">
//         {/* ✅ Product / Variant Images */}
//         <div className="product-gallery">
//           <div className="main-image">
//             <img src={productImages[selectedImage]} alt={productData?.name} />
//           </div>
//           <div className="image-thumbnails">
//             {productImages?.map((img, index) => (
//               <div
//                 key={index}
//                 className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
//                 onClick={() => setSelectedImage(index)}
//               >
//                 <img src={img} alt={`${productData.name} view ${index + 1}`} />
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* ✅ Product / Variant Info */}
//         <div className="product-info">
//           <div className="product-header">
//             <h1>{productData?.name}</h1>
//             <div className="product-rating-large">
//               <span className="rating-stars">
//                 {'★'.repeat(Math.floor(productData?.ratings || 0))}
//                 {'☆'.repeat(5 - Math.floor(productData?.ratings || 0))}
//               </span>
//               <span className="rating-value">
//                 {productData?.ratings} • {productData?.numOfReviews} Reviews
//               </span>
//             </div>

//             {/* ✅ Show price (general OR variant) */}
//             {selectedVariant ? (
//               <div className="product-price-large">
//                 ₹ {(selectedVariant.price + (selectedVariant.tax || 0)).toFixed(2)}
//               </div>
//             ) : (
//               <div className="product-price-large">₹ {productData?.price}</div>
//             )}
//           </div>

//           {/* ✅ Variant Selection */}
//           {productData?.variants?.length > 0 && (
//             <div className="product-variants">
//               <h3>Select Variant</h3>
//               <div className="variant-options">
//                 {productData.variants.map((variant) => (
//                   <button
//                     key={variant._id}
//                     className={`variant-option ${
//                       selectedVariant?._id === variant._id ? 'active' : ''
//                     }`}
//                     onClick={() => {
//                       setSelectedVariant(variant);
//                       setSelectedImage(0);
//                     }}
//                   >
//                     {variant.size} • ₹{(variant.price + (variant.tax || 0)).toFixed(2)}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* ✅ Show selected variant details (only after click) */}
//           {selectedVariant ? (
//             <div className="variant-details">
//               <p><strong>Size:</strong> {selectedVariant.size}</p>
//               <p><strong>Price:</strong> ₹{selectedVariant.price}</p>
//               <p><strong>Tax:</strong> {selectedVariant.tax}%</p>
//               <p>
//                 <strong>Stock:</strong>{" "}
//                 {selectedVariant.stock > 0 ? `${selectedVariant.stock} available` : "Out of Stock"}
//               </p>
//             </div>
//           ) : (
//             <div className="general-product-details">
//               <p>{productData?.description}</p>
//             </div>
//           )}

//           {/* ✅ Quantity + Cart */}
//           <div className="purchase-section">
//             <div className="quantity-selector">
//               <button onClick={decreaseQuantity} className="quantity-btn">-</button>
//               <span className="quantity-value">{quantity}</span>
//               <button onClick={increaseQuantity} className="quantity-btn">+</button>
//             </div>
//             <button
//               onClick={handleAddToCart}
//               className="add-to-cart-btn futuristic-btn primary"
//               disabled={selectedVariant?.stock === 0}
//             >
//               {selectedVariant ? (
//                 selectedVariant.stock > 0 ? (
//                   <>Add to Cart • ₹
//                     {(
//                       (selectedVariant.price + (selectedVariant.tax || 0)) * quantity
//                     ).toFixed(2)}
//                   </>
//                 ) : (
//                   "Out of Stock"
//                 )
//               ) : (
//                 <>Add to Cart • ₹{(productData?.price * quantity).toFixed(2)}</>
//               )}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductDetail;





import React, { useEffect, useState } from "react";
import "../../CssFiles/Admin/product/Detail.css";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { getUserId } from "../../utills/authService";
import axios from "axios";
import Spinner from "../../components/Spinner";
import Footer from "../../components/Footer";

const ProductDetail = () => {
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
              {!showReviewForm && (
                <button 
                  className="review-btn futuristic-btn secondary"
                  onClick={() => setShowReviewForm(true)}
                >
                  {userHasReviewed ? 'Edit Review' : 'Write a Review'}
                </button>
              )}
            </div>

            {/* Review Form */}
            {showReviewForm && (
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
            )}

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

      <Footer />
    </div>
  );
};

export default ProductDetail;


// import React, { useEffect, useState } from "react";
// import "../../CssFiles/Admin/product/Detail.css";
// import { useParams, useNavigate } from "react-router-dom";
// import { toast } from "react-hot-toast";
// import { getUserId } from "../../utills/authService";
// import axios from "axios";
// import Spinner from "../../components/Spinner";
// import Footer from "../../components/Footer";

// const ProductDetail = () => {
//   const { id } = useParams();
//   const userId = getUserId();
//   const navigate = useNavigate();

//   const [selectedImage, setSelectedImage] = useState(0);
//   const [selectedVariant, setSelectedVariant] = useState(null);
//   const [quantity, setQuantity] = useState(1);
//   const [productData, setProductData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [reviews, setReviews] = useState([]);
//   const [showReviewForm, setShowReviewForm] = useState(false);
//   const [reviewData, setReviewData] = useState({
//     rating: 5,
//     comment: "",
//   });
//   const [reviewLoading, setReviewLoading] = useState(false);

//   useEffect(() => {
//     fetchProduct(id);
//     fetchReviews(id);
//   }, [id]);

//   const fetchProduct = async (id) => {
//     try {
//       setLoading(true);
//       const response = await axios.get(
//         `${import.meta.env.VITE_API_URL}/products/common/${id}`
//       );
//       setProductData(response.data.data);
//       setLoading(false);
//     } catch (error) {
//       toast.error("Failed to load product");
//       setLoading(false);
//     }
//   };

//   const fetchReviews = async (productId) => {
//     try {
//       const response = await axios.get(
//         `${import.meta.env.VITE_API_URL}/reviews/product/${productId}`
//       );
//       setReviews(response.data.data || []);
//     } catch (error) {
//       console.error("Failed to load reviews");
//     }
//   };

//   const handleAddReview = async () => {
//     if (!userId) {
//       toast.error("Please login to add review");
//       navigate("/login");
//       return;
//     }

//     if (!reviewData.comment.trim()) {
//       toast.error("Please enter your comment");
//       return;
//     }

//     setReviewLoading(true);
//     try {
//       await axios.post(
//         `${import.meta.env.VITE_API_URL}/reviews`,
//         {
//           productId: id,
//           userId,
//           rating: reviewData.rating,
//           comment: reviewData.comment,
//         }
//       );

//       toast.success("Review added successfully!");
//       setReviewData({ rating: 5, comment: "" });
//       setShowReviewForm(false);
//       fetchReviews(id); // Refresh reviews
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Error adding review");
//     } finally {
//       setReviewLoading(false);
//     }
//   };

//   const handleAddToCart = async () => {
//     if (!userId) {
//       toast.error("Please login to add products to cart");
//       navigate("/login");
//       return;
//     }

//     const productToAdd = {
//       userId,
//       productId: id,
//       quantity,
//       variantId: selectedVariant?._id || null,
//       size: selectedVariant?._id ? null : selectedVariant?.size || null,
//     };

//     try {
//       const response = await axios.post(
//         `${import.meta.env.VITE_API_URL}/user/cart/${id}`,
//         productToAdd
//       );

//       if (response.data.success) {
//         if (selectedVariant) {
//           toast.success(
//             `${productData.name} (${selectedVariant.size}) added to cart!`
//           );
//         } else {
//           toast.success(`${productData.name} added to cart!`);
//         }
//       }
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Error adding to cart");
//     }
//   };

//   const increaseQuantity = () => setQuantity((prev) => prev + 1);
//   const decreaseQuantity = () =>
//     quantity > 1 && setQuantity((prev) => prev - 1);

//   const calculateAverageRating = () => {
//     if (reviews.length === 0) return 0;
//     const total = reviews.reduce((sum, review) => sum + review.rating, 0);
//     return (total / reviews.length).toFixed(1);
//   };

//   const getRatingDistribution = () => {
//     const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
//     reviews.forEach(review => {
//       distribution[review.rating]++;
//     });
//     return distribution;
//   };

//   if (loading) return <Spinner size="lg" />;

//   return (
//     <div className="product-detail-container">
//       <button onClick={() => window.history.back()} className="back-button">
//         ← Back to Products
//       </button>

//       <div className="product-detail">
//         {/* Product Gallery */}
//         <div className="product-gallery">
//           <div className="main-image">
//             <img src={productData?.images?.[selectedImage]?.url} alt={productData?.name} />
//           </div>
//           <div className="image-thumbnails">
//             {productData?.images?.map((img, index) => (
//               <div
//                 key={index}
//                 className={`thumbnail ${selectedImage === index ? "active" : ""}`}
//                 onClick={() => setSelectedImage(index)}
//               >
//                 <img src={img.url} alt={`${productData.name} view ${index + 1}`} />
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Product Info */}
//         <div className="product-info">
//           <div className="product-header">
//             <h1>{productData?.name}</h1>
            
//             {/* Rating Summary */}
//             <div className="rating-summary">
//               <div className="overall-rating">
//                 <span className="rating-score">{calculateAverageRating()}</span>
//                 <div className="rating-stars-large">
//                   {"★".repeat(Math.round(calculateAverageRating()))}
//                   {"☆".repeat(5 - Math.round(calculateAverageRating()))}
//                 </div>
//                 <span className="rating-count">({reviews.length} reviews)</span>
//               </div>
//             </div>

//             {/* Price */}
//             {selectedVariant ? (
//               <div className="product-price-large">
//                 ₹ {(selectedVariant.price + (productData.tax || 0)).toFixed(2)}
//               </div>
//             ) : productData?.variants?.length > 0 ? (
//               <div className="product-price-large">
//                 From ₹{" "}
//                 {Math.min(...productData.variants.map((v) => v.price)).toFixed(2)}
//               </div>
//             ) : (
//               <div className="product-price-large">Price not available</div>
//             )}
//           </div>

//           {/* Variant Selection */}
//           {productData?.variants?.length > 0 && (
//             <div className="product-variants">
//               <h3>Select Variant</h3>
//               <div className="variant-options">
//                 {productData.variants.map((variant) => (
//                   <button
//                     key={variant.id}
//                     className={`variant-option ${
//                       selectedVariant?.id === variant.id ? "active" : ""
//                     }`}
//                     onClick={() => {
//                       setSelectedVariant(variant);
//                       setSelectedImage(0);
//                     }}
//                   >
//                     {variant.size} • ₹{variant.price.toFixed(2)}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* Product Details */}
//           {selectedVariant ? (
//             <div className="variant-details">
//               <p><strong>Size:</strong> {selectedVariant.size}</p>
//               <p><strong>Price:</strong> ₹{selectedVariant.price} All Included</p>
//               <p><strong>Tax:</strong> {productData.tax}%</p>
//               <p><strong>Stock:</strong> {selectedVariant.stock > 0 ? `${selectedVariant.stock} available` : "Out of Stock"}</p>
//             </div>
//           ) : (
//             <div className="general-product-details">
//               <p>{productData?.description}</p>
//               <p><strong>Total Stock:</strong> {productData?.stock}</p>
//             </div>
//           )}

//           {/* Purchase Section */}
//           <div className="purchase-section">
//             <div className="quantity-selector">
//               <button onClick={decreaseQuantity} className="quantity-btn">-</button>
//               <span className="quantity-value">{quantity}</span>
//               <button onClick={increaseQuantity} className="quantity-btn">+</button>
//             </div>
//             <button
//               onClick={handleAddToCart}
//               className="add-to-cart-btn futuristic-btn primary"
//               disabled={selectedVariant?.stock === 0}
//             >
//               {selectedVariant ? (
//                 selectedVariant.stock > 0 ? (
//                   <>Add to Cart • ₹{(selectedVariant.price * quantity).toFixed(2)}</>
//                 ) : (
//                   "Out of Stock"
//                 )
//               ) : productData?.variants?.length > 0 ? (
//                 <>Select a Variant</>
//               ) : (
//                 "Unavailable"
//               )}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Reviews & Ratings Section */}
//       <div className="reviews-section">
//         <div className="reviews-header">
//           <h2>Customer Reviews & Ratings</h2>
//           <button 
//             className="add-review-btn"
//             onClick={() => setShowReviewForm(!showReviewForm)}
//           >
//             {showReviewForm ? "Cancel Review" : "Write a Review"}
//           </button>
//         </div>

//         {/* Review Form */}
//         {showReviewForm && (
//           <div className="review-form">
//             <h3>Share Your Experience</h3>
//             <div className="rating-input">
//               <label>Your Rating:</label>
//               <div className="star-rating">
//                 {[1, 2, 3, 4, 5].map((star) => (
//                   <button
//                     key={star}
//                     type="button"
//                     className={`star-btn ${star <= reviewData.rating ? "active" : ""}`}
//                     onClick={() => setReviewData({...reviewData, rating: star})}
//                   >
//                     ★
//                   </button>
//                 ))}
//               </div>
//             </div>
//             <div className="comment-input">
//               <label>Your Review:</label>
//               <textarea
//                 value={reviewData.comment}
//                 onChange={(e) => setReviewData({...reviewData, comment: e.target.value})}
//                 placeholder="Share your thoughts about this product..."
//                 rows="4"
//               />
//             </div>
//             <button 
//               onClick={handleAddReview} 
//               className="submit-review-btn"
//               disabled={reviewLoading}
//             >
//               {reviewLoading ? "Submitting..." : "Submit Review"}
//             </button>
//           </div>
//         )}

//         {/* Reviews Statistics */}
//         <div className="reviews-stats">
//           <div className="overall-rating-card">
//             <div className="average-rating">
//               <span className="rating-number">{calculateAverageRating()}</span>
//               <div className="rating-stars">
//                 {"★".repeat(Math.round(calculateAverageRating()))}
//                 {"☆".repeat(5 - Math.round(calculateAverageRating()))}
//               </div>
//               <span className="total-reviews">{reviews.length} reviews</span>
//             </div>
//           </div>

//           <div className="rating-distribution">
//             {[5, 4, 3, 2, 1].map((rating) => {
//               const count = getRatingDistribution()[rating];
//               const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
//               return (
//                 <div key={rating} className="rating-bar">
//                   <span className="rating-label">{rating} ★</span>
//                   <div className="bar-container">
//                     <div 
//                       className="bar-fill" 
//                       style={{ width: `${percentage}%` }}
//                     ></div>
//                   </div>
//                   <span className="rating-count">{count}</span>
//                 </div>
//               );
//             })}
//           </div>
//         </div>

//         {/* Reviews List */}
//         <div className="reviews-list">
//           {reviews.length > 0 ? (
//             reviews.map((review) => (
//               <div key={review._id} className="review-card">
//                 <div className="review-header">
//                   <div className="reviewer-info">
//                     <div className="reviewer-avatar">
//                       {review.userId?.name?.charAt(0)?.toUpperCase() || 'U'}
//                     </div>
//                     <div className="reviewer-details">
//                       <h4>{review.userId?.name || 'Anonymous'}</h4>
//                       <span className="review-date">
//                         {new Date(review.createdAt).toLocaleDateString()}
//                       </span>
//                     </div>
//                   </div>
//                   <div className="review-rating">
//                     <span className="stars">
//                       {"★".repeat(review.rating)}
//                       {"☆".repeat(5 - review.rating)}
//                     </span>
//                   </div>
//                 </div>
//                 <div className="review-comment">
//                   <p>{review.comment}</p>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <div className="no-reviews">
//               <p>No reviews yet. Be the first to review this product!</p>
//             </div>
//           )}
//         </div>
//       </div>

//       <Footer />
//     </div>
//   );
// };

// export default ProductDetail;



// import React, { useEffect, useState } from "react";
// import "../../CssFiles/Admin/product/productcommon.css";
// import { useParams, useNavigate } from "react-router-dom";
// import { toast } from "react-hot-toast";
// import { getUserId } from "../../utills/authService";
// import axios from "axios";
// import Spinner from "../../components/Spinner";
// import Footer from "../../components/Footer";

// const ProductDetail = () => {
//   const { id } = useParams();
//   const userId = getUserId();
//   const navigate = useNavigate();

//   const [selectedImage, setSelectedImage] = useState(0);
//   const [selectedVariant, setSelectedVariant] = useState(null);
//   const [quantity, setQuantity] = useState(1);
//   const [productData, setProductData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchProduct(id);
//   }, [id]);

//   const fetchProduct = async (id) => {
//     try {
//       setLoading(true);
//       const response = await axios.get(
//         `${import.meta.env.VITE_API_URL}/products/common/${id}`
//       );
//       setProductData(response.data.data);
//       setLoading(false);
//     } catch (error) {
//       toast.error("Failed to load product");
//       setLoading(false);
//     }
//   };

//   // ✅ Decide which images to show
//   const productImages =
//     selectedVariant && selectedVariant.images?.length > 0
//       ? selectedVariant.images.map((img) => img.url)
//       : productData?.images?.map((img) => img.url) || [];

//   // const handleAddToCart = async () => {
//   //   if (!userId) {
//   //     toast.error("Please login to add products to cart");
//   //     return;
//   //   }

//   //   const productToAdd = {
//   //     userId,
//   //     variantId: selectedVariant?.id || null, // ✅ API returns "id"
//   //     quantity,
//   //   };

//   //   // console.log(productToAdd);
    
//   //   try {
//   //     await axios.post(
//   //       `http://localhost:5000/api/user/cart/product/${id}`,
//   //       productToAdd
//   //     );

//   //     if (selectedVariant) {
//   //       toast.success(
//   //         `${productData.name} (${selectedVariant.size}) added to cart!`
//   //       );
//   //     } else {
//   //       toast.success(`${productData.name} added to cart!`);
//   //     }
//   //   } catch (error) {
//   //     toast.error(error.response?.data?.message || "Error adding to cart");
//   //   }
//   // };

//   const handleAddToCart = async () => {
//   if (!userId) {
//     toast.error("Please login to add products to cart");
//     navigate("/login");
//     return;
//   }

//   // // console.log(selectedVariant);
  

//   const productToAdd = {
//     userId,
//     productId: id, // ✅ Backend requires this
//     quantity,
//     variantId: selectedVariant?._id || null,
//     size: selectedVariant?._id ? null : selectedVariant?.size || null,

//     // variantId: selectedVariant?._id || null, // ✅ use _id from DB, not id
//     // size: selectedVariant?.size || null, // ✅ required if variantId missing
//   };

//   // // console.log("Adding to cart:", productToAdd);

//   try {
//     const response = await axios.post(
//       `${import.meta.env.VITE_API_URL}/user/cart/${id}`, // ✅ keep your route
//       productToAdd
//     );

//     if (response.data.success) {
//       if (selectedVariant) {
//         toast.success(
//           `${productData.name} (${selectedVariant.size}) added to cart!`
//         );
//       } else {
//         toast.success(`${productData.name} added to cart!`);
//       }
//     }
//   } catch (error) {
//     toast.error(error.response?.data?.message || "Error adding to cart");
//   }
// };

//   const increaseQuantity = () => setQuantity((prev) => prev + 1);
//   const decreaseQuantity = () =>
//     quantity > 1 && setQuantity((prev) => prev - 1);

//   if (loading) return <Spinner size="lg" />;

//   return (
//     <div className="product-detail-container">
//       <button onClick={() => window.history.back()} className="back-button">
//         ← Back to Products
//       </button>

//       <div className="product-detail">
//         {/* ✅ Product / Variant Images */}
//         <div className="product-gallery">
//           <div className="main-image">
//             <img src={productImages[selectedImage]} alt={productData?.name} />
//           </div>
//           <div className="image-thumbnails">
//             {productImages?.map((img, index) => (
//               <div
//                 key={index}
//                 className={`thumbnail ${
//                   selectedImage === index ? "active" : ""
//                 }`}
//                 onClick={() => setSelectedImage(index)}
//               >
//                 <img src={img} alt={`${productData.name} view ${index + 1}`} />
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* ✅ Product / Variant Info */}
//         <div className="product-info">
//           <div className="product-header">
//             <h1>{productData?.name}</h1>
//             {/* <div className="product-rating-large">
//               <span className="rating-stars">
//                 {"★".repeat(Math.floor(productData?.rating || 0))}
//                 {"☆".repeat(5 - Math.floor(productData?.rating || 0))}
//               </span>
//               <span className="rating-value">
//                 {productData?.rating} • {productData?.numOfReviews} Reviews
//               </span>
//             </div> */}

//             {/* ✅ Show price (general OR variant) */}
//             {selectedVariant ? (
//               <div className="product-price-large">
//                 ₹ {(selectedVariant.price + (productData.tax || 0)).toFixed(2)}
//               </div>
//             ) : productData?.variants?.length > 0 ? (
//               <div className="product-price-large">
//                 From ₹{" "}
//                 {Math.min(...productData.variants.map((v) => v.price)).toFixed(
//                   2
//                 )}
//               </div>
//             ) : (
//               <div className="product-price-large">Price not available</div>
//             )}
//           </div>

//           {/* ✅ Variant Selection */}
//           {productData?.variants?.length > 0 && (
//             <div className="product-variants">
//               <h3>Select Variant</h3>
//               <div className="variant-options">
//                 {productData.variants.map((variant) => (
//                   <button
//                     key={variant.id}
//                     className={`variant-option ${
//                       selectedVariant?.id === variant.id ? "active" : ""
//                     }`}
//                     onClick={() => {
//                       setSelectedVariant(variant);
//                       setSelectedImage(0);
//                     }}
//                   >
//                     {variant.size} • ₹
//                     {(variant.price.toFixed(2))}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* ✅ Show selected variant details */}
//           {selectedVariant ? (
//             <div className="variant-details">
//               <p>
//                 <strong>Size:</strong> {selectedVariant.size}
//               </p>
//               <p>
//                 <strong>Price:</strong> ₹{selectedVariant.price} All Included
//               </p>
//               <p>
//                 <strong>Tax:</strong> {productData.tax}%
//               </p>
//               <p>
//                 <strong>Stock:</strong>{" "}
//                 {selectedVariant.stock > 0
//                   ? `${selectedVariant.stock} available`
//                   : "Out of Stock"}
//               </p>
//             </div>
//           ) : (
//             <div className="general-product-details">
//               <p>{productData?.description}</p>
//               <p>
//                 <strong>Total Stock:</strong> {productData?.stock}
//               </p>
//             </div>
//           )}

//           {/* ✅ Quantity + Cart */}
//           <div className="purchase-section">
//             <div className="quantity-selector">
//               <button onClick={decreaseQuantity} className="quantity-btn">
//                 -
//               </button>
//               <span className="quantity-value">{quantity}</span>
//               <button onClick={increaseQuantity} className="quantity-btn">
//                 +
//               </button>
//             </div>
//             <button
//               onClick={handleAddToCart}
//               className="add-to-cart-btn futuristic-btn primary"
//               disabled={selectedVariant?.stock === 0}
//             >
//               {selectedVariant ? (
//                 selectedVariant.stock > 0 ? (
//                   <>
//                     Add to Cart • ₹
//                     {(selectedVariant.price * quantity).toFixed(2)}
//                   </>
//                 ) : (
//                   "Out of Stock"
//                 )
//               ) : productData?.variants?.length > 0 ? (
//                 <>Select a Variant</>
//               ) : (
//                 "Unavailable"
//               )}
//             </button>
//           </div>
//         </div>
//       </div>

//       <Footer />
//     </div>
//   );
// };

// export default ProductDetail;
