// import React, { useState, useEffect } from "react";
// import "../../CssFiles/Admin/product/productcommon.css";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { useDispatch } from "react-redux";
// import { addItemToCart } from "../../store/cartSlice";
// import { getUserId } from "../../utills/authService";
// import { getCommonProducts, addToCart } from "../../utills/apicall";
// import Spinner from "../../components/Spinner";
// import { toast } from "react-hot-toast";

// // import './FuturisticProducts.css';

// const ProductList = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   // const [products, setProducts] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState("all");
//   const [sortOption, setSortOption] = useState("featured");
//   const [priceRange, setPriceRange] = useState([0, 1000]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [isLoading, setIsLoading] = useState(true);

//   const [products, setProducts] = useState([]);
//   const [page, setPage] = useState(1);
//   const [limit] = useState(10); // Default items per page
//   const [totalPages, setTotalPages] = useState(1);
//   const [totalItems, setTotalItems] = useState(0);

//   // Simulate data fetching
//   // useEffect(() => {
//   //   const fetchProducts = async () => {
//   //     // const res = await getCommonProducts();
//   //     const res = await axios.get('http://localhost:5000/api/products/common');
//   //     console.log(res.data.data);
//   //     setProducts(res.data.data);
//   //     setFilteredProducts(res.data.data);
//   //     setIsLoading(false);
//   //   };

//   //   fetchProducts();
//   // }, []);

//   useEffect(() => {
//     const fetch = async () => {
//       setIsLoading(true);
//       try {
//         const { data } = await axios.get(
//           "http://localhost:5000/api/products/common",
//           {
//             params: {
//               page,
//               limit,
//               search: searchQuery,
//               category: selectedCategory !== "all" ? selectedCategory : "",
//             },
//           }
//         );
//         setProducts(data.data);
//         setTotalPages(data.totalPages);
//         setTotalItems(data.totalItems);
//       } catch (error) {
//         console.error(error);
//       }
//       setIsLoading(false);
//     };
//     fetch();
//   }, [page, limit, searchQuery, selectedCategory]);

//   // Filter and sort products
//   useEffect(() => {
//     let result = [...products];

//     // Category filter
//     if (selectedCategory !== "all") {
//       result = result.filter(
//         (product) => product.category === selectedCategory
//       );
//     }

//     // Price filter
//     result = result.filter(
//       (product) =>
//         product.price >= priceRange[0] && product.price <= priceRange[1]
//     );

//     // Search filter
//     if (searchQuery) {
//       const query = searchQuery.toLowerCase();
//       result = result.filter(
//         (product) =>
//           product.name.toLowerCase().includes(query) ||
//           product.description.toLowerCase().includes(query) ||
//           product.brand.toLowerCase().includes(query)
//       );
//     }

//     // Sort products
//     switch (sortOption) {
//       case "price-low":
//         result.sort((a, b) => a.price - b.price);
//         break;
//       case "price-high":
//         result.sort((a, b) => b.price - a.price);
//         break;
//       case "rating":
//         result.sort((a, b) => b.rating - a.rating);
//         break;
//       case "name":
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
//     { id: "all", name: "All Products" },
//     { id: "electronics", name: "Electronics" },
//     { id: "computers", name: "Computers" },
//     { id: "audio", name: "Audio" },
//     { id: "drones", name: "Drones" },
//     { id: "accessories", name: "Accessories" },
//   ];

//   const handleQuickAdd = async (product) => {
//     const userId = getUserId(); // Get this from your authentication context or user state
//     const quantity = 1; // You can modify this if you want users to select quantity

//     const id = product.id;
//     // Item doesn't exist, add to cart
//     dispatch(addItemToCart(product));
//     toast.success(`${product.name} added to cart!`);
//     // API Call to Add to Cart
//     try {
//       console.log({ userId, id, quantity });

//       const response = await addToCart({ userId, id, quantity });
//       // axios.post(
//       //   `https://swanand-vibes-backend.vercel.app/api/user/cart/${id}`,
//       //   { userId, quantity }
//       // );
//       console.log("Cart updated:", response.data);

//     } catch (error) {
//       console.error("Error adding product to cart:", error);
//       toast.error("Error please login then adding product to cart");
//     }
//   };

//   const handleOpenProductDetail = (id) => {
//     navigate(`/product/${id}`);
//   };

//   if (isLoading) {
//     return (
//       <div>
//         <Spinner size="lg" />
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
//               {categories.map((category) => (
//                 <button
//                   key={category.id}
//                   className={`category-filter ${
//                     selectedCategory === category.id ? "active" : ""
//                   }`}
//                   onClick={() => setSelectedCategory(category.id)}
//                 >
//                   <span className="category-name">{category.name}</span>
//                   <span className="product-count">
//                     {category.id === "all"
//                       ? products.length
//                       : products.filter((p) => p.category === category.id)
//                           .length}
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
//                 onChange={(e) =>
//                   setPriceRange([priceRange[0], parseInt(e.target.value)])
//                 }
//                 className="price-slider"
//               />
//               <div className="price-values">
//                 <span>₹{priceRange[0]}</span>
//                 <span>₹{priceRange[1]}</span>
//               </div>
//             </div>
//           </div>

//           <div className="sidebar-section">
//             <h3>Popular Categories</h3>
//             <div className="tag-filters">
//               {[
//                 "Electronics",
//                 "Clothing",
//                 "Home",
//                 "Books",
//                 "Beauty",
//                 "Sports",
//                 "Spiritual",
//                 "Other",
//               ].map((tag) => (
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
//                 placeholder="🔍Search products..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="futuristic-input"
//               />
//               {/* <span className="search-icon">🔍</span> */}
//             </div>

//             <div className="sort-filter">
//               <select
//                 value={sortOption}
//                 onChange={(e) => setSortOption(e.target.value)}
//                 className="futuristic-select"
//               >
//                 <option className="filter-option" value="featured">
//                   Featured
//                 </option>
//                 <option className="filter-option" value="price-low">
//                   Price: Low to High
//                 </option>
//                 <option className="filter-option" value="price-high">
//                   Price: High to Low
//                 </option>
//                 <option className="filter-option" value="rating">
//                   Highest Rated
//                 </option>
//                 <option className="filter-option" value="name">
//                   Name
//                 </option>
//               </select>
//             </div>
//           </div>

