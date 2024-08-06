const express = require("express");
const routes = require("./routes");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
require("./config/db");

const PORT = process.env.PORT || 5050;
const LOCALHOST_URL = process.env.LOCALHOST_URL || "http://localhost:5050";
const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use("/api/v1", routes);

app.get("/", (req, res) => {
  res.json({
    message: "Redmart backend data",
    products: `${LOCALHOST_URL}/api/v1/products`,
    cart: `${LOCALHOST_URL}/api/v1/get-cart`,
    Address: `${LOCALHOST_URL}/api/v1/get-address`,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${LOCALHOST_URL}`);
});
