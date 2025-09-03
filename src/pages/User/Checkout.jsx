// // Checkout.js
// import React, { useEffect, useState } from 'react';
// import '../../CssFiles/User/Checkout.css';
// import axios from 'axios';
// import {getUserId} from '../../utills/authService';

// const Checkout = () => {
//   const [currentStep, setCurrentStep] = useState(1);
//   const [formData, setFormData] = useState({
//     // Shipping Information
//     firstName: '',
//     lastName: '',
//     email: '',
//     phone: '',
//     address: '',
//     apartment: '',
//     city: '',
//     state: '',
//     zipCode: '',
//     country: 'India',

//     // Shipping Method
//     shippingMethod: 'standard',

//     // Payment Information
//     cardNumber: '',
//     cardName: '',
//     expiryDate: '',
//     cvv: '',
//     saveCard: false,

//     // Billing Address
//     sameAsShipping: true,
//     billingAddress: '',
//     billingCity: '',
//     billingState: '',
//     billingZip: ''
//   });
//   const userId = getUserId();

//   const [errors, setErrors] = useState({});
//   const [savedAddresses, setSavedAddresses] = useState([]);
//   const [cartItems, setCartItems] = useState([
//     {
//       id: 1,
//       name: "Quantum VR Headset",
//       price: 499.99,
//       quantity: 1,
//       image: "https://via.placeholder.com/60x60/1e293b/ffffff?text=VR"
//     },
//     {
//       id: 2,
//       name: "Neural Smartwatch",
//       price: 349.99,
//       quantity: 2,
//       image: "https://via.placeholder.com/60x60/1e293b/ffffff?text=Watch"
//     }
//   ]);

//   useEffect(() => {
//     // get cart from database
//     const fetchCart = async () => {
//       const [cartResponse, addressResponse] = await Promise.all(
//         [
//           axios.get(`http://localhost:5000/api/user/cart/${userId}`),
//           axios.get(`http://localhost:5000/api/users/address/${userId}`)
//         ]);
//       const data = cartResponse.data.data.items;
//       console.log({address: addressResponse.data, cart: data});
//       setCartItems(data);
//       // setAddress(addressResponse.data);
//       setSavedAddresses(addressResponse.data || []);
//     };
//     fetchCart();
//   }, []);

//   // useEffect(() => {
//   //   // get user address from database
//   //   const fetchAddress = async () => {
//   //     const response = await axios.get(`http://localhost:5000/api/user/address/${userId}`);
//   //     const data = response.data;
//   //     console.log(data);
//   //     setAddress(data);
//   //   };
//   //   fetchAddress();
//   // }, []);

//   // Sample cart items
//   // const cartItems = [
//   //   {
//   //     id: 1,
//   //     name: "Quantum VR Headset",
//   //     price: 499.99,
//   //     quantity: 1,
//   //     image: "https://via.placeholder.com/60x60/1e293b/ffffff?text=VR"
//   //   },
//   //   {
//   //     id: 2,
//   //     name: "Neural Smartwatch",
//   //     price: 349.99,
//   //     quantity: 2,
//   //     image: "https://via.placeholder.com/60x60/1e293b/ffffff?text=Watch"
//   //   }
//   // ];

//   const shippingMethods = [
//     {
//       id: 'standard',
//       name: 'Standard Shipping',
//       price: 0,
//       delivery: '5-7 business days',
//       selected: true
//     },
//     {
//       id: 'express',
//       name: 'Express Shipping',
//       price: 9.99,
//       delivery: '2-3 business days',
//       selected: false
//     },
//     {
//       id: 'priority',
//       name: 'Priority Shipping',
//       price: 19.99,
//       delivery: '1-2 business days',
//       selected: false
//     }
//   ];

//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value
//     }));

//     // Clear error when field is edited
//     if (errors[name]) {
//       setErrors(prev => ({ ...prev, [name]: '' }));
//     }
//   };

//   const validateStep = (step) => {
//     const newErrors = {};

//     if (step === 1) {
//       if (!formData.firstName) newErrors.firstName = 'First name is required';
//       if (!formData.lastName) newErrors.lastName = 'Last name is required';
//       if (!formData.email) newErrors.email = 'Email is required';
//       else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
//       if (!formData.phone) newErrors.phone = 'Phone number is required';
//       if (!formData.address) newErrors.address = 'Address is required';
//       if (!formData.city) newErrors.city = 'City is required';
//       if (!formData.state) newErrors.state = 'State is required';
//       if (!formData.zipCode) newErrors.zipCode = 'Zip code is required';
//     }

//     if (step === 3) {
//       if (!formData.cardNumber) newErrors.cardNumber = 'Card number is required';
//       else if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ''))) newErrors.cardNumber = 'Card number must be 16 digits';
//       if (!formData.cardName) newErrors.cardName = 'Cardholder name is required';
//       if (!formData.expiryDate) newErrors.expiryDate = 'Expiry date is required';
//       else if (!/^\d{2}\/\d{2}$/.test(formData.expiryDate)) newErrors.expiryDate = 'Use format MM/YY';
//       if (!formData.cvv) newErrors.cvv = 'CVV is required';
//       else if (!/^\d{3,4}$/.test(formData.cvv)) newErrors.cvv = 'CVV must be 3-4 digits';
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const nextStep = () => {
//     if (validateStep(currentStep)) {
//       setCurrentStep(prev => prev + 1);
//     }
//   };

//   // const handleAddressNext = async() => {
//   //   console.log(formData);

//   //   const res = await axios.put('http://localhost:5000/api/user/address', formData);
//   //   if (res.status === 200) {
//   //     if (validateStep(currentStep)) {
//   //       setCurrentStep(prev => prev + 1);
//   //     }
//   //   }
//   // };

//   const handleAddressNext = async () => {
//   try {
//     // only pick address-related fields to send
//     const addressPayload = {
//       userId,
//       firstName: formData.firstName,
//       lastName: formData.lastName,
//       email: formData.email,
//       phone: formData.phone,
//       address: formData.address,
//       apartment: formData.apartment,
//       city: formData.city,
//       state: formData.state,
//       zipCode: formData.zipCode,
//       country: formData.country,
//     };
//     console.log(addressPayload);

//     // save to DB
//     const res = await axios.put("http://localhost:5000/api/user/address", addressPayload);

//     if (res.status === 200) {
//       console.log("Address saved:", res.data);

//       // update local state
//       setAddress(res.data);

//       // move to next step if valid
//       if (validateStep(currentStep)) {
//         setCurrentStep((prev) => prev + 1);
//       }
//     }
//   } catch (error) {
//     console.error("Error saving address:", error);
//   }
// };

//   const prevStep = () => {
//     setCurrentStep(prev => prev - 1);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (validateStep(3)) {
//       // Process order submission
//       alert('Order placed successfully!');
//       // Here you would typically send the order to your backend
//     }
//   };

//   const calculateSubtotal = () => {
//     return cartItems.reduce((total, item) => total + (item.price * item.qty), 0);
//   };

//   const calculateTax = () => {
//     return calculateSubtotal() * 0.08; // 8% tax
//   };

//   const getShippingCost = () => {
//     const method = shippingMethods.find(m => m.id === formData.shippingMethod);
//     return method ? method.price : 0;
//   };

//   const calculateTotal = () => {
//     return calculateSubtotal() + calculateTax() + getShippingCost();
//   };

//   const formatCardNumber = (value) => {
//     return value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
//   };

//     // Save new address
//   const handleSaveAddress = async () => {
//     try {
//       const payload = { userId, ...formData };
//       const res = await axios.put(
//         "http://localhost:5000/api/user/address",
//         payload
//       );

//       if (res.status === 200) {
//         setSavedAddresses((prev) => [...prev, res.data]);
//         setSelectedAddress(res.data);
//         setCurrentStep(2);
//       }
//     } catch (err) {
//       console.error("Error saving address:", err);
//     }
//   };

//   return (
//     <div className="checkout-container">
//       <div className="checkout-header">
//         <h1>Checkout</h1>
//         <p>Complete your purchase with confidence</p>
//       </div>

//       <div className="checkout-content">
//         <div className="checkout-steps">
//           <div className="steps-container">
//             <div className={`step ${currentStep >= 1 ? 'active' : ''}`}>
//               <div className="step-number">1</div>
//               <div className="step-info">
//                 <span className="step-title">Shipping</span>
//                 <span className="step-desc">Address details</span>
//               </div>
//             </div>

//             <div className="step-connector"></div>

//             <div className={`step ${currentStep >= 2 ? 'active' : ''}`}>
//               <div className="step-number">2</div>
//               <div className="step-info">
//                 <span className="step-title">Shipping Method</span>
//                 <span className="step-desc">Delivery options</span>
//               </div>
//             </div>

//             <div className="step-connector"></div>

//             <div className={`step ${currentStep >= 3 ? 'active' : ''}`}>
//               <div className="step-number">3</div>
//               <div className="step-info">
//                 <span className="step-title">Payment</span>
//                 <span className="step-desc">Secure payment</span>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="checkout-main">
//           <div className="checkout-form-container">
//             {currentStep === 1 && (
//            <>

//               {savedAddresses && (
//                 <div className="address-summary">
//                   <h3>Shipping Address</h3>
//                   {/* <p>{address}</p> */}
//                 </div>
//               )}

//               <div className="form-step">
//                 <h2>Shipping Information</h2>

//               {/* Show saved addresses */}
//               {savedAddresses?.length > 0 && (
//                 <div className="saved-addresses">
//                   <h4>Select from saved addresses:</h4>
//                   {savedAddresses?.map((addr, idx) => (
//                     <div
//                       key={idx}
//                       className={`saved-address ${
//                         selectedAddress?._id === addr._id ? "selected" : ""
//                       }`}
//                       onClick={() => setSelectedAddress(addr)}
//                     >
//                       <p>
//                         {addr.firstName} {addr.lastName}
//                       </p>
//                       <p>
//                         {addr.address}, {addr.city}, {addr.state},{" "}
//                         {addr.zipCode}
//                       </p>
//                       <p>{addr.phone}</p>
//                     </div>
//                   ))}
//                   <button
//                     className="nav-btn next-btn"
//                     onClick={() => setCurrentStep(2)}
//                     disabled={!selectedAddress}
//                   >
//                     Continue with Selected Address →
//                   </button>
//                 </div>
//               )}

//                 <form className="checkout-form">
//                   <div className="form-row">
//                     <div className="form-group">
//                       <label htmlFor="firstName">First Name *</label>
//                       <input
//                         type="text"
//                         id="firstName"
//                         name="firstName"
//                         value={formData.firstName}
//                         onChange={handleInputChange}
//                         className={errors.firstName ? 'error' : ''}
//                       />
//                       {errors.firstName && <span className="error-text">{errors.firstName}</span>}
//                     </div>
//                     <div className="form-group">
//                       <label htmlFor="lastName">Last Name *</label>
//                       <input
//                         type="text"
//                         id="lastName"
//                         name="lastName"
//                         value={formData.lastName}
//                         onChange={handleInputChange}
//                         className={errors.lastName ? 'error' : ''}
//                       />
//                       {errors.lastName && <span className="error-text">{errors.lastName}</span>}
//                     </div>
//                   </div>

//                   <div className="form-row">
//                     <div className="form-group">
//                       <label htmlFor="email">Email Address *</label>
//                       <input
//                         type="email"
//                         id="email"
//                         name="email"
//                         value={formData.email}
//                         onChange={handleInputChange}
//                         className={errors.email ? 'error' : ''}
//                       />
//                       {errors.email && <span className="error-text">{errors.email}</span>}
//                     </div>
//                     <div className="form-group">
//                       <label htmlFor="phone">Phone Number *</label>
//                       <input
//                         type="tel"
//                         id="phone"
//                         name="phone"
//                         value={formData.phone}
//                         onChange={handleInputChange}
//                         className={errors.phone ? 'error' : ''}
//                       />
//                       {errors.phone && <span className="error-text">{errors.phone}</span>}
//                     </div>
//                   </div>

//                   <div className="form-group">
//                     <label htmlFor="address">Street Address *</label>
//                     <input
//                       type="text"
//                       id="address"
//                       name="address"
//                       value={formData.address}
//                       onChange={handleInputChange}
//                       className={errors.address ? 'error' : ''}
//                     />
//                     {errors.address && <span className="error-text">{errors.address}</span>}
//                   </div>

//                   <div className="form-group">
//                     <label htmlFor="apartment">Apartment, Suite, etc. (optional)</label>
//                     <input
//                       type="text"
//                       id="apartment"
//                       name="apartment"
//                       value={formData.apartment}
//                       onChange={handleInputChange}
//                     />
//                   </div>

//                   <div className="form-row">
//                     <div className="form-group">
//                       <label htmlFor="city">City *</label>
//                       <input
//                         type="text"
//                         id="city"
//                         name="city"
//                         value={formData.city}
//                         onChange={handleInputChange}
//                         className={errors.city ? 'error' : ''}
//                       />
//                       {errors.city && <span className="error-text">{errors.city}</span>}
//                     </div>
//                     <div className="form-group">
//                       <label htmlFor="state">State *</label>
//                       <input
//                         type="text"
//                         id="state"
//                         name="state"
//                         value={formData.state}
//                         onChange={handleInputChange}
//                         className={errors.state ? 'error' : ''}
//                       />
//                       {errors.state && <span className="error-text">{errors.state}</span>}
//                     </div>
//                     <div className="form-group">
//                       <label htmlFor="zipCode">ZIP Code *</label>
//                       <input
//                         type="text"
//                         id="zipCode"
//                         name="zipCode"
//                         value={formData.zipCode}
//                         onChange={handleInputChange}
//                         className={errors.zipCode ? 'error' : ''}
//                       />
//                       {errors.zipCode && <span className="error-text">{errors.zipCode}</span>}
//                     </div>
//                   </div>

//                   <div className="form-group">
//                     <label htmlFor="country">Country</label>
//                     <select
//                       id="country"
//                       name="country"
//                       value={formData.country}
//                       onChange={handleInputChange}
//                       disabled
//                     >
//                       <option value="India">India</option>
//                       {/* <option value="Canada">Canada</option>
//                       <option value="United Kingdom">United Kingdom</option>
//                       <option value="Australia">Australia</option> */}
//                     </select>

//                   </div>
//                   <br />
//                   <div className='form-group'>
//                     <button type="button" className='nav-btn next-btn' onClick={handleAddressNext}>
//                       Save Address and Continue
//                     </button>
//                   </div>
//                 </form>
//               </div>
//             </>
//             )}

//             {currentStep === 2 && (
//               <div className="form-step">
//                 <h2>Shipping Method</h2>
//                 <div className="shipping-methods">
//                   {shippingMethods?.map(method => (
//                     <div
//                       key={method.id}
//                       className={`shipping-method ${formData.shippingMethod === method.id ? 'selected' : ''}`}
//                       onClick={() => handleInputChange({ target: { name: 'shippingMethod', value: method.id } })}
//                     >
//                       <div className="method-radio">
//                         <div className="radio-indicator">
//                           {formData.shippingMethod === method.id && <div className="radio-dot"></div>}
//                         </div>
//                       </div>
//                       <div className="method-info">
//                         <h4>{method.name}</h4>
//                         <p>{method.delivery}</p>
//                       </div>
//                       <div className="method-price">
//                         {method.price === 0 ? 'Free' : `$${method.price.toFixed(2)}`}
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {currentStep === 3 && (
//               <div className="form-step">
//                 <h2>Payment Information</h2>
//                 <form className="checkout-form">
//                   <div className="form-group">
//                     <label htmlFor="cardNumber">Card Number *</label>
//                     <input
//                       type="text"
//                       id="cardNumber"
//                       name="cardNumber"
//                       value={formatCardNumber(formData.cardNumber)}
//                       onChange={handleInputChange}
//                       placeholder="1234 5678 9012 3456"
//                       maxLength="19"
//                       className={errors.cardNumber ? 'error' : ''}
//                     />
//                     {errors.cardNumber && <span className="error-text">{errors.cardNumber}</span>}
//                   </div>

//                   <div className="form-group">
//                     <label htmlFor="cardName">Cardholder Name *</label>
//                     <input
//                       type="text"
//                       id="cardName"
//                       name="cardName"
//                       value={formData.cardName}
//                       onChange={handleInputChange}
//                       placeholder="John Doe"
//                       className={errors.cardName ? 'error' : ''}
//                     />
//                     {errors.cardName && <span className="error-text">{errors.cardName}</span>}
//                   </div>

//                   <div className="form-row">
//                     <div className="form-group">
//                       <label htmlFor="expiryDate">Expiry Date *</label>
//                       <input
//                         type="text"
//                         id="expiryDate"
//                         name="expiryDate"
//                         value={formData.expiryDate}
//                         onChange={handleInputChange}
//                         placeholder="MM/YY"
//                         maxLength="5"
//                         className={errors.expiryDate ? 'error' : ''}
//                       />
//                       {errors.expiryDate && <span className="error-text">{errors.expiryDate}</span>}
//                     </div>
//                     <div className="form-group">
//                       <label htmlFor="cvv">CVV *</label>
//                       <input
//                         type="text"
//                         id="cvv"
//                         name="cvv"
//                         value={formData.cvv}
//                         onChange={handleInputChange}
//                         placeholder="123"
//                         maxLength="4"
//                         className={errors.cvv ? 'error' : ''}
//                       />
//                       {errors.cvv && <span className="error-text">{errors.cvv}</span>}
//                     </div>
//                   </div>

//                   <div className="form-checkbox">
//                     <label className="checkbox-container">
//                       <input
//                         type="checkbox"
//                         name="saveCard"
//                         checked={formData.saveCard}
//                         onChange={handleInputChange}
//                       />
//                       <span className="checkmark"></span>
//                       Save card for future purchases
//                     </label>
//                   </div>

//                   <div className="form-checkbox">
//                     <label className="checkbox-container">
//                       <input
//                         type="checkbox"
//                         name="sameAsShipping"
//                         checked={formData.sameAsShipping}
//                         onChange={handleInputChange}
//                       />
//                       <span className="checkmark"></span>
//                       Billing address same as shipping
//                     </label>
//                   </div>

//                   {!formData.sameAsShipping && (
//                     <div className="billing-address">
//                       <h4>Billing Address</h4>
//                       <div className="form-group">
//                         <label htmlFor="billingAddress">Billing Address</label>
//                         <input
//                           type="text"
//                           id="billingAddress"
//                           name="billingAddress"
//                           value={formData.billingAddress}
//                           onChange={handleInputChange}
//                         />
//                       </div>
//                       <div className="form-row">
//                         <div className="form-group">
//                           <label htmlFor="billingCity">City</label>
//                           <input
//                             type="text"
//                             id="billingCity"
//                             name="billingCity"
//                             value={formData.billingCity}
//                             onChange={handleInputChange}
//                           />
//                         </div>
//                         <div className="form-group">
//                           <label htmlFor="billingState">State</label>
//                           <input
//                             type="text"
//                             id="billingState"
//                             name="billingState"
//                             value={formData.billingState}
//                             onChange={handleInputChange}
//                           />
//                         </div>
//                         <div className="form-group">
//                           <label htmlFor="billingZip">ZIP Code</label>
//                           <input
//                             type="text"
//                             id="billingZip"
//                             name="billingZip"
//                             value={formData.billingZip}
//                             onChange={handleInputChange}
//                           />
//                         </div>
//                       </div>
//                     </div>
//                   )}
//                 </form>
//               </div>
//             )}

//             <div className="checkout-navigation">
//               {currentStep > 1 && (
//                 <button type="button" className="nav-btn prev-btn" onClick={prevStep}>
//                   ← Previous
//                 </button>
//               )}
//               {currentStep < 3 ? (
//                 <button type="button" className="nav-btn next-btn" onClick={nextStep}>
//                   Continue to {currentStep === 1 ? 'Shipping' : 'Payment'} →
//                 </button>
//               ) : (
//                 <button type="button" className="nav-btn submit-btn" onClick={handleSubmit}>
//                   Place Order
//                 </button>
//               )}
//             </div>
//           </div>

//           <div className="order-summary">
//             <div className="summary-card">
//               <h3>Order Summary</h3>

//               <div className="order-items">
//                 {cartItems?.map(item => (
//                   <div key={item?.product?._id} className="order-item">
//                     <img src={item.image} alt={item.name} className="item-image" />
//                     <div className="item-details">
//                       <h4>{item.name}</h4>
//                       <p>Qty: {item.qty}</p>
//                     </div>
//                     <div className="item-price">₹{(item.price * item.qty).toFixed(2)}</div>
//                   </div>
//                 ))}
//               </div>

//               <div className="summary-divider"></div>

//               <div className="summary-row">
//                 <span>Subtotal</span>
//                 <span>₹{calculateSubtotal().toFixed(2)}</span>
//               </div>

//               <div className="summary-row">
//                 <span>Shipping</span>
//                 <span>{getShippingCost() === 0 ? 'Free' : `$${getShippingCost().toFixed(2)}`}</span>
//               </div>

//               <div className="summary-row">
//                 <span>Tax</span>
//                 <span>₹{calculateTax().toFixed(2)}</span>
//               </div>

//               <div className="summary-divider"></div>

//               <div className="summary-row total">
//                 <span>Total</span>
//                 <span>₹{calculateTotal().toFixed(2)}</span>
//               </div>

//               <div className="security-badge">
//                 <span className="security-icon">🔒</span>
//                 <span>Secure SSL encryption</span>
//               </div>

//               <div className="payment-methods">
//                 <span>Accepted payment methods:</span>
//                 <div className="payment-icons">
//                   <span className="payment-icon">💳</span>
//                   <span className="payment-icon">📱</span>
//                   <span className="payment-icon">🏦</span>
//                 </div>
//               </div>
//             </div>

//             <div className="support-card">
//               <h4>Need Help?</h4>
//               <p>Our support team is here to help with your order.</p>
//               <div className="support-contact">
//                 <span className="support-icon">📞</span>
//                 <span>1-800-123-4567</span>
//               </div>
//               <div className="support-contact">
//                 <span className="support-icon">✉️</span>
//                 <span>support@nexus.com</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Checkout;

// Checkout.js
import React, { useEffect, useState } from "react";
import "../../CssFiles/User/Checkout.css";
import axios from "axios";
import { getUserId } from "../../utills/authService";
import {placeOrder} from '../../utills/apicall';
import {useNavigate} from 'react-router-dom';
import {toast} from 'react-hot-toast';
import Spinner from "../../Components/Spinner";
const Checkout = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Shipping Information
    // firstName: "",
    // lastName: '',
    // email: "",
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


    // Shipping Method
    shippingMethod: "standard",

    // Payment Information
    // cardNumber: "",
    // cardName: "",
    // expiryDate: "",
    // cvv: "",
    // saveCard: false,

    // Billing Address
    // sameAsShipping: true,
    // billingAddress: "",
    // billingCity: "",
    // billingState: "",
    // billingZip: "",
  });

  const userId = getUserId();
  const [errors, setErrors] = useState({});
  const [savedAddresses, setSavedAddresses] = useState();
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch cart items and saved addresses
    const fetchCheckoutData = async () => {
      try {
        setIsLoading(true);
        const [cartResponse, addressResponse] = await Promise.all([
          axios.get(`https://swanand-vibes-backend.vercel.app/api/user/cart/${userId}`),
          axios.get(`https://swanand-vibes-backend.vercel.app/api/users/${userId}`),
        ]);

        setCartItems(cartResponse.data.data?.items || []);
        setSavedAddresses(addressResponse.data || []);
        console.log(addressResponse.data);

        // If user has saved addresses, pre-select the first one
        if (addressResponse.data && addressResponse.data.length > 0) {
          setSelectedAddress(addressResponse.data);
          // Pre-fill form with the first address
          const firstAddress = addressResponse.data;
          setFormData((prev) => ({
            ...prev,
            // firstName: firstAddress.firstName || "",
            // lastName: firstAddress.lastName || '',
            // email: firstAddress.email || "",
            mobile: firstAddress.mobile || "",
            address: firstAddress.address || "",
            apartment: firstAddress.apartment || "",
            city: firstAddress.city || "",
            state: firstAddress.state || "",
            zipCode: firstAddress.zipCode || "",
            country: firstAddress.country || "India",
          }));
        }
      } catch (error) {
        console.error("Error fetching checkout data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCheckoutData();
  }, [userId]);

  const shippingMethods = [
    {
      id: "standard",
      name: "Standard Shipping",
      price: 0,
      delivery: "5-7 business days",
      selected: true,
    },
    {
      id: "express",
      name: "Express Shipping",
      price: 9.99,
      delivery: "2-3 business days",
      selected: false,
    },
    {
      id: "priority",
      name: "Priority Shipping",
      price: 19.99,
      delivery: "1-2 business days",
      selected: false,
    },
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear error when field is edited
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      if (!formData.mobile) newErrors.mobile = "Mobile number is required";
      if (!formData.address) newErrors.address = "Address is required";
      if (!formData.city) newErrors.city = "City is required";
      if (!formData.state) newErrors.state = "State is required";
      if (!formData.zipCode) newErrors.zipCode = "Zip code is required";
    }

    // if (step === 3) {
    //   if (!formData.cardNumber)
    //     newErrors.cardNumber = "Card number is required";
    //   else if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, "")))
    //     newErrors.cardNumber = "Card number must be 16 digits";
    //   if (!formData.cardName)
    //     newErrors.cardName = "Cardholder name is required";
    //   if (!formData.expiryDate)
    //     newErrors.expiryDate = "Expiry date is required";
    //   else if (!/^\d{2}\/\d{2}$/.test(formData.expiryDate))
    //     newErrors.expiryDate = "Use format MM/YY";
    //   if (!formData.cvv) newErrors.cvv = "CVV is required";
    //   else if (!/^\d{3,4}$/.test(formData.cvv))
    //     newErrors.cvv = "CVV must be 3-4 digits";
    // }

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
      setIsLoading(true);
      // only pick address-related fields to send
      const addressPayload = {
        userId,
        // firstName: formData.firstName,
        // lastName: formData.lastName,
        // email: formData.email,
        mobile: formData.mobile,
        address: formData.address,
        apartment: formData.apartment,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
        country: formData.country,
      };
      console.log(addressPayload);

      
      // save to DB
      const res = await axios.put(
        `https://swanand-vibes-backend.vercel.app/api/users/${userId}`,
        addressPayload
      );

      if (res.status === 200) {
        console.log("Address saved:", res.data);
        // Refresh saved addresses
        const addressResponse = await axios.get(
          `https://swanand-vibes-backend.vercel.app/api/users/address/${userId}`
        );
        setSavedAddresses(addressResponse.data);

        setIsLoading(false);
        nextStep();
      }
    } catch (error) {
      console.error("Error saving address:", error);
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    if (validateStep(2)) {
      // Process order submission
      console.log("Order submitted:", {
        ...formData,
        cartItems,
        shippingMethod: formData.shippingMethod,
        itemsPrice: calculateSubtotal(),
        shippingPrice: getShippingCost(),
        taxPrice: calculateTax(),
        totalPrice: calculateTotal(),
      });
      const totalPrice = calculateTotal();
      const shippingPrice = getShippingCost();
      const taxPrice = calculateTax();

      const orderResponse = await placeOrder(userId, {
        ...formData,
        cartItems,
        shippingMethod: formData.shippingMethod,
        itemsPrice: calculateSubtotal(),
        shippingPrice: shippingPrice,
        taxPrice: taxPrice,
        totalPrice: totalPrice,
      });

      // axios.post(
      //   `http://localhost:5000/api/order/${userId}`,
      //   {
      //     ...formData,
      //     cartItems,
      //     shippingMethod: formData.shippingMethod,
      //     itemsPrice: calculateSubtotal(),
      //     shippingPrice: shippingPrice,
      //     taxPrice: taxPrice,
      //     totalPrice: totalPrice,
      //   }
      // );

      console.log("Order response:", orderResponse.data);
      setIsLoading(false);
      toast.success("Order placed successfully!");
      // alert("Order placed successfully!");
      navigate('/user/orders');

      // Here you would typically send the order to your backend
    }
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.qty, 0);
  };

  const calculateTax = () => {
    return calculateSubtotal() * 0.08; // 8% tax
  };

  const getShippingCost = () => {
    const method = shippingMethods.find(
      (m) => m.id === formData.shippingMethod
    );
    return method ? method.price : 0;
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax() + getShippingCost();
  };

  // const formatCardNumber = (value) => {
  //   return value
  //     .replace(/\s/g, "")
  //     .replace(/(\d{4})/g, "$1 ")
  //     .trim();
  // };

  // Handle address selection
  const handleAddressSelect = (address) => {
    setSelectedAddress(address);
    // Pre-fill form with selected address
    setFormData((prev) => ({
      ...prev,
      // firstName: address.firstName || "",
      // lastName: address.lastName || '',
      email: address.email || "",
      mobile: address.mobile || "",
      address: address.address || "",
      apartment: address.apartment || "",
      city: address.city || "",
      state: address.state || "",
      zipCode: address.zipCode || "",
      country: address.country || "India",
    }));
  };

  if (isLoading) {
    return <Spinner size="lg" />; // Show loading spinner while fetching data
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

                {/* Show saved addresses if available
                <div
                  className={`address-option ${
                    selectedAddress === savedAddresses.address ? "selected" : ""
                  }`}
                  onClick={() => handleAddressSelect(savedAddresses)}
                >
                  <div className="address-radio">
                    <div className="radio-indicator">
                      {selectedAddress === savedAddresses.address && (
                        <div className="radio-dot"></div>
                      )}
                    </div>
                  </div>
                  <div className="address-details">
                    <p>
                      <strong>
                        {savedAddresses.firstName} {savedAddresses.lastName}
                      </strong>
                    </p>
                    <p>
                      {savedAddresses.address},{" "}
                      {savedAddresses.apartment &&
                        `${savedAddresses.apartment}, `}
                      {savedAddresses.city}, {savedAddresses.state}{" "}
                      {savedAddresses.zipCode}
                    </p>
                    <p>{savedAddresses.country}</p>
                    <p>{savedAddresses.mobile}</p>
                    <p>{savedAddresses.email}</p>
                  </div>
                </div> */}

                {/* Saved Address Card */}
                <div
                  className={`address-option ${
                    selectedAddress === savedAddresses.address ? "selected" : ""
                  }`}
                  onClick={() => handleAddressSelect(savedAddresses)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) =>
                    e.key === "Enter" && handleAddressSelect(savedAddresses)
                  }
                >
                  <div className="address-radio">
                    <div className="radio-indicator">
                      {selectedAddress === savedAddresses.address && (
                        <div className="radio-dot"></div>
                      )}
                    </div>
                  </div>
                  <div className="address-details">
                    <p className="address-name">
                      <strong>
                        {savedAddresses.firstName} {savedAddresses.lastName}
                      </strong>
                    </p>
                    <p className="address-line">
                      {savedAddresses.address}
                      {savedAddresses.apartment &&
                        `, ${savedAddresses.apartment}`}
                    </p>
                    <p className="address-line">
                      {savedAddresses.city}, {savedAddresses.state}{" "}
                      {savedAddresses.zipCode}
                    </p>
                    <p className="address-country">{savedAddresses.country}</p>
                    <p className="address-mobile">{savedAddresses.mobile}</p>
                    <p className="address-email">{savedAddresses.email}</p>
                  </div>
                </div>

                {/* {savedAddresses.length > 0 && (
                  <div className="saved-addresses">
                    <h3>Select a Saved Address</h3>
                    {savedAddresses.map((address, index) => (
                      <div 
                        key={index} 
                        className={`address-option ${selectedAddress === address ? 'selected' : ''}`}
                        onClick={() => handleAddressSelect(address)}
                      >
                        <div className="address-radio">
                          <div className="radio-indicator">
                            {selectedAddress === address && <div className="radio-dot"></div>}
                          </div>
                        </div>
                        <div className="address-details">
                          <p><strong>{address.firstName} {address.lastName}</strong></p>
                          <p>{address.address}, {address.apartment && `${address.apartment}, `}{address.city}, {address.state} {address.zipCode}</p>
                          <p>{address.country}</p>
                          <p>{address.phone}</p>
                          <p>{address.email}</p>
                        </div>
                      </div>
                    ))}
                    <div className="address-divider">
                      <span>Or enter a new address</span>
                    </div>
                  </div>
                )} */}

                <form className="checkout-form">
                  <div className="form-row">
                    <div className="form-group">
                      <h2>Full Name: {savedAddresses.name} </h2>
                      {/* <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={savedAddresses.name}
                        onChange={handleInputChange}
                        className={errors.firstName ? "error" : ""}
                        disabled
                      />
                      {errors.firstName && (
                        <span className="error-text">{errors.firstName}</span>
                      )} */}
                    </div>
                    {/* <div className="form-group">
                      <label htmlFor="lastName">Last Name *</label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className={errors.lastName ? 'error' : ''}
                        disabled
                      />
                      {errors.lastName && <span className="error-text">{errors.lastName}</span>}
                    </div> */}
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="email">Email Address *</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email || savedAddresses.email}
                        onChange={handleInputChange}
                        className={errors.email ? "error" : ""}
                        disabled
                      />
                      {errors.email && (
                        <span className="error-text">{errors.email}</span>
                      )}
                    </div>
                    <div className="form-group">
                      <label htmlFor="mobile">Mobile Number *</label>
                      <input
                        type="tel"
                        id="mobile"
                        name="mobile"
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
                    <label htmlFor="address">Street Address *</label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className={errors.address ? "error" : ""}
                    />
                    {errors.address && (
                      <span className="error-text">{errors.address}</span>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="apartment">
                      Apartment, Suite, etc. (optional)
                    </label>
                    <input
                      type="text"
                      id="apartment"
                      name="apartment"
                      value={formData.apartment}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="city">City *</label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className={errors.city ? "error" : ""}
                      />
                      {errors.city && (
                        <span className="error-text">{errors.city}</span>
                      )}
                    </div>
                    <div className="form-group">
                      <label htmlFor="state">State *</label>
                      <input
                        type="text"
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        className={errors.state ? "error" : ""}
                      />
                      {errors.state && (
                        <span className="error-text">{errors.state}</span>
                      )}
                    </div>
                    <div className="form-group">
                      <label htmlFor="zipCode">ZIP Code *</label>
                      <input
                        type="text"
                        id="zipCode"
                        name="zipCode"
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
                    <label htmlFor="country">Country</label>
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
                    >
                      {savedAddresses.length > 0
                        ? "Continue with This Address"
                        : "Save Address and Continue"}
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
                          : `$${method.price.toFixed(2)}`}
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
                  >
                    Continue to Payment →
                  </button>
                </div>
              </div>
            )}

            {/* {currentStep === 3 && (
              <div className="form-step">
                <h2>Payment Information</h2>
                <form className="checkout-form">
                  <div className="form-group">
                    <label htmlFor="cardNumber">Card Number *</label>
                    <input
                      type="text"
                      id="cardNumber"
                      name="cardNumber"
                      value={formatCardNumber(formData.cardNumber)}
                      onChange={handleInputChange}
                      placeholder="1234 5678 9012 3456"
                      maxLength="19"
                      className={errors.cardNumber ? "error" : ""}
                    />
                    {errors.cardNumber && (
                      <span className="error-text">{errors.cardNumber}</span>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="cardName">Cardholder Name *</label>
                    <input
                      type="text"
                      id="cardName"
                      name="cardName"
                      value={formData.cardName}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                      className={errors.cardName ? "error" : ""}
                    />
                    {errors.cardName && (
                      <span className="error-text">{errors.cardName}</span>
                    )}
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="expiryDate">Expiry Date *</label>
                      <input
                        type="text"
                        id="expiryDate"
                        name="expiryDate"
                        value={formData.expiryDate}
                        onChange={handleInputChange}
                        placeholder="MM/YY"
                        maxLength="5"
                        className={errors.expiryDate ? "error" : ""}
                      />
                      {errors.expiryDate && (
                        <span className="error-text">{errors.expiryDate}</span>
                      )}
                    </div>
                    <div className="form-group">
                      <label htmlFor="cvv">CVV *</label>
                      <input
                        type="text"
                        id="cvv"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        placeholder="123"
                        maxLength="4"
                        className={errors.cvv ? "error" : ""}
                      />
                      {errors.cvv && (
                        <span className="error-text">{errors.cvv}</span>
                      )}
                    </div>
                  </div>

                  <div className="form-checkbox">
                    <label className="checkbox-container">
                      <input
                        type="checkbox"
                        name="saveCard"
                        checked={formData.saveCard}
                        onChange={handleInputChange}
                      />
                      <span className="checkmark"></span>
                      Save card for future purchases
                    </label>
                  </div>

                  <div className="form-checkbox">
                    <label className="checkbox-container">
                      <input
                        type="checkbox"
                        name="sameAsShipping"
                        checked={formData.sameAsShipping}
                        onChange={handleInputChange}
                      />
                      <span className="checkmark"></span>
                      Billing address same as shipping
                    </label>
                  </div>

                  {!formData.sameAsShipping && (
                    <div className="billing-address">
                      <h4>Billing Address</h4>
                      <div className="form-group">
                        <label htmlFor="billingAddress">Billing Address</label>
                        <input
                          type="text"
                          id="billingAddress"
                          name="billingAddress"
                          value={formData.billingAddress}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="form-row">
                        <div className="form-group">
                          <label htmlFor="billingCity">City</label>
                          <input
                            type="text"
                            id="billingCity"
                            name="billingCity"
                            value={formData.billingCity}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="billingState">State</label>
                          <input
                            type="text"
                            id="billingState"
                            name="billingState"
                            value={formData.billingState}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="billingZip">ZIP Code</label>
                          <input
                            type="text"
                            id="billingZip"
                            name="billingZip"
                            value={formData.billingZip}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </form>

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
                    className="nav-btn submit-btn"
                    onClick={handleSubmit}
                  >
                    Place Order
                  </button>
                </div>
              </div>
            )} */}
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
                    : `$${getShippingCost().toFixed(2)}`}
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
                <span>1-800-123-4567</span>
              </div>
              <div className="support-contact">
                <span className="support-icon">✉️</span>
                <span>support@nexus.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
