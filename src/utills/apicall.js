import axios from "axios";

const API_URL = "https://swanand-vibes-backend.vercel.app/api";

export const fetchCart = (userId) => {
  return axios.get(`${API_URL}/users/cart/${userId}`);
};

export const fetchUserAddress = (userId) => {
  return axios.get(`${API_URL}/users/address/${userId}`);
};

export const updateUserAddress = (addressData) => {
  return axios.put(`${API_URL}/users/address`, addressData);
};
