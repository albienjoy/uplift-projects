import mongoose from "mongoose";

const schema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        birthday: {type: String, required: true},
        sex: {type: String, required: true},
        email: { type: String, required: true },
        contactNumber: { type: Number, required: true },
        address: { type: String, required: true },
        shirtSize: { type: String, required: true },
        emergencyContactPerson: { type: String, required: true },
        emergencyContactNumber: { type: Number, required: true }
    },
    {
    timestamps: true,
  },
);

const Registrations = mongoose.model("registration", schema);

export default Registrations;