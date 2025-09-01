// Cart.js
import React, { useEffect, useState } from 'react';
import '../../CssFiles/User/Cart.css';
import axios from 'axios';
import { getUserId } from '../../utills/authService';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([
  ]);
  const id = getUserId();

  useEffect(() => {
    const fetchCart = async () => {
        const userCart = await axios.get(`http://localhost:5000/api/user/cart/${id}`);
        console.log(userCart.data.data);
        setCartItems(userCart.data.data.items);
    };
    fetchCart();
  }, []);



  const updateQuantity = (productId, newQty) => {
    if (newQty < 1) return;

    setCartItems(prev =>
      prev.map(item =>
        item.product._id === productId
          ? { ...item, qty: Math.min(newQty, item.product.stock) }
          : item
      )
    );
  };


  const userId = getUserId();

  // const removeItem = async (id) => {
  //   setCartItems(cartItems?.filter(item => item.id !== id));
  //   const removedItem = cartItems?.find(item => item.id === id);
  //   await axios.delete(`http://localhost:5000/api/user/cart/${id}`, { data: { item: removedItem, userId: userid } });
  // };


   const removeItem = async (productId) => {
    const updatedCart = cartItems.filter(item => item.product._id !== productId);
    setCartItems(updatedCart);

    const removedItem = cartItems.find(item => item.product._id === productId);
    if (removedItem) {
      try {
        await axios.delete(`http://localhost:5000/api/user/cart/${productId}`, {
          data: {
            item: removedItem,
            userId: userId
          }
        });
      } catch (err) {
        console.error("Error removing item:", err);
      }
    }
  };



  const calculateSubtotal = () => {
    return cartItems?.reduce((total, item) => total + (item.price * item.qty), 0);
  };

  const calculateTax = () => {
    return calculateSubtotal() * 0.08; // 8% tax
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax();
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart-container">
        <div className="empty-cart">
          <div className="empty-cart-icon">🛒</div>
          <h2>Your cart is empty</h2>
          <p>Looks like you haven't added any items to your cart yet.</p>
          <button className="continue-shopping-btn">
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <div className="cart-header">
        <h1>Shopping Cart</h1>
        <p>{cartItems?.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart</p>
      </div>

      <div className="cart-content">
        <div className="cart-items">
          {cartItems?.map(item => (
            <div key={item?.product?._id} className="cart-item">
              <div className="item-image">
                <img src={item?.image} alt={item?.name} />
              </div>
              
              <div className="item-details">
                <p>id: {item?.product?._id}</p>
                <h3 className="item-name">{item?.name}</h3>
                <p className="item-price">₹{item?.price.toFixed(2)}</p>
                <p className="item-stock">{item?.product?.stock} in stock</p>

                <div className="item-actions">
                  <button 
                    className="remove-btn"
                    onClick={() => removeItem(item?.product?._id)}
                  >
                    Remove
                  </button>
                  <button onClick={() => navigate('/user/checkout')} className="save-btn">
                    Check Out
                  </button>
                </div>
              </div>

              <div className="quantity-controls">
                <button 
                  className="quantity-btn"
                  onClick={() => updateQuantity(item?.product?._id, item?.qty - 1)}
                  disabled={item?.qty <= 1}
                >
                  -
                </button>
                <span className="quantity-display">{item?.qty}</span>
                <button 
                  className="quantity-btn"
                  onClick={() => updateQuantity(item?.product?._id, item?.qty + 1)}
                  disabled={item?.qty >= item?.product?.stock}
                >
                  +
                </button>
              </div>

              <div className="item-total">
                <span className="total-price">₹{(item?.price * item?.qty).toFixed(2)}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <div className="summary-card">
            <h3>Order Summary</h3>
            
            <div className="summary-row">
              <span>Subtotal</span>
              <span>₹{calculateSubtotal().toFixed(2)}</span>
            </div>
            
            <div className="summary-row">
              <span>Shipping</span>
              <span className="free-shipping">Free</span>
            </div>
            
            <div className="summary-row">
              <span>Tax</span>
              <span>₹{calculateTax().toFixed(2)}</span>
            </div>
            
            <div className="summary-divider"></div>
            
            <div className="summary-row total">
              <span>Total</span>
              <span>₹{calculateTotal().toFixed(2)}</span>
            </div>

            <button onClick={() => navigate('/user/checkout')} className="checkout-btn">
              Proceed to Checkout
            </button>

            <div className="security-badge">
              <span className="security-icon">🔒</span>
              <span>Secure checkout</span>
            </div>

            <div className="payment-methods">
              <span>We accept:</span>
              <div className="payment-icons">
                <span className="payment-icon">💳</span>
                <span className="payment-icon">📱</span>
                <span className="payment-icon">🏦</span>
              </div>
            </div>
          </div>

          <div className="promo-card">
            <h4>Apply Promo Code</h4>
            <div className="promo-input-group">
              <input 
                type="text" 
                placeholder="Enter promo code"
                className="promo-input"
              />
              <button className="apply-btn">Apply</button>
            </div>
          </div>
        </div>
      </div>

      <div className="recently-viewed">
        <h3>Recently Viewed</h3>
        <div className="recent-items">
          {/* Recently viewed items would go here */}
        </div>
      </div>
    </div>
  );
};

export default Cart;