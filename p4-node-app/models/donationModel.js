import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    donor: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
      },
    ],
    item: { type: String, required: true },
    type: { type: String, required: true },
    quantity: { type: Number, required: true },
    photo: [
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

const Donations = mongoose.model("donation", schema);

export default Donations;
