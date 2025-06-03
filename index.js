import e from "express";
import cors from "cors";
import { configDotenv } from "dotenv";
configDotenv();

const app = e();

// express app setup cors + body parser
app.use(cors());
app.use(
  e.json({
    limit: "30kb",
  })
);

import connectDB from "./dbConnect.js";
// mongoose connection
connectDB();

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});

// logging every request to support debugging
app.use((req, res, next) => {
  console.log("[SERVER] Incoming Request:", req.method, req.path);
  next();
});

import router from "./routes.js";

app.use("/api/v1", router);

// root route
app.get("/", (req, res) => {
  res.send("<h1>Chappy API is running !</h1>");
});
