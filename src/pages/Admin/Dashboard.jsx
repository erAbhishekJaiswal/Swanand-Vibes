import Sidebar from "../../components/Sidebar";
import Pages from "./Pages";
import "../../CssFiles/Admin/Dashboard.css";
import { useState } from "react";
const Dashboard = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  return (
    <div className="dashboard-container">
      <Sidebar
        isCollapsed={isCollapsed}
        toggle={() => setIsCollapsed(!isCollapsed)}
      />
      <div className={`pages-container ${isCollapsed ? "expanded" : "shrunk"}`}>
        <Pages />
      </div>
    </div>
  );
};

export default Dashboard;
