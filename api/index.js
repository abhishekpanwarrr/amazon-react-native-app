import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import userRouter from "./routes/user.routes.js";
import orderRouter from "./routes/order.routes.js"
import profileRouter from "./routes/profile.routes.js"
import { connectDB } from "./db.js";

const app = express();

// DB CONNECTION CHECK
connectDB()
  .then(() => {
    app.listen(process.env.PORT || 9000, () => {
      console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
  });

// MIDDLEWARES
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// ROUTES
app.use("/api/v1/user", userRouter);
app.use("/api/v1/orders",orderRouter);
app.use("/api/v1/profile",profileRouter);
