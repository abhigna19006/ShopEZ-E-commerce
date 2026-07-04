import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [users] = useState([
    { name: "Abhigna", email: "abhigna@test.com" },
    { name: "User 2", email: "user2@test.com" }
  ]);

  const [orders] = useState([
    { id: "ORD001", totalAmount: 500, status: "Pending" },
    { id: "ORD002", totalAmount: 1200, status: "Delivered" }
  ]);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Admin Dashboard</h2>

      {/* USERS */}
      <h3>Users</h3>
      {users.map((u, i) => (
        <div key={i}>
          {u.name} - {u.email}
        </div>
      ))}

      {/* ORDERS */}
      <h3>Orders</h3>
      {orders.map((o, i) => (
        <div key={i}>
          {o.id} - ₹{o.totalAmount} - {o.status}
        </div>
      ))}
    </div>
  );
}