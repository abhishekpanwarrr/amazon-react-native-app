import express from "express";
import { loginUser, registerUser, userAddress,getAllUserAddress } from "../controller/user.controller.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/address",userAddress)
router.get("/address/:userId",getAllUserAddress)

export default router;
