const mongoose = require("mongoose");

const url = process.env.MONGO_URL;

mongoose
  .connect(url)
  .then(() => {
    console.log("MongoDB conneted");
  })
  .catch((err) => {
    console.log("Error while connecting MongoDB collection", err);
  });
