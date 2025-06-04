import { createClient } from "redis";

const client = createClient({
  username: process.env.REDIS_USERNAME || "",
  password: process.env.REDIS_PASSWORD || "",
  socket: {
    host: process.env.REDIS_HOST || "localhost",
    port: 19071,
  },
});

client.on("error", (err) => console.log("Redis Client Error", err));

const connectRedis = async () => {
  try {
    await client.connect();
    console.log("Connected to Redis");
  } catch (error) {
    console.error("Error connecting to Redis:", error);
  }
};

const testRedis = async () => {
  try {
    await client.set("Check", "Redis setup successful");
    const result = await client.get("Check");
    console.log(result); // >>> bar
  } catch (error) {
    console.error("Error testing Redis:", error);
  }
};

export { client, connectRedis, testRedis };
