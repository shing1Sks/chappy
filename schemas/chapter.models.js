import mongoose from "mongoose";

const chapterSchema = new mongoose.Schema(
  {
    subject: {
      type: String,
      required: true,
    },
    chapter: {
      type: String,
      required: true,
    },
    class: {
      type: String,
      required: true,
    },
    unit: {
      type: String,
      required: true,
    },
    yearWiseQuestionCount: {
      type: {
        2019: Number,
        2020: Number,
        2021: Number,
        2022: Number,
        2023: Number,
        2024: Number,
        2025: Number,
      },
      default: {
        2019: 0,
        2020: 0,
        2021: 0,
        2022: 0,
        2023: 0,
        2024: 0,
        2025: 0,
      },
    },
    questionSolved: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["Not Started", "In Progress", "Completed"],
      default: "Not Started",
    },
    isWeakChapter: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Chapter", chapterSchema);