//           <div className="products-grid">
//             {filteredProducts?.length > 0 ? (
//               filteredProducts?.map((product) => (
//                 <div key={product?.id} className="product-card">
//                   <div className="product-image">
//                     <img
//                       src={product.images}
//                       alt={product.name}
//                       onClick={() => handleOpenProductDetail(product?.id)}
//                     />
//                     {product.featured && (
//                       <span className="featured-badge">Featured</span>
//                     )}
//                     <button
//                       className="quick-add-btn"
//                       onClick={(e) => handleQuickAdd(product)}
//                     >
//                       Add to Cart
//                     </button>
//                   </div>
//                   <div className="product-info">
//                     <h3
//                       className="product-name"
//                       onClick={() => handleOpenProductDetail(product?.id)}
//                     >
//                       {product.name}
//                     </h3>
//                     <p
//                       className="product-description"
//                       onClick={() => handleOpenProductDetail(product?.id)}
//                     >
//                       {product.description}
//                     </p>
//                     <div
//                       className="product-meta"
//                       onClick={() => handleOpenProductDetail(product?.id)}
//                     >
//                       <div className="product-rating">
//                         <span className="rating-stars">
//                           {"★".repeat(Math.floor(product.rating))}
//                           {"☆".repeat(5 - Math.floor(product.rating))}
//                         </span>
//                         <span className="rating-value">{product.rating}</span>
//                       </div>
//                       <div className="product-price">
//                         ₹{product.price.toFixed(2)}
//                       </div>
//                     </div>
//                     <div
//                       onClick={() => handleOpenProductDetail(product?.id)}
//                       className="product-tags"
//                     >
//                       {/* {product?.tags?.map(tag => (
//                         <span key={tag} className="product-tag">{tag}</span>
//                       ))} */}
//                       <span className="product-tag">{product.brand}</span>
//                     </div>

//                     <button
//                       className="addtocart-btn"
//                       onClick={(e) => handleQuickAdd(product)}
//                     >
//                       Add to Cart
//                     </button>
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
//                     setSelectedCategory("all");
//                     setSearchQuery("");
//                     setPriceRange([0, 1000]);
//                   }}
//                 >
//                   Reset Filters
//                 </button>
//               </div>
//             )}
//           </div>
//           <div className="pagination-controls">
//             <button disabled={page === 1} onClick={() => setPage(page - 1)}>
//               Previous
//             </button>
//             <span>
//               Page {page} of {totalPages}
//             </span>
//             <button
//               disabled={page === totalPages}
//               onClick={() => setPage(page + 1)}
//             >
//               Next
//             </button>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default ProductList;

// import React, { useState, useEffect, useCallback, useRef } from "react";
// import "../../CssFiles/Admin/product/productcommon.css";
// import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { addItemToCart } from "../../store/cartSlice";
// import { getUserId, getUserRole } from "../../utills/authService";
// import { getCommonProducts, addToCart, getFilters } from "../../utills/apicall";
// import Spinner from "../../components/Spinner";
// import { toast } from "react-hot-toast";

// const ProductList = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   // State variables
//   const [showFilters, setShowFilters] = useState(false);
//   const [products, setProducts] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState("all");
//   const [sortOption, setSortOption] = useState("featured");
//   const [priceRange, setPriceRange] = useState([0, 1000]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [isLoading, setIsLoading] = useState(true);
//   const [page, setPage] = useState(1);
//   const [limit] = useState(10);
//   const [totalPages, setTotalPages] = useState(1);
//   const [totalItems, setTotalItems] = useState(0);
//   const [availableFilters, setAvailableFilters] = useState({
//     categories: [],
//     brands: [],
//     priceRange: [0, 1000],
//   });
//   const [selectedFilters, setSelectedFilters] = useState({
//     brands: [],
//     minRating: 0,
//   });

//   // Refs for debouncing
//   const searchTimeoutRef = useRef(null);
//   const filterTimeoutRef = useRef(null);

//   // Fetch filters from backend
//   useEffect(() => {
//     const fetchFilters = async () => {
//       try {
//         const response = await getFilters();
//         console.log(response);

//         setAvailableFilters({
//           categories: response?.data?.data.categories || [],
//           brands: response?.data?.data.brands || [],
//           priceRange: response?.data?.data.priceRange || [0, 1000],
//         });

//         // Set the max price range from API
//         if (response?.data?.data.priceRange) {
//           setPriceRange([0, response?.data?.data.priceRange[1]]);
//         }
//       } catch (error) {
//         console.error("Error fetching filters:", error);
//       }
//     };

//     fetchFilters();
//   }, []);

//   // Fetch products function
//   const fetchProducts = useCallback(async () => {
//     setIsLoading(true);
//     try {
//       const { data } = await getCommonProducts({
//         params: {
//           page,
//           limit,
//           search: searchQuery,
//           category: selectedCategory !== "all" ? selectedCategory : "",
//           minPrice: priceRange[0],
//           maxPrice: priceRange[1],
//           brands: selectedFilters.brands.join(","),
//           minRating: selectedFilters.minRating,
//           sort: sortOption,
//         }
//       });

//       setProducts(data.data);
//       setFilteredProducts(data.data);
//       setTotalPages(data.totalPages);
//       setTotalItems(data.totalItems);
//     } catch (error) {
//       console.error(error);
//       toast.error("Failed to fetch products");
//     }
//     setIsLoading(false);
//   }, [
//     page,
//     limit,
//     searchQuery,
//     selectedCategory,
//     priceRange,
//     selectedFilters,
//     sortOption,
//   ]);

//   // Debounced search function
//   const handleSearchChange = (value) => {
//     setSearchQuery(value);
//     setPage(1);

//     // Clear previous timeout
//     if (searchTimeoutRef.current) {
//       clearTimeout(searchTimeoutRef.current);
//     }

//     // Set new timeout
//     searchTimeoutRef.current = setTimeout(() => {
//       fetchProducts();
//     }, 500);
//   };

//   // Effect for filters and pagination
//   useEffect(() => {
//     // Clear previous timeout
//     if (filterTimeoutRef.current) {
//       clearTimeout(filterTimeoutRef.current);
//     }

//     // Set new timeout
//     filterTimeoutRef.current = setTimeout(() => {
//       fetchProducts();
//     }, 300);

//     return () => {
//       if (filterTimeoutRef.current) {
//         clearTimeout(filterTimeoutRef.current);
//       }
//     };
//   }, [page, priceRange, selectedFilters, sortOption, selectedCategory, fetchProducts]);

//   // Cleanup timeouts on unmount
//   useEffect(() => {
//     return () => {
//       if (searchTimeoutRef.current) {
//         clearTimeout(searchTimeoutRef.current);
//       }
//       if (filterTimeoutRef.current) {
//         clearTimeout(filterTimeoutRef.current);
//       }
//     };
//   }, []);

//   // Handle filter changes
//   const handleBrandFilter = (brand) => {
//     setSelectedFilters((prev) => {
//       const newBrands = prev.brands.includes(brand)
//         ? prev.brands.filter((b) => b !== brand)
//         : [...prev.brands, brand];

//       return { ...prev, brands: newBrands };
//     });
//     setPage(1);
//   };

//   const handleRatingFilter = (rating) => {
//     setSelectedFilters((prev) => ({ ...prev, minRating: rating }));
//     setPage(1);
//   };

//   const handleCategoryChange = (category) => {
//     setSelectedCategory(category);
//     setPage(1);
//   };

