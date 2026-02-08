import mongoose from "mongoose";

const schema = new mongoose.Schema({
    username: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true}],
    houseNum: {type: Number, required: true},
    street: {type: String, required: true},
    barangay: {type: String, required: true},
    city: {type: String, required: true},
    province: {type: String, required: true},
    zipCode: {type: Number, required: true}
    },
    {
        timestamps: true
    });

const Addresses = mongoose.model("address", schema);

export default Addresses;