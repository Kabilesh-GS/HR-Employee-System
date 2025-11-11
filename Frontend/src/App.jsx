import { useState, useEffect, useRef } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import UserDetails from "./Components/userDetails";
import Adduser from "./Components/Adduser";
import OnGoingProjects from "./Components/OnGoingProjects";
import Login from "./Components/Login";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const hasInitialized = useRef(false);

  useEffect(() => {
    if (hasInitialized.current) return;

    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setUser(userData);
        const role = userData.role?.toUpperCase();
        if (role === "EMPLOYEE") {
          const currentPath = window.location.pathname;
          if (
            currentPath === "/" ||
            currentPath === "/login" ||
            !currentPath.includes(`/user/${userData.user_id}`)
          ) {
            navigate(`/user/${userData.user_id}`, { replace: true });
          }
        }
      } catch (error) {
        console.error("Error parsing user data:", error);
        localStorage.removeItem("user");
      }
    }
    hasInitialized.current = true;
    setLoading(false);
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    const role = userData.role?.toUpperCase();
    if (role === "HR") {
      navigate("/", { replace: true });
    } else if (role === "EMPLOYEE") {
      navigate(`/user/${userData.user_id}`, { replace: true });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    window.location.href = "/";
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  if (user.role?.toUpperCase() === "EMPLOYEE") {
    return (
      <div style={{ display: "flex" }}>
        <Navbar user={user} onLogout={handleLogout} />
        <Routes>
          <Route path="/user/:id" element={<UserDetails />} />
          <Route
            path="*"
            element={<Navigate to={`/user/${user.user_id}`} replace />}
          />
        </Routes>
      </div>
    );
  }

  return (
    <div style={{ display: "flex" }}>
      <Navbar user={user} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/settings" element={<div>Settings Page</div>} />
        <Route path="/user/:id" element={<UserDetails />} />
        <Route path="/addUser" element={<Adduser />} />
        <Route path="/onGoingProjects" element={<OnGoingProjects />} />
      </Routes>
    </div>
  );
}

export default App;
