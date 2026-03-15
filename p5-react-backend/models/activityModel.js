import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    activityName: { type: String, required: true },
    activityType: { type: String, required: true },
    date: { type: String },
    description: { type: String },
    distance: { type: Number, required: true },
    gear: { type: String },
    totalTime: { type: Number, required: true },
    elevGain: { type: Number},
    files: [
      {
        url: String,
        publicId: String,
        format: String,
      },
    ],
  },
  {
    timestamps: true,
  },
);

const Activities = mongoose.model("activity", schema);

export default Activities;
