import { useEffect } from "react";
import { logoutUser } from "./authService";
import { useNavigate } from "react-router-dom";

const SESSION_DURATION = 24 * 60 * 60 * 1000; // 1 day

function AutoLogoutManager() {
  const navigate = useNavigate();

  useEffect(() => {
    const loginTime = parseInt(localStorage.getItem("login_time"), 10);

    if (loginTime) {
      const now = Date.now();
      const timeLeft = SESSION_DURATION - (now - loginTime);

      if (timeLeft <= 0) {
        logoutUser();
        navigate("/login");
      } else {
        const timer = setTimeout(() => {
          logoutUser();
          navigate("/login");
        }, timeLeft);

        return () => clearTimeout(timer);
      }
    }
  }, []);

  return null;
}

export default AutoLogoutManager;
