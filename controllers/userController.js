const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const UserModel = require("../models/userModel");

const registerUser = async (req, res) => {
  try {
    const userModel = new UserModel(req.body);
    userModel.password = await bcrypt.hash(req.body.password, 10);

    const response = await userModel.save();
    response.password = undefined;
    // Adding token in sign up
    const tokenObject = {
      _id: response._id,
      fulName: response.fullName,
      email: response.email,
    };
    const jwtToken = jwt.sign(tokenObject, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    return res.status(201).json({
      message: "Registration successful",
      data: response,
      jwtToken: jwtToken,
    });
  } catch (err) {
    return res.status(500).json({ message: "Server error", err });
  }
};

const loginUser = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });
    // for those who have not registered yet
    if (!user) {
      res
        .status(401)
        .json({ message: "Authentication failed, Invalid username/password" });
    }
    // comparing password form user database and request login password
    const isPasswordEqual = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordEqual) {
      res
        .status(401)
        .json({ message: "Authentication failed, Invalid username/password" });
    }
    // Creating token object using user database
    const tokenObject = {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
    };
    const jwtToken = jwt.sign(tokenObject, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    return res.status(200).json({
      jwtToken,
      tokenObject,
    });
  } catch (err) {
    return res.status(500).json({ message: "Server error", err });
  }
};

const googleLoginUser = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });

    // for those who have not registered yet
    // if (!user) {
    //   res
    //     .status(401)
    //     .json({ message: "Authentication failed, Invalid username/password" });
    // }

    return res.status(200).json({
      email: req.body.email,
      isGoogleLoggedIn: user ? true : false,
    });
  } catch (err) {
    return res.status(500).json({ message: "Server error", err });
  }
};

module.exports = { registerUser, loginUser, googleLoginUser };
