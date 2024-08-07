import User from "../models/user.js";

const createCurrentUser = async (req, res) => {
  // 1. check if the user exists
  // 2. create the user if it doesn't exist
  // 3. return the user object to the calling client

  try {
    const { auth0Id } = req.body;
    console.log("auth0Id->", auth0Id);
    const existingUser = await User.findOne({ auth0Id });
    console.log("existing user value", existingUser);
    if (existingUser) {
      res.status(200).send();
    }
    console.log("req.body", req.body);
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json(newUser.toObject());
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating user" });
  }
};

const updateCurrentUser = async (req, res) => {
  try {
    const { name, addressLine1, country, city } = req.body;
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.name = name;
    user.addressLine1 = addressLine1;
    user.city = city;
    user.country = country;

    await user.save();

    res.send(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error updating user" });
  }
};

export default {
  createCurrentUser,
  updateCurrentUser,
};
