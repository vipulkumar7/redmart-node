const UserModel = require("../models/userModel");

const addToCart = async (req, res) => {
  const {
    userId,
    rating,
    _id,
    title,
    brand,
    price,
    description,
    category,
    image,
    size,
    quantity,
  } = req.body;
  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const existingItem = user.cart.find(
      (item) => item._id.toString() === _id && item.size === size
    );
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      user.cart.push({
        rating,
        _id,
        title,
        brand,
        price,
        description,
        category,
        image,
        quantity,
        size,
      });
    }
    await user.save();
    return res.status(200).json(user.cart);
  } catch (err) {
    return res.status(500).json({ message: "Server error", err });
  }
};

const getCart = async (req, res) => {
  try {
    const { userid: userId } = req.headers;
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({
      data: user?.cart,
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

const deleteCart = async (req, res) => {
  try {
    const { userid: userId } = req.headers;
    const user = await UserModel.findById(userId);
    user.cart = user.cart.filter((item) => {
      return item._id.toString() !== req.params.productId;
    });
    await user.save();
    return res
      .status(200)
      .json({ message: "Item deleted from cart", cart: user.cart });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const cartIncrement = async (req, res) => {
  try {
    const user = await UserModel.findById(req.body.userId);
    const cartItem = user.cart.find(
      (item) => item._id.toString() === req.params.productId
    );
    if (cartItem) {
      cartItem.quantity += 1;
      await user.save();
      return res
        .status(200)
        .json({ message: "Cart Incremented", cart: user.cart });
    } else {
      res.status(404).json({ message: "CartItem not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const cartDecrement = async (req, res) => {
  try {
    const user = await UserModel.findById(req.body.userId);
    const cartItem = user.cart.find(
      (item) => item._id.toString() === req.params.productId
    );
    if (cartItem && cartItem.quantity > 1) {
      cartItem.quantity -= 1;
      await user.save();
      return res
        .status(200)
        .json({ message: "Cart Decremented", cart: user.cart });
    } else if (cartItem && cartItem.quantity === 1) {
      user.cart = user.cart.filter(
        (item) => item._id.toString() !== req.params.productId
      );
      await user.save();
      res.json(user.cart);
    } else {
      res.status(404).json({ message: "CartItem not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  addToCart,
  getCart,
  deleteCart,
  cartIncrement,
  cartDecrement,
};