//   const handlePriceRangeChange = (newRange) => {
//     setPriceRange(newRange);
//     setPage(1);
//   };

//   const handleQuickAdd = async (product) => {
//     const userId = getUserId();
//     if (!userId) {
//       toast.error("Please login to add products to cart");
//       return;
//     }

//     const quantity = 1;
//     const id = product.id;

//     // Add to Redux store
//     dispatch(addItemToCart(product));

//     // API Call to Add to Cart
//     try {
//       const response = await addToCart({ userId, id, quantity });
//       console.log("Cart updated:", response.data);
//       toast.success(`${product.name} added to cart!`);
//     } catch (error) {
//       console.error("Error adding product to cart:", error);
//       toast.error("Error adding product to cart");
//     }
//   };

//   const handleOpenProductDetail = (id) => {
//     navigate(`/product/${id}`);
//   };

//   const resetFilters = () => {
//     setSelectedCategory("all");
//     setSearchQuery("");
//     setPriceRange([0, availableFilters.priceRange[1] || 1000]);
//     setSelectedFilters({ brands: [], minRating: 0 });
//     setPage(1);
//   };

//   if (isLoading && page === 1) {
//     return (
//       <div className="loading-container">
//         <Spinner size="lg" />
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
//           <div className="filter-toggle-container">
//             <button
//               className="toggle-filters-btn"
//               onClick={() => setShowFilters(!showFilters)}
//             >
//               {showFilters ? "Hide Filters ▲" : "Show Filters ▼"}
//             </button>
//           </div>

//           {showFilters && (
//             <>
//               <div className="sidebar-section">
//                 <h3>Categories</h3>
//                 <div className="category-filters">
//                   <button
//                     key="all"
//                     className={`category-filter ${
//                       selectedCategory === "all" ? "active" : ""
//                     }`}
//                     onClick={() => handleCategoryChange("all")}
//                   >
//                     <span className="category-name">All Products</span>
//                     <span className="product-count">{totalItems}</span>
//                   </button>

//                   {availableFilters.categories.map((category) => (
//                     <button
//                       key={category.id}
//                       className={`category-filter ${
//                         selectedCategory === category.id ? "active" : ""
//                       }`}
//                       onClick={() => handleCategoryChange(category.id)}
//                     >
//                       <span className="category-name">{category.name}</span>
//                       <span className="product-count">{category.count}</span>
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               <div className="sidebar-section">
//                 <h3>Price Range</h3>
//                 <div className="price-filter">
//                   <input
//                     type="range"
//                     min="0"
//                     max={availableFilters.priceRange[1] || 1000}
//                     step="50"
//                     value={priceRange[1]}
//                     onChange={(e) =>
//                       handlePriceRangeChange([
//                         priceRange[0],
//                         parseInt(e.target.value),
//                       ])
//                     }
//                     className="price-slider"
//                   />
//                   <div className="price-values">
//                     <span>₹{priceRange[0]}</span>
//                     <span>₹{priceRange[1]}</span>
//                   </div>
//                 </div>
//               </div>

//               <div className="sidebar-section">
//                 <h3>Brands</h3>
//                 <div className="brand-filters">
//                   {availableFilters.brands.map((brand) => (
//                     <label key={brand.name} className="filter-checkbox">
//                       <input
//                         type="checkbox"
//                         className="profuct-filtter-checkmark"
//                         checked={selectedFilters.brands.includes(brand.name)}
//                         onChange={() => handleBrandFilter(brand.name)}
//                       />
//                       {brand.name} ({brand.count})
//                     </label>
//                   ))}
//                 </div>
//               </div>

//               <div className="sidebar-section">
//                 <h3>Minimum Rating</h3>
//                 <div className="rating-filters">
//                   {[4, 3, 2, 1].map((rating) => (
//                     <label key={rating} className="filter-checkbox">
//                       <input
//                         type="radio"
//                         name="rating"
//                         checked={selectedFilters.minRating === rating}
//                         onChange={() => handleRatingFilter(rating)}
//                       />
//                       {rating}+ Stars
//                     </label>
//                   ))}
//                   <label className="filter-checkbox">
//                     <input
//                       type="radio"
//                       name="rating"
//                       checked={selectedFilters.minRating === 0}
//                       onChange={() => handleRatingFilter(0)}
//                     />
//                     Any Rating
//                   </label>
//                 </div>
//               </div>

//               <button className="reset-filters-btn" onClick={resetFilters}>
//                 Reset All Filters
//               </button>
//             </>
//           )}
//         </aside>

//         <main className="products-main">
//           <div className="products-controls">
//             <div className="search-box">
//               <input
//                 type="text"
//                 placeholder="🔍Search products..."
//                 value={searchQuery}
//                 onChange={(e) => handleSearchChange(e.target.value)}
//                 className="futuristic-input"
//               />
//             </div>

//             <div className="sort-filter">
//               <select
//                 value={sortOption}
//                 onChange={(e) => {
//                   setSortOption(e.target.value);
//                   setPage(1);
//                 }}
//                 className="futuristic-select"
//               >
//                 <option value="featured">Featured</option>
//                 <option value="price-low">Price: Low to High</option>
//                 <option value="price-high">Price: High to Low</option>
//                 <option value="rating">Highest Rated</option>
//                 <option value="name">Name</option>
//                 <option value="newest">Newest</option>
//               </select>
//             </div>
//           </div>

//           <div className="products-grid">
//             {filteredProducts.length > 0 ? (
//               filteredProducts.map((product) => (
//                 <div key={product.id} className="product-card">
//                   <div className="product-image">
//                     <img
//                       src={product.images}
//                       alt={product.name}
//                       onClick={() => handleOpenProductDetail(product.id)}
//                     />
//                     {product.featured && (
//                       <span className="featured-badge">Featured</span>
//                     )}
//                     {getUserRole() !== "admin" && (
//                       <button
//                         className="quick-add-btn"
//                         onClick={() => handleQuickAdd(product)}
//                       >
//                         Add to Cart
//                       </button>
//                     )}
//                   </div>
//                   <div className="product-info">
//                     <h3
//                       className="product-name"
//                       onClick={() => handleOpenProductDetail(product.id)}
//                     >
//                       {product.name}
//                     </h3>
//                     <p
//                       className="product-description"
//                       onClick={() => handleOpenProductDetail(product.id)}
//                     >
//                       {product.description}
//                     </p>
//                     <div
//                       className="product-meta"
//                       onClick={() => handleOpenProductDetail(product.id)}
//                     >
//                       <div className="product-rating">
//                         <span className="rating-stars">
//                           {"★".repeat(Math.floor(product.rating))}
//                           {"☆".repeat(5 - Math.floor(product.rating))}
//                         </span>
//                         <span className="rating-value">{product.rating}</span>
//                       </div>
//                       <div className="product-price">
//                         ₹{product.price.toFixed(2)}
//                       </div>
//                     </div>
//                     <div
//                       onClick={() => handleOpenProductDetail(product.id)}
//                       className="product-tags"
//                     >
//                       <span className="product-tag">{product.brand}</span>
//                     </div>

