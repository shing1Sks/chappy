import Chapters from "./schemas/chapter.models.js";
import { StatusCodes } from "http-status-codes";
import { asyncHandler } from "./asyncHandler.js";

const getChapters = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    if (id) {
      const chapters = await Chapters.find({ _id: id });
      res.status(StatusCodes.OK).json(chapters);
    } else {
      const chapters = await Chapters.find();
      res.status(StatusCodes.OK).json(chapters);
    }
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
  }
});

export { getChapters };
