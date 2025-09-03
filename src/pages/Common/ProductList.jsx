import React, { useState, useEffect } from "react";
import "../../CssFiles/Admin/product/productcommon.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../../store/cartSlice";
import { getUserId } from "../../utills/authService";
import { getCommonProducts, addToCart } from "../../utills/apicall";
import Spinner from "../../components/Spinner";
import {toast} from 'react-hot-toast';

// import './FuturisticProducts.css';

const ProductList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOption, setSortOption] = useState("featured");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Simulate data fetching
  useEffect(() => {
    const fetchProducts = async () => {
      const res = await getCommonProducts();
      // axios.get('https://swanand-vibes-backend.vercel.app/api/products/common');
      console.log(res.data.data);
      setProducts(res.data.data);
      setFilteredProducts(res.data.data);
      setIsLoading(false);
    };

    fetchProducts();
  }, []);

  // Filter and sort products
  useEffect(() => {
    let result = [...products];

    // Category filter
    if (selectedCategory !== "all") {
      result = result.filter(
        (product) => product.category === selectedCategory
      );
    }

    // Price filter
    result = result.filter(
      (product) =>
        product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          product.brand.toLowerCase().includes(query)
      );
    }

    // Sort products
    switch (sortOption) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "name":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        // Featured first, then by id
        result.sort((a, b) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return a.id - b.id;
        });
    }

    setFilteredProducts(result);
  }, [products, selectedCategory, sortOption, priceRange, searchQuery]);

  const categories = [
    { id: "all", name: "All Products" },
    { id: "electronics", name: "Electronics" },
    { id: "computers", name: "Computers" },
    { id: "audio", name: "Audio" },
    { id: "drones", name: "Drones" },
    { id: "accessories", name: "Accessories" },
  ];

  const handleQuickAdd = async (product) => {
    const userId = getUserId(); // Get this from your authentication context or user state
    const quantity = 1; // You can modify this if you want users to select quantity

    const id = product.id;
    // Item doesn't exist, add to cart
    dispatch(addItemToCart(product));

    // API Call to Add to Cart
    try {
      console.log({ userId, id, quantity });

      const response = await addToCart({ userId, id, quantity });
      // axios.post(
      //   `https://swanand-vibes-backend.vercel.app/api/user/cart/${id}`,
      //   { userId, quantity }
      // );
      console.log("Cart updated:", response.data);
      toast.success(`${product.name} added to cart!`);
    } catch (error) {
      console.error("Error adding product to cart:", error);
      toast.error("Error adding product to cart");
    }
  };

  const handleOpenProductDetail = (id) => {
    navigate(`/product/${id}`);
  };

  if (isLoading) {
    return (
      <div >
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
        <aside className="products-sidebar">
          <div className="sidebar-section">
            <h3>Categories</h3>
            <div className="category-filters">
              {categories.map((category) => (
                <button
                  key={category.id}
                  className={`category-filter ${
                    selectedCategory === category.id ? "active" : ""
                  }`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  <span className="category-name">{category.name}</span>
                  <span className="product-count">
                    {category.id === "all"
                      ? products.length
                      : products.filter((p) => p.category === category.id)
                          .length}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="sidebar-section">
            <h3>Price Range</h3>
            <div className="price-filter">
              <input
                type="range"
                min="0"
                max="2000"
                step="50"
                value={priceRange[1]}
                onChange={(e) =>
                  setPriceRange([priceRange[0], parseInt(e.target.value)])
                }
                className="price-slider"
              />
              <div className="price-values">
                <span>₹{priceRange[0]}</span>
                <span>₹{priceRange[1]}</span>
              </div>
            </div>
          </div>

          <div className="sidebar-section">
            <h3>Popular Categories</h3>
            <div className="tag-filters">
              {[
                "Electronics",
                "Clothing",
                "Home",
                "Books",
                "Beauty",
                "Sports",
                "Spiritual",
                "Other",
              ].map((tag) => (
                <button
                  key={tag}
                  className="tag-filter"
                  onClick={() => setSearchQuery(tag)}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </aside>

        <main className="products-main">
          <div className="products-controls">
            <div className="search-box">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="futuristic-input"
              />
              <span className="search-icon">🔍</span>
            </div>

            <div className="sort-filter">
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="futuristic-select"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="name">Name</option>
              </select>
            </div>
          </div>

          <div className="products-grid">
            {filteredProducts?.length > 0 ? (
              filteredProducts?.map((product) => (
                <div key={product?.id} className="product-card">
                  <div className="product-image">
                    <img
                      src={product.images}
                      alt={product.name}
                      onClick={() => handleOpenProductDetail(product?.id)}
                    />
                    {product.featured && (
                      <span className="featured-badge">Featured</span>
                    )}
                    <button
                      className="quick-add-btn"
                      onClick={(e) => handleQuickAdd(product)}
                    >
                      Add to Cart
                    </button>
                  </div>
                  <div
                    className="product-info"
                    onClick={() => handleOpenProductDetail(product?.id)}
                  >
                    <h3 className="product-name">{product.name}</h3>
                    <p className="product-description">{product.description}</p>
                    <div className="product-meta">
                      <div className="product-rating">
                        <span className="rating-stars">
                          {"★".repeat(Math.floor(product.rating))}
                          {"☆".repeat(5 - Math.floor(product.rating))}
                        </span>
                        <span className="rating-value">{product.rating}</span>
                      </div>
                      <div className="product-price">
                        ₹{product.price.toFixed(2)}
                      </div>
                    </div>
                    <div className="product-tags">
                      {/* {product?.tags?.map(tag => (
                        <span key={tag} className="product-tag">{tag}</span>
                      ))} */}
                      <span className="product-tag">{product.brand}</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-products">
                <div className="no-products-icon">🔍</div>
                <h3>No products found</h3>
                <p>Try adjusting your filters or search query</p>
                <button
                  className="futuristic-btn"
                  onClick={() => {
                    setSelectedCategory("all");
                    setSearchQuery("");
                    setPriceRange([0, 1000]);
                  }}
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProductList;
