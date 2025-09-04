import { Routes, Route } from "react-router-dom";
import Profile from "../../pages/User/Profile";
import Cart from "../../pages/User/Cart";
import Orders from "../../pages/User/Orders";
import Checkout from "../../pages/User/Checkout";
import Wallet from "../../pages/User/Wallet";
import AddKyc from "./AddKyc";
import OrderDetail from "./OrderDetail";

const Pages = () => {
  return (
    <div className="pages-container">
        <Routes>
          <Route path="/" element={<h1>User Dashboard</h1>} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/orders/:id" element={<OrderDetail />} />
          <Route path="/settings" element={<h1>User Settings</h1>} />
          <Route path="/kyc" element={<AddKyc />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/wallet" element={<Wallet />} />
        </Routes>
    </div>
  );
};

export default Pages;
