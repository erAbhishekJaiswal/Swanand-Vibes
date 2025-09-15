import { Routes, Route } from "react-router-dom";
import Profile from "../../pages/User/Profile";
import Cart from "../../pages/User/Cart";
import Orders from "../../pages/User/Orders";
import Checkout from "../../pages/User/Checkout";
import Wallet from "../../pages/User/Wallet";
import AddKyc from "./AddKyc";
import OrderDetail from "./OrderDetail";
import Withdraw from "./Withdraw";
import PaymentPage from "./PaymentPage";
import Dashboard from "./Dashboard";
import ResetProfilePassword from "../Common/ResetProfilePassword";
import NetworkView from "./NetworkView";
import Gallery from "./Gallery";

const Pages = () => {
  return (
    <div  >
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/withdraw" element={<Withdraw />} />
          <Route path="/orders/:id" element={<OrderDetail />} />
          <Route path="/settings" element={<h1>User Settings</h1>} />
          <Route path="/kyc" element={<AddKyc />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/profile/reset-password" element={<ResetProfilePassword />} />
          <Route path="/network" element={<NetworkView />} />
          <Route path="/gallery" element={<Gallery />} />
        </Routes>
    </div>
  );
};

export default Pages;
