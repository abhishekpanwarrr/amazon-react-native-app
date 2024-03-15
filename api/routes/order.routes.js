import express from "express";
import { addOrder ,getUserOrders} from "../controller/order.controller.js";

const router = express.Router();

router.post("/", addOrder);
router.get("/:userId",getUserOrders)
export default router;