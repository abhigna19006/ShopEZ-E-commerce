import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaBox,
  FaInfoCircle,
  FaShoppingCart,
  FaClipboardList,
  FaSignInAlt,
  FaUserPlus,
  FaSignOutAlt,
  FaUserShield
} from "react-icons/fa";

const Navbar = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const admin = JSON.parse(localStorage.getItem("admin"));

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("admin");
    localStorage.removeItem("token");

    alert("Logout Successful");
    navigate("/login");
  };

  return (
    <nav style={{
      backgroundColor: "#0a3d91",   // 🔵 DARK BLUE (FIXED)
      padding: "15px 30px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      color: "white"
    }}>

      {/* LOGO */}
      <div>
        <h2 style={{ margin: 0, color: "white" }}>ShopEZ</h2>
        <p style={{ margin: 0, fontSize: "12px", color: "white" }}>
          Welcome to ShopEZ
        </p>
      </div>

      {/* LINKS */}
      <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>

        <Link to="/" style={linkStyle}><FaHome /> Home</Link>

        <Link to="/about" style={linkStyle}><FaInfoCircle /> About</Link>

        <Link to="/products" style={linkStyle}><FaBox /> Products</Link>

        <Link to="/cart" style={linkStyle}><FaShoppingCart /> Cart</Link>

        <Link to="/orders" style={linkStyle}><FaClipboardList /> Orders</Link>

        {/* ADMIN */}
        {!admin && (
          <Link to="/admin-login" style={linkStyle}>
            <FaUserShield /> Admin
          </Link>
        )}

          <Link to="/admin-dashboard" style={linkStyle}><FaUserShield />  Admin Dashboard</Link>

        {/* LOGIN / REGISTER */}
        {!user && (
          <>
            <Link to="/login" style={linkStyle}>
              <FaSignInAlt /> Login
            </Link>

            <Link to="/register" style={linkStyle}>
              <FaUserPlus /> Register
            </Link>
          </>
        )}

        {/* LOGOUT */}
        {(user || admin) && (
          <button onClick={logout} style={logoutBtn}>
            <FaSignOutAlt /> Logout
          </button>
        )}

      </div>
    </nav>
  );
};

const linkStyle = {
  color: "white",
  textDecoration: "none",
  display: "flex",
  alignItems: "center",
  gap: "5px"
};

const logoutBtn = {
  backgroundColor: "red",
  color: "white",
  border: "none",
  padding: "6px 10px",
  borderRadius: "5px",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  gap: "5px"
};

export default Navbar;