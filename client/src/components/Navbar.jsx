import { Link, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaBox,
  FaShoppingCart,
  FaClipboardList,
  FaSignInAlt,
  FaUserPlus,
  FaSignOutAlt,
  FaUserShield
} from "react-icons/fa";

function Navbar() {

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));


  const logout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    alert("Logged out successfully");

    navigate("/login");

  };


  return (

    <nav
      style={{
        backgroundColor: "#1e3a8a",
        padding: "15px 30px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}
    >

      <div>

        <h2
          style={{
            color: "white",
            margin: 0
          }}
        >
          ShopEZ
        </h2>

        <p
          style={{
            color: "white",
            margin: 0
          }}
        >
          Welcome to ShopEZ 🛒
        </p>

      </div>


      <div
        style={{
          display: "flex",
          gap: "20px",
          alignItems: "center"
        }}
      >

        <Link
          to="/"
          style={{color:"white", textDecoration:"none"}}
        >
        <FaHome/>  Home
        </Link>


        <Link
          to="/about"
          style={{color:"white", textDecoration:"none"}}
        >
          About
        </Link>


        <Link
          to="/products"
          style={{color:"white", textDecoration:"none"}}
        >
        <FaBox/> Products
        </Link>


        {user ? (

          <>


            <Link
              to="/cart"
              style={{color:"white", textDecoration:"none"}}
            >
            <FaShoppingCart/> Cart
            </Link>


            <Link
              to="/orders"
              style={{color:"white", textDecoration:"none"}}
            >
            <FaClipboardList/> Orders
            </Link>


            <button
              onClick={logout}
              style={{
                backgroundColor:"white",
                color:"#1e3a8a",
                border:"none",
                padding:"8px 15px",
                borderRadius:"5px",
                cursor:"pointer"
              }}
            >
            <FaSignOutAlt/> Logout
            </button>

          </>

        ) : (

          <>

            <Link
              to="/login"
              style={{color:"white", textDecoration:"none"}}
            >
            <FaSignInAlt/> Login
            </Link>


            <Link
              to="/register"
              style={{color:"white", textDecoration:"none"}}
            >
            <FaUserPlus/>  Register
            </Link>


            <Link
              to="/admin-login"
              style={{ color: "white", textDecoration: "none" }}
            >
            <FaUserShield /> Admin
            </Link>

            <Link to="/admin" style={{ color: "white", textDecoration: "none" }}>
            Admin Dashboard
            </Link>

          </>

        )}

      </div>


    </nav>

  );

}

export default Navbar;