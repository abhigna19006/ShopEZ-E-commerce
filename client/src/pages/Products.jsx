import { useEffect, useState } from "react";
import API from "../api/axios";

function Products() {

  const [products, setProducts] = useState([]);


  useEffect(() => {
    getProducts();
  }, []);


  const getProducts = async () => {

    try {

      const response = await API.get("/products");

      setProducts(response.data);

    } catch (error) {

      console.log(error);

    }

  };


  const addToCart = async (productId) => {

    try {

      const user = JSON.parse(localStorage.getItem("user"));

      await API.post("/cart", {
        user: user._id,
        product: productId,
        quantity: 1
      });


      alert("Item added to cart");

    } catch (error) {

      console.log(error);
      alert("Please login first");

    }

  };


  return (

    <div style={{ padding: "30px" }}>

      <h1 style={{ textAlign:"center", color:"#1e3a8a" }}>
        ShopEZ Products 🛒
      </h1>


      <div
        style={{
          display:"flex",
          flexWrap:"wrap",
          gap:"25px",
          justifyContent:"center"
        }}
      >

        {products.map((product) => (

          <div
            key={product._id}
            style={{
              width:"280px",
              padding:"20px",
              borderRadius:"12px",
              boxShadow:"0 2px 10px gray",
              backgroundColor:"white"
            }}
          >

            <img
              src={product.image}
              alt={product.name}
              style={{
                width:"100%",
                height:"200px",
                objectFit:"cover",
                borderRadius:"10px"
              }}
            />


            <h2>
              {product.name}
            </h2>


            <p>
              {product.description}
            </p>


            <p>
              Category: {product.category}
            </p>


            <h3>
              ₹{product.price}
            </h3>


            <button
              onClick={() => addToCart(product._id)}
              style={{
                backgroundColor:"#1e3a8a",
                color:"white",
                padding:"10px 20px",
                border:"none",
                borderRadius:"5px",
                cursor:"pointer"
              }}
            >
              Add to Cart
            </button>


          </div>

        ))}

      </div>

    </div>

  );

}

export default Products;