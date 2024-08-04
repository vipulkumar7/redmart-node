const ProductModel = require("../models/productModel");

const addProducts = async (req, res) => {
  const productModel = new ProductModel(req.body);
  try {
    const response = await productModel.save();
    return res.status(201).json({
      message: "Product added successful",
      data: response,
    });
  } catch (err) {
    return res.status(500).json({ message: "Server error", err });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await ProductModel.find({});
    return res.status(200).json({
      data: products,
    });
  } catch (err) {
    return res.status(500).json({ message: "Server error", err });
  }
};

const getProductsDetails = async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.id);
    return res.status(200).json({
      data: product,
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

const getRelatedProducts = async (req, res) => {
  try {
    const idsToExclude = req.params.id;
    const products = await ProductModel.find({
      _id: { $nin: idsToExclude },
    }).limit(4);
    return res.status(200).json({ data: products });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

const getFeatureProducts = async (req, res) => {
  try {
    const products = await ProductModel.find({}).limit(33);
    const randomProducts = products.sort(() => Math.random() - 0.5);
    const featureProducts = randomProducts
      .filter(
        (product) => product.brand === "ADIDAS" || product.brand === "Nike"
      )
      .slice(0, 4);
    return res.status(200).json({ data: featureProducts });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

const getLatestProducts = async (req, res) => {
  try {
    const products = await ProductModel.find().limit(33);
    const randomProducts = products.sort(() => Math.random() - 0.5).slice(0, 8);
    return res.status(200).json({ data: randomProducts });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

const getExclusiveProducts = async (req, res) => {
  try {
    const products = await ProductModel.findById(req.params.id);
    return res.status(200).json({ data: products });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

module.exports = {
  addProducts,
  getAllProducts,
  getProductsDetails,
  getRelatedProducts,
  getFeatureProducts,
  getLatestProducts,
  getExclusiveProducts
};
