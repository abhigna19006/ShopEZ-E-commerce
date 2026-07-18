import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminDashboard() {

  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");

  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");


  useEffect(() => {
    fetchUsers();
    fetchOrders();
    fetchProducts();
  }, []);


  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/users");
      setUsers(res.data);
    } catch (err) {
      console.log(err);
    }
  };


  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/orders");
      setOrders(res.data);
    } catch (err) {
      console.log(err);
    }
  };


  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/products");
      setProducts(res.data);
    } catch (err) {
      console.log(err);
    }
  };


  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      alert("Product deleted successfully");
      fetchProducts();
    } catch (err) {
      console.log(err);
      alert("Failed to delete product");
    }
  };


  const addProduct = async () => {
    try {

      if (editId) {

        await axios.put(
          `http://localhost:5000/api/products/${editId}`,
          {
            name,
            description,
            price,
            category,
            image,
          }
        );

        alert("Product updated successfully");
        setEditId(null);

      } else {

        await axios.post(
          "http://localhost:5000/api/products",
          {
            name,
            description,
            price,
            category,
            image,
          }
        );

        alert("Product added successfully");
      }


      setName("");
      setDescription("");
      setPrice("");
      setCategory("");
      setImage("");

      fetchProducts();

    } catch (err) {
      console.log(err);
      alert("Operation failed");
    }
  };


  const editProduct = (product) => {

    setEditId(product._id);

    setName(product.name);
    setDescription(product.description);
    setPrice(product.price);
    setCategory(product.category);
    setImage(product.image);

  };
const updateOrderStatus = async (id, status) => {
  try {
    await axios.put(
      `http://localhost:5000/api/orders/${id}`,
      {
        status: status
      }
    );

    alert("Order status updated successfully");
    fetchOrders();

  } catch (err) {
    console.log(err);
    alert("Failed to update order status");
  }
};

  return (
    <div style={{ padding: "20px" }}>

      <h2>Admin Dashboard</h2>

      <hr />

      <h3>
        {editId ? "Update Product" : "Add New Product"}
      </h3>


      <input
        type="text"
        placeholder="Product Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <br /><br />


      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <br /><br />


      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      <br /><br />


      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />

      <br /><br />


      <input
        type="text"
        placeholder="Image URL"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />

      <br /><br />


      <button onClick={addProduct}>
        {editId ? "Update Product" : "Add Product"}
      </button>
<div
  style={{
    display: "flex",
    justifyContent: "space-between",
    gap: "20px",
    margin: "20px 0",
  }}
>
  <div
    style={{
      flex: 1,
      background: "#2196F3",
      color: "white",
      padding: "20px",
      borderRadius: "10px",
      textAlign: "center",
    }}
  >
    <h3>👤 Users</h3>
    <h2>{users.length}</h2>
  </div>

  <div
    style={{
      flex: 1,
      background: "#4CAF50",
      color: "white",
      padding: "20px",
      borderRadius: "10px",
      textAlign: "center",
    }}
  >
    <h3>📦 Orders</h3>
    <h2>{orders.length}</h2>
  </div>

  <div
    style={{
      flex: 1,
      background: "#FF9800",
      color: "white",
      padding: "20px",
      borderRadius: "10px",
      textAlign: "center",
    }}
  >
    <h3>🛍 Products</h3>
    <h2>{products.length}</h2>
  </div>
  </div>
      <hr />
      <h3>Users</h3>

      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        users.map((user) => (
          <div key={user._id}>
            {user.name} - {user.email}
          </div>
        ))
      )}


      <h3>Orders</h3>

{orders.length === 0 ? (
  <p>No orders found.</p>
) : (
  orders.map((order) => (
    <div key={order._id}>

      <p>
        Order ID: {order._id}
      </p>

      <p>
        Amount: ₹{order.total}
      </p>

      <p>
        Status:
        <select
          value={order.status}
          onChange={(e) =>
            updateOrderStatus(order._id, e.target.value)
          }
        >
          <option value="Pending">Pending</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>
        </select>
      </p>

      <hr />
     </div>
  ))
)}

      <h3>Products</h3>

      <input
      type="text"
      placeholder="Search Product..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      style={{
      padding: "8px",
      width: "300px",
      marginBottom: "15px",
      }}
    />

    <br /><br />

<select
  value={filterCategory}
  onChange={(e) => setFilterCategory(e.target.value)}
  style={{
    padding: "8px",
    width: "200px",
    marginBottom: "15px",
  }}
>
  <option value="All">All Categories</option>
  <option value="Electronics">Electronics</option>
  <option value="Personal Care">Personal Care</option>
  <option value="Stationery">Stationery</option>
  <option value="Fashion">Fashion</option>
</select>

      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (

        <table
          border="1"
          cellPadding="10"
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "10px",
          }}
        >

          <thead style={{ backgroundColor: "#1976d2", color: "white" }}>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>


          <tbody>

            {products
  .filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  )
  .filter((product) =>
    filterCategory === "All"
      ? true
      : product.category === filterCategory
  )
  .map((product) => (

              <tr key={product._id}>

                <td>
                  <img
                    src={product.image}
                    alt={product.name}
                    width="60"
                    height="60"
                    style={{ objectFit: "cover" }}
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/60";
                    }}
                  />
                </td>


                <td>{product.name}</td>


                <td>₹{product.price}</td>


                <td>{product.category}</td>


                <td>

                  <button
                    onClick={() => editProduct(product)}
                    style={{
                      background: "green",
                      color: "white",
                      marginRight: "10px",
                      padding: "6px 12px",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    Edit
                  </button>



                  <button
                    onClick={() => deleteProduct(product._id)}
                    style={{
                      background: "red",
                      color: "white",
                      padding: "6px 12px",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    Delete
                  </button>


                </td>

              </tr>

            ))}

          </tbody>


        </table>

      )}

    </div>
  );
}