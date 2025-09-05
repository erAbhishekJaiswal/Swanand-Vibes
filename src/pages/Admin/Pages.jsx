import { Routes, Route } from "react-router-dom";
import Profile from "../../pages/User/Profile";
import UserList from "./UsersManage/UserList";
import UserDetails from "./UsersManage/UserDetails";
import UserEdit from "./UsersManage/UserEdit";
import KycList from "./Kyc/KycList";
import KycDetails from "./Kyc/KycDetails";
import KycEdit from "./Kyc/KycEdit";
import CreateProduct from "./Product/Create";
import ProductList from "./Product/List";
import Detail from "./Product/Detail";
import EditProduct from "./Product/Edit";
import AddKyc from "../../pages/User/AddKyc";
const Pages = () => {
  return (
    <div>
        <Routes>
          <Route path="/" element={<h1>Users Content</h1>} />
          <Route path="/dashboard" element={<Profile />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/detail/:id" element={<UserDetails />} />
          <Route path="/user/edit" element={<UserEdit />} />
          <Route path="/kyc" element={<KycList />} />
          <Route path="/kyc/add" element={<AddKyc />} />
          <Route path="/kyc/:id" element={<KycDetails />} />
          <Route path="/kyc/edit/:id" element={<KycEdit />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/product/:id" element={<Detail />} />
          <Route path="/product/add" element={<CreateProduct />} />
          <Route path="/product/edit/:id" element={<EditProduct />} />
        </Routes>
    </div>
  );
};

export default Pages;
