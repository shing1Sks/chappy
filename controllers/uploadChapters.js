import fs from "fs";
import Chapters from "../schemas/chapter.models.js";
import { StatusCodes } from "http-status-codes";
import { asyncHandler } from "../asyncHandler.js";

const uploadChapters = asyncHandler(async (req, res) => {
  const file = req.file;

  if (!file) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "No file uploaded" });
  }

  const filePath = file.path;
  let data;

  try {
    data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  } catch (err) {
    fs.unlinkSync(filePath); // delete even if file parsing fails
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Invalid JSON file" });
  }

  const errors = [];
  const valid = [];

  for (const chapter of data) {
    try {
      const doc = new Chapters(chapter);
      await doc.validate(); // validate against schema
      valid.push(doc);
    } catch (err) {
      errors.push({ chapter, error: err.message });
    }
  }

  if (valid.length > 0) {
    await Chapters.insertMany(valid);
  }

  // Clean up
  fs.unlinkSync(filePath);

  return res.status(StatusCodes.OK).json({
    uploaded: valid.length,
    failed: errors.length,
    failedChapters: errors,
  });
});

export { uploadChapters };
