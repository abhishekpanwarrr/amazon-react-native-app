import User from "../models/User.js";
import { generateAccessAndRefereshTokens } from "../utils/generateToken.js";

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  if ([name, email, password].some((field) => field?.trim() === "")) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const existedUser = await User.findOne({ email });
  if (existedUser) {
    return res
      .status(409)
      .json({ message: "User with email or username already exists" });
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    return res
      .status(500)
      .json({ message: "Something went wrong while registering the user" });
  }

  return res
    .status(201)
    .json({ createdUser, message: "User registered Successfully" });
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email && !password) {
    return res.status(400).json({ message: "Email and password is required" });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: "User does not exist" });
  }

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    return res.status(401).json({ message: "Wrong credentials provided" });
  }

  const { accessToken } = await generateAccessAndRefereshTokens(user._id);

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  return res.status(200).json({
    user: loggedInUser,
    accessToken,
  });
};

export const addUserAddress = async (req, res) => {
  try {
    const { userId, address } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.addresses.push(address);
    const savedUser = await user.save();
    res.status(201).json({ message: "Address saved successfully!", savedUser });
  } catch (error) {
    console.log("Error-----", error);
    res.status(500).json({ message: "Error in saving address" });
  }
};

export const getAllUserAddress = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const addresses = user.addresses;
    res.status(200).json(addresses);
  } catch (error) {
    res.status(500).json({ message: "Error in getting address" });
  }
};
