const express = require("express");
const {
  userRegisterValidate,
  userLoginValidate,
} = require("../utils/userValidation");
const { ensureAuthenticated } = require("../utils/auth");
const {
  registerUser,
  loginUser,
  googleLoginUser,
} = require("../controllers/userController");
const {
  addProducts,
  getAllProducts,
  getProductsDetails,
  getRelatedProducts,
  getFeatureProducts,
  getLatestProducts,
  getExclusiveProducts,
} = require("../controllers/productController");
const {
  addToCart,
  getCart,
  deleteCart,
  cartIncrement,
} = require("../controllers/cartController.js");
const { cartDecrement } = require("../controllers/cartController.js");
const {
  addQuotes,
  getAllQuotes,
} = require("../controllers/quoteController.js");
const {
  addAddress,
  getAddress,
  updateAddress,
  deleteAddress,
} = require("../controllers/addressController.js");
const { stripePaymentController } = require("../controllers/paymentController.js");

const routes = express.Router();

routes.post("/register", userRegisterValidate, registerUser);

routes.post("/login", userLoginValidate, loginUser);

routes.post("/google-login-check", googleLoginUser);

routes.post("/products", ensureAuthenticated, addProducts);

routes.get("/products", getAllProducts);

routes.get("/products/:id", getProductsDetails);

routes.get("/related-products/:id", getRelatedProducts);

routes.get("/feature-products", getFeatureProducts);

routes.get("/latest-products", getLatestProducts);

routes.get("/exclusive-products/:id", getExclusiveProducts);

routes.post("/quotes", addQuotes);

routes.get("/quotes", getAllQuotes);

routes.post("/add-to-cart", ensureAuthenticated, addToCart);

routes.get("/get-cart", ensureAuthenticated, getCart);

routes.delete("/cart-delete/:productId", ensureAuthenticated, deleteCart);

routes.post("/cart-increase/:productId", ensureAuthenticated, cartIncrement);

routes.post("/cart-decrease/:productId", ensureAuthenticated, cartDecrement);

routes.post("/add-address", ensureAuthenticated, addAddress);

routes.get("/get-address", ensureAuthenticated, getAddress);

routes.put("/update-address", ensureAuthenticated, updateAddress);

routes.delete("/delete-address", ensureAuthenticated, deleteAddress);

routes.post("/create-checkout-session", ensureAuthenticated, stripePaymentController)

module.exports = routes;
