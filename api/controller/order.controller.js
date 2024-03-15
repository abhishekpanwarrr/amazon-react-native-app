import Order from "../models/Order.js";
import User from "../models/User.js";

export const createOrder = async (req, res) => {
  try {
    const { userId, cartItems, totalPrice, shippingAddress, paymentMethod } =
      req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    const products = cartItems.map((item) => ({
      name: item?.title,
      quantity: item.quantity,
      price: item.price,
      image: item?.image,
    }));
    const newOrder = new Order({
      user: userId,
      shippingAddress: shippingAddress,
      paymentMethod: paymentMethod,
      totalPrice: totalPrice,
      products,
    });

    await newOrder.save();
    res.status(201).json({ message: "Order created successfully" });
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({ message: "Error in creating orders" });
  }
};

export const getUserOrders = async (req, res) => {
  try {
    const userId = req.params.userId;
    const orders = await Order.find({ user: userId }).populate("user");
    if (!orders || orders?.length === 0) {
      return res.status(404).json({ message: "No orders found for this user" });
    }
    res.status(200).json({ orders });
  } catch (error) {
    res.status(500).json({ message: "Error" });
  }
};
