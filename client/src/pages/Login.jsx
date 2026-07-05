import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/users/login", {
        email,
        password
      });

      const user = res.data.user;

      // SAVE USER
      localStorage.setItem("user", JSON.stringify(user));

      // SAVE TOKEN (if backend sends)
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
      }

      // ADMIN CHECK
      if (user.role === "admin") {
        localStorage.setItem("admin", JSON.stringify(user));
      }

      alert("Login Successful 🎉");

      navigate("/");

    } catch (err) {
      console.log(err);
      alert("Invalid Credentials ❌");
    }
  };

  return (
  <div style={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "white"   // ✅ FIXED (NO BLUE)
  }}>

    <div style={{
      backgroundColor: "#f5f5f5",
      padding: "30px",
      borderRadius: "10px",
      width: "300px"
    }}>

        <h2 style={{ textAlign: "center" }}>Login</h2>

        <form onSubmit={handleLogin}>

          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: "100%", padding: "8px", margin: "5px" }}
          />

          <input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: "100%", padding: "8px", margin: "5px" }}
          />

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "10px",
              marginTop: "10px",
              backgroundColor: "#0a3d91",
              color: "white",
              border: "none"
            }}
          >
            Login
          </button>

        </form>

      </div>

    </div>
  );
};

export default Login;