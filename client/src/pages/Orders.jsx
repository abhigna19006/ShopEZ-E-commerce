import { useEffect, useState } from "react";
import API from "../api/axios";

function Orders() {

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getOrders();
  }, []);


  const getOrders = async () => {
    try {

      const user = JSON.parse(localStorage.getItem("user"));

      const response = await API.get(`/orders/${user._id}`);

      setOrders(response.data);

    } catch (error) {

      console.log(error);

    }
  };


  return (
    <div style={{ padding: "30px" }}>

      <h2>Your Orders</h2>


      {orders.length === 0 ? (

        <p>No orders found</p>

      ) : (

        orders.map((order) => (

          <div
            key={order._id}
            style={{
              width: "350px",
              padding: "20px",
              marginBottom: "20px",
              borderRadius: "10px",
              boxShadow: "0 2px 10px gray"
            }}
          >

            <h3>
              Order ID
            </h3>

            <p>
              {order._id}
            </p>


            <h4>
              Total Amount: ₹{order.totalAmount}
            </h4>


            <p>
              Status:
              <b style={{ color: "green" }}>
                {" "}{order.status || "Pending"}
              </b>
            </p>


          </div>

        ))

      )}

    </div>
  );
}

export default Orders;