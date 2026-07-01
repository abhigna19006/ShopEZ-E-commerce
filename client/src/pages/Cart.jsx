import { useEffect, useState } from "react";
import API from "../api/axios";

function Cart() {

  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    getCart();
  }, []);


  const getCart = async () => {
    try {

      const user = JSON.parse(localStorage.getItem("user"));

      const response = await API.get(`/cart/${user._id}`);

      setCartItems(
        response.data.items.filter(item => item.product)
      );

    } catch (error) {
      console.log(error);
    }
  };


  // Increase quantity
  const increaseQuantity = (index) => {

    const updatedCart = [...cartItems];

    updatedCart[index].quantity += 1;

    setCartItems(updatedCart);
  };


  // Decrease quantity
  const decreaseQuantity = (index) => {

    const updatedCart = [...cartItems];

    if (updatedCart[index].quantity > 1) {
      updatedCart[index].quantity -= 1;
    }

    setCartItems(updatedCart);
  };


  // Remove item
  const removeItem = (index) => {

    const updatedCart = cartItems.filter(
      (_, i) => i !== index
    );

    setCartItems(updatedCart);

  };


  const total = cartItems.reduce(
    (sum, item) =>
      sum + item.product.price * item.quantity,
    0
  );


  const placeOrder = async () => {

    try {

      const user = JSON.parse(localStorage.getItem("user"));

      const products = cartItems.map(item => ({
        product: item.product._id,
        quantity: item.quantity
      }));


      await API.post("/orders", {
        user: user._id,
        products,
        totalAmount: total
      });


      alert("Order created successfully");


    } catch(error) {

      console.log(error);
      alert("Order failed");

    }

  };


  return (

    <div
      style={{
        padding:"30px",
        background:"#f5f5f5",
        minHeight:"100vh"
      }}
    >

      <h1>Your Cart 🛒</h1>


      {
        cartItems.length === 0 ?

        <h3>Cart is empty</h3>

        :

        cartItems.map((item,index)=>(

          <div
            key={item.product._id}
            style={{
              background:"white",
              padding:"20px",
              margin:"20px 0",
              borderRadius:"15px",
              boxShadow:"0 3px 10px #ccc"
            }}
          >

            <h2>
              {item.product.name}
            </h2>


            <p>
              {item.product.description}
            </p>


            <h3>
              ₹{item.product.price}
            </h3>


            <div>

              <button
                onClick={() => decreaseQuantity(index)}
              >
                -
              </button>


              <span
                style={{
                  margin:"0 15px",
                  fontSize:"20px"
                }}
              >
                {item.quantity}
              </span>


              <button
                onClick={() => increaseQuantity(index)}
              >
                +
              </button>


              <button
                onClick={() => removeItem(index)}
                style={{
                  marginLeft:"20px",
                  background:"red",
                  color:"white"
                }}
              >
                Remove
              </button>


            </div>


          </div>

        ))
      }


      <h2>
        Total Amount: ₹{total}
      </h2>


      <button
        onClick={placeOrder}
        style={{
          background:"#1e3a8a",
          color:"white",
          padding:"12px 25px",
          border:"none",
          borderRadius:"8px",
          fontSize:"16px"
        }}
      >
        Place Order
      </button>


    </div>

  );

}

export default Cart;