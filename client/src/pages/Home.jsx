import { Link } from "react-router-dom";

function Home() {

  return (

    <div
      style={{
        textAlign: "center",
        padding: "60px",
        backgroundColor: "#f8fafc",
        minHeight: "80vh"
      }}
    >

      <h1
        style={{
          fontSize: "40px",
          color: "#1e3a8a"
        }}
      >
        Welcome to ShopEZ 🛒
      </h1>


      <h2>
        Your one-stop online shopping platform
      </h2>


      <p
        style={{
          fontSize: "18px",
          marginTop: "20px"
        }}
      >
        Shop quality products at the best prices.
        <br />
        Easy shopping, secure orders, and a smooth experience.
      </p>


      <Link to="/products">

        <button
          style={{
            marginTop: "30px",
            backgroundColor: "#1e3a8a",
            color: "white",
            padding: "12px 30px",
            border: "none",
            borderRadius: "8px",
            fontSize: "18px",
            cursor: "pointer"
          }}
        >
          Explore Products
        </button>

      </Link>


    </div>

  );

}

export default Home;