//                     {getUserRole() !== "admin" && (
//                       <button
//                         className="addtocart-btn"
//                         onClick={() => handleQuickAdd(product)}
//                       >
//                         Add to Cart
//                       </button>
//                     )}
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <div className="no-products">
//                 <div className="no-products-icon">🔍</div>
//                 <h3>No products found</h3>
//                 <p>Try adjusting your filters or search query</p>
//                 <button className="futuristic-btn" onClick={resetFilters}>
//                   Reset Filters
//                 </button>
//               </div>
//             )}
//           </div>

//           {totalPages > 1 && (
//             <div className="pagination-controls">
//               <button
//                 disabled={page === 1}
//                 onClick={() => setPage(page - 1)}
//                 className="pagination-btn"
//               >
//                 Previous
//               </button>

//               <div className="page-numbers">
//                 {Array.from({ length: totalPages }, (_, i) => i + 1)
//                   .filter(
//                     (num) =>
//                       num === 1 ||
//                       num === totalPages ||
//                       (num >= page - 1 && num <= page + 1)
//                   )
//                   .map((num, index, array) => {
//                     const showEllipsis =
//                       index > 0 && num - array[index - 1] > 1;
//                     return (
//                       <React.Fragment key={num}>
//                         {showEllipsis && (
//                           <span className="pagination-ellipsis">...</span>
//                         )}
//                         <button
//                           className={`pagination-btn ${
//                             page === num ? "active" : ""
//                           }`}
//                           onClick={() => setPage(num)}
//                         >
//                           {num}
//                         </button>
//                       </React.Fragment>
//                     );
//                   })}
//               </div>

//               <button
//                 disabled={page === totalPages}
//                 onClick={() => setPage(page + 1)}
//                 className="pagination-btn"
//               >
//                 Next
//               </button>
//             </div>
//           )}
//         </main>
//       </div>
//     </div>
//   );
// };

// export default ProductList;


















import React, { useState, useEffect, useCallback, useMemo } from "react";
import "../../CssFiles/Admin/product/productcommon.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../../store/cartSlice";
import { getUserId, getUserRole } from "../../utills/authService";
import { getCommonProducts, addToCart, getFilters } from "../../utills/apicall";
import Spinner from "../../components/Spinner";
import { toast } from "react-hot-toast";
import axios from "axios";

