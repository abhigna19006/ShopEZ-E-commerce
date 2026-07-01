const Cart = require("../models/cart");


// Add product to cart
exports.addToCart = async (req, res) => {
  try {

    const { user, product, quantity } = req.body;

    let cart = await Cart.findOne({ user });

    if (!cart) {
      cart = await Cart.create({
        user,
        items: [
          {
            product,
            quantity
          }
        ]
      });

      return res.json(cart);
    }


    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === product
    );


    if (itemIndex > -1) {

      cart.items[itemIndex].quantity += quantity;

    } else {

      cart.items.push({
        product,
        quantity
      });

    }


    await cart.save();

    res.json(cart);


  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};



// Get cart
exports.getCart = async (req, res) => {

  try {

    const cart = await Cart.findOne({
      user: req.params.userId
    }).populate("items.product");


    res.json(cart || { items: [] });


  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};



// Update quantity (+ / -)
exports.updateCartQuantity = async (req, res) => {

  try {

    const { user, product, quantity } = req.body;


    const cart = await Cart.findOne({ user });


    if (!cart) {
      return res.status(404).json({
        message: "Cart not found"
      });
    }


    const item = cart.items.find(
      (item) => item.product.toString() === product
    );


    if (!item) {
      return res.status(404).json({
        message: "Product not found in cart"
      });
    }


    item.quantity = quantity;


    await cart.save();


    res.json(cart);


  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};



// Remove item from cart
exports.removeFromCart = async (req, res) => {

  try {

    const { user, product } = req.body;


    const cart = await Cart.findOne({ user });


    if (!cart) {
      return res.status(404).json({
        message: "Cart not found"
      });
    }


    cart.items = cart.items.filter(
      (item) => item.product.toString() !== product
    );


    await cart.save();


    res.json(cart);


  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};