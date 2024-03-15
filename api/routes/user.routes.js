import express from "express";
import {
  loginUser,
  registerUser,
  addUserAddress,
  getAllUserAddress,
} from "../controller/user.controller.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/address", addUserAddress);
router.get("/address/:userId", getAllUserAddress);

export default router;
