const QuoteModel = require("../models/quoteModel");

const addQuotes = async (req, res) => {
  const quoteModel = new QuoteModel(req.body);
  try {
    const response = await quoteModel.save();
    return res.status(201).json({
      message: "Quotes added successful",
      data: response,
    });
  } catch (err) {
    return res.status(500).json({ message: "Server error", err });
  }
};

const getAllQuotes = async (req, res) => {
  try {
    const quotes = await QuoteModel.find({});
    return res.status(200).json({
      data: quotes,
    });
  } catch (err) {
    return res.status(500).json({ message: "Server error", err });
  }
};

module.exports = { addQuotes, getAllQuotes };
