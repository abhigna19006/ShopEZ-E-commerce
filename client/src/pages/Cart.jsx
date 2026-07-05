import React, { useEffect, useState } from "react";
import axios from "axios";

const Cart = () => {
  const [cart, setCart] = useState([]);

  // ✅ FIX: user must be defined
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const updateCart = (updatedCart) => {
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const increaseQty = (index) => {
    const updated = [...cart];
    updated[index].qty = (updated[index].qty || 1) + 1;
    updateCart(updated);
  };

  const decreaseQty = (index) => {
    const updated = [...cart];
    updated[index].qty = (updated[index].qty || 1) - 1;

    if (updated[index].qty <= 1) updated[index].qty = 1;

    updateCart(updated);
  };

  const removeItem = (index) => {
    const updated = cart.filter((_, i) => i !== index);
    updateCart(updated);
  };

  // ✅ FIX: safe total calculation
  const total = cart.reduce((sum, item) => {
    return sum + Number(item.price || 0) * (item.qty || 1);
  }, 0);

  // ✅ FIX: working place order
  const placeOrder = async () => {
    try {
      const orderData = {
        userId: user?._id,
        products: cart.map(item => ({
          name: item.name,
          price: Number(item.price || 0),
          qty: item.qty || 1,
          image: item.image
        })),
        total: total
      };

      console.log("ORDER DATA SENT:", orderData);

      const res = await axios.post(
        "http://localhost:5000/api/orders/create",
        orderData
      );

      console.log("ORDER RESPONSE:", res.data);

      alert("Order Placed Successfully 🎉");

      localStorage.removeItem("cart");
      setCart([]);

    } catch (err) {
      console.log("ORDER ERROR:", err);
      alert("Order Failed ❌ Check console");
    }
  };

  return (
    <div style={{ padding: "20px" }}>

      <h2 style={{ textAlign: "center" }}>🛒 Your Cart</h2>

      {cart.length === 0 ? (
        <h3 style={{ textAlign: "center" }}>Cart is empty</h3>
      ) : (
        <>
          {cart.map((item, index) => (
            <div
              key={index}
              style={{
                border: "1px solid #ccc",
                margin: "10px",
                padding: "10px",
                textAlign: "center"
              }}
            >

              <img
                src={item.image}
                alt={item.name}
                style={{ width: "100px" }}
              />

              <h3>{item.name}</h3>

              <p style={{ color: "gray" }}>
                {item.description}
              </p>

              <p>₹ {item.price}</p>

              <div style={{ marginTop: "10px" }}>
                <button onClick={() => decreaseQty(index)}>➖</button>
                <span style={{ margin: "0 10px" }}>
                  {item.qty || 1}
                </span>
                <button onClick={() => increaseQty(index)}>➕</button>

                <button
                  onClick={() => removeItem(index)}
                  style={{
                    marginLeft: "10px",
                    background: "red",
                    color: "white"
                  }}
                >
                  Remove
                </button>
              </div>

            </div>
          ))}

          {/* TOTAL SECTION */}
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <h2>Total: ₹ {total}</h2>

            <button
              onClick={placeOrder}
              style={{
                padding: "10px 20px",
                background: "green",
                color: "white",
                border: "none",
                borderRadius: "5px"
              }}
            >
              Place Order
            </button>
          </div>
        </>
      )}

    </div>
  );
};

export default Cart;