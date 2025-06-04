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

// redis connection
import { client, connectRedis, testRedis } from "./redis.js";
connectRedis();
// test redis connection
testRedis();

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});

// Applying rate limiting to all API routes
import rateLimit from "express-rate-limit";
import RedisStore from "rate-limit-redis";

const limiter = rateLimit({
  store: new RedisStore({
    sendCommand: (...args) => client.sendCommand(args),
  }),
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 30, // limit each IP to 30 requests per minute
  standardHeaders: true,
  legacyHeaders: false,
  message: "Too many requests, please try again later.",
});

app.use(limiter);

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
