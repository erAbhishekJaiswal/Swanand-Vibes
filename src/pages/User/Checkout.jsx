import React, { useEffect, useState } from "react";
import "../../CssFiles/User/Checkout.css";
import axios from "axios";
import { getUserId } from "../../utills/authService";
import { placeOrder } from "../../utills/apicall";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import Spinner from "../../components/Spinner";

const Checkout = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    mobile: "",
    address: "",
    apartment: "",
    city: "",
    state: "",
    zipCode: "",
    country: "India",
    itemsPrice: 0,
    shippingPrice: 0,
    taxPrice: 0,
    totalPrice: 0,
    shippingMethod: "standard",
  });

  const userId = getUserId();
  const [errors, setErrors] = useState({});
  const [savedAddresses, setSavedAddresses] = useState({});
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCheckoutData = async () => {
      try {
        setIsLoading(true);
        const [cartResponse, addressResponse] = await Promise.all([
          axios.get(
            `${import.meta.env.VITE_API_URL}/user/cart/${userId}`
          ),
          axios.get(
            `${import.meta.env.VITE_API_URL}/users/${userId}`
          ),
        ]);

        //  const [cartResponse, addressResponse] = await Promise.all([
        //   axios.get(`http://localhost:5000/api/user/cart/${userId}`),
        //   axios.get(`http://localhost:5000/api/users/${userId}`),
        // ]);

        setCartItems(cartResponse.data.data?.items || []);
        setSavedAddresses(addressResponse.data || {});
        // // console.log(addressResponse.data, cartResponse.data);

        // Pre-fill form with user data
        if (addressResponse.data) {
          setFormData((prev) => ({
            ...prev,
            mobile: addressResponse.data.mobile || "",
            address: addressResponse.data.address || "",
            apartment: addressResponse.data.apartment || "",
            city: addressResponse.data.city || "",
            state: addressResponse.data.state || "",
            zipCode: addressResponse.data.zipCode || "",
            country: addressResponse.data.country || "India",
          }));
        }
      } catch (error) {
        console.error("Error fetching checkout data:", error);
        toast.error("Failed to load checkout data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCheckoutData();
  }, [userId]);

  const shippingMethods = [
    {
      id: "standard",
      name: "Delivery",
      price: 40,
      delivery: "5-7 business days",
    },
    {
      id: "self-pickup",
      name: "Self Pickup",
      price: 0,
      delivery: "Pickup Any time",
    },
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      if (!formData.mobile) {
        newErrors.mobile = "Mobile number is required";
      } else if (!/^\d{10}$/.test(formData.mobile)) {
        newErrors.mobile = "Mobile number must be exactly 10 digits";
      }
      if (!formData.address) newErrors.address = "Address is required";
      if (!formData.city) newErrors.city = "City is required";
      if (!formData.state) newErrors.state = "State is required";
      if (!formData.zipCode) newErrors.zipCode = "Zip code is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleAddressNext = async () => {
    try {
      if (!validateStep(1)) return;

      setIsLoading(true);
      const addressPayload = {
        // userId,
        mobile: formData.mobile,
        address: formData.address,
        apartment: formData.apartment,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
        country: formData.country,
      };

      // // console.log(addressPayload);

      // Use consistent API endpoint
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/users/${userId}/address`,
        addressPayload
      );

      // // console.log(res.data);

      if (res.status === 200) {
        // Refresh user data
        const addressResponse = await axios.get(
          `${import.meta.env.VITE_API_URL}/users/${userId}`
        );
        setSavedAddresses(addressResponse.data);
        // // console.log(addressResponse);

        nextStep();
      }
    } catch (error) {
      // console.error("Error saving address:", error);
      toast.error("Failed to save address");
    } finally {
      setIsLoading(false);
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => prev - 1);
  };


  const handleSubmit = async () => {
  try {
    setIsLoading(true);
    const shippingCost = getShippingCost();
    const totalPrice = Math.round(calculateTotal() * 100); // in paise for Razorpay

    if (totalPrice > 50000000) {
      toast.error("Order amount exceeds Razorpay's ₹5,00,000 limit.");
      return;
    }

    // 1. Create Razorpay Order on backend
    const { data: order } = await axios.post(
      `${import.meta.env.VITE_API_URL}/pay/create-order`,
      { amount: totalPrice }
    );

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY || "rzp_live_RempOUaNrGy0lE",
      amount: order.amount,
      currency: order.currency,
      name: "Swanand Vibes",
      description: "Order Payment",
      order_id: order.id,
      handler: async function (response) {
        try {
          // 3. Verify payment with backend
          await axios.post(`${import.meta.env.VITE_API_URL}/pay/verify`, {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          });

          // 4. Place final order with shipping method and cost
          await placeOrder(userId, {
            ...formData,
            cartItems,
            shippingMethod: formData.shippingMethod,
            itemsPrice: calculateSubtotal(),
            shippingPrice: shippingCost, // ✅ Added dynamic shipping
            taxPrice: calculateTax(),
            totalPrice: totalPrice / 100, // back to ₹
            paymentStatus: "Paid",
            paidAt: new Date().toISOString(),
          });

          toast.success("Payment successful, order placed!");
          navigate("/user/orders");
        } catch (error) {
          console.error("Order placement error:", error);
          toast.error("Order placement failed after payment");
        }
      },
      prefill: {
        name: savedAddresses?.name || "Customer",
        email: savedAddresses?.email || "customer@example.com",
        contact: formData.mobile,
      },
      theme: { color: "#3b82f6" },
    };

    const razor = new window.Razorpay(options);
    razor.open();
  } catch (err) {
    console.error("Payment error:", err);
    toast.error("Payment failed. Please try again.");
  } finally {
    setIsLoading(false);
  }
};



  // Get base price (price before tax)
  const getBasePrice = (item) => {
    const taxRate = item?.product?.tax || 0;
    return item.price / (1 + taxRate / 100);
  };

  // Get tax amount from item
  const getTaxAmount = (item) => {
    return item.price - getBasePrice(item);
  };

  // Subtotal (without tax)
  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      const base = getBasePrice(item);
      return total + base * item.qty;
    }, 0);
  };

  // Tax (based on actual product tax)
  const calculateTax = () => {
    return cartItems.reduce((total, item) => {
      const tax = getTaxAmount(item);
      return total + tax * item.qty;
    }, 0);
  };

  // Shipping stays the same
  // const getShippingCost = () => {
  //   const method = shippingMethods.find(
  //     (m) => m.id === formData.shippingMethod
  //   );
  //   return method ? method.price : 0;
  // };

  // ✅ Shipping stays the same
const getShippingCost = () => {
  const method = shippingMethods.find(
    (m) => m.id === formData.shippingMethod
  );
  return method ? method.price : 0;
};

// ✅ Final Total (subtotal + tax + shipping)
const calculateTotal = () => {
  return calculateSubtotal() + calculateTax() + getShippingCost();
};


  // Final Total (subtotal + tax + shipping)
  // const calculateTotal = () => {
  //   return calculateSubtotal() + calculateTax() + getShippingCost();
  // };

  // const calculateSubtotal = () => {
  //   return cartItems.reduce((total, item) => total + item.price * item.qty, 0);
  // };

  // const calculateTax = () => {
  //   return calculateSubtotal() * 0.08; // 8% tax
  // };

  // const getShippingCost = () => {
  //   const method = shippingMethods.find(
  //     (m) => m.id === formData.shippingMethod
  //   );
  //   return method ? method.price : 0;
  // };

  // const calculateTotal = () => {
  //   return calculateSubtotal() + getShippingCost(); //+ calculateTax()
  // };

  if (isLoading) {
    return <Spinner size="lg" />;
  }

  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <h1>Checkout</h1>
        <p>Complete your purchase with confidence</p>
      </div>

      <div className="checkout-content">
        <div className="checkout-steps">
          <div className="steps-container">
            <div className={`step ${currentStep >= 1 ? "active" : ""}`}>
              <div className="step-number">1</div>
              <div className="step-info">
                <span className="step-title">Shipping</span>
                <span className="step-desc">Address details</span>
              </div>
            </div>

            <div className="step-connector"></div>

            <div className={`step ${currentStep >= 2 ? "active" : ""}`}>
              <div className="step-number">2</div>
              <div className="step-info">
                <span className="step-title">Shipping Method</span>
                <span className="step-desc">Delivery options</span>
              </div>
            </div>

            <div className="step-connector"></div>

            <div className={`step ${currentStep >= 3 ? "active" : ""}`}>
              <div className="step-number">3</div>
              <div className="step-info">
                <span className="step-title">Payment</span>
                <span className="step-desc">Secure payment</span>
              </div>
            </div>
          </div>
        </div>

        <div className="checkout-main">
          <div className="checkout-form-container">
            {currentStep === 1 && (
              <div className="form-step">
                <h2>Shipping Information</h2>

                <form className="checkout-form">
                  <div className="form-group">
                    <h2>Full Name: {savedAddresses.name} </h2>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label className="checkout-label" htmlFor="email">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Enter Your email..."
                        value={savedAddresses.email || ""}
                        className={errors.email ? "error" : ""}
                        disabled
                      />
                    </div>
                    <div className="form-group">
                      <label className="checkout-label" htmlFor="mobile">
                        Mobile Number *
                      </label>
                      <input
                        type="tel"
                        id="mobile"
                        name="mobile"
                        placeholder="Enter Mobile Number ..."
                        value={formData.mobile}
                        onChange={handleInputChange}
                        className={errors.mobile ? "error" : ""}
                      />
                      {errors.mobile && (
                        <span className="error-text">{errors.mobile}</span>
                      )}
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="checkout-label" htmlFor="address">
                      Street Address *
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      placeholder="Enter Address..."
                      value={formData.address}
                      onChange={handleInputChange}
                      className={errors.address ? "error" : ""}
                    />
                    {errors.address && (
                      <span className="error-text">{errors.address}</span>
                    )}
                  </div>

                  <div className="form-group">
                    <label className="checkout-label" htmlFor="apartment">
                      Apartment, Suite, etc. (optional)
                    </label>
                    <input
                      type="text"
                      id="apartment"
                      name="apartment"
                      placeholder="Enter Apartment..."
                      value={formData.apartment}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label className="checkout-label" htmlFor="city">
                        City *
                      </label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        placeholder="Enter City..."
                        value={formData.city}
                        onChange={handleInputChange}
                        className={errors.city ? "error" : ""}
                      />
                      {errors.city && (
                        <span className="error-text">{errors.city}</span>
                      )}
                    </div>
                    <div className="form-group">
                      <label className="checkout-label" htmlFor="state">
                        State *
                      </label>
                      <input
                        type="text"
                        id="state"
                        name="state"
                        placeholder="Enter State..."
                        value={formData.state}
                        onChange={handleInputChange}
                        className={errors.state ? "error" : ""}
                      />
                      {errors.state && (
                        <span className="error-text">{errors.state}</span>
                      )}
                    </div>
                    <div className="form-group">
                      <label className="checkout-label" htmlFor="zipCode">
                        ZIP Code *
                      </label>
                      <input
                        type="text"
                        id="zipCode"
                        name="zipCode"
                        placeholder="Enter Pincode..."
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        className={errors.zipCode ? "error" : ""}
                      />
                      {errors.zipCode && (
                        <span className="error-text">{errors.zipCode}</span>
                      )}
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="checkout-label" htmlFor="country">
                      Country
                    </label>
                    <select
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      disabled
                    >
                      <option value="India">India</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <button
                      type="button"
                      className="nav-btn next-btn"
                      onClick={handleAddressNext}
                      disabled={isLoading}
                    >
                      {isLoading ? "Saving..." : "Save Address and Continue"}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {currentStep === 2 && (
              <div className="form-step">
                <h2>Shipping Method</h2>
                <div className="shipping-methods">
                  {shippingMethods.map((method) => (
                    <div
                      key={method.id}
                      className={`shipping-method ${
                        formData.shippingMethod === method.id ? "selected" : ""
                      }`}
                      onClick={() =>
                        handleInputChange({
                          target: { name: "shippingMethod", value: method.id },
                        })
                      }
                    >
                      <div className="method-radio">
                        <div className="radio-indicator">
                          {formData.shippingMethod === method.id && (
                            <div className="radio-dot"></div>
                          )}
                        </div>
                      </div>
                      <div className="method-info">
                        <h4>{method.name}</h4>
                        <p>{method.delivery}</p>
                      </div>
                      <div className="method-price">
                        {method.price === 0
                          ? "Free"
                          : `₹${method.price.toFixed(2)}`}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="checkout-navigation">
                  <button
                    type="button"
                    className="nav-btn prev-btn"
                    onClick={prevStep}
                  >
                    ← Previous
                  </button>
                  <button
                    type="button"
                    className="nav-btn next-btn"
                    onClick={handleSubmit}
                    disabled={isLoading}
                  >
                    {isLoading ? "Processing..." : "Continue to Payment →"}
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="order-summary">
            <div className="summary-card">
              <h3>Order Summary</h3>

              <div className="order-items">
                {cartItems.map((item) => (
                  <div
                    key={item.product?._id || item.id}
                    className="order-item"
                  >
                    <img
                      src={
                        item.image ||
                        "https://via.placeholder.com/60x60/1e293b/ffffff?text=Product"
                      }
                      alt={item.name}
                      className="item-image"
                    />
                    <div className="item-details">
                      <h4>{item.name}</h4>
                      <p>Qty: {item.qty || item.quantity}</p>
                    </div>
                    <div className="item-price">
                      ₹
                      {(
                        (item.price || 0) * (item.qty || item.quantity || 1)
                      ).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="summary-divider"></div>

              <div className="summary-row">
                <span>Subtotal</span>
                <span>₹{calculateSubtotal().toFixed(2)}</span>
              </div>

              <div className="summary-row">
                <span>Shipping</span>
                <span>
                  {getShippingCost() === 0
                    ? "Free"
                    : `₹${getShippingCost().toFixed(2)}`}
                </span>
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

              <div className="security-badge">
                <span className="security-icon">🔒</span>
                <span>Secure SSL encryption</span>
              </div>

              <div className="payment-methods">
                <span>Accepted payment methods:</span>
                <div className="payment-icons">
                  <span className="payment-icon">💳</span>
                  <span className="payment-icon">📱</span>
                  <span className="payment-icon">🏦</span>
                </div>
              </div>
            </div>

            <div className="support-card">
              <h4>Need Help?</h4>
              <p>Our support team is here to help with your order.</p>
              <div className="support-contact">
                <span className="support-icon">📞</span>
                <span>9821611417</span>
              </div>
              <div className="support-contact">
                <span className="support-icon">✉️</span>
                <span>swanandvibes@gmail.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
