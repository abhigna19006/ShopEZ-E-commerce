import { useState } from "react";
import API from "../api/axios";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const handleLogin = async () => {
    try {

      const response = await API.post("/users/login", {
        email,
        password
      });

      localStorage.setItem("token", response.data.token);

      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      alert("Login successful");

      console.log(response.data);

    } catch (error) {

      console.log(error);

      alert(error.response.data.message);

    }
  };


  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "40px"
      }}
    >

      <div
        style={{
          width: "350px",
          padding: "25px",
          borderRadius: "10px",
          boxShadow: "0 2px 10px gray"
        }}
      >

        <h2 style={{ textAlign: "center" }}>
          Login
        </h2>


        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "15px"
          }}
        />


        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "15px"
          }}
        />


        <button
          onClick={handleLogin}
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#1e3a8a",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer"
          }}
        >
          Login
        </button>


      </div>

    </div>
  );
}

export default Login;