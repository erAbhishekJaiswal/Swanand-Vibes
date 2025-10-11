// 

import React, { useState, useEffect, useCallback, useMemo } from "react";
import "../../CssFiles/common/Productlist.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "../../store/cartSlice";
import { getUserId, getUserRole } from "../../utills/authService";
import { getCommonProducts, getFilters } from "../../utills/apicall";
import Spinner from "../../components/Spinner";
import { toast } from "react-hot-toast";
import axios from "axios";
import Footer from "../../components/Footer";
import TruncateText from "../../components/TruncateText";
import { t } from "i18next";

const ProductList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  console.log(cartItems);
  
  // State variables
  const [showFilters, setShowFilters] = useState(false);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [addingToCart, setAddingToCart] = useState({}); // Track which products are being added to cart

  // Filters
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [priceRange] = useState([0, 10000000]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState({
    brands: [],
    minRating: 0,
    sizes: [],
  });

  // Pagination
  const [page, setPage] = useState(1);
  const [limit] = useState(12);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const [availableFilters, setAvailableFilters] = useState({
    categories: [],
    brands: [],
    sizes: [],
  });

  // Memoized debounce function
  const debounce = useCallback((func, delay) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), delay);
    };
  }, []);

  // Debounced search handler
  const debouncedSearch = useMemo(
    () => debounce((val) => setSearchQuery(val), 500),
    [debounce]
  );

  // Fetch products function with useCallback to prevent unnecessary re-creations
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
        brands: selectedFilters.brands,
        minRating: selectedFilters.minRating,
        sort: sortOption,
        size: selectedFilters.sizes,
      };

      // Clean parameters
      const cleanParams = {};
      Object.keys(params).forEach((key) => {
        const value = params[key];
        if (
          value !== "" &&
          value !== null &&
          value !== undefined &&
          !(Array.isArray(value) && value.length === 0)
        ) {
          cleanParams[key] = value;
        }
      });

      // Convert arrays to strings for API
      if (cleanParams.brands) cleanParams.brands = cleanParams.brands.join(",");
      if (cleanParams.sizes) cleanParams.sizes = cleanParams.sizes.join(",");

      const { data } = await getCommonProducts(cleanParams);
      console.log("Fetching products with params:", data);

      if (data.success) {
        setProducts(data.data);
        setTotalPages(data.totalPages);
        setTotalItems(data.totalItems);
      } else {
        toast.error(data.error || "Failed to fetch products");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Products are Not Found");
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

  // Fetch products only when dependencies change
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Fetch filters once on component mount
  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const response = await getFilters();
        const data = response?.data?.data;

        setAvailableFilters({
          categories: data?.categories || [],
          brands: data?.brands || [],
          sizes: data?.sizes || [],
        });
      } catch (error) {
        console.error("Error fetching filters:", error);
        toast.error("Failed to fetch filters");
      }
    };
    fetchFilters();
  }, []);

  // Filter handlers
  const handleBrandFilter = useCallback((brand) => {
    setSelectedFilters((prev) => ({
      ...prev,
      brands: prev.brands.includes(brand)
        ? prev.brands.filter((b) => b !== brand)
        : [...prev.brands, brand],
    }));
    setPage(1);
  }, []);

  const handleSizeFilter = useCallback((size) => {
    setSelectedFilters((prev) => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter((s) => s !== size)
        : [...prev.sizes, size],
    }));
    setPage(1);
  }, []);

  const handleRatingFilter = useCallback((rating) => {
    setSelectedFilters((prev) => ({ ...prev, minRating: rating }));
    setPage(1);
  }, []);

  const handleCategoryChange = useCallback((category) => {
    setSelectedCategory(category);
    setPage(1);
  }, []);

  const resetFilters = useCallback(() => {
    setSelectedCategory("");
    setSearchQuery("");
    setSelectedFilters({ brands: [], minRating: 0, sizes: [] });
    setSortOption("");
    setPage(1);
  }, []);

  // Add to cart handler
  const handleQuickAdd = useCallback(
    async (product) => {
      const userId = getUserId();
      if (!userId) {
        toast.error("Please login to add products to cart");
        navigate("/login");
        return;
      }

      // Set loading state for this specific product
      setAddingToCart(prev => ({ ...prev, [product.id]: true }));

      try {
        const hasVariants = product.variants && product.variants.length > 0;
        let variant;

        if (hasVariants) {
          if (!product.size && !product.variantId) {
            toast("Please select a variant on the product page", {
              icon: "ℹ️",
            });
            navigate(`/product/${product.id}`);
            return;
          }

          variant =
            product.variants.find((v) => v.id === product.variantId) ||
            product.variants.find((v) => v.size === product.size);
        }

        const cartData = {
          userId,
          productId: product.id,
          quantity: 1,
          size: hasVariants
            ? variant?.size || product.size
            : product.size || "One Size",
          variantId: hasVariants ? variant?.id || product.variantId : null,
        };

        const url = `${import.meta.env.VITE_API_URL}/user/cart/${product.id}`;
        const response = await axios.post(url, cartData);
        console.log("add to cart", response);

        if (response.data.success) {
          const productToAdd = {
            ...product,
            price: hasVariants ? variant?.price : product.price,
            size: cartData.size,
            variantId: cartData.variantId,
          };
          dispatch(addItemToCart(productToAdd));
          toast.success(`${product.name} added to cart!`);
        } else {
          toast.error(response.data.message || "Error adding to cart");
        }
      } catch (error) {
        console.error("Error adding product to cart:", error);
        toast.error(
          error.response?.data?.message || "Error adding product to cart"
        );
      } finally {
        // Clear loading state for this product
        setAddingToCart(prev => ({ ...prev, [product.id]: false }));
      }
    },
    [dispatch, navigate]
  );

  // Buy Now handler
  const handleBuyNow = useCallback(
    async (product) => {
      const userId = getUserId();
      if (!userId) {
        toast.error("Please login to purchase products");
        navigate("/login");
        return;
      }

      // check if product is already in cart
      if (cartItems.some((item) => item.productId === product.id && item.variantId === product.variantId) || isProductInCart(product.id, product.variantId)) {
        // toast.error("Product is already in cart");
        // If product is already in cart, navigate to checkout page
        navigate("/user/checkout");
      }else{
        // First add to cart, then navigate to checkout
          await handleQuickAdd(product);
             // Navigate to checkout page after successful addition to cart
      navigate("/user/checkout");
      }
    
    },
    [handleQuickAdd, navigate]
  );

  // Check if product is in cart
  const isProductInCart = useCallback(
    (productId, variantId) => {
      return cartItems.some((item) => {
        const itemProductId = item.product?._id || item.product?.id || item.product || item.productId;
        return (
          itemProductId?.toString() === productId?.toString() &&
          (!variantId || item.variantId === variantId)
        );
      });
    },
    [cartItems]
  );

  // Loading state
  if (isLoading && page === 1) {
    return (
      <div className="loading-container">
        <Spinner size="lg" />
        <p>Loading amazing products...</p>
      </div>
    );
  }

  return (
    <div className="products-container">
      <div className="products-content">
        {/* Mobile Filter Toggle */}
        <div className="mobile-filter-toggle">
          <button
            className="toggle-filters-btn"
            onClick={() => setShowFilters(!showFilters)}
          >
            {showFilters ? "▲ Hide Filters" : "▼ Show Filters"}
            <span className="filter-count">
              {Object.values(selectedFilters).filter((arr) => arr.length > 0)
                .length +
                (selectedCategory ? 1 : 0) +
                (searchQuery ? 1 : 0)}
            </span>
          </button>
        </div>

        <div className="products-layout">
          {/* Sidebar */}
          <aside className={`products-sidebar ${showFilters ? "active" : ""}`}>
            <div className="sidebar-sections">
              {/* Search */}
              <div className="sidebar-section">
                <h3>🔍 Search</h3>
                <input
                  type="text"
                  placeholder="Search products..."
                  defaultValue={searchQuery}
                  onChange={(e) => debouncedSearch(e.target.value)}
                  className="search-input"
                />
              </div>

              {/* Categories */}
              <div className="sidebar-section">
                <h3>📦 Categories</h3>
                <div className="filter-list">
                  <button
                    className={`filter-item ${
                      selectedCategory === "" ? "active" : ""
                    }`}
                    onClick={() => handleCategoryChange("")}
                  >
                    All Products
                  </button>
                  {availableFilters.categories.map((cat) => (
                    <button
                      key={cat.id}
                      className={`filter-item ${
                        selectedCategory === cat.id ? "active" : ""
                      }`}
                      onClick={() => handleCategoryChange(cat.id)}
                    >
                      {cat.name} ({cat.count})
                    </button>
                  ))}
                </div>
              </div>

              {/* Brands */}
              {availableFilters.brands.length > 0 && (
                <div className="sidebar-section">
                  <h3>🏷️ Brands</h3>
                  <div className="filter-list">
                    {availableFilters.brands.map((brand) => (
                      <label key={brand.name} className="filter-checkbox">
                        <input
                          type="checkbox"
                          checked={selectedFilters.brands.includes(brand.name)}
                          onChange={() => handleBrandFilter(brand.name)}
                        />
                        {brand.name} ({brand.count})
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Sizes */}
              {availableFilters.sizes.length > 0 && (
                <div className="sidebar-section">
                  <h3>📏 Sizes</h3>
                  <div className="filter-chips">
                    {availableFilters.sizes.map((sizeObj) => (
                      <button
                        key={sizeObj.name}
                        className={`filter-chip ${
                          selectedFilters.sizes.includes(sizeObj.name)
                            ? "active"
                            : ""
                        }`}
                        onClick={() => handleSizeFilter(sizeObj.name)}
                      >
                        {sizeObj.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Rating */}
              <div className="sidebar-section">
                <h3>⭐ Rating</h3>
                <div className="rating-filters">
                  {[4, 3, 2, 1].map((star) => (
                    <button
                      key={star}
                      className={`rating-filter ${
                        selectedFilters.minRating === star ? "active" : ""
                      }`}
                      onClick={() => handleRatingFilter(star)}
                    >
                      {"★".repeat(star)}+
                    </button>
                  ))}
                </div>
              </div>

              <button className="reset-filters-btn" onClick={resetFilters}>
                🗑️ Clear All Filters
              </button>
            </div>
          </aside>

          {/* Main Content */}
          <main className="products-main">
            {/* Controls */}
            <div className="products-controls">
              <div className="results-info">
                <span>{totalItems} products found</span>
                <span>
                  Page {page} of {totalPages}
                </span>
              </div>

              <div className="controls-right">
                <select
                  value={sortOption}
                  onChange={(e) => {
                    setSortOption(e.target.value);
                    setPage(1);
                  }}
                  className="sort-select"
                >
                  <option value="">Sort by</option>
                  <option value="price">Price: Low to High</option>
                  <option value="-price">Price: High to Low</option>
                  <option value="-ratings">Highest Rated</option>
                  <option value="name">Name (A-Z)</option>
                  <option value="-name">Name (Z-A)</option>
                  <option value="-createdAt">Newest First</option>
                </select>
              </div>
            </div>

            {/* Products Grid */}
            <div className="products-grid">
              {products.map((product) => {
                const variantId =
                  product.variantId || product.variants?.[0]?.id || null;
                const inCart = isProductInCart(product._id || product.id, variantId);
                const isAddingToCart = addingToCart[product.id] || false;

                return (
                  <div key={product.id} className="product-card">
                    <div
                      className="product-image"
                      onClick={() => navigate(`/product/${product.id}`)}
                    >
                      <img
                        src={product.images}
                        alt={product.name}
                        loading="lazy"
                      />
                      {product.featured && (
                        <span className="featured-badge">Featured</span>
                      )}
                      {product.size && (
                        <span className="size-badge">{product.size}</span>
                      )}
                      <div className="product-overlay">
                        <button className="view-details-btn">Quick View</button>
                      </div>
                    </div>

                    <div className="product-info">
                      <h3 onClick={() => navigate(`/product/${product.id}`)}>
                        <TruncateText text={product.name} limit={25} />
                      </h3>

                      <p className="product-brand">{product.brand}</p>

                      <p className="product-description">
                        {product.description.length > 80
                          ? `${product.description.substring(0, 80)}...`
                          : product.description}
                      </p>

                      <div className="product-meta">
                        <div className="rating">
                          <span className="stars">
                            {"★".repeat(Math.floor(product.rating))}
                            {"☆".repeat(5 - Math.floor(product.rating))}
                          </span>
                          <span className="rating-count">
                            ({product.rating})
                          </span>
                        </div>

                        {product.variants?.length > 0 && (
                          <div className="variants-info">
                            {product.variants.length} sizes available
                          </div>
                        )}

                        <div className="price-section">
                          <span className="price">₹{product.price}</span>
                        </div>
                      </div>

                      {getUserRole() !== "admin" && (
                        <div className="product-actions">
                          <button
                            className={`add-to-cart-btn ${
                              inCart ? "in-cart" : ""
                            }`}
                            onClick={() => handleQuickAdd(product)}
                            disabled={inCart || isAddingToCart}
                          >
                            {isAddingToCart ? (
                              "⏳ Adding..."
                            ) : inCart ? (
                              "✓ Added to Cart"
                            ) : (
                              "🛒 Add to Cart"
                            )}
                          </button>
                          
                          <button
                            className="buy-now-btn"
                            onClick={() => handleBuyNow(product)}
                            disabled={isAddingToCart}
                          >
                            {isAddingToCart ? "⏳..." : "⚡ Buy Now"}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* No Products */}
            {products.length === 0 && !isLoading && (
              <div className="no-products">
                <div className="no-products-icon">😢</div>
                <h3>No products found</h3>
                <p>Try adjusting your filters or search terms</p>
                <button onClick={resetFilters} className="reset-filters-btn">
                  Clear All Filters
                </button>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="pagination-controls">
                <button
                  disabled={page === 1}
                  onClick={() => setPage(page - 1)}
                  className="pagination-btn prev"
                >
                  ← Previous
                </button>

                <div className="pagination-numbers">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (page <= 3) {
                      pageNum = i + 1;
                    } else if (page >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = page - 2 + i;
                    }

                    return (
                      <button
                        key={pageNum}
                        className={`pagination-btn ${
                          page === pageNum ? "active" : ""
                        }`}
                        onClick={() => setPage(pageNum)}
                      >
                        {pageNum}
                      </button>
                    );
                  })}

                  {totalPages > 5 && (
                    <span className="pagination-ellipsis">...</span>
                  )}
                </div>

                <button
                  disabled={page === totalPages}
                  onClick={() => setPage(page + 1)}
                  className="pagination-btn next"
                >
                  Next →
                </button>
              </div>
            )}
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default React.memo(ProductList);