const ProductList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // State variables
  const [showFilters, setShowFilters] = useState(false);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Filters
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState({
    brands: [],
    minRating: 0,
  });

  // Pagination
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const [availableFilters, setAvailableFilters] = useState({
    categories: [],
    brands: [],
    priceRange: [0, 1000],
  });

  // Debounce function
  const debounce = (func, delay) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), delay);
    };
  };

  // Fetch products function
  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    try {
      const params = {
        page,
        limit,
        search: searchQuery,
        category: selectedCategory,
        minPrice: priceRange[0],
        maxPrice: priceRange[1],
        brands: selectedFilters.brands.join(","),
        minRating: selectedFilters.minRating,
        sort: sortOption,
      };

      // Remove empty parameters
      Object.keys(params).forEach(key => {
        if (params[key] === "" || params[key] === null || params[key] === undefined) {
          delete params[key];
        }
      });

      const { data } = await getCommonProducts(params);

      if (data.success) {
        setProducts(data.data);
        setTotalPages(data.totalPages);
        setTotalItems(data.totalItems);
      } else {
        toast.error(data.error || "Failed to fetch products");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Failed to fetch products");
    } finally {
      setIsLoading(false);
    }
  }, [
    page,
    limit,
    searchQuery,
    selectedCategory,
    priceRange,
    selectedFilters,
    sortOption,
  ]);

  // Debounced search handler
  const debouncedSearch = useMemo(
    () => debounce((val) => setSearchQuery(val), 1000),
    []
  );

  // Trigger product fetch when filters change
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Fetch filters on component mount
  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const response = await getFilters();
        const data = response?.data?.data;

        setAvailableFilters({
          categories: data?.categories || [],
          brands: data?.brands || [],
          priceRange: data?.priceRange || [0, 1000],
        });
        setPriceRange([0, data?.priceRange?.[1] || 1000]);
      } catch (error) {
        console.error("Error fetching filters:", error);
      }
    };
    fetchFilters();
  }, [0]);

  // Handlers
  const handleBrandFilter = (brand) => {
    setSelectedFilters((prev) => {
      const newBrands = prev.brands.includes(brand)
        ? prev.brands.filter((b) => b !== brand)
        : [...prev.brands, brand];
      return { ...prev, brands: newBrands };
    });
    setPage(1);
  };

  const handleRatingFilter = (rating) => {
    setSelectedFilters((prev) => ({ ...prev, minRating: rating }));
    setPage(1);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setPage(1);
  };

  const handlePriceRangeChange = (newRange) => {
    setPriceRange(newRange);
    setPage(1);
  };

  const handleQuickAdd = async (product) => {
    const userId = getUserId();
    if (!userId) {
      toast.error("Please login to add products to cart");
      return;
    }

    dispatch(addItemToCart(product));

    try {
      await addToCart({ userId, id: product.id, quantity: 1 });
      toast.success(`${product.name} added to cart!`);
    } catch (error) {
      console.error("Error adding product to cart:", error);
      toast.error("Error adding product to cart");
    }
  };

  const resetFilters = () => {
    setSelectedCategory("");
    setSearchQuery("");
    setPriceRange([0, availableFilters.priceRange[1] || 1000]);
    setSelectedFilters({ brands: [], minRating: 0 });
    setSortOption("");
    setPage(1);
  };

  // Rendering
  if (isLoading && page === 1) {
    return (
      <div className="loading-container">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="products-container">
      <div className="products-header">
        <h1>Future Tech Products</h1>
        <p>Discover cutting-edge technology for tomorrow's world</p>
      </div>

      <div className="products-content">
        {/* Sidebar */}
        <aside className="products-sidebar">
          <div className="filter-toggle-container">
            <button
              className="toggle-filters-btn"
              onClick={() => setShowFilters(!showFilters)}
            >
              {showFilters ? "Hide Filters ▲" : "Show Filters ▼"}
            </button>
          </div>

          {showFilters && (
            <>
              {/* Categories */}
              <div className="sidebar-section">
                <h3>Categories</h3>
                <div className="category-filters">
                  <button
                    key="all"
                    className={`category-filter ${
                      selectedCategory === "" ? "active" : ""
                    }`}
                    onClick={() => handleCategoryChange("")}
                  >
                    All Products ({totalItems})
                  </button>
                  {availableFilters.categories.map((cat) => (
                    <button
                      key={cat.id}
                      className={`category-filter ${
                        selectedCategory === cat.id ? "active" : ""
                      }`}
                      onClick={() => handleCategoryChange(cat.id)}
                    >
                      {cat.name} ({cat.count})
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="sidebar-section">
                <h3>Price Range</h3>
                <div className="price-slider-container">
                  <input
                    type="range"
                    min="0"
                    max={availableFilters.priceRange[1] || 1000}
                    step="50"
                    value={priceRange[1]}
                    onChange={(e) =>
                      handlePriceRangeChange([0, parseInt(e.target.value)])
                    }
                    className="price-slider"
                  />
                  <div className="price-values">
                    ₹{priceRange[0]} - ₹{priceRange[1]}
                  </div>
                </div>
              </div>

              {/* Brands */}
              {availableFilters.brands.length > 0 && (
                <div className="sidebar-section">
                  <h3>Brands</h3>
                  <div className="brand-filters">
                    {availableFilters.brands.map((brand) => (
                      <label key={brand.name} className="brand-filter">
                        <input
                          type="checkbox"
                          checked={selectedFilters.brands.includes(brand.name)}
                          onChange={() => handleBrandFilter(brand.name)}
                        />
                        <span className="checkmark"></span>
                        {brand.name} ({brand.count})
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Rating */}
              <div className="sidebar-section">
                <h3>Minimum Rating</h3>
                <div className="rating-filters">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button 
                      key={star} 
                      className={`rating-filter ${selectedFilters.minRating === star ? 'active' : ''}`}
                      onClick={() => handleRatingFilter(star)}
                    >
                      {"★".repeat(star)}+
                    </button>
                  ))}
                </div>
              </div>

              <button className="reset-filters-btn" onClick={resetFilters}>
                Reset Filters
              </button>
            </>
          )}
        </aside>

        {/* Main Content */}
        <main className="products-main">
          <div className="products-controls">
            <input
              type="text"
              placeholder="🔍 Search products..."
              onChange={(e) => debouncedSearch(e.target.value)}
              className="futuristic-input"
            />

            <select
              value={sortOption}
              onChange={(e) => {
                setSortOption(e.target.value);
                setPage(1);
              }}
              className="sort-select"
            >
              <option value="">Sort By</option>
              <option value="price">Price: Low to High</option>
              <option value="-price">Price: High to Low</option>
              <option value="-ratings">Highest Rated</option>
              <option value="name">Name (A-Z)</option>
              <option value="-name">Name (Z-A)</option>
              <option value="-createdAt">Newest</option>
            </select>
          </div>

          {/* Products Grid */}
          <div className="products-grid">
            {products.length > 0 ? (
              products.map((product) => (
                <div key={product.id} className="product-card">
                  <div
                    className="product-image"
                    onClick={() => navigate(`/product/${product.id}`)}
                  >
                    <img src={product.images} alt={product.name} />
                    {product.featured && (
                      <span className="featured-badge">Featured</span>
                    )}
                  </div>
                  <div className="product-info">
                    <h3>{product.name}</h3>
                    <p className="product-description">{product.description}</p>
                    <div className="product-meta">
                      <span className="product-rating">
                        {"★".repeat(Math.floor(product.rating))}
                        <span className="rating-text">({product.rating})</span>
                      </span>
                      <span className="product-price">₹{product.price.toFixed(2)}</span>
                    </div>
                    {getUserRole() !== "admin" && (
                      <button 
                        className="add-to-cart-btn"
                        onClick={() => handleQuickAdd(product)}
                      >
                        Add to Cart
                      </button>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="no-products">
                <p>No products found matching your criteria</p>
                <button onClick={resetFilters} className="reset-filters-btn">
                  Reset Filters
                </button>
              </div>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="pagination-controls">
              <button 
                disabled={page === 1} 
                onClick={() => setPage(page - 1)}
                className="pagination-btn"
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (num) => (
                  <button
                    key={num}
                    className={`pagination-btn ${page === num ? "active" : ""}`}
                    onClick={() => setPage(num)}
                  >
                    {num}
                  </button>
                )
              )}
              <button
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}
                className="pagination-btn"
              >
                Next
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default ProductList;

// import React, { useState, useEffect, useCallback, useMemo } from "react";
// import "../../CssFiles/Admin/product/productcommon.css";
// import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { addItemToCart } from "../../store/cartSlice";
// import { getUserId, getUserRole } from "../../utills/authService";
// import { getCommonProducts, addToCart, getFilters } from "../../utills/apicall";
// import Spinner from "../../components/Spinner";
// import { toast } from "react-hot-toast";

// const ProductList = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   // State variables
//   const [showFilters, setShowFilters] = useState(false);
//   const [products, setProducts] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);

//   // Filters
//   const [selectedCategory, setSelectedCategory] = useState("all");
//   const [sortOption, setSortOption] = useState("featured");
//   const [priceRange, setPriceRange] = useState([0, 1000]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedFilters, setSelectedFilters] = useState({
//     brands: [],
//     minRating: 0,
//   });

//   // Pagination
//   const [page, setPage] = useState(1);
//   const [limit] = useState(10);
//   const [totalPages, setTotalPages] = useState(1);
//   const [totalItems, setTotalItems] = useState(0);

//   const [availableFilters, setAvailableFilters] = useState({
//     categories: [],
//     brands: [],
//     priceRange: [0, 1000],
//   });

//   // Debounce function
//   const debounce = (func, delay) => {
//     let timeout;
//     return (...args) => {
//       clearTimeout(timeout);
//       timeout = setTimeout(() => func(...args), delay);
//     };
//   };

//   // Fetch filters once
//   // useEffect(() => {
//   // }, []);

//   const fetchProducts = useCallback(async () => {
//     setIsLoading(true);
//     try {
//       const { data } = await getCommonProducts({
//         params: {
//           page,
//           limit,
//           search: searchQuery,
//           category: selectedCategory !== "all" ? selectedCategory : "",
//           minPrice: priceRange[0],
//           maxPrice: priceRange[1],
//           brands: selectedFilters.brands.join(","),
//           minRating: selectedFilters.minRating,
//           sort: sortOption,
//         },
//       });

//       setProducts(data.data);
//       setTotalPages(data.totalPages);
//       setTotalItems(data.totalItems);
//       console.log(data);
//     } catch (error) {
//       console.error(error);
//       toast.error("Failed to fetch products");
//     } finally {
//       setIsLoading(false);
//     }
//   }, [
//     page,
//     limit,
//     searchQuery,
//     selectedCategory,
//     priceRange,
//     selectedFilters,
//     sortOption,
//   ]);

//   // Debounced search handler
//   const debouncedSearch = useMemo(
//     () => debounce((val) => setSearchQuery(val), 1000),
//     []
//   );

//   // Trigger product fetch
//   useEffect(() => {
//     // Fetch products
//     const fetchFilters = async () => {
//       try {
//         const response = await getFilters();
//         const data = response?.data?.data;
//         console.log(data);

//         setAvailableFilters({
//           categories: data?.categories || [],
//           brands: data?.brands || [],
//           priceRange: data?.priceRange || [0, 1000],
//         });
//         setPriceRange([0, data?.priceRange?.[1] || 1000]);
//       } catch (error) {
//         console.error("Error fetching filters:", error);
//       }
//     };
//     fetchFilters();
//     fetchProducts();
//   }, []);

//   // Handlers
//   const handleBrandFilter = (brand) => {
//     setSelectedFilters((prev) => {
//       const newBrands = prev.brands.includes(brand)
//         ? prev.brands.filter((b) => b !== brand)
//         : [...prev.brands, brand];
//       return { ...prev, brands: newBrands };
//     });
//     setPage(1);
//   };

//   const handleRatingFilter = (rating) => {
//     setSelectedFilters((prev) => ({ ...prev, minRating: rating }));
//     setPage(1);
//   };

//   const handleCategoryChange = (category) => {
//     setSelectedCategory(category);
//     setPage(1);
//   };

//   const handlePriceRangeChange = (newRange) => {
//     setPriceRange(newRange);
//     setPage(1);
//   };

//   const handleQuickAdd = async (product) => {
//     const userId = getUserId();
//     if (!userId) {
//       toast.error("Please login to add products to cart");
//       return;
//     }

//     dispatch(addItemToCart(product));

//     try {
//       await addToCart({ userId, id: product.id, quantity: 1 });
//       toast.success(`${product.name} added to cart!`);
//     } catch (error) {
//       console.error("Error adding product to cart:", error);
//       toast.error("Error adding product to cart");
//     }
//   };

//   const resetFilters = () => {
//     setSelectedCategory("all");
//     setSearchQuery("");
//     setPriceRange([0, availableFilters.priceRange[1] || 1000]);
//     setSelectedFilters({ brands: [], minRating: 0 });
//     setPage(1);
//   };

//   // Rendering
//   if (isLoading && page === 1) {
//     return (
//       <div className="loading-container">
//         <Spinner size="lg" />
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
//         {/* Sidebar */}
//         <aside className="products-sidebar">
//           <div className="filter-toggle-container">
//             <button
//               className="toggle-filters-btn"
//               onClick={() => setShowFilters(!showFilters)}
//             >
//               {showFilters ? "Hide Filters ▲" : "Show Filters ▼"}
//             </button>
//           </div>

//           {showFilters && (
//             <>
//               {/* Categories */}
//               <div className="sidebar-section">
//                 <h3>Categories</h3>
//                 <div className="category-filters">
//                   <button
//                     key="all"
//                     className={`category-filter ${
//                       selectedCategory === "all" ? "active" : ""
//                     }`}
//                     onClick={() => handleCategoryChange("all")}
//                   >
//                     All Products ({totalItems})
//                   </button>
//                   {availableFilters.categories.map((cat) => (
//                     <button
//                       key={cat.id}
//                       className={`category-filter ${
//                         selectedCategory === cat.id ? "active" : ""
//                       }`}
//                       onClick={() => handleCategoryChange(cat.id)}
//                     >
//                       {cat.name} ({cat.count})
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               {/* Price Range */}
//               <div className="sidebar-section">
//                 <h3>Price Range</h3>
//                 <input
//                   type="range"
//                   min="0"
//                   max={availableFilters.priceRange[1] || 1000}
//                   step="50"
//                   value={priceRange[1]}
//                   onChange={(e) =>
//                     handlePriceRangeChange([0, parseInt(e.target.value)])
//                   }
//                 />
//                 <div className="price-values">
//                   ₹{priceRange[0]} - ₹{priceRange[1]}
//                 </div>
//               </div>

//               {/* Brands */}
//               <div className="sidebar-section">
//                 <h3>Brands</h3>
//                 {availableFilters.brands.map((brand) => (
//                   <label key={brand.name}>
//                     <input
//                       type="checkbox"
//                       checked={selectedFilters.brands.includes(brand.name)}
//                       onChange={() => handleBrandFilter(brand.name)}
//                     />
//                     {brand.name} ({brand.count})
//                   </label>
//                 ))}
//               </div>

//               {/* Rating */}
//               <div className="sidebar-section">
//                 <h3>Minimum Rating</h3>
//                 {[1, 2, 3, 4, 5].map((star) => (
//                   <button key={star} onClick={() => handleRatingFilter(star)}>
//                     {"★".repeat(star)}+
//                   </button>
//                 ))}
//               </div>

//               <button className="reset-filters-btn" onClick={resetFilters}>
//                 Reset Filters
//               </button>
//             </>
//           )}
//         </aside>

//         {/* Main Content */}
//         <main className="products-main">
//           <div className="products-controls">
//             <input
//               type="text"
//               placeholder="🔍 Search products..."
//               onChange={(e) => debouncedSearch(e.target.value)}
//               className="futuristic-input"
//             />

//             <select
//               value={sortOption}
//               onChange={(e) => {
//                 setSortOption(e.target.value);
//                 setPage(1);
//               }}
//             >
//               <option value="featured">Featured</option>
//               <option value="price-low">Price: Low to High</option>
//               <option value="price-high">Price: High to Low</option>
//               <option value="rating">Highest Rated</option>
//               <option value="name">Name</option>
//               <option value="newest">Newest</option>
//             </select>
//           </div>

//           {/* Products Grid */}
//           <div className="products-grid">
//             {products.length > 0 ? (
//               products.map((product) => (
//                 <div key={product.id} className="product-card">
//                   <div
//                     className="product-image"
//                     onClick={() => navigate(`/product/${product.id}`)}
//                   >
//                     <img src={product.images} alt={product.name} />
//                     {product.featured && (
//                       <span className="featured-badge">Featured</span>
//                     )}
//                   </div>
//                   <div className="product-info">
//                     <h3>{product.name}</h3>
//                     <p>{product.description}</p>
//                     <div className="product-meta">
//                       <span>{"★".repeat(Math.floor(product.rating))}</span>
//                       <span>₹{product.price.toFixed(2)}</span>
//                     </div>
//                     {getUserRole() !== "admin" && (
//                       <button onClick={() => handleQuickAdd(product)}>
//                         Add to Cart
//                       </button>
//                     )}
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <div className="no-products">
//                 <p>No products found</p>
//                 <button onClick={resetFilters}>Reset Filters</button>
//               </div>
//             )}
//           </div>

//           {/* Pagination */}
//           {totalPages > 1 && (
//             <div className="pagination-controls">
//               <button disabled={page === 1} onClick={() => setPage(page - 1)}>
//                 Previous
//               </button>
//               {Array.from({ length: totalPages }, (_, i) => i + 1).map(
//                 (num) => (
//                   <button
//                     key={num}
//                     className={page === num ? "active" : ""}
//                     onClick={() => setPage(num)}
//                   >
//                     {num}
//                   </button>
//                 )
//               )}
//               <button
//                 disabled={page === totalPages}
//                 onClick={() => setPage(page + 1)}
//               >
//                 Next
//               </button>
//             </div>
//           )}
//         </main>
//       </div>
//     </div>
//   );
// };

// export default ProductList;

// import React, { useState, useEffect, useCallback } from "react";
// import "../../CssFiles/Admin/product/productcommon.css";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { useDispatch } from "react-redux";
// import { addItemToCart } from "../../store/cartSlice";
// import { getUserId,getUserRole } from "../../utills/authService";
// import { getCommonProducts, addToCart, getFilters } from "../../utills/apicall";
// import Spinner from "../../components/Spinner";
// import { toast } from "react-hot-toast";

// const ProductList = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   // State variables
//   const [showFilters, setShowFilters] = useState(false);
//   const [products, setProducts] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState("all");
//   const [sortOption, setSortOption] = useState("featured");
//   const [priceRange, setPriceRange] = useState([0, 1000]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [isLoading, setIsLoading] = useState(true);
//   const [page, setPage] = useState(1);
//   const [limit] = useState(10);
//   const [totalPages, setTotalPages] = useState(1);
//   const [totalItems, setTotalItems] = useState(0);
//   const [availableFilters, setAvailableFilters] = useState({
//     categories: [],
//     brands: [],
//     priceRange: [],
//   });
//   const [selectedFilters, setSelectedFilters] = useState({
//     brands: [],
//     minRating: 0,
//   });

//   // Debounce function
//   const debounce = (func, delay) => {
//     let timeoutId;
//     return (...args) => {
//       clearTimeout(timeoutId);
//       timeoutId = setTimeout(() => func.apply(null, args), delay);
//     };
//   };

//   // Fetch filters from backend
//   useEffect(() => {
//     const fetchFilters = async () => {
//       try {
//         const response = await getFilters();
//         console.log(response);

//         setAvailableFilters({
//           categories: response?.data?.data.categories || [],
//           brands: response?.data?.data.brands || [],
//           priceRange: response?.data?.data.priceRange || [0, 1000],
//         });

//         // Set the max price range from API
//         if (response?.data?.data.priceRange) {
//           setPriceRange([0, response?.data?.data?.priceRange[1]]);
//         }
//       } catch (error) {
//         console.error("Error fetching filters:", error);
//       }
//     };

//     fetchFilters();
//   }, []);

//   // Fetch products with debounced search
//   const fetchProducts = useCallback(
//     async (searchValue = searchQuery, category = selectedCategory) => {
//       setIsLoading(true);
//       try {
//         // const { data } = await axios.get(
//         //   "http://localhost:5000/api/products/common",
//         //   {
//         //     params: {
//         //       page,
//         //       limit,
//         //       search: searchValue,
//         //       category: category !== "all" ? category : "",
//         //       minPrice: priceRange[0],
//         //       maxPrice: priceRange[1],
//         //       brands: selectedFilters.brands.join(","),
//         //       minRating: selectedFilters.minRating,
//         //       sort: sortOption,
//         //     },
//         //   }
//         // );
//         const { data } = await getCommonProducts({
//          params: {
//           page,
//           limit,
//           search: searchValue,
//           category: category !== "all" ? category : "",
//           minPrice: priceRange[0],
//           maxPrice: priceRange[1],
//           brands: selectedFilters.brands.join(","),
//           minRating: selectedFilters.minRating,
//           sort: sortOption,
//         }
//         })
//         setProducts(data.data);
//         console.log(data);

//         setFilteredProducts(data.data);
//         setTotalPages(data.totalPages);
//         setTotalItems(data.totalItems);
//       } catch (error) {
//         console.error(error);
//         toast.error("Failed to fetch products");
//       }
//       setIsLoading(false);
//     },
//     [
//       page,
//       limit,
//       searchQuery,
//       selectedCategory,
//       priceRange,
//       selectedFilters,
//       sortOption,
//     ]
//   );

//   // Debounced version of fetchProducts
//   const debouncedFetchProducts = useCallback(
//     debounce((searchValue, category) => {
//       fetchProducts(searchValue, category);
//     }, 5000),
//     [fetchProducts]
//   );

//   // Effect for handling search with debouncing
//   // useEffect(() => {
//   //   debouncedFetchProducts(searchQuery, selectedCategory);
//   // }, [searchQuery, selectedCategory, debouncedFetchProducts]);

//   // Effect for other filters and pagination
//   // useEffect(() => {
//   //   fetchProducts();
//   // }, [page, priceRange, selectedFilters, sortOption, fetchProducts]);

//   // Handles both search & filter triggers in one place
// useEffect(() => {
//   if (searchQuery.trim()) {
//     debouncedFetchProducts(searchQuery, selectedCategory);
//   } else {
//     fetchProducts(searchQuery, selectedCategory);
//   }
// }, [
//   page,
//   priceRange,
//   selectedFilters,
//   sortOption,
//   searchQuery,
//   selectedCategory,
//   debouncedFetchProducts,
//   fetchProducts,
// ]);

//   // Handle filter changes
//   const handleBrandFilter = (brand) => {
//     setSelectedFilters((prev) => {
//       const newBrands = prev.brands.includes(brand)
//         ? prev.brands.filter((b) => b !== brand)
//         : [...prev.brands, brand];

//       return { ...prev, brands: newBrands };
//     });
//     // setPage(1); // Reset to first page when filters change
//   };

//   const handleRatingFilter = (rating) => {
//     setSelectedFilters((prev) => ({ ...prev, minRating: rating }));
//     // setPage(1); // Reset to first page when filters change
//   };

//   const handleCategoryChange = (category) => {
//     setSelectedCategory(category);
//     setPage(1);
//   };

//   const handlePriceRangeChange = (newRange) => {
//     setPriceRange(newRange);
//     setPage(1);
//   };

//   const handleQuickAdd = async (product) => {
//     const userId = getUserId();
//     if (!userId) {
//       toast.error("Please login to add products to cart");
//       return;
//     }

//     const quantity = 1;
//     const id = product.id;

//     // Add to Redux store
//     dispatch(addItemToCart(product));

//     // API Call to Add to Cart
//     try {
//       const response = await addToCart({ userId, id, quantity });
//       console.log("Cart updated:", response.data);
//       toast.success(`${product.name} added to cart!`);
//     } catch (error) {
//       console.error("Error adding product to cart:", error);
//       toast.error("Error adding product to cart");
//     }
//   };

//   const handleOpenProductDetail = (id) => {
//     navigate(`/product/${id}`);
//   };

//   const resetFilters = () => {
//     setSelectedCategory("all");
//     setSearchQuery("");
//     setPriceRange([0, availableFilters.priceRange[1] || 1000]);
//     setSelectedFilters({ brands: [], minRating: 0 });
//     setPage(1);
//   };

//   if (isLoading && page === 1) {
//     return (
//       <div className="loading-container">
//         <Spinner size="lg" />
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
//           <div className="filter-toggle-container">
//             <button
//               className="toggle-filters-btn"
//               onClick={() => setShowFilters(!showFilters)}
//             >
//               {showFilters ? "Hide Filters ▲" : "Show Filters ▼"}
//             </button>
//           </div>

//           {showFilters && (
//             <>
//               <div className="sidebar-section">
//                 <h3>Categories</h3>
//                 <div className="category-filters">
//                   <button
//                     key="all"
//                     className={`category-filter ${
//                       selectedCategory === "all" ? "active" : ""
//                     }`}
//                     onClick={() => handleCategoryChange("all")}
//                   >
//                     <span className="category-name">All Products</span>
//                     <span className="product-count">{totalItems}</span>
//                   </button>

//                   {availableFilters.categories.map((category) => (
//                     <button
//                       key={category.id}
//                       className={`category-filter ${
//                         selectedCategory === category.id ? "active" : ""
//                       }`}
//                       onClick={() => handleCategoryChange(category.id)}
//                     >
//                       <span className="category-name">{category.name}</span>
//                       <span className="product-count">{category.count}</span>
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               <div className="sidebar-section">
//                 <h3>Price Range</h3>
//                 <div className="price-filter">
//                   <input
//                     type="range"
//                     min="0"
//                     max={availableFilters.priceRange[1] || 1000}
//                     step="50"
//                     value={priceRange[1]}
//                     onChange={(e) =>
//                       handlePriceRangeChange([
//                         priceRange[0],
//                         parseInt(e.target.value),
//                       ])
//                     }
//                     className="price-slider"
//                   />
//                   <div className="price-values">
//                     <span>₹{priceRange[0]}</span>
//                     <span>₹{priceRange[1]}</span>
//                   </div>
//                 </div>
//               </div>

//               <div className="sidebar-section">
//                 <h3>Brands</h3>
//                 <div className="brand-filters">
//                   {availableFilters.brands.map((brand) => (
//                     <label key={brand.name} className="filter-checkbox">
//                       <input
//                         type="checkbox"
//                         className="profuct-filtter-checkmark"
//                         checked={selectedFilters.brands.includes(brand.name)}
//                         onChange={() => handleBrandFilter(brand.name)}
//                       />
//                       {/* <span className="checkmark"></span> */}
//                       {brand.name} ({brand.count})
//                     </label>
//                   ))}
//                 </div>
//               </div>
//               <button className="reset-filters-btn" onClick={resetFilters}>
//                 Reset All Filters
//               </button>
//             </>
//           )}
//         </aside>
//         <main className="products-main">
//           <div className="products-controls">
//             <div className="search-box">
//               <input
//                 type="text"
//                 placeholder="🔍Search products..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="futuristic-input"
//               />
//             </div>

//             <div className="sort-filter">
//               <select
//                 value={sortOption}
//                 onChange={(e) => {
//                   setSortOption(e.target.value);
//                   setPage(1);
//                 }}
//                 className="futuristic-select"
//               >
//                 <option value="featured">Featured</option>
//                 <option value="price-low">Price: Low to High</option>
//                 <option value="price-high">Price: High to Low</option>
//                 <option value="rating">Highest Rated</option>
//                 <option value="name">Name</option>
//                 <option value="newest">Newest</option>
//               </select>
//             </div>
//           </div>

//           <div className="products-grid">
//             {filteredProducts.length > 0 ? (
//               filteredProducts.map((product) => (
//                 <div key={product.id} className="product-card">
//                   <div className="product-image">
//                     <img
//                       src={product.images}
//                       alt={product.name}
//                       onClick={() => handleOpenProductDetail(product.id)}
//                     />
//                     {product.featured && (
//                       <span className="featured-badge">Featured</span>
//                     )}
//               {getUserRole() !== "admin" && <button
//                 className="quick-add-btn"
//                 onClick={() => handleQuickAdd(product)}
//               >
//                 Add to Cart
//               </button>}
//                   </div>
//                   <div className="product-info">
//                     <h3
//                       className="product-name"
//                       onClick={() => handleOpenProductDetail(product.id)}
//                     >
//                       {product.name}
//                     </h3>
//                     <p
//                       className="product-description"
//                       onClick={() => handleOpenProductDetail(product.id)}
//                     >
//                       {product.description}
//                     </p>
//                     <div
//                       className="product-meta"
//                       onClick={() => handleOpenProductDetail(product.id)}
//                     >
//                       <div className="product-rating">
//                         <span className="rating-stars">
//                           {"★".repeat(Math.floor(product.rating))}
//                           {"☆".repeat(5 - Math.floor(product.rating))}
//                         </span>
//                         <span className="rating-value">{product.rating}</span>
//                       </div>
//                       <div className="product-price">
//                         ₹{product.price.toFixed(2)}
//                       </div>
//                     </div>
//                     <div
//                       onClick={() => handleOpenProductDetail(product.id)}
//                       className="product-tags"
//                     >
//                       <span className="product-tag">{product.brand}</span>
//                     </div>

//                     {getUserRole () !== "admin" && <button
//                       className="addtocart-btn"
//                       onClick={() => handleQuickAdd(product)}
//                     >
//                       Add to Cart
//                     </button>}
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <div className="no-products">
//                 <div className="no-products-icon">🔍</div>
//                 <h3>No products found</h3>
//                 <p>Try adjusting your filters or search query</p>
//                 <button className="futuristic-btn" onClick={resetFilters}>
//                   Reset Filters
//                 </button>
//               </div>
//             )}
//           </div>

//           {totalPages > 1 && (
//             <div className="pagination-controls">
//               <button
//                 disabled={page === 1}
//                 onClick={() => setPage(page - 1)}
//                 className="pagination-btn"
//               >
//                 Previous
//               </button>

//               <div className="page-numbers">
//                 {Array.from({ length: totalPages }, (_, i) => i + 1)
//                   .filter(
//                     (num) =>
//                       num === 1 ||
//                       num === totalPages ||
//                       (num >= page - 1 && num <= page + 1)
//                   )
//                   .map((num, index, array) => {
//                     const showEllipsis =
//                       index > 0 && num - array[index - 1] > 1;
//                     return (
//                       <React.Fragment key={num}>
//                         {showEllipsis && (
//                           <span className="pagination-ellipsis">...</span>
//                         )}
//                         <button
//                           className={`pagination-btn ${
//                             page === num ? "active" : ""
//                           }`}
//                           onClick={() => setPage(num)}
//                         >
//                           {num}
//                         </button>
//                       </React.Fragment>
//                     );
//                   })}
//               </div>

//               <button
//                 disabled={page === totalPages}
//                 onClick={() => setPage(page + 1)}
//                 className="pagination-btn"
//               >
//                 Next
//               </button>
//             </div>
//           )}
//         </main>
//       </div>
//     </div>
//   );
// };

// export default ProductList;
