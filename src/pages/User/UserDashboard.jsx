import Sidebar from "../../components/Sidebar";
import UserPages from "./UserPages";
import "../../CssFiles/Admin/Dashboard.css";
import { useState } from "react";
const UserDashboard = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  return (
    <div className="dashboard-container">
      <Sidebar isCollapsed={isCollapsed} toggle={() => setIsCollapsed(!isCollapsed)}/>
      <div className={`pages-container ${isCollapsed ? "expanded" : "shrunk"}`}>
        <UserPages />
      </div>
    </div>
  );
};

export default UserDashboard;
