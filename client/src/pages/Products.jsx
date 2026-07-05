import React, { useEffect, useState } from "react";
import axios from "axios";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/products")
      .then(res => {
        console.log("PRODUCTS:", res.data);
        setProducts(res.data);
      })
      .catch(err => console.log("ERROR:", err));
  }, []);

  const addToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Added to Cart 🛒");
  };

  return (
    <div style={{ padding: "20px", backgroundColor: "#f5f7ff" }}>

      <h2 style={{ textAlign: "center", color: "#1e3a8a" }}>
        Products
      </h2>

      {/* PRODUCTS GRID */}
      <div style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "20px"
      }}>

        {products.length === 0 ? (
          <p>No products found</p>
        ) : (
          products.map((p) => (
            <div
              key={p._id}
              style={{
                width: "230px",
                backgroundColor: "white",
                borderRadius: "10px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                overflow: "hidden"
              }}
            >

              {/* IMAGE FIX */}
              <img
                src={p.image}
                alt={p.name}
                style={{
                  width: "100%",
                  height: "160px",
                  objectFit: "cover"
                }}
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/230x160";
                }}
              />

              <div style={{ padding: "10px" }}>

                <h3>{p.name}</h3>

                <p style={{ fontSize: "13px", color: "gray" }}>
                  {p.description}
                </p>

                <p style={{ fontWeight: "bold", color: "green" }}>
                  ₹ {p.price}
                </p>

                <p style={{ fontSize: "12px", color: "blue" }}>
                  Category: {p.category}
                </p>

                {/* ADD TO CART BUTTON */}
                <button
                  onClick={() => addToCart(p)}
                  style={{
                    width: "100%",
                    padding: "8px",
                    backgroundColor: "#1e3a8a",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer"
                  }}
                >
                  🛒 Add to Cart
                </button>

              </div>
            </div>
          ))
        )}

      </div>
    </div>
  );
};

export default Products;