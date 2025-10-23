// *********************************
import React, { useEffect, useState } from "react";
import "../../CssFiles/User/Cart.css";
import { useNavigate } from "react-router-dom";
import { getUserId } from "../../utills/authService";
import { getCart, removeFromCart, updateCartItem } from "../../utills/apicall";
import { toast } from "react-hot-toast";
import Spinner from "../../components/Spinner";
import { FiShoppingCart, FiTrash2, FiPlus, FiMinus, FiLock, FiCreditCard, FiSmartphone, FiArrowLeft } from "react-icons/fi";
import { CiBank } from "react-icons/ci";
import { useSelector, useDispatch } from "react-redux";
import { removeItemFromCart, setCartFromBackend } from "../../store/cartSlice";

// import { useSelector, useDispatch } from "react-redux";
// import { removeItemFromCart } from "../../store/cartSlice"; // ✅ update this path if needed

const Cart = () => {
  const navigate = useNavigate();
  // const [cartItems, setCartItems] = useState([]);
  // const cartItems = useSelector((state) => state.cart.items);
  // const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const userId = getUserId();

  // useEffect(() => {
  //   const fetchCart = async () => {
  //     setLoading(true);
  //     try {
  //       const userCart = await getCart(userId);
  //       // // console.log(userCart);
        
  //       setCartItems(userCart.data.data.items || []);
  //     } catch (err) {
  //       toast.error("Failed to load cart");
  //     }
  //     setLoading(false);
  //   };
  //   fetchCart();
  // }, [userId]);

  useEffect(() => {
  const fetchCart = async () => {
    setLoading(true);
    try {
      const userCart = await getCart(userId);
      const items = userCart.data.data.items || [];
      dispatch(setCartFromBackend(items)); // ✅ update Redux instead of local state
    } catch (err) {
      toast.error("Failed to load cart");
    }
    setLoading(false);
  };
  fetchCart();
}, [userId, dispatch]);

  const updateQuantity = async (itemId, newQty, availableStock) => {
    if (newQty < 1 || newQty > availableStock) return;

    setCartItems((prev) =>
      prev.map((item) =>
        item._id === itemId ? { ...item, qty: newQty } : item
      )
    );

    try {
      // // console.log(userId, itemId, newQty);
      
      await updateCartItem(userId, itemId, newQty);
      toast.success("Quantity updated");

    } catch (err) {
      // // console.log(err);
      toast.error("Failed to update quantity");
    }
  };

  // const removeItem = async (itemId) => {
  //   const updatedCart = cartItems.filter((item) => item._id !== itemId);
  //   setCartItems(updatedCart);

  //   try {
  //     await removeFromCart(userId, itemId);
  //     toast.success("Item removed from cart");
  //   } catch (err) {
  //     console.error("Error removing item:", err);
  //     toast.error("Error removing item");
  //   }
  // };


  const removeItem = async (itemId) => {
  try {
    await removeFromCart(userId, itemId);     // ✅ Remove from backend
    dispatch(removeItemFromCart(itemId));     // ✅ Remove from Redux/localStorage
    toast.success("Item removed from cart");
    // refresh the window
    window.location.reload();
  } catch (err) {
    console.error("Error removing item:", err);
    toast.error("Error removing item");
  }
};

//   const removeItem = async (itemId) => {
//   try {
//     await removeFromCart(userId, itemId); // API call
//     dispatch(removeItemFromCart(itemId)); // ✅ Remove from Redux (auto-updates localStorage)
//     toast.success("Item removed from cart");
//   } catch (err) {
//     console.error("Error removing item:", err);
//     toast.error("Error removing item");
//   }
// };


  const getBasePrice = (item) => {
    const taxRate = item?.product?.tax || 0;
    return item.price / (1 + taxRate / 100);
  };

  const getTaxAmount = (item) => {
    const basePrice = getBasePrice(item);
    return item.price - basePrice;
  };

  const formatPrice = (amount) => amount.toFixed(2);

  const calculateSubtotal = () =>
    cartItems.reduce((total, item) => {
      const base = getBasePrice(item);
      return total + base * item.qty;
    }, 0);

  const calculateTax = () =>
    cartItems.reduce((total, item) => {
      const tax = getTaxAmount(item);
      return total + tax * item.qty;
    }, 0);

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax();
  };

  if (loading) return <Spinner size="lg" />;

  if (cartItems.length === 0) {
    return (
      <div className="shopping-cart-container">
        <div className="shopping-cart-empty">
          <div className="shopping-cart-empty-icon">
            <FiShoppingCart />
          </div>
          <h2>Your cart is empty</h2>
          <p>Looks like you haven't added any items to your cart yet.</p>
          <button
            onClick={() => navigate("/products")}
            className="shopping-cart-continue-btn"
          >
            <FiArrowLeft /> Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="shopping-cart-container">
      <div className="shopping-cart-header">
        <h1>🛒 Shopping Cart</h1>
        <p className="shopping-cart-subtitle">
          {cartItems.length} {cartItems.length === 1 ? "item" : "items"} in your cart
        </p>
      </div>

      <div className="shopping-cart-content">
        <div className="shopping-cart-items">
          {cartItems.map((item) => (
            <div key={item._id} className="shopping-cart-item">
              <div className="shopping-cart-item-image">
                <img src={item.image} alt={item.name} />
                {item.isOutOfStock && (
                  <div className="shopping-cart-item-out-of-stock">Out of Stock</div>
                )}
              </div>

              <div className="shopping-cart-item-details">
                <h3 className="shopping-cart-item-name">{item.name}</h3>
                
                <div className="shopping-cart-item-price-breakdown">
                  <div className="shopping-cart-item-price-row">
                    <span>Base Price:</span>
                    <span>₹{formatPrice(getBasePrice(item) * item.qty)}</span>
                  </div>
                  <div className="shopping-cart-item-price-row">
                    <span>Tax ({item.product?.tax || 0}%):</span>
                    <span>₹{formatPrice(getTaxAmount(item) * item.qty)}</span>
                  </div>
                  <div className="shopping-cart-item-price-row shopping-cart-item-total">
                    <span>Total Price:</span>
                    <span>₹{formatPrice(item.price * item.qty)}</span>
                  </div>
                </div>

                <div className="shopping-cart-item-meta">
                  <span className="shopping-cart-item-size">Size: {item.size}</span>
                  <span className={`shopping-cart-item-stock ${item.isOutOfStock ? "shopping-cart-item-stock-out" : "shopping-cart-item-stock-in"}`}>
                    {item.isOutOfStock ? "Out of Stock" : `${item.availableStock} available`}
                  </span>
                </div>

                <div className="shopping-cart-item-actions">
                  <button
                    className="shopping-cart-item-remove-btn"
                    onClick={() => removeItem(item._id)}
                  >
                    <FiTrash2 /> Remove
                  </button>
                </div>
              </div>

              <div className="shopping-cart-item-quantity">
                <div className="shopping-cart-quantity-controls">
                  <button
                    className="shopping-cart-quantity-btn"
                    onClick={() =>
                      updateQuantity(item._id, item.qty - 1, item.availableStock)
                    }
                    disabled={item.qty <= 1}
                  >
                    <FiMinus />
                  </button>
                  <span className="shopping-cart-quantity-display">{item.qty}</span>
                  <button
                    className="shopping-cart-quantity-btn"
                    onClick={() =>
                      updateQuantity(item._id, item.qty + 1, item.availableStock)
                    }
                    disabled={
                      item.qty >= item.availableStock || item.isOutOfStock
                    }
                  >
                    <FiPlus />
                  </button>
                </div>
              </div>

              <div className="shopping-cart-item-total-price">
                <span className="shopping-cart-item-total-amount">
                  ₹{(item.price * item.qty).toFixed(2)}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="shopping-cart-summary">
          <div className="shopping-cart-summary-card">
            <h3 className="shopping-cart-summary-title">Order Summary</h3>

            <div className="shopping-cart-summary-content">
              <div className="shopping-cart-summary-row">
                <span>Subtotal (before tax)</span>
                <span>₹{formatPrice(calculateSubtotal())}</span>
              </div>

              <div className="shopping-cart-summary-row">
                <span>Tax</span>
                <span>₹{formatPrice(calculateTax())}</span>
              </div>

              <div className="shopping-cart-summary-divider"></div>

              <div className="shopping-cart-summary-row shopping-cart-summary-total">
                <span>Total Amount</span>
                <span>₹{formatPrice(calculateTotal())}</span>
              </div>
            </div>

            <button
              onClick={() => navigate("/user/checkout")}
              className="shopping-cart-checkout-btn"
            >
              Proceed to Checkout
            </button>

            <div className="shopping-cart-security">
              <FiLock className="shopping-cart-security-icon" />
              <span>Secure checkout</span>
            </div>

            <div className="shopping-cart-payment-methods">
              <span className="shopping-cart-payment-title">We accept:</span>
              <div className="shopping-cart-payment-icons">
                <FiCreditCard className="shopping-cart-payment-icon" />
                <FiSmartphone className="shopping-cart-payment-icon" />
                <CiBank className="shopping-cart-payment-icon" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="shopping-cart-recommendations">
        <h3 className="shopping-cart-recommendations-title">You might also like</h3>
        <div className="shopping-cart-recommendations-grid">
          <div className="shopping-cart-recommendation-item">
            <div className="shopping-cart-recommendation-placeholder"></div>
          </div>
          <div className="shopping-cart-recommendation-item">
            <div className="shopping-cart-recommendation-placeholder"></div>
          </div>
          <div className="shopping-cart-recommendation-item">
            <div className="shopping-cart-recommendation-placeholder"></div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Cart;