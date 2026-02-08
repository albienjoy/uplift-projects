import mongoose from "mongoose";

const schema = new mongoose.Schema({
    houseNum: {type: String, required: true},
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