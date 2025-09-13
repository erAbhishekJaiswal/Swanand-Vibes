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
import ContactList from "./Contact/ContactList";
import WithdrawList from "../Admin/Wallet/WithdrawalRequests";
import OrderList from "./Order/OrderList";
import AddCategory from "./Product/AddCategory";
import AdminDashboard from "./AdminDashboard";
import UploadImage from "./Gallery/UploadImage";
import GiftUpload from "./Gift/GiftUpload";
import GalleryList from "./Gallery/GalleryList";
import GiftList from "./Gift/GiftList";
const Pages = () => {
  return (
    <div>
        <Routes>
          <Route path="/" element={<AdminDashboard />} />
          <Route path="/dashboard" element={<AdminDashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/detail/:id" element={<UserDetails />} />
          <Route path="/user/edit" element={<UserEdit />} />
          <Route path="/kyc" element={<KycList />} />
          <Route path="/kyc/add" element={<AddKyc />} />
          <Route path="/kyc/:id" element={<KycDetails />} />
          <Route path="/kyc/edit/:id" element={<KycEdit />} />
          <Route path="/withdraw" element={<WithdrawList />} />
          <Route path="/contactlist" element={<ContactList />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/product/:id" element={<Detail />} />
          <Route path="/product/add" element={<CreateProduct />} />
          <Route path="/category/add" element={<AddCategory />} />
          <Route path="/product/edit/:id" element={<EditProduct />} />
          <Route path="/orderlist" element={<OrderList/>}/>
          <Route path="/uploadimage" element={<UploadImage/>}/>
          <Route path="/gallery" element={<GalleryList />} />
          <Route path="/giftupload" element={<GiftUpload/>}/>
          <Route path="/giftlist" element={<GiftList/>}/>
        </Routes>
    </div>
  );
};

export default Pages;
