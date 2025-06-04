import { client } from "../redis.js";

export const cacheChapters = async (req, res, next) => {
  const key = `chapters:${JSON.stringify(req.query)}`;

  const cached = await client.get(key);
  if (cached) {
    console.log(`Cache hit for key: ${key}`);
    return res.json(JSON.parse(cached));
  }
  console.log(`Cache miss for key: ${key}`);
  // Store key for use later in db call
  res.locals.cacheKey = key;
  next();
};
