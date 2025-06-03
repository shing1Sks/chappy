import Chapters from "../schemas/chapter.models.js";
import { StatusCodes } from "http-status-codes";
import { asyncHandler } from "../asyncHandler.js";

const getChapters = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (id) {
    // If id then get single chapter
    const chapter = await Chapters.findById(id);
    if (!chapter) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Chapter not found" });
    }
    return res.status(StatusCodes.OK).json(chapter);
  }

  // Apply filters
  const filter = {};
  const allowedFilters = ["class", "unit", "status", "weakChapters", "subject"];
  for (const key of allowedFilters) {
    if (req.query[key]) {
      filter[key] = req.query[key];
    }
  }

  // Pagination
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const [chapters, total] = await Promise.all([
    Chapters.find(filter).skip(skip).limit(limit),
    Chapters.countDocuments(filter),
  ]);

  return res.status(StatusCodes.OK).json({
    totalChapters: total,
    page,
    limit,
    data: chapters,
  });
});

export { getChapters };
