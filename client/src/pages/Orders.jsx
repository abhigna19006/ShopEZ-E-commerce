import React, { useEffect, useState } from "react";
import axios from "axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/orders/user/${user._id}`
        );

        console.log("ORDERS RESPONSE:", res.data);
        setOrders(res.data);
      } catch (err) {
        console.log("ORDER FETCH ERROR:", err);
      }
    };

    if (user?._id) {
      fetchOrders();
    }
  }, []);

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2>📦 Your Orders</h2>

      {orders.length === 0 ? (
        <h3>No orders found</h3>
      ) : (
        orders.map((order, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #ccc",
              margin: "10px",
              padding: "10px",
            }}
          >
            <h4>Order ID: {order._id}</h4>
            <p>Total: ₹{order.total}</p>
            <p>Status: {order.status}</p>

            <h5>Products:</h5>
            {order.products.map((p, i) => (
              <div key={i}>
                <p>
                  {p.name} - ₹{p.price} x {p.qty}
                </p>
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
};

export default Orders;