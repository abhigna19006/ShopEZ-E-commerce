import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/users/register", {
        name,
        email,
        password
      });

      alert("Registered Successfully 🎉");
      navigate("/login");

    } catch (err) {
      console.log(err);
      alert("Registration Failed");
    }
  };

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      backgroundColor: "white"
    }}>

      <div style={{
        border: "2px solid black",
        padding: "30px",
        borderRadius: "10px",
        width: "300px",
        backgroundColor: "white"
      }}>

        <h2 style={{ textAlign: "center" }}>Register</h2>

        <form onSubmit={handleSubmit}>

          <input
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ width: "100%", margin: "5px", padding: "8px" }}
          />

          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: "100%", margin: "5px", padding: "8px" }}
          />

          <input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: "100%", margin: "5px", padding: "8px" }}
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
            Register
          </button>

        </form>

      </div>

    </div>
  );
};

export default Register;