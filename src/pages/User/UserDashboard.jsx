import Sidebar from "../../components/Sidebar";
import UserPages from "./UserPages";
import "../../CssFiles/Admin/Dashboard.css";
const UserDashboard = () => {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <UserPages />
    </div>
  );
};

export default UserDashboard;
