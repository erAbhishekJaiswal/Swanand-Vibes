import axios from "axios";

const API_URL = "https://swanand-vibes-backend.vercel.app/api";


// User Auth Api
//
export const registerUser = (formData) => {
 const {name , email, password, otp} = formData

 
  
  return axios.post(`${API_URL}/auth/register`, formData);
};

export const verifyUser = (formData) => {
  // console.log(formData);
  const {name , email, password} = formData;
  return axios.post(`${API_URL}/auth/request-otp`, { name, email, password });
}
//
export const loginUser = (loginData) => {
  return axios.post(`${API_URL}/auth/login`, loginData);
};

export const logoutUser = () => {
  return axios.post(`${API_URL}/auth/logout`);
};

// export const updateUserPassword = (passwordData) => {
//   return axios.put(`${API_URL}/users/password`, passwordData);
// };



// Products Api

//
export const getCommonProducts = () => {
  return axios.get(`${API_URL}/products/common`);
};
//
export const getCommonProductById = (id) => {
  return axios.get(`${API_URL}/products/common/${id}`);
};

      // admin api
      //
export const getAllProducts = () => {
  return axios.get(`${API_URL}/products`);
};

// 
export const getProductById = (id) => {
  return axios.get(`${API_URL}/products/${id}`);
};

//
export const createProduct = (productData) => {
  return axios.post(`${API_URL}/products`, productData);
};

//
export const updateProduct = (id, productData) => {
  return axios.put(`${API_URL}/products/${id}`, productData);
};

// 
export const deleteProduct = (id) => {
  return axios.delete(`${API_URL}/products/${id}`);
};





//  Users Api
//
export const getAllUsers = () => {
  return axios.get(`${API_URL}/users`);
};
//
export const getUserById = (id) => {
  return axios.get(`${API_URL}/users/${id}`);
};

export const updateUser = (id, userData) => {
  return axios.put(`${API_URL}/users/${id}`, userData);
};
//
export const deleteUser = (id) => {
  return axios.delete(`${API_URL}/users/${id}`);
};

// for users

export const getUserProfile = (id) => {
  return axios.get(`${API_URL}/users/${id}/profile`);
};

export const getUserAddress = (userId) => {
  return axios.get(`${API_URL}/users/address/${userId}`);
};


// Kyc
// 
export const getAllKycs = () => {
  return axios.get(`${API_URL}/user/kyc`);
};
// 
export const approveKyc = (id) => {
  return axios.put(`${API_URL}/user/kyc/${id}/approve`);
};
// 
export const rejectKyc = (id) => {
  return axios.put(`${API_URL}/user/kyc/${id}/reject`);
};
// 
export const getKycById = (id) => {
  return axios.get(`${API_URL}/user/kyc/${id}`);
};

export const getKycByUserId = (userId) => {
  return axios.get(`${API_URL}/user/kyc/user/${userId}`);
};

// for users
//
export const submitKyc = (payload) => {
  return axios.post(`${API_URL}/user/kyc`, payload, {
    headers: { "Content-Type": "application/json" },
  });
};

// export const createKyc = (kycData) => {
//   return axios.post(`${API_URL}/users/kyc`, kycData);
// };

// export const updateKycStatus = (kycId, status) => {
//   return axios.put(`${API_URL}/users/kyc/${kycId}`, { status });
// };

// export const deleteKyc = (kycId) => {
//   return axios.delete(`${API_URL}/users/kyc/${kycId}`);
// };




// Cart Api
//
export const addToCart = (payload) => {
  const { userId, quantity, id } = payload;
  console.log(payload);

  return axios.post(`${API_URL}/user/cart/${id}`, { userId, quantity });
};
//
export const getCart = (id) => {
  return axios.get(`${API_URL}/user/cart/${id}`);
};

//
export const removeFromCart = (userId, productId, removedItem) => {
  return axios.delete(`${API_URL}/user/cart/${productId}`, {
    data: {
      item: removedItem,
      userId: userId
    }
  });
};

export const clearCart = (userId) => {
  return axios.delete(`${API_URL}/user/cart/${userId}/clear`);
};

export const updateCartItem = (userId, productId, quantity) => {
  return axios.put(`${API_URL}/user/cart/${userId}/${productId}`, { quantity });
};





// Wallet Api

// export const addToWallet = (userId, amount) => {
//   return axios.post(`${API_URL}/users/wallet/${userId}`, { amount });
// };

//
export const getWallet = (userId) => {
  return axios.get(`${API_URL}/user/wallet/${userId}`);
};

export const debitWallet = (userId, amount) => {
  return axios.delete(`${API_URL}/user/wallet/${userId}/withdraw`, { data: { amount } });
};




// Orders Api
export const placeOrder = (userId, orderData) => {
  console.log(`Placing order for user ${userId}:`, orderData);

  return axios.post(`${API_URL}/order/${userId}`, orderData);
};

export const getOrders = (userId) => {
  return axios.get(`${API_URL}/order/user/${userId}`);
};













{/***************************** Admin Api ***************************/}


// // Users
// export const fetchAllUsers = () => {
//   return axios.get(`${API_URL}/admin/users`);
// };

// // export const deleteUser = (userId) => {
// //   return axios.delete(`${API_URL}/admin/users/${userId}`);
// // };


// // Products
// export const fetchAllProducts = () => {
//   return axios.get(`${API_URL}/admin/products`);
// };


// // Cart
// export const fetchAllCarts = () => {
//   return axios.get(`${API_URL}/admin/carts`);
// };

// export const deleteCart = (cartId) => {
//   return axios.delete(`${API_URL}/admin/carts/${cartId}`);
// };



// // Kyc
// export const fetchAllKycRequests = () => {
//   return axios.get(`${API_URL}/admin/kyc`);
// };

// export const updateKycStatus = (kycId, status) => {
//   return axios.put(`${API_URL}/admin/kyc/${kycId}`, { status });
// };

// export const deleteKycRequest = (kycId) => {
//   return axios.delete(`${API_URL}/admin/kyc/${kycId}`);
// };

// export const fetchKycByUserId = (userId) => {
//   return axios.get(`${API_URL}/admin/kyc/user/${userId}`);
// };

// export const submitKyc = (kycData) => {
//   return axios.post(`${API_URL}/admin/kyc`, kycData);
// };

// // cloudinary
// export const uploadImage = (formData) => {
//   return axios.post(`${API_URL}/admin/cloudinary/upload`, formData);
// };


// // Orders
// export const fetchAllOrders = () => {
//   return axios.get(`${API_URL}/admin/orders`);
// };

// export const updateOrderStatus = (orderId, status) => {
//   return axios.put(`${API_URL}/admin/orders/${orderId}`, { status });
// };


