import axios from "axios";

const API_URL =  "http://localhost:5000/api";
// "https://swanand-vibes-backend.vercel.app/api";

// User Auth Api
//
export const registerUser = (formData) => {
  const { name, email, password, otp } = formData;
  return axios.post(`http://localhost:5000/api/auth/register`, formData);
};

export const verifyUser = (formData) => {
  // console.log(formData);
  const { name, email, password } = formData;
  return axios.post(`http://localhost:5000/api/auth/request-otp`, { name, email, password });
};
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
// export const getCommonProducts = () => {
//   return axios.get(`http://localhost:5000/api/products/common`);
// };

export const getCommonProducts = ({
  page,
  limit,
  search,
  category,
  minPrice,
  maxPrice,
  brands,
  minRating,
  sort,
}) => {
  return axios.get(`${API_URL}/products/common`, {
    params: {
      page,
      limit,
      search,
      category,
      minPrice,
      maxPrice,
      brands,
      minRating,
      sort,
    },
  });
};

// Enhanced version with better error handling
export const getFilters = async () => {
  try {
    const response = await axios.get(
      `${API_URL}/products/filters`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        timeout: 10000, // 10 second timeout
      }
    );

    if (response.data.success) {
      return response;
    } else {
      throw new Error(response.data.message || "Failed to fetch filters");
    }
  } catch (error) {
    console.error("Error fetching filters:", error);

    // Return a fallback response if the API fails
    return {
      data: {
        success: false,
        data: {
          categories: [],
          brands: [],
          priceRange: [0, 1000],
        },
      },
    };
  }
};

//
export const getCommonProductById = (id) => {
  return axios.get(`${API_URL}/products/common/${id}`);
};

// admin api
//
export const getAllProducts = (page, limit, search, category) => {
  console.log(page, limit, search, category);

  return axios.get(
    `${API_URL}/products?page=${page}&limit=${limit}&search=${search}&category=${category}`
  );
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

// 
export const generateStockReport = () => {
  return axios.get(`${API_URL}/products/stock`, {
      responseType: 'blob', // 👈 Important for binary data like .xlsx
    });
};

//  Users Api
//
// export const getAllUsers = () => {
//   return axios.get(`${API_URL}/users`);
// };

export const getAllUsers = (params ) => {
  console.log(params);
  
  return axios.get(
    `http://localhost:5000/api/users`,{ params }
  );
};
//
export const getUserById = (id) => {
  return axios.get(`${API_URL}/users/${id}`);
};

export const updateUserProfile = async (id, formData) => {
  return axios.put(`${API_URL}/users/${id}/profile`, formData);
};
// export const updateUser = (id, userData) => {
//   return axios.put(`${API_URL}/users/${id}`, userData);
// };
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
  // console.log(payload);
  
  return axios.post(`${API_URL}/user/kyc/submit`, payload, {
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
      userId: userId,
    },
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
  return axios.delete(`${API_URL}/user/wallet/${userId}/withdraw`, {
    data: { amount },
  });
};

// Orders Api
export const placeOrder = (userId, orderData) => {
  // console.log(`Placing order for user ${userId}:`, orderData);

  return axios.post(`${API_URL}/order/${userId}`, orderData);
};

export const getOrders = (userId) => {
  return axios.get(`${API_URL}/order/user/${userId}`);
};





// contact api 
export const contactslist = () =>{
    return axios.get(`${API_URL}/contact`);
}

export const contactdelete = (id) => {
  return axios.delete(`${API_URL}/order/contact/${id}`);
}

export const contactupdate = (id, newStatus) => {
  return axios.put(`${API_URL}/contact/${id}`, { status: newStatus });
}

export const contactcreate = (contactData) => {
  return axios.post(`${API_URL}/contact`, contactData);
}




{
  /***************************** Admin Api ***************************/
}

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
