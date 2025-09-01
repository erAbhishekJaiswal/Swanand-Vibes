import Sidebar from "../../components/Sidebar";
import Pages from "./Pages";
import "../../CssFiles/Admin/Dashboard.css";
const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <Pages />
    </div>
  );
};

export default Dashboard;
