const UserModel = require("../models/userModel");

const addAddress = async (req, res) => {
  const { userId, _id, name, mobile, fullAddress, pincode, city, state } =
    req.body;
  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.address.push({
      _id,
      name,
      mobile,
      fullAddress,
      pincode,
      city,
      state,
    });
    await user.save();
    return res.status(200).json(user.address);
  } catch (err) {
    return res.status(500).json({ message: "Server error", err });
  }
};

const getAddress = async (req, res) => {
  const { userid: userId, _id } = req.headers;
  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(user.address);
  } catch (err) {
    return res.status(500).json({ message: "Server error", err });
  }
};

const updateAddress = async (req, res) => {
  const { _id, name, mobile, fullAddress, pincode, city, state } = req.body;
  const { userid: userId } = req.headers;
  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const existingAddress = user.address.find(
      (address) => address._id.toString() === _id
    );
    if (existingAddress) {
      (existingAddress.name = name),
        (existingAddress.mobile = mobile),
        (existingAddress.fullAddress = fullAddress),
        (existingAddress.pincode = pincode),
        (existingAddress.city = city),
        (existingAddress.state = state);
    }
    await user.save();
    return res.status(200).json({
      message: "address updated successfully!",
      updatedAddress: user.address,
    });
  } catch (err) {
    return res.status(500).json({ message: "Server error", err });
  }
};

const deleteAddress = async (req, res) => {
  const { userid: userId, id } = req.headers;
  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.address = user.address.filter(
      (address) => address._id.toString() !== id
    );
    await user.save();
    return res.status(200).json({
      message: "address deleted successfully!!",
      address: user.address,
    });
  } catch (err) {
    return res.status(500).json({ message: "Server error", err });
  }
};

module.exports = { addAddress, getAddress, updateAddress, deleteAddress